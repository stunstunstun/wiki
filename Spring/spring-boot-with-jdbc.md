---
title: Spring Boot의 JDBC를 통해 Database 연동하기
date: 2015-10-16 15:14:40
desc: 예제 중심의 Spring Boot 시작하기
categories: spring-boot
---

## Overview

이 문서에서는 Spring Boot 애플리케이션에서 JDBC를 사용하기 위한 방법을 설명하고자 합니다.

- spring-boot-starter-jdbc
- XML Based Configurations
- Spring Boot에서의 DataSource 설정
- Using JdbcTemplate

## 먼저 Spring Boot 이전의 JDBC는?

- https://github.com/stunstunstun/spring-jdbc-example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xmlns:util="http://www.springframework.org/schema/util"
		xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
			http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util-3.2.xsd">

    <!-- Database properties -->
	<util:properties id="dataSourceConfig" location="classpath:/properties/datasource.properties" />
	
	<bean id="dataSource" class="org.apache.commons.dbcp2.BasicDataSource" destroy-method="close">
		<property name="driverClassName" value="#{dataSourceConfig['datasource.driverClassName']}" />
		<property name="url" value="#{dataSourceConfig['datasource.url']}" />
		<property name="username" value="#{dataSourceConfig['datasource.username']}" />
		<property name="password" value="#{dataSourceConfig['datasource.password']}" />
		<property name="initialSize" value="10" />
		<property name="maxTotal" value="10" />
		<property name="maxIdle" value="10" />
		<property name="minIdle" value="10" />
		<property name="maxWaitMillis" value="3000" />
	</bean>
	
	<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
 		<property name="dataSource" ref="dataSource" />
 		<property name="queryTimeout" value="5" />
 	</bean>
</beans>

```

```java
@Repository
public class MonitorRepository {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	public String selectStatus() {
		return jdbcTemplate.queryForObject("SELECT 'OK'", new Object[] {}, String.class);
	}
}
```

## spring-boot-starter-jdbc

Spring Boot 에서는 jdbc연동을 위한 starter를 제공하는데, jdbc starter는 아래와 같이 추가할 수 있다.

#### Gradle

```groovy
compile "org.springframework.boot:spring-boot-starter-jdbc"
```

#### Maven

``` xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
</dependency>
```

#### Configure a DataSource

먼저 Java의 javax.sql.DataSource 인터페이스는 Database Connection을 위한 standard method를 제공한다. DataSource 인터페이스를 사용하기 위한 구현체를 선택해야 하는데,

spring-boot-starter-jdbc 또는 spring-boot-starter-data-jpa 를 추가하면 Spring Boot에서는 DataSource 관리를 위한 구현체로써 tomcat-jdbc을 default로 제공한다.

이외에 선택할수 있는 옵션은 다음과 같다.

- 가능하다면 Tomcat JDBC Connection Pool을 선택하는것을 가장 추천한다.
- HikariCP 역시 가능한 대안이다.
- Commons DBCP 역시 선택가능한 옵션이나, Production 에서는 추천하지 않는다.
- 마지막으로 Commons DBCP2 역시 가능한 대안이다.


## XML Based Configurations

먼저 Spring Boot 애플리케이션이 아니라면 아래와 같이 XML를 통해 DataSource 구현체와 질의를 위한 JdbcTemplate 클래스에 대한 Bean을 등록해야 할것이다.

#### dataSource 등록

``` xml
<util:properties id="dataSourceConfig" location="classpath:/properties/datasource.properties" />
 
<bean id="dataSource" class="org.apache.commons.dbcp2.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="#{dataSourceConfig['datasource.jdbcUrl']}" />
    <property name="url" value="#{dataSourceConfig['datasource.url']}" />
    <property name="username" value="#{dataSourceConfig['datasource.username']}" />
    <property name="password" value="#{dataSourceConfig['datasource.password']}" />
    <property name="initialSize" value="10" />
    <property name="maxTotal" value="10" />
    <property name="maxIdle" value="10" />
    <property name="minIdle" value="10" />
    <property name="maxWaitMillis" value="3000" />
</bean>
```

#### jdbcTemplate 등록

``` xml
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="dataSource" ref="dataSource" />
    <property name="queryTimeout" value="5" />
</bean>
```

## Spring Boot에서의 DataSource 설정

이번에는 전통적인 XML을 통한 설정이 아닌, Spring Boot 애플리케이션에서 Java Config 를 통해 DataSource를 설정하는 방법을 알아보도록 하겠다.

Spring Boot의 **@EnableAutoConfiguration** 어노테이션을 통해 DataSource 와 JdbcTemplate에 대한 Bean을 별도로 등록하지 않아도 되는데, 그렇다면 속성값을 어떠한 방식으로 설정할수 있을까?

DataSource 의 설정은 application.properties 파일내에서 spring.datasource.* 와 같은 패턴으로 설정이 가능하다. application.properties에서 DataSource 설정하는 방식을 예를들어 보겠다,

`Examples`

```
spring.datasource.url=jdbc:mysql://localhost/test
spring.datasource.username=dbuser
spring.datasource.password=dbpass
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```

더욱 많은 설정값을 확인하고 싶다면 DataSourceProperties 내부를 살펴보면 되며, Spring Boot의 AutoConfigure 을 통해 `spring.datasource.*` 에 대한 설정이 DataSourceProperties에 전달되며 이를 통해 DataSource의 디폴트 구현체인 `org.apache.tomcat.jdbc.pool.DataSource` 클래스에 자동으로 설정된 것을 확인할 수가 있다.

`@EnableAutoConfiguration` 어노테이션은 @SpringBootApplication를 구성하는 요소중 하나인데, `@SpringBootApplication`는 다음과 같은 어노테이션으로 구성되어 있다.

- @Configuration : Indicates that a class declares one or more @Bean methods and may be processed by the Spring container to generate bean definitions and service requests for those
- @EnableAutoConfiguration : Enable auto-configuration of the Spring Application Context
- @ComponentScan : Provides support parallel with Spring XML's <context:component-scan> element

DataSourceProperties는 Spring Boot에서 autoconfigure이 가능한 속성으로 별도의 DataSource를 구현하여 Bean을 등록했다면, application.properties 내의 spring.datasource.* 속성은 적용되지 않는다.


## Using JdbcTemplate

Database Connection을 위한 DataSource 설정이 완료되었다면, 아래와 같이 Spring 에서 제공하는 JdbcTemplate 클래스를 통해 Query 질의를 손쉽게 할수가 있다.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
 
@Component
public class MyBean {
 
    private final JdbcTemplate jdbcTemplate;
 
    @Autowired
    public MyBean(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
 
    // ...
}
```

## Github Repository

이 포스팅의 글을 통해 Spring Boot에서 jdbc를 연동하면서 부딪힐수 있는 문제를 모두 해결하는데는 제한이 있을수 있어 아래에 Git에 샘플 프로젝트를 첨부해보았다.

- https://github.com/stunstunstun/awesome-spring-boot

## References

> https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-sql.html
https://tomcat.apache.org/tomcat-7.0-doc/jdbc-pool.html
