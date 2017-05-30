---
title: Github Page와 Hexo를 통해 30분만에 기술 블로그 만들기
date: 2017-04-16 15:14:40
categories: git
---

이 포스팅에서는 GitHub Page를 통해 손쉽게 개발 블로그를 Hosting 해보고 Command Line 명령을 통해 쉽게 블로그를 만들 수 있는 Hexo 프레임워크를 소개하고자 합니다.

<!--more-->

<img src='http://www.ybrikman.com/assets/img/blog/github-pages/github-pages.png' width='500' />

- GitHub Page - https://pages.github.com/
- Hexo - https://hexo.io/

지금 보고 계시는 블로그 역시 동일한 방법으로 30분 이내에 블로그를 개설 할 수 있었습니다. Git Page와 Hexo를 통해 개인의 기술 관련 문서를 손쉽게 관리하고 알릴 수 있기를 바랍니다.

## Git Page로 정적 페이지 Hosting하기

Git Page를 통해 손쉽게 USERNAME.github.io 도메인을 통해 정적 페이지를 호스팅(Hosting) 할 수가 있습니다.

#### Github Repository 생성하기

먼저 Github에 가입한 후에 아래와 같은 순서로 Repository를 생성합니다.

- New Repository, Repository 이름은 USERNAME.github.io
- USERNAME 은 Github의 가입시에 사용자의 username을 입력한다
- Public / Private 중 Public 선택
- Create Repository 버튼을 통해 Repository 생성

#### Clone the repository

Github Repository 생성 이후에는 아래의 Command Line을 순차적으로 실행한다. 먼저 생성한 Repository를 로컬에 복사한다

```bash
$ git clone https://github.com/username/username.github.io
```

> Terminal 환경이 익숙하지 않다면 아래의 링크에서 Windows, Mac 운영체제별 클라이언트 프로그램을 통한 Step을 소개하고 있다.
https://pages.github.com/

#### Hello World

root 디렉토리에 index.html 파일을 생성

```bash
$ cd username.github.io
$ echo "Hello World" > index.html
```

#### Push it

Remote 저장소에 변경내역을 Push 한다

```bash
$ git add --all
$ git commit -m "Initial commit"
$ git push -u origin master
```

#### It's done!

아주 손쉽게 여러분의 웹페이지를 하나 만들었다. 이제는 브라우저에서 정상적으로 https://USERNAME.github.io 에 접속되는지 확인 한다.

## Hexo

Hexo는 Jekyll와 함께 대표적으로 정적 페이지를 쉽게 만들 수 있도록 도와주는 서비스이다. 두 서비스 역시 블로그 지향적인 서비스이며 Hexo의 경우에는 npm을 통해 쉽게 설치가 가능하고 한 줄의 Command Line을 통해 Github에 바로 배포 할 수 있으며, Jekyll과 마찬가지로 다양한 플러그인과 테마를 지원하고 있다

<img src='http://www.devzhou.com/2016/06/04/my-first-blog/hexo-logo.png' width='600' />

> A fast, simple & powerful blog framework

#### 설치 전 준비

Hexo를 이용하기 위해서는 먼저 아래의 구성 요소들이 사전에 설치가 되어 있어야 한다. 이미 설치가 되어 있다면 생략해도 좋다.

