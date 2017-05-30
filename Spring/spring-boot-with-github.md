---
title: Github를 통해 맘껏 뛰어놀기
date: 2016-09-12 15:14:40
desc: 예제 중심의 Spring Boot 시작하기
categories: spring-boot
---


## 생성한 프로젝트를 Github와 연동하자

<img src='http://image.toast.com/aaaaahq/git-repository.png' />

Github는 이미 전 세계의 많은 개발자와 기업에서 프로젝트 관리를 위해 사용하고 있는 서비스이다. 프로젝트의 소스코드를 호스팅하고 관리할 수 있게 해주며 Git을 통해 소스코드의 이력 즉 Version관리를 할 수 있도록 도와준다. 먼저 Github 가입을 위해 아래의 링크에 접속한다.

- https://github.com

첫 페이지에서 ID와 이메일주소, 패스워드를 입력하는 것만으로 가입이 완료가 되는데, 가입이 완료가 되었다면 첫 Repository를 생성해 보도록 하자. Repository는 public / private Repository로 나뉘는데 Github의 유료서비스를 이용하면 private Repository를 통해 비공개로 Repository를 관리할 수가 있다.

#### New Repository

![github-step-1](http://image.toast.com/aaaaahq/github-step-1.png)

#### Repository에 대한 정보를 입력

![github-step-2](http://image.toast.com/aaaaahq/github-step-2.png)

#### Repository가 생성되면 자신의 repository의 리스트를 아래와 같이 private/public 별로 확인이 가능하다

![github-step-3](http://image.toast.com/aaaaahq/github-step-3.png)

#### 원격저장소에 Push

이 문서에서는 Git에 대한 자세한 설명을 하지는 않습니다. 아래의 Command는 생성한 프로젝트를 Github에 처음으로 생성한 Repository에 Push하는 과정까지를 포함합니다.

Git Command | Description |
---|---
git init | 현재 디렉토리에서 Git Repository를 생성합니다.
git remote add {name} {repository-url} | 새로운 원격 Repository를 생성합니다. 
git add {file-name} | 스테이지영역에 올라가지 않은 파일들을 스테이지 영역으로 이동시킵니다.
git commit -m "{commit-message}" | 스테이지 영역에 올라가 있는 파일들은 commit 합니다. commit 메세지는 필수사항 입니다.
git push -u origin master | 변경내역을 origin 저장소의 master branch에 pushing 합니다.

- name : 원격 저장소의 Repository 이름 origin으로 명명하는 하는 것을 추천합니다.
- repository-url : Github에서 생성한 Git Repository의 주소
- file-name : 추가할 대상 파일
- repository-name : Github에 생성한 Public Repository 이름
- commit-message : branch에 commit시에는 항상 commit 메세지를 포함해야 합니다.


**Terminal**
```
$ git init
$ git remote add origin https://github.com/stunstunstun/awesome-spring-boot.git
$ git add .
$ git commit -m "Initialize project"
$ git push -u origin master
```

> 로컬 환경에서 git command를 사용하기 위해서는 운영체제에 git을 설치해야 합니다.
https://git-scm.com/

지금까지 개발자의 로컬 환경에 기본적인 개발 환경을 준비하고 생성한 프로젝트의 소스코드를 Github에 연동하는 과정을 살펴 보았다. 다음 편에서는 Spring Boot 애플리케이션을 위한 Gradle 프로젝트를 살펴 볼 예정이다.