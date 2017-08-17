---
title: String 클래스의 생성자와 유니코드
date: 2013-07-20 00:49:31
categories: java
---

자바 기반의 애플리케이션을 하면서 Java 내장 API 중 가장 많이 사용하는 클래스는 String 클래스가 아닐까한다. 익숙하지만 자주 사용되기 때문에 중요한 녀석임에도 틀림이 없다. 

<!-- more -->

혹여 중요한 녀석을 잘못 사용하고 있는건 아닐까하는 마음에 String 클래스에 대한 개념을 짚고 넘어가 볼려고 한다. String 클래스는 Object 클래스와 같이 java.lang 패키지에 존재한다. 사용시에 별도의 import 문 없이 사용 할 수 있다.

#### String 클래스의 생성자

String 에는 아래와 같은 생성자가 존재 한다.

```java
public String(byte[] bytes)
public String(char[] chars)
public String(String name)
```

위와 같이 생성자가 존재 하지만 실제 String 클래스를 이용할 때 우리는 아래와 같이 문자열 리터럴을 통해 생성하는 방법을 거의 사용 하게 된다.

```java
String name = "홍길동";
```

`new` 키워드를 통해 객체를 동적으로 생성 하지 않아도 자동으로 String 객체를 생성 하여 Heap 영역에 할당 된다. 한가지 주의해야 할 점을 이미 생성된 동일한 문자열의 String 객체는 추가적으로 Heap 영역에 할당 되지 않는 다는 점이다.

실제 코드를 살펴보도록 하자.

```java
String caption = "캡션";
String content = "컨텐츠";
String contentOthers = "컨텐츠";
```

hashCode() 를 출력함으로서 실제 변수의 참조 상태를 확인 해 보자. 아래와 같이 content, contentOthers는 각 별도의 변수를 선언했음에도 불구하고 동일한 Heap 영역을 참조하고 있는 것을 볼 수 있다.

```
name = 20ef99e6
another = 38b73479
sameName = 38b73479
```

<img src='https://docs.google.com/drawings/d/scqzEHg4laQN93QxLffa1yA/image?w=259&h=156&rev=252&ac=1' />

#### String 과 Charset

위의 생성자는 문자열 생성시에 byte 배열과 지정된 charset을 통해 디코딩한 String 객체를 생성하는 것을 의미합니다.

```java
public String(byte[] bytes, String charset)
```

컴퓨터는 전기 신호를 통해 두가지 경우만 구분할 수 있다. 컴퓨터는 문자를 이해하게 할 수 없지만 우리는 이론적으로 바이트 공간에서 문자 코드표를 정의하여 문자를 정의하고 있다. 아스키 코드는 가장 쉬운 예이다.

#### 아스키 코드

아스키코드는 1 bytes의 메모리 공간을 활용해 `256`가지의 문자를 표현할 수 있다. 대표적인 문자를 살펴보면 아래와 같다.

