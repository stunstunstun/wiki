---
title: Android CI 환경 구축하기
date: 2014-12-29 16:05:18
desc: Linux환경에서 Android 프로젝트 빌드하기
image: https://bluefletch.com/wp-content/uploads/2015/03/header_image.jpg
categories: android
---

이 글에서는 로컬PC의 IDE에서 벗어나 독립적으로 Linux와 같은 운영체제에서 Jenkins를 통해 Android 프로젝트를 빌드하는 과정을 살펴볼 예정이다.

<!--more-->

<img src='https://bluefletch.com/wp-content/uploads/2015/03/header_image.jpg' width='500' />

> 빌드 환경 구성을 위한 시스템 환경은 아래와 같다.

구성 요소 | 설명
--|--
OS | CentOS 5.7 64bit
Android SDK | Build Tools 19.1.0
Build Tools | Jenkins, Gradle 2.1

## IDE 독립적인 빌드 환경은 왜 필요할까?

별도의 빌드 머신이나 AWS의 EC2 인스턴스에서 쉽게 빌드 환경을 구성 할 수가 있는데, 애플리케이션을 개발자의 IDE 뿐만 아니라 독립적인 환경에서 빌드 할 수 있어야 하는 이유는 다음과 같다.

<img src='http://image.toast.com/aaaaahq/android-ci-environments.png' />

1. Subversion 또는 Git 저장소의 Version을 기준으로 애플리케이션을 빌드해야만 한다. 개발자의 PC를 기준으로 빌드하고 이를 배포하게 되면 Version관리를 하지 않는 것과 다름없다. 이 포스팅에서는 Version 관리에 대한 필요성을 굳이 언급하지 않겠다.

2. 개발자가 IDE에서 수동으로 빌드하고 배포하는 과정에서 발생하는 실수가 서비스에 그대로 영향을 미치게 된다.

3. 별도의 빌드 환경은 프로젝트 정보를 Clone하고 테스트, 빌드, 배포하는 모든 과정을 자동화 하기 위한 기반이 된다.

## 빌드 환경 구성하기

먼저 Eclipse나 Android Studio와 같은 IDE 독립적으로 안드로이드 프로젝트를 빌드 하기 위해서는 빌드를 수행할 빌드 머신 또는 빌드 서버가 필요하다. 이 글에서는 운영체제가 CentOS인 환경을 시작으로 그 밖에 필요한 것들을 살펴보도록 하겠다.

#### Android SDK 설치 및 환경 설정

빌드를 수행할 운영체제에 Android SDK를 설치하는 일이 가장 먼저이다. Android Developer 페이지에서 CentOS와 같은 Linux 환경을 위한 Android SDK를 다운 받을 수 있다.

> https://developer.android.com/studio/index.html#downloads

예시로 아래와 같이 Home 디렉토리에 android 폴더를 만들어 Download 하도록 하겠다.

```
$ mkdir android && cd android
$ wget https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip
```

Download 받은 아카이브를 해제한다.

```
$ tar -zxvf sdk-tools-linux-3859397.zip
```

설치한 Android SDK 경로를 운영체제의 환경 변수에 추가한다.

**.bash_profile**

```shell
...
export ANDROID_HOME=/home1/irteam/android
export PATH=${PATH}:$ANDROID_HOME/tools
```

환경변수의 변경 내역을 운영체제에 반영 한다.

```
$ source .bash_profile
```

정상적으로 반영되었는지 최종적으로 확인해 본다.

```
$ android
```

#### Android SDK에 대한 환경 설정

Android 프로젝트를 빌드 하기 위해서는 Android SDK 설치 뿐만 아니라, 몇몇 하위 패키지에 대한 설치가 필요하다.

아래의 명령을 통해 모든 Version의 Android 패키지를 업데이트 할 수도 있겠지만, 시간이 상당히 많이 걸리기 때문에, 필요한 패키지만 설치하는 것을 권장한다.

```shell
$ android update --no-ui
```

아래와 같이 필요한 패키지만을 선택해서 설치 할 수 있다.

```
$ android update sdk -u --filter platform-tools, android-19
```

설치 가능한 패키지는 아래와 같이 확인이 가능 한다.

```
$ android list sdk --all
$ android update sdk -u --all --filter <number>
```

<div class="tip">만약, OS가 64bit라면, 아래와 같이 32bit 라이브러리의 설치가 필요 할수도 있다</div>

```
$ sudo yum install libstdc++.i686
$ sudo yum install ncurses-libs.i686
$ sudo yum install zlib.i686
```

#### Jenkins에 Gradle 연동하기

이 글에서는 Jenkins에 대한 구체적인 설명이나 설치 방법을 생략한다. Jenkins를 사용해 본 경험이 없다면 아래의 링크를 통해서 자신이 필요한 운영체제에 Jenkins를 설치 할 수 있다.

> https://jenkins.io/

Jenkins의 운영 화면을 통해서 `관리`-`시스템 설정`메뉴에서 아래와 같이 설치한 Android SDK 와 Gradle에 대한 설정을 한다.

#### Android SDK 경로 지정

<img src='http://cfile4.uf.tistory.com/image/252C244154A13D5B062153' />

#### Gradle 설치

<img src='http://cfile30.uf.tistory.com/image/22213A3F54A13D6A17167B' />

## Gradle 플러그인 설정

Jenkins에서 Android 프로젝트를 Gradle를 통해 빌드하기 위해 아래의 플러그인이 필요하다.

