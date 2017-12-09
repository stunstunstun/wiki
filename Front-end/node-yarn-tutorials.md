---
title: Yarn 제대로 이해하기
date: 2017-12-07 09:00
categories: nodejs
---

Yarn은 프로젝트의 의존성을 관리하는 JavaScript의 패키지 매니저입니다. Java의 Gradle, Python의 pip과 같이 말이죠. 물론 npm이 있지만 Yarn은 보다 더 빠르고 거기다 더욱 안전합니다. npm과 같이 JavaScript 패키지의 저장소를 제공할 뿐만 아니라 시스템에서 의존 패키지를 설치하거나 업데이트하는 등의 다양한 명령을 제공합니다.

Yarn은 npm과 마찬가지로 `package.json`을 통해 각각의 패키지를 구분하고 프로젝트에서 어떠한 일들을 해야할지 결정합니다.

## Ready

먼저 시스템에 Yarn을 설치합니다.

```bash
$ npm install -g yarn
```

```bash
$ yarn self-update
```

이 문서에서는 간단하게 `pet-kitten`이라는 이름의 프로젝트를 `yarn init` 명령을 통해 생성합니다.

```bash
$ mkdir pet-kitten
$ cd pet-kitten
$ yarn init
yarn init v1.3.2
question name (pet-kitten):
question version (1.0.0):
question description:
question entry point (index.js):
...
```

위와 같이 프로젝트에 필요한 기본적인 정보를 입력하면 `package.json` 파일이 생성됩니다.

## package.json

이 파일에는 최소한 패지키의 이름과 버전을 포함해야하며 프로젝트에 필요한 의존 프로젝트는 추가로 `dependencies`라는 키에 정의하게 됩니다.

```javascript
{
  "name": "pet-kitten",
  "version": "1.0.0",
  "main": "index.js",
  "author": "stunstunstun",
  "license": "MIT"
}
```

## dependencies 패키지의 버전의 범위

프로젝트에서 HTTP 요청을 위해 npm의 request 패키지를 사용한다면 아래와 같이 정의하면 됩니다.

- npm 패키지의 이름
- npm 패키지의 Version을 표기합니다.

```javascript
{
  "name": "pet-kitten",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "requests": "^2.0.0"
  },
  "author": "stunstunstun",
  "license": "MIT"
}
```

하지만 npm 패키지의 Version 표기 방식이 낮설어 보일수도 있는데, 프로젝트의 의존 패키지의 Version을 정의하기 위해 가장 많이 사용되는 방식은 틸드(~), 캐럿(^)입니다. 이 두 방식이 패키지 버전의 범위를 어떻게 표현하는지 이해할 필요가 있습니다.



#### 틸드(~)

틸드는 간단히 말하면 현재 지정한 버전의 마지막 자리의 범위에서만 자동으로 업데이트합니다.

예시 | 범위
--|--
~0.0.1 | `>=0.0.1 and <0.1.0`
~0.1.1 | `>=0.1.1 and <0.2.0`

#### 캐럿(^)

