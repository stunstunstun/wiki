---
title: Gradle은 정말 Maven보다 100배나 빠를까?
date: 2017-07-04 13:37:31
image: http://image.toast.com/aaaaahq/gradle4-1.png
categories: devops
---

Gradle은 2017년 4월에 3.5 버전을 릴리즈하면서 `Build Cache`의 특징을 소개하면서 Gradle의 빌드 속도가 드라마틱하게(?) 향상되었다고 발표하였다. Build Cache는 Gradle 3.5에 베타 테스트를 위해 포함된 기능으로 Gradle Tasks의 결과를 로컬에서 재사용하는 것뿐만 아니라 빌드 머신사이에도 Remote로 Tasks의 결과의 캐시가 공유되 빌드 타임을 줄여준다고 한다.

Gradle에서는 다음 버전에서 Build Cache를 정식으로 릴리즈하기 위해 아래와 같이 사용자들의 피드백을 요구했는데 내용은 아래와 같다.

`1) 프로젝트에서 아래의 옵션을 통해 두 번째 빌드 타임 좀 확인해볼래?`

```
$ gradle --build-cache clean assemble
$ gradle --build-cache clean assemble
```

`2) Remote Cache도 함 사용해봐!`

Remote로 캐시를 공유할려면 backend가 필요한데 [예제](https://github.com/gradle/task-output-cache-demos/tree/master/samples/03-use-http-backend)를 줄테니 참고하렴. 그런데 [Gradle Enterprise](https://gradle.com/enterprise)에서는 이미 제공하고 있음
 

`3) 피드백을 줘!`

아무튼 직접 사용해보고 피드백을 주면 너의 프로젝트의 빌드 타임을 줄이는데 많은 도움이 될거임(..) 

## Gradle v4.0 Release

Gradle Enterprise 그리고 Gradle의 빌드 속도에 불만이 있던 사용자들이 피드백을 잘 줬는지 이전 버전이 발표된지 두 달만에 v4.0이 릴리즈 되었다. Gradle v4.0의 다양한 Feature들은 아래의 링크를 통해 확인할 수 있으며 이 글에서는 Build Cache를 통한 빌드 성능의 향상에 대해 살펴보도록 하겠다.

```
- Dependencies를 병렬처리로 다운로드가 가능하다.
- Build Cache가 Production에 적용가능한 수준으로 향상되었다.
...
```
> https://docs.gradle.org/4.0/release-notes.html#new-and-noteworthy

#### Gradle은 Maven보다 100배이상 빠르다?

Gradle에서는 아래와 같은 일반적인 시나리오에서 빌드 성능에 대한 테스트 결과를 공개하였다. 테스트에 사용된 하드웨어는 `Dell XPS 15, I7-4712HQ CPU @ 2.30GHz, 16GB of RAM, SSD, Linux Min 18.1` 이다.

> https://gradle.org/gradle-vs-maven-performance/

#### Scenario: Java Library

Apache Commons Lang 3를 Maven에서 Gradle로 변경하여 테스트한 결과이다. 테스트를 실행한 결과는 Gradle이 약 1.7배 정도 빠르며 Build Cache로 인한 빌드는 약 72배이상 빠르다.

<img src='http://image.toast.com/aaaaahq/gradle4-1.png' />

#### Scenario: Small multi-project build

50개의 소스 파일과 50개의 테스트를 가지고 있는 모듈 10개로 구성된 프로젝트를 테스트한 결과이다.

<img src='http://image.toast.com/aaaaahq/gradle4-2.png' />

<img src='https://gradle.org/images/performance/maven-vs-gradle.gif' />

#### Scenario: Medium multi-project build

100개의 소스 파일과 100개의 테스트를 가지고 있는 모듈 100개로 구성된 프로젝트를 테스트한 결과이다.

<img src='http://image.toast.com/aaaaahq/gradle4-3.png' />

#### Scenario: Large multi-project build

100개의 소스 파일과 100개의 테스트를 가지고 있는 모듈 500개로 구성된 프로젝트를 테스트한 결과이다.

<img src='http://image.toast.com/aaaaahq/gradle4-4.png' />

#### Scenario: Large monolithic application

마지막으로 흔치는 않지만 모든 소스 코드가 하나의 모듈에 구성된 프로젝트의 테스트 결과이다.

<img src='http://image.toast.com/aaaaahq/gradle4-5.png' />

#### 결과를 요약하면 아래와 같다.

- 모든 결과를 비추어 볼때 Gradle은 모든 시나리오에서 적어도 2배 이상 빠르다.
- 변경 사항을 반영한 빌드에서는 Gradle이 Maven에 비해 10~100배 빠르며, 하위 프로젝트가 많을수록 더욱 유리하다.

## Your Turn

사실 이전의 Gradle의 빌드 타임은 체감상으로도 Maven 비해 느리게 느껴졌다. 위의 그래프에서 Gradle의 이전 버전이 포함되지 않은 점이 이를 증명해준다. v4.0에서 Maven보다 100배이상 빠르다는 표현은 과장되어 보이지만 Build Cache의 안정화로 인해 Gradle의 빌드 타임이 대폭 향상된 것은 사실이다. 구구절절 설명이 길었지만 Gradle을 v4.0으로 업그레이드하고 직접 빌드와 테스트를 실행하는 것을 추천한다.

#### Gradle Wrapper를 통해 업그레이드

```bash
$ ./gradlew wrapper --gradle-version=4.0 --distribution-type=bin
```

#### Homebrew로 업그레이드

```bash
$ brew upgrade gradle
==> Upgrading 1 outdated package, with result:
gradle 4.0
==> Upgrading gradle
==> Using the sandbox
==> Downloading https://services.gradle.org/distributions/gradle-4.0-all.zip
==> Downloading from https://downloads.gradle.org/distributions/gradle-4.0-all.zip
######################################################################## 100.0%
🍺  /usr/local/Cellar/gradle/4.0: 169 files, 71.8MB, built in 48 seconds
```

#### 업데이트된 버전을 확인해보자

```bash
$ gradle --version

------------------------------------------------------------
Gradle 4.0
------------------------------------------------------------
...
```

#### 설치하기

아직 Gradle을 설치하지 않았다면 Homebrew를 통해 설치하거나 수동으로 직접 [Download](https://gradle.org/releases/) 하여 설치할 수도 있다.

```bash
$ brew update && brew install gradle
```

#### References

> https://gradle.org/gradle-vs-maven-performance/
https://blog.gradle.org/introducing-gradle-build-cache
https://gradle.org/install/
