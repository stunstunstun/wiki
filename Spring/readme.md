## Overview

현재 많은 개발자가 Spring Framework를 통해 Back-End 개발을 하고 있습니다. 저 역시 회사에서 맡은 첫 업무가 Spring을 학습하고 이를 통해서 게임포털을 운영하는 것으로 기억이 납니다.

이후에 Android, iOS, Unity 플랫폼 같은 클라이언트 환경에서 개발을 하게 되면서 한 동안 Spring에 대한 경험을 지속적으로 할 수 없는 상태였는데 최근 2년만에 다시 Spring을 통해 Back-End개발을 하면서 필요했던 내용을 정리하고자 합니다.

**이 문서를 위한 예제는 Spring Boot, Gradle 를 아래의 Version을 기준으로 2015년 5월에 작성되었습니다.**

 Enviroments | Version 
---|---
Spring Boot | 1.2.5.RELEASE
Gradle | 2.6

<br>

## 목차

### 준비하기

ㄱ. Spring Boot 시작하기

ㄴ. STS를 통한 개발환경 준비 그리고 Gradle로 프로젝트 빌드해보기

ㄷ. Spring Boot과 Gradle 프로젝트 

ㄹ. Spring Loaded로 개발환경 개선하기

<br>

### 실습

a. Spring Boot에서 고전적인 JDBC 연동하기

b. Spring Boot에서 Java Config를 통해 mybatis 연동하기

c. Spring Boot에서 2개 이상의 Datasource 운용하기

<br>

##  예제코드 살펴보기

이 문서는 이론적인 내용은 모두 실제 Spring Boot을 통해 Database와 연동하는 간단한 애플리케이션을 개발해보는데 목적이 있습니다.

아래의 Github Repository에서 예제를 위한 프로젝트를 제공하고 있습니다. Spring Boot를 학습하는데에 조금이나마 도움이 되었으면 합니다.
> https://github.com/wjdsupj/spring-boot-examples-for-beginner
