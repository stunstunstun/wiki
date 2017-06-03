---
title: 앞으로 무엇을 하면 좋을까?
date: 2015-11-20 15:14:40
desc: Spring Boot 레시피
categories: spring-boot
---


## Java기반의 웹 애플리케이션에서 고려해야 할 사항들

Spring Boot을 사용하면서 자연스럽게 Spring의 Version을 4.x 으로 업데이트 해야했고, 또 빌드 도구를 Gradle로 변경하면서 발생 됐던 이슈 리스트를 정리해 보았다.

#### Dev

Issues | Description
--|--
Database Access | Spring Boot에서 myBatis를 통해 JDBC 연동하기
DBCP | Spring Boot에서 DB Connection Pool 관리를 위한 구현체 선택
Transactions |Spring Transaction Manager
Logging	| `spring-starter-web`의 경우 디폴트로 logback을 지원 (common-logging & log4j -> slf4j & logback)
Spring Config | Java Config를 통해 XML Scheme 방식의 Configurations에서 벗어나기
환경 변수 관리 | 시스템 환경 변수와 `@Profile`를 이용한 배포 환경 구분하기
외부 서비스 연동을 위한 HTTP 클라이언트 | `Spring RestTemplate`	
Spring MVC | REST API, `@ExceptionHandler`, `@ControllerAdvice`	
Spring Boot에서의 Servlet | WebApplicationInitializer 인터페이스 구현
Templates | Thymeleaf

#### Ops

Issues | Description
--|--
Gradle 기반의 프로젝트 Building | 로컬 개발 환경 구성 `Java` `Gradle` `STS IDE` or `IDEA IntelliJ` 
Gradle, Spring Boot의 멀티 프로젝트 구조 | 부모 프로젝트인 `core`와 `api` `batch` `admin`등 하위 모듈로 구성되는 프로젝트
Gradle Tasks | 프로젝트내의 Dependencies 설정과 빌드, 테스트, 배포 자동화를 위한 요구사항 정의
TDD & 단위 테스트 | 테스트 주도 개발을 통한 인터페이스 설계, 직관적인 개발 및 지속적인 Test Coverage 확인
통합테스트 | `Spring Boot 테스트` `Spring MVC 테스트`
CI | 지속적인 통합을 위한 Jenkins와 같은 빌드 서버 구성
QP | `Checkstyle` `Klockwork` `Jacoco`를 통한 다양한 Quality Practice에 대한 Report 생성
Deploy | Embedded Tomcat을 이용한 배포


