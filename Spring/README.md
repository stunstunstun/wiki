<img src='https://alexandreesl.files.wordpress.com/2014/12/springboot.png' />

## TDD와 함께하는 Spring Boot 2.0

이 Spring Boot 레시피 문서는 먼저 Spring Boot의 출현 배경에 대하여 알아보고, TDD를 통해 개발환경을 준비하는 것으로 시작합니다. 이후에 문서에서 제시하는 다양한 예제를 레시피보듯 가볍게 구현해 보시기를 바랍니다.

#### 목표

Java, Gradle, Spring Boot을 통해 실무 수준의 엔터프라이즈 환경 웹 애플리케이션을 구현합니다.

#### 대상 독자

- Spring Boot 학습을 위해 잘 동작하는 다양한 예제가 필요하신 분
- Spring Boot을 통해 애플리케이션 개발을 시작하거나 프로젝트에 도입하고자 하는 분
- 웹 애플리케이션의 기본적인 동작 원리를 이해하시는 분

#### 이 문서에 포함된 예제는 아래의 개발 환경을 기준으로 작성 되었습니다.

Enviroments | Version
---|---
Java | JDK 9
Spring Boot | 2.0.0.RELEASE
Spring | 5.0.0 RELEASE
Gradle | 4.0

## 1부 재료 다지기

#### 1장 목표 소개

- 웹 애플리케이션에 필요한 요소들
- 점점 작게 분리되는 서비스들
- Spring Boot을 통해 인증 API 구현하기
- 레거시라는 괴물을 만들지 않는 습관
- TDD 시작하기

#### 2장 Spring Boot 시작하기

- 객체의 생성과 소멸까지
- Spring Framework의 출현 배경과 이전의 역사들
- 다양한 모듈간의 의존관계와 프로젝트 설정에서 발생하는 낭비들
- [Spring Boot를 통한 새로운 시작](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-get-started.md)
- [Java 9과 Spring Boot 2.0을 통한 변화들](https://www.youtube.com/watch?v=BFjrmj4p3_Y)

#### 3장 Spring Boot 개발 환경 준비

- [Spring Boot 개발환경 준비](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-environments.md)
- Spring Boot CLI
- [Gradle를 통해 프로젝트를 효율적으로 관리하자](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-and-gradle.md)
- Walking Skeleton 프로젝트
- Github를 통해 맘껏 뛰어 놀기

## 2부 Spring Boot 요리하기

#### 4장 Spring Boot의 특성

- Spring Framework와 Spring Boot
- Spring Boot Starters
- Spring Boot의 자동 구성과 주요 기능
- 간단하게 프로젝트 정보 설정하기
- 자바 Annotation과 @EnableAutoConfiguration

#### 5장 데이터 베이스와 연동하기

- H2 Database 활용하기
- [Spring Boot에서 전통적인 JDBC를 통해 Database 연동하기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-with-jdbc.md)
- [Spring Boot과 JPA를 통해 Datasource 연동하기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-with-jpa.md)
- [Spring Boot과 myBatis를 통해 Datasource 연동하기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-with-mybatis.md)
- [Spring Boot에서 2개 이상의 Datasource 운용하기](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-multi-datasources.md)

#### 6장 애플리케이션으로 발전시키기

- 독립적으로 실행되는 Spring Boot 애플리케이션
- [Spring Boot과 Spring MVC](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-web-mvc.md)
- Spring MVC 테스트
- 더 나은 REST API 제공하기
- [Gradle과 Spring Boot 애플리케이션의 Multi 프로젝트 구조](https://github.com/stunstunstun/awesome-wiki/blob/master/Spring/spring-boot-gradle-multi-project.md)

## 3부 Spring Boot 비법 소스

#### 7장 꾸준한 맛을 내는 전략 테스트

- 기본적인 단위 테스트
- 테스트하기 어려운 경우를 위한 효과적인 테스트 전략
- 가짜 객체 만들기
- Spring Boot 1.4, 2.0에서 개선된 테스트
- 통합 테스트

#### 8장 지속적으로 유용하고 건강한 애플리케이션 만들기

- 소중한 정보를 지키는 습관 Logging
- 자동화로 쿨하게 개발하자! Travis CI와 연동하기
- Code Convention 지켜나가기
- Travis CI와 Jacoco를 이용한 테스트 커버리지 생성하기
- GitHub와 연동하기

#### 9장 Spring Boot 애플리케이션 배포하기

- 시스템 환경 변수와 Profile를 이용한 Properties 관리
- 실행 가능한 JAR
- 실행과 배포 가능한 WAR
- Spring Boot DevTools
- Spring Boot Actuator

#### [부록] 혼자서도 개발하고 운영(DevOps)하는 마법의 도구들

- AWS 시작하기
- AWS CodeStar를 통해 빌드, 배포, 모니터링 하기

#### Spring Boot 예제 소스들

아래의 Github Repository에서 Spring Boot 예제를 위한 프로젝트를 제공하고 있습니다. Spring Boot를 학습하는 데에 조금이나마 도움이 되었으면 합니다.

> https://github.com/stunstunstun/awesome-spring-boot

## 레퍼런스

- https://docs.spring.io/spring/docs/current/spring-framework-reference/index.html
- https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/
- https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle


