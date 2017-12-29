---
title: GitHub Pull Request 생성시 Jenkins에서 지속적으로 빌드하기
desc: GitHub 활용하기
date: 2018-02-20 13:37:31
categories: devops
---

QA(Quality Assurance)를 위한 CI서버. QA는 아래와 같은 내용을 포함합니다.

- 빌드
- 테스트
- ESLint 리포트 생성
- 테스트 커버리지 리포트 생성

## Jenkins Farm

- Install
- Jenkins 터미널 접근
- Trouble Shooting

## GitHub Flow

애플리케이션의 빌드, 배포 프로세스에 아래와 같은 변경 내역이 있습니다.

#### As-is

- New Branches > Developments > PRs > `Reviews` > Merge to master

#### To-be

`Pull Request`시 추가된 Revision을 자동으로 빌드, 테스트 후에 결과를 PR Issues에 코멘트합니다. RP된 Revision의 빌드, 테스트 케이스의 결과를 알 수 있습니다.

- New Branches > Developments > PRs > `Test, Build in CI` > `Reviews` > Merge to master

## Jenkins Plugins

- NodeJS Plugin
- MongoDB Plugin
- GitHub Pull Request Builder
- Coverage status for GitHub Pull Requests
- GitHub Pull Requests
- Environment Injector Plugin
- Corbertura Plugin
- HTML Publisher Plugin

## Trouble Shooting

`yarn install`,  MongoDB 정상적으로 동작하지 않는다면 root 권한으로 `make` 설치

```
$ yum install make
$ yum install gcc gcc-c++ kernel-devel
```

## References

- https://jenkins.lisk.io/job/lisk-core/
- https://go.cloudbees.com/docs/cloudbees-documentation/cje-user-guide/index.html#github-branch-source
