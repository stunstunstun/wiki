---
title: Mutable한 StringBuffer와 StringBuilder
date: 2013-05-01 00:49:31
categories: java
---

String 클래스는 Immutable한 객체다. 불변이라는 뜻하는데 한번 생성된 객체는 그 값을 바꿀 수 없다는 의미로 해석하면 된다. 이 말은 String 클래스로 생성된 객체가 변경되면 기존의 String 객체는 더이상 참조하지 않고 새로운 String 객체가 생성된다는 의미이다.  

<!-- more -->

예를 들어 보자.

```java
String caption = "캡션";
String content = "컨텐츠";
 
System.out.println("caption = " + Integer.toHexString(caption.hashCode()));
System.out.println("content = " + Integer.toHexString(content.hashCode()));
System.out.println("contentOthers = " + Integer.toHexString(content.replace(content, "다른문장").hashCode()));
```

Heap 영역의 참조 상태를 확인해 보자.

```
caption = 20ef99e6
content = 38b73479
contentOthers = e5b4853c
```

위와 같이 String 객체인 content를 변경하게 되면 새로운 String 객체가 생성되는 것을 확인할 수 있다.

## StringBuffer와 StringBuilder

아래와 같이 문자열 배열을 통해 모든 문자열을 합하여 출력하는 프로그램이 있다고 가장해보자.

```java
String[] surnames = new String[] {"Kim", ..., "Jung"};
String notice = "";
for (String surnames : surnames) {
	notice += surnames + "\n";
}
System.out.println(notice);
```

notice로 선언된 변수에 객체 하나만 유지할 것 처럼 보이지만 반복문 하나당 2번의 새로운 String 객체가 생성되고 있는 상태이다. 만약에 문자열 배열의 크기가 엄청나게 크다면 성능에 큰 영향을 미칠지도 모른다.

이러한 String 클래스의 Immutable 한 특성을 보완하기 위해 Java에서는 문자열을 효율적으로 append 하기 위해 `StringBuffer` 클래스와 `StringBuilder` 클래스가 존재 한다. 이 두 클래스는 모두 문자열을 생성하고 변경하는데 용이 하다.

자세한 내용은 아래의 Java API Document를 참조 하면 된다.

`StringBuilder`
- http://docs.oracle.com/javase/7/docs/api/java/lang/StringBuilder.html

`StringBuffer`
- http://docs.oracle.com/javase/7/docs/api/java/lang/StringBuffer.html 

#### Thread-safe 하지 않는 StringBuilder 클래스

두 클래스의 역할은 비슷하지만 중요한 차이점이 존재하는데 멀티 Thread 환경에서의 동작이다. StringBuffer 는 Thread-safe한 클래스이고, StringBuilder는 그렇지 못하다. 다수의 Thread 에서 StringBuilder 클래스로부터 생성된 객체에 접근 한다면 StringBuilder 대신에 반드시 StringBuffer로 대체해야 한다. 하지만 Thread-safe하게 설계된 StringBuffer가 성능이 좋지 못하기 때문에 개발시에 다양한 Thread가 애초에 접근하지 못하도록 하는 것이 가장 좋은 방법이다.

