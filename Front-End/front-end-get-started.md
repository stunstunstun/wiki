---
title: Javascript 개발 리부트 이야기
date: 2017-05-30 18:07:11
categories: front-end
---

이 문서에서는 Front-End의 기본을 지탱하는 HTML 과 CSS 그리고 Javascript의 문법에 대해서는 다루지는 않습니다. Front-End 개발 경험이 없는 이가 Front-end 개발을 시작하면서 필요한 다양한 기술들과 이러한 기술들은 어떠한 이유 때문에 등장했는지를 다루게 됩니다.

> 이 문서는 개인적인 용도로 사용하기 위한 북마크 서비스인 holaxbookmark.io를 개발하면서 개인이 학습한 내용을 바탕으로 작성되고 있습니다. 문서를 보시고 수정이 필요한 내용이나 개선해야 될 내용이 있다면 Comments를 해주시면 많은 도움이 되겠습니다!

## 대체 Front-end 개발 어디서 부터 시작해야 하지..?

안타깝게도 현재 글을 작성하고 있는 이는 Javascript, jQuery를 6년전에 경험해 본 것을 마지막으로 Front-End 기술과는 인연이 없었다. 그 이후에는 Front-End 개발 경험이 없어 이전의 기억을 되짚어 보기로 한다. 

#### Before

- javascript (ES5)
- jQuery

다양한 브라우저와 각각의 변덕스러운 성격:브라우저 마다 다른 DOM 구조와 Javascript를 해석하는 스펙의 미묘한 차이와 같은 문제들을 가지고 있는 덕분에 Front-End 환경에서의 개발은 힘들고 쉽지 않은 일이였다. 하지만 다행스럽게 다양한 브라우저에서 원하는 결과를 얻어 낼 수 있는 jQuery 덕분에 많은 도움을 얻을 수가 있었다.

> 아래의 링크는 jQuery를 만든 John Resig의 jQuery를 만들게 된 계기에 대한 인터뷰이다.
https://ko.khanacademy.org/computing/computer-programming/html-js-jquery/jquery-dom-access/a/history-of-jquery

#### Now

그럼 2017년인 지금은 어떨까? 아래의 통계가 정확한 자료인지는 불분명하나 상위 10k의 사이트에서 jQuery를 사용하는 비율은 65%, 상위 1M의 사이트에서는 83%로 여전히 jQuery는 사랑받고 있는 Javascript Library인듯 보인다.

> https://trends.builtwith.com/javascript/javascript-library

이 페이지를 보기까지는 holaxbookmark.io 를 jQuery를 기반으로 개발을 해도 무리가 없어 보였다. 그런데 jQuery를 만든 John Resic이 2년전에 이런 말을 했단다.

> 이런 말을 하는 것은 슬프지만 jQuery가 javascript를 대체하지는 않는다. jQuery가 성공한 것은 DOM이 문제가 많다는 증거일 뿐이다. - John Resic

jQuery를 개발한 John의 말은 문자 그대로 파편화된 브라우저 덕분에 개발자는 DOM을 믿지 못해 jQuery를 널리 사용하게 되었다는 말이다. 시간이 지나면서 Babel 같은 녀석들 덕분에 ES6를 사용 할 수도 있게 되었고 브라우저의 파편화 문제도 많이 해소되면서 문제 해결에 대한 관심사는 DOM에서 Javascript 개발 생태계 전체로 바뀌게 되었다. 

그렇다면 jQuery를 넘어서 Javascript 개발 방법론은 어떻게 발전해 왔을까?

2017년이 된 지금 Github나 Reddit 같은 커뮤니티에서 Front-end 관련 내용들을 검색해 보면 jQuery를 언급하는 이는 보기 힘들다. 그 동안 jQuery를 넘어서 어떠한 관심사들이 출현했고 어떠한 기술들이 이를 해결하고 있는지 궁금했다.

막막한 마음에 먼저 Google과 Github에서 열심히 검색해서 2017년 현재 Front-End 개발에 자주 언급되는 Keyword들을 먼저 뽑아 보기로 한다. 

- npm, CommonJS
- webpack, browserify(Javascript Bundlers)
- ES6, Babel
- React, Redux
- Jest
- Pug, Sass, Less, Stylus

> 왓더퍽! 머가 이렇게 많지...? 

사실 더욱 다양한 Keyword들이 쏟아져 나왔지만 잠시 정신을 차리고 Front-End 개발에 필요한 환경을 준비하면서 Github에서 최근의 프로젝트 구조부터 살펴 보기로 했다.

다양한 패키지와 패키지의 Version 그리고 각각의 패키지 간의 의존 관계(dependencies)를 효율적으로 관리하고 있을까? 지금부터는 Javascript에서 벗어나 Front-End 개발 전반에 필요한 내용을 말하려고 한다.

