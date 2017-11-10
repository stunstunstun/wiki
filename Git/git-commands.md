---
title: Git Flow 와 자주 사용하는 명령어들
date: 2017-08-26 15:14:40
desc: Git 시작하기
categories: git
---

`Git Flow`는 git을 통해 효율적으로 프로젝트를 관리하기 위한 전략이다. 기본적으로 Git은 로컬 저장소와 원격 저장소간의 동기화를 위해 아래와 같은 과정을 거친다.

<!--more-->

<img src='https://about.gitlab.com/images/git_flow/four_stages.png' height='400' />

하지만 프로젝트의 규모가 커지고 협업하는 동료들이 많이지면 저장소의 master branch 만 이용하는 것이 아니라 이슈에 따라 다양한 branch를 통해 독립적으로 개발이 가능한 전략이 필요하다.

## Git Flow

<img src='https://about.gitlab.com/images/git_flow/gitdashflow.png' />

Git Flow는 다양한 branch를 관리하고 통합하기 위한 전략 중 하나이다. 최근에는 Git Flow의 단점을 해소하기 위해 Github Flow, Gitlab Flow 등 다양한 전략이 있지만 이 문서에서는 가장 기본이 되는 Git Flow를 설명하고 여기에 필요한 기본적인 Git 명령어에 대해 알아보도록 하겠다.

## 브랜치 전략

Git Flow의 주요 브랜치는 `master`와 `develop` 이며, 이 두 브랜치를 중심으로 feature, release와 필요에 따라 hotfixes 브랜치를 정의한다.

<img src='https://camo.githubusercontent.com/70f7e458a965f38831d1c50757b3a284c4280328/687474703a2f2f646f67666565742e6769746875622e696f2f61727469636c65732f323031312f612d7375636365737366756c2d6769742d6272616e6368696e672d6d6f64656c2f6d61696e2d6272616e636865732e706e67' />

#### master

master 브랜치에 merge된 내역은 새로운 버전이 갱신되었다는 것을 의미한다. 즉 master 브랜치에 변경 내역이 생기면 최종 버전인 Tag를 통해 Production에 배포된다. 

#### develop

hotfix를 제외한 모든 변경내역이 출발하는 지점이다. develop 브랜치의 코드가 안정화되고 배포할 준비가 되면 `master`를 통해 배포 버전의 태그를 단다.

#### feature

`feature` 브랜치는 배포하려고 하는 기능을 개발하는 브랜치다. 기능을 개발하기 시작할 때는 언제 배포할 수 있을지 알 수 없다. 기능을 다 완성할 때까지 유지하고 있다가 다 완성되면 `develop` 브랜치로 병합한다. 

- 브랜치가 생성되는 대상 : develop
- merge 대상: develop

<img src='https://camo.githubusercontent.com/c9cbf25c64dc0519860230cb98d098c3d069eda3/687474703a2f2f646f67666565742e6769746875622e696f2f61727469636c65732f323031312f612d7375636365737366756c2d6769742d6272616e6368696e672d6d6f64656c2f6d657267652d776974686f75742d66662e706e67' />

#### release

`release` 브랜치는 실제 배포할 상태가 된 경우에 생성하는 브랜치다.

- 브랜치가 생성되는 대상 : develop
- merge 대상: develop, master

#### hotfix

미리 계획되지 않은 브랜치다. 기본적인 동작방식은 `release`와 비슷하다. 배포 이후에 생긴 치명적인 버그는 즉시 해결해야하기 때문에 문제가 생기면 `master` 브랜치에 만들어둔 태그`tag`로 부터 긴급수정을 위한 브랜치를 생성한다.

- 브랜치가 생성되는 대상 : master
- merge 대상 : develop, master

<img src='https://camo.githubusercontent.com/aee561ae78af58c9756814432473c8dab15dada7/687474703a2f2f646f67666565742e6769746875622e696f2f61727469636c65732f323031312f612d7375636365737366756c2d6769742d6272616e6368696e672d6d6f64656c2f686f746669782d6272616e636865732e706e67' />

## 주요 Commands

#### 소스코드의 origin 저장소를 초기화하고 remote 서버와 처음으로 연결할 때

최초의 프로젝트(origin)는 로컬 저장소에서 시작될 것이다. 운영체제에 git을 설치하고 여러분의 프로젝트를 관리할 원격 저장소가 준비되었다고 가정했을때 아래와 같이 `git init` 명령을 통해 git 프로젝트로 초기화할 수 있다.

```bash
$ echo "# Hola" > README.md
$ git init
```

#### git add, commit

git add 명령어는 git flow의 첫 단계에 해당되며 인덱스에 새로운 파일이 생겼다는 것을 알리는 행위이다. 이 상태는 저장소에는 반영이 되지 않은 상태이며 git commit 명령을 통해 비로소 저장소에 변경내역이 반영된다.

```bash
$ git add build.gradle # 특정 파일에 대한 변경 내역을 알린다.
$ git add . # 모든 변경 내역을 알린다
```

