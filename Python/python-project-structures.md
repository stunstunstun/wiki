---
title: 파이썬 프로젝트의 구조
date: 2017-06-28 15:24:49
desc: 파이썬 시작하기 TDD부터 PyPI에 배포까지
image: https://cdn.dribbble.com/users/708424/screenshots/3125631/python3_dribbble2.jpg
categories: python
---

지금까지 우리는 아래의 두 꼭지를 통해 테스트 코드를 먼저 작성하는 것으로 파이썬을 시작하였다.

<!--more-->

- [파이썬 시작하기 TDD부터 PyPI에 배포까지 ](https://www.holaxprogramming.com/2017/06/15/python-get-started/)
- [unittest와 함께하는 파이썬 테스트](https://www.holaxprogramming.com/2017/06/17/python-with-test/)

그리고 우리는 이 과정에서 `Walking Skeleton`을 통해 프로젝트를 지탱하는 구성 요소를 아래와 같이 정의하였다. 이번 글에서는 `unittest`와 함께 테스트 코드를 작성하는 과정에 이어 앞으로 발생되는 문제를 더욱 효율적으로 해결하기 위한 방법들을 살펴보도록 하자.

- ~~테스트 전략~~
- 파이썬 프로젝트의 구조
- 파이썬 프로젝트를 지탱하는 실행 환경
- 빌드 또는 패키징, 배포 

## 모듈과 패키지

프로그래밍은 문제를 해결하는 과정을 프로그래밍 언어로 표현한 것이다. 그리고 대부분의 문제들은 다시 반복되며 우리는 이를 해결하기 위해 한 번 작성한 코드를 재사용하기 위해 노력하고 있다.

<br/>
<div align='center'>
<img src='http://image.toast.com/aaaaahq/python_project.png' />
</div>
<br/>

모듈(Module)은 파이썬에서 재사용이 가능한 기본 단위이다. `.py`라는 확장자를 갖는 단일 파일에 작성되며 여러 모듈들은 다시 패키지(Package)라는 단위로 관리된다. 우리가 지금까지 작성한 결과를 구조적으로 표현하면 다음과 같은 프로젝트의 형태를 가진다.

#### 파이썬 프로젝트의 구조

```
ROOT
├── setup.py
└── algorithms
   ├── __init__.py
   ├── array.py
└── tests
    ├── __init__.py
    └── test_array.py
```

TDD와 함께 파이썬을 시작하면서 우리는 먼저 `Array` 클래스를 테스트하는 코드를 작성하였다. 그 결과 `array.py` 모듈을 구현하였고 이는 `algorithms`이라는 이름을 갖는 패키지에 포함되어 있는 모습이다. 다음으로 우리는 새롭게 출현한 `__init__.py`와 `setup.py`에 주목할 필요가 있어 보인다.

#### `__init__.py`

파이썬은 디렉토리에 `__init__.py` 파일이 존재하면 이를 패키지라 여긴다. 아래의 테스트 코드는 `algorithms`이라는 패키지로부터 테스트 대상인 `array`라는 모듈을 사용하고 있는 모습이다.

`test_array.py`
```python
import unittest

from algorithms import array


class TestArray(unittest.TestCase):
    """
    Create class instance
    """
    def setUp(self):
        self.array = array.Array('1 2 3 4 10 11')
   	...
```

요약하면 패키지로부터 모듈을 사용하기 위한 파이썬 키워드는 `from` 그리고 `import`이며 표현 방법은 아래와 같다. 

```python
from [package_name] import [module_name]
```

그리고 외부에서 패키지를 참조하는 시점에 해당 패키지의 `__init__.py`이 실행된다는 점을 기억하도록 하자. 이를 이용해 패키지가 참조되는 시점에 필요한 내용이 있다면 아래와 같이 정의할 수 있다.

`algorithms/__init__.py`
```python
"""
Description for Package
"""
from algorithms.array import Array

__all__ = ['array'] # 이 배열에 포함되는 모듈의 이름은 from algorithms import * 를 통해서도 참조될 수 있다.
__version__ = '0.1.0' # 패키지의 버전을 정의한다.
```

> [\[PEP 420\]](https://www.python.org/dev/peps/pep-0420/) 파이썬 버전 3.3 이후에는 디렉토리에 \_\_init\_\_.py 파일이 없어도 패키지로 인식된다. 하지만 배포용 라이브러리를 개발한다면 하위 버전의 호환성을 위해 \_\_init\_\_.py 파일을 생성하는 것을 추천한다.

#### `setup.py`

패키지를 `__init__.py`를 통해서 식별하는 것과 같이 파이썬은 `setup.py`을 통해 프로젝트의 최상위 디렉토리를 결정한다. setup.py 의 역할은 프로젝트의 테스트, 빌드, 배포에 필요한 정보들을 담고 있으며 `setuptools`라는 패키지를 활용하여 이 모든 과정을 쉽게 관리할 수 있도록 도와준다.

## setuptools

복잡한 문제를 해결하기 위해 프로젝트를 구조화하는 일은 쉬운일이 아니다. 파이썬에서는 아래와 같이 setuptools 패키지를 활용해 프로젝트의 테스트, 빌드, 배포 과정을 쉽게 관리할 수 있도록 도와준다.

`setup.py`

```python
import io
from setuptools import find_packages, setup


# Read in the README for the long description on PyPI
def long_description():
    with io.open('README.rst', 'r', encoding='utf-8') as f:
        readme = f.read()
    return readme

setup(name='algorithms',
      version='0.1',
      description='practice python with solving algorithms',
      long_description=long_description(),
      url='https://github.com/stunstunstun/awesome-algorithms',
      author='stunstunstun',
      author_email='agileboys.com@gmail.com',
      license='MIT',
      packages=find_packages(),
      classifiers=[
          'Programming Language :: Python :: 2.7',
          'Programming Language :: Python :: 3',
          'Programming Language :: Python :: 3.6',
          ],
      zip_safe=False)
```

#### `setup()`

`setup()` Function의 Arguments는 프로젝트의 자세한 정보를 어떻게 정의할 것인지를 결정한다.

Arguments | Description 
--|--|--
name | 패키지의 이름 
version | 패키지의 배포 버전 
description | 패키지에 대한 설명
url | 패키지를 대표하는 웹페이지
author | 패키지의 작성자
license | 패키지의 라이센스
packages | 프로젝트에 포함되는 패키지 리스트 
install_requires | 실행 환경에 필요한 최소한의 패키지 리스트
python_requires | 실행 환경에 필요한 파이썬 버전

> https://packaging.python.org/tutorials/distributing-packages/#setup-args

#### CLI(Command Line Interface)

이렇게 setuptools 를 활용한 setup.py 는 파이썬에 의해 실행되는 CLI 프로그램의 역할을 하는데 기본적으로 제공되는 명령은 아래와 같다.

```bash
$ python setup.py --help--commands
Standard commands:
  build             build everything needed to install
  build_py          "build" pure Python modules (copy to build directory)
  build_ext         build C/C++ and Cython extensions (compile/link to build directory)
  build_clib        build C/C++ libraries used by Python extensions
  build_scripts     "build" scripts (copy and fixup #! line)
  clean             clean up temporary files from 'build' command
  install           install everything from build directory
  ...
```

프로젝트의 실행 환경에서 필요한 패키지를 설치할 수도 있으며

```bash
$ python setup.py install
```

아래와 같이 프로젝트를 빌드하거나 테스트하기 위한 명령을 제공하기도 한다.

```bash
$ python setup.py build
```

```bash
$ python setup.py test
```

> 파이썬은 인터프리터 언어이기 때문에 여기서 말하는 빌드는 컴파일 과정은 아니며 저장소에 배포하기 위해 패키징하는 단계를 말한다.

위의 명령들은 프로젝트를 테스트, 빌드, 배포를 쉽게 할수 있도록 도와주며 이를 통해 파이썬 저장소인 PyPI 에 자신이 구현한 파이썬 패키지를 배포할 수 있다. setup.py 를 통해 패키지를 배포하기 위한 전략은 이후 `PyPI에 파이썬 모듈 배포하기`에서 자세히 다루도록 하겠다.

## pip

우리는 앞으로 반복되는 문제를 패키지와 모듈을 통해 효율적으로 해결할 수 있게 되었다. 하지만 프로그래밍을 통해 모든 문제를 직접 해결하는 것은 매우 어렵다. 현재는 Github 저장소를 통해 유용한 오픈 소스들이 넘쳐나고 있으며 대부분의 글로벌 서비스 역시 이러한 오픈 소스를 적극적으로 활용하고 있다. 예를 들어 당신의 애플리케이션에서 HTTP 요청을 위해 `requests`와 같은 유용한 패키지를 활용할 수 있으며 반대로 자신이 개발한 패키지를 다른 이들을 위해 배포할 수도 있다.

우리는 당신의 직면한 문제를 해결하기 위해 node의 `npm`과 유사한 파이썬 저장소인 PyPI 로부터 패키지를 다운로드해 프로젝트에 통합하는 과정을 살펴보도록 하겠다. 이를 위해 `pip`이라는 도구를 활용하는데 pip은 이미 당신의 운영체제에 파이썬과 함께 설치가 된 상태이다. pip을 활용한 명령을 살펴보도록 하자.

#### pip의 버전을 확인하자

```
$ pip --version
```

#### pip을 최신의 버전으로 업데이트하자

`On Linux or OS X`
```
$ pip install -U pip
```


`On Windows`
```
$ python -m pip install -U pip
```

#### PyPI, Python Package Index에 등록된 패키지를 설치하자

[PyPI](https://pypi.python.org/pypi)는 파이썬으로 작성된 프로그램을 위한 일종의 저장소이다. 2017년 6월을 기준으로 현재 PyPI에는 111003개의 패지지가 등록된 상태이다. 우리는 HTTP 요청을 위한 `requests`라는 패키지를 설치하는 예제를 살펴보도록 하겠다.

최신 버전의 패키지를 설치하기 위한 명령은 아래와 같으며

```bash
$ pip install requests
```

패키지의 특정 버전을 지정하여 설치할 수 있다. 

```bash
$ pip install requests==2.18.0
```

패키지가 설치되면 프로젝트 뿐만 아니라 아래와 같이 로컬 PC의 파이썬 인터프리터에서도 사용할 수도 있다.

```bash
$ python
>>> import requests
>>> session = requests.Session()
>>> response = session.get('https://httpbin.org/cookies')
>>> print(response.text)
{
  "cookies": {}
}
```

#### Requirments Files을 이용한 패키지 설치

우리는 필요에 따라 `requests` 뿐만 아니라 다양한 패키지를 프로젝트에 통합하기를 원할 것이다. 파이썬은 프로젝트 내부에서 패키지 리스트를 관리하기 위한 파일 형식을 제공하는데 이는 `Requirement Files`로 불린다. 아래와 같이 `.txt` 확장자를 갖는 파일을 생성해보자.

`requirements.txt`
```txt
requests
```

앞으로 requirements.txt 를 통해 프로젝트에 필요한 패키지를 추가할 수 있게 되었으며 아래의 명령을 통해 다양한 패키지를 동시에 설치할 수 있다.

```bash
$ pip install -r requirements.txt
```

#### 지금까지의 과정을 통해 우리가 활용한 명령은 아래와 같다.

```bash
$ python # 파이썬 인터프리터를 실행한다
$ python hello_world.py # 파일로 작성된 파이썬 프로그램을 실행한다
$ python -m unittest # 모든 테스트 코드를 실행한다
$ python -m unittest tests/test_array.py # 특정 테스트 코드를 실행한다
$ python setup.py install # 프로젝트에 포함되는 모든 패키지를 설치한다
$ python setup.py test # 프로젝트의 모든 테스트를 실행한다
$ pip install [package_name] # PyPI로부터 패키지를 설치한다
$ pip install -U [package_name] # PyPI로부터 패키지를 업데이트한다
$ pip install -r requirements.txt # Requirements 파일에 정의된 패키지 리스트를 설치한다
$ pip install -U -r requirements.txt # Requirements 파일에 정의된 패키지 리스트를 업데이트한다
```

#### 지금까지의 과정을 프로젝트로 구조화한 결과이다.

```
ROOT
├── setup.py
├── requirements.txt
└── algorithms
   ├── __init__.py
   ├── array.py
└── tests
    ├── __init__.py
    └── test_array.py
```

우리는 이렇게 지금까지 테스트 코드를 작성하는 것을 시작으로 다양한 문제를 해결하면서 그 과정을 프로젝트의 형태로 구조화하였다. 다음 글에서는 더욱 효율적으로 프로젝트를 관리하기 위해 파이썬의 실행 환경을 일관적으로 유지하는 이야기를 할 예정이다.

- ~~테스트 전략~~
- ~~파이썬 프로젝트의 구조~~
- **파이썬 프로젝트를 지탱하는 실행 환경**
- 빌드 또는 패키징, 배포


#### References

> https://packaging.python.org/tutorials/installing-packages/#requirements-for-installing-packages
https://pip.pypa.io/en/latest/reference/pip_install/#requirements-file-format
http://python-guide-pt-br.readthedocs.io/en/latest/writing/structure/
