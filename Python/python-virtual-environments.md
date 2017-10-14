---
title: 파이썬의 실행 환경을 지탱하는 도구들
date: 2017-07-15 15:24:49
desc: 파이썬 시작하기 TDD부터 PyPI에 배포까지
categories: python
---

지금까지 파이썬을 통해 테스트 코드를 작성해 나아가면서 점차적으로 프로젝트를 구조화하는 모습을 살펴보았습니다. [이전  글들](https://www.holaxprogramming.com/2017/06/28/python-project-structures/)을 통해서 아래와 같은 의문이 다소 해소되었기를 바랍니다. (물론 저에게도 말이죠)

- 파이썬 프로그래밍을 위한 기본적인 개발 환경은 무엇인가
- 테스트에 필요한 도구 그리고 테스트 코드는 어떻게 작성하는가
- 파이썬 프로젝트의 구조는 어떠한 모습이며 내부 프로젝트의 모듈은 어떻게 관리해야 하는가
- 외부의 유용한 모듈은 어떻게 설치하는가

그렇다면 앞으로 파이썬 프로젝트를 일관적으로 관리하고 배포하기 위해서는 어떻게 해야할까요? 먼저 프로젝트를 일관적으로 관리한다는 의미는 다음과 같습니다.

- 프로젝트에 관여하는 모든 멤버가 애플리케이션을 쉽게 설치하고 실행할 수 있어야 합니다.
- 프로젝트에 포함되는 모듈의 버전과 의존성을 효율적으로 관리할 수 있어야 합니다.
- 다양한 운영체제에 쉽게 배포할 수 있어야 합니다.

이 글에서는 새롭게 생긴 의문들을 해소하기 위해서 파이썬의 실행 환경을 지탱하는 도구들을 살펴보도록 하겠습니다.

## 파이썬의 패키지들

우리는 앞서 `pip`을 통해 개발에 필요한 유용한 모듈을 프로젝트에 포함시킬 수 있었습니다. 이러한 외부의 모듈은 시스템의 아래의 경로에 설치됩니다.

`Linux`

```
/usr/local/lib/python3.6/site-packages/ 
```

`Mac OSX`
```
/Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/
```

디렉토리의 개수는 위와 같이 시스템에 설치된 파이썬 인터프리터의 버전의 종류에 따라 결정됩니다. 파이썬 인터프리터 뿐만 아니라 pip 역시 버전 별로 아래와 같이 명령어가 나뉘게 됩니다.

`시스템에 파이썬 인터프리터 2.7.10, 3.6.1를 설치한 상태`
```
$ python --version
Python 2.7.10
$ python3 --version
Python 3.6.1
```

```
$ pip --version
pip 9.0.1 from /Library/Python/2.7/site-packages/pip-9.0.1-py2.7.egg (python 2.7)
$ pip3 --version
pip 9.0.1 from /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (python 3.6)
```

이렇게 설치된 모듈은 파이썬 인터프리터와 시스템에 설치된 모든 애플리케이션에서 사용할 수 있습니다.

## Virtual Environments

파이썬의 패키징 표준은 위와 같이 한 시스템에서 다양한 애플리케이션을 설치하는 방식으로 시작되었습니다. 하지만 이러한 점은 다양한 애플리케이션에서 의존하는 모듈의 버전이 다를 때 문제가 됩니다.

파이썬의 `Virtual Environments`는 특정 애플리케이션을 위해 필요한 모듈을 구분하여 관리할 수 있도록 합니다.

#### virtualenv

이 의미는 시스템에서 다양한 파이썬 프로젝트를 동시에 작업하는 경우 모듈의 버전 충돌 문제를 우회할 필요가 있다는 것입니다. `virtualenv`는 이러한 문제를 해결하기 위해 프로젝트마다 독립적인 실행 환경을 만들도록 도와줍니다. 

이 의미는 `A 프로젝트`에서 특정 Module을 1.x 버전을 사용해 유지 보수하면서 `B 프로젝트`에서는 2.x 버전을 사용하는 것을 말합니다. 뿐만 아니라 파이썬 인터프리터의 버전도 프로젝트별로 구분할 수 있습니다. 

`virtualenv 설치 하기`

```bash
$ pip install virtualenv
```

`설치 확인`

```bash
$ virtualenv --version
```

virtualenv는 파이썬 인터프리터의 실행 바이너리를 프로젝트 내부의 `site-packages`로 복사한 뒤 파이썬의 전역 상태를 관리하는 `sys.path`에 설정된 site-packages의 경로를 내부 환경의 site-packages 경로로 변경합니다. 이 방식은 아래와 같은 명령어를 통해 프로젝트별로 개발 환경을 관리할 수 있게 합니다.

> `sys.path` - https://docs.python.org/3/library/sys.html
> `PEP 730` - https://www.python.org/dev/peps/pep-0370/

`새로운 실행 환경을 생성`

`app` 이라는 이름을 가진 새로운 프로젝트를 위한 환경을 아래와 같이 생성할 수 있습니다

```bash
$ cd app
$ virtualenv env
```

`-p` 옵션을 통해 파이썬 인터프리터의 버전을 지정하여 실행 환경을 생성합니다.

```bash
$ virtualenv -p /usr/bin/python2.7 env
```

`새로운 실행 환경을 활성화`

파이썬의 실행 환경은 `activate` 단계를 거쳐 활성화 됩니다.

```bash
$ source env/bin/activate
```

`외부 모듈 설치`

활성화된 실행 환경에서 설치된 모듈은 시스템의 전역 상태가 아닌 프로젝트 내부의 실행 환경에서만 설치됩니다.

```bash
$ pip install requests
```

`실행 환경을 비활성화`

```bash
$ deactivate
```

`실행 환경을 삭제`

```bash
$ rm -rf env
```

#### venv

만약 파이썬의 버전을 3.3 이상만을 사용한다면 아래와 같은 방법으로도 실행 환경을 생성할 수 있습니다. 버전 3.3 부터 추가된 기능으로 `venv` 모듈을 통해 실행 환경을 다루는 기능이 내장되어 있습니다.

```bash
$ python3 -m venv venv
```

> https://docs.python.org/3/library/venv.html
> https://www.python.org/dev/peps/pep-0405/

파이썬의 가상 환경을 관리하는 방법을 정리하면 다음과 같습니다.

- `virtualenv`는 버전 `2.6+` 그리고 `3.3+`를 동시에 사용한다면 추천한다. pip, setuptools 그리고 wheel은 언제나 디폴트로 새로운 가상 환경에 설치된다.
- `venv` 버전 3.3 부터 내장되었다. 역시 pip, setuptools가 새로운 가상 환경에 설치된다.

> 파이썬 버전 `3.3` `3.4`에서는 `pyvenv`를 통해 가상 환경을 생성하는 것을 추천하였지만 `3.6` 에서 Deprecated 되었다.


## virtualenvwrapper

`virtualenv`는 시스템에 다양한 파이썬 실행 환경을 효율적으로 관리할 수 있도록 하였습니다. 하지만 프로젝트를 생성할 때 마다 새로운 실행 환경을 생성하고 활성화와 비활성화하는 것이 비효율적으로 느껴진 개발자가 있었나 봅니다. 

`virtualenvwrapper`를 설치하면 이러한 문제를 해결할 수 있습니다.

```
$ pip install virtualenvwrapper
```

> https://virtualenvwrapper.readthedocs.io/en/latest/

- 실행 환경을 별도의 디렉토리에서 통합하여 관리할 수 있습니다
- 실행 환경의 생성, 삭제, 복사를 더욱 쉽게 활용합니다
- 한 번의 명령으로 실행 환경을 변경합니다

## pyenv

라이브러리 개발자는 다양한 버전의 파이썬에서 실행되는 호환성을 제공해야 합니다. 이것은 여러 버전의 파이썬을 시스템에 동시에 설치할 필요가 있다는 것입니다.

`pyenv`는 시스템에 다양한 파이썬 인터프리터를 효율적으로 설치할 수 있도록 합니다. 시스템에서 디폴트로 사용되어 지는 파이썬 인터프리터의 버전도 지정하는 등 다양한 기능을 제공합니다.

`pyenv 설치`

```
$ brew update
$ brew install pyenv
```

`설치가능한 버전을 조회`

```
$ pyenv install -list
Available versions:
  2.1.3
  2.2.3
  2.7.13
...
  3.6.1
```

`지정한 버전의 파이썬 설치`

```
$ pyenv install 3.6.1
```

`시스템에 설치된 버전 조회`

```
$ pyenv versions
```

`지정한 버전을 시스템의 디폴트로 사용`

```
$ pyenv global 3.6.1
$ python -V
```

> https://github.com/pyenv/pyenv

## pyenv-virtualenvwrapper

`pyenv`가 익숙해졌다면 동시에 `virtualenvwrapper`의 장점까지 활용할 수도 있습니다. 예를 들어 `pyenv-virtualenvwrapper`로 다양한 파이썬 버전을 설치했다면 프로젝트에서 사용할 파이썬 버전과 의존되는 모듈을 관리하기 위한 환경을 효율적으로 관리할 수 있습니다.

```
$ brew install pyenv-virtualenvwrapper
```

```
$ pyenv virtualenvwrapper
```
> https://github.com/pyenv/pyenv-virtualenvwrapper

## 정리하며

지금까지 우리는 파이썬을 시작할 때 테스트 코드를 작성하면서 다양한 문제를 만났습니다. 이러한 문제들을 해결하는 과정을 아래와 같이 정리하였고

- [파이썬 시작하기 TDD부터 PyPI에 배포까지](https://www.holaxprogramming.com/2017/06/15/python-get-started/)
- [unittest와 함께하는 파이썬 테스트](https://www.holaxprogramming.com/2017/06/17/python-with-test/)
- [파이썬 프로젝트의 구조](https://www.holaxprogramming.com/2017/06/28/python-project-structures/)
- [파이썬의 실행 환경을 지탱하는 도구들](https://www.holaxprogramming.com/2017/07/15/python-virtual-environments.md/)

다음 글에서는 지금까지의 내용을 통해 다양한 환경에서 작동하는 라이브러리를 직접 배포하는 내용으로 `파이썬 시작하기 TDD부터 PyPI에 배포까지`로 시작된 글타래를 마무리할 예정입니다.

## References
- https://docs.python.org/3/library/site.html
- https://packaging.python.org/tutorials/installing-packages/#install-pip-setuptools-and-wheel
- https://github.com/kennethreitz/python-guide/tree/master/docs/dev
- https://github.com/pyenv/pyenv
- https://spoqa.github.io/2017/10/06/python-env-managers.html
- https://blog.outsider.ne.kr/1324
- https://blog.outsider.ne.kr/1325