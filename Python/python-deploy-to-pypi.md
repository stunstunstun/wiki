---
title: PyPI에 파이썬 모듈 배포하기
date: 2017-07-25 00:24:49
desc: 파이썬 시작하기 TDD부터 PyPI에 배포까지
categories: python
---

Walking Skeleton이란 실제로 동작하는 프로젝트의 골격을 말하는데, 여기서 `동작하다`라는 추상적인 표현은 기능을 말하는 것이 아닌 프로젝트가 빌드되고 배포되기까지의 과정을 위한 기반을 말한다. 문자 그대로 아래와 같이 프로젝트를 지탱하는 뼈대(Skeleton)되시겠다.  

우리는 지금까지 TDD를 시작으로 파이썬의 스켈레톤 프로젝트를 만들면서 파이썬의 실행 환경까지 살펴보았다. 여기에 다양한 환경에서 동작하는 라이브러리를 개발하고 배포하는 경험을 한다면 더욱 안정적인 프로젝트 구축이 가능하다. 

안정적인 프로젝트가 의미하는 바는 다음과 같다.

- 프로젝트에 관여하는 모든 멤버가 애플리케이션을 쉽게 설치하고 실행할 수 있다.
- 테스트 코드를 쉽게 작성할 수 있다.
- 프로젝트에 포함되는 모듈의 버전과 의존성을 효율적으로 관리할 수 있다.
- 다양한 운영체제에 쉽게 배포할 수 있어야 합니다.
- 프로젝트의 업데이트 주기가 짧고 이해하기 쉬운 문서를 제공한다.

## Tox를 통해 품질 관리하기

#### Dependencies

#### Python Lint

#### Test Coverage

## Travis CI 연동하기

`Branches`

`Master`

## PyPI에 모듈 배포하기

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

https://packaging.python.org/tutorials/distributing-packages/?highlight=setup.py#setup-py
