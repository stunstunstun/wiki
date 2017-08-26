---
title: 자주 사용하는 Git 명령어들
date: 2016-11-14 15:14:40
desc: Git Commands
categories: git
---

## git flow

#### 소스코드의 origin 저장소를 초기화하고 remote 서버와 처음으로 연결할 때

```bash
$ echo "# Hola" > README.md
$ git init
$ git add . 
$ git commit -m "It's first commit"
$ git remote add origin https://github.com/stunstunstun/awesome-wiki.git
$ git push -u origin master
```

<br>

#### git add, commit

git add 명령어는 git flow의 첫 단계에 해당되며 인덱스에 새로운 파일이 생겼다는 것을 알리는 행위이다. 이 상태는 저장소에는 반영이 되지 않은 상태이며 git commit 명령을 통해 비로소 저장소에 변경내역이 반영된다.

```
$ git add build.gradle # 특정 파일에 대한 변경 내역을 알린다.
$ git add . # 모든 변경 내역을 알린다
```

```
$ git commit -m "이 버전의 변경 내역에 대한 설명"
```

git add, commit은 아래와 같이 동시에 실행할 수 있다.

```
$ git commit -am "이 버전의 변경 내역에 대한 설명"
```

<br>

#### git push

commit이 완료된 시점은 변경 내용이 로컬 저장소에 HEAD안에 머물고 있음을 의미한다. 우리는 변경 내역을 동료들도 확인할 수 있도록 remote 서버에 반영할 필요가 있다.

```bash
$ git push origin master
```

```bash
$ git push -u origin master
$ git push # -u 옵션을 이용하면 다음 push때 이전 히스토리를 기억하고 반영한다.
```

<br>

#### git pull

git add, commit, push 하는 일련의 과정은 내 컴퓨터에서 일어난 변경내역을 관리하고, remote 서버에 반영하는 행위라면 `git pull`은 remote 서버의 가장 최근의 변경 내역을 내 컴퓨터로 가져오는 행위이다.

```bash
$ git pull
```

<br>

#### 새로운 기능을 위해 branch를 생성하는 방법

git은 강력한 점은 효율적으로 분산된 환경은 제공한다는 것이다. 우리는 master branch가 아닌 더욱 안전하고 격리된 상태에서 새로운 기능을 추가할 수 있다. 새로운 branch를 이용해 개발을 진행하고 개발이 완료가 되면 나중에 master 로 돌아와 merge 하는 프로세스를 의미한다.

아래의 명령을 통해 `develop` 이라는 새로운 branch를 만들고 갈아탄다.

```
$ git checkout -b some_function
```

아래와 같이 다시 master branch로 돌아올 수 있다.

```
$ git checkout master
```

당신이 새롭게 만든 branch는 remote 서버에 전송하기 전까지는 동료들이 접근할 수가 없다. branch에 대한 검증이 완료되면 여러분은 Github에서 PR(Pull Request)를 전송할 수 있게된다.

```
$ git push origin some_function
```

만약 branch를 여러명과 협업하고 있는 도중 push시에 remote 서버의 최신 내용을 로컬에 반영하지 않았다면 아래와 같이 remote 서버와 연결후 git pull을 통해 merge 한다.

```
$ git branch --set-upstream-to=origin/some_function some_function
```

<br>

#### 개발한 내역을 master branch에 merge하는 과정

변경 내역을 master에 merge하는 과정은 아주 중요한 과정이다. 먼저 아래와 같이 remote 서버의 최신 내역을 자신의 로컬 저장소에 갱신하는 습관을 들이는게 좋다. `git pull`을 통해 remote 서버의 변경 내용이 로컬 저장소에 fetch, merge 된다.

```
$ git pull
```

다른 branch에 있는 변경 내용을 현재의 branch(master)에 병합하려면 아래의 명령을 실행하자.

```
$ git checkout master
$ git merge some_function
```

첫번째 명령이든 두번째 명령이든, git은 자동으로 변경 내용을 merge하려고 한다. 문제는, 항상 성공하는 게 아니라 가끔 충돌(conflicts)이 일어나기도 한다는 점이다. 필요하다면 개발이 완료되어 merge된 branch는 아래와 같이 삭제한다.

```
$ git branch -D some_function
```

<br>

#### merge conflict가 발생한다면?

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

```
$ git diff some_function master
```

<br>

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

<br>

#### 최종 버전 릴리즈하기

애플리케이션의 빌드 및 테스트가 완료되어 새 버전을 릴리즈한다면 읽기 전용 상태의 tag 버전를 생성하는 것이 좋다.

```
git tag 1.0.0 1b2e1d63ff
```
위의 명령에서 1b2e1d63ff 부분은 꼬리표가 가리킬 확정본 식별자이다. 아래 명령으로 확정본 식별자를 얻을 수 있다.

```
git log
```

<br>

#### 로컬 변경 내용을 되돌리기

Commands | Description
--|--
git checkout HEAD | 워킹 트리의 모든 수정된 파일의 내용을 HEAD로 복구
git reset HEAD | 최종 commit을 취소
git revert HEAD | HEAD에서 변경한 내역을 취소하는 새로운 commit 발행. 이미 commit, push 한 경우 드물게 사용

<br>

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

**Reset**

```
$ git checkout -- {file_name}
$ git reset HEAD
$ git fetch origin
$ git reset --hard origin/{branch_name}
```

## References

- https://rogerdudler.github.io/git-guide/index.ko.html