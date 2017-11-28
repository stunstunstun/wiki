---
title: 일목요연 ES6
date: 2017-10-12 13:07:11
categories: front-end
description: ECMAScript 6 한눈에 살펴보기
---

이 문서는 Udacity의 `ES6 JavaScript Improved`와 Nicholas C. Zakas의 `Underderstanding ES6`을 통해 학습한 내용을 요약한 내용입니다. 요약한 내용을 먼저 훏어보시고 첨부된 자료를 통해 ES6 학습에 도움이 되길 바랍니다.

#### Udacity ES6
- https://classroom.udacity.com/courses/ud356

#### Underderstanding ES6의 GitBook
- https://francisfeng.gitbooks.io/understanding-es6/content/manuscript/00-Introduction.html

## 목차

- Syntax
    - [Variables](#variables)
    - [Template Literals](#template-Literals)
    - [Array](#array)
    - [Destructuring](#destructuring)
    - [Object literal shorthand](#object-literal-shorthand)
    - [Iteration](#iteration)
    - [Spread operator](#spread-operator)
    - [Rest Parameter](#rest-parameter)
- Function
- Built-in
- Promises

<br/>

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

```javascript
getClothing(false); // undefined
```

```javascript
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

```javascript
getClothing(false); // ReferenceError
```

```javascript
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

```javascript
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
var message = student.name + ' please see ' + teacher.name + ' in ' + teacher.room + ' to pick up your report card.';
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

## Array

`ES5`
```javascript
var fruits = ["apples", "bananas", "pears"];
var vegetables = ["corn", "potatoes", "carrots"];

let produce = fruits.concat(vegetables);
console.log(produce);
console.log(produce.shift());
console.log(produce.pop());
```

`ES6+
```javascript
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];

produce = [...fruits, ...vegetables];
console.log(produce);
console.log(produce.unshift('apples'));
console.log(produce);
```

<br/>

## Destructuring

디스트럭처링은 배열 또는 객체에서 데이터를 별개(distinct) 변수로 추출할 수 있게 하는 식(expression)입니다.

디스트럭처링을 이용하면 배열의 요소나 객체의 속성을 배열 리터럴(literal)이나 객체 리터럴과 비슷한 문법을 이용해서 변수에 할당할 수 있습니다. 아주 간결한 문법입니다. 그러면서도 훨씬 더 명확합니다.

디스트럭처링 할당이 없을 경우, 어떤 배열의 처음 3개 요소에 접근하는 코드는 다음과 같을 것입니다.

```javascript
var first = someArray[0];
var second = someArray[1];
var third = someArray[2];
```

디스트럭처링 할당을 이용하면, 똑같은 코드가 좀 더 간결하고 읽기 쉬워집니다.

```javascript
const [first, second, third] = someArray;
```

#### More examples

```javascript
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

```javascript
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

```javascript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

```javascript
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

var gemstone = {
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

```javascript
var gemstone = {
  type: type,
  color: color,
  carat: carat,
  calculateWorth: function() { ... }
};
```

`ES6+`

```javascript
const gemstone = {
  type,
  color,
  carat,
  calculateWorth() { ... }
};
```
<br/>

## Iteration


`ES5`

```javascript
var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < digits.length; i++) {
  console.log(digits[i]);
}
```

`ES6+`

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}

```

<br/>

## Spread operator

`ES5`

```javascript
var fruits = ["apples", "bananas", "pears"];
var vegetables = ["corn", "potatoes", "carrots"];
var produce = fruits.concat(vegetables);
console.log(produce); // [ 'apples', 'bananas', 'pears', 'corn', 'potatoes', 'carrots' ]
console.log(produce.shift()); // apples
console.log(produce.pop()); // carrots
console.log(produce);	// [ 'bananas', 'pears', 'corn', 'potatoes' ]
console.log(produce.unshift('apples')); // 5
console.log(produce); // [ 'apples', 'bananas', 'pears', 'corn', 'potatoes' ]
```

`ES6+`

```javascript
const books = ["Don Quixote", "The Hobbit", "Alice in Wonderland", "Tale of Two Cities"];
const books2 = books;
console.log(...books); // Don Quixote The Hobbit Alice in Wonderland Tale of Two Cities
console.log(books == books2); // true
console.log(books === books2);// true

const copiedBooks = [...books];
console.log(books == copiedBooks); // false
console.log(books === copiedBooks);// false
```

```javascript
const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
console.log(...primes);
```

<br/>

## Rest Parameter

`ES5 Using the arguments object`

```javascript
function sum() {
  let total = 0;
  for(const argument of arguments) {
    total += argument;
  }
  return total;
}

```

`ES6+ Using the rest parameter`

```javascript
function sum(...nums) {
  let total = 0;
  for(const num of nums) {
    total += num;
  }
  return total;
}

const total = sum(1, 2, 3, 4, 5);
console.log(total); // 15
```

<br/>

## Promises

```javascript
function onEvent(timeout) {
  return new Promise(function(resolve, reject) {
    if (true) {
      setTimeout(() => {
        resolve(10);
      }, timeout);
    } else {
      throw new Error('Cause!');
    }
  });
}
onEvent(2000)
.then((res) => {
  res -= 10;
  console.log(res);
});

const res = onEvent(2000);
console.log(res);

onEvent(1000)
.then((res) => {
  res += 10;
  console.log(res);
});

onEvent(0)
.then((res) => {
  console.log(res);
});

const p = Promise.resolve('foo');
p.then((res) => console.log(res));
```

`Result`

```
Promise { <pending> }
foo
10
20
0
```

## 더 볼만한 것들

- http://es6katas.org/
- http://ccoenraets.github.io/es6-tutorial/
- http://hacks.mozilla.or.kr/category/es6-in-depth/
- http://www.datchley.name/es6-promises/
