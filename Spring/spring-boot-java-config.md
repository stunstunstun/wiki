## Overview

이 문서에서는 myBatis 를 Spring Boot 애플리케이션에 통합하기 위한 방법을 설명하고자 합니다. myBatis 에서는 Spring 과의 연동을 위한 mybatis-spring 모듈을 제공하고 있으며, 아래의 링크에서 한글화된 메뉴얼도 제공하고 있는 상태입니다.

- http://mybatis.org/spring/ko/mappers.html

먼서 전통적인 XML기반의 설정을 통해 myBatis를 통합하는 과정을 살펴보고, Spring Boot 애플리케이션에서는 Java Config 를 통해 myBatis를 어떻게 통합하는지, 이어서 여러 DataSource를 관리하기 위해서 필요한 것들은 무엇이 있는지 살펴보도록 하겠습니다.

- Dependencies
- XML Based Configuartion
- Spring Boot 에서 Java Config을 통한 설정
- Mapper 테스트
- Multiple Data Source 관리

## Dependencies

myBatis는 내부적은 JDBC를 사용하기 때문에 Spring Boot에서는 아래와 같이 jdbc starter와 myBatis 그리고 myBatis를 Spring 환경에서 손쉽게 연동할수 있도록 도와주는 mybatis-spring을 추가해야 한다.

### Gradle
``` groovy
compile "org.springframework.boot:spring-boot-starter-jdbc"
compile "org.mybatis:mybatis:3.3.0"
compile "org.mybatis:mybatis-spring:1.2.3"
```

### Maven
``` xml
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

<br>

### DataSource 설정
먼저 JDBC를 통해 Database Connection을 관리하기 위해서는 DataSource 인터페이스를 사용하기 위한 구현체를 선택해야 하는데,

spring-boot-starter-jdbc 또는 spring-boot-starter-data-jpa 를 추가하면 Spring Boot에서는 DataSource 관리를 위한 구현체로써 tomcat-jdbc(The Tomcat JDBC Pool) 을 default로 제공한다.

- 이 문서에서는 myBatis를 사용하므로 spring-boot-starter-jdbc를 추가하도록 한다.


**이외에 선택할수 있는 옵션은 다음과 같다.**


- 가능하다면 Tomcat JDBC Connection Pool을 선택하는것을 가장 추천한다.

- HikariCP 역시 가능한 대안이다.

- Commons DBCP 역시 선택가능한 옵션이나, Production 에서는 추천하지 않는다.

- 마지막으로 Commons DBCP2 역시 가능한 대안이다.


## XML Based Configuartion

먼저 Spring Boot이전에 전통적인 XML을 통해 myBatis를 통합하는 과정을 살펴보도록 하겠다.

### Data Source 설정

DataSource의 구현체를 Bean으로 등록하는 과정이다. 여기서는 tomcat-jdbc의 구현체를 통해 DataSource를 설정하였다.

``` xml
<util:properties id="dataSourceConfig" location="classpath:/properties/datasource.properties" />
 
<bean id="dataSource" class="org.apache.tomcat.jdbc.pool.DataSource" destroy-method="close">
    <property name="driverClassName" value="#{dataSourceConfig['datasource.driverClassName']}" />
    <property name="url" value="#{dataSourceConfig['datasource.url']}" />
    <property name="username" value="#{dataSourceConfig['datasource.userName']}" />
    <property name="password" value="#{dataSourceConfig['datasource.password']}" />
    <property name="initialSize" value="5" />
    <property name="maxActive" value="50" />
    <property name="maxIdle" value="50" />
    <property name="minIdle" value="20" />
    <property name="maxWait" value="2000" />
</bean>
```

### Transaction Manager 설정

DataSource에 Transaction 관리를 위한 Manager클래스를 등록하는 과정이다.

``` xml
<tx:annotation-driven transaction-manager="transactionManager" />
 
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource" />
    <property name="globalRollbackOnParticipationFailure" value="false" />