캐럿(^)은 Node.js 모듈이 이 [Semantic Versioning](http://semver.org/)의 규약을 따른다는 것을 신뢰한다는 가정하에서 동작하는데, Minor나 Patch버전은 하위 호환성이 보장되어야 하므로 최신 버전이 존재한다면 업그레이드 진행할 수 있습니다.

예시 | 범위
--|--
^1.0.2 | `>=1.0.2 and <2.0`
^1.0 | `>=1.0.0 and <2.0`
^1 | `>=1.0.0 and <2.0`

하지만 아직 npm 저장소의 생태계의 몇몇 패키지는 Minor, Patch 버전이 업데이트 되었을때 하위 호환성을 보장하지 않고 원하는 방식으로 동작하지 않는 경우가 있습니다. 이러한 이슈는 엔터프라이즈 환경에서는 치명적이기 때문에 Node 애플리케이션에서 의존 패키지를 효율적으로 관리하기 위해서는 Yarn이 어떻게 동작하는지 정확히 이해할 필요가 있습니다.

#### 하위 호환성이 보장되지 않는 사례

```bash
sdsd
```

## yarn.lock

Yarn은 위와 같이 `package.json`에 정의된 버전의 범위에 따라 패키지를 관리합니다. 이는 로컬 환경 마다 `yarn install`이 되는 시점에 따라 패키지의 버전이 다를 수도 있다는 것을 의미합니다.

Yarn은 다양한 시스템에서 일관적으로 동작하기 위해서 `yarn.lock` 파일을 프로젝트의 루트에 자동으로 생성합니다. 사용자는 이 파일을 직접 수정해서는 안되며 Yarn CLI을 통해 패키지를 관리하면 자동으로 업데이트됩니다.

애플리케이션을 안정적으로 운영하고자 한다면 이 파일을 Repository에 같이 저장하는 것을 추천합니다.

## Yarn commands

지금까지는 Yarn의 기본적인 개념을 알아봤다면 지금부터는 Yarn이 제공하는 명령을 CLI를 통해 프로젝트에 필요한 패키지를 관리할 필요가 있습니다.

#### yarn install

Install or update in the local `node_modules` but the yarn.lock file will not be `updated` as well.

```
$ yarn install
```

```
$ yarn
```

Yarn will not install any package listed in devDependencies if the NODE_ENV environment variable is set to production. Use this flag to instruct Yarn to ignore NODE_ENV and take its production-or-not status from this flag instead.

```
$ yarn install --production
```

```
$ yarn install NODE_ENV=production
```

Don’t generate a yarn.lock lockfile and fail if an update is needed.

```
$ yarn install --frozen-lockfile
```

#### yarn add

In general, a package is simply a folder with code and a package.json file that describes the contents. When you want to use another package, you first need to add it to your dependencies. This means running `yarn add [package-name]` to install it into your project.

This will also update your `package.json` and your `yarn.lock` so that other developers working on the project will get the same dependencies as you when they run yarn or yarn install.

```bash
$ yarn global add eslint
```

```bash
$ yarn add eslint-html-reporter
```

```bash
$ yarn add eslint-html-reporter@^0.5.2
```

```bash
$ yarn add eslint-html-reporter@^0.5.2 --dev
```

#### yarn upgrade

This command updates dependencies to their latest version based on the version range specified in the package.json file. The yarn.lock file will be `recreated` as well.

```
$ yarn upgrade
```

recommend like this!

```
$ yarn upgrade mocha@^3.5.0
```



#### yarn remove

Running `yarn remove foo` will remove the package named foo from your direct dependencies updating your package.json and yarn.lock files in the process.

Other developers working on the project can run yarn install to sync their own node_modules directories with the updated set of dependencies.

When you remove a package, it is removed from all types of dependencies: dependencies, devDependencies, etc.

```
$ yarn remove foo
```

> yarn remove will always update your package.json and yarn.lock. This ensures that different developers on the same project get the same set of dependencies. It is not possible to disable this behavior.

#### npm outdated

```bash
$ npm outdated
Package                Current         Wanted  Latest  Location
chai                     3.5.0          3.5.0   4.1.2  blahblah.sh
debug                    2.6.9          2.6.9   3.1.0  blahblah.sh
eslint                  4.10.0         4.11.0  4.11.0  blahblah.sh
gulp-babel               6.1.2          6.1.2   7.0.0  blahblah.sh
gulp-sourcemaps         1.12.0         1.12.0   2.6.1  blahblah.sh
istanbul         1.1.0-alpha.1  1.1.0-alpha.1   0.4.5  blahblah.sh
mocha                    3.5.3          3.5.3   4.0.1  blahblah.sh
mongoose                4.13.0         4.13.0  4.13.1  blahblah.sh
supertest                2.0.1          2.0.1   3.0.0  blahblah.sh
```

위처럼 업데이트가 필요한 모듈만 정리되어 나온다. "Current"는 현재 설치된 버전이고 "Wanted"는 package.json에 지정한 버전 범위로 설치되는 최대 범위를 의미한다. 즉, npm update를 실행하면 설치되는 버전이다. "Latest"는 모듈의 최신 버전이다. 위 화면에서는 "Wanted"와 "Latest"가 같은 모듈이 빨간색으로 표시되었고 "Latest"가 "Wanted"보다 높은 모듈은 구별할 수 있게 노란색으로 표시되었다.

여기서 확인을 한 뒤에 일일이 원하는 모듈을 업데이트해도 되지만 꽤 귀찮은 일이다

#### npm-check

```
$ npm install -g npm-check
```

```
$ npm-check -u
```

#### yarn check

Verifies that versions of the package dependencies in the current project’s package.json matches that of yarn’s lock file.

```
$ yarn check
```

## 정리 그리고 이렇게 제안합니다.

- `yarn.lock`은 절대 직접 수정하지 않는다.
- `package.json`을 직접 수정하는 대신 yarn CLI를 통해 추가, 삭제, 업데이트하는 것을 추천합니다.
- `yarn upgrade` 명령은 프로젝트의 호환성 이슈에 대참사를 불러올 수 있기 때문에 사용을 지양합니다.

## References

- https://docs.npmjs.com/files/package.json
- https://yarnpkg.com/en/docs/configuration
- https://yarnpkg.com/en/docs/cli/install
- https://yarnpkg.com/en/docs/cli/add
- https://yarnpkg.com/lang/en/docs/cli/upgrade/
- https://yarnpkg.com/en/docs/cli/check
- https://www.vobour.com/book/view/Y5vcMHJGHyN5ayheM