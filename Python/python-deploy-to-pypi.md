---
title: PyPI에 파이썬 모듈 배포하기
date: 2017-09-25 00:24:49
desc: 파이썬 시작하기 TDD부터 PyPI에 배포까지
categories: python
---

## Python 프로젝트 품질 관리하기

#### Python Lint

#### Test Coverage

#### Tox

## Travis CI

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

#### 빌드 

#### 테스트

#### Python Lint

#### Coverage

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

https://packaging.python.org/tutorials/distributing-packages/?highlight=setup.py#setup-py