</bean>
```

- dataSource : DataSource Bean을 참조한다.
- globalRollbackOnParticipationFailure : #globalRollbackOnParticipationFailure


### SqlSessionFactoryBean 과 SqlSessionTemplate


myBatis 는 JdbcTemplate 대신 Connection 객체를 통한 질의를 위해서 SqlSession을 사용한다. 내부적으로 SqlSessionTemplate가 SqlSession을 구현하게 되는데, Thread에서 안전하고 여러개의 Mapper에서 공유할수 있다.

```
- SqlSessionTemplate 은 myBatis 디폴트 구현체인 org.apache.ibatis.session.defaults.DefaultSqlSession 대신 항상 사용된다.
- SqlSessionTemplate 클래스내에 SqlSession 인터페이스 타입의 proxy클래스가 존재한다. 왜냐하면 템플릿은 스프링 트랜잭션의 일부처럼 사용될 수 있고 여러개 주입된 매퍼 클래스에 의해 사용되도록 쓰레드에 안전하다. 
- 동일한 애플리케이션에서 두개의 클래스간의 전환은 데이터 무결성 이슈를 야기할수 있다.
```

SqlSession을 생성하기 위해서는 SqlSessionFactory를 사용하는데 이를 위해서는 아래와 같은 설정이 필요하다.

``` xml
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource" />
    <property name="typeAliasesPackage" value="com.stunstun.spring.repository.entity" />
    <property name="mapperLocations" value="classpath:META-INF/mybatis/mapper/**/*.xml" />
    <property name="configLocation" value="classpath:META-INF/mybatis/mybatis-config.xml" />
</bean>
```

- dataSource : DataSource Bean을 참조한다.
- typeAliasesPackage : Aliase는 Mapper가 XML파일에서 사용되어지는 자바타입에 대한 짧은 별칭이다. Aliase에 해당되는 클래스를 스캔하기 위한 패키지를 지정한다.
- mapperLocations : Mapper를 스캔하기위한 XML파일경로를 지정한다.
- configLocation : myBatis의 설정파일의 경로를 지정한다.

### Mapper의 등록

Mapper는 XML에서 아래와 같이 등록할수 있다.

``` xml
<bean id="userMapper" class="org.mybatis.spring.mapper.MapperFactoryBean">
  <property name="mapperInterface" value="com.stunstun.spring.repository.UserMapper" />
  <property name="sqlSessionFactory" ref="sqlSessionFactory" />
</bean>
```

### Mapper 검색

하나씩 매퍼를 모두 등록할 필요가 없다. 대신 클래스패스를 지정해서 마이바티스 스프링 연동모듈의 자동스캔기능을 사용할 수 있다. XML을 통해 자동스캔을 사용하는데는 아래의 방법이 있다.

- <mybatis:scan /> 엘리먼트 사용
- 스프링 XML파일을 사용해서 MapperScannerConfigurer 를 등록

myBatis는 아래와 같은 설정을 통해 basePackage 속성에 등록된 패키지 하위의 interface를 자동으로 Mapper로 인식하게 된다.

##### <mybatis:scan />

``` xml
<mybatis:scan base-package="com.stunstun.spring.repository" factory-ref="sqlSessionFactory" />
```

##### MapperScannerConfigurer

``` xml
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="basePackage" value="com.stunstun.spring.repository" />
    <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory" />
</bean>
```


## Spring Boot 에서 Java Config을 통한 설정

이번에는 전통적인 XML을 통한 설정이 아닌, Spring Boot 애플리케이션에서 Java Config 를 통해 myBatis를 사용하기 위한 설정방법을 알아보도록 하겠다.

### Spring Boot 애플리케이션 설정
Spring Boot 애플리케이션은 **@SpringBootApplication** 어노테이션이 정의되어 있는 클래스를 기준으로 컴포넌트를 스캔하게 되어있는데, 내부적으로는 아래와 같은 어노테이션으로 구성되어 있다.

이 중 **@EnableAutoConfiguration** 어노테이션은 Spring Boot에서 자동설정을 가능하게 해주는데, myBatis를 사용하기 위해서는 DataSource에 대한 구현체를 직접등록해야 되기 때문에 아래와 같이 DataSource 및 TransactionManager에 대한 자동설정을 제외하여야 한다.

``` java
@Configuration
@EnableAutoConfiguration(exclude = { DataSourceTransactionManagerAutoConfiguration.class, DataSourceAutoConfiguration.class })
@ComponentScan(basePackages = "com.stunstun.spring")
public class SpringBootMybatisExampleApplication {
 
