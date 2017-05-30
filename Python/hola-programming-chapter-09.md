---
title: Python으로 요리하기 - 재료의 상태에 따라 요리의 흐름을 담는 레시피
date: 2017-04-15 00:24:49
categories: 기초강의
---

## 요리의 흐름을 제어하는 keywords와 문장들

 프로그래밍 언어를 기초 체력을 키우기 위해서는 자신의 상상을 프로그래밍 언어를 옮기는 연습이 중요합니다. 그 과정에서 우리는 다양한 문제에 직면하게 될 것입니다. 그 이유는 인간이 사고하는 방식과 컴퓨터가 사고하는 방식이 매우 다르기 때문인데요.
 
#### 순차적으로 사고하는 컴퓨터

```uml
- File <> Memory <> CPU
```

#### 재료의 상태에 따라 게임의 법칙은 바뀌는 법이지

BMI 지수가 25보다 크면 과체중이고 그 밖에는 정상이라고 가정하면

```uml
start

partition Runtime {
    :calculate BMI;
    if (BMI > 25) then (True)
    :level = '과체중';
    else (False)
    :level = '정상';
    endif
    :print level ;
}

stop
```

#### Boolean Type

Boolean Type은 표현의 상태를 참(True) 또는 거짓(False)을 판별하는 의도를 가지고 있습니다.

```python
>>> 1 < 2 
True
>>> bmi = 23 
>>> bmi < 18.5
False
```

**Built-in Constants**

Python에는 아래와 같이 참(True) 또는 거짓(False)에 대한 Constants가 기본으로 내장(Built-in) 되어 있습니다. 이 두 Built-in Constants는 if statements와 같이 상태(Conditional)를 표현 할 때 사용됩니다.

```python
True False
```

**Python 인터프리터는 expression 대한 참(True) 또는 거짓(False)에 대한 상태를 아래와 같이 판단합니다**
```python
>>> bmi = 22
>>> bmi <= 23
True
>>> if bmi <= 23:
...     print('정상입니다') 
... else: 
...     print('과체중입니다') 
... 
정상입니다
```

#### Conditional Expression


**Conditional 표현을 위한 Keywords**

```python
if else elif
```

## The if statement

```python
if expression:
    ...
```

```python
if expression:
    ...
else
    ...
```

```python
bmi = 22

if bmi <= 18.5:
    level = '저체중'
elif 18.5 < bmi <= 23:
    level = '정상'
elif 23 < bmi <= 25:
    level = '과체중'
elif 25 < bmi < 30:
    level = '비만'
else:
    level = '고도비만'

print(level)
```

**결과**
```
정상
```