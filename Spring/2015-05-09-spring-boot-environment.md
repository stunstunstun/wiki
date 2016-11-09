
## STS IDE를 통한 개발환경 준비

목차의 **Spring Boot 시작하기**를 통해서 Spring Boot의 출현배경에 대해 알아보았고 이 문서에서는 Spring Boot 애플리케이션을 개발하기 위해서 로컬환경에서 필요한 구성요소에 대해서 알아보도록 하겠습니다.

### Java 설치하기

STS IDE를 실행하기 위해서는 OS에 JDK가 필수적으로 설치되어 있어야만 한다.

_**Mac**_

Mac 환경에서는 Java 개발을 위한 JDK 뿐만 아니라 이외의 여러가지 패키지를 Homebrew를 통해 설치하는 것을 권장한다. Homebrew에 대한 자세한 설명은 아래의 링크를 참조한다.

- [Homebrew 설치](https://github.com/wjdsupj/stunstun-wiki/blob/master/AWS/2016-10-03-local-install-homebrew.md)

Homebrew 설치가 완료가 되면 Terminal에서 아래와 같은 Command를 통해 JDK를 설치할 수 있다.
````
$ brew update
$ brew cask install java
````

_**Windows**_

아래의 페이지에서 JDK를 다운로드 할수 있습니다.

- http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

**설치확인**

```
$ java -version
```

<br>

### STS(Spring Tool Suite) IDE  설치하기

**Download** - https://spring.io/tools

![spring-tool-suite.png](http://image.toast.com/aaaaahq/spring-tool-suite.png)

STS는 Spring을 운영하고 있는 Pivotal에서 제공하는 IDE이다. Eclipse를 기반으로 만들어 졌으며 Spring 애플리케이션을 개발할 때 필요한 환경과 Gradle과 같은 빌드환경, Git을 통한 협업을 쉽게 할 수 있도록 도와준다. Java를 통해 Back-End 애플리케이션 개발을 할 때 Spring Framework를 사용한다면 STS를 설치하는 것을 추천한다. 첨부된 링크를 통해 IDE를 **Download** 할 수 있으며, 실행하기 전에는 JDK의 설치가 완료가 되어야 한다.

> STS는 2016.10월 기준으로 3.8.2 Version이 RELEASE되었다.

<br>

### Gradle 설치하기 

Java를 통해 Back-End를 개발하기 위해 Spring Framework를 사용한다거나 Android 애플리케이션을 개발하기 위해서는 프로젝트 빌드 도구인 Gradle을 사용하는 것이 유리하다. 

_**Mac**_

Terminal에서 아래와 같이 설치 할 수 있다. 

```
$ brew install gradle
```

_**Windows**_

아래의 페이지에서 Gradle를 다운로드할 수 있다.

- https://gradle.org/gradle-download/

**설치확인**

```
$ gradle --version
```
- Gradle의 Version과 JVM 정보가 출력이 되면 정상적으로 설치된 것이다.

<br>

### Gradle 플러그인 설치

**Buildship Gradle Integration**

STS에서 Gradle을 사용하기 위해 Pivotal에서 Gradle Support라는 플러그인을 제공했지만 gradle.org 에서 Eclipse를 위한 공식적인 플러그인 Buildship Gradle를 Release 하면서 STS의 기존의 Gradle Support는 Fade-Out 될 예정이다. 자세한 내용은 아래의 링크를 통해 확인 할 수 있다.

- https://gradle.org/videos/buildship-the-new-gradle-integration-for-eclipse
- https://github.com/eclipse/buildship/wiki/Migration-guide-from-STS-Gradle-to-Buildship

Gradle Buildship 설치를 위해서는 메뉴의 Help > Market Place 에서 Buildship을 검색한 후 설치하면 된다.

![buildship](http://image.toast.com/aaaaahq/buildship.png)


### 그 밖의 유용한 플러그인

STS설치가 완료가 되었으면 IDE에서 유용한 플러그인을 몇몇 소개하도록 하겠다. 플러그인 설치를 위해서는 메뉴에서 _Help > Eclipse Marketplace_ 를 통해 설치할 수 있다. 플러그인을 설치하고 적용하기 위해서는 IDE를 재시작해야 하는데 플러그인을 많이 설치할 경우에는 모든 플러그인이 설치가 완료되면 재시작하는 것을 권장한다.

**Color Theme 1.0.0**

Color Theme 는 IDE에서 Side Effect 없이 코드를 이쁘게 보여주게 만들어 주는 플러그인 이다. 설치가 완료되면 메뉴의 Spring Tool Suite > Preferences 에서 Color Theme 메뉴를 통해 다양한 템플릿을 적용할 수가 있다.

- Color theme를 적용하기 전의 화면

![color-theme-before.png](http://image.toast.com/aaaaahq/color-theme-before.png)

- Color Theme를 적용한 화면

![color-theme.png](http://image.toast.com/aaaaahq/color-theme.png)

<br>

## Github에서 프로젝트 Version 관리하기

지금까지 Spring Boot 애플리케이션을 개발하기 위한 기본적인 구성 요소들을 준비해 보았다. 지금부터는 Gradle로 빌드하게 되는 Spring Boot 프로젝트를 생성해보고 이 프로젝트에 대한 Version관리를 위해서  Github 사용법을 간단히 알아보도록 하겠다.

### STS IDE에서 프로젝트 생성하기

먼저 STS IDE를 통해서 프로젝트를 생성하는 방법을 알아보고 그 밖의 프로젝트 생성방법도 살펴보자. IDE의 메뉴에서 New Project > Spring Starter Project를 통해 프로젝트를 생성할 수 있다.

![create-project-1](http://image.toast.com/aaaaahq/create-boot-1.png)

Staters는 일종의 특정기능을 제공하기 위한 세트인데 이전처럼 샘플코드에서 의존관계에 있는 라이브러리를 참고하거나 설정을 위해 코드를 Copy & Paste 할 필요가 없다. 프로젝트의 사용목적에 따라 Spring Boot에서 제공하는 Starter를 선택하여 프로젝트를 생성한다. 예를 들면 Spring과 JPA를 통해 Database에 접근하고 싶다면 **spring-boot-starter-data-jpa**를 프로젝트에 추가하는 것만으로 모든 것이 해결된다.

- https://github.com/spring-projects/spring-boot/tree/master/spring-boot-starters

![create-project-2](http://image.toast.com/aaaaahq/create-boot-2.png)

### [Optional] Spring Boot Initializr 페이지에서 프로젝트 생성하기

아래의 웹페이지에서도 쉽게 애플리케이션을 생성할 수 있다.

- http://start.spring.io

![create-project-3](http://image.toast.com/aaaaahq/create-boot-3.png)

### [Optional] Spring Boot CLI를 통해 프로젝트 생성하기

Spring Boot CLI는 Spring에서 제공하는 일종의 Command Line Tool로서 프로젝트 생성시에 IDE없이 초기 설정을 신속하게 진행하고자 할때 유리하다. IDE에서 생성한 프로젝트와 동일한 프로젝트를 아래와 같이 생성할 수가 있다.

**Mac에서 Spring Boot CLI 설치하기**
```
$ brew tap pivotal/tap
$ brew install springboot
```

**수동으로 CLI 설치하기**

> https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#getting-started-installing-the-cli


**Spring Boot CLI를 통한 프로젝트 생성**

```
$ spring init --build=gradle --java-version=1.8 --dependencies=web,data-jpa spring-boot-jpa-example
```

**Spring Boot CLI에 대한 더 많은 정보들**
- https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#cli
```
$ spring help
$ spring help run
$ spring help init
$ spring init --list
```

<br>

### Github 가입후에 Public Repository 생성하기

Github는 이미 전 세계의 많은 개발자와 기업에서 프로젝트 관리를 위해 사용하고 있는 서비스이다. 프로젝트의 소스코드를 호스팅하고 관리할 수 있게 해주며 Git을 통해 소스코드의 이력 즉 Version관리를 할 수 있도록 도와준다. 먼저 Github 가입을 위해 아래의 링크에 접속한다.

- https://github.com

첫 페이지에서 ID와 이메일주소, 패스워드를 입력하는 것만으로 가입이 완료가 되는데, 가입이 완료가 되었다면 첫 Repository를 생성해 보도록 하자. Repository는 public / private Repository로 나뉘는데 Github의 유료서비스를 이용하면 private Repository를 통해 비공개로 Repository를 관리할 수가 있다.

<br>

**New Repository를 선택**

![github-step-1](http://image.toast.com/aaaaahq/github-step-1.png)

<br>

**Repository에 대한 정보를 입력**

![github-step-2](http://image.toast.com/aaaaahq/github-step-2.png)

<br>

**Repository가 생성되면 자신의 repository의 리스트를 아래와 같이 private/public 별로 확인이 가능하다.**

![github-step-3](http://image.toast.com/aaaaahq/github-step-3.png)

<br>

### 원격저장소에 Push

이 문서에서는 Git에 대한 자세한 설명을 하지는 않습니다. 아래의 Command는 생성한 프로젝트를 Github에 처음으로 생성한 Repository에 Push하는 과정까지를 포함합니다.

Git Command | Description |
---|---
git init | 현재 디렉토리에서 Git Repository를 생성합니다.
git remote add {name} {repository-url} | 새로운 원격 Repository를 생성합니다. 
git add {file-name} | 스테이지영역에 올라가지 않은 파일들을 스테이지 영역으로 이동시킵니다.
git commit -m "{commit-message}" | 스테이지영역에 올라가 있는 파일들은 commit 합니다. commit 메세지는 필수사항 입니다.
git push {name} master | 변경내역을 origin 저장소의 master branch에 pushing 합니다.

**Terminal**
```
$ git init
$ git remote add {name} https://github.com/{user-name}/{repository-name}.git
$ git add .
$ git commit -m "{commit-message}"
$ git push origin master
```
- name : 원격 저장소의 Repository 이름 origin 으로 명명하는 하는 것을 추천합니다.
- repository-url : Github에서 생성한 Git Repository의 주소
- file-name : 추가할 대상 파일
- user-name : Github에 가입한 계정 이름
- repository-name : Github에 생성한 Public Repository 이름
- commit-message : branch에 commit시에는 항상 commit 메세지를 포함해야 합니다.

<br>

### 외부 프로젝트 Import 하기

프로젝트를 새롭게 생성하는 것이 아니라 외부의 프로젝트를 IDE에 가져오고 싶은 경우가 있을 것이다. 아래는 Spring Boot을 학습하기 위한 예제를 제공하는 Git Repository이다. 이 예제를 통해서 외부의 프로젝트를 IDE에 Import 해보겠다.

- https://github.com/wjdsupj/spring-boot-examples-for-beginner

**git clone을 통해 remote에서 소스코드 다운로드하기**
```
$ git clone https://github.com/wjdsupj/spring-boot-examples-for-beginner
```
- git이 설치되어 있지 않다면 Github에서도 직접 소스코드를 zip형태로 다운로드 받을 수가 있다.

<br>

소스코드의 다운로드가 완료가 되었다면, IDE에서 아래와 같이 Import 해보자.

**메뉴에서 File > Import > Gradle Project를 선택하고 Next**

![import-gradle](http://image.toast.com/aaaaahq/import-gradle-1.png)

**다운로드받은 Gradle 프로젝트의 경로를 지정하고 Finish**

![import-gradle](http://image.toast.com/aaaaahq/import-gradle-2.png)

<br>

## 마치며

지금까지 STS IDE와 빌드도구인 Gradle을 통해 Spring Boot 애플리케이션 개발을 위한 기본적인 로컬 환경을 준비해 보았습니다. 그리고 자신의 프로젝트를 생성해보고 프로젝트의 소스코드의 Version관리를 시작하는데 이 문서가 도움이 되었으면 합니다. 다음 문서에서는 Gradle 프로젝트의 구조에 대해 알아보고 프로젝트를 테스트하기 위한 방법을 살펴보도록 하겠습니다.

<br>

## Spring Boot 예제 프로젝트 모음

이 문서의 이론적인 내용은 모두 실습을 통해 Database와 연동하는 간단한 Spring Boot 애플리케이션을 개발해 보는데 목적이 있습니다. 아래의 Github Repository에서 예제를 위한 프로젝트를 제공하고 있습니다. Spring Boot를 학습하는 데에 조금이나마 도움이 되었으면 합니다.

- https://github.com/wjdsupj/spring-boot-examples-for-beginner

Enviroments | Version (Lastest Updated 2016.10)
---|---
Spring Boot | 1.3.0.RELEASE
Gradle | 2.9

<br>

---

## References
- http://projects.spring.io/spring-boot/
- https://spring.io/blog/2013/08/06/spring-boot-simplifying-spring-for-everyone
- http://docs.spring.io/spring-boot/docs/1.4.1.RELEASE/reference/htmlsingle/
- http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-starter
