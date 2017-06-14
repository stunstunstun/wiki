---
title: 자주 사용하는 Git 명령어들
date: 2016-11-14 15:14:40
desc: Git Commands
categories: git
---

## Git 시나리오

#### 소스코드의 Origin 저장소를 초기화하고 Remote와 처음으로 연결할 때

```bash
$ echo "# Hola" > README.md
$ git init
$ git add . && git commit -m "It's first commit"
$ git remote add origin https://github.com/stunstunstun/awesome-wiki.git
$ git push -u origin master
```

#### 새로운 Branch를 생성하고자 할 때

#### Remote 저장소를 변경해야 할 때

```bash
$ git remote -v
origin  https://wjdsupj@github.com/wjdsupj/awesome-wiki (fetch)
origin  https://wjdsupj@github.com/wjdsupj/awesome-wiki (push)
$ git remote set-url origin https://stunstunstun@github.com/stunstunstun/awesome-wiki
$ git remote -v
origin  https://stunstunstun@github.com/stunstunstun/awesome-wiki (fetch)
origin  https://stunstunstun@github.com/stunstunstun/awesome-wiki (push)
```

#### Conflict로 인해 이전 Commit을 취소해야 할 때

## 자주 사용하는 Git 명령어들

**Configurations**

```
git config --global --list
git config --global user.name {username} 
git config --global user.email {email}
git config --global color.ui “auto”
``` 

**Basic**

```
git --version
git init
git add .
git commit -m "commit message"
git status
git diff
git mv {filename} {new-filename}
git checkout -- {filename}
```

**Diff**

```
git diff 
git diff --name-only 
git diff {filename}
```

**Remote**

```
git clone {address}
git fetch
git pull
git push -u origin master
git remote -v
git remote add {name}
git remote show {name}
git remote rm {name}
```

**Branch & Tag**

```
git branch
git branch {branch-B} {branch-A}
git branch {new-branch}
git checkout -b {new-branch}
git branch -d {branch}
git branch -m {branch} {new-branch}
```
**Checkout & Reset**

Commands | Description
--|--
git checkout HEAD | 워킹트리의 모든 수정된 파일의 내용을 HEAD로 복구
git reset HEAD | 최종 commit을 취소
git revert HEAD | HEAD에서 변경한 내역을 취소하는 새로운 commit 발행. commit & push 해버린 경우 드물게 사용

