---
title: Spring Boot 개발 환경 준비
date: 2015-05-10 15:14:40
desc: 예제 중심의 Spring Boot 시작하기
categories: spring-boot
---

이 문서에서는 Spring Boot 애플리케이션을 개발하기 위해서 기본적인 구성 요소들을 살펴본다. 먼저 개발자의 로컬 환경에서 필요한 요소들인 Java, Gradle를 설치하고 `spring.io`에서 제공하는 통합 개발 환경인 STS IDE를 통해 프로그래밍하는 것이 목적이다.

## 기본 환경 구성

먼저 Spring Boot 애플리케이션을 개발하고 실행하기 위해서는 운영체제에 Java와 Gradle을 설치해야 한다.

#### Java 설치하기

Spring Boot의 통합 개발 환경인 STS IDE를 실행하기 위해서는 운영체제에 JDK가 설치되어 있어야 한다.

`Mac OSX에서 설치하기`

Mac OSX에서는 JDK 뿐만 아니라 다양한 패키지를 Homebrew를 통해 설치하는 것을 권장한다. Homebrew를 설치하기 위해서는 아래의 환경이 준비되어 있어야 한다.

- Xcode
- Xcode Command Line Tools


준비가 되었다면 Terminal에서 아래와 같이 설치한다.

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Homebrew를 통해 최신 Version의 Open JDK를 설치할 수 있다.

````
$ brew update
$ brew cask install java
````

`Windows에서 설치하기`

아래의 페이지에서 JDK를 수동으로 다운로드 하고 설치하자.

- http://www.oracle.com/technetwork/java/javase/downloads/index.html

JDK를 설치하고 운영체제에 환경변수를 등록하면 아래와 같이 JDK의 Version을 확인해보자

```
$ java -version
java version "1.8.0_102"
Java(TM) SE Runtime Environment (build 1.8.0_102-b14)
Java HotSpot(TM) 64-Bit Server VM (build 25.102-b14, mixed mode)
```

#### Gradle 설치하기 

Spring Boot 애플리케이션을 개발하고 효율적으로 프로젝트를 관리하기 위해서는 빌드 도구인 Gradle을 사용하는 것이 유리하다. 

`Mac OSX에서 설치하기`

Homebrew를 통해 아래와 같이 설치 할 수 있다. 

```
$ brew install gradle
```

`Windows에서 설치하기`

아래의 페이지에서 Gradle를 다운로드하고 설치한다.

- https://gradle.org/gradle-download/

Gradle을 설치하고 운영체제에 환경변수를 등록하면 아래와 같이 Gradle의 Version을 확인해보자

```
$ gradle -version

------------------------------------------------------------
Gradle 3.5
------------------------------------------------------------
...
```

> Gradle의 Version과 JVM 정보가 출력이 되면 정상적으로 설치된 것이다.


## STS(Spring Tool Suite) IDE 설치하기

![spring-tool-suite.png](http://image.toast.com/aaaaahq/spring-tool-suite.png)

Spring Tool Suite는 Spring Framework를 주도적으로 개발하고 있는 Pivotal에서 제공하는 통합 개발 환경(IDE)이다. Eclipse를 기반으로 만들어 졌으며 Spring 애플리케이션을 개발할 때 필요한 환경과 Gradle를 효과적으로 사용할 수 있는 플러그인 그리고 Git Repository를 이용해 협업을 쉽게 할 수 있도록 도와준다. 아래의 링크를 통해 다운로드할 수 있다.

> https://spring.io/tools

#### IDE에 Gradle 플러그인 설치

`Buildship Gradle Integration`

STS에서 Gradle을 사용하기 위해 Pivotal에서 Gradle Support라는 플러그인을 제공했지만 gradle.org 에서 Eclipse를 위한 Buildship Gradle이라는 플러그인을 Release하면서 STS의 기존의 Gradle Support는 Fade-Out 될 예정이다. 자세한 내용은 아래의 링크를 통해 확인 할 수 있다.

> New Gradle Integration for Eclipse
https://gradle.org/videos/buildship-the-new-gradle-integration-for-eclipse
https://github.com/eclipse/buildship/wiki/Migration-guide-from-STS-Gradle-to-Buildship

Gradle Buildship 설치를 위해서는 메뉴의 Help > Market Place 에서 Buildship을 검색한 후 설치하면 된다.

![buildship](http://image.toast.com/aaaaahq/buildship.png)

#### 그 밖의 유용한 플러그인

STS IDE의 설치가 완료가 되었다면 그 밖의 유용한 플러그인을 소개하도록 하겠다. 플러그인 설치를 위해서는 IDE의 메뉴 `Help > Eclipse Marketplace`에서 설치할 수 있다. 플러그인을 설치하고 적용하기 위해서는 IDE를 재시작해야 하는데 플러그인을 많이 설치할 경우에는 모든 플러그인이 설치가 완료되면 재시작하는 것을 권장한다.

`Color Theme 1.0.0`

Color Theme 는 IDE에서 사이드 이펙트없이 코드 하이라이트 기능을 제공하는 플러그인 이다. 설치가 완료 되면 메뉴의 `Spring Tool Suite > Preferences > Color Theme`를 통해 다양한 템플릿을 적용할 수가 있다.

Color theme를 적용하기 전의 화면:

![color-theme-before.png](http://image.toast.com/aaaaahq/color-theme-before.png)

Color Theme를 적용한 화면:

![color-theme.png](http://image.toast.com/aaaaahq/color-theme.png)


지금까지 STS IDE를 중심으로 Spring Boot 애플리케이션을 개발하기 위한 기본적인 환경을 구성해 보았다. 다음 글에서는 Gradle 기반의 프로젝트를 생성해보고 프로젝트를 효율적으로 관리하기 위한 방법을 알아보도록 하겠다.

<br>

#### References

- http://projects.spring.io/spring-boot/
- https://spring.io/blog/2013/08/06/spring-boot-simplifying-spring-for-everyone