```bash
$ git commit -m "이 버전의 변경 내역에 대한 설명"
```

git add, commit은 아래와 같이 동시에 실행할 수 있다.

```bash
$ git commit -am "이 버전의 변경 내역에 대한 설명"
```

#### git push

commit이 완료된 시점은 변경 내용이 로컬 저장소에 HEAD안에 머물고 있음을 의미한다. 우리는 변경 내역을 동료들도 확인할 수 있도록 remote 서버에 반영할 필요가 있다.

```bash
$ git push origin master
```

```bash
$ git push -u origin master
$ git push # -u 옵션을 이용하면 다음 push때 이전 히스토리를 기억하고 반영한다.
```

#### git pull

git add, commit, push 하는 일련의 과정은 내 컴퓨터에서 일어난 변경내역을 관리하고, remote 서버에 반영하는 행위라면 `git pull`은 remote 서버의 가장 최근의 변경 내역을 내 컴퓨터로 가져오는 행위이다.

```bash
$ git pull
```

```bash
$ git pull <remote> <branch>
```

#### 새로운 기능을 위해 branch를 생성하는 방법

git은 강력한 점은 효율적으로 분산된 환경은 제공한다는 것이다. 우리는 master branch가 아닌 더욱 안전하고 격리된 상태에서 새로운 기능을 추가할 수 있다. 새로운 branch를 이용해 개발을 진행하고 개발이 완료가 되면 나중에 master 로 돌아와 merge 하는 프로세스를 의미한다.

아래의 명령을 통해 `master branch`에서 `develop` 이라는 새로운 branch를 만들고 갈아탄다.

```bash
$ git checkout -b develop
```

develop이라는 특정 branch로 부터 새로운 branch를 만들고 싶다면,

```bash
$ git checkout -b develop origin/stage
```

아래와 같이 다시 master branch로 돌아올 수 있다.

```bash
$ git checkout master
$ git branch
* master
  stage
  develop
```

당신이 새롭게 만든 branch는 remote 서버에 전송하기 전까지는 동료들이 접근할 수가 없다. branch에 대한 검증이 완료되면 여러분은 Github에서 Pull Request를 전송할 수 있게된다.

```bash
$ git push -u origin develop
```

만약 branch를 여러명과 협업하고 있는 도중 push시에 remote 서버의 최신 내용을 로컬에 반영하지 않았다면 아래와 같이 remote 서버와 연결 후 `git pull`을 통해 merge 한다.

```bash
$ git branch --set-upstream-to=origin/develop develop
$ git pull
```

#### 원격 저장소의 기존 branch 확인 후 로컬에 가져오기

원격 저장소의 브랜치 리스트를 조회한다.

```bash
$ git branch -r
  origin/develop
  origin/master
  origin/stage
```

로컬, 원격 저장소의 브랜치 리스트를 모두 조회한다.

```bash
$ git branch -a
  master
  stage
* develop
  remotes/origin/develop
  remotes/origin/master
  remotes/origin/stage
```

원격 저장소의 `develop`이라는 branch를 로컬 저장소에 가져오고 싶다면

````bash
$ git checkout -t origin/1.0.0
Branch 1.0.0 set up to track remote branch 1.0.0 from origin.
Switched to a new branch '1.0.0'
$ git branch
* 1.0.0
  master
  stage
  develop
````

`fatal: Cannot update paths and switch to branch 'develop' at the same time.`이라는 에러가 발생한다면 아래와 같이 원격 저장소를 최신 상태를 로컬 저장소에 갱신한다.

```bash
$ git remote update
```

#### 원격 저장소 참고하기

어떤 경우에는 수정 내역을 원격 저장소에 push 하지는 않지만 해당 branch를 참고하기 위해 로컬에 받아서 테스트 해보고 싶은 경우도 있다.

```bash
$ git checkout <branch>
```

아무런 옵션없이 원격 저장소의 branch를 checkout 하면 ‘detached HEAD’ 상태로 소스를 보고 변경 해볼 수도 있지만 변경사항들은 commit, push 할 수 없으며 다른 branch로 checkout하면 사라진다.

#### 개발한 내역을 master branch에 merge하는 과정

변경 내역을 master에 merge하는 과정은 아주 중요한 과정이다. 먼저 아래와 같이 remote 서버의 최신 내역을 자신의 로컬 저장소에 갱신하는 습관을 들이는게 좋다. `git pull`을 통해 remote 서버의 변경 내용이 로컬 저장소에 fetch, merge 된다.

```bash
$ git pull
```

다른 branch에 있는 변경 내용을 현재의 branch(master)에 병합하려면 아래의 명령을 실행하자.

```bash
$ git checkout master
$ git merge some_function
```

첫번째 명령이든 두번째 명령이든, git은 자동으로 변경 내용을 merge하려고 한다. 문제는, 항상 성공하는 게 아니라 가끔 충돌(conflicts)이 일어나기도 한다는 점이다. 필요하다면 개발이 완료되어 merge된 branch는 아래와 같이 삭제한다.

