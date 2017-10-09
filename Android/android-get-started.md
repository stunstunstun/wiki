---
title: 안드로이드 시작하기
date: 2013-03-25 15:24:49
categories: android
---

Android 플랫폼을 통한 프로젝트를 진행하게 되었다. 재학 중에 작은 벤처에서 실무 프로젝트 경험을 위하여 애플리케이션을 개발한 경험이 있지만 대부분은 기억에서 사라졌기 때문에 Android 개발을 시작 하기 위한 기본적인 개발 환경과 테스트를 하기 위한 전략 등에 대해 아래와 같은 순서로 정리 해보려고 한다. 

<!-- more -->

일단 간략하게 순서를 정하고 틈틈히 자세히 정리 해보도록 하자.


#### Android SDK를 이용한 개발 환경

Android SDK를 통해 어플리케이션을 개발 하기 위해서는 Java 및 Eclipse 에 대한 설치가 우선 되어야 한다.

> JDK 설치 : http://www.oracle.com/technetwork/java/javase/downloads/index.html 
> Eclipse 설치 : http://www.eclipse.org/downloads/ 


#### Android Developer Tools

Android를 보통 Eclipse를 통해 개발 하게 되는데 아래의 주소를 통해 Eclipse에서 Android 개발을 할 수 있는 플러그인인 ADT 를 설치 할 수 있다.
- http://developer.android.com/tools/index.html 


#### Android SDK

- http://developer.android.com/sdk/index.html

Android SDK는 Android 어플리케이션을 개발 하기 위한 API Libraries 부터 빌드, 디버깅, 테스트를 위한 개발 툴을 제공 한다. 

#### Android 환경 에서의 단위 테스트

개인적으로 어플리케이션을 새로운 환경에서 개발 하기 위해서 단위 테스트를 어떻게 해야 할 것인가를 가장 먼저 고려 하게 된다. 웹 서비스 개발 시에는 Java 기반의 JUnit 을 통해 단위 테스를 하곤 했는데 Android 환경에서의 단위 테스트는 동일하게 JUnit 을 활용 할 수 있는지 또는 다른 오픈 소스를 활용 할 수 있는지 알아 볼 예정이다.

#### Android Activity & Life cycle

Android 어플리케이션을 개발 하기 위해 가장 먼저 알아야 할 내용은 Activity 일 것 이다. 주요 컴포넌트인 Activity를 자세히 알아보고 어플리케이션 내에서 Activity의 Life Cycle 그리고 각 Activity 간의 관계에 대해서 알아 보도록 하겠다.

#### Android Context

Android 개발 시에는 Context 라는 객체를 자주 만나게 되는데, 실제 Context 에 대한 정확한 정의에 대해 모호한 상태이다. Context는 어떠한 클래스 인지 안드로이드 어플리케이션 내에서 어떠한 역할을 하게 되는지에 대해 알아보도록 하겠다.






