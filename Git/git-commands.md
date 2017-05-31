---
title: 자주 사용하는 Git 명령어들
date: 2016-11-14 15:14:40
desc: Git Commands
categories: git
---


## Git Commands

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

