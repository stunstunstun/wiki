---
title: 안드로이드 아키텍쳐
date: 2013-04-27 15:24:49
categories: android
---

Android 는 Third-party 어플리케이션 개발을 위한 API Libraries 과 이와 연계 되어 Operating system, Middle-ware, Native mobile application 등을 포함 하는 리눅스 커널 기반의 오픈 소스 소프트웨어 스택 이다.

<!-- more -->

<img src='https://lh6.googleusercontent.com/NWJFs2c6EjZWhHgnul04ogDNjQcQfP_cvqoL3BWE11Ew5aO0llO16THKpRuEpYJvokOt-jIvIozlZZOWq6V93csSO2tkXHy3HaeitH-E4pRKHLsw6YnR5Z0BTcqMLw' />

Android는 자유롭게 사용 할 수 있고, 다양한 Hardware 에서 실행 가능 하도록 설계 되었다. Apache License 를 따르는 오픈소스 이며 위와 같은 Layer 로 구성되어 있는데, 각 Layer 를 간단하게 살펴 보도록 하자.

#### Linux Kernel

가장 하위의 Layer 인 Kernel 은 Linux 2.6 기반으로 제공 되며, Process 관리, Memory 관리, 카메라, 키패드, 터치 스크린과 같은 Device 제어와 같은 시스템을 제공 하고 있다. 또한 Kernel 은 Networking 과 Device 전반에 대한 Oeperating System 을 제공 한다.

#### Native Libraries

Linux Kernel의 상위 Layer는 C/C+ 로 구현된 널리 알려진 libc, Browser 엔진인 Webkit, SQLite dabase 와 같은 유용한 Libraries 를 포함한다. 또한 기본적인 2D 그래픽을 위한 SGL 과 OpenGL ES 를 통해 3D 그래픽을 지원 한다. 

#### Android Runtime

Android는 런타임 환경에서 Dalvik Virtual Machine 이라는 Key 컴포넌트를 제공 한다. JVM과 비슷한 목적으로 Android 환경에서 최적화 하기 위해 설계 되었다. Dalvik VM은 Linux Core 환경에서 메모리 관리(GC)  또는 Multi-Threading 과 같은 자바의 고유의 성격을 제공하며 모든 Android 어플리케이션 이 실행 시 어플리케이션 마다 Process를 할당 하며, 이것은 Dalvik VM의 하나의 인스턴스를 소유하게 된다. 정리하면 Dalvik VM은 일종의 모바일 환경에 최적화 된 bytecode interpreter 라고 보면 되겠다. 

#### Application Framework

Application Framework는 Java 기반의 어플리케이션을 개발 하기 위한 상위 Layer 이다. 어플리케이션 개발자는 Application Framework에서 제공하는 다양한 API를 이용해 개발 할 수 있게 된다.

#### Applications

가장 상위 Layer 로 어플리케이션을 개발 하고 설치 가능한 유일한 형태 이다. 주소록, 브라우저, 게임 어플리케이션 과 같은 것을 예로 들수 있다.





