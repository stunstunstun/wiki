---
title: Gradle을 통해 프로젝트를 효율적으로 관리하자
date: 2015-05-12 15:14:40
desc: 예제 중심의 Spring Boot 시작하기
categories: spring-boot
---

지금까지 Spring Boot 애플리케이션을 개발하기 위한 다양한 로컬 환경을 구성해 보았다. 앞으로 우리는 애플리케이션을 프로젝트라는 단위로 관리해야 하는데 점점 복잡해지는 프로젝트의 구조를 Gradle이라는 도구를 통해 효율적으로 관리 할 수가 있다.

#### Gradle?


#### STS IDE에서 프로젝트 생성하기

먼저 STS IDE를 통해서 프로젝트를 생성하는 방법을 알아보고 그 밖의 프로젝트 생성방법도 살펴보자. IDE의 메뉴에서 New Project > Spring Starter Project를 통해 프로젝트를 생성할 수 있다.

![create-project-1](http://image.toast.com/aaaaahq/create-boot-1.png)

Staters는 일종의 특정기능을 제공하기 위한 세트인데 이전처럼 샘플코드에서 의존관계에 있는 라이브러리를 참고하거나 설정을 위해 코드를 Copy & Paste 할 필요가 없다. 프로젝트의 사용목적에 따라 Spring Boot에서 제공하는 Starter를 선택하여 프로젝트를 생성한다. 예를 들면 Spring과 JPA를 통해 Database에 접근하고 싶다면 `spring-boot-starter-data-jpa` 를 프로젝트에 추가하는 것만으로 모든 것이 해결된다.

- https://github.com/spring-projects/spring-boot/tree/master/spring-boot-starters

![create-project-2](http://image.toast.com/aaaaahq/create-boot-2.png)

#### Spring Boot Initializr 페이지에서 프로젝트 생성하기

spring.io에서는 Spring Boot 애플리케이션을 생성하기 위한 웹 페이지를 제공한다.

- http://start.spring.io

![create-project-3](http://image.toast.com/aaaaahq/create-boot-3.png)

#### Spring Boot CLI를 통해 프로젝트 생성하기

Spring Boot CLI는 Spring에서 제공하는 일종의 Command Line Tool로서 프로젝트 생성시에 IDE없이 초기 설정을 신속하게 진행하고자 할 때 유리하다. IDE에서 생성한 프로젝트와 동일한 프로젝트를 아래와 같이 생성할 수가 있다.

**Spring Boot CLI 설치하기**

```
$ brew tap pivotal/tap
$ brew install springboot
$ spring --version
```

**Spring Boot CLI 업데이트**

```
$ brew update
$ brew upgrade springboot
```

**수동으로 CLI 설치하기**

> https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#getting-started-installing-the-cli

**Spring Boot CLI를 통한 프로젝트 생성**

```
$ spring init --build=gradle --java-version=1.8 --dependencies=web, data-jpa spring-boot-jpa-example
```

**Spring Boot CLI에 대한 더 많은 정보들**

```
$ spring help
$ spring help run
$ spring help init
$ spring init --list
```

> https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#cli



우리는 이전 글에서 Spring Boot 애플리케이션을 생성하고 프로젝트를 Github에 연동해 보았다. Spring Boot 애플리케이션은 Gradle을 통해 컴파일, 테스트 등의 다양한 Task를 진행 할 수 있는데 Gradle은 어떻게 프로젝트를 관리하며 Task 단위를 관리하게 되는지 살펴보자. 

## Gradle 프로젝트의 구조

Path | Description
--|--
/src/main/java	| Java Sources
/src/main/resources	| Resources
/src/test/java | 테스트를 위한 Java Sources
/src/test/resources	| 테스트를 위한 Resources
build.gradle | 프로젝트에서 사용되는 라이브러리를 정의하고 Gradle의 Tasks를 관리한다

## Spring Boot Gradle 플러그인

```groovy
springBoot {
    mainClass = 'com.stunstun.examples.ApiBootApplication'
}
```

## Build 단위

```groovy
apply plugin: 'java'
apply plugin: 'war'

...

war {
    baseName = rootProject.name
}
```

## Dependencies

```groovy
dependencies {
    compile("org.springframework.boot:spring-boot-starter-web")
    providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")
    testCompile("junit:junit")
}
```

#### compile

#### testCompile

#### providedRuntime

## Gradle Tasks

다음 글에서는 Spring Boot 애플리케이션을 개발하기 위해 생성한 Gradle 프로젝트를 Github를 통해 Git Repository에 연동하는 과정을 살펴 보겠다.

<br>

#### References

- https://github.com/Netflix/gradle-template