---
title: Python으로 요리하기 - 재료를 담는 그릇
date: 2017-03-09 18:21:14
desc: Python으로 요리하기
categories: 기초강의
---

<img src='https://cdn.dribbble.com/users/60266/screenshots/3480085/one_line_food_1x.jpg' />

여러분은 지금까지의 강의를 통해 운영체제에 Python을 설치하고, 체질량지수(BMI)를 구하는 첫 Python 프로그램을 만들어 보았습니다.

> 놀랍지 않나요?

처음에는 익숙하지 않았지만 프로그래밍 언어가 필요한 이유를 이해하게 되고 화려하지는 않지만 실제로 눈앞에서 작동하는 프로그램을 직접 만들어 보았습니다.


## Why?

이렇게 프로그래밍은 우리의 생각과 의도를 표현(Expression)하는 것으로 시작합니다. 단지 우리가 평소에 사용하는 우리말이 아닌 프로그래밍 언어라는 새로운 도구를 사용하는 것일 뿐이지요.

<img src='http://image.toast.com/aaaaahq/expression.png' />

하지만 우리는 아직 프로그래밍 언어라는 도구에 익숙하지 않습니다. 익숙하지 않기 때문에 답답하고 여러가지 의문들이 생겨나게 되죠, 하지만 이것은 매우 자연스러운 결과입니다. 자 그렇다면 Python을 통해 첫 프로그램을 직접 구현하면서 어떤 의문점을 가지셨나요?

- Variables는 어떤 경우에 표현 할 수 있는거지?
- Variables와 Constants은 어떤 차이가 있는거지? 어떻게 구분해서 표현해야 하는 걸까?
- 프로그래밍을 할 때 숫자와 문자열은 어떤 의미를 가지고 있는거지?
- 화면에 문자열을 출력할 때 사용하는 print() 와 같은 명령은 어떤 의미를 가지고 있는거지?

이밖에도 다양한 의문들이 생겨나야 합니다. 우리는 앞으로도 무엇을 만들지 먼저 상상하는 것을 시작으로, 무작정 Python을 통해 표현해보고 부족한 부분은 바로 학습하고 즉시 활용하는 것을 반복해 나아갑니다.

## Python으로 요리하기

당분간 이어지는 Python의 기본적인 요소들에 대한 내용은 프로그래밍을 우리 주변에서 벌어지는 일상 생활의 행동과 비교하면서 설명할 수는 없을까?라는 질문에서 시작되었습니다. 우리가 일상 생활에서 새로운 요리를 만들어 본다고 가정을 해볼께요.

#### 우리가 처음하는 요리를 만들 때 필요한 것이 무엇일까요?

- **요리의 재료를 담는 그릇**
- 요리의 기본 재료들
- 요리 중 반복적으로 일어나는 작업을 도와주는 도구들
- 재료의 상태에 따라 요리의 흐름을 담는 레시피


#### Python을 통해 우리가 프로그램을 만들때도 마찬가지예요

- **재료를 담는 그릇인 Variables**
- 기본재료가 되는 Built-in Types
- 프로그래밍 중 반복적으로 필요한 기능을 표현한 Functions
- 재료의 상태에 따라 프로그램의 순서와 흐름을 제어하는 Statements

우리는 프로그래밍의 기본이 되는 위의 4가지 요소들의 의도를 파악하고 Python으로 표현(Expression) 할 수 있다면 더욱 멋진 프로그램을 만들 수 있어요.

> 여러분이 이미 만들어낸 체질량지수(BMI) 프로그램을 상기하면서 오늘은 Python의 재료를 담는 그릇(Variables, Constatns) 들을 살펴 보도록 할께요.

## 기본적인 재료 얻기

#### 사용자와 의사소통 하기 I/O

#### `input()` Function

```python
height = input('신장을 입력하세요(cm): ')
weight = input('체중을 입력하세요(kg): ')
bmi = float(weight) / int(height) ** 2 * 10000

print('나의 신체질량지수(BMI) {}'.format(bmi))
```

#### 'print()' Function

## 요리의 재료를 담는 그릇 Variables

<img src='https://cdn.dribbble.com/users/4094/screenshots/1073579/drib166.jpg' width='300' />


#### 이름 짓기 

- 먼저 그릇의 의미를 잘 나타낼 수 있는 좋은 이름을 지어야 합니다
- 이름을 지었으면 값을 할당(assignment) 해야 합니다.

#### 어떻게 표현 할 수 있을까요?

```python
이름 = 값
```

**예제**
```python
height = 174
weight = 69.5
bmi = weight / height ** 2 * 10000
text = '저체중'
```

> Variables에 담기는 요리의 재료는 언제든지 변할 수 있다는 것을 꼭 명심하세요!

```python
height = input('신장을 입력하세요(cm) : ')
```

<br>

## 이와는 반대로 Constants는 변하지 않는 고정된 값을 표현 할 때 사용됩니다

#### 어떻게 표현 할 수 있을까요?

```python
TOP_TITLE = 'BMI 지수 프로그램'
```

#### 참고

- http://thepythonguru.com/datatype-varibles/