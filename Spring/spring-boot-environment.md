---
title: STS IDE를 통한 개발 환경 준비
date: 2015-05-10 15:14:40
desc: 예제 중심의 Spring Boot 시작하기
categories: spring-boot
---
 이 문서에서는 Spring Boot 애플리케이션을 개발하기 위해서 기본적인 구성 요소들을 살펴본다. 먼저 개발자의 로컬 환경에서 필요한 구성 요소를 시작으로 Github에서 프로젝트의 소스 코드를 관리하는 방법 까지 알아 보겠다.

## STS IDE를 통한 개발환경 준비

Spring Boot 애플리케이션 효율적으로 작성하고 관리하기 위해서 우리는 앞으로 spring.io 에서 제공하는 통합 개발 환경인 STS IDE를 사용하도록 하겠다. STS IDE를 사용하기 위해 필요한 것들을 하나 하나 살펴보자.

#### Java 설치하기

STS IDE를 실행하기 위해서는 운영체제에 JDK가 필수적으로 설치되어 있어야만 한다.

**Mac OSX**

Mac 환경에서는 Java 개발을 위한 JDK 뿐만 아니라 이외의 여러가지 패키지를 Homebrew를 통해 설치하는 것을 권장한다. Homebrew에 대한 자세한 설명은 아래의 링크를 참조한다.

- [Homebrew 설치](https://github.com/wjdsupj/stunstun-wiki/blob/master/AWS/2016-10-03-local-install-homebrew.md)

Homebrew 설치가 완료가 되면 Terminal에서 아래와 같은 Command를 통해 JDK를 설치할 수 있다.

````
$ brew update
$ brew cask install java
````

**Windows**

아래의 페이지에서 JDK를 수동으로 다운로드 하고 설치하자.

- http://www.oracle.com/technetwork/java/javase/downloads/index.html

**설치확인**

```
$ java -version
```

#### STS(Spring Tool Suite) IDE  설치하기

**Download** - https://spring.io/tools

![spring-tool-suite.png](http://image.toast.com/aaaaahq/spring-tool-suite.png)

STS는 Spring을 운영하고 있는 Pivotal에서 제공하는 IDE이다. Eclipse를 기반으로 만들어 졌으며 Spring 애플리케이션을 개발할 때 필요한 환경과 Gradle과 같은 빌드환경, Git을 통한 협업을 쉽게 할 수 있도록 도와준다. Java를 통해 Back-End 애플리케이션 개발을 할 때 Spring Framework를 사용한다면 STS를 설치하는 것을 추천한다. 첨부된 링크를 통해 IDE를 **Download** 할 수 있으며, 실행하기 전에는 JDK의 설치가 완료가 되어야 한다.

#### Gradle 설치하기 

Java를 통해 Back-End를 개발하기 위해 Spring Framework를 사용한다거나 Android 애플리케이션을 개발하기 위해서는 프로젝트 빌드 도구인 Gradle을 사용하는 것이 유리하다. 

**Mac OSX**

Terminal에서 아래와 같이 설치 할 수 있다. 

```
$ brew install gradle
```

**Windows**

아래의 페이지에서 Gradle를 다운로드할 수 있다.

- https://gradle.org/gradle-download/

**설치확인**

```
$ gradle --version
```

> Gradle의 Version과 JVM 정보가 출력이 되면 정상적으로 설치된 것이다.

#### IDE에 Gradle 플러그인 설치

**Buildship Gradle Integration**

STS에서 Gradle을 사용하기 위해 Pivotal에서 Gradle Support라는 플러그인을 제공했지만 gradle.org 에서 Eclipse를 위한 공식적인 플러그인 Buildship Gradle를 Release 하면서 STS의 기존의 Gradle Support는 Fade-Out 될 예정이다. 자세한 내용은 아래의 링크를 통해 확인 할 수 있다.

- https://gradle.org/videos/buildship-the-new-gradle-integration-for-eclipse
- https://github.com/eclipse/buildship/wiki/Migration-guide-from-STS-Gradle-to-Buildship

Gradle Buildship 설치를 위해서는 메뉴의 Help > Market Place 에서 Buildship을 검색한 후 설치하면 된다.

![buildship](http://image.toast.com/aaaaahq/buildship.png)


#### 그 밖의 유용한 플러그인

STS설치가 완료가 되었으면 IDE에서 유용한 플러그인을 몇몇 소개하도록 하겠다. 플러그인 설치를 위해서는 메뉴에서 _Help > Eclipse Marketplace_ 를 통해 설치할 수 있다. 플러그인을 설치하고 적용하기 위해서는 IDE를 재시작해야 하는데 플러그인을 많이 설치할 경우에는 모든 플러그인이 설치가 완료되면 재시작하는 것을 권장한다.

**Color Theme 1.0.0**

Color Theme 는 IDE에서 Side Effect 없이 코드를 이쁘게 보여주게 만들어 주는 플러그인 이다. 설치가 완료되면 메뉴의 Spring Tool Suite > Preferences 에서 Color Theme 메뉴를 통해 다양한 템플릿을 적용할 수가 있다.

- Color theme를 적용하기 전의 화면

![color-theme-before.png](http://image.toast.com/aaaaahq/color-theme-before.png)

- Color Theme를 적용한 화면

![color-theme.png](http://image.toast.com/aaaaahq/color-theme.png)


<br>

#### References

- http://projects.spring.io/spring-boot/
- https://spring.io/blog/2013/08/06/spring-boot-simplifying-spring-for-everyone
