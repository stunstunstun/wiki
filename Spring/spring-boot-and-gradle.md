---
title: Gradle을 통해 프로젝트를 효율적으로 관리하자
date: 2015-05-12 15:14:40
desc: 예제 중심의 Spring Boot 시작하기
image: https://plugins.gradle.org/shared-assets/shared/images/gradle-logo-horizontal.svg
categories: spring-boot
---

이전 글에서는 Spring Boot 애플리케이션을 개발하기 위해 Java, Gradle 환경을 구성하였다. 앞으로 성공적으로 프로젝트를 관리하기 위해서는 Gradle이라는 빌드 도구와 친해질 필요가 있다.

<img src='https://gradle.org/images/homepage/gradle-org-hero.png' width='600' />

## Gradle?

그 이유는 소프트웨어의 복잡도는 점점 복잡해지며, 이를 해결하기 위해서는 외부의 다양한 모듈을 이용할 수 있어야 하며 모듈간의 의존 관계를 효과적으로 관리해야 한다. 뿐만 아니라 Gradle은 큰 노력없이 애플리케이션을 빌드, 테스트, 배포하는 과정을 자동화할 수 있도록 도와준다.

<img src='https://gradle.org/images/homepage/android-blue.svg' />

> 소규모의 스타트업부터 대표적으로 안드로이드, 넷플릭스, 링크드인과 같은 대규모의 서비스에서도 Gradle을 통해 프로젝트를 빌드하고 있다.

이번 글에서의 우리의 목표는 생소한 Gradle과 첫 인사를 하는 것이다. 그 시작으로 Spring Boot과 JPA를 통해 Database와 연동하는 간단한 예제를 만들어 보겠다.

#### STS IDE에서 Gradle 프로젝트 생성하기

Gradle 프로젝트를 생성하는 방법은 다양한데, 먼저 IDE를 통해서 프로젝트를 생성하는 방법을 알아보고 그 밖에 웹페이지, Spring Boot의 CLI를 통해 생성하는 방법도 살펴보자. STS IDE를 실행하고 메메뉴의 `New Project > Spring Starter Project`를 통해 프로젝트를 생성할 수 있다.

`spring staters`는 일종의 특정한 기능을 제공하기 위한 Module의 모음으로 이전과 같이 샘플 코드에서 Module의 의존 관계를 설정하기 위해 코드를 Copy & Paste 할 필요가 없다. 프로젝트의 사용 목적에 따라 Spring Boot에서 제공하는 starter를 선택하여 프로젝트를 생성하면 된다. 예를 들면 Spring과 JPA를 통해 Database에 접근이 필요한 애플리케이션을 만들고 싶다면 `spring-boot-starter-data-jpa`를 프로젝트에 추가하는 것만으로 모든 것이 해결된다.

![create-project-2](http://image.toast.com/aaaaahq/create-boot-2.png)

#### Spring Boot Initializr 페이지에서 프로젝트 생성하기

Spring Initializr라는 웹 페이지를 통해 아래와 같이 필요한 정보를 입력하고 `Generate Project`버튼을 누르는 것만으로 프로젝트를 손쉽게 생성할 수 있다.

> http://start.spring.io

```
Generate a `Gradle Project` with Spring Boot 1.4.1
Group - com.stunstun.spring
Artifact - spring-boot-jpa-example
Dependencies - JPA, H2
```

![create-project-3](http://image.toast.com/aaaaahq/create-boot-3.png)

#### Spring Boot CLI를 통해 프로젝트 생성하기

Spring Boot CLI는 Spring Boot 프로젝트를 위한 Command Line Tool이다. 프로젝트 생성을 자동화하고 싶거나 Terminal에서의 경험이 익숙하다면 IDE에서 독립적으로 Gradle 또는 Maven 프로젝트를 생성할 수 있다. 

`Spring Boot CLI 설치하기`

```
$ brew tap pivotal/tap
$ brew install springboot
$ spring --version
```

`Spring Boot CLI 업데이트`

```
$ brew update
$ brew upgrade springboot
```

`수동으로 CLI 설치하기`

Spring Boot CLI는 아래의 페이지에서 다운로드 할 수 있다.

> https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#getting-started-installing-the-cli

`Spring Boot CLI를 통한 프로젝트 생성`

아래의 예제는 Spring Boot을 통해 JPA를 통해 Database를 연동하는 웹 프로젝트를 생성한다. 빌드 도구는 `--build` 옵션을 통해 지정할 수 있다.

```
$ spring init --build=gradle --java-version=1.8 --dependencies=data-jpa spring-boot-jpa-example
```

`Spring Boot CLI에 대한 더 많은 정보들은 아래를 확인하자`

```
$ spring help
$ spring help run
$ spring help init
$ spring init --list
```

> https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#cli


## Gradle 프로젝트

지금까지 다양한 방법으로 Gradle 프로젝트를 생성하는 방법을 살펴보았다. 자! 이제 본격적으로 Spring Boot을 통해 애플리케이션을 개발해 볼 차례다. 개발하는 과정에서 프로젝트의 빌드 및 테스트하는 과정에서 다양한 요구사항이 발생할 수 있는데, Gradle Task를 통해 이를 자동화할 수 있다.

먼저 예제를 통해 생성한 Gradle 프로젝트의 구조를 살펴본 뒤 Gradle의 Task에 대해 자세히 살펴보도록 하겠다.

#### Gradle 프로젝트의 기본적인 구조
 
Path | Description
--|--
/src/main/java	| 런타임에 필요한 자바 클래스
/src/main/resources	| 런타임에 필요한 리소스
/src/test/java | 테스트 환경에 필요한 자바 클래스
/src/test/resources	| 테스트 환경에 필요한 리소스
build.gradle | Gradle Tasks

#### Gradle 시작하기

`build.gradle`

`Java 웹 애플리케이션 빌드하기`

#### Gradle Task 실행하기

#### 예제 프로젝트의 구조를 살펴보자

```
```

#### Spring Boot Gradle Plugin

```groovy
buildscript {
	repositories {
		maven { url 'https://repo.spring.io/libs-snapshot' }
	}

	dependencies {
		classpath files(pluginClasspath.split(','))
	}
}

apply plugin: 'org.springframework.boot'

springBoot {
    mainClass = 'com.stunstun.examples.ApiBootApplication'
}
```

#### Dependencies

```groovy
dependencies {
    compile("org.springframework.boot:spring-boot-starter-web")
    providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")
    testCompile("junit:junit")
}
```

#### Build Scope

`compile`

`testCompile`

`providedRuntime`

#### 지금 당장 필요한 Gradle Tasks

#### 사용자 Gradle Task 정의하기


다음 글에서는 지금까지 완성한 Gradle 프로젝트를 Github의 Git Repository에 연동하여 Spring Boot 애플리케이션을 통해 맘껏 뛰어놀 수 있는 놀이터를 만들어보자.

<br>

#### References

- https://gradle.org/
- http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/gradle-plugin//reference/html/
- https://github.com/Netflix/gradle-template