    public static void main(String[] args) {
        SpringApplication.run(SpringBootMybatisExampleApplication.class, args);
    }
}
```


### Data Source 및 SqlSessionFactoryBean 등록

``` java
@Configuration
@Lazy
@EnableTransactionManagement
@MapperScan(basePackages = {"com.stunstun.spring.repository"})
class DefaultDatabaseConfig extends DatabaseConfig {
 
    @Autowired
    private ApplicationContext applicationContext;
 
    @Bean(destroyMethod = "close")
    public DataSource dataSource() {
        org.apache.tomcat.jdbc.pool.DataSource dataSource = new org.apache.tomcat.jdbc.pool.DataSource();
        configureDataSource(dataSource);
        return dataSource;
    }
 
    @Bean
    public PlatformTransactionManager transactionManager() {
        DataSourceTransactionManager transactionManager = new DataSourceTransactionManager(dataSource());
        transactionManager.setGlobalRollbackOnParticipationFailure(false);
        return transactionManager;
    }
 
    @Bean
    public SqlSessionFactory sqlSessionFactory() throws Exception {
        SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
        sessionFactoryBean.setDataSource(dataSource());
        sessionFactoryBean.setTypeAliasesPackage("com.stunstun.spring.repository.entity");
        sessionFactoryBean.setConfigLocation(applicationContext.getResource("classpath:META-INF/mybatis/mybatis-config.xml"));
        sessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:META-INF/mybatis/mapper/**/*.xml"));
        return sessionFactoryBean.getObject();
    }
}
```

### Mapper 검색

Java Config를 통한 Mapper검색을 위해서는 아래와 같이 @MapperScan 어노테이션을 정의해주면 된다.

``` java
@Configuration
@MapperScan(basePackages = {"com.stunstun.spring.repository"})
class DefaultDatabaseConfig extends DatabaseConfig {
...
}
```

## Mapper 테스트
``` java
@Transactional
@Rollback
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = SpringBootMybatisExampleApplication.class)
public class UserMapperTests {
 
    @Autowired
    private UserMapper userMapper;
 
    private User entity;
 
    @Before
    public void setUp() {
        entity = new User();
        entity.setUserName("stunstun");
        entity.setPassword("stunstun");
 
        userMapper.insert(entity);
        entity = userMapper.selectByUserName("stunstun");
    }
 
    @Test
    public void insertAndDelete() {
        assertThat(entity, notNullValue());
 
        User user = userMapper.selectByUserName("stunstun");
        userMapper.delete(user);
 
        user = userMapper.selectByUserName("stunstun");
        assertThat(user, nullValue());
    }
}
```

## Summary
이 포스팅의 글을 통해 Spring Boot에서 myBatis를 연동하면서 부딪힐수 있는 문제를 모두 해결하는데는 제한이 있을수 있어 아래에 Git에 샘플 프로젝트를 첨부해보았다.

- https://github.com/wjdsupj/spring-framework-examples/tree/master/spring-mybatis-example
- https://github.com/wjdsupj/spring-framework-examples/tree/master/spring-boot-mybatis-example

<br>

----
### References

http://mybatis.org/spring/apidocs/reference/
http://mybatis.org/spring/ko/mappers.html
http://mybatis.org/mybatis-3/ko/index.html
http://jeremyko.blogspot.kr/2012/07/mybatis-spring.html
https://github.com/mybatis/spring/pull/40
http://mybatis.org/spring/apidocs/reference/org/mybatis/spring/mapper/MapperScannerConfigurer.html
https://heartdev.wordpress.com/2013/07/04/mybatis-spring-%EC%9D%98-mapperscannerconfigurer-%EB%A5%BC-%ED%86%B5%ED%95%B4-spring-%EA%B3%B5%EB%B6%80%ED%95%98%EA%B8%B0/
https://github.com/mybatis/spring/releases
https://github.com/mybatis/spring/issues/58


