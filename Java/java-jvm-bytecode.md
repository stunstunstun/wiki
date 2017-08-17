---
title: JVM의 개요와 자바 ByteCode
date: 2013-07-08 00:49:31
categories: java
---


Java의 기본적인 철학은 한번 작성된 코드로 다양한 환경의 하드웨어 아키텍쳐와 운영체제에서 어디서든 실행 하는 것이다. 이를 위해서 프로그래머가 작성한 자바 코드는 컴파일 과정을 통해 Java Compiler가 `.class` 형태의 파일인 ByteCode로 변환한다. ByteCode란 Java의 Runtime Environment(JRE)에서 실행 되기 위한 최적화 된 코드 집합이다.

<img src='https://lh6.googleusercontent.com/vdep4uZ03IbyBMp3YwidX72wLo_gj8zleDd8bMClCKWsaqUtUgThDUMrg2sj49NpICgYVdnjAT79eKfgB5L8__bLV2C6mm_hUvtMrBNipJtLAT8aeB4Ad50WMdrfMlEX1g' />

> Java is both compiled and interpreted language.

위와 같이 각 OS 및 하드웨어에 따라 JVM의 구조가 다르지만 플랫폼에 따라 독립적이고 유니크한 다양한 종류의 JVM이 존재한다. Java의 최대 장점은 JVM을 통해 플랫폼 독립적으로 실행 가능한 환경을 제공 한다는 것이다.

#### 자바 실행 환경(JRE)와 자바 아키텍쳐


Java는 이와 같은 실행 환경을 제공하기 위해 Runtime에 ByteCode는 JVM을 통해 검증 받게 된다. 그리고 JVM은 최종적으로 ByteCode를 컴퓨터가 해석가능한 기계 코드(Machine Code)로 변환되어 메모리에 로드된다. 이러한 과정을 위해 JRE은 각각의 아래의 주요 Task를 수행 한다.


1. Load the Class 
2. Verifies the Bytecode
3. Interpret the Bytecode

이러한 수행을 담당 하는 각 Component 를 자세히 살펴 보도록 하자.

<img src='https://lh4.googleusercontent.com/845iOlm1TeHBGFwMSB_t6BVDmiGuGrt03ubgXoGZ7VHL9WYBk98qVTPtZwX3NjTlq27Sv6sIfdkRLrD77_gXhoW8cYQMQqaZ3no9Io15-lcdF1nb6eWTWCWfU50nvMm_MQ' width='600' />

> Java Architecture in Detail


#### Class Loader 

Java 실행 환경은 프로그램을 실행하기 위해 ByteCode로 이루어진 클래스 파일을 JVM 으로 로딩 시키고, JVM은 ByteCode 를 해석하여 실행 가능한 상태로 만들게 된다. 이와 같이 JVM은 ClassLoader System을 통해 Class 파일 들을 JVM 으로 로딩 한다.

#### ByteCode Verifier

JVM 으로 부터 로드 된 ByteCode는 Execution Engine에 의해 Runtime Data Area에 배치 되기 전에 ByteCode에 대한 검증 절차를 가지게 되는데, 주요 내용은 아래와 같다.

1. Code가 JVM이 명시한 내용과 일치 한지
2. Memory에 허가 되지 않은 접근이 존재 하는지
3. Stack Over Flow 체크
4. Data Types 체크

이와 같이 Java는 ByteCode를 해석하고 검증 하는 과정을 갖게 되면서 프로그램의 접근을 제한하고 시스템 외부에 비정상적인 영향을 끼치는 것을 방지 할 수 있어 Java의 보안성을 높이는 역할을 한다.

#### JIT(Just In Time Compiler) 컴파일러

위에서 JVM 이 ByteCode를 해석한다고 했는데, 이러한 인터프리터 과정을 통한 실행은 컴파일된 코드를 실행하는 것보다 상당히 느릴 수 밖에 없다. Java는 이러한 환경을 해결 하기 위해 JRE에 JIT을 포함시켜 ByteCode를 기계 코드로 변환할 수 있도록 하였다.

자바 프로그램이 실행 되기 위해서 ByteCode는 실시간으로 기계 코드로 해석 되는데, 이와 같은 역할을 JIT Compiler가 하게 된다. JIT은 JVM의 일부로 동작 하면서 ByteCode를 필요한 만큼 쪼개어 실시간으로 실행 가능한 상태(Machine Code)로 컴파일 한다. 

보통 인터프리터 방식의 언어 구현들이 성능 향상을 목적으로 도입하는 경우가 많은데, 같은 코드를 매번 해석하는 대신 실행하기 전에 그 부분만 컴파일을 해 두고 다음부터는 컴파일된 코드를 쓰기 때문에 인터프리터의 느린 실행 성능을 개선할 수 있다. JIT 이전부터 실행 성능 문제 때문에 바이트코드 컴파일을 도입했던 Java와 같은 언어들도 바이트코드를 해석하는 대신 컴파일된 기계어 코드를 직접 실행하는 쪽이 어쨌든 빠르기 때문에 역시 도입하고 있다.

#### JIT의 구체적인 동작 원리

단점이라면 초기 구동 후 얼마간은 바이트코드를 컴파일하는 데에 시간과 메모리를 소모하기 때문에 정적 컴파일된 C, C++과 같은 프로그램에 비해 초기 실행 속도와 메모리 사용량에서 손해를 본다는 것으로, 특히 실행 시간이 매우 짧은 경우에는 애써 컴파일된 코드를 제대로 울궈먹기도 전에 프로그램이 끝나는 배보다 배꼽이 더 큰 상황이 벌어지기도 한다.

크게 나눠서 HotSpot VM과 같이 메소드단위로 JIT 컴파일을 하는 방식과, 그보다 더 작은 단위에서 프로그램 실행 흐름을 실시간으로 추적하며 컴파일할 코드를 탐색하는 Tracing JIT 방식으로 분류할 수 있다. 특히 Tracing JIT의 경우에는 실행 시점에만 알 수 있는 정보를 컴파일에 적극적으로 반영하기 때문에 이론적으로는 정적 컴파일 방식보다 더 빨라질 수도 있다.

## Refereces

- https://namu.wiki/w/JIT
