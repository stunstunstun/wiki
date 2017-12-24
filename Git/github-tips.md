---
title: 소소한 GitHub Tips
date: 2017-12-20 10:00:00
desc: GitHub 활용하기
image: https://assets-cdn.github.com/images/modules/open_graph/github-logo.png
categories: git
---

GitHub에서 다양한 인원이 프로젝트를 진행하면 이슈 트래킹이 중요합니다. 이슈가 등록될 때 프로젝트에서 참고하는 중요한 정보가 있다면 이슈나 PR을 생성할 때 아래와 같이 Templates를 지정하면 유용합니다.

##  Issue, PR 템플릿 활용하기

1. 프로젝트의 Root 디렉토리에 아래와 같이 `.github` 폴더를 생성합니다.

```bash
$ mkdir .github
$ cd .github 
$ touch ISSUE_TEMPLATE.md    # 이슈 등록시 템플릿 파일
$ touch PULL_REQUEST_TEMPLATE.md  # PR 등록시 템플릿 파일
```


2. 새로운 이슈를 등록합니다.

<img src='https://image.toast.com/aaaaahq/new_issues_button.png'  width='100'/>

3. 적용된 Template를 확인합니다.

<img width="768" alt="github-templates" src="https://image.toast.com/aaaaahq/0c099be0-d9ec-11e7-962d-df3b88f29401.png">

<br/>

## 키워드를 통해 이슈 닫기

Commit 메세지 뿐만 아니라 PR 등록시에도 아래의 키워드를 통해 PR이 Merge되면 이슈를 Closed 할 수 있습니다.
```
close
closes
closed
fix
fixes
fixed
resolve
resolves
resolved
```

<img width="711" alt="github-templates2" src="https://image.toast.com/aaaaahq/d70a1c7a-d9ec-11e7-8910-9686d333d378.png">

> 참고 - https://help.github.com/articles/closing-issues-using-keywords/

<br/>

## 의존 패키지 조회하기

프로젝트의 `Insight > Dependency graph` 메뉴에서 모든 의존 패키지를 쉽게 확인할 수 있습니다.

- https://github.com/request/request/network/dependencies

> 현재 이 기능은 GitHub Enterprise에서는 제공되지 않고 있습니다.
