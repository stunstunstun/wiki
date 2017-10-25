---
title: Modern JavaScript Explained For Dinosaurs
date: 2017-10-30 11:54:07
categories: front-end
---

## What the heck!

<img src='https://cdn-images-1.medium.com/max/800/1*H8PH-HaV43gZyBJz0mJHxA.png' />

> Images from [Dinosaur Comics](http://www.qwantz.com/) by Ryan North

## 다양한 Front-end 기술들의 등장

이제는 다시 본론으로 돌아가 Front-end에 필요한 기술들을 살펴보도록 하자

#### Pug, SCSS, Less, Stylus

#### ES6

#### Babel

#### React, Redux

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

## 원문

- https://medium.com/@peterxjang/modern-javascript-explained-for-dinosaurs-f695e9747b70