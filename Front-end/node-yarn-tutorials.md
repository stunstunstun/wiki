---
title: Yarn 톺아보기
date: 2017-12-21 09:00
image: https://designmodo.com/wp-content/uploads/2016/10/Yarn-1.jpg
categories: nodejs
---

<img src='https://designmodo.com/wp-content/uploads/2016/10/Yarn-1.jpg' width='400' />

> 톺아보다 [동사] 샅샅이 톺아 나가면서 살피다.

Yarn은 프로젝트의 의존성을 관리하는 JavaScript의 패키지 매니저입니다. Java의 gradle이나 Python의 pip과 같이 말이죠. 물론 우리에겐 npm이 있지만 Yarn은 보다 더 빠르고 거기다 더욱 안전합니다. npm과 같이 JavaScript 패키지의 저장소를 제공할 뿐만 아니라 시스템에서 의존 패키지를 설치하거나 업데이트하는 등의 다양한 명령을 제공합니다.

Yarn은 npm과 마찬가지로 `package.json`을 통해 의존 패키지를 구분하고 프로젝트에서 어떠한 일들을 해야할지 결정합니다.

## Facebook은 Yarn을 왜 만들었을까?

Facebook은 점차 거대해지는 프로젝트에서 npm을 사용하면서 일관적, 보안, 특히 성능에 대한 문제를 겪에 되었고 npm을 대체할 새로운 패키지 매니저를 개발하게 됩니다.

#### npm의 한계

npm 저장소의 취약한 보안 이슈를 시작으로, 의존 패키지의 버저닝 이슈, 무엇보다 패키지가 많아짐에 따라 빌드 성능이 좋지 않다는 점이 가장 큰 문제입니다.

버저닝 이슈는 예를 들면 로컬에서 특정 패키지의 버전이 1.0.0인데 배포를 위한 빌드 서버에서는 시점에 따라 1.0.3으로 업데이트 될 수도 있음을 말합니다.

> 최근의 보안 이슈 - http://blog.npmjs.org/post/163723642530/crossenv-malware-on-the-npm-registry

#### Yarn은 npm에 비해 얼마나 빠른가?

간단한 React 애플리케이션을 통해 node_modules을 설치하는 속도는 npm과 크게 차이가 나지 않습니다. 하지만 두 번째 명령을 통해 아래와 같이 성능 차이가 나는 것을 볼 수 있습니다.

`React app`

Action | First time | Second Time(Cached)
--|--|--
npm install | 24.3s | 5.4s
yarn install | 22.9s | 976ms

> 성능 테스트 참고 - https://yarnpkg.com/en/compare

#### Yarn은 모든 패키지를 유저 디렉토리에 저장해 캐싱합니다.

캐싱하기 위한 디렉토리 경로는 아래와 같습니다.

```bash
$ yarn cache dir
$HOME/Library/Caches/Yarn/v1
```

## 시작하기

지금까지 Yarn이 출현하게 된 배경을 살펴보았고 이제 시스템에 Yarn을 설치해보도록 하겠습니다.

```bash
$ curl -o- -L https://yarnpkg.com/install.sh | bash
```

또는 nvm을 통해 node 버전을 관리하고 있다면 npm을 통해 설치하는 것을 추천합니다.

```bash
$ npm install -g yarn
```

어디에 설치되어 있을까요?

```bash
$ which yarn
$HOME/.nvm/versions/node/v8.9.0/bin/yarn
```

#### yarn global

이 명령은 패키지를 시스템 전역에서 설치, 업데이트, 삭제하는 것을 의미합니다. 패지키가 설치되는 경로를 지정할 수 있습니다.

```bash
$ yarn config set prefix ~/.yarn
$ yarn global add pm2 npm-check create-react-app
```

아래의 명령을 통해 현재 전역에 설치된 패키지 리스트와 실행 파일의 위치를 확인할 수 있습니다.

```bash
$ yarn global list
yarn global v1.3.2
info "create-react-app@1.4.3" has binaries:
   - create-react-app
info "npm-check@5.5.2" has binaries:
   - npm-check
info "pm2@2.8.0" has binaries:
   - pm2
...
✨ Done in 1.51s.
```

```bash
$ yarn global bin
$HOME/.yarn/bin
```

```bash
$ ls $HOME/.yarn/bin
create-react-app	pm2-dev			yarn			yarnpkg
npm-check		pm2-docker		pm2			pm2-runtime
```

#### yarn init

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

프로젝트에서 HTTP 요청을 위한 의존 패키지를 `request`를 사용한다면 아래와 같이 정의하면 됩니다.

- npm 패키지의 이름
- npm 패키지의 버전을 표기합니다.

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

