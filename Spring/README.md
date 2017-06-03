<img src='https://alexandreesl.files.wordpress.com/2014/12/springboot.png' />

현재 많은 개발자가 Spring Framework를 통해 Back-End 개발을 하고 있습니다. 저 역시 프로그래밍을 하면서 맡은 첫 업무가 Spring Framework를 통해 게임 포털를 개발하고 운영하는 것이였습니다.

이후에 Java Back-end 환경이외의 다양한 플랫폼에서 개발을 하게 되면서 한 동안 Spring Framework에 대한 경험을 지속적으로 리마인드 할 수 없는 상태였는데 최근에 Spring Boot을 통해 개발한 경험을 `Spring Boot 레시피`라는 이름으로 예제 위주로 정리하고자 합니다.

> 틀린 내용이 많을 수 있으니 코멘트를 주시면 적극적으로 반영하도록 할께요, 감사합니다. 

## `Spring Boot 레시피`

이 Spring Boot 레시피 문서는 먼저 Spring Boot의 출현 배경에 대하여 알아보고, 개발환경을 준비하는 것으로 시작합니다. 이후에 문서에서 제시하는 다양한 예제를 레시피보듯 가볍게 구현해 보시기를 바랍니다.

#### 목표

Java, Gradle, Spring Boot을 이용해 자신이 상상하는 웹 애플리케이션을 구현합니다.

#### 대상 독자

- Spring Boot 학습을 위해 잘 동작하는 다양한 예제가 필요하신 분
- Spring Boot을 통해 애플리케이션 개발을 시작하거나 프로젝트에 도입하고자 하는 분
- 웹 애플리케이션의 기본적인 동작 원리를 이해하시는 분

#### 이 문서에 포함된 예제는 아래의 개발 환경을 기준으로 작성 되었습니다.

Enviroments | Version 
---|---
Java | JDK 8
Spring Boot | 1.5.3.RELEASE
Gradle | 3.5

#### 준비하기

- [Spring Boot 시작하기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-get-started.md)
- [Spring Boot 개발환경 준비](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-environments.md)
- [Gradle를 통해 프로젝트를 효율적으로 관리하자](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-and-gradle.md) 
- [Github를 통해 맘껏 뛰어 놀기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-with-github.md) 

#### 실습하기

- [Spring Boot의 자동 구성과 주요 기능](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-autoconfigure.md) 
- [Spring Boot에서 전통적인 JDBC를 통해 Database 연동하기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-with-jdbc.md)
- [Spring Boot과 myBatis를 통해 Datasource 연동하기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-with-mybatis.md)
- [Spring Boot에서 2개 이상의 Datasource 운용하기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-multi-datasources.md)
- [Spring Boot과 Spring MVC](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-web-mvc.md)
- [Gradle과 Spring Boot 애플리케이션의 Multi 프로젝트 구조](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-gradle-multi-project.md)

#### 나아가서

- [앞으로 무엇을 하면 좋을까?](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-what-is-next.md) 
- [Spring Boot과 테스트](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-test.md) 
- [자동화로 쿨하게 개발하자! Travis CI와 연동하기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-with-travis-ci.md) 
- [소중한 정보를 지키는 습관 Logging](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-logging.md) 
- [외부 서비스와 연동하기 위한 RestTemplate](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-rest-template.md) 
- [시스템 환경 변수와 Profile를 이용한 Properties 관리](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-properties.md) 
- [클라우드 서비스에 배포하기 AWS, Cloud Foundry](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-deploying.md) 
- [Spring Loaded로 로컬 개발환경 개선하기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-and-loaded.md)

#### Spring Boot 예제 프로젝트

아래의 Github Repository에서 Spring Boot 예제를 위한 프로젝트를 제공하고 있습니다. Spring Boot를 학습하는 데에 조금이나마 도움이 되었으면 합니다.

> https://github.com/stunstunstun/awesome-spring-boot

<br>

## 그 밖의 Spring Framework와 관련된 Contents

- [Spring MVC 살펴보기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-mvc-overview.md)
- [Spring MVC에서 ContentNegotiatingViewResolver의 역할](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-mvc-content-negotiating-view-resolver.md)
- [Struts 2의 Interceptor의 역할](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/struts-interceptor.md)
- [Struts와 Spring MVC의 Controller 클래스의 차이는?](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/struts-and-spring-mvc.md)