Char | Dec | Hex | Binary 
--|--|--|--
null | 001 | 0X1 | 1
! | 033 | 0X21 | 100001
A | 065 | 0X41 | 1000001
B | 066 | 0X42 | 1000010
Z | 090 | 0X5A | 1011010
[ | 091 | 0X5B | 1011011
a | 097 | 0X61 | 1100001
b | 098 | 0X62 | 1100010
z | 122 | 0X7A | 1111010
.. | .. | .. | ..
ÿ | 255 |0XFF | 11111111

#### 유니코드 

그렇다면 Charset은 무엇일까?

초창기에는 문자 코드는 위와 같이 아스키코드의 로마자 위주였고, 1 바이트의 남은 공간에 각 나라가 자국 문자를 할당하였다. 하지만 이런 상황에서 다른 국가에 이메일을 보냈더니 글자가 와장창 깨졌던 것(...) 인터넷 웹페이지도 마찬가지였다. 이에 따라 2~3바이트의 넉넉한 공간에 세상의 모든 문자를 할당한 결과물이 유니코드이다.

유니코드 값을 나타내기 위해서는 코드 포인트(code point)를 사용하는데, 보통 U+를 붙여 표시한다. 예를 들어, 'A'의 유니코드 값은 U+0041로 표현한다. (\u0041로 표현하기도 한다)

Char | 유니코드 표현 방식  
--|--
A | \u0041 
Z | \u0060

다만 로마자입장에서는 용량이 두배가 되어 이래저래 비효율인 셈이 되었고, 가변길이 문자 인코딩(UTF-8)을 도입해서 기존 아스키코드와 호환되는 규격도 도입했다. 흔히 우리가 웹 브라우저의 인코딩을 설정하면서 자주 보는 UTF-8이라는 말이 이것이고, 바로 유니코드에 기반한 인코딩 방식 중 하나를 가리키는 것이다.

자바의 생성자의 `charset`이 UTF-8과 같이 유니코드의 인코딩 방식을 지정하는 용도로 쓰인다. 자바 뿐만 아니라 대부분의 프로그래밍의 언어는 영어 이외의 문자를 특수 기호로 간주하는데 즉 한글 역시 자바 어플리케이션에서 작성된 이후 시스템 콘솔이나 브라우져 등에서 출력 때 특수 기호로 간주되어 간혹 글자가 깨져 출력 되는 일을 종종 발견 했을 것이다. 

이는 입력된 환경에서의 유니코드 인코딩 방식과 출력되는 환경에서의 유니코드 인코딩 방식이 다를 때 자주 발생된다.

결국 자바 String 클래스에서는 byte 배열 또는 byte 배열에서 String으로 변화시에는 특정 인코딩을 위한 Charset을 사용해야 한다. 첫번째 생성자와 같이 charset이 지정되지 않았을 경우에는 System properties의 file.encoding에 설정된 값이 디폴트로 지정된다.

<img src='https://docs.google.com/drawings/d/sqZfKMQEw87Pj1IDVxVPfdQ/image?w=403&h=201&rev=101&ac=1' />

<br/>

`String 을 byte 배열로 변환`

```java
String name = "홍길동";
byte[] bytes = name.getBytes();
```

`Byte 배열을 String으로 변환`

```
String name = new String(bytes, "UTF-8");
System.out.print(name);
```

#### UTF-8, UTF-16, EUC-KR

`UTF-8`

가장 많이 사용하는 유니코드 인코딩이다. UTF-16 인코딩을 사용하면 1바이트로도 표현할 수 있는 문자에 그보다 더 많은 바이트를 소비해야 하는데, UTF-8 인코딩을 사용하면 그런 문제점이 없다. 

그러나 한자나 한글은 주로 3바이트 영역에 집중되어 있기 때문에 한자와 한글이 많이 포함되어 있는 문서는 오히려 크기가 커진다. 그럼에도 불구하고 세계적으로는 UTF-8 인코딩이 가장 널리 쓰이기 때문에 유니코드를 지원하는 대부분의 프로그램들은 일단 UTF-8을 디폴트 상태로 지정해 주는 경우가 많다. 

다음 표는 코드 포인트 범위에 따른 UTF-8 인코딩 방식을 보여준다.

코드 포인트 범위 | 비트 수 | 인코딩 
--|--|--
U+0000~U+007F | 7 | 그대로 인코딩 
U+0080~U+07FF | 11 | 110xxxxx 10xxxxxx
U+0800~U+FFFF | 16 | 1110xxxx 10xxxxxx 10xxxxxx
U+10000~U+1FFFFF | 21 | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx

게다가 UTF-8의 Latin-1 영역은 ISO/IEC 8859-1이라고 부르는 8비트짜리 서유럽 코드와 완벽히 호환된다는 장점이 있다. 웹 등지에서 유니코드 적용이 서구권을 중심으로 퍼졌기에 서구권 입장에서는 기존 8비트 코드와 호환성이 있는 UTF-8을 많이 선택했고, 결국 이것이 대세가 된 것이다. 

UTF-8의 기억할 만한 특징은 가변 길이를 가진다는 것인데 아래와 같이 'A'는 아스키 코드와 마찬가지로 1 Byte의 공간만을 필요로 하지만 한글과 같은 특수 기호는 3 Byte를 사용하는 것을 볼 수 있다.

Char | Encoding | Hex | 바이트 수 
--|--|--|--
A | UTF-8 | \u41 | 1 Bytes
가 | UTF-8 | \uEAB080 | 3 Bytes

`UTF-16`

UTF-16(16-bit Unicode Transformation Format)은 유니코드 문자 인코딩 방식의 하나이다. 주로 사용되는 기본 다국어 평면 (BMP, Basic multilingual plane)에 속하는 문자들은 그대로 16비트 값으로 인코딩이 되고 그 이상의 문자는 특별히 정해진 방식으로 32비트로 인코딩이 된다.

`EUC-KR`

EUC-KR은 KS X 1001와 KS X 1003을 사용하는 8비트 문자 인코딩이다. EUC의 일종이며 대표적인 한글 완성형 인코딩이기 때문에 보통 완성형이라고 불린다. 정리하면 UTF-8 인코딩 방식과 그 이외에 대표적인 인코딩 방식에서의 한글을 표현하기 위한 바이트 수는 아래와 같다.

Char | Encoding | Hex | 바이트 수 
--|--|--|--
가 | UTF-8 | \uEAB080 | 3 Bytes
가 | UTF-16 | \uFFFE00AC | 4 Bytes
가 | EUC-KR | \uB0A1 | 2 Bytes


실제로 코드로 확인하면 아래와 같다.

```java
String ga = "가";
byte[] bytes = ga.getBytes("UTF-8")

assertThat(ga.getBytes("UTF-8").length).isEqualTo(3);
assertThat(ga.getBytes("UTF-16").length).isEqualTo(4);
assertThat(ga.getBytes("EUC-KR").length).isEqualTo(2);
```

참고로 아래의 목록은 자바 API에서 지원하는 표준 charset 리스트이다.

```
java.nio.charset.Charset
```

Charset | Description
--|--
US-ASCII         	|  7 비트 ASCII (ISO646-US/Unicode 캐릭터셋의 Basic Latin 블록)
ISO-8859-1      	| ISO Latin Alphabet No. 1 (ISO-LATIN-1)
UTF-8              	| 8 비트 UCS 변환 형식
UTF-16            | 16 비트 UCS 변환 형식, 옵션의 바이트순서 마크로 식별되는 바이트 순서 
UTF-16BE       	| 16 비트 UCS 변환 형식, big-endian 바이트 순서
UTF-16BE       	| 16 비트 UCS 변환 형식, little-endian 바이트 순서
EUC-KR            | 8비트 문자 인코딩으로, EUC의 일종이며 대포적인 “한글 완성형” 인코딩
MS949             | Microsoft에서 만든 한글 확장 완성형 인코딩

간혹 서비스를 운영하다 보면 운영체제의 인코딩 방식이 클라이언트와 서버간에 차이가 있어 문제가 생기는 경우가 흔한데 흔히 사용되는 String 클래스에 대한 배경 지식을 알고 있다면 쉽게 해결할 수 있는 문제가 된다.

만약 한글에 대한 이슈가 생긴다면 운영체제의 인코딩 설정을 가장 먼저 확인하도록 하자. 리눅스에서는 LANG 환경 변수에 따라 다르지만, ko, ko_KR, ko_KR.eucKR은 모두 EUC-KR 인코딩이며, ko_KR.UTF-8만 UTF-8 인코딩이다. CentOS의 경우 `/etc/sysconfig/i18n`에서 시스템 기본 인코딩을 설정할 수 있다. 

## References

- https://namu.wiki/w/%EC%9C%A0%EB%8B%88%EC%BD%94%EB%93%9C
- http://d2.naver.com/helloworld/19187
- http://brownbears.tistory.com/167

