---
title: Spring Boot 애플리케이션에서 2개 이상의 Datasource 운용하기
date: 2016-09-20 15:14:40
desc: 예제 중심의 Spring Boot 시작하기
categories: spring-boot
---

#### Overview

애플리케이션 개발시에 단일DB에 Connection을 맺는것이 아니라 아래와 같이 둘이상의 DB와 Connection을 맺어야 할수가 있다.

- Master / Slave DB를 구분하여 Connection을 맺어야 할때
- 2개이상의 서로다른 DB를 애플리케이션에서 운용해야 할때
- 이외의 스케일아웃에 대한 이슈로 인해 애플리케이션에서 복수의 DataSource를 운용해야 할때

아래와 같은 순서로 Spring Boot 애플리케이션에서 myBatis연동시 2개이상의 DataSource를 관리하는 방법을 살펴보도록 하자

- Dependencies 설정
- 복수의 DataSource 설정
- myBatis 설정
- Mapper 인터페이스 정의
- 테스트

#### Dependencies 설정

myBatis는 내부적은 JDBC를 사용하기 때문에 Spring Boot에서는 아래와 같이 jdbc starter와 myBatis 그리고 myBatis를 Spring 환경에서 손쉽게 연동할수 있도록 도와주는 mybatis-spring을 추가해야 한다.

`Gradle`

```
compile "org.springframework.boot:spring-boot-starter-jdbc"
compile "org.mybatis:mybatis:3.3.0"
compile "org.mybatis:mybatis-spring:1.2.3"
```

`Maven`

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.3.0</version>
</dependency>
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>1.2.3</version>
</dependency>
```

#### 복수의 DataSource 설정

현재 애플리케이션에서는 동일한 DB를 Master 와 Slave 세트로 구성하고 있다고 가정해보자.

- 대용량의 트래픽을 처리하기 위해서는 단일 DB에서 모든 처리를 하는것보다는 INSERT/UPDATE/DELETE 과 같은 비용이 많이 드는 DML은 Master를 통해서
- SELECT와 같이 자주발생되는 DML은 Slave를 통해 처리한다면, 보다 효율적으로 한정된 자원을 활용할수 있을것이다.

이를 위해서 Spring Boot 애플리케이션에서는 아래와 같이 Master / Slave에 대한 DataSource를 구분해서 정의할 수가 있다. 이후에 다른용도의 DataSource가 추가될수도 있으므로, 확장성을 위해서 DataSource를 설정하는 공통적인 로직은 DatabaseConfig 라는 추상클래스에 정의해보았다.

```java
public abstract class DatabaseConfig {
     
    @Bean
    public abstract DataSource dataSource();
 
    protected void configureDataSource(org.apache.tomcat.jdbc.pool.DataSource dataSource, DatabaseProperties databaseProperties) {
        dataSource.setDriverClassName(databaseProperties.getDriverClassName());
        dataSource.setUrl(databaseProperties.getUrl());
        dataSource.setUsername(databaseProperties.getUserName());
        dataSource.setPassword(databaseProperties.getPassword());
        dataSource.setMaxActive(databaseProperties.getMaxActive());
        dataSource.setMaxIdle(databaseProperties.getMaxIdle());
        dataSource.setMinIdle(databaseProperties.getMinIdle());
        dataSource.setMaxWait(databaseProperties.getMaxWait());
        dataSource.setTestOnBorrow(false);
        dataSource.setTestOnReturn(false);
    }
}
 
@Configuration
@EnableTransactionManagement
@EnableConfigurationProperties(MasterDatabaseProperties.class)
class MasterDatabaseConfig extends DatabaseConfig {
     
    @Autowired
    private MasterDatabaseProperties masterDatabaseProperties;
     
    @Primary
    @Bean(name = "masterDataSource", destroyMethod = "close")
    public DataSource dataSource() {
        org.apache.tomcat.jdbc.pool.DataSource masterDataSource = new org.apache.tomcat.jdbc.pool.DataSource();
        configureDataSource(masterDataSource, masterDatabaseProperties);
        return masterDataSource;
    }
     
    @Bean
    public PlatformTransactionManager transactionManager(@Qualifier("masterDataSource") DataSource masterDataSource) {
        DataSourceTransactionManager transactionManager = new DataSourceTransactionManager(masterDataSource);
        transactionManager.setGlobalRollbackOnParticipationFailure(false);
        return transactionManager;
    }
}
 
@Configuration
@EnableConfigurationProperties(SlaveDatabaseProperties.class)
class SlaveDatabaseConfig extends DatabaseConfig {
     
    @Autowired
    private SlaveDatabaseProperties slaveDatabaseProperties;
     
