---
title: 파이썬의 실행 환경을 지탱하는 도구들
date: 2017-06-20 15:24:49
desc: 파이썬 시작하기 TDD부터 PyPI에 배포까지
categories: python
---


#### 파이썬 버전을 효율적으로 관리하는 도우미 pyenv

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
$ pyenv global 3.6.1
$ python -V
$ mkdir app
& cd app
$ pyenv local 2.7.13
$ python -V
Python 2.7.12
```

#### 실행 환경은 virtualenv 를 통해 관리하자

`virtualenv`는 프로젝트마다 독립적인 실행 환경을 만드는 것을 도와줍니다. 예를 들면 A 프로젝트에서 특정 Module을 1.x version을 사용해 유지 보수하면서 B 프로젝트에서는 2.x version을 사용하는 일을 말합니다. Python의 Version 역시 프로젝트별로 구분할 수 있습니다.

```bash
$ pip install virtualenv
```

```bash
$ virtualenv --version
```

```bash
$ cd my_project
$ virtualenv env
```

```bash
$ virtualenv -p /usr/bin/python2.7 env
```

```bash
$ source env/bin/activate
```

```bash
$ pip install requests
```

```bash
$ deactivate
```

```bash
$ rm -rf env
```

#### virtualenv wrapper

#### autoenv

<br/>

#### References

> https://packaging.python.org/tutorials/installing-packages/#install-pip-setuptools-and-wheel
> https://github.com/kennethreitz/python-guide/tree/master/docs/dev