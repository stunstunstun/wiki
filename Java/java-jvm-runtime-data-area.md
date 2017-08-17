---
title: JVM의 Runtime Data Area
date: 2013-07-16 00:49:31
categories: java
---

자바는 운영체제 독립적으로 JVM 환경에서 동작할 수 있도록 설계가 되어 있는 동적 언어 이다. 자바 프로그램이 시작되고 종료 될 때까지 자바의 소스코드가 어떠한 형태로 JVM의 메모리에 할당 되고 해제 되는지 간단하게 나마 정리해 보고자 한다.

프로그램이 실행되면 JVM은 시스템으로부터 프로그램을 수행하는데 필요한 메모리를 할당받고 이 메모리를 용도에 따라 여러 영역으로 나누어 관리한다.

- Java Compiler : Java 코드를 ByteCode로 변환한다.
- Java API, Class Files : 컴파일 된 자바 클래스 파일
- **Class Loader System** : 컴파일된 자바 클래스 파일을 메모리(Runtime Data Area)에 적재한다
- Execution Engine : ByteCode를 실행 가능 하도록 해석

<img src='https://lh4.googleusercontent.com/6WFR269BkOXIAaZxySgJt4ZOFKDPgN_G5lOa0eKtpW3add440v_wTdqe-pbs64BimfEY4R3f6hKB_fCbTh55SD-OcgDFexD0dA8ulqblZe1aB0yY_7o7PQ-MKA' />

이 중에서 앞의 세가지 메모리 영역 즉 PC Register와 두 개의 Stack 영역은 각 Thread 별로 생성이 되고 Method Area 와 Heap은 모든 Thread에게 공유된다.

#### 모든 Thread에 공유되는 영역

- Method Area
- Heap

## Runtime Data Area

Runtime Data Area는 JVM이 프로그램을 수행하기 위해 운영체제로부터 할당 받는 메모리 영역이다. Runtime Data Areas는 각각의 목적에 따라 5 개의 영역으로 나뉘게 된다.

#### PC Registers

PC Registers는 Thread가 생성될 때 마다 생기는 공간으로 Thread가 어떠한 명령을 실행하게 될지에 대한 부분을 기록을 한다.

JVM은 Stacks-Base 방식으로 작동 하는데, JVM은 CPU에 직접 Instruction을 수행하지 않고, Stack에서 Operand를 뽑아내 이를 별도의 메모리 공간에 저장하는 방식을 취하는데, 이러한 메모리 공간을 PC Registers라고 한다.

#### Method Area

프로그램 실행 중 클래스가 사용되면 JVM은 해당 클래스 파일을 읽어서 분석하여 클래스의 인스턴스 변수, 메소드 코드 등을 Method Area에 저장한다. 이 때 클래스 변수도 이 영역에 함께 생성된다.

프로그램이 실행되면 모든 코드가 저장되어 있는 상태가 아니다. new 키워드를 통해 객체가 동적으로 생성되기 이전에는 텍스트 일 뿐이다.

객체 생성 후에 메소드를 실행하게 되면 해당 클래스 코드에 대한 정보를 Method Area에 저장 하게 된다. 저장되는 내역은 아래와 같다.

`Type Infomation`

Type은 클래스와 인터페이스를 통칭하는 것으로 이해하면 된다.

- Type의 전체 이름 (패키지명 + 클래스명)
- Type의 직계 하위 클래스 전체 이름
- Type의 클래스 / 인터페이스 여부
- Type의 modifier (public / abstract / final)
- 연관된 인터페이스 이름 리스트
    
`Runtime Constant Pool` 

Type의 모든 상수 정보를 가지고 있다.

- Type, Field, Method로의 모든 Symbolic Reference 정보를 포함
- Constant Pool의 Entry는 배열과 같이 인덱스 번호를 통해 접근
- Object의 접근 등 모든 참조를 위한 핵심 요소
   
`Field information`

Field는 인스턴스 변수를 가르킨다.

- Field Type
- Field modifier (public / private / protected / static / final / volatile / transient)

`Method Information`

Constructor를 포함한 모든 메소드

- Method Name
- Method Return Type
- Method Parameter 수와 Type 
- Method modifier (public / private / protected / static / final / syncronized / native / abstract)
 Method 구현 부분이 있을 경우 ( abstract 또는 native 가 아닐 경우 )
- Method의 byteCode
- Method의 Stack Frame의 Operand Stack 및 Local variable section의 크기
- Exception Table

`Class Variable`

Class 변수는 static 키워드로 선언된 변수를 의미 한다.

- 모든 인스턴스에 공유 되며 인스턴스가 없어도 직접 접근이 가능하다.
- 이 변수는 인스턴스의 것이 아니라 클래스에 속하게 된다.
- 클래스를 사용 하기 이전에 이 변수들은 미리 메모리를 할당 받아 있는 상태가 된다.
- final class 변수는 상수로 치환 되어 Runtime Constant Pool에 값을 복사한다.

> static 변수는 Method Area의 Class Variable에 저장
기본형이 아닌 static 클래스형 변수는 레퍼런스 변수만 저장되고 실제 인스턴스는 Heap에 저장되어 있다. 그 후 이 인스턴스의 변수를 저장하기 위해 Heap에 메모리가 확보가 되고 Heap의 인스턴스가 Method Area의 어느 클래스 정보와 연결되는지 설정 하게 된다.

#### Heap

사용자가 관리하는 인스턴스가 생성되는 공간으로 객체를 동적으로 생성하면 인스턴스가 Heap 영역의 메모리에 할당되어 사용되어진다. 프로그램은 시작될 때 미리 Heap 영역을 많이 할당해 놓으며 인스턴스와 인스턴스 변수가 저장된다. 레퍼런스 변수의 경우 Heap에 인스턴스가 저장 되는것이 아니라 포인터가 저장된다.

> Heap영역은 Garbage Collection의 대상이 되는 영역 이다.

#### JVM Stacks

Thread 제어를 위해 사용되는 메모리 영역 이다. Thread가 생성될때 마다 하나씩 생성되며 단일 Thread 당 Method가 호출될 때 메모리를 차지하게 된다. Method 가 호출 되면 Method와 Method 정보는 Stack에 쌓이게 되며 Method 호출이 종료 될때 Stack point에서 제거 된다. Method 정보는 해당 Method의 매개변수, 지역변수, 임시변수 그리고 어드레스(메소드 호출 한 주소)등을 저장하고 Method 종료시 메모리 공간이 사라진다.

* 멀티 Thread 프로그램의 경우 각 Thread가 자신의 Stack을 가지고는 있지만 Heap 영역은 공유하기 때문에, 프로그래밍시에 Thread-safe 하지 않는 이슈에 주의하며 프로그래밍을 해야 한다. 결론적으로 Heap 영역 자체가 Thread-safe 하지 않는 상태이다. Thread-safe 하게 객체를 생성하기 위해서는 Immutable한 객체를 설계하는 것이 좋다.


#### Native Method Stacks

자바 이외의 이기종 언어에서 제공되는 Method의 정보가 저장 되는 공간, JNI를 통해 표준에 가까운 방식으로 구현이 가능하다.




