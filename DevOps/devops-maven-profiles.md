---
title: Maven Profile 을 이용한 배포 환경 구성
date: 2014-07-27 11:49:55
categories: devops
---

빌드 및 배포를 자동화 함으로써 취할 수 있는 이득 중에 하나는 하나의 빌드 Version을 통해 다양한 배포 환경에 적용 할 수 있다는 것이다.

예를 들면, 어플리케이션이 아래와 같이 특정 SCM 경로에서 관리 되고 있다고 가정하자.

- 웹 어플리케이션 A : http://svn.com/application/trunk

해당 어플리케이션을 개발 프로세스에서 단계적으로 개발 / 알파 / 스테이징 / 운영 서버 에 순차적으로 배포 하고자 할 때, 이슈가 되는 사항은 무엇일까? 배포 환경 간에 아래와 같이 상이하게 구분해야 되는 정보가 있을 것 이다.

- 배포 환경 별 Log Level 정보
- 배포 환경 별 Database Connection 정보
- 기타 배포 환경 별 구분이 필요한 정보

위와 같이 배포 환경 간에 상이하게 구분 해야 되는 정보를 어떻게 효율적으로 관리하면 좋을까?


## Maven Profiles

Maven 을 사용 했을 때 가장 유용한 점은 위와 같은 이슈를 고려하여 다양한 배포 환경을 고려하여 빌드가 가능 하다는 것이다. 이러한 환경을 지원하는데 Maven이 지원하는 기능은 아래와 같다.


#### Profiles

- 특정 Build 환경에 맞춘 리소스의 재배치 재배치 및 환경에 대한 옵션 설정 등을 실행할 수 있다.
- 위에 설명 한 것과 같이 보통 빌드 환경을 개발 / 알파 / 스테이징 / 운영 시스템 단위로 구분한다고 했을때, 각 단계에서 필요로 하는 설정 정보나 리소스 파일들을 배치시키는 역할을 한다고 보면 된다. 이렇게 배포 환경 별 빌드 환경을 재구성 시킬 수 있는 방안을 Profiles 통해서 작성할 수 있다.

pom.xml 에 아래와 같이 profiles 를 구성 해보도록 하자.

```xml
<profiles>
   <profile>
       <id>local</id>
       <properties>
           <maven.test.skip>false</maven.test.skip>
           <deploy.phase>local</deploy.phase>
       </properties>
       <activation>
           <activeByDefault>true</activeByDefault>
       </activation>
   </profile>
   <profile>
       <id>dev</id>
       <properties>
           <maven.test.skip>false</maven.test.skip>
           <deploy.phase>dev</deploy.phase>
           <outputDirectory.war>../../deploy</outputDirectory.war>
       </properties>
   </profile>
   <profile>
       <id>alpha</id>
       <properties>
           <maven.test.skip>true</maven.test.skip>
           <deploy.phase>alpha</deploy.phase>
           <outputDirectory.war>../../deploy</outputDirectory.war>
       </properties>
   </profile>
</profiles>
```

- id : profile id
- maven.test.skip : maven test 를 skip 할 것인지의 여부
- deploy.phase : 환경 별 phase 정보를 구분하여, 리소스 관리를 하도록 한다.
- activation : 활성화 정보 여부, 위에서는 activeProfiles 설정이 없을 경우 local을 default profile로 설정하였다. 


위는 profiles 에 배포 환경 별로 profile을 추가하는 예시이다. 로컬 환경은 local / 개발 환경은 dev / 알파 환경은 alpha 로 profile을 추가하여 각 배포 환경별로 deploy.phase 라는 propertie 값으로 구분 하고 있다.

deploy.phase propertie 는 빌드 시에 아래와 같이 사용 할 수 있다.


`build configurations`

```xml
<build>
   <sourceDirectory>src/main/java</sourceDirectory>
   <testSourceDirectory>src/test/java</testSourceDirectory>
   <outputDirectory>${project.basedir}/target/classes</outputDirectory>
   <resources>
       <resource>
           <directory>src/main/resources</directory>
           <filtering>true</filtering>
       </resource>
       <resource>
           <directory>src/main/resources-${deploy.phase}/</directory>
           <filtering>true</filtering>
       </resource>
   </resources>
</build>
```

- src/main/resources : 리소스 중 공통 적인 내용들은 위의 경로에서 관리 하도록 한다.
- src/main/resources-${deploy.phase} : 리소스 중 배포 환경 별 구분해야 하는 내용들은 deploy.phase 로 구분하여 관리하도록 한다.

이와 같이 빌드 시에 배포 환경 별 구분 되어야 하는 정보들을 resources 폴더 내에서 deploy.phase 값을 이용해 배포 환경 별로 리소스 경로를 구분하여 환경에 맞는 빌드를 하면 된다.


## 그 밖에 Properties 관리를 위한 전략


#### util:properties

`xml`
```
<util:properties id="common_config" location="classpath:/properties/common_config/${deploy.phase}.properties" />
```
`local.properties`
```
ip=127.0.0.1
```

`java`
```
@Value("#{common_config['ip']}")
private String ip;
```

#### org.springframework.beans.factory.config.PropertyPlaceholderConfigurer

```xml
<bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
   <property name="fileEncoding" value="UTF-8" />
   <property name="ignoreUnresolvablePlaceholders" value="true" />
   <property name="systemPropertiesModeName" value="SYSTEM_PROPERTIES_MODE_OVERRIDE" />
   <property name="ignoreResourceNotFound" value="true" />
   <property name="locations">
       <list>
           <value>classpath*:/properties/database/${deploy.phase}.properties</value>
       </list>
   </property>
</bean>
```

- fileEncoding : enconding type
- ignoreUnresolvablePlaceholders : Indicates whether unresolved placeholdersshould be ignored
- ignoreResourceNotFound : is set to true, Spring will ignore resources that don’t exist.
- locations : location list


