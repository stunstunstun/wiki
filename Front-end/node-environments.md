---
title: Node의 실행 환경을 지탱하는 도구들
date: 2017-10-30 10:07:11
categories: node
---

ECMAScript(JavaScript)가 Ajax, JSON, jQuery가 등장함으로서 널리 사용 되어지고 우리에게 익숙해졌다면 서버의 실행 환경을 위한 Node.js의 등장으로 Javascript는 황금기를 맞이하게 되었습니다. 이 글에서는 Node.js를 시작하기 전에 시스템에서 필요한 Node.js의 실행환경에 대해 이야기 합니다.

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

```bash
$ node -v
$ npm -v
```

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

```bash
$ npm test
```

```bash
$ npm run compile
```

웹 애플리케이션인 경우 아래와 같이 메인에 지정된 경로를 통해서 서버를 실행할 수 있다.

```bash
$ npm start
```

#### npm 모듈 배포하기

`사용자 추가`

```bash
$ npmadduser
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

이 의미는 A 프로젝트에서 Node의 v4 버전을 사용해 유지 보수하면서 B 프로젝트에서는 v6 버전을 사용하는 것을 말한다. 뿐만 아니라 Node REPL에서도 지정한 버전을 따르게 된다.

#### Install

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

```bash
$ command -v nvm
```

`터미널 재시작`

#### Commands

```bash
$ nvm ls-remote | grep -i v6
```

```bash
$ nvm install node
```

```bash
$ nvm use node
```

```bash
$ nvm install 6
```

```bash
$ nvm use 6
```

```bash
$ nvm alias default system
```

```bash
$ which node
/usr/local/bin/node
```

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

## Yarn

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

`yarn을 통해 create-react-app 패키지를 시스템 전역으로 설치하기`

```bash
$ yarn global add create-react-app --prefix /usr/local
# the `create-react-app` command is now available globally:
$ which create-react-app
$ /usr/local/bin/create-react-app
$ create-react-app
```