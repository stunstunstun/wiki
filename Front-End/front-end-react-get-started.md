---
title: 프로젝트 구조부터 살펴보는 React JS
date: 2017-06-10 18:07:11
categories: front-end
---

### 프로젝트?

### 새로운 언어를 배우기 위해 프로젝트를 살펴봐야 하는 이유

#### 프로젝트 단위로 관리하면 얻을 수 있는 이점들

#### 바퀴를 다시 만들 필요는 없으니깐요

#### 여러 모듈의 의존성을 효율적으로 관리해야 한다


## React 중심의 프로젝트 구조

> https://facebook.github.io/react/docs/installation.html

#### React 앱 생성하기

**[create-react-app](http://github.com/facebookincubator/create-react-app)** 이라는 npm 패키지를 통해서 손쉽게 React 앱을 생성 할 수 있다. Command Line에서 아래와 같이 create-react-app을 설치하고 첫 번째 React 앱을 만들어 보자

```shell
$ npm install -g create-react-app
$ create-react-app my-app

$ cd my-app
$ npm start
```

```shell
$ npm run build
```

#### React 프로젝트의 구조

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```


`public/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <title>Hola Bookmarks</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

`index.js`

package.json을 통해 index 페이지에서는 아래와 같은 ES6 문법을 통해 React 패키지를 참조 할 수 있다

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```




#### References

- https://facebook.github.io/react/
- https://facebook.github.io/react/tutorial/tutorial.html
- https://github.com/facebookincubator/create-react-app#create-react-app-
- https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents
- http://blog.tamizhvendan.in/blog/2015/11/23/a-beginner-guide-to-setup-react-dot-js-environment-using-babel-6-and-webpack/
- https://jiyeonseo.github.io/2016/07/11/A-Better-File-Structure-For-React-Redux-Applications/
- https://survivejs.com/react/advanced-techniques/structuring-react-projects/
- http://ccoenraets.github.io/es6-tutorial-react/setup/