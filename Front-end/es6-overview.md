---
title: 일목요연 ES6
date: 2017-10-12 13:07:11
categories: front-end
description: ECMAScript 6 한눈에 살펴보기
---

이 문서는 `Udacity`의 `ES6 - JavaScript Improved`와 Nicholas C. Zakas의 [`Underderstanding ES6`](https://www.amazon.com/Understanding-ECMAScript-Definitive-JavaScript-Developers/dp/1593277571)를 읽고 학습한 내용을 요약한 내용으로 구성되어 있습니다. 요약한 내용을 먼저 훏어보시고 첨부된 자료를 통해 도움이 되길 바랍니다.

#### ES6 - JavaScript Improved
- https://classroom.udacity.com/courses/ud356

#### Underderstanding ES6은 GitBook에서 이북으로도 즐길 수 있습니다.
- https://francisfeng.gitbooks.io/understanding-es6/content/manuscript/00-Introduction.html


## Tables

- [Variables](#Variables) 
- [Template Literals](#Template-Literals)
- [Destructuring](#Destructuring)
- [Object literal shorthand](#object-literal-shorthand)

## Variables

#### Hoisting

```javascript
function getClothing(isCold) {
  if (isCold) {
    var freezing = 'Grab a jacket!';
  } else {
    var hot = 'It’s a shorts kind of day.';
    console.log(freezing);
  }
}
```

```
getClothing(false); // undefined
```

```
function getClothing(isCold) {
  if (isCold) {
    let freezing = 'Grab a jacket!';
  } else {
    let hot = 'Grab short kind one.';
    console.log(freezing);
  }
}
```

#### let and const

```
getClothing(false); // ReferenceError
```

```
{
  let a = 1;
  const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError
```

#### `let`과 `const`를 사용하는 규칙들

- 변수는 `let`으로 선언되며 값을 수정할 수 있다. 하지만 동일한 범위(Scope)에서 다시 선언할 수 없다. 
- 'const'는 선언과 동시에 값을 할당하는 상수를 표현한다. 동일한 범위(Scope)에서 다시 선언할 수 없다. 

```javascript
{
  var instructor = 'James';
  var instructor = 'Richard';
}
console.log(instructor); // Richard
```

```javascript
{
  let instructor = 'James';
  let instructor = 'Richard'; // SyntaxError: Identifier 'instructor' has already been declared
}
```

```javascript
let instructor = 'James';
instructor = 'Richard';
console.log(instructor); // Richard
```

#### 더이상 `var`를 사용할 이유가 없을까?

전역적으로 선언하고자할 때 `var`를 사용하는 것이 논쟁거리가 되고 있다. 그러나 이 역시 `Bad Practice`로 간주되기 때문에 피하는 것을 추천한다.

#### Convention

```
// bad
var count = 1;
if (true) {
  count += 1;
}

// good, use the let.
let count = 1;
if (true) {
  count += 1;
}
```

<br/>

## Template Literals

Template literals는 기본적으로 내부 표현식을 포함하는 문자열이다. Single `('')`, double `("")`쿼터 대신 backticks `(``)`를 사용하며 내부에 `${expression}`과 같은 표현식을 통해 문자열을 쉽게 만들수 있도록 도와준다.

```javascript
const student = {
  name: 'Richard Kalehoff',
  guardian: 'Mr. Kalehoff'
};

const teacher = {
  name: 'Mrs. Wilson',
  room: 'N231'
}

```

`ES5`
```javascript
let message = student.name + ' please see ' + teacher.name + ' in ' + teacher.room + ' to pick up your report card.';
```

`ES6+`
```javascript
let message = `${student.name} please see ${teacher.name} in ${teacher.room} to pick up your report card.`;
```

```javascript
const note = `${teacher.name},

  Please excuse ${student.name}.
  He is recovering from the flu.
  
  Thanks`;
```

```
Richard Kalehoff

Please excuse Mrs. Wilson.
He is recovering from the flu.
  
Thanks
```

<br/>

## Destructuring

디스트럭처링은 배열 또는 객체에서 데이터를 별개(distinct) 변수로 추출할 수 있게 하는 식(expression)입니다.

디스트럭처링을 이용하면 배열의 요소나 객체의 속성을 배열 리터럴(literal)이나 객체 리터럴과 비슷한 문법을 이용해서 변수에 할당할 수 있습니다. 아주 간결한 문법입니다. 그러면서도 훨씬 더 명확합니다.

디스트럭처링 할당이 없을 경우, 어떤 배열의 처음 3개 요소에 접근하는 코드는 다음과 같을 것입니다.

```
var first = someArray[0];
var second = someArray[1];
var third = someArray[2];
```

디스트럭처링 할당을 이용하면, 똑같은 코드가 좀 더 간결하고 읽기 쉬워집니다.

```
var [first, second, third] = someArray;
```

#### More examples

```
const circle = {
  radius: 10,
  color: 'orange',
  getArea: function() {
    return Math.PI * this.radius * this.radius;
  },
  getCircumference: function() {
    return 2 * Math.PI * this.radius;
  }
};

let {radius, getArea, getCircumference} = circle;

getArea(); // NaN
```

> Destructuring으로 할당된 함수가 기존의 `this`객체의 참조를 유지하지는 않습니다.

#### Convention

```
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

```
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

```
// bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom];
}

// the caller needs to think about the order of return data
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom };
}

// the caller selects only the data they need
const { left, top } = processInput(input);
```

<br/>

## Object literal shorthand

`ES5`
```javascript
var type = 'quartz';
var color = 'rose';
var carat = 21.29;

const gemstone = {
  type: type,
  color: color,
  carat: carat
};

console.log(gemstone);
```

`ES6+`
```javascript
let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {type, color, carat};

console.log(gemstone);
```

`ES5`
```
var gemstone = {
  type: type,
  color: color,
  carat: carat,
  calculateWorth: function() { ... }
};
```

`ES6+`
```
let gemstone = {
  type,
  color,
  carat,
  calculateWorth() { ... }
};
```
<br/>

## Iteration

<br/>

## Promises

```
var p = new Promise(function(resolve, reject) {  
   if (/* condition */) {
      resolve(/* value */);  // fulfilled successfully
   }
   else {
      reject(/* reason */);  // error, rejected
   }
});
```

```
// A Promise that throws, rather than explicitly reject
var p1 = new Promise((resolve, reject) => {  
  if (true)  
    throw new Error("rejected!"); // same as rejection
  else
    resolve(4);
});
```

## 더 볼만한 것들

- http://es6katas.org/
- http://ccoenraets.github.io/es6-tutorial/
- http://hacks.mozilla.or.kr/category/es6-in-depth/
- http://www.datchley.name/es6-promises/