```bash
$ git branch -D some_function
```

#### merge conflict가 발생한다면?

개발이 완료되면 branch를 merge하는 과정에서 충분히 conflic가 발생할 수 있다.

```bash
CONFLICT (content): Merge conflict in foo.java Automatic merge failed; fix conflicts and then commit the result.
```

```java
int a = 1;
<<<<<<< HEAD // conflict 가 발생한 범위의 시작
int b = 2;
=======
int b = 0;
>>>>>>> 55737474728739293729138123737392371293123737e // 모든 commit은 유일한 커밋 ID를 가진다
```

conflict 부분을 직접 수정해서 다시 commit하는 전략을 취한다.

```java
int a = 1;
int b = 2;
```

```
$ git commit -am 'Fixed conflicted issue'
```

> merge 전에 변경 내용을 확인하는 방법

```bash
$ git status -sb
```

```bash
$ git diff some_function master
```

Merge 중에 발생한 충돌을 해결하는 방법은 몇 가지가 있다. 첫 번째는 그저 이 상황을 벗어나는 것이다. 예상하고 있던 일도 아니고 지금 당장 처리할 일도 아니라면 git merge --abort 명령으로 간단히 Merge 하기 전으로 되돌린다.

```bash
$ git merge --abort
```

#### 로컬 변경 내용을 되돌리기

로컬에서 발생한 변경내역을 되돌리는 일은 빈번히 발생할 수 있다. `git status` 명령을 통해 현재 branch의 상태와 이후의 상태 변경을 위한 Commands를 확인할 수 도 있다.

```bash
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   Git/git-commands.md
```

위의 상태는 소스 코드를 변경하고 `git add`를 통해 인덱스에 변경 내역을 알리기전의 상태이다. 아래와 같이 변경 내역을 되돌릴 수 있다.

```bash
$ git checkout -- <file>
```

`git add` 이후에 변경 내역을 되돌리고자 한다면,

```bash
$ git reset HEAD <file>
```

이미 commit된 내역을 과거로 되돌리고 싶은 경우가 있을 것이다! 먼저 commit history를 살펴보자

```bash
$ git log --oneline
8ed5068 (HEAD -> unit-test, origin/unit-test) Update README.md
dfff29e (origin/master, master) Merge pull request #8 from stunstunstun/unit-test
eec3b7a Integration runner is completed
0a087cf #2 Specification list, create, get, update
a603da7 Inialize unit test environments
55c3e73 (origin/stage, stage) Update README.md
c354d50 Merge pull request #7 from stunstunstun/api-test
2e6b522 (origin/api-test) #3 Add eslint to devDendencies
5e35c21 #3 Add eslint to devDendencies
f9bbe2a #3 version fixed
```

`a603da7` 이후의 모든 내역을 삭제하고 돌아가고 싶다면 `--hard` 옵션과 함께 `reset` 명령을 이용하자

```bash
$ git reset --hard a603da7
```

특정 commit의 변경 내역을 취소하는 새로운 commit을 발행해야하는 경우도 있다. 이미 commit, push 한 경우 드물게 사용하는 것을 권장한다.

```bash
$ git revert <commit_id>
```

#### remote 서버를 변경해야 할 때

git 저장소의 주소가 변경되는 등의 이슈로 인해 remote 서버를 변경해야 한다면 아래의 명령을 참고한다.

```bash
$ git remote -v
origin  https://wjdsupj@github.com/wjdsupj/awesome-wiki (fetch)
origin  https://wjdsupj@github.com/wjdsupj/awesome-wiki (push)
$ git remote set-url origin https://stunstunstun@github.com/stunstunstun/awesome-wiki
$ git remote -v
origin  https://stunstunstun@github.com/stunstunstun/awesome-wiki (fetch)
origin  https://stunstunstun@github.com/stunstunstun/awesome-wiki (push)
```

#### 최종 버전 릴리즈하기

애플리케이션의 빌드 및 테스트가 완료되어 새 버전을 릴리즈한다면 읽기 전용 상태의 tag 버전를 생성하는 것이 좋다.

```bash
$ git tag 1.0.0
```

```bash
$ git log
```

생성한 tag 버전은 아래와 같이 remote 서버에 최종적으로 반영한다.

```bash
$ git push origin 0.1.0
```

지금까지 Git Flow를 통해 기본적인 명령들을 살펴보았다. Git에 대해 더 알고 싶다면 아래의 자료를 참고하면 많은 도움이 될 것이다!

- [Git Flight Rules](https://github.com/k88hudson/git-flight-rules)
- [An Introduction Git and GitHub](https://www.youtube.com/watch?v=MJUJ4wbFm_A)
- [Git Basic Tutorials](https://try.github.io)
- [Git Guides](http://guides.github.com)
- [Git Tips](https://github.com/mingrammer/git-tips)
- [Pro Git Book 2nd](https://git-scm.com/book/en/v2)