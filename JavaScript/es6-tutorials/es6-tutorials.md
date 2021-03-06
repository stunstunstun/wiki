
이 문서는 Udacity의 `ES6 JavaScript Improved`와 Nicholas C. Zakas의 `Underderstanding ES6`을 통해 학습한 내용을 요약한 내용입니다. 요약한 내용을 먼저 훏어보시고 첨부된 자료를 통해 ES6 학습에 도움이 되길 바랍니다.

`Udacity ES6`
- https://classroom.udacity.com/courses/ud356

`Underderstanding ES6의 GitBook`
- https://francisfeng.gitbooks.io/understanding-es6/content/manuscript/00-Introduction.html

`AirBnb JavaScript Style Guilde`
- https://github.com/airbnb/javascript

# Table

- Syntax
    - [Variables](#variables)
    - [Template Literals](#template-literals)
    - [Array](#array)
    - [Destructuring](#destructuring)
    - [Object literal shorthand](#object-literal-shorthand)
    - [Iteration](#iteration)
    - [Spread operator](#spread-operator)
    - [Rest Parameter](#rest-parameter)
- Function
	- [Arrow Functions](#arrow-functions)
  - [this and Arrow Functions](#this-and-arrow-functions)
  - [Default Functions Parameters](#default-functions-parameters)
  - [Class](#class)
- Built-in
  - [Symbols](#symbols)
  - [Iteration and Iterable Protocols](#iteration-and-iterable-protocols)
  - [Sets](#sets)
  - [Maps](#maps)
  - [Promises](#promises)
  - [Proxies](#proxies)
  - [Generators](#generators)
- Professional Developer-fu
	- [Async and wait](#async-and-wait)

<br/>

# Syntax

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

# Functions

## Arrow Functions

Regular functions can be either `function declarations` or `function expressions`, however arrow functions are always expressions. In fact, their full name is "arrow function expressions", so they can only be used where an expression is valid. This includes being:

stored in a variable,
passed as an argument to a function,
and stored in an object's property.
One confusing syntax is when an arrow function is stored in a variable.

`ES5`
```javascript
var upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) {
  return name.toUpperCase();
});
console.log(upperizedNames);
```

`ES6+`
```javascript
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(name => name.toUpperCase());
console.log(upperizedNames);
```
> Prints: [ 'FARRIN', 'KAGURE', 'ASSER' ]

In the code above, the arrow function is stored in the greet variable and you'd call it like this:

```javascript
const greet = name => `Hello ${name}!`;
console.log(greet('Minhyeok'));
```
> Prints: Hello Minhyeok!

#### Parentheses and arrow function parameteres

```javascript
// empty parameter list requires parentheses
const sayHello = () => console.log('Hello Udacity Student!');
sayHello();
```
> Prints: Hello Udacity Student!

```javascript
// multiple parameters requires parentheses
const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream('chocolate', 'waffle');
```
> Prints: Here's your chocolate ice cream in a waffle cone.

## this and Arrow Functions

#### Regular Functions and the `this` keyword

일반적으로 JavaScript에서 `this`는 어떤 의미인가?

```javascript
const mySundae = new Sundae('Chocolate', ['Sprinkles', 'Hot Fudge']);
```

```javascript
const result = obj1.printName.call(obj2);
```

```javascript
data.teleport();
```

```javascript
teleport();
```
#### Arrow Functions and the `this` keyword

```javascript
function IceCream() {
  this.scoops = 0;
}

IceCream.prototype.addScoop = function() {
  const cone = this;
  setTimeout(function() {
    cone.scoops++;
    console.log(cone.__proto__)
    console.log(cone.scoops);
    console.log('scoop added!');
  }, 500)
};

IceCream.prototype.removeScoop = function() {
  setTimeout(() => {
    this.scoops--;
    console.log(this.__proto__)
    console.log(this.scoops);
    console.log('scoop removed!');
  }, 500)
};

const dessert = new IceCream();
dessert.addScoop();
dessert.removeScoop();
```

## Default Parameters

#### Default Functions Parameters

```javascript
// ES5
function greet(name, greeting) {
  name = (typeof name !== 'undefined') ?  name : 'Student';
  greeting = (typeof greeting !== 'undefined') ?  greeting : 'Welcome';
  return `${greeting} ${name}!`;
}

console.log(greet());                   // Welcome Student!
console.log(greet('James'));            // Welcome James!
console.log(greet('Richard', 'Howdy')); // Howdy Richard!

// ES6
function hello(name = 'Student', greeting = 'Welcome') {
  return `${greeting} ${name}`;
}

console.log(hello());                   // Welcome Student!
console.log(hello('James'));            // Welcome James!
console.log(hello('Richard', 'Howdy')); // Howdy Richard!
```

#### Defaults and destructuring arrays

```javascript
function createGrid([width = 5, height = 5] = []) {
  return `Generates a ${width} x ${height} grid`;
}

createGrid(); // Generates a 5 x 5 grid
createGrid([10, 10]); // Generates a 10 x 10 grid
createGrid([undefined, 10]); // Generates a 5 x 10 grid
```

#### Defaults and destructuring objects

```javascript
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

console.log(createSundae());
console.log(createSundae({
  scoops: 2,
  toppings: ['Hot', 'Cold'] 
}));
```

#### Array defaults vs. object defaults

```javascript
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) { … }
createSundae({toppings: ['Hot Fudge', 'Sprinkles', 'Caramel']});
```

```javascript
function createSundae([scoops = 1, toppings = ['Hot Fudge']] = []) { … }
createSundae([undefined, ['Hot Fudge', 'Sprinkles', 'Caramel']]);
```

Since arrays are positionally based, we have to pass undefined to "skip" over the first argument (and accept the default) to get to the second argument.

Unless you've got a strong reason to use array defaults with array destructuring, we recommend going with object defaults with object destructuring!

## Class

Class is a mirage over prototypal inheritance!

#### Class is just function

ES6에서 Class를 지원한다고 해서 JavaScript가 Object-oriented를 지향하는 언어로 변한 것은 아니다. Class를 사용해도 여전히 JavaScript의 객체는 Function 이며 Class는 이를 숨기고 쉽게 구현할 수 있도록 도와주는 신기루일 뿐이다.

```javascript
class Dessert {
  constructor(calories = 250) {
    this.calories = calories;
  }
}

class IceCream extends Dessert {
  constructor(flavor, calories, toppings = []) {
    super(calories);
    this.flavor = flavor;
    this.toppings = toppings;
  }
  addTopping(topping) {
    this.toppings.push(topping);
  }
}

const choco = new IceCream('sweet', 100, ['choco'])
console.log(typeof IceCream); // function
console.log(choco);
console.log(choco.toString());
console.log(typeof choco);
console.log(choco.__proto__);
console.log(choco instanceof IceCream);
console.log(choco instanceof Dessert);
```

```
IceCream { calories: 100, flavor: 'sweet', toppings: [ 'choco' ] }
[object Object]
object
IceCream {}
true
true
```

#### Benefits of classes

`Less setup`

There's a lot less code that you need to write to create a function

`Clearly defined constructor function`

Inside the class definition, you can clearly specify the constructor function.

`Everything's contained`

All code that's needed for the class is contained in the class declaration. Instead of having the constructor function in one place, then adding methods to the prototype one-by-one, you can do everything all at once!

#### `super` must be called before `this`

```javascript
class Apple {}
class GrannySmith extends Apple {
  constructor(tartnessLevel, energy) {
    this.tartnessLevel = tartnessLevel; // `this` before `super` will throw an error!
    super(energy); 
  }
}
```

<br>

# Built-ins

We'll explore the latest batch of new built-ins provided in ES6. We now have sets, maps, promises and a whole new bunch of other built-ins at our disposal.

It's taken a while for JavaScript to catch up, but these built-ins make it much easier for us to execute tasks that were once more difficult in earlier versions of language.

As you go through this lesson you'll see how these new built-ins are structured, how they work and when it's the most appropriate time to use them.

To get started, let's kick it off with Symbols!

## Symbols

ES6 이전에는 아래의 기본형을 제공해 왔다. Symbols는 ES6에 새롭게 추가된 기본형(Primitive data type)이다.

- numbers
- strings
- booleans
- null
- undefined

A symbol is a unique and immutable data type that is often used to identify object properties.

To create a symbol, you write `Symbol()` with an optional string as its description.

```javascript
const sym1 = Symbol('apple');
console.log(sym1);

const sym2 = Symbol('banana');
const sym3 = Symbol('banana');
console.log(sym2 === sym3);     // false
```

```javascript
const bowl = {
  'apple': { color: 'red', weight: 136.078 },
  'banana': { color: 'yellow', weight: 183.151 },
  'orange': { color: 'orange', weight: 170.097 },
  'banana': { color: 'yellow', weight: 176.845 }
};
console.log(bowl);                  // Object {apple: Object, banana: Object, orange: Object}
console.log(Object.entries(bowl));  // 3


const bowl2 = {
  [Symbol('apple')]: { color: 'red', weight: 136.078 },
  [Symbol('banana')]: { color: 'yellow', weight: 183.15 },
  [Symbol('orange')]: { color: 'orange', weight: 170.097 },
  [Symbol('banana')]: { color: 'yellow', weight: 176.845 }
};
console.log(bowl2)
console.log(Object.getOwnPropertySymbols(bowl2).length);
```

> Object {Symbol(apple): Object, Symbol(banana): Object, Symbol(orange): Object, Symbol(banana): Object}
> 4

#### Enum patterns with Symbols

- http://2ality.com/2016/01/enumify.html

## Iteration and Iterable Protocols

다음 단계로 넘어가기전 ES6의 새로운 프로토콜 둘을 살펴보려 한다. 비록 이 프로토콜들은 Built-in 스펙은 아니지만 ES6의 새로운 반복 개념을 이해하고 Symbols의 사용 사례를 위하여 꼭 이해해야 한다.

The following values are iterable:

- Arrays
- Strings
- Maps
- Sets
- DOM data structures (work in progress)

<img src='http://exploringjs.com/es6/images/iteration----consumers_sources.jpg' />

The idea of iterability is as follows.

- Data consumers: JavaScript has language constructs that consume data. For example, for-of loops over values and the spread operator (...) inserts values into Arrays or function calls.

- Data sources: The data consumers could get their values from a variety of sources. For example, you may want to iterate over the elements of an Array, the key-value entries in a Map or the characters of a string.

It’s not practical for every consumer to support all sources, especially because it should be possible to create new sources (e.g. via libraries). Therefore, ES6 introduces the interface Iterable. Data consumers use it, data sources implement it:

```typescript
interface Iterable {
    [Symbol.iterator]() : Iterator;
}
interface Iterator {
    next() : IteratorResult;
}
interface IteratorResult {
    value: any;
    done: boolean;
}
```

#### The Iterable Protocol

```javascript
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (const index in digits) {
  console.log(digits[index]);
}

const arrayIterator = digits[Symbol.iterator]();
for (const digit of arrayIterator) {
  console.log(digit);
}
```

`How it Works`

In order for an object to be iterable, it must implement the iterable interface. If you come from a language like Java or C, then you’re probably familiar with interfaces, but for those of you who aren’t, that basically means that in order for an object to be iterable it must contain a default iterator method. This method will define how the object should be iterated.

The iterator method, which is available via the constant [Symbol.iterator], is a zero arguments function that returns an iterator object. An iterator object is an object that conforms to the iterator protocol.

#### The Iterator Protocol

The iterator protocol is used to define a standard way that an object produces a sequence of values. What that really means is you now have a process for defining how an object will iterate. This is done through implementing the .next() method.

`How it Works`

An object becomes an iterator when it implements the `.next()` method. The `.next()` method is a zero arguments function that returns an object with two properties:

- value : the data representing the next value in the sequence of values within the object
- done : a boolean representing if the iterator is done going through the sequence of values
  - If done is true, then the iterator has reached the end of its sequence of values.
  - If done is false, then the iterator is able to produce another value in its sequence of values

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayIterator = digits[Symbol.iterator]();

console.log(arrayIterator.next()); // Object {value: 0, done: false}
console.log(arrayIterator.next()); // Object {value: 1, done: false}
console.log(arrayIterator.next()); // Object {value: 2, done: false}
```

```javascript
const james = {
  name: 'James',
  height: `5'10"`,
  weight: 185,
  [Symbol.iterator]() {
    let index = 0;
    const that = this;
    const keys = Object.keys(this);
    const iterator = {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (index < keys.length) {
          const key = keys[index++];
          return { key, value: that[key], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    }
    return iterator;
  }
};

const iterator = james[Symbol.iterator]();

console.log(iterator.next()); // { key: 'name', value: 'James', done: false }
console.log(iterator.next()); // { key: 'height', value: '5\'10"', done: false }
console.log(iterator.next()); // { key: 'weight', value: 185, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

> http://exploringjs.com/es6/ch_iteration.html

## Sets



## Maps

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

<br/>

# Professional Developer-fu

## Async and wait

## References

- https://classroom.udacity.com/courses/ud356
- https://github.com/airbnb/javascript
- http://exploringjs.com/es6/index.html
- http://exploringjs.com/es6/ch_arrays.html
- https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md
- https://developers.google.com/web/fundamentals/primers/async-functions
- http://es6katas.org/
- http://ccoenraets.github.io/es6-tutorial/
- http://hacks.mozilla.or.kr/category/es6-in-depth/
- http://www.datchley.name/es6-promises/
- http://blog.jeonghwan.net/2016/07/19/babel.html

  