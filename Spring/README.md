<img src='https://alexandreesl.files.wordpress.com/2014/12/springboot.png' />

현재 많은 개발자가 Spring Framework를 통해 Back-End 개발을 하고 있습니다. 저 역시 회사에서 맡은 첫 업무가 Spring을 학습하고 이를 통해서 게임포털을 운영하는 것으로 기억이 납니다.

이후에 Android, iOS, Unity 등 다양한 플랫폼에서 개발을 하게 되면서 한 동안 Spring에 대한 경험을 지속적으로 할 수 없는 상태였는데 최근에 다시 Spring을 통해 Back-End개발을 하면서 필요한 기본적인 내용을 리마인드 하고자 합니다. 틀린 내용이 많을 수 있으니 의견 주시면 적극적으로 반영하도록 하겠습니다, 감사합니다. 

## 대상 독자

- Spring Framework에 대한 기본적인 지식을 바탕으로 애플리케이션을 구현해보신 분
- Spring Boot을 통해 애플리케이션 개발을 시작하거나 프로젝트에 도입예정인 분
- Spring Boot 학습을 위한 다양한 예제가 필요하신 분


## 목차

이 문서를 통해 먼저 Spring Boot의 출현 배경에 대하여 알아보고, 개발환경을 준비하는 것으로 시작하세요 이후에 실습을 통해 제시하는 다양한 예제를 직접 구현해보기를 바랍니다.

이 문서에 포함된 예제는 아래의 개발 환경을 기준으로 작성 되었습니다.

Enviroments | Version 
---|---
Java | JDK 8
Spring Boot | 1.5.3.RELEASE
Gradle | 3.5

#### 준비하기

- [Spring Boot 시작하기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-get-started.md)
- STS IDE를 통한 개발환경 준비
- Gradle를 통해 프로젝트를 효율적으로 관리하자 
- Github를 통해 맘껏 뛰어 놀기

#### 중요한 내용은 예제로 살펴보자

- 간단한 웹 애플리케이션을 AWS를 통해 배포해보자
- Spring Boot의 JDBC를 통해 Database 연동하기
- Spring Boot의 Java Config, myBatis를 통해 Datasource 연동하기
- Spring Boot 애플리케이션에서 2개 이상의 Datasource 운용하기
- Gradle과 Spring Boot 애플리케이션의 Multi 프로젝트 구조

#### 나아가서

- 앞으로 무엇을 하면 좋을까?
- 자동화로 Cool하게 개발하자! Travis CI와 연동하기.
- 소중한 정보를 지키는 습관 Logging
- 외부 서비스와 연동하기 위한 RestTemplate
- REST API와 Exception Handling
- Embedded servlet containers를 통해 WAS 독립적인 배포하기
- 시스템 환경변수와 @Profile를 이용한 배포 환경 구분하기 
- 통합 테스트

#### Spring Boot 예제 프로젝트 모음

 아래의 Github Repository에서 Spring Boot 예제를 위한 프로젝트를 제공하고 있습니다. Spring Boot를 학습하는 데에 조금이나마 도움이 되었으면 합니다.

> https://github.com/stunstunstun/awesome-spring-boot

<br>

## 그 밖의 Spring Framework와 관련된 Contents

- [Spring MVC 살펴보기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-mvc-overview.md)
- [Spring MVC에서 ContentNegotiatingViewResolver의 역할](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-mvc-content-negotiating-view-resolver.md)
- [Struts 2의 Interceptor의 역할](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/struts-interceptor.md)
- [Struts와 Spring MVC의 Controller 클래스의 차이는?](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/struts-and-spring-mvc.md)