    @Bean(name = "slaveDataSource", destroyMethod = "close")
    public DataSource dataSource() {
        org.apache.tomcat.jdbc.pool.DataSource slaveDataSource = new org.apache.tomcat.jdbc.pool.DataSource();
        configureDataSource(slaveDataSource, slaveDatabaseProperties);
        return slaveDataSource;
    }
}
```

#### myBatis 설정

DataSource에 대한 정의가 완료되었다면, myBatis에서는 구분되는 DataSource를 효율적으로 선택할수 있어야 한다.
아래에서는 MasterMyBatisConfig / SlaveMyBatisConfig 클래스에서는 각각 Master/Slave DB에 Connection 하기 위해 적절한 DataSource를 Dependencies하여 SqlSessionFactory Bean을 등록하는것을 볼수있다.

`@MapperScan의 속성`

- basePackages : 등록한 패키지부터 하위패키지의 정의된 Interface를 Mapper Interface로 자동으로 생성한다.
- annotationClass : 맵퍼 Interface를 패키지단위로 스캔하는것 뿐만 아니라, 인터페이스 클래스에 정의된 어노테이션을 기준으로 
- 맵퍼 Interface를 참조하여 생성할수 있는 기능을 지원한다.
	- @Master : Master DB에 Connection 하기 위한 DataSource를 활용한다.
	- @Slave : Slave DB에 Connection 하기 위한 DataSource를 활용한다.
- sqlSessionFactoryRef : myBatis에서 복수의 DataSource를 활용하기 위해서 sqlSessionFactoryBean을 명시적으로 지정해줄 필요가 있다.

```java
public abstract class MyBatisConfig {
     
    public static final String BASE_PACKAGE = "com.stunstun.spring.repository";
    public static final String TYPE_ALIASES_PACKAGE = "com.stunstun.spring.repository.entity";
    public static final String CONFIG_LOCATION_PATH = "classpath:META-INF/mybatis/mybatis-config.xml";
    public static final String MAPPER_LOCATIONS_PATH = "classpath:META-INF/mybatis/mapper/**/*.xml";
     
    protected void configureSqlSessionFactory(SqlSessionFactoryBean sessionFactoryBean, DataSource dataSource) throws IOException {
        PathMatchingResourcePatternResolver pathResolver = new PathMatchingResourcePatternResolver();
        sessionFactoryBean.setDataSource(dataSource);
        sessionFactoryBean.setTypeAliasesPackage(TYPE_ALIASES_PACKAGE);
        sessionFactoryBean.setConfigLocation(pathResolver.getResource(CONFIG_LOCATION_PATH));
        sessionFactoryBean.setMapperLocations(pathResolver.getResources(MAPPER_LOCATIONS_PATH));
    }
}
 
@Configuration
@MapperScan(basePackages = MyBatisConfig.BASE_PACKAGE, annotationClass = Master.class, sqlSessionFactoryRef = "masterSqlSessionFactory")
class MasterMyBatisConfig extends MyBatisConfig {
 
    @Bean
    public SqlSessionFactory masterSqlSessionFactory(@Qualifier("masterDataSource") DataSource masterDataSource) throws Exception {
        SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
        configureSqlSessionFactory(sessionFactoryBean, masterDataSource);
        return sessionFactoryBean.getObject();
    }
}
 
@Configuration
@MapperScan(basePackages = MyBatisConfig.BASE_PACKAGE, annotationClass = Slave.class, sqlSessionFactoryRef = "slaveSqlSessionFactory")
class SlaveMyBatisConfig extends MyBatisConfig {
     
    @Bean
    public SqlSessionFactory slaveSqlSessionFactory(@Qualifier("slaveDataSource") DataSource slaveDataSource) throws Exception {
        SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
        configureSqlSessionFactory(sessionFactoryBean, slaveDataSource);
        return sessionFactoryBean.getObject();
    }
}
```

#### Mapper 인터페이스 정의

`Master DB`

```java
@Master
public interface UserMapper {
 
    public List<User> selectList();
     
    public User selectOne(Long id);
     
    public User selectByUserName(@Param("userName") String userName);
     
    public void insert(User user);
     
    public void update(User user);
     
    public void delete(User user);
}
```

`Slave DB`

```java
@Slave
public interface UserReadOnlyMapper {
 
    public List<User> selectList();
     
    public User selectOne(Long id);
     
    public User selectByUserName(@Param("userName") String userName);
}
```

#### 테스트:

`Master DB`

```java
public class UserMapperTests extends AbstractTestableContext {
     
    @Autowired
    private UserMapper userMapper;  
     
    @Test
    public void testInsert() {
        User entity = new User();
        entity.setUserName("stunstun");
        entity.setPassword("stunstun");
         
        userMapper.insert(entity);
    }
}
```

`Slave DB`

```java
public class UserReadOnlyMapperTests extends AbstractTestableContext {
 
    @Autowired
    private UserReadOnlyMapper userReadOnlyMapper;
     
    @Test
    public void selectOne() {
        User entity = userReadOnlyMapper.selectByUserName("stunstun");
        assertThat(entity, nullValue());
    }
}
```

#### Summary

이 포스팅의 글을 통해 Spring Boot에서 myBatis를 연동하면서 부딪힐수 있는 문제를 모두 해결하는데는 제한이 있을수 있어 아래에 Git에 샘플 프로젝트를 첨부해보았다.

> https://github.com/stunstunstun/awesome-spring-boot/tree/master/spring-boot-mybatis-multi-example


#### References

> http://www.mybatis.org/spring/ko/sqlsession.html
https://github.com/mybatis/spring-boot-starter/issues/78
http://javapapers.com/spring/spring-conditional-annotation/
