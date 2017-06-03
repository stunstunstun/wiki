---
title: Spring Boot 시작하기
date: 2015-05-08 15:14:40
desc: 예제 중심의 Spring Boot 시작하기
categories: spring-boot
---

## Spring Boot 시작하기

2015년 현재, 애플리케이션 개발하기 위한 모든 기능을 처음부터 개발하는 것에 동의하는 사람이 있을까? Github를 통해 오픈소스 문화는 점점 발달하고 있으며 작은 규모의 서비스 뿐만 아니라 Google, Facebook과 같은 거대한 기업들도 그들의 서비스를 개발하면서 부딪히는 수 많은 문제에 대한 자신들의 노하우를 오픈소스화 하며 이를 공유하면서 더욱 발전시키고 있다.

Spring Framework는 Java 애플리케이션 및 Back-end를 위한 웹 애플리케이션 개발을 위해 지금까지 많은 사랑을 받아왔다. 최근의 Spring Framework의 가장 큰 변화는 Spring의 네 번째 큰 업데이트 뿐만 아니라 Spring Boot의 출현이 눈에 띈다.

이 문서에서는 Spring Boot이 왜 출현하게 되었는지 그리고 지금까지 Spring Framework만으로는 부족했던 문제 해결 방식을 살펴보도록 하자.

#### Spring Boot은 어떻게 탄생되었는가?

<img src='http://image.toast.com/aaaaahq/spring-boot.png'>

> spring projects 중 상위에 노출되고 있는 SPRING BOOT

Spring Boot 프로젝트를 `spring.io`에서 그들의 Blog에서 처음 발표하면서 아래와 같은 제목으로 발표를 하였다.


#### `"Simplifying Spring for Everyone"`

> Blog 참조
https://spring.io/blog/2013/08/06/spring-boot-simplifying-spring-for-everyone

Spring에서 일어나는 모든 것을 간단하게 만드는.. 무슨 뜻일까? 먼저 Spring Boot 이전에는 어떠한 점이 문제가 되었을지 살펴보고 Spring Boot은 이러한 점들을 어떻게 해결해 나아갔는지 살펴보도록 하자.

## 참을 수 없는 가벼움

Spring Framework 덕분에 J2EE의 지옥에서 벗어났음에도 불구하고 여전히 사람들은 Spring를 통해 애플리케이션을 개발하는데 대해서 부담을 느끼고 있다. 그 이유는 J2EE/Spring 모두 작은 규모의 애플리케이션 보다는 Large-Scale과 Large-Team에 적합한 솔루션이기 때문이다.

#### 그 이유는 아래와 같다 

- 규모가 큰 애플리케이션은 다양한 요구사항이 발생하며 끊임없이 유지보수 되어야 한다.
- 그러기 위해서는 다양한 모듈이 존재하는 프로젝트가 필요하며 프로젝트내에 필요한 모듈의 의존 관계를 효율적으로 관리해야 한다.
- 외부의 Database와 효율적으로 연동해야 한다
- 통계 데이터 생성 또는 대량의 데이터에 대한 Batch 프로세스를 실행해야 하는 경우가 많다
- 마이크로서비스 단위의 개발이 많기 때문에 외부의 시스템과 통합을 해야 한다.
- 변경 내역의 테스트를 자동화해야 하며 Quality Practice를 다양한 전략을 고려해야 한다 
- 외부의 클라우드 환경을 통해 효율적으로 배포해야 한다.
- 다양한 보안 이슈에 대응해야 되는 이슈 

#### 결국 어떻게 효율적으로 통합할 것인가에 대한 문제

Spring Framework에서는 Core Library를 시작으로 이와 같은 다양한 문제를 `spring-data` `spring-web` `spring-web-mvc` `spring-batch` `spring-cloud` `spring-security` `spring-integration`과 같은 다양한 하위 프로젝트를 통해 해결해 왔다.

#### 고마워 Spring! 그런데 말이지...

하지만 이와 동시에 Spring Framework를 사용하기 위한 복잡성은 증가해왔는데 그 이유는 점점 늘어나는 요구 사항에 대처하기 위해 더욱 많은 외부 시스템과 통합해야하며 연관된 모든 컴포넌트들은 긴밀하게 의존되어 있어 프로젝트의 초기 설정과 운영을 위한 비용은 점차 늘어갔다.

![complicated-spring-framework](http://www.ernestpackaging.com/wp-content/uploads/2015/12/EPS_complicated-answers.jpg)


#### 이를 해결하기 위한 Spring Boot의 주요 목표는

- 모든 Spring관련 개발을 위해 광범위하게 접근하고 빠르게 시작할 수 있는 경험을 제공한다
- 요구사항이 Spring의 범위에서 벗어나면 유연하게 외부에서 대처가 가능하도록
- 대규모 프로젝트의 운영에 적합한 Features를 제공 (e.g embedded servers, security, metrics, health checks, externalized configuration)
- XML에 의한 환경설정과 코드 Generation에서 벗어나기

> 참조
https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started-introducing-spring-boot.html

## 어떻게?

#### 초기 환경 설정에서 벗어나기, 더 나은 Bootstrap에 대한 필요성

Spring Boot Starter는 애플리케이션 구성에 필요한 다양한 의존 관계를 쉽게 묶어서 제공하는 역할을 하기 때문에 더이상 샘플 프로젝트를 찾아다니거나 기존 템플릿 역할을 하는 프로젝트를 두어 Copy & Paste 할 필요없이 쉽게 Spring Boot에서 제공하는 템플릿을 사용하거나 Dependencies를 본인의 목적에 따라 선택하여 사용할 수 있다.

![spring-starter](http://image.toast.com/aaaaahq/spring-starter-project.png)

예를 들면, Spring Core와 JPA를 통해 Database에 접근하고 싶다면 Spring Stater에서 JPA와 목적에 맞는 SQL에 대한 dependency만을 추가하면 된다.

#### 쉽게 빌드하고 쉽게 실행하기

Spring Boot 애플리케이션이 Embedded Tomcat를 통해 `stand-alone`한 상태가 되면서 아래와 같이 웹 애플리케이션을 쉽게 실행할 수 있다.

`Gradle Task`

```
$ gradle api:bootRun
```

`Build & Execute Jar`

```
$ gradle build
$ java -jar build/libs/api-0.0.1-SNAPSHOT.jar
```

#### Product의 운영까지도 쉽게 이어질 수 있게

Spring Boot 내부에서 Tomcat을 운영할 수 있게 되면서 외부에 의존적이지 않고 독립적으로 웹 애플리케이션을 위한 서버 인스턴스를 생성할 수가 있다. 이 밖에도 아래와 같이 Spring Actuator와 클라우드 서비스와의 연동을 통해 Product 환경에서 활용할 수 있는 다양한 특징을 가지고 있다.

살펴볼 내용들:

- Embedded Tomcat
- Spring Actuator의 다양한 특징들
- 클라우드 서비스에 배포하기

## 마치며

Spring Boot을 시작하면서 먼저 출현 배경에 대해 알아보았다. 이번 장에서 소개한 Spring Boot의 특징은 이후부터 점진적으로 살펴볼 예정이며, 다음 장에서는 본격적으로 애플리케이션을 개발하기 위한 환경을 구성하는 과정을 살펴보도록 하겠다.

<br>

#### References

- http://projects.spring.io/spring-boot/
- https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/
- https://spring.io/blog/2013/08/06/spring-boot-simplifying-spring-for-everyone
