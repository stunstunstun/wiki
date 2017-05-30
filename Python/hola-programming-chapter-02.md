---
title: 안녕 Python!
date: 2017-03-05 18:01:48
desc: 첫 프로그래밍 언어 선택하기
image: https://carpedm20.github.io/140min-python/img/python.png
categories: 기초강의
---

<img src="http://www.industryconnect.co.nz/wp-content/uploads/2015/09/prog-languages.png" width="500">

> 셀 수 없는 프로그래밍 언어들

Python? 왓더.. 새로 나온 파이인가? 죄송합니다(..) 이제부터 쫌 긴장 좀 하셔야 되요. 온갖 처음 듣던 영단어들이 난무하게 됩니다. Python은 말이죠, 다양한 프로그래밍 언어 중 하나예요.

## 왜 Python이지?

언어란 참으로 대단해요. 인간의 언어 역시 지역과 문화에 따라 너무나도 다양한 언어가 탄생해 왔고 발전해 왔죠. 프로그래밍 언어도 마찬가지인데요, 사용 목적과 운영체제, 플랫폼이라는 공간에 따라 다양한 언어가 생기고 발전해 왔어요. 하나의 언어를 배우면 다른 언어를 비교적 배우기 쉬운 것도 인간의 언어와 비슷해요.

<img src='http://carpedm20.github.io/140min-python/img/python.png' width='500' />

모든 언어는 지금까지도 새로운 단어가 만들어지고 점점 발전해 가고 있습니다. Python같은 현대의 프로그래밍 언어는 이전의 언어에 비해 배우기 쉽고 실용적이며 보다 더 유용합니다. 저는 사실 Python이라는 언어를 이제 막 공부하기 시작 했는데요, 저에게 익숙한 프로그래밍 언어를 제쳐두고 프로그래밍의 기초를 소개하기 위해 Python을 선택한 이유는 여러가지가 있지만, 가장 중요한 이유는 프로그래밍을 이제 막 시작 하시는 분들에게 가장 적합하다고 생각했기 때문입니다.

저는 주로 C++, Java 라는 언어를 통해 프로그래밍을 해왔어요. 하지만 C++, Java는 프로그래밍을 시작하시는 분들에게는 적합한 언어가 아닙니다. 높은 진입장벽에 흥미를 느끼시기도 전에 포기하게 되어버리죠. 특히 C, C++는 14년전에 처음 접했는데 아직도 징글징글한 녀석들 입니다. 에휴(..)

> 하지만 Python은 프로그래밍을 처음 시작하시는 분들도 배우기 쉬운 프로그래밍 언어 입니다

이외에도 Python은 프로그래밍 언어로서 많은 장점을 가지고 있어요. 최근에는 Python을 통해 웹 개발, 그래픽, 머신런닝 등 다양한 분야에 사용되고 있으며 무엇보다도 Python은 다양한 프로그래밍 언어 중 인간의 언어와 가장 가까운 프로그래밍 언어라고 생각해요.

> 이것이 Python을 통해 여러분이 프로그래밍 언어를 처음 접했으면 하는 가장 큰 이유입니다.

<img src='https://tctechcrunch2011.files.wordpress.com/2012/12/dropbox-rossum.png?w=200' width='200' />

> Python의 창시자 Guido Van Rossum

Python은 대부분의 프로그래밍 언어가 그렇듯이 컴퓨터가 아닌 사람에 의해서 만들어졌습니다. 알려진 것에 비해서는(?) 꽤나 역사가 오래된 언어이죠. Guido Van Rossum에 의해 발표된 Python은 대중적으로 많이 사용되는 프로그래밍 언어 중 하나인 Java보다도 빠른 1991년에 세상에 나타났습니다.

현재 2017.03 기준으로 Python 3.6.0 이 최신의 Python Version이며 우리는 이 Python3를 통해 앞으로 실습을 이어 나아가게 됩니다. 자 그럼! Python의 특징은 진행하면서 차차 소개하기로 할께요 (지금 당장은 이론이나 언어의 특징이 중하지 않기 때문이에요.)

> Python 뒷담화는 여기까지 하고 직접 Python을 통해 컴퓨터와 대화해 볼까요?

## [영상] Python과 대화하기

아직 Python을 설치도 하지 않았는데 너무 성급한것 아닌가요? 라고 하시는 분들이 있으시겠지만 앞으로 무엇을 하게 될지 직접 시각적으로 보는 것이 가장 좋겠지요.

{% youtube 5FSqA-wnb0M %}

Python이라는 프로그래밍 언어를 통해서 우리는 어떻게 컴퓨터와 대화하는지에 대해 살펴봤어요. 지금 당장 따라해보실 필요는 없어요. 다음 강의에서 여러분의 PC의 운영체제에 직접 Python을 설치 해보도록 하겠습니다.

> 영상에서 사용된 소스코드는 아래의 Github 페이지에서 보실 수 있습니다.
https://github.com/stunstunstun/holaxprogramming/blob/master/sources/choice_language.py
https://github.com/stunstunstun/holaxprogramming/blob/master/sources/languages.txt

#### 참고

> Python 공식 페이지 - https://www.python.org/
Python Interpreter - https://docs.python.org/3/tutorial/interpreter.html#

#### 이 주제에 연관된 추천 자료와 서적

> Machine Code - https://en.wikipedia.org/wiki/Machine_code
하버드 컴퓨터 과학 기초 강의 - https://courses.edx.org/courses/course-v1:HarvardX+CS50+X/info
Code - https://www.amazon.com/Code-Language-Computer-Hardware-Software/dp/0735611319
Inside Machine - https://www.nostarch.com/insidemachine.htm

<br>

**[글/그림 정민혁]**
Joycity, NHN Entertainment에서 모바일게임 및 결제 관련 플랫폼을 개발해 왔습니다. 현재는 퇴사 후 1년간의 세계일주 후에 태국의 치앙마이에서 원하는 방식으로 살아보려고 아둥 바둥 발버둥 중입니다.

지금 보시는 안녕 프로그래밍의 강의들은 브런치, 생활코딩, Youtube에도 함께 업데이트 되고 있습니다
> 브런치 매거진 - https://brunch.co.kr/magazine/holaprogramming
생활코딩 - https://opentutorials.org/course/2700
Youtube - https://www.youtube.com/channel/UCdeU7rAkbmqjn_kZUn7fStQ
