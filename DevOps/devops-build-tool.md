---
title: 빌드 도구를 모르면 생기는 재앙들
date: 2011-12-24 15:14:40
desc: Spring과 Maven 프로젝트 시작하기
categories: devops
---

본격적으로 Spring Framework를 공부하기 위해 http://springsource.org 에서 제공되고 있는 오픈소스 프로젝트를 살펴보기 시작했다. 샘플 프로젝트를 가져와 소스코드를 보던중에 사내에서 개발하고 있는 프로젝트 형식과 차이가 있다는 것을 발견하였다.

> 예상은 했지만 Download 받은 소스코드는 기존의 개발 환경에서 동작하지 않는다!

## Maven?

그 이유는 Spring 프로젝트 뿐만 아니라 Java의 대다수의 프로젝트는 Maven이라는 빌드(Build) 도구를 통해 개발되고 있기 때문이였다.

> 현재 사내에서는 Maven과 같은 Build 도구를 사용하지 않고 이클립스 IDE에서 Java Project 또는 Dynamic Web Project를 통해 개발하고 로컬에서 직접 빌드하고 있다.

#### 그렇다면 Maven은 무엇을 하는 녀석인가?

Download한 소스 코드를 Build하고 실제로 동작을 시켜보기 위해서는 그 무엇보다 Build 도구부터 짚고 넘어가야 겠다는 생각이었다. Maven은 Java기반의 프로젝트를 효율적으로 Build 할 수 있도록 도와주는 도구이다. 그 무엇보다 Maven과 같은 Build 도구를 처음 접하게 되면서 전환된 패러다임은 프로젝트를 더 이상 개발자 PC의 IDE에서 빌드할 필요가 없어진 다는 것이였다.

## 빌드 도구를 모르면 생기는 재앙들

앞서 말한 것 처럼 Build 도구 없이 IDE를 통해서 빌드하고 운영 환경에 배포하는 프로세스는 여러가지 재앙을 가져다 준다.

- 가장 큰 재앙은 운영 환경에 배포되는 Version이 개발자의 PC에 의해서 결정되어 진다는 것이다.
- 이것을 시작으로 더욱 큰 재앙이 시작되는데 빌드 및 배포를 자동하는 것이 불가능해진다.

> 이로 인해서 수동으로 진행되는 배포 과정에서 개발자의 실수들이 제품에 그대로 영향을 미칠 수 있다는 것이다.

#### Maven의 특징은?

1. 프로젝트를 모델링 - 다양한 목적을 가지고 있는 플러그인은 POM(Project Object Model)으로 정의된다. 프로젝트에 의존되는 라이브러리들은 pom.xml에서 의존관계를 정의한다.

2. Maven 플러그인을 통한 전역적인 재사용 - Maven은 빌드에 대한 대부분의 책임을 각 플러그인에 위임한다. 이러한 플러그인들은 Maven 저장소(Repository)에 저장되어 진다.

3. 공통 인터페이스 - Maven 이전에는 각 개발환경에 대한 빌드 프로세스를 파악하는데 시간이 꽤나 소요되었는데 빌드에 필요한 프로세스를 정의하고 이를 인터페이스로 제공함으로써 문제를 해결하였다고 한다.

> Maven에서 제공하는 이러한 특징을 이용해서 개발자는 프로젝트에 필요한 다양한 플러그인을 효율적으로 관리하고 개발자의 IDE가 아닌 별도의 빌드 머신에서 빌드하고 결과물을 운영서버에 배포하는 과정을 자동화 할 수 있게 된다!

<img src='https://docs.google.com/drawings/d/sXI3kLvdTi1iS2O2nA5En9g/image?w=720&h=513&rev=1009&ac=1' />

#### 실제로 사용해보자

Spring + Maven 프로젝트를 효율적으로 관리하기 위해서 기존의 이클립스 대신 STS IDE를 사용하기로 했다. STS는 이클립스 기반에 Maven과 이클립스의 Maven 플러그인인 m2Eclipse가 포함된 통합 개발환경이라고 보면 된다.

STS를 통해 새로운 Maven Project를 생성하게 되면 아래와 같은 프로젝트 구조를 가진다.

| Directory | Desc |
--|--
/src/main/java | 자바 클래스 파일
/src/main/resource | 스프링 환경 설정에 필요한 리소스 파일들
/src/test/java | JUnit을 이용한 단위테스트를 위한 클래스는 이곳에
/src/test/resource | 테스트 환경에서 필요한 리소스파일들
pom.xml | 프로젝트정보, 프로젝트에 필요한 라이브러리, 플러그인을 정의

#### pom.xml

POM(Project Object Model)은 Maven의 근간이 되는 개념으로 현재 프로젝트의 구성과 프로젝트에서 사용하고 있는 외부 플러그인 그리고 각 플러그인들 간의 의존 관계를 pom.xml에 정의 할 수가 있다.

**프로젝트의 구조**

```xml
.
 |-- my-module
 |   `-- pom.xml
 `-- pom.xml
```

**pom.xml 예시**

```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.mycompany.app</groupId>
  <artifactId>my-app</artifactId>
  <version>1</version>
  <packaging>pom</packaging>

  <modules>
    <module>my-module</module>
  </modules>
</project>
```

이클립스의 Dynamic Web Project 구조는 웹 애플리케이션 프로젝트에 기반이 되는 Spring Framework, Database Connnection을 위한 기반 라이브러리, Freemarker와 같은 Template 엔진 등을 사용하기 위해서는 /WEB-INF/lib에 필요한 라이브러리을 개발자가 직접 복사해 사용했지만, Maven을 활용하면 pom.xml를 이용해 프로젝트에 필요한 라이브러리를 정의하고 Version도 효율적으로 관리 할 수 있다. 뿐만 아니라 pom.xml 정의한 다양한 플러그인은 Maven Repositoriy를 통해 Remote로 자동으로 Download하여 Local에서 관리 할 수 있다.

## 마치며

Maven에 대해 간략하게 한번 알아보았고, 결과적으로 실제 오픈소스 프로젝트를 다운로드한 후 동작해 볼 수 있는 행복한 결과가 찾아오게 되었다. 뿐만 아니라 Maven이라는 도구를 통해 지금까지 빌드 도구를 몰랐을 때 겪었던 재앙들에서 벗어날수 있는 실마리를 찾은 수확이 더욱 크다.

## 참고

- https://maven.apache.org/
- https://maven.apache.org/guides/introduction/introduction-to-the-pom.html
