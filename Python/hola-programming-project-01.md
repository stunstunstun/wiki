---
title: 작은 프로젝트 시작하기
date: 2017-05-01 00:24:49
categories: Python 활용하기
---

## 컴퓨터의 특성

## 반복하기

## 프로젝트

## 프로젝트의 구성 요소

- 2인 이상의 멤버가 효율적으로 협업하며 개발 할 수 있어야 한다
- 소스코드의 Version 관리를 효율적으로 할 수 있어야 한다
- 외부의 오픈소스나 라이브러리를 효율적으로 이용 할 수 있어야 한다
- 개발 과정에서 소프트웨어의 테스트 및 평가가 이루어져야 하며 자동화된 빌드 및 배포가 이루어져야 한다

> 소프트웨어의 개발, 테스트, 빌드, 배포까지 일련의 과정을 효율적으로 관리 할 수 있어야 한다. 

> 그림 - 소프트웨어의 개발 과정

---

## Git

#### 소스코드

**프로그래밍** 역시 컴퓨터가 이해 할 수 있도록 기록되어야 합니다. 이렇게 컴퓨터에게 명령하기 위해 기록된 결과물을 소스코드라고 해요. 우리는 이 소중한 소스코드를 효율적으로 보관하고 공유하고 업데이트 할 수 있어야 해요. 이런 행위들을 조금 있어보이게 **소스코드의 Version 관리** 라고 해볼께요.


#### 소스코드의 Version 관리가 왜 필요한가요?

기획서-2017-01-01.txt
기획서-2017-01-03.txt


#### Git

어떻게 할까요? Git 이라는 녀석은 이런 고민을 해결하기 위해 만들어 졌어요


#### Github


#### Github 가입후에 Public Repository 생성하기

Github는 이미 전 세계의 많은 개발자와 기업에서 프로젝트 관리를 위해 사용하고 있는 서비스이다. 프로젝트의 소스코드를 호스팅하고 관리할 수 있게 해주며 Git을 통해 소스코드의 이력 즉 Version관리를 할 수 있도록 도와준다. 먼저 Github 가입을 위해 아래의 링크에 접속한다.

- https://github.com

첫 페이지에서 ID와 이메일주소, 패스워드를 입력하는 것만으로 가입이 완료가 되는데, 가입이 완료가 되었다면 첫 Repository를 생성해 보도록 하자. Repository는 public / private Repository로 나뉘는데 Github의 유료서비스를 이용하면 private Repository를 통해 비공개로 Repository를 관리할 수가 있다.

<br>

**New Repository를 선택**

![github-step-1](http://image.toast.com/aaaaahq/github-step-1.png)

<br>

**Repository에 대한 정보를 입력**

![github-step-2](http://image.toast.com/aaaaahq/github-step-2.png)

<br>

**Repository가 생성되면 자신의 repository의 리스트를 아래와 같이 private/public 별로 확인이 가능하다.**

![github-step-3](http://image.toast.com/aaaaahq/github-step-3.png)

<br>

#### 원격저장소에 Push

이 문서에서는 Git에 대한 자세한 설명을 하지는 않습니다. 아래의 Command는 생성한 프로젝트를 Github에 처음으로 생성한 Repository에 Push하는 과정까지를 포함합니다.

Git Command | Description |
---|---
git init | 현재 디렉토리에서 Git Repository를 생성합니다.
git remote add {name} {repository-url} | 새로운 원격 Repository를 생성합니다. 
git add {file-name} | 스테이지영역에 올라가지 않은 파일들을 스테이지 영역으로 이동시킵니다.
git commit -m "{commit-message}" | 스테이지영역에 올라가 있는 파일들은 commit 합니다. commit 메세지는 필수사항 입니다.
git push {name} master | 변경내역을 origin 저장소의 master branch에 pushing 합니다.

**Terminal**
```
$ git init
$ git remote add {name} https://github.com/{user-name}/{repository-name}.git
$ git add .
$ git commit -m "{commit-message}"
$ git push origin master
```
- name : 원격 저장소의 Repository 이름 origin 으로 명명하는 하는 것을 추천합니다.
- repository-url : Github에서 생성한 Git Repository의 주소
- file-name : 추가할 대상 파일
- user-name : Github에 가입한 계정 이름
- repository-name : Github에 생성한 Public Repository 이름
- commit-message : branch에 commit시에는 항상 commit 메세지를 포함해야 합니다.

<br>


## Git Tutorials
- https://try.github.com


## 참고

- Cloud 9 IDE - https://c9.io/
- 안녕 프로그래밍 Slack 참여 - https://goo.gl/forms/iMRhFwgsMklL2d1i2

---

**지금 보시는 안녕 프로그래밍의 전체 강의노트와 영상은 Facebook, 브런치, 생활코딩, Youtube에 매주 수요일에 업데이트됩니다.**

Facebook 페이지 - https://www.facebook.com/holaxprogramming
브런치 매거진 - https://brunch.co.kr/magazine/holaprogramming
생활코딩 코스 - https://opentutorials.org/course/2700
Youtube 영상 - https://www.youtube.com/channel/UCdeU7rAkbmqjn_kZUn7fStQ
Github - https://github.com/wjdsupj/holaxprogramming

**[글/그림 정민혁]**
Joycity, NHN Entertainment에서 모바일 게임 및 결제 관련 플랫폼을 개발해 왔습니다. 현재는 퇴사 후 1년간의 세계일주 후에 태국의 치앙마이에서 원하는 방식으로 살아보려고 아등바등 발버둥 중입니다.