- Jenkins Gradle Plugin
- Environment Injector Plugin

#### Jenkins Gradle Plugin

Jenkins 플러그인 중 Jenkins Gradle Plugin을 설치하면, 빌드 서버에 별도의 Gradle을 설치할 필요가 없다.

#### Environment Injector Plugin

Environment Injector Plugin은 빌드시에 필요한 운영체제의 환경 변수를 동적으로 inject 시키는 역할을 한다. 아래와 같이 Gradle에서 참조해야 할 환경 변수를 위해 `Inject environment variables to the build process > Properties Content`에 Android SDK의 경로를 추가해 준다.

<img src='http://cfile22.uf.tistory.com/image/2435564654A13D7A2CF1B0' />


## Android Studio와 Gradle

빌드 서버에서 Android 프로젝트를 빌드하기 위한 기본적인 구성이 마련되었다면, 애플리케이션 또는 라이브러리를 배포하기 위한 요구사항이나 빌드에 필요한 프로세스를 먼저 정의할 필요가 있다.

예를 들면 이러한 과정을 말한다:

- IDE 이외의 환경에서의 빌드를 해야 한다
- 빌드 프로세스에서 테스트 코드를 통해 애플리케이션의 테스트를 자동화한다
- 테스트, 빌드하는 과정에서 Test Coverage 등 Quality Practice에 대한 Report를 생성하고 싶다
- 다른 사용자에게 제공하는 라이브러리를 개발한다면 javadoc을 통해 API Reference 문서를 자동으로 생성하고 싶다
- 빌드가 완료되면 라이브러리 또는 SDK 배포를 위한 패키징을 수행한다.
- 애플리케이션의 APK를 다양한 조건의 환경으로 한번에 생성하고 싶다 (개발, 운영서버를 구분한 APK를 각각 생성)

IDE 독립적으로 빌드할 수 있는 환경이 갖추어지면 위와 같은 요구사항을 자동화할 수가 있는데, 직접 구현할 수도 있겠지만 이는 상당한 노력이 필요할 것이다. 현재 Android에서는 Gradle이 기본적으로 탑재된 Android Studio를 개발 도구로 채택했으며, Gradle에서 제공하는 다양한 플러그인과 Task를 통해서 위와 같은 요구사항에 쉽게 대처할 수가 있다. Gradle에 대한 사용법은 너무나 방대해 생략한다. Android Studio와 Gradle를 이용한 자세한 사항은 아래의 링크를 통해 확인할수 있다.

> https://developer.android.com/studio/intro/index.html
> https://gradle.org/


## Jenkins를 통해 지속적인 통합하기

마지막으로 Jenkins의 다양한 플러그인과 Gradle을 통해 프로젝트를 지속적으로 통합하기 위한 전략을 살펴보겠다.

> 지속적으로 통합하기
빌드와 배포 과정을 자동화하는 것 뿐만 아니라 지속적으로 프로젝트의 품질을 자동으로 평가하는 것을 말한다.

#### jacoco를 통한 테스트 Coverage 측정

코드 품질을 평가하는 EclEmma 프로젝트가 deprecated 되고 그 멤버들이 새로운 프로젝트를 진행하였는데 이것이 바로 jacoco 프로젝트이다. 기존의 EclEmma는 최근에 업데이트 이력이 없으며, 문서화가 잘 되어있지 않다. Java Version에 따른 호환성 이슈도 있으니 jacoco를 통해 테스트 Coverage를 측정하는 것을 추천한다.

> http://www.eclemma.org/jacoco/index.html

jacoco는 Java 프로젝트 전반의 테스트 Coverage를 체크를 위한 라이브러리이기 때문에, Android 테스트 코드의 품질을 report하기 위한 좋은 선택이 될것이다.

Gradle 스크립트에서 아래와 같이 jacoco task를 추가한다.

```groovy
apply plugin: 'jacoco'

task jacocoTestReport(type: JacocoReport, dependsOn: "testDebug") {
    group = "Reporting"
    description = "Generate Jacoco coverage reports after running tests."
    reports {
        xml.enabled = true // coveralls plugin depends on xml format report
        html.enabled = true
    }    
    classDirectories = fileTree(
            dir: 'build/intermediates/classes/debug',
            excludes: ['com/toast/android/mobill/core/BuildConfig.class'                     
            ])
    sourceDirectories = files(coverageSourceDirs)
    executionData = files('build/jacoco/testDebug.exec')

    afterEvaluate {
        // just clean up coveralls dashboard, following reports are not of interest
        testDebug.reports.junitXml.enabled = false
    }
}
```

Jenkins에 jacoco 플러그인을 설치한 뒤 Gradle Task를 통해 빌드가 완료 되면, 아래와 같이 테스트 Coverage 리포트를 확인 할 수 있다.

<img src='http://cfile24.uf.tistory.com/image/2225B24154A13D89116569' />

#### 마치며

지금까지 IDE를 벗어나서 Android 프로젝트를 빌드하고 지속적인 통합을 위한 환경을 구성해 보았다. 이 문서를 시작으로 빌드 환경에 대한 필요성을 인식하고 활용 할 수 있는 환경을 갖추고 앞으로 Gradle에 대한 이해를 높혀 나간다면 빌드 프로세스에서 발생하는 다양한 요구사항을 효율적으로 해결 할 수 있을 것이라고 본다.
