---
title: Python 시작하기 TDD부터 PyPI에 배포까지
date: 2017-04-30 00:24:49
categories: Python 활용하기
---

필자는 보통 새로운 언어를 학습하기 위해서 먼저 프로그래밍을 위한 개발 환경을 설치하고 그 이후에는 TDD(Test Driven Development)로 아주 간단한 퀴즈를 풀어보는 것으로 시작한다. 

`TDD`는 소프트웨어를 개발하는 방법론 중 하나이며, 우리가 작성하게 되는 모든 코드는 올바르게 작동하는지에 대한 검증이 필요한데 보통 이러한 과정을 `테스트`라고 불린다. 문자 그대로 `테스트`를 위한 코드를 먼저 작성하는 것을 의미한다. 개인적으로는 TDD를 테스트 코드를 먼저 작성하는 습관으로 말하고 싶다.

#### TDD를 통해 새로운 프로그래밍 언어를 학습하면 아래와 같은 장점이 있다.

- 테스트 코드는 비교적 쉬운 기본적인 문법으로 시작할 수 있다
- 기존의 자신에게 익숙했던 언어와 새로운 언어에 대한 차이를 쉽게 파악 할 수 있다.
- 기본적인 문법의 부재 부터 그리고 예상하지 못한 다양한 문제에 부딪히면서 주도적으로 학습할 수 있게 도와준다.
- IDE에서 테스트 코드를 효율적으로 실행시키기 위해서 고민하다보면 새로운 개발 환경에 자연스럽게 익숙해질 수 있다.

이 글에서는 이와 같이 새로운 언어를 접근하는 개인적인 습관에 대해 공유할려고 한다.

## Python으로 TDD 맛보기

TDD는 테스트 코드를 먼저 작성하는 습관이라고 말했는데, 아주 간단한 예제를 보면서 구체적으로 살펴보자. 

#### 지금부터 작성하는 예제에 대한 요구사항은 아래와 같다


#### INPUT

```python

```

#### OUTPUT


```python

```

#### 테스트 코드


TDD에 대해 자세히 알고 싶다면 `Test Driven Development By Example`이라는 Kent Beck의 저서를 추천한다.
> https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530

그렇다면 지금부터는 Python을 설치하는것을 시작으로 Python을 통한 프로젝트 환경을 살펴보도록 하겠다.

## Python 설치하기

#### Python Interpreter

#### IDLE

#### PyCharm

## Python 프로젝트의 기본 구조

#### 패키지와 모듈

```
fbmessage
├── README.rst
├── setup.cfg
├── setup.py
└── app
    ├── __init__.py
    ├── app.py
└── fbmessage
    ├── __init__.py
    ├── message.py
└── tests
    ├── __init__.py
    └── test_message.py
```

#### \_\_init\_\_.py

> [\[PEP 420\]](https://www.python.org/dev/peps/pep-0420/) Python 3.3 버전부터는 \_\_init\_\_.py 파일 없이도 패키지로 인식이 된다. 하지만 배포용 라이브러리를 개발한다면 하위 Version의 호환성을 위해서 \_\_init\_\_.py 파일을 생성하는 것을 추천한다.

#### setup.py

#### 첫 테스트 케이스 만들기

우리는 간단하게 Python의 프로젝트 구조를 살펴보았고 이제는 본격적으로 `fbmessage` 패키지의 `message` 모듈을 테스트하기 위한 클래스를 만들어 보자.

```
import unittest
from fbmessage.message import Message


class TestMessage(unittest.TestCase): 
    def test_send_text_message(self):
        message_bot = Message(self.verify_token, self.page_access_token)
        assert message_bot.send_text_message(self.recipient_id, 'This message is from unittest')
```

#### 테스트 실행

## Python의 패키지 설치 도구 PIP

#### 외부 Module 가져오기

```python
$ pip install googletrans
$ python
Python 3.6.0 |Anaconda 4.3.1 (x86_64)| (default, Dec 23 2016, 13:19:00) 
[GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.57)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import googletrans
```

#### 프로젝트에 외부 Module 설치하기

#### Python Lint

- Coding Convention

## Python의 실행 환경을 지탱하는 도구들

#### pyenv

```
$ brew update
$ brew install pyenv
```

```
$ pyenv install -list
Available versions:
  2.1.3
  2.2.3
  2.7.13
...
  3.6.1
```

```
$ pyenv install 3.6.1
$ pyenv install 2.7.13
$ pyenv versions
$ python -V
```

```
$ python global 3.6.1
$ mkdir app
& cd app
$ python local 2.7.13

$ python -V
Python 2.7.12
```

#### virtualenv 

#### autoenv

## PyPI에 자신의 Module 배포하기

#### Module을 만들고 배포함으로써 얻는 이득 

새로운 언어를 학습 할 때 기존의 라이브러리 프로젝트를 통해 프로젝트 구조의 Best Practice를 파악한다.

- 개발
- 테스트
- 빌드
- 배포

모든 과정을 짧게 체험 해 볼 수 있다. 이 과정에서 Python 커뮤니티에서 사용되는 다양한 기법을 알아 낼 수 있다.

- 개발 환경을 어떻게 구성하는지?
- 테스트는 어떻게 하고 있는지?
- 프로젝트의 구조는 어떠한지?
- 프로젝트의 Version 관리는 어떻게 하는지?
- 프로젝트에 필요한 라이브러리들의 의존성은 어떻게 관리하는지?
- 프로젝트 배포를 위한 빌드와 패키징은 어떻게 하는지?
- 프로젝트의 문서 관리는 어떻게 관리하는지?


#### 배포하기

- PyPI?


**Install**
```
python -m pip install setuptools wheel twine
```

**Update Version Info**

**PKG-INFO 생성**
```
] python3 setup.py egg_info
```

**PKG-INFO 업로드**
- https://pypi.python.org/pypi?:action=submit_form

**dist 생성**
```
] python3 setup.py sdist
```

**upload**
```
] twine upload dist/*
```

## Usages

````
pip install fbmessage
````

## References

- https://packaging.python.org/distributing/
- https://packaging.python.org/distributing/#uploading-your-project-to-pypi

---

## References 

- https://python.org/
- http://python-guide-kr.readthedocs.io/ko/latest/starting/install/osx.html
- http://docs.python-guide.org/en/latest/writing/structure/
- https://learnpythonthehardway.org/book/ex46.html
- https://www.slideshare.net/perhapsspy/django-42665652
- https://jeffknupp.com/blog/2013/08/16/open-sourcing-a-python-project-the-right-way/
- http://www.flowdas.com/blog/파이썬-프로젝트-시작하기-nose/
- http://damnwidget.github.io/anaconda/
- http://doc.pytest.org/en/latest/index.html
- https://tox.readthedocs.io/en/latest/#