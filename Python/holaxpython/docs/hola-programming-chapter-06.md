---
title: Python으로 요리하기 - 기본 재료들, 숫자 표현하기
date: 2017-03-14 00:24:49
desc: Python으로 요리하기
image: https://cdn.dribbble.com/users/60266/screenshots/3480085/one_line_food_1x.jpg'
categories: 기초강의
---

<img src='https://cdn.dribbble.com/users/60266/screenshots/3480085/one_line_food_1x.jpg' />

## Python으로 요리하기

당분간 이어지는 Python의 기본적인 요소들에 대한 내용은 프로그래밍을 우리 주변에서 벌어지는 일상 생활의 행동과 비교하면서 설명할 수는 없을까?라는 질문에서 시작되었습니다. 우리가 일상 생활에서 새로운 요리를 만들어 본다고 가정을 해볼께요.

#### 우리가 처음하는 요리를 만들 때 필요한 것이 무엇일까요?

- 요리의 재료를 담는 그릇
- **요리의 기본 재료들**
- 요리 중 반복적으로 일어나는 작업을 도와주는 도구들
- 재료의 상태에 따라 요리의 흐름을 담는 레시피


#### Python을 통해 우리가 프로그램을 만들때도 마찬가지예요

- 재료를 담는 그릇인 Variables과 Constants
- **기본재료가 되는 Built-in Types**
- 프로그래밍 중 반복적으로 필요한 기능을 표현한 Functions
- 재료의 상태에 따라 프로그램의 순서와 흐름을 제어하는 Statements

우리는 프로그래밍의 기본이 되는 위의 4가지 요소들의 의도를 파악하고 Python으로 표현(Expression) 할 수 있다면 더욱 멋진 프로그램을 만들 수 있어요.

> 여러분이 이미 만들어낸 BMI 프로그램을 상기하면서 먼저 Python의 기본 재료(Built-In Types) 들을 살펴 보도록 할께요

<br>

## Python의 기본 재료가 되는 Built-in Types

<img src='https://cdn.dribbble.com/users/79811/screenshots/2997416/artboard_1_copy_5caprese.png' width='400' />

요리를 만들 때 소금, 설탕과 같이 가장 중요하고 자주 쓰이는 기본 재료가 Python에도 존재합니다. 바로 int, float, str, bool 등의 Build-In Types입니다. 그럼 지금부터 BMI 프로그램을 만들면서 여러분에게 생긴 의문들을 하나 하나 살펴보도록 하죠.

#### Numeric Types

<img src='https://cdn.dribbble.com/users/25514/screenshots/1763091/sign-up-transition-interface-ramotion.gif' width='300' />

Numeric Types은 말 그대로 Python에서 숫자를 표현할 때 사용합니다. BMI 프로그램에서 우리가 사용자에게 입력 받은 값들을 살펴볼까요?

사용자가 입력한 값 | 설명
--|--
신장(cm) | 174의 정수(int)
체중(kg) | 69.5의 실수(float)

우리는 위와 같이 프로그래밍을 하면서 정수(int)와 소수점을 포함하는 실수(float)와 같은 숫자(Numeric)를 표현할 일이 매우 많습니다. 

Python에서 이렇게 자주 사용되는 Type을 Built-in Types로 제공하고 있습니다. 정수와 실수와 같은 숫자(Numeric Type)를 표현하기 위해서는 Python에서 제공하는 아래의 keyword를 기억해야 합니다.

```python
int float
```

그럼 우리가 만든 BMI 프로그램을 다시 살펴 볼까요?

```python
height = input('신장을 입력하세요(cm): ')
weight = input('체중을 입력하세요(kg): ')
bmi = float(weight) / int(height) ** 2 * 10000

print('나의 신체질량지수(BMI) {}'.format(bmi))
```



[Examples]
```python
>>> 10
10
>>> type(-1)
<class 'int'>
>>> type(10.5)
<class 'float'>
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