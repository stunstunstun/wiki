---
title: Python으로 요리하기 - 기본 재료들, 문자열 표현하기
date: 2017-04-03 00:24:49
categories: 기초강의
---

## Python으로 요리하기

당분간 이어지는 Python의 기본적인 요소들에 대한 내용은 프로그래밍을 우리 주변에서 벌어지는 일상 생활의 행동과 비교하면서 설명할 수는 없을까?라는 질문에서 시작되었습니다. 우리가 일상 생활에서 새로운 요리를 만들어 본다고 가정을 해볼께요.

#### 우리가 처음하는 요리를 만들 때 필요한 것이 무엇일까요?

- **요리의 기본 재료들**
- 요리의 재료를 담는 그릇
- 요리 중 반복적으로 일어나는 작업을 도와주는 도구들
- 재료의 상태에 따라 요리의 흐름을 담는 레시피


#### Python을 통해 우리가 프로그램을 만들때도 마찬가지예요

- **기본재료가 되는 Built-in Types**
- 재료를 담는 그릇인 Variables
- 프로그래밍 중 반복적으로 필요한 기능을 표현한 Functions
- 재료의 상태에 따라 프로그램의 순서와 흐름을 제어하는 Statements

우리는 프로그래밍의 기본이 되는 위의 4가지 요소들의 의도를 파악하고 Python으로 표현(Expression) 할 수 있다면 더욱 멋진 프로그램을 만들 수 있어요.

> 여러분이 이미 만들어낸 BMI 프로그램을 상기하면서 먼저 Python의 기본 재료(Built-In Types) 들을 살펴 보도록 할께요

<br>

## Python의 기본 재료가 되는 Built-in Types

<img src='https://cdn.dribbble.com/users/79811/screenshots/2997416/artboard_1_copy_5caprese.png' width='400' />

요리를 만들 때 소금, 설탕과 같이 가장 중요하고 자주 쓰이는 기본 재료가 Python에도 존재합니다. 바로 int, float, str, bool 등의 Build-In Types입니다. 오늘은 그 중 Python에서 문자열(str)을 표현하는 방법을 살펴 보도록 하겠습니다.

#### Text Sequence Type

Text Sequence Type은 Python에서 문자열(str)을 표현 할 때 사용합니다.

<img src='https://cdn.dribbble.com/users/88761/screenshots/3208817/dribbble_user_registration.gif' width='300' />

[Keywords]
```python
str
```

[Examples]
```python
>>> 'Hola'
Hola
>>> "Hola"
Hola
>>> 'This is "the" best'
This is "the" best
>>> "This is 'the' best"
This is 'the' best
>>> text = 저체중
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name '저체중' is not defined
>>> text = '저체중'
>>> text
'저체중'
>>> type(text)
<class 'str'>
```

```
>>> level = '저체중'
>>> '당신은 {} 입니다'.format(level)
'당신은 저체중 입니다'
```

<br>

#### Type Conversion

우리는 Python 프로그래밍에서 기본적인 재료가 되는 Built-In Type에 대해 알아보았는데요 우리는 값을 표현하면서 Type Conversion을 통해 값의 Type을 변환해야 할 경우가 생깁니다.

```
숫자를 문자열로 변환하거나
문자열을 숫자로 변화해야하는 경우 말이죠
```

[Examples]
```python
>>> height = input('신장을 입력하세요(cm) : ')
신장을 입력하세요(cm) : 174
>>> height
'174'
>>> height = height + 10
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: must be str, not int
>>> height = float(height)
>>> height
174.0
>>> height = height + 10
>>> height
184.0
```

```python
>>> height = 174
>>> print('당신의 키는 ' + height)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: must be str, not int
>>> print('당신의 키는 ' + str(height))
당신의 키는 174
```

#### 참고

- Python3 Build-in Types - https://docs.python.org/3/library/stdtypes.html
- Data Camp - https://www.datacamp.com/courses/intro-to-python-for-data-science/

<br>

**[글/그림 정민혁]**
Joycity, NHN Entertainment에서 모바일게임 및 결제 관련 플랫폼을 개발해 왔습니다. 현재는 퇴사 후 1년간의 세계일주 후에 태국의 치앙마이에서 원하는 방식으로 살아보려고 아둥 바둥 발버둥 중입니다.

지금 보시는 안녕 프로그래밍의 강의들은 브런치, 생활코딩, Youtube에도 함께 업데이트 되고 있습니다
> 브런치 매거진 - https://brunch.co.kr/magazine/holaprogramming
생활코딩 - https://opentutorials.org/course/2700
Youtube - https://www.youtube.com/channel/UCdeU7rAkbmqjn_kZUn7fStQ