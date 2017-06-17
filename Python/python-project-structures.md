---
title: 파이썬 시작하기 TDD부터 PyPI에 배포까지 (3)
date: 2017-06-21 15:24:49
desc: 파이썬 프로젝트의 구조
categories: python
---

## 파이썬 프로젝트의 구조

#### 패키지와 모듈

```
algorithms
├── README.rst
├── setup.cfg
├── setup.py
└── algorithms
    ├── __init__.py
    ├── array.py
└── tests
    ├── __init__.py
    └── test_array.py
```

#### `__init__.py`

> [\[PEP 420\]](https://www.python.org/dev/peps/pep-0420/) Python 3.3 버전부터는 \_\_init\_\_.py 파일 없이도 패키지로 인식이 된다. 하지만 배포용 라이브러리를 개발한다면 하위 Version의 호환성을 위해서 \_\_init\_\_.py 파일을 생성하는 것을 추천한다.

#### setuptools와 `setup.py`

`setup.py`
```python
```

## pip 활용하기

#### 외부 Package 설치

```
$ pip install requests
```

```
>>> import requests
>>> s = requests.Session()
>>> r = s.get('https://httpbin.org/cookies')
>>> print(r.text)
{
  "cookies": {}
}
```

#### 프로젝트에 외부 Module 설치하기

<br/>

#### References

> http://python-guide-pt-br.readthedocs.io/en/latest/writing/structure/
https://packaging.python.org/tutorials/installing-packages/#requirements-for-installing-packages
http://www.flowdas.com/blog/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-setuptools/
https://github.com/kennethreitz/python-guide/tree/master/docs/dev
https://learnpythonthehardway.org/book/ex46.html