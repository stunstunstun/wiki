---
title: React, GitHub Pages로 Reddit 클론하기
date: 2017-06-10 18:07:11
categories: front-end
---

## React 프로젝트로 시작하기

> https://facebook.github.io/react/docs/installation.html

#### React 앱 생성하기

**[create-react-app](http://github.com/facebookincubator/create-react-app)** 이라는 npm 패키지를 통해서 손쉽게 React 앱을 생성 할 수 있다. Command Line에서 아래와 같이 create-react-app을 설치하고 첫 번째 React 앱을 만들어 보자

```bash
$ npm install -g create-react-app
$ create-react-app my-app

$ cd my-app
$ npm start
```
#### React 프로젝트의 구조

```
my-app/
  README.md
  node_modules/
  package.json
  gulpfile.json
  public/
    index.html
    favicon.ico
  src/
    components/
    containers/
      App.js
    app.css
    index.js
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

Node 애플리케이션은 `index.js`를 시작으로 부트스트랩핑 하며, React에서는 아래와 같이 ES2015 문법을 통해 외부 모듈을 import 키워드를 통해 참조할 수 있다.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './app.css';ø

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement);
```

## Redux의 작동과정과 데이터의 흐름

- 브라우저에서 이벤트가 발생한다.
- 컴포넌트에서 이벤트가 발생한다.
- 액션 메서드가 호출된다.
- 스토어의 dispatch() 메서드가 호출된다.
스토어에서 리듀서를 호출한다. 샘플 코드에서는 todos 리듀서를 호출한다.
subscribe() 메서드로 등록한 리스너를 호출한다. 샘플 코드에서는 render() 메서드를 호출해 뷰를 갱신한다.


#### References

- [React 참고 자료 모음](https://github.com/reactkr/learn-react-in-korean)
- https://facebook.github.io/react/
- https://facebook.github.io/react/tutorial/tutorial.html
- https://jsx.github.io/
- https://github.com/facebookincubator/create-react-app
- http://blog.tamizhvendan.in/blog/2015/11/23/a-beginner-guide-to-setup-react-dot-js-environment-using-babel-6-and-webpack/
- https://survivejs.com/react/advanced-techniques/structuring-react-projects/
- http://ccoenraets.github.io/es6-tutorial-react/setup/