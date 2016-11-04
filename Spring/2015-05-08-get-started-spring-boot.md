## 목차 - 준비편

### ㄱ. Spring Boot 시작하기

ㄴ. STS IDE를 통한 개발환경 준비 및 Github에서 소소코드 관리하기

ㄷ. Github의 Spring Boot 예제 프로젝트 Import하기

ㄹ. Spring Boot과 Gradle 그리고 첫 테스트 케이스 만들어보기

ㅁ. Spring Loaded로 개발환경 개선하기

ㄱ. Spring Boot 시작하기


### 대상독자

- Spring Framework에 대한 기본적인 지식을 바탕으로 애플리케이션을 구현해보신 분
- Spring Boot을 통해 애플리케이션 개발을 시작하거나 프로젝트에 도입 예정인 분
- Spring Boot을 학습하는 데에 예제 프로젝트가 필요하신 분

<br>

## Spring Boot 시작하기

먼저 오랜만에 접한 Spring 진영의 가장 큰 변화는 Spring이 4.x Version 으로 업데이트 된 것과 Spring Boot의 출현이였다.

이 문서에서는 Spring Boot이 왜 출현하게 되었는지 그리고 어떻게 이전의 경험보다 효율적으로 개발할 수 있는지에 대한 이슈를 중점으로 설명해 나아가려고 합니다.


### Spring Boot은 어떻게 탄생되었는가

![spring-boot](http://image.toast.com/aaaaahq/spring-boot.png)
- spring projects 중 상위에 노출되고 있는 SPRING BOOT

---

Spring Boot 프로젝트를 **spring.io**에서 그들의 Blog에서 처음 발표하면서 아래와 같은 제목으로 발표를 하였다.


### _"Simplifying Spring for Everyone"_

> https://spring.io/blog/2013/08/06/spring-boot-simplifying-spring-for-everyone

모든 것에 대해 Spring을 간소화하는 것이라니.. 엄청난 일이지 않은가? 그렇다면 먼저 Spring Boot 이전에는 어떠한 점이 복잡했는지 보는 것을 시작으로 Spring Boot은 이러한 점들을 어떻게 해결해 나아갔는지 살펴보도록 하자.

<br>

## Spring Boot을 다음 프로젝트에 적용해야 할까?

Spring Framework 덕분에 J2EE의 지옥에서 벗어났음에도 불구하고 여전히 사람들은 Spring를 통해 애플리케이션을 개발하는데 대해서 부담을 느끼고 있다. 그 이유는 J2EE/Spring 모두 작은 규모의 애플리케이션 보다는 Large-Scale 과 Large-Team에 적합한 솔루션이기 때문이다.

**그 이유는 애플리케이션을 개발하다보면 아래와 같이 다양한 요구사항이 쏟아져 나온다.**

- Web개발을 많은 인원과 함께 MVC패턴을 통해 유연하게 개발해야 한다.
- Database와 연동해야 하는 이슈
- 통계데이터 생성 또는 대량의 데이터에 대한 Batch 프로세스를 실행해야 하는 경우
- 외부의 시스템과 통합을 해야 하는 이슈
- 외부 Cloud 환경과 연동해야 하는 이슈
- 다양한 보안이슈에 대응해야 되는 이슈 

<br>

### _"결국 어떻게 효율적으로 통합할 것인가에 대한 문제"_

Spring 진영에서는 이러한 다양한 문제를 spring-data, spring-web, spring-web-mvc, spring-batch, spring-cloud, spring-security, spring-integration 과 같은 다양한 하위 프로젝트를 통해 해결해 왔다.

### _"고마워 Spring! 그런데 말이지..."_

하지만 이와 동시에 Spring Framework를 사용하기 위한 복잡성은 증가해왔는데 점점 늘어나는 요구사항에 대처하기 위해서는 더욱 많은 Spring Framework와 관련된 project와 library를 관리해야 하고 모든 컴포넌트들은 긴밀하게 Dependency되어 초기 설정과 운영을 위한 비용은 점차 늘어갔다.

![complicated-spring-framework](http://www.ernestpackaging.com/wp-content/uploads/2015/12/EPS_complicated-answers.jpg)


**이를 해결하기 위해 Spring Boot에서 제시하고 있는 목표를 나열하면 다음과 같다.**

````
- Provide a radically faster and widely accessible getting started experience for all Spring development

- Be opinionated out of the box, but get out of the way quickly as requirements start to diverge from the defaults

- Provide a range of non-functional features that are common to large classes of projects (e.g. embedded servers, security, metrics, health checks, externalized configuration)

- Absolutely no code generation and no requirement for XML configuration
````

<br>

### 초기 환경설정에서 벗어나기, 더 나은 Bootstrap에 대한 필요성

Spring Boot Starter는 애플리케이션 구성에 필요한 Library를 쉽게 묶어서 제공하는 역할을 하기 때문에 더이상 힘들게 샘플 프로젝트를 찾아다니거나 기존 템플릿 역할을 하는 프로젝트를 두어 Copy & Paste 할 필요없이 쉽게 Spring Boot에서 제공하는 템플릿을 사용하거나 본인의 목적에 따라 선택하여 사용할  수도 있다.

![spring-starter](http://image.toast.com/aaaaahq/spring-starter-project.png)

예를 들면, Spring Core와 JPA를 통해 Database에 접근하고 싶다면 Spring Stater 에서 JPA와 목적에 맞는 SQL에 대한 dependency만을 추가하면 된다.

<br>

### Embeded Tomcat과 같은 Product 운영에 효율적인 기능들

Spring Boot 내부에서 Tomcat을 운영할 수 있게 되면서 외부에 의존적이지 않고 독립적(Stand-alone)인 상태로 웹 애플리케이션을 위한 서버 인스턴스를 생성할 수가 있다. 이 밖에도 아래와 같이 Product 운영에 필요한 다양한 기능을 활용할 수 있다.
- security
- metrics
- health check

<br>

### 쉽게 실행하기

Spring Boot 애플리케이션이 Stand-alone 한 상태가 되면서 **java -jar** 또는 아래와 같이 **Gradle Task**를 통해 직접 애플리케이션을 쉽게 실행 할수가 있다.

**Gradle Task로 Spring Boot 애플리케이션 실행하기**

```
@root] gradle api:bootRun
```

**빌드 후에 jar 직접 실행하기**

```
@root] gradle build
@root] java -jar build/libs/api-0.0.1-SNAPSHOT.jar
```

<br>

## 마치며

이 장에서는 Spring Boot의 출현 배경에 대해 알아보았고, 다음 장에서는 Spring Boot 애플리케이션을 개발하기 위한 개발환경 준비에 대해서 알아보겠다.


### Spring Boot 예제 프로젝트 모음

이 문서의 이론적인 내용은 모두 실습을 통해 Database와 연동하는 간단한 Spring Boot 애플리케이션을 개발해보는데 목적이 있습니다. 아래의 Github Repository에서 예제를 위한 프로젝트를 제공하고 있습니다. Spring Boot를 학습하는 데에 조금이나마 도움이 되었으면 합니다.

- https://github.com/wjdsupj/spring-boot-examples-for-beginner

Enviroments | Version (Lastest Updated 2016.10)
---|---
Spring Boot | 1.3.0.RELEASE
Gradle | 2.9

<br>

---

### References
- http://projects.spring.io/spring-boot/
- http://docs.spring.io/spring-boot/docs/1.4.1.RELEASE/reference/htmlsingle/
- https://spring.io/blog/2013/08/06/spring-boot-simplifying-spring-for-everyone
