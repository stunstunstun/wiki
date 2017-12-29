---
title: 파이썬 시작하기 TDD부터 PyPI에 배포까지 
date: 2017-06-15 00:24:49
desc: TDD를 통해 파이썬 시작하기
categories: python
---

필자는 보통 새로운 언어를 학습하기 위해서 먼저 프로그래밍을 위한 개발 환경을 설치하고 그 이후에는 `TDD(Test Driven Development)`를 통해 다양한 문제에 노출되는 것으로 시작한다. TDD는 소프트웨어를 개발하는 방법론 중 하나이며, 우리가 작성하게 되는 모든 코드는 올바르게 작동하는지에 대한 검증이 필요한데 보통 이러한 과정을 `테스트`라고 불린다. 

<!--more-->

테스트는 직접 기능을 사용하면서 사용자 관점에서 테스트하기도 하며 개발자가 직접 테스트하거나 혹은 테스트를 위한 팀이 있을 수도 있다. 여기서 결론은 누군가는 당신이 작성한 코드를 테스트해야 한다는 것이다. TDD는 여기서 개발자가 자신의 코드를 직접 테스트하는 것을 말하며 문자 그대로 `테스트`를 위한 코드를 먼저 작성하는 것을 의미한다. 

개인적으로는 TDD를 테스트 코드를 먼저 작성하는 습관이라고 말하고 싶다. TDD를 통해 새로운 프로그래밍 언어를 학습하면 아래와 같은 장점이 있다.

- 테스트 코드는 비교적 쉬운 기본적인 문법으로 시작할 수 있다
- 기존의 자신에게 익숙했던 언어와 새로운 언어에 대한 차이를 쉽게 파악할 수 있다.
- 기본적인 문법의 부재부터 그리고 예상하지 못한 다양한 문제에 부딪히면서 주도적으로 학습할 수 있게 도와준다.
- 테스트 코드를 실행하기 위한 고민을 시작으로 새로운 개발 환경에 자연스럽게 익숙해질 수 있다.

> TDD에 대해 자세히 알고 싶다면 `Test Driven Development By Example`이라는 Kent Beck의 저서를 추천한다.
https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530

이 글에서는 TDD를 시작으로 새로운 언어를 접근하는 개인적인 습관에 대한 내용을 파이썬을 시작하면서 정리하고자 한다.

## 파이썬 설치하기

우리는 파이썬 프로그래밍을 위한 기본적인 환경이 필요하기 때문에, 먼저 운영체제에 파이썬과 개발 도구를 설치하는 과정을 살펴보자.

#### 파이썬 Interpreter 설치

파이썬은 공식 사이트인 [python.org](https://www.python.org/)에서 다운로드할 수 있다. 설치가 매우 간단하며 OSX 사용자라면 이미 파이썬이 설치되어 있을 것이다. 설치 후 커맨드 라인에서 아래와 같이 입력하면, 파이썬 Interpeter를 통해 프로그래밍할 수 있는 환경이 갖추어진다.

```bash
$ python
Python 3.6.0 |Anaconda 4.3.1 (x86_64)| (default, Dec 23 2016, 13:19:00) 
[GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.57)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> _
```

#### IDLE과 PyCharm IDE

Interpreter 언어인 파이썬은 위와 같은 Interactive 모드를 통해 별도의 도구 없이 한 줄 한 줄 프로그래밍하도록 도와준다. 하지만 앞으로의 대부분의 구현은 파일에 작성하게 되는데, 파이썬에는 파일에 작성하기 위한 기본 도구인 IDLE를 포함하고 있지만 JetBrain의 [PyCharm IDE](https://www.jetbrains.com/pycharm/)를 사용하는 것을 추천한다. 자 뻔한 과정은 생략하고 아래와 같이 `Hello World`를 출력하는 첫 파이썬 프로그램을 작성해보자.

`hello_world.py`
```
print('Hello World')
```

파일에 작성된 코드 역시 파이썬 Interpreter에 의해서 실행되며 방법은 아래와 같다. 정상적으로 출력이 된다면 우리는 파이썬 프로그래밍을 위한 모든 준비를 마쳤다!

```
$ python hello_world.py
Hello World
```

## 파이썬으로 TDD 맛보기

TDD는 테스트 코드를 먼저 작성하는 습관이라고 말했는데 아주 간단한 예제를 보면서 살펴보자. 지금부터 작성하는 예제에 대한 요구사항은 아래와 같다.

Array라는 클래스는 `sum`이라는 Function을 갖는데 `sum`의 입력 값은 아래와 같다.

- 첫 번째 Argument는 덧셈에 필요한 숫자의 개수를 전달한다.
- 두 번째 Argument는 덧셈에 필요한 숫자를 공백을 포함한 문자열의 형태로 전달한다.

그리고 출력 값은 아래와 같다.

- 두 번째 Argument로 전달된 숫자들의 합을 반환한다.
- 첫 번째 Argument의 숫자와 두 번째 Argument의 숫자의 개수가 같은지 체크하고 틀리다면 예외를 발생시킨다.

예상되는 `INPUT`과 `OUTPUT`의 형태를 통해 정리해보자.

#### INPUT

이와 같이 첫 번째 Argument가 6이라면 두 번째 Argument에는 6개의 숫자와 공백을 포함하는 문자열을 전달한다.

```python
6
1 2 3 4 10 11
```

만약 아래와 같이 숫자의 개수가 틀리다면 예외가 발생할 것이다

```python
5
1 2 3 4 10 11
```

#### OUTPUT

결과는 두 번째 Argument를 통해 전달된 숫자들의 합인 31이다.

```python
31
```

#### 첫 테스트 케이스 만들기

일단 무작정 테스트 코드부터 먼저 작성해 보았다. Array 클래스를 통해 인스턴스를 하나 생성하고 2개의 Argument를 전달해 `sum` Function을 테스트하는 클래스이다.

`test_array.py`
```
class TestArray(unittest.TestCase):
    def test_sum(self):
        instance = Array()
        result = instance.sum(6, '1 2 3 4 10 11')
        self.assertEqual(result, 31)
```

어이쿠 역시 PyCharm IDE에서 `unittest`라는 패키지를 참조할 수 없다고 붉은색으로 무섭게 표시하면서 알려준다. 파이썬에서 제공하는 외부 패키지에 대한 [문서](https://docs.python.org/3/tutorial/modules.html)를 참고한 뒤 다시 코드를 작성해본다.

`test_array.py`
```
import unittest


class TestArray(unittest.TestCase):
    def test_sum(self):
        instance = Array()
        result = instance.sum(6, '1 2 3 4 10 11')
        self.assertEqual(result, 31)
```

다행히 파이썬의 내장 키워드인 `import`를 통해서 `unittest` 패키지를 참조한 뒤에는 붉은색의 경고는 사라졌지만 여전히 Array 클래스는 아직 존재하지 않는다.

#### 실제 작동하는 구현 코드

테스트 클래스에 이어서 실제 동작하는 Array 클래스를 작성하였다. 실제 구현은 잠시 미뤄두고 테스트 클래스에서 참조 가능한 상태로 만들고 싶다.

`array.py`

```python
class Array(object):
    def sum(self, size, array_string):
        return 0
```

하지만 여전히 IDE에서는 Array 클래스를 참조할 수 없다고 한다. `unittest`에서 얻은 경험으로 파이썬의 `import` 키워드를 통해 Array 클래스를 참조하였다.

`test_array.py`

```
import unittest
from algorithms import array

class TestArray(unittest.TestCase):
    def test_sum(self):
        instance = array.Array()
        result = instance.sum(6, '1 2 3 4 10 11')
        self.assertEqual(result, 31)
```

이제야 IDE에서 붉은색 경고가 더 이상 보이지 않는 행복한 일이 벌어졌다. 그런데 여기서 의문점이 생기지 않나? 아래와 같이 말이다.

- 테스트는 어떻게 실행해야 할까?
- 파이썬 프로젝트는 앞으로 어떻게 효율적으로 관리해야 할까?

다행히 테스트를 위해서는 파이썬의 표준 라이브러리(Standard Library) 중 하나인 `unittest`를 사용했지만 앞으로는 더욱 다양한 모듈과 모듈 간의 의존성을 관리해야 한다. 경우에 따라서는 외부의 저장소에서 모듈을 다운로드해야 할 필요도 있을 것이다.

이와 같이 테스트 코드를 통해 프로젝트를 관리하기 위한 고민을 시작하면 쉽게 다양한 문제에 노출되어 새로운 환경에서 필요한 요소들을 주도적으로 찾아갈 수 있다.

#### Walking Skeleton

<img src='https://d341kum51qu34d.cloudfront.net/images/posts/skeleton-83d0cd49.gif' width='500' />

> http://alistair.cockburn.us/Walking+skeleton

`Walking Skeleton`이란 실제로 동작하는 프로젝트의 골격을 말하는데, 여기서 `동작하다`라는 추상적인 표현은 기능을 말하는 것이 아닌 프로젝트가 빌드되고 배포되기까지의 과정을 위한 기반을 말한다. 문자 그대로 아래와 같이 프로젝트를 지탱하는 `뼈대(Skeleton)`되시겠다.

- 테스트 전략
- 프로젝트를 지탱하는 파이썬 실행 환경
- 빌드 또는 패키징
- 배포

다음 글에서는 `TDD`와 `Walking Skelton`를 이용해 점차 프로젝트를 구성해 나아가는 과정을 살펴보도록 하겠다.
> https://www.holaxprogramming.com/2017/06/17/python-with-test/

<br/>

#### References

- https://python.org/
- https://docs.python.org/3.6/library/unittest.html
- http://doc.pytest.org/en/latest/index.html
- http://wiki.c2.com/?WalkingSkeleton
