## Python 학습을 위한 개발환경 준비

먼저 Python을 통해 애플리케이션 개발을 하기 위한 환경을 준비하는 것으로 시작합니다. 그리고 이후 간단한 테스트 케이스를 작성하면서 Python의 기본적인 개념을 살펴볼까 합니다.

## TDD 맛보기


#### What is TDD?

필자는 새로운 언어를 학습하기 위해서 가장 먼저 개발환경을 설치하고 그 이후에는 TDD(Test Driven Development) 하기 위한 환경을 준비한다. TDD는 소프트웨어를 개발하는 하나의 방법이다. 우리가 작성하게 되는 모든 코드는 정상적으로 작동하는지에 대한 테스트가 필요한데, 코드를 구현하기 이전에 테스트 케이스를 정의하고, 테스트코드를 먼저 작성하는 방법이다.

TDD에 대해 더욱 자세히 알고 싶다면 Kent Beck의 Test Driven Development By Example 이라는 저서를 추천한다.
- TDDBE : https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530


#### 현재 Python3.6.0이 최신의 버전이며, TDD를 통해 새로운 언어를 학습하면 아래와 같은 장점이 있다.

- 기존의 익숙했던 언어와 새로운 언어에 대한 차이를 쉽게 파악 할 수 있다.
- 테스트 케이스를 먼저 구현해보면, 언어를 학습하는데에 필요한 기본적인 구성요소를 쉽게 찾을 수 있어 학습에 대한 스트레스를 줄여준다.
- 다른 언어에서 이미 경험해본 TDD를 기반으로, 새로운 언어의 개발환경에 쉽게 익숙해 질수 있다.

그렇다면 지금부터 Python 설치를 시작으로 개발에 필요한 환경들을 준비해보도록 하겠다.


## Python 설치하기

## Python Interpreter

## Python 프로젝트의 기본 구성

### 프로젝트 생성

## 첫 테스트케이스 만들기

## Python 가상환경

### pyenv

### virtualenv wrapper

## 빌드 & 테스트

## Coverage

## Coding Convention

## 오픈소스?

## 라이브러리를 만드는 이유

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

## 실무 수준에 필요한

## Convention

## Issues

## 무엇을 만들지?

이 문서에서는 한국어를 영어로 번역하는 Python 라이브러리를 만들어 나가는 과정을 통해 Python을 통해 프로젝트를 관리하는 여러가지 기법들을 정리해 나아간다.

## 배포하기

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
pip install translate-bot
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