- **[Node.js](https://nodejs.org/en/)**
- **[Git](https://git-scm.com/)**

#### Hexo CLI 설치 및 블로그 생성

```bash
$ npm install hexo-cli -g
$ hexo init blog
$ cd blog
$ npm install
```

#### 설정파일 업데이트

Command Line을 통해 Hexo를 설치하고 블로그 생성이 완료가 되면 root 디렉토리에 `_config.yml` 이라는 설정파일이 생성이 되는데 이 곳에 블로그에 대한 대부분의 설정을 할 수 있다. 이 중 중요한 설정 요소들을 소개하도록 하겠다. 나머지 설정 값에 대한 자세한 정보는 Hexo의 Document를 통해 확인이 가능하다.

- Documentation - https://hexo.io/docs/

#### Site 정보

블로그의 이름과 간략한 소개등을 수정 할 수 있다

```yml
title: 안녕 프로그래밍
subtitle: 모두가 프로그래밍에서 자유로워지는 그 날까지
description:
author: Minhyeok Jung
```

#### URL 정보

블로그 URL정보를 설정 할 수 있다

```yml
url: https://USERNAME.github.io
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:
```
> 만약 본인의 Custom Domain을 적용하고 싶다면 url값은 이후에 Custom Domain 설정시 CNAME 파일을 생성 할 때도 참조한다.

#### Github 정보

자신의 Git Page의 Repository 정보를 입력하면 이후에 손쉽게 배포가 가능하다.

```yml
# Deployment
deploy:
  type: git
  repo: https://stunstunstun@github.com/holaxapps/holaxapps.github.io
```

#### 로컬에서 테스트

기본적인 설정이 완료가 되면 아래의 Command Line을 통해 로컬에서 서버를 구동 할 수 있다.

```bash
$ hexo server
```

서버가 구동이 되면 아래의 주소를 통해 브라우저에서 블로그에 접속 할 수 있다.

- http://localhost:4000


## Github에 배포하기

로컬에서 정상적으로 블로그에 접속이 되었다면 이미 생성한 Github Page Repository에 손쉽게 배포가 가능하다.

**Hexo 설정을 통해 정적 리소스 생성하기**
```bash
$ hexo generate
```

**배포하기**
```bash
$ hexo deploy
```

**아래와 같이 Generate와 Deploy를 동시에 실행 할 수도 있다**
```bash
$ hexo deploy --generate
```

배포가 완료가 되면 브라우저에서 USERNAME.github.io로 접속해 정상적으로 배포가 되었는지 확인한다.

#### 주의사항

간혹 hexo의 deploy기능을 통해 정상적으로 배포가 되었음에도 불구하고 페이지가 업데이트 되지 않는 현상이 있는데, 이 경우에는 아래와 같이 페이지를 clean후에 배포를 하면 해결된다.

```bash
$ hexo clean
$ hexo deploy --generate
```

## 테마 적용하기

USERNAME.github.io를 통해 성공적으로 블로그 접속이 되었다면, 멋진 디자인을 적용한 테마(Theme)를 적용하고 싶을 것이다. Hexo에서는 아래의 페이지에서 다양한 Theme가 적용된 페이지를 소개하고 있다.

> https://hexo.io/themes/

대부분의 Theme 페이지에서는 Github 링크가 포함되어 있는데 Theme를 적용하기 위한 자세한 설명을 포함하고 있다. 안녕 프로그래밍은 자체 제작한 hexo-theme-chiangmai 라는 Theme를 사용하고 있다.

> https://github.com/stunstunstun/hexo-theme-chiangmai

Theme를 적용하기 위해서는 hexo-theme-chiangmai Github 페이지에서 자세한 내용을 확인 할 수 있다. 주의사항으로는 Theme를 적용하기 위해서는 아래와 같이 Repository 상태를 clean한 이후에 재배포 해야만 한다.

```
$ hexo clean
$ hexo deploy --generate
```

## 포스트 작성하기

멋진 디자인의 Theme까지 적용하였다면 이제는 앞으로 블로그의 주인공이 될 기술 문서를 작성 할 일만 남았다. 아래의 Command Line을 입력하면, root 디렉토리의 `source/_posts` 폴더에 Markdown 파일이 하나 생성되는데 Hexo에서는 `Markdown`문서를 통해 포스트를 작성해 나가면 된다.

#### 새 포스트 만들기

```bash
$ hexo new post [post_name]
```

**예제**

```bash
$ hexo new post github-page-and-hexo
```

**아래와 같은 경로에 Markdown 문서가 생성 된다**

```bash
ㄴ source
   ㄴ _posts
          - github-page-and-hexo.md
```

**github-page-and-hexo.md 에서 아래와 같이 포스트의 제목을 수정 할 수 있다**

```md
---
title: Github Page와 Hexo를 통해 30분만에 기술 블로그 만들기
date: 2017-04-16 22:37:53
---
```

#### Github Markdown Guide

Markdown 문서가 생소하다면 아래의 링크를 확인하자

> https://guides.github.com/features/mastering-markdown/

## 체크리스트

지금까지 GitHub Page와 Hexo를 통해서 블로그를 개설하는 과정을 살펴보았는데요, 이 과정에서 소소한 시행 착오를 겪었습니다. 만약 저와 같은 동일한 이슈가 재현이 됐을 때의 해결 방법을 안내하는 것을 마지막으로 이 글을 마치도록 할께요.

#### Theme를 변경하고 배포시에 적용이 되지 않는 이슈

이 경우에는 Hexo를 `clean` 하고 재배포를 합니다.

```bash
$ hexo clean
$ hexo deploy --generate
```

#### 배포시에 아래와 같은 에러메세지와 함께 배포가 되지 않는 이슈

```bash
ERROR Deployer not found: git
```

**`hexo-deployer-git` 플러그인 설치**

```bash
npm install hexo-deployer-git --save
```

**`_config.yml`에 플러그인 설정**

```yml
plugins:
- hexo-deployer-git
```
