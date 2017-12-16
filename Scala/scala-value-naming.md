---
title: Scala에서의 값 명명과 표현식 평가
date: 2017-11-18 15:30:00
categories: scala
profile: https://avatars3.githubusercontent.com/u/12473268?s=400&u=3337a754192e339ee81bc1b4e8a9d223412c6f33&v=4
profile_url: https://github.com/ailrun
desc: Scala 안의 값들을 명명하고 표현식을 평가하는 방법
---

모든 Programming 언어는 값 (Value) 을 명명 (Naming) 할 수 있다. 값에 이름을 붙이는 것은 복잡한 계산의 결과가 무엇을 뜻하는지 이해하기 쉽게 해준다. 뿐만 아니라 값에 이름을 붙이는 것은 동일한 계산을 Computer 가 여러 번 할 필요 없이, 효율적으로 한 번만 해도 되게 만들어준다. 따라서 값을 명명하고 값을 어떻게 계산하느냐는 Programming 언어에 있어서 매우 중요한 일 중 하나이다. Scala 에서는 이런 값의 명명과 계산을 어떻게 할 수 있는지, 또 그렇게 명명된 값을 어떻게 쓸 수 있는지 알아보자.

#### Scala 를 사용하는 방법

이전 글([Github](https://github.com/stunstunstun/awesome-wiki/tree/master/Scala/scala-hello-world.md), [안녕 프로그래밍 사이트](https://www.holaxprogramming.com/2017/11/14/scala-hello-world/))을 참고하자.

이 글에서 역시 [Scastie](https://scastie.scala-lang.org/) 를 사용할 것이기 때문에 Scala 를 Computer 에 설치할 필요는 없으며, Scastie 에서 Worksheet 기능을 꺼주기만 하면 된다.

#### 표현식과 값

사실, 명명법에 대해서 말하기 이전에, 우선 **표현식** (Expression) 이라는 것이 프로그래밍 언어에서 무엇인지를 알아야한다.

표현식이란, **평가 (Evaluation) 를 통해서 값으로 바뀌는 식**, 혹은 **결과값이 있는 식**을 뜻한다.

다음 Code 를 보자.

``` scala
object Expression extends App {
  println(5 + 4)
}
```

`5 + 4` 이 `9` 로 계산되어 출력될 것이다. 이때 `9` 를 `5 + 4` 의 평가 결과, 혹은 표현식의 값이라고 하고, `5 + 4` 를 **표현식**이라고 한다.

Scala 에서의 표현식은 위와 같이 한 줄로 쓰여질 수도 있지만, 좀 더 복잡하게 쓰여질 수도 있다.

``` scala
object Expression extends App {
  println({
    5 * 7
    4 + 3
  })
}
```

위 Code 에서

``` scala
{
5 * 7
4 + 3
}
```

에 해당하는 부분이 표현식이다. 이 표현식은 여러 줄로 쓸 수 있고, 여러 줄 중 하나에서 `println()` 과 같은 함수를  실행할 수도 있다. 이 표현식의 평가 결과는 언제나 `{}` 로 둘러싸인 제일 마지막 표현식의 평가 결과와 같다. 즉, 위 Code 의 경우는 `4 + 3` 의 값인 `7` 이 `{}` 로 둘러싸인 전체 표현식의 값이다.

실제로 앞의 Code 를 실행해보면 다음과 같은 출력을 볼 수 있을 것이다.

```
7
```

표현식과 평가에 대해서 기본적인 이해를 하였을 것이라 믿는다. 이제 Scala 에서 값을 명명하는 방법들에 대해서 알아보자.

#### Scala 에서 쓸 수 있는 값의 명명 방법들

Scala 에는 기본적으로 다음과 같은 네 종류의 값의 명명이 가능하다.

``` scala
object Naming extends App {
  val oneAddOne = 1 + 1
  lazy val twoMultTwo = 2 * 2
  var threeDivThree = 3 / 3
  def fourMinusFour = 4 - 4
}
```

각각이 무엇을 의미하는지 살펴보도록 하자.

#### val 을 사용한 명명

아래 Code 를 실행시켜보자.

``` scala
object Naming extends App {
  val first = 1
  println(first)
}
```

위 Code 의 실행 결과는 아래 Code 의 실행 결과와 똑같을 것이다.

``` scala
object Naming extends App {
  println(1)
}
```

즉 우리는 값 `1` 에 `first` 라는 이름을 붙이고 그 이름을 대신 사용할 수 있는 것이다.
이 경우에는 명명이 별로 쓸모가 없어보일 수도 있으니, 약간의 계산을 포함하는 다음 경우를 보도록 하자.

``` scala
object Naming extends App {
  val cooktimeInMin = 4
  val secPerMin = 60
  val cooktimeInSec = cooktimeInMin * secPerMin
  println("Cup noodle takes " + cooktimeInMin + " min.")
  println("In other words, it takes " + cooktimeInSec + " sec.")
}
```

우리는 우선 `cooktimeInMin` 이라는 이름으로 컵라면을 끓이는데 걸리는 시간을 **(분)** 단위로 정의했다. 그리고 `secPerMin` 이라는 이름으로 **1 분 안에 몇 초가 있는지**를 정의했다. 마지막으로, 컵라면을 끓이는데 걸리는 시간을 **(초)** 단위로 계산한 뒤 이 표현식의 값을 `cooktimeInSec` 이라는 이름으로 정의했다. 이 내용을 화면에 출력하기 위해서 `println` 함수와, `+`, `*` 를 사용하였다.

여기서 `println` 은 (이전 글을 읽었다면) 이미 알고 있을 것이고, `+` 와 `*` 에 대해서 알아보자. `+` 는 둘 이상의 String (`"` 로 감싸져있는 Text) 혹은 String 으로 표시할 수 있는 것 (대표적으로는 숫자) 을 하나의 String 이 되도록 **합치는** 것이다. 또한, `*` 는 숫자 두 개를 곱하는 것이다. :) 실행해보면 이 말이 무슨 뜻인지 알 수 있을 것이다.

(힌트1: "Cup noodle takes " 와 숫자 4 과 " min." 을 순서대로 쓰면?)
(힌트2: 4 * 60 은?)

#### lazy val, def 를 사용한 명명

`lazy val`, `def` 를 사용한 Code 를 보자.

``` scala
object Naming extends App {
  lazy val cooktimeInMin = 4
  lazy val secPerMin = 60
  lazy val cooktimeInSec = cooktimeInMin * secPerMin
  println("Cup noodle takes " + cooktimeInMin + " min.")
  println("In other words, it takes " + cooktimeInSec + " sec.")
}
```

``` scala
object Naming extends App {
  def cooktimeInMin = 4
  def secPerMin = 60
  def cooktimeInSec = cooktimeInMin * secPerMin
  println("Cup noodle takes " + cooktimeInMin + " min.")
  println("In other words, it takes " + cooktimeInSec + " sec.")
}
```

아까의 `val` 예시와 결과가 똑같지 않은가? 대체 차이점이 무엇인가?

`val`, `lazy val`, `def` 의 차이점이 무엇인지 알기 위해서는 표현식의 평가가 어떻게 진행되는지를 알아야 한다.

#### 표현식의 평가 방법

표현식의 평가 방법을 알기 위해 좀 더 복잡한 표현식을 사용해보자.

``` scala
object Evaluation extends App {
  val cooktimeInMin = {
    println("Hi I'm cup noodle!")
    4
  }
  println("Let's start cooking!")
  println("Cup noodle takes " + cooktimeInMin + " min.")
  println("Oh, " + cooktimeInMin + " min is soooo short!")
}
```

위 Code 를 실행시키면 어떤 값이 출력될까?

```
Hi I'm cup noodle!
Let's start cooking!
Cup noodle takes 4 min.
Oh, 4 min is soooo short!
```

이번에는 `val` 을 `lazy val` 로 바꾼 뒤 실행시켜보자.

``` scala
object Evaluation extends App {
  lazy val cooktimeInMin = {
    println("Hi I'm cup noodle!")
    4
  }
  println("Let's start cooking!")
  println("Cup noodle takes " + cooktimeInMin + " min.")
}
```

```
Let's start cooking!
Hi I'm cup noodle!
Cup noodle takes 4 min.
Oh, 4 min is soooo short!
```

혹시 차이점을 눈치 챘는가? `lazy val` 의 경우는 `cooktimeInMin` 으로 이름 붙인 표현식이 더 늦게 평가된다. 이 '더 늦게'가 언제인지 알겠는가? 눈치챘다면, 훌륭하다!

눈치채지 못한 사람들을 위해 (다른 말론, 거의 모든 사람들을 위해) 정확하게 알려주자면, `lazy val` 은 **정의된 이름이 처음 사용될 때** 평가된다. 흠? 그렇다면 `val` 은 언제 평가된단 말인가? `val` 의 경우에는 **정의되자 마자** 평가된다.

다음 코드를 실행해보면 이 차이가 왜 중요한 지 알 수 있다.

``` scala
object Evaluation extends App {
  val noodleCookingTimeInMin = {
    Thread.sleep(5000)
    println("Hm... it's hard to calculate!")
    4
  }
  println("Let's start cooking!")
  println("To make hamburger, let's start with making patty!")
}
```

``` scala
object Evaluation extends App {
  lazy val noodleCookingTimeInMin = {
    Thread.sleep(5000)
    println("Hm... it's hard to calculate!")
    4
  }
  println("Let's start cooking!")
  println("To make hamburger, let's start with making patty!")
}
```

하나는 요리를 시작하기도 전에 컵라면 제조법을 읽느라 5 초를 기다려야한다!

자, 그러면 `def` 는? 다음 Code 를 실행해보자.

``` scala
object Evaluation extends App {
  val cooktimeInMin = {
    println("Hi I'm cup noodle!")
    4
  }
  val secPerMin = 60
  println("Let's start cooking!")
  println("Cup noodle takes " + cooktimeInMin + " min.")
  println("Or, it takes " + cooktimeInMin * secPerMin + " sec.")
}
```

``` scala
object Evaluation extends App {
  def cooktimeInMin = {
    println("Hi I'm cup noodle!")
    4
  }
  val secPerMin = 60
  println("Let's start cooking!")
  println("Cup noodle takes " + cooktimeInMin + " min.")
  println("Or, it takes " + cooktimeInMin * secPerMin + " sec.")
}
```

`val` 과 `lazy val` 의 차이점을 안 지금이라면 위 둘의 차이점도 알 수 있으리라 믿는다.

(힌트: `def` 는 사용될 때마다 ...)

#### var 을 사용한 정의

다음 Code 를 실행시켜보자.

``` scala
object Definition extends App {
  var cooktimeInMin = 4
  var secPerMin = 60
  var cooktimeInSec = cooktimeInMin * secPerMin
  println("Cup noodle takes " + cooktimeInMin + " min.")
  println("In other words, it takes " + cooktimeInSec + " sec.")
}
```

흠? 또 다시 `val` 의 예시와 같지 않은가? 이번에도 표현식이 평가되는 방식이 다른 것인가? 안타깝게도 `var` 은 `val` 과 동일하게 정의하는 즉시 평가된다. 그렇다면 대체 무엇이 다를까? 아래 코드를 각각 실행시키려고 해 보자.

``` scala
object Definition extends App {
  // Oh, it's mistake!
  val cooktimeInMin = 2
  cooktimeInMin = 4
}
```

``` scala
object Definition extends App {
  // Oh, it's mistake!
  var cooktimeInMin = 2
  cooktimeInMin = 4
}
```

여기서 `//` 부분은 주석 (Comment) 이라고 부르며, 코드 안에 설명을 써 놓을 때 사용하는 기능이다. 지금은 `val` 을 사용한 Code 를 돌리려고 시도했을 때는 실행에 실패하고, `var` 의 경우에는 성공적으로 실행된다는 점에만 주목하면 된다.

Scala 에서 `val`, `lazy val`, `def` 는 한 번 명명한 뒤로 그 이름을 다른 값을 위해 사용할 수 없다. 처음에 `val` 에서 설명했듯이, `val cooktimeInMin = 2` 라고 하였으면, (평가하는 과정을 제외하면) `cooktimeInMin` 을 사용하는 것은 그 뒤에서 `2` 를 사용하는 것과 마찬가지이다. `2` 에 다른 이름을 붙인 것에 지나지 않기 때문이다.

반면 `var` 을 사용하는 것은 얘기가 조금 다르다. 눈치 빠른 독자는 이 절의 제목이 **명명**이 아닌 **정의**라는 것을 알아챘을 것이다. `var` 을 사용하면 그 안의 내용물을 언제든지 바꿀 수 있는 **변수**를 **정의**한 뒤, 그 첫 값을 `=` 뒤에 있는 값으로 설정한다. 대다수의 많은 개발자들이 사용하는 언어들을 기준으로 말하면, `var` 은 일반적으로 변수를 정의하는 것이고 `val` 은 `const`, `final` 등의 Keyword 를 붙여서 상수 (혹은 그 비슷한 것) 를 정의하는 것이다.

#### 명명과 정의?

이 쯤에서 의문이 드는 개발자도 있을 것이다.

> 그러면 왜 변수에 해당하는 것은 하나뿐이고 상수에 해당하는 것은 세 개나 있지? 개발할 때 변수를 더 많이 쓰지 않나?

결론만 말하자면, Scala 에서는 `val`, `lazy val`, `def` 를 사용해서 정의하는 것이 기본이고, 어쩔 수 없이 필요할 경우 (정말 중요한 성능의 문제라거나 ...) 에만 한정적으로 `var` 을 사용한다. 이는 Scala 뿐만이 아니라 많은 Programming 언어에서 Bug 를 피하기 위한 Coding style 중에 하나이다.


- [C++](http://www.bfilipek.com/2016/12/please-declare-your-variables-as-const.html)
- [Java](https://softwareengineering.stackexchange.com/questions/98691/excessive-use-final-keyword-in-java)
- [JavaScript](https://eslint.org/docs/rules/prefer-const)
- 기타 등등...

#### 다음에는...

지금까지 Scala 에서 표현식을 사용하는 방법과 표현식의 값을 명명하는 방법, 그리고 변수를 정의하는 방법에 대해서 알아보았다. 다음 글에서는 순차적인 Code 를 작성하는 방법과 Code 를 작게 쪼개는 방법에 대해서 알아볼 것이다.
