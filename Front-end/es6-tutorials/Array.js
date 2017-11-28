const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];

// ES5
let produce = fruits.concat(vegetables);
console.log(produce);
console.log(produce.shift());
console.log(produce.pop());

// ES6
produce = [...fruits, ...vegetables];
console.log(produce);
console.log(produce.unshift('apples'));
console.log(produce);