## Node.js와 npm으로 시작하는 Javascript의 새로운 실행 환경

Javascript(표준 명칭은 ECMAScript)가 Ajax, JSON, jQuery가 등장함으로서 널리 사용 되어지고 우리에게 익숙해졌다면 Node.js의 등장으로 Javascript는 황금기를 맞이하게 되었다.

Javascript가 황금기를 맞이하게 되는 결정적인 이유는 Node.js를 통해 Server-Side에서도 동작하는 런타임 환경을 제공하게 된 것이 크지만 이로 인해서 Node.js의 패키지 도구인 `npm`이 거대한 오픈소스 생태계로 발전한 것이 가장 결정적인 역할을 한 것으로 보인다.

> **npm의 저장소로서의 역할**
npm은 JVM 진영의 Maven Central, jCenter나 Python 진영의 pypi와 비슷하다고 보면 된다.

우리는 npm을 통해서 Back-End, Front-End 구분 없이 Javascript 기반으로 개발 된 다양한 패키지를 사용 할 수가 있는데, npm을 사용하기 위해서는 Node를 설치해야 한다. 

운영체제에 Node가 설치되어 있지 않다면, 아래와 같이 Terminal에서 Node를 설치하도록 한다.

```shell
$ brew install node
```

> Windows 사용자라면 아래의 페이지에서 직접 Download 한 뒤에 설치하자
https://nodejs.org/en/download/

아래와 같은 command를 통해서 npm의 version 정보가 노출된다면 잘 설치 된 것이다.

```shell
$ npm -v
3.10.9
```

#### `npm install -g [package-name]`


- http://gulpjs.com/

```shell
$ npm install -g gulp
```
> -g options은 운영체제의 어디서나 사용할 수 있도록 Global하게 npm 패키지를 설치하겠다는 것을 의미한다


#### `npm init` 과 `package.json`

NPM의 init 명령은 프로젝트를 생성하는 표현과 같습니다. 

**package.json**
```json
{
  "name": "holaxbookmark",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://holaxapps.github.io/holaxbookmark",
  "dependencies": {
    "react": "^15.5.4",
    "react-dom": "^15.5.4"
  },
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.1.1",
    "gulp-sass": "^2.3.2",
    "react-scripts": "^0.9.5"
  },
  "scripts": {
    "sass": "gulp sass",
    "start": "gulp & react-scripts start",
    "build": "npm run sass && react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

#### `npm install` 의 다양한 옵션들

```shell
$ npm install --save-dev gulp
```

**-S, --save** : package.json파일의 dependencies의 구성요소로 저장 된다.
**-D, --save-dev** : package.json파일의 devDependencies의 구성요소로 저장 된다.

#### 개발환경과 실행환경

#### `npm start`

```shell
$ npm start
```

#### `npm update`


## 다양한 Front-end 기술들의 등장

이제는 다시 본론으로 돌아가 Front-end에 필요한 기술들을 살펴보도록 하자

#### Pug, SCSS, Less, Stylus

#### ES6

#### Babel

#### React, Redux

## 프로젝트에 필요한 다양한 모듈들은 어떻게 관리할까?

#### 모듈들의 의존성 관리

#### 번들러 그리고 통합

`webpack`

```
$ npm install webpack@3.0.0 -g
```

```
$ npm install webpack@3.0.0 --save-dev
```

```
$ webpack ./entry.js bundle.js
```

<img src='http://d2.naver.com/content/images/2016/02/webpack-1.png' />

```
$ webpack --watch ./entry.js bundle.js
```

`webpack.config.js`

```javascript
module.exports = {  
    context: __dirname + '/app',	 // 모듈 파일 폴더
    entry: { 				 // 엔트리 파일 목록
        app: './app.js' 
    },
    output: {
        path: __dirname + '/dist',	 // 번들 파일 폴더
        filename: '[name].bundle.js'     // 번들 파일 이름 규칙
    }
}
```

```
$ webpack
```

#### required vs import

## 빌드

webpack은 로더를 통해 scss의 전처리를 통해 css를 통합하여 만들어 낼 수 있다.

## 테스트와 Report 생성

#### Jest

#### Mocha

## 애플리케이션 배포하기

## 도대체 왜?

## References

- https://nodejs.org/ko/about/
- https://webpack.js.org/
- http://d2.naver.com/helloworld/12864
- http://d2.naver.com/helloworld/0239818
- http://d2.naver.com/helloworld/0473039
- http://news.realm.io/kr/news/mobilization-konstantin-raev-taming-node_modules-at-facebook/
- https://github.com/petehunt/react-howto#learning-react-itself
- https://www.tokyobranch.net/archives/6598
- http://www.looah.com/article/view/2054



