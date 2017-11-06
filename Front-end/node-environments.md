---
title: Node.js의 실행 환경을 지탱하는 도구들
date: 2017-10-30 10:07:11
categories: node
---

ECMAScript(JavaScript)가 Ajax, JSON, jQuery가 등장함으로서 널리 사용 되어지고 우리에게 익숙해졌다면 서버의 실행 환경을 위한 Node.js의 등장으로 JavaScript는 황금기를 맞이하게 되었습니다. 이 글에서는 Node.js를 시작하기 전에 시스템에서 필요한 Node.js의 실행환경에 대해 이야기 합니다.

<img src='https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png' width='400' />

## Node.js와 npm

Javascript가 황금기를 맞이하게 되는 결정적인 이유는 Node.js를 통해 Back-end에서도 동작하는 런타임 환경을 제공하게 된 것 뿐만 아니라 Node.js의 패키지 도구인 `npm`이 거대한 오픈소스 생태계로 발전한 것이 가장 결정적인 역할을 한 것으로 보인다.

npm은 JavaScript 패키지의 저장소일 뿐만 아니라 시스템에서 패키지 관리할 수 있는 다양한 명령어를 제공한다.

> npm은 JVM 진영의 Maven Central, jCenter나 Python 진영의 PYPI와 유사하다.

우리는 npm을 통해서 Back-end, Front-end 구분 없이 JavaScript 기반으로 개발된 다양한 패키지를 사용 할 수 있고, 먼저 npm을 사용하기 위해서는 Node.js를 시스템에 설치해야 한다.

운영체제에 Node.js가 설치되어 있지 않다면, 아래와 같이 Terminal에서 Node를 설치하도록 한다.

```bash
$ brew install node
```

설치가 완료되면 Node.js와 npm의 버전을 확인해보자.

```bash
$ node -v
$ npm -v
```

npm의 아래의 옵션을 통해 `yarn`, `gulp`를 시스템의 전역에서 사용할 수 있도록 설치할 수 있다.

```bash
$ npm install -g yarn gulp
```

#### npm의 주요 명령어들

```bash
$ npm init
```

```bash
$ npm install
```

```bash
$ npm update
```

```bash
$ npm install --save requests
```

```bash
$ npm install --save-dev babel babel-cli babel-core babel-preset-env babel-register
```

```bash
$ npm uninstall --save requests
```

```bash
$ npm list
```

> https://docs.npmjs.com/cli/npm

#### package.json

JSON Document로 만들어지는 `package.json`은 Node.js 프로젝트에서 아주 중요한 역할을 한다. 프로젝트의 기본 정보를 시작으로 의존되는 패키지와 버전을 지정할 수 있다.

> https://docs.npmjs.com/files/package.json

```javascrirpt
{
  "name": "papago",
  "version": "1.0.0",
  "description": "Papago translation API with ES6",
  "dependencies": {
    "request": "^2.83.0"
  },
  "devDependencies": {
    "babel": "^6.23.0",
    "babel-cli": "^6.23.0",
    "babel-core": "^6.23.0",
    "babel-preset-env": "^1.6.1",
    "babel-register": "^6.23.0"
  },
  "scripts": {
    "compile": "babel lib -d build --presets env",
    "lint": "eslint lib/**/*.js test/**/*.js --ignore-path .gitignore",
    "test": "npm run compile && mocha --require babel-register",
    "coverage": "istanbul cover mocha -- --require babel-register"
  }
}
```

`package.json`에 정의된 script는 아래와 같이 `npm run` 명령으로 실행하며,

```bash
$ npm run compile
```

`test`, `start` 명령은 `run`을 생략할 수 있다.

```bash
$ npm test
```

```bash
$ npm start
```
> 웹 애플리케이션인 경우 main에 지정된 경로를 통해서 start명령을 통해 서버를 실행할 수 있다.

#### npm 모듈 배포하기

npm 저장소에 자신의 모듈을 배포하는 방법은 비교적 쉬운 편이다.

`사용자 추가`

```bash
$ npm adduser
```

`테스트`

```bash
$ mkdir ../install-test
$ cd ../install-test
$ npm install ../my-npm-module/
```

`배포`

```bash
$ npm publish
```

## Node.js의 버전관리 도구 nvm

한 시스템에서 다양한 프로젝트 그리고 프로젝트별로 Node의 버전을 다르게 사용하는 경우가 있다. 이 의미는 A 프로젝트에서 Node의 v4 버전을 사용해 유지 보수하면서 B 프로젝트에서는 v6 버전을 사용하는 것을 말한다. 뿐만 아니라 Node REPL에서도 지정한 버전을 따르게 된다.

#### Install

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

위의 스크립트를 통해 nvm이 설치되면 시스템의 `.bash_profile`에 아래와 같이 환경 변수가 추가된다.

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

```bash
$ command -v nvm
```

> 만약 설치 후에 nvm 커맨드가 정상적으로 동작하지 않는다면 터미널을 재시작하도록 하자.

#### Commands

`ls-remote` 명령을 통해 원격으로 설치 가능한 Node.js 버전을 확인할 수 있으며,

```bash
$ nvm ls-remote | grep -i v6
```

설치를 위한 명령을 아래와 같다. 이 경우 가장 최신의 버전을 설치한다.

```bash
$ nvm install node
```

Node.js의 버전을 지정하여 설치하는 경우는 아래와 같다.

```bash
$ nvm install 6
```

특정 프로젝트를 위해 Node.js의 버전을 변경하고자 한다면 `use` 명령을 사용하자.

```bash
$ nvm use 6
```

자주 사용되는 버전은 아래와 같이 시스템의 Node.js 기본 버전으로 지정하자. 아래는 nvm으로 설치된 버전이 아닌 시스템에서 설치된 Node.js 버전을 가르킨다.

```bash
$ nvm alias default system
```

```bash
$ which node
/usr/local/bin/node
```

현재 시스템에 설치된 버전을 확인할 수 있다.

```bash
$ nvm list
         v4.8.5
         v6.2.2
        v6.11.5
->       system
default -> system
node -> stable (-> v6.11.5) (default)
stable -> 6.11 (-> v6.11.5) (default)
iojs -> N/A (default)
lts/* -> lts/argon (-> v4.8.5)
lts/argon -> v4.8.5
lts/boron -> v6.11.5
```
> https://github.com/creationix/nvm

## Yarn

Yarn은 페이스북에서 개발한 향상된 Node.js의 패키지 매니저이다. 자세한 내용은 아래를 참고 하도록 한다.

#### Install

```bash
$ npm -g list | grep -i yarn
```

```bash
$ npm install -g yarn
```

#### Commands

```bash
$ yarn init
```

```bash
$ yarn install
```

```bash
$ yarn add
```

```bash
$ yarn add --dev
```

```bash
$ yarn list
```

> https://yarnpkg.com/en/docs
 
#### yarn을 통해 리액트 개발을 한다면 create-react-app 패키지를 사용해보자.

```bash
$ yarn global add create-react-app --prefix /usr/local
# the `create-react-app` command is now available globally:
$ which create-react-app
$ /usr/local/bin/create-react-app
$ create-react-app
```
