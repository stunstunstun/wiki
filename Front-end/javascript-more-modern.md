---
title: jQuery를 넘어서 JavaScript의 생태계는 어떻게 발전해 왔을까?
date: 2018-01-02 11:54:07
categories: front-end
---

이 문서는 개인적인 용도로 사용하기 위한 서비스인 [블라블라 테크](http://blahblah.tech)를 개발하면서 개인이 학습한 내용을 바탕으로 작성되고 있습니다. 많은 분들에게 더욱 좋은 정보가 전달 될 수 있도록 개선이 필요한 내용이 있다면 코멘트 해주세요.

> https://march23hare.github.io/2017/11/30/tr-modern-javascript-explained-for-dinosaurs/

## 대체 Front-end 개발 어디서 부터 시작해야 하지..?

안타깝게도 현재 글을 작성하고 있는 이는 Javascript, jQuery를 6년전 경험해 본 것을 마지막으로 Front-End 기술과는 인연이 없었다.

## Javascript와 DOM 그리고 jQuery

다양한 브라우저의 변덕스러운 성격 탓에 DOM 구조와 브라우저가 Javascript를 해석하는 스펙의 미묘한 차이가 Front-end 환경에서의 개발을 힘들게 만들고 있었다. 하지만 다행스럽게 다양한 브라우저에서 원하는 결과를 얻어 낼 수 있는 jQuery 덕분에 많은 도움을 얻을 수가 있었다.

> 아래의 링크는 jQuery를 만든 John Resig의 jQuery를 만들게 된 계기에 대한 인터뷰이다.
https://ko.khanacademy.org/computing/computer-programming/html-js-jquery/jquery-dom-access/a/history-of-jquery

## TC39 프로세스

## 현재의 자바스크립트의 개발 환경은 어떨까?

그렇다면 지금은 어떨까? 아래의 통계가 정확한 자료인지는 불분명하나 상위 10k의 사이트에서 jQuery를 사용하는 비율은 65%, 상위 1M의 사이트에서는 83%로 여전히 jQuery는 사랑받고 있는 Javascript Library 인듯 보인다.

> https://trends.builtwith.com/javascript/javascript-library


```
이런 말을 하는 것은 슬프지만 jQuery가 javascript를 대체하지는 않는다. jQuery가 성공한 것은 DOM이 문제가 많다는 증거일 뿐이다
```
> John Resic

jQuery를 개발한 John의 말은 문자 그대로 파편화된 브라우저 덕분에 개발자는 DOM을 믿지 못해 jQuery를 널리 사용하게 되었다는 말이다. 시간이 지나면서 Babel 같은 녀석들 덕분에 ES6를 사용 할 수도 있게 되었고 브라우저의 파편화 문제도 많이 해소되면서 문제 해결에 대한 관심사는 DOM에서 Javascript 개발 생태계 전체로 바뀌게 되었다. 

그렇다면 jQuery를 넘어서 JavaScript의 개발 생태계는 어떻게 발전해 왔을까?

2017년이 된 지금 Github나 Reddit 같은 커뮤니티에서 Front-end 관련 내용들을 검색해 보면 jQuery를 언급하는 이는 보기 힘들다. 그 동안 jQuery를 넘어서 어떠한 관심사들이 출현했고 어떠한 기술들이 이를 해결하고 있는지 궁금했다.

먼저 Google과 GitHub을 통해 현재 Front-End 개발에 자주 언급되는 키워드들을 먼저 뽑아 보기로 한다. 

- npm, yarn
- gulp, webpack
- ES6, Babel
- React, Redux
- Jest
- Pug, Sass, Less

## What the heck!

<img src='https://cdn-images-1.medium.com/max/800/1*H8PH-HaV43gZyBJz0mJHxA.png' />

> Images from [Dinosaur Comics](http://www.qwantz.com/) by Ryan North


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

## 프로젝트에 필요한 다양한 모듈들은 어떻게 관리할까?

#### 모듈 관리하기

```
'use strict';
```

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

- https://march23hare.github.io/2017/11/30/tr-modern-javascript-explained-for-dinosaurs/
- http://ahnheejong.name/articles/ecmascript-tc39/
- https://medium.com/@peterxjang/modern-javascript-explained-for-dinosaurs-f695e9747b70
- https://nodejs.org/ko/about/
- https://webpack.js.org/
- http://d2.naver.com/helloworld/12864
- http://d2.naver.com/helloworld/0239818
- http://d2.naver.com/helloworld/0473039
- http://news.realm.io/kr/news/mobilization-konstantin-raev-taming-node_modules-at-facebook/
- https://github.com/petehunt/react-howto#learning-react-itself
- https://www.tokyobranch.net/archives/6598
- http://www.looah.com/article/view/2054