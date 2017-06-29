---
title: unittest와 함께하는 파이썬 테스트
date: 2017-06-17 15:24:49
desc: 파이썬 시작하기 TDD부터 PyPI에 배포까지
categories: python
---

[지난 글](https://www.holaxprogramming.com/2017/06/15/python-get-started/)에서는 TDD와 함께 파이썬의 개발 환경을 준비하고 첫 테스트 케이스를 작성하였다. 테스트 코드를 먼저 작성함으로써 다양한 문제에 자연스럽게 노출될 수 있었는데 여전히 테스트를 실행하기 위한 의문을 남겨놓은 상태이다. 의문을 풀기 위해 테스트를 위한 표준 라이브러리인 `unittest`에 대해 자세히 살펴볼 필요가 있다. Google의 검색창에서 아래의 키워드를 통해 검색해본다. 

<!--more-->

```
python unittest
```

검색한 결과에서 가장 상위에 노출되고 있는 [`26.4. unittest — Unit testing framework — Python 3.6.1 documentation`](https://docs.python.org/3/library/unittest.html)를 참고하기로 했다. 문서에 의하면 테스트를 실행하기 위한 클래스는 `unittest` 패키지의 `TestCase` 클래스를 상속받는다. 자 그럼 다시 테스트 클래스를 살펴볼 차례다.

`test_array.py`
```
import unittest
from algorithms import array

class TestArray(unittest.TestCase):
    """
    Test that the result sum of all numbers
    """
    def test_sum(self):
        instance = array.Array()
        result = instance.sum(6, '1 2 3 4 10 11')
        self.assertEqual(result, 31)
```

TestCase 클래스를 상속받아 구현하였으며 구현 클래스의 첫 테스트 케이스를 검증하기 위한 `test_sum` Function을 가지고 있다. 테스트 코드를 실행하기 위한 커맨드 라인 명령은 아래와 같다.

```bash
$ python -m unittest
```

실행해야 할 테스트가 많다면 위와 같이 모든 테스트를 실행할 수도 있으며 아래와 같이 특정 Test Case만 실행할 수도 있다.

```bash
$ python -m unittest tests/test_array.py
```

자 그럼 테스트를 실행해볼 차례다!

```bash
FF
======================================================================
FAIL: test_sum (tests.test_array.TestArray)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/Users/jungminhyuck/github/awesome-algorithms/tests/test_array.py", line 10, in test_sum
    self.assertEqual(result, 31)
AssertionError: 0 != 31
----------------------------------------------------------------------
Ran 1 tests in 0.005s

FAILED (failures=1)

```

테스트가 역시 실패하였다(..) 하지만 긍정적인 점은 앞으로 `sum` Function을 검증하기 위해 프로그램 내부에서 직접 확인할 필요도 없으며 위와 같이 테스트를 실행하는 것만으로 `실패한 원인과 위치`를 쉽게 알 수 있게 되었다. 이제는 구현 클래스로 돌아가 볼 차례다.

`array.py`

```python
class Array(object):
    def sum(self, size, array_string):
        return 0
```

Array 클래스의 `sum`은 아무 일도 하지 않고 `0`을 반환하기 때문에 우리가 기대하는 대로 동작하지 않고 있다. Function을 아래와 같이 수정한 뒤 다시 테스트해 보았다.

```python
class Array(object):
    def sum(self, size, array_string):
        numbers = [int(number) for number in array_string.split(' ')]
        return sum(numbers)
```

```bash
$ python -m unittest
..
----------------------------------------------------------------------
Ran 1 tests in 0.000s

OK
```

드디어 테스트가 성공하였다! PyCharm을 사용한다면 처음으로 초록 막대기를 보게 되는 행복한 일도 생겼다. 이제 다시 Array 클래스의 요구사항을 살펴볼 차례다.

- [x] 첫 번째 Argument는 덧셈에 필요한 숫자의 개수를 전달한다.
- [x] 두 번째 Argument는 덧셈에 필요한 숫자를 공백을 포함한 문자열의 형태로 전달한다.
- [x] 두 번째 Argument로 전달된 숫자들의 합을 반환한다.
- [ ] 첫 번째 Argument의 숫자와 두 번째 Argument의 숫자의 개수가 같은지 체크하고 틀리다면 예외를 발생시킨다.

우리는 지금까지 많은 문제들을 해결하였지만 현재의 테스트 케이스로는 마지막 문제를 검증할 수 없는 상태이다. 

```
첫 번째 Argument의 숫자와 두 번째 Argument의 숫자의 개수가 같은지 체크하고 틀리다면 예외를 발생시킨다.
```

즉 아래와 같이 첫 번째 인자의 값과 두 번째 인자의 문자열에 포함되는 숫자들의 개수가 다르면 `sum`에서는 예외를 발생시켜야 된다.

```python
instance = array.Array()
instance.sum(5, '1 2 3 4 10 11')
```

앞서 미리 살펴본 `unittest`의 [문서](https://docs.python.org/3/library/unittest.html)를 통해 TestCase 클래스에서는 `assertRaises`와 파이썬의 람다식을 통해 아래와 같이 예외가 발생하는지에 대한 여부를 검증할 수가 있었다.

```python
class TestArray(unittest.TestCase):
    """
    Tests that an exception occurs when the number of arguments is different
    """
    def test_sum_raise_exception(self):
        self.assertRaises(Exception, lambda: array.Array().sum(5, '1 2 3 4 10 11'))
```

테스트 코드를 작성하였으니 주저 말고 테스트를 실행해보자.

```
$ python -m unittest
.F
======================================================================
FAIL: test_sum_raise_exception (tests.test_array.TestArray)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/Users/jungminhyuck/github/awesome-algorithms/tests/test_array.py", line 19, in test_sum_raise_exception
    self.assertRaises(Exception, lambda: array.Array().sum(5, '1 2 3 4 10 11'))
AssertionError: Exception not raised by <lambda>

----------------------------------------------------------------------
Ran 2 tests in 0.003s

FAILED (failures=1)
```

기존의 `test_sum`에서는 테스트가 성공하였지만 마지막 문제를 검증하기 위한 `test_sum_raise_exception`에서는 테스트가 실패한 것을 볼 수 있다. 이대로라면 `sum` Function은 올바르지 않은 Argument가 전달되어도 정상으로 작동되는 무서운 결과를 초래할 수 있어 보인다.

파이썬에서 예외를 발생하기 위한 방법은 무엇일까? 이번에는 검색 결과로 얻은 [`8. Errors and Exceptions — Python 3.6.1 documentation`](https://docs.python.org/3/tutorial/errors.html)이라는 문서를 참고해 보았다.

```python
class Array(object):
    def sum(self, size, array_string):
        numbers = [int(number) for number in array_string.split(' ')]
        if size != len(numbers):
            raise Exception('array size is not matched')
        return sum(numbers)
```

위와 같이 예외를 발생시키기 위해 파이썬의 `raise` 키워드와 Built-in 클래스인 `Exception`을 통해서 `sum`의 첫 번째 인자의 값과 두 번째 인자의 문자열에 포함되는 숫자들의 개수가 다르면 예외를 발생시키는 모습이다. 다시 테스트해보자!

```
$ python -m unittest 
..
----------------------------------------------------------------------
Ran 2 tests in 0.001s

OK
```

<br/>

테스트가 성공한 행복한 일이 벌어졌으니 이 쯤에서 TestCase 클래스를 자세히 살펴봐도 좋아 보인다. 먼저 TestCase 클래스에서 제공하는 assert Functions의 리스트는 아래와 같다.

Method	| Checks that |	New in
--|--|--
assertEqual(a, b) | a == b	|
assertNotEqual(a, b) | a != b |
assertTrue(x) | bool(x) is True	|
assertFalse(x)|	bool(x) is False |	 
assertIs(a, b)|	a is b |	3.1
assertIsNot(a, b)|	a is not b |	3.1
assertIsNone(x) |	x is None |	3.1
assertIsNotNone(x) |	x is not None |	3.1
assertIn(a, b) |	a in b |	3.1
assertNotIn(a, b) |	a not in b |	3.1
assertIsInstance(a, b) |	isinstance(a, b) |	3.2
assertNotIsInstance(a, b) |	not isinstance(a, b) |	3.2

그리고 테스트 전과 후에 필요한 행동이 있다면 TestCase 클래스의 `setUp()` `tearDown()` Functions를 활용할 수도 있다.

```python
class TestArray(unittest.TestCase):
    """
    Create class instance
    """
    def setUp(self):
        self.array = array.Array('1 2 3 4 10 11')
    """
    Test that the result sum of all numbers
    """
    def test_sum(self):
        result = self.array.sum(6)
        self.assertEqual(result, 31)
    """
    Tests that an exception occurs when the number of arguments is different
    """
    def test_sum_raise_exception(self):
        self.assertRaises(Exception, lambda: self.array.sum(5))
    """
    Print array elements
    """
    def tearDown(self):
        print('elements = {}'.format(self.array))
```

<br/>

`TestCase`는 `unittest.main()`이 동작하는 과정에서 자동으로 수집해 실행하지만 아래와 같이 사용자가 원하는 TestCase를 정의해 실행할 수도 있다.

```python
def suite():
    suite = unittest.TestSuite()
    suite.addTest(TestArray())
    suite.addTest(TestHttp())
    return suite
```

<br/>

마지막으로 우리가 지금까지 살펴 본 `unittest`를 통한 테스트의 전체적인 흐름을 표현하면 아래와 같다.

```python
def test():
    for test_case in test_suite:
        for test_method in test_case.test_methods:
            try:
                test_case.setUp()
            except:
                ..예외를 기록한다
            else:
                try:
                    test_method()
                except AssertionError:
                    ..실패 케이스를 기록한다
                except:
                    ..예외를 기록한다
                else:
                    ..성공 케이스를 기록한다
                finally:
                    try:
                        test_case.tearDown()
                    except:
                        ..예외를 기록한다
print(test())                       
```

<br/>

지금까지 테스트 코드를 먼저 작성하는 것으로 파이썬에 적응해 나아가는 모습을 살펴보았다. 모든 내용을 정리하지는 못했지만 이 과정에서 파이썬의 Built-in Keyword 부터 Function, Classes, Variables를 표현하는 연습도 저절로 할 수 있었다.

파이썬을 A부터 Z까지 학습한 뒤 프로젝트에 활용할 수도 있겠지만 TDD를 통해 다양한 문제에 노출되면서 주도적으로 학습에 필요한 내용을 찾아보았다. 예제는 단순했지만 앞으로 우리가 작성하는 코드는 점점 복잡해지며 나중에는 `레거시`라는 괴물로 변하기도 한다.

TDD를 통해 지속적으로 변경이 용이한 코드를 작성하는 것을 기대하면서 이 글을 마무리한다. 다음 글에서는 파이썬 프로젝트의 구조와 파이썬의 실행 환경을 지탱하는 다양한 도구들을 살펴보도록 하겠다.
> https://www.holaxprogramming.com/2017/06/28/python-project-structures/


#### References

> https://docs.python.org/3/library/unittest.html
https://docs.python.org/3/tutorial/errors.html