npm 패키지의 버전 표기 방식이 낮설어 보일수도 있는데, 프로젝트의 의존 패키지의 버전을 정의하기 위해 가장 많이 사용되는 방식은 틸드(~), 캐럿(^)입니다. 이 두 방식이 패키지 버전의 범위를 어떻게 표현하는지 이해할 필요가 있습니다.

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

하지만 아직 npm 저장소 생태계의 몇몇 패키지는 Minor, Patch 버전이 업데이트 되었음에도 하위 호환성을 보장하지 않고 우리가 원하는 방식으로 동작하지 않는 경우가 있습니다. 이점은 대규모 프로젝트의 환경에서는 치명적이기 때문에 프로젝트에서 의존 패키지를 효율적으로 관리하기 위해 Yarn이 어떻게 동작하는지 정확히 이해할 필요가 있습니다.

## yarn.lock

위와 같이 Yarn은 `package.json`에 정의된 버전의 범위에 따라 패키지를 관리합니다. 하지만 이는 시스템마다 `yarn install`이 되는 시점에 따라 패키지의 버전이 다를 수도 있다는 것을 의미합니다.

Yarn은 이 문제를 해결하고 시스템간에 일관적으로 패키지 버전을 제공하기 위해 `yarn.lock` 파일을 프로젝트의 루트에 자동으로 생성합니다. 사용자는 이 파일을 직접 수정해서는 안되며 Yarn CLI을 통해 패키지를 관리하면 자동으로 업데이트됩니다.

```
# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
# yarn lockfile v1
...
mongoose@^4.9.8:
  version "4.9.8"
  resolved "https://registry.yarnpkg.com/mongoose/-/mongoose-4.9.8.tgz#ef64304231dc2455ab15a0c0cb6c149ce8c787bb"
  dependencies:
...
```

`package.json`과 `yarn.lock`은 Version control 시스템과 긴밀하게 연결되어야 합니다. 많은 사람들과 애플리케이션을 안정적으로 운영하고자 한다면 이 파일들을 Git Repository에 함께 저장하는 것을 추천합니다.

#### 하위 호환성을 보장하지 않는 사례

현재 `yarn.lock`의 mongoose 버전은 4.9.8로 resloved 되어 있고, 만약 테스트 환경을 구축하기 위해 `devDependencies`에 mocha, chai, nyc와 같은 패키지를 추가하거나 버전만을 업데이트했다고 가정합니다.

`packages.json`

```javascript
...
"chai": "^4.1.2",
"mocha": "^4.0.1",
"nyc": "^11.3.0",
...
```

아래와 같은 명령은 프로젝트의 모든 패키지를 지정된 범위 내에서 업데이트하고 `yarn.lock`을 `recreated`하게 됩니다.

```bash
$ yarn upgrade
```

`devDependencies` 뿐만 아니라 런타임에도 영향을 미치는 mongoose와 같은 패키지도 현재의 기준으로 최신 버전으로 resolved 됩니다.

`yarn.lock`

```
mongoose@^4.9.8:
  version "4.13.6"
  resolved "https://registry.yarnpkg.com/mongoose/-/mongoose-4.13.6.tgz#48102f0b0d797a9bd273e581eef16d0505ef3d79"
  dependencies:
...
```
> 최신 버전인 4.13.6으로 resloved 된 mongoose 패키지

Major Fixed가 아님에도 이 업데이트는 하위 호환성을 보장하지 않고 MongError를 발생하는 현상이 있었습니다. 이 경우에는 테스트 케이스를 통해 업데이트 버전에 맞게 코드를 수정해야 합니다.

## Yarn commands

지금까지는 Yarn의 출현 배경을 알아봤다면 지금부터는 Yarn이 제공하는 CLI를 통해 효율적으로 패키지를 관리할 필요가 있습니다.

#### yarn install

로컬의 `node_modules` 폴더에 의존 패키지를 설치하거나 업데이트합니다.

```bash
$ yarn install
```

install은 생략할 수 도 있습니다.

```bash
$ yarn
```

yarn을 통해 패키지를 설치할 때 주의해야할 사항으로는 빌드, 테스트등을 위한 패키지는 런타임에 영향을 미치지 않아야 합니다. 아래와 같이 `NODE_ENV` 환경 변수나 `--production` flag를 통해 production 환경에서 devDependencies에 정의된 패키지의 설치를 생략할 수 있습니다.

```bash
$ yarn install --production
```

```bash
$ NODE_ENV=production yarn install
```

반대로 NODE_ENV가 production임에도 강제로 devDependencies의 설치가 필요하다면 `--production`을 false로 지정합니다.

```bash
$ yarn install --production=false
```

강제로 모든 패키지를 다시 다운로드해야하는 경우도 있습니다.

```bash
yarn install --force
```

CI 서버와 같이 재생 가능한 의존 패키지가 필요한 경우 `--fronzen-lockfile` 플래그는 유용합니다. `yarn.lock`과 `package.json`이 동기화 되지 않은 상태에서 업데이트가 필요한 경우에는 설치를 실패하고 `yarn.lock`을 생성하지 않습니다.

```bash
$ yarn install --frozen-lockfile
yarn install v1.3.2
[1/4] 🔍  Resolving packages...
error Your lockfile needs to be updated, but yarn was run with `--frozen-lockfile`.
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
```

> https://github.com/yarnpkg/yarn/issues/4147
> https://github.com/yarnpkg/yarn/issues/3313

#### yarn add

프로젝트에서 다른 패키지를 사용하기 위해 `package.json`에 `dependencies`를 직접 설정하는 방법과 add 명령이 있습니다. 이 명령은 프로젝트의 `package.json`과 `yarn.lock`을 업데이트해 모든 개발자가 일괄적인 패키지를 관리할 수 있도록 합니다.

npm 저장소의 가장 최신 패키지를 설치합니다.

```bash
$ yarn add request
```

패키지의 버전 범위를 지정합니다.

```bash
$ yarn add request@^2.0.0
```

devDependencies에 패키지를 추가합니다.

```bash
$ yarn add eslint@^4.0.0 --dev
```

#### yarn upgrade

이 명령은 모든 의존 패키지를 `package.json`에 정의한 버전의 범위에서 업데이트하거나 삭제합니다.

- `yarn.lock` 파일이 `recreated` 됩니다.
- `package.json`에는 변화가 없습니다.

```bash
$ yarn upgrade
```

위에서 살펴본대로 대규모의 프로젝트에서는 의존된 모든 패키지가 호환성을 보장하기 힘들기 때문에 이 명령을 통해 일괄적으로 패지키를 업데이트하는 것은 좋지 않습니다. 기존 패키지의 업데이트가 필요하다면 아래와 같이 패키지를 지정해 업데이트하는 것을 추천합니다.

```bash
$ yarn upgrade mocha@^4.0.0
```

#### yarn remove

`yarn remove foo` 명령은 `foo`라는 패키지를 프로젝트에서 제거하는 것을 의미합니다.

- `package.json`에서 제거됩니다.
- `yarn.lock`에서 제거됩니다.

dependencies, devDependencies등 모든 타입에서 패키지가 삭제됩니다.

```
$ yarn remove foo
```

> yarn remove는 package.json과 yarn.lock을 언제나 업데이트합니다. 이는 같은 프로젝트에서 협업하는 동료들도 동일한 의존 패키지를 사용하는 것을 보장하는 것을 의미합니다.

## yarn config와 `.yarnrc`

`yarn config` 명령을 통해 Yarn에서 참조하는 설정 파일을 지정할 수 있습니다. 아래와 같이 npm 패키지 저장소의 URL을 변경하거나 라이센스를 지정하는 경우를 말합니다.

```
$ yarn config set registry 'https://registry.yarnpkg.com'
$ yarn config set init-license MIT
$ yarn config list
...
registry: 'https://registry.yarnpkg.com',
init-license: 'MIT'
```

프로젝트의 로컬에서는 아래와 같이 `.yarnrc` 파일을 통해 별도의 명령 없이 config list를 관리할 수 있습니다.

`.yarnrc`

```
registry: 'https://registry.yarnpkg.com'
init-license: 'MIT'
```

```
$ yarn config list
...
registry: 'https://registry.yarnpkg.com',
init-license: 'MIT'
```

## 프로젝트의 패키지 버전 안정적으로 관리하기

npm, yarn을 통해서 dependencies 패키지 버전을 지속적으로 체크하는 다양한 옵션이 존재합니다.

#### yarn check

패키지 버전에 따른 의존 패키지들이 프로젝트에서 유효한지 체크합니다. 이 기준은 현재의 `package.json`이 `yarn.lock`과 일치하는지 확인하는 것을 말합니다.

```bash
$ yarn check
yarn check v1.3.2
warning "chokidar#fsevents#node-pre-gyp@^0.6.39" could be deduped from "0.6.39" to "node-pre-gyp@0.6.39"
success Folder in sync.
✨  Done in 6.65s.
```

`yarn check` 명령 후에 위와 같이 warning, error를 만난다면 의존 패키지의 버전을 조정할 필요가 있습니다.

#### yarn outdated

`yarn outdated`는 업데이트가 필요한 모듈이 정리되어 출력되기 때문에 의존 패키지의 버전을 조종하는데 유용하게 사용됩니다.

```bash
$ yarn outdated
yarn outdated v1.3.2
info Color legend :
 "<red>"    : Major Update backward-incompatible updates
 "<yellow>" : Minor Update backward-compatible features
 "<green>"  : Patch Update backward-compatible bug fixes
Package           Current Wanted Latest Package Type    URL
@types/jest       21.1.8  21.1.9 21.1.9 devDependencies https://www.github.com/DefinitelyTyped/DefinitelyTyped.git
@types/koa        2.0.39  2.0.39 2.0.43 devDependencies https://www.github.com/DefinitelyTyped/DefinitelyTyped.git
@types/koa-router 7.0.23  7.0.23 7.0.27 devDependencies https://www.github.com/DefinitelyTyped/DefinitelyTyped.git
cross-env         5.0.5   5.0.5  5.1.1  devDependencies https://github.com/kentcdodds/cross-env#readme
jest              21.2.1  21.2.1 22.0.3 devDependencies http://facebook.github.io/jest/
koa               2.3.0   2.3.0  2.4.1  dependencies    https://github.com/koajs/koa#readme
koa-router        7.2.1   7.2.1  7.3.0  dependencies    https://github.com/alexmingoia/koa-router#readme
nodemon           1.12.0  1.12.0 1.14.1 devDependencies http://nodemon.io
ts-jest           21.2.4  21.2.4 22.0.0 devDependencies https://github.com/kulshekhar/ts-jest#readme
ts-node           3.3.0   3.3.0  4.0.2  devDependencies https://github.com/TypeStrong/ts-node
tslint            5.7.0   5.7.0  5.8.0  devDependencies https://github.com/palantir/tslint.git
typescript        2.5.2   2.5.2  2.6.2  devDependencies http://typescriptlang.org/
✨  Done in 1.71s.
```

`Current`는 프로젝트에 현재 설치된 버전이고 `Wanted`는 package.json에 지정한 패키지의 버전에서 호환성을 보장하는 버전을 의미합니다. 즉, yarn upgrade를 통해 변경 되는 버전을 말합니다. 

`Latest`는 패키지의 현재의 최신 버전입니다. 위 화면에서는 `jest`와 같이 Major 업데이트가 필요한 패키지는 붉은색으로 표시됩니다.

#### npm-check

`yarn outdated`를 통해 원하는 모듈을 업데이트해도 되지만 꽤 귀찮은 작업으로 보입니다. `npm-check`는 Iteractive한 UI를 터미널에서 제공해 조금 더 쉽게 패키지의 버전을 관리할 수 있도록 도와줍니다.

- https://www.npmjs.com/package/npm-check

```bash
$ yarn global install npm-check
```

프로젝트의 루트경로에서 아래와 같이 사용할 수 있습니다.

```bash
$ npm-check -u
```

<img src='https://cloud.githubusercontent.com/assets/51505/9569917/96947fea-4f48-11e5-9783-2d78077256f2.png' />

## 마치며

이미 npm을 통해 효율적으로 프로젝트를 관리하고 계시다면 꼭 Yarn을 사용해야 하는 것은 아닙니다. npm 역시 npm@5 부터 더욱 안정적이고 성능이 좋아졌기 때문입니다. 각자의 용도에 따라 필요한 수준의 도구를 이용하면 됩니다. 

만약 대규모 프로젝트에서 Yarn을 통해 더 나은 경험을 얻고자 하신다면 2017년 12월 현재, 아래의 지침으로 정리할 수 있겠습니다.

- `yarn.lock`은 절대 직접 수정하지 않습니다.
- `package.json`을 직접 수정하는 대신 yarn CLI를 통해 추가, 삭제, 업데이트하는 것을 추천합니다.
- 새로운 패키지는 `yarn add package@^version`
- 기존 패키지의 업데이트를 위해서는 `yarn upgrade package@^version`
- `yarn upgrade` 명령을 통해 모든 패키지를 업데이트 하는 행위는 호환성이 보장되지 않는 대참사를 불러올 수 있기 때문에 사용을 지양합니다.

> 오직 add, remove, 그리고 upgrade 명령만이 `yarn.lock`을 업데이트 합니다.

> 단, `yarn.lock`이 `package.json`과 일치하지 않는 상태라면 install 명령으로 패키지가 업데이트 되고 `package.json`을 만족하기 위해 필요한 만큼 수정됩니다.

## References

- https://docs.npmjs.com/files/package.json
- https://yarnpkg.com/en/docs/configuration
- https://yarnpkg.com/en/docs/cli/install
- https://yarnpkg.com/en/docs/cli/add
- https://yarnpkg.com/lang/en/docs/cli/upgrade/
- https://yarnpkg.com/en/docs/cli/check