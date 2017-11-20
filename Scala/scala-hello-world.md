---
title: Scala 로 시작하는 Hello World
date: 2017-11-14 15:20
categories: scala
profile: https://avatars3.githubusercontent.com/u/12473268?s=400&u=3337a754192e339ee81bc1b4e8a9d223412c6f33&v=4
profile_url: https://github.com/ailrun
desc: Scala 로 프로그래밍 시작하기
---

Scala 는 Java 의 디자인 및 기능을 현대의 PL 연구 결과에 맞게 확장하는 방법에 대해 연구한 결과로 만들어진 언어이다. Java 와 마찬가지로 JVM (Java Virtual Machine) 위에서 작동하는 언어지만, Java 8 이전의 Java 와는 달리, Object Oriented Programming Style 과 Functional Programming Style 을 모두 훌륭하게 지원하고 있는 언어이다.

#### Scala 설치하기

이 과정은 컴퓨터 내에서 Scala 를 쓰기 위한 과정이다. 이 글 안에서는 편의성을 위해 [Scastie](https://scastie.scala-lang.org/) 를 사용하여 Web compiler 환경에서 작업하는 것을 기준으로 할 것이지만, 이후의 내용을 따라하기 위해 미리 설치해 놓는 것도 나쁘지 않다.

1. 위에서 말했듯이, Scala 는 JVM 위에서 작동하는 언어이다. 따라서 JVM (혹은 Java) 를 먼저 설치해야 한다. 아래 Link 에 접속해서 JVM 을 설치할 수 있다. 이미 JDK (Java Development Kit) 8 이상이 설치되어 있다면 이 단계는 넘어가도 된다.
    - http://www.oracle.com/technetwork/java/javase/downloads/index.html
1. 또한 Scala 를 편집하고 Compile 할 Environment 가 필요하다. 많이 사용되는 것은 IntelliJ IDE 이다. 아래 Link 에서 IntelliJ community edition 을 받을 수 있다. 이미 IntelliJ 가 설치되어 있다면 이 단계는 넘어가도 된다.
    - https://www.jetbrains.com/idea/download/
    - Community 라고 써져있는 것을 받자. 그쪽이 무료 버전이고, Ultimate 의 경우에는 체험판만을 제공한다.
    - IntelliJ 를 쓰지 않고 싶다면 SBT 를 설치하여야 한다. SBT 는 Scala 용 Build tool 중에 하나로, IntelliJ 외의 다른 Editor (Vim, Emacs, ...) 들에서 Scala 를 쓰고 싶다면 사용하여야 하는 Tool 이다. SBT 에 대해서는 다른 글에서 설명하도록 할 것이다.
1. 이제 IntelliJ 를 킨다. Scala 는 IntelliJ 에서 Plugin 을 설치하는 것으로 설치된다. 아래 Link 를 따라서 IntelliJ 에 Plugin 을 설치할 수 있다. 설치해야하는 Plugin 은 [Scala](https://plugins.jetbrains.com/plugin/1347-scala) Plugin 이다.
    - https://www.jetbrains.com/help/idea/installing-updating-and-uninstalling-repository-plugins.html
    - 내용을 번역하자면,
        > 1. Setting Dialog 를 Ctrl-Alt-S 를 누르거나 Menu 의 Settting Icon 을 눌러 연다.
        > 2. 왼쪽의 Plugins 라고 써져있는 창을 연다.
        > 3. Install JetBrains plugin 혹은 Browse repositories 라고 써져있는 Button 을 누른다.
        > 4. 원하는 Plugin 에 오른쪽 Click 을 하고 Download and Install 을 누른다.
        > 5. 확인한다.
        > 6. Install JetBrains plugin 혹은 Browse repositories 창을 닫는다.
        > 7. OK 를 눌러 Setting Dialog 를 빠져나가고, 설정을 저장한다. IntelliJ 를 다시 켜서 Plugin 이 적용되도록 한다.
1. 이제 File -> New -> Project 를 눌러 Project 생성 창을 띄우고, 왼쪽에서 Scala, 오른쪽에서 Scala (혹은 SBT) 를 고른 뒤, Project 이름을 정한다. 그리고 오른쪽의 Scala SDK 창에서 Create button 을 눌러 Scala 를 (최신 버전을 골라서) 설치한다. SDK 가 설치된 것을 확인하였으면, Finish 를 눌러 Project 를 생성한다.
1. 이제 Scala 를 설치하는데 성공하였다!

잠깐, 아직 설치한 Scala 를 쓸 것은 아니다. 미리 받아놓는 것도 나쁘지는 않지만, 지금 꼭 받아야할 필요는 없으니 여유가 날 때 받아놓도록 하자.

#### Scala 를 Web 에서 사용하기

위와 같은 과정을 거쳐서 Scala 를 설치하는 것은 번잡할 뿐더러 이런저런 Setting 에 의해서 Code 가 정상적으로 작동하지 않을 수도 있다. 따라서 File 을 여러 개 만들 필요가 없는 간단한 경우의 예시는 다음 Link 의 Webpage 에서 Code 를 작성하고 Compile 시킨 뒤, 실행시킬 것이다.

- [Scastie](https://scastie.scala-lang.org/MzWqJ6eEQxuEKYk8F25grg)

위 Link 에 접속해보면 이미 간단한 Code 가 써져있는 것을 볼 수 있다.

``` scala
List("Hello", "World").mkString("", ", ", "!")
```

이 Code 를 실행시키기 위해서는 Run 이라고 써져있는 Button 을 누르면 된다.

``` scala
List("Hello", "World").mkString("", ", ", "!") // Hello, World!: java.lang.String
```

실제로는 `//` 이 없이 바로 결과값이 Code 의 옆에 표시될 것이다. 이제 Hello World 를 출력했으니 끝난 것인가? 아니다. 위 Code 는 Hello World 를 출력하지는 않았다. 다음 절에서 실제로 Hello World 를 출력하는 Code 를 작성해보고, 위 Code 와 비교해보도록 하자.

#### Scala 로 시작하는 Hello World

이 세상 모든 Program 은 **시작 지점**이 필요하다. 어디서부터 Code 를 읽어서 실행할 지를 모르면, Program 은 무슨 Code 를 실행해야 할 지 알 수가 없을 것이다. 이 **시작지점**을 영어로는 Entry point 라고 부른다.
Scala 의 경우에는 다음과 같은 Entry point 들이 있다.

``` scala
// object 뒤에 나오는 `Basics` 부분에는 아무 Text 나 들어가도 된다.
object Basics {
  def main(args: Array[String]): Unit = {
    // Codes
  }
}
```

``` scala
// object 뒤에 나오는 `Simple` 부분에는 아무 Text 나 들어가도 된다.
object Simple extends App {
  // Codes
}
```

위 두 개의 Entry point 는 `args` 를 사용하는 방법 빼고 동일하다. 이게 무슨 말인지는 다른 글에서 자세히 보도록 하고, 여기서는 우선 타수가 더 적은 두번째 Entry point 를 사용하도록 하자.

Scastie 에서 Entry point 를 제대로 사용하기 위해서는 Menu 의 Worksheet 부분에 불이 들어오지 않아야 한다. 만일 불이 들어와 있다면 Worksheet 부분을 Click 해서 불을 끄도록 하자.

이제, 아래와 같은 Code 를 실행하면 Hello World 를 화면에 찍어볼 수 있다.

``` scala
object Simple extends App {
  println("Hello World!")
}
```

이번에는 출력 결과가 Code 옆에 나타나는게 아니라 화면 밑의 검은 창 (Console) 에 나타날 것이다. `println` 은 그 뒤에 들어간 String (`"Hello World!"` 와 같이 `"` 로 감싸져 있는 Text) 을 Console 에 출력하는 역할을 한다. 이름의 `print` 는 출력한다는 뜻인 걸 알겠는데, 맨 뒤의 `ln` 은 무엇일까? 이것은 line 의 줄임말로 한 줄을 넘기는 (Editor 에서 Enter key 를 치는) 효과를 가지고 있다. 정확한 효과가 궁금한 사람들은 아래의 코드를 실행해보라.

``` scala
object Simple extends App {
  println("Hello World!")
  print("Hello")
  print("World!")
  println("THIS IS SCALA!!!!!!!")
}
```

#### 출력과 결과값 비교하기

아까 위에서

``` scala
List("Hello", "World").mkString("", ", ", "!")
```

와 같은 Code 를 보았을 것이다. Worksheet 에 불이 꺼진 채로 이 Code 를 돌리면 Compile Error 가 발생하기 때문에, 아래와 같이 Entry point 안에 넣어서 실행해보자.

``` scala
object Simple extends App {
  List("Hello", "World").mkString("", ", ", "!")
}
```

무슨 일이 벌어지는가? 다음과 같은 코드 또한 실행해보고 두 결과의 차이점이 무엇인지 생각해보자.

``` scala
object Simple extends App {
  println(List("Hello", "World").mkString("", ", ", "!"))
}
```

화면에 출력되는 것은 실제로 프로그램을 작동시켰을 때 눈에 보이는 것들이고, Code 의 결과값은 눈에 보이지 않고, Program 내부에서만 알 수 있는 값이다.

#### 다음에는...

지금까지 Scala 를 설치하는 방법, Scala 를 웹에서 사용하는 방법, Scala 의 Entry point 에 대해서 알아보았고, Scala 에서 Hello world 를 찍는 코드를 실행해보았다. 다음 글에서는 Scala 에서 값에 이름을 붙이는 방법에 대해서 알아볼 것이다.
