---
title: Mac환경에서 Gradle기반의 Java개발환경 준비하기
date: 2016-10-04 11:54:07
categories: java
---

<img src='https://technologyconversations.files.wordpress.com/2014/06/gradle.png' width='500' />

이 문서에서는 Mac OSX 환경에서 Gradle기반으로 Java 개발환경을 준비하는 것을 설명합니다.

### 목차

- Java 설치하기
- Gradle 설치하기
- STS 설치하기
- 유용한 플러그인들
- Java 프로젝트 생성하기
- Gradle 프로젝트 생성하기
- 외부 프로젝트 Import 하기
- IDE에서 유용한 단축키들
- 나아가서

### Java 설치하기

Mac 환경에서는 Java 개발을 위한 JDK 뿐만 아니라 이외의 여러가지 패키지를 Homebrew를 통해 설치하는 것을 권장한다. Homebrew에 대한 자세한 설명은 아래의 링크를 참조한다.

- [Homebrew 설치](http://holaxprogramming.com/2016/10/03/get-started-homebrew/)

Homebrew 설치가 완료가 되면 Terminal에서 아래와 같은 Command를 통해 JDK를 설치할 수 있다.
````
$ brew update
$ brew cask install java
````

<br>

### Gradle 설치하기

Java를 통해 Back-End를 개발하기 위해 Spring Framework를 사용한다거나 Android 애플리케이션을 개발하기 위해서는 프로젝트 빌드 도구인 Gradle을 사용하는 것이 유리하다. Terminal에서 아래와 같이 설치 할 수 있다.

````
$ brew install gradle
````
- **Gradle** : https://gradle.org/

<br>

### Spring Tool Suite (STS) 설치하기

![spring-tool-suite.png](http://image.toast.com/aaaaahq/spring-tool-suite.png)

STS는 Spring을 운영하고 있는 Pivotal에서 제공하는 IDE이다. Eclipse를 기반으로 만들어 졌으며 Spring 애플리케이션을 개발할 때 필요한 환경과 Gradle과 같은 빌드환경, Git을 통한 협업을 쉽게 할 수 있도록 도와준다. Java를 통해 Back-End 애플리케이션 개발을 할 때 Spring Framework를 사용한다면 STS를 설치하는 것을 추천한다. 아래의 링크를 통해 IDE를 Download 할 수 있으며, 실행하기 전에는 JDK의 설치가 완료가 되어야 한다.

- https://spring.io/tools
- STS는 2016.10월 기준으로 3.8.2 Version이 RELEASE되었다.

<br>

### 유용한 플러그인들

STS설치가 완료가 되었으면 IDE에서 유용한 플러그인을 몇몇 소개하도록 하겠다. 플러그인 설치를 위해서는 메뉴에서 _Help > Eclipse Marketplace_ 를 통해 설치할 수 있다. 플러그인을 설치하고 적용하기 위해서는 IDE를 재시작해야 하는데 플러그인을 많이 설치할 경우에는 모든 플러그인이 설치가 완료되면 재시작하는 것을 권장한다.


#### Buildship Gradle Integration

STS에서 Gradle을 사용하기 위해 Gradle Support라는 플러그인을 제공했지만 Gradle에서 Eclipse를 위한 공식적인 플러그인 Buildship Gradle를 릴리즈하면서 STS의 기존의 Gradle Support는 Fade-Out 될 예정이다. 자세한 내용은 아래의 링크를 통해 확인 할 수 있다.
- https://github.com/eclipse/buildship/wiki/Migration-guide-from-STS-Gradle-to-Buildship

Gradle Buildship 설치를 위해서는 메뉴의 Help > Market Place 에서 Buildship을 검색한 후 설치하면 된다.

![buildship](http://image.toast.com/aaaaahq/buildship.png)


#### Color Theme 1.0.0

Color Theme 는 IDE에서 Side Effect 없이 코드를 이쁘게 보여주게 만들어 주는 플러그인 이다. 설치가 완료되면 메뉴의 Spring Tool Suite > Preferences 에서 Color Theme 메뉴를 통해 다양한 템플릿을 적용할 수가 있다.

- Color theme를 적용하기 전의 화면

![color-theme-before.png](http://image.toast.com/aaaaahq/color-theme-before.png)

- Color Theme를 적용한 화면

![color-theme.png](http://image.toast.com/aaaaahq/color-theme.png)

<br>

### Java 프로젝트 생성하기

이제 Java개발을 하기 위한 모든 준비가 완료되었다. 가장 기본적인 Java 프로젝트를 만들어보자.

**Project Name 과 JRE Version을 선택한다. JavaSE-1.8를 선택하는 것을 추천한다.**

![sts-create-project-1.png](http://image.toast.com/aaaaahq/sts-create-project-1.png)

**Package 이름을 입력하고 문자열을 출력하는 프로젝트를 만들어본다. _public static void main(String[] args)_ 를 선택해 활성화하면 main 메소드를 자동으로 생성할 수 있다.**

![sts-create-project-2.png](http://image.toast.com/aaaaahq/sts-create-project-2.png)

<br>

### Gradle 프로젝트 생성하기

**Wizard에서 Gradle Project를 선택**

![create-gradle-project](http://image.toast.com/aaaaahq/create-gradle-project-1.png)

**Project명을 입력하고 Next**

![create-gradle-project](http://image.toast.com/aaaaahq/create-gradle-project-2.png)

**Gradle Wrapper를 선택하고 Next**

![create-gradle-project](http://image.toast.com/aaaaahq/create-gradle-project-3.png)

**Gradle Project가 생성되는 중, 필요한 리소스를 원격으로 자동으로 다운로드 받는다.**

![create-gradle-project](http://image.toast.com/aaaaahq/create-gradle-project-4.png)

**Gradle Project 생성완료**

![create-gradle-project](http://image.toast.com/aaaaahq/create-gradle-project-5.png)

<br>

### 외부 프로젝트 Import 하기

프로젝트를 새롭게 생성하는 것이 아니라 외부의 프로젝트를 IDE에 가져오고 싶은 경우가 있을 것이다. 아래는 Spring Boot을 학습하기 위한 예제를 제공하는 Git Repository이다. 이 예제를 통해서 외부의 프로젝트를 IDE에 Import 해보겠다.

- https://github.com/wjdsupj/spring-boot-examples-for-beginner

**git clone을 통해 remote에서 소스코드 다운로드하기**
```
$ git clone https://github.com/wjdsupj/spring-boot-examples-for-beginner
```
- git이 설치되어 있지 않다면 Github에서도 직접 소스코드를 zip형태로 다운로드 받을 수가 있다

<br>

소스코드의 다운로드가 완료가 되었다면, IDE에서 아래와 같이 Import 해보자.

**메뉴에서 File > Import > Gradle Project를 선택하고 Next**

![import-gradle](http://image.toast.com/aaaaahq/import-gradle-1.png)

**다운로드받은 Gradle 프로젝트의 경로를 지정하고 Finish**

![import-gradle](http://image.toast.com/aaaaahq/import-gradle-2.png)

<br>

### IDE에서 유용한 단축키들

지금까지 Mac OSX에서 JDK를 설치하고 기본적인 Java프로젝트와 Gradle 프로젝트를 생성해 보는것으로 기본적인 개발환경을 준비해 보았다. STS IDE에서 개발하면서 유용한 단축키를 소개하는 것으로 이 글을 마무리 한다.

 Shortcut | Description
 ---|---
 **Command + F** | 소스코드내에서 검색하기
 **Command + S** | 현재 상태에서 소스코드 저장하기
 **Command + Shift + T** | 클래스 검색하기, 자신이 생성한 Class 뿐만 아니라 프로젝트에 포함된 외부라이브러리의 jar에서도 원하는 클래스를 검색할 수가 있다.
**Command + Shift + R** | 리소스 검색하기, java 파일 뿐만 아니라 XML 같은 리소스파일도 검색이 가능한다.
**Command + O** | 간편하게 현재 클래스에 속한 method를 요약하여 보여준다.
**Command + 1** | Quick Fix
**Command + D** | 현재 위치의 코드 한 줄을 삭제한다.
**Command + Shift + F** | 코드를 자동 정렬해 준다.
**Command + /** | 선택한 범위를 주석/주석제거 처리를 한다.

### 나아가서

개발을 하다보면은 로컬PC가 변경되거나 이외의 여러가지 이유로 개발환경을 다시 설치하고 준비해야 하는 일이 잦을 것 입니다. 문서를 통해 내용을 정리해두는 것도 좋은 방법이지만 이후에는 아래와 같은 방법으로 개발환경을 준비하는 시간을 절약하는 것을 추천합니다.

- 로컬개발환경을 자동으로 설치 할 수 있는 스크립트 정의하기
- iCloud Drive를 통해 IDE설정 및 개발리소스 관리하기

<br>

**모두 즐겁게 개발하세요 :)**
