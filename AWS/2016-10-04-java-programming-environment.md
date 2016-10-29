## Overview

이 문서에서는 Mac 환경에서 Java 개발환경을 준비하는 것을 설명한다.

## Java 설치

Mac 환경에서는 Java 개발을 위한 JDK 뿐만 아니라 이외의 여러가지 패키지를 Homebrew를 통해 설치하는 것을 권장한다. Homebrew에 대한 자세한 설명은 아래의 링크를 참조한다.

- [Homebrew 설치](https://github.com/wjdsupj/stunstun-wiki/blob/master/AWS/2016-10-04-local-install-homebrew.md)

Homebrew 설치가 완료가 되면 Terminal에서 아래와 같은 Command를 통해 JDK를 설치할 수 있다.
````
brew update
brew cask install java
````

## Spring Tool Suite (STS) 설치

![spring-tool-suite.png](http://image.toast.com/aaaaahq/spring-tool-suite.png)

STS는 Spring을 운영하고 있는 Pivotal에서 제공하는 IDE이다. Eclipse를 기반으로 만들어 졌으며 Spring 애플리케이션을 개발할 때 필요한 환경과 Gradle과 같은 빌드환경, Git을 통한 협업을 쉽게 할 수 있도록 도와준다. 

Java를 통해 Back-End 애플리케이션 개발을 할 때 Spring Framework를 사용한다면 STS를 설치하는 것을 추천한다. 아래의 링크를 통해 IDE를 Download 할 수 있으며, 실행하기 전에는 JDK의 설치가 완료가 되어야 한다.

- https://spring.io/tools

---
> 2016.10월 기준으로 STS의 최신 Version은 3.8.2가 RELEASE되었다.
---

### 유용한 플러그인들 

STS설치가 완료가 되었으면 IDE에서 유용한 플러그인을 몇몇 소개하도록 하겠다. 플러그인 설치를 위해서는 메뉴에서 _Help > Eclipse Marketplace_ 를 통해 설치할 수 있다.

플러그인을 설치하고 적용하기 위해서는 IDE를 재시작해야 하는데 플러그인을 많이 설치할 경우에는 모든 플러그인이 설치가 완료되면 재시작하는 것을 권장한다.

##### Color Theme 1.0.0

Color Theme 는 IDE에서 Side Effect 없이 코드를 이쁘게 보여주게 만들어 주는 플러그인 이다. 설치가 완료되면 메뉴의 Spring Tool Suite > Preferences 에서 Color Theme 메뉴를 통해 다양한 템플릿을 적용할 수가 있다.

- Color theme를 적용하기 전의 화면
![color-theme-before.png](http://image.toast.com/aaaaahq/color-theme-before.png)

- Color Theme를 적용한 화면
![color-theme.png](http://image.toast.com/aaaaahq/color-theme.png)


<br>

### 프로젝트 생성하기

이제 Java개발을 하기 위한 모든 준비가 완료되었다. 첫 프로젝트를 만들어 보자!

- Project Name 과 JRE Version을 선택한다. JavaSE-1.8를 선택하는 것을 추천한다. 
![sts-create-project-1.png](http://image.toast.com/aaaaahq/sts-create-project-1.png)

- Package 이름을 입력하고 문자열을 출력하는 프로젝트를 만들어본다. _public static void main(String[] args)_ 를 선택해 활성화하면 main 메소드를 자동으로 생성할 수 있다.
![sts-create-project-2.png](http://image.toast.com/aaaaahq/sts-create-project-2.png)

<br>

### 유용한 단축키

지금까지 Mac OSX에서 JDK를 설치하고 Java프로젝트를 생성해 보는것을 기본적인 개발환경을 준비해 보았다. STS IDE에서 개발하면서 유용한 단축키를 소개하는 것으로 이 글을 마무리 한다. 

> 모두 즐겁게 개발하세요 :)

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
