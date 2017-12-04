// ES5
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) {
  return name.toUpperCase();
});
// ES6+
const upperizedNames2 = ['Farrin', 'Kagure', 'Asser'].map(name => name.toUpperCase());
console.log(upperizedNames);
console.log(upperizedNames2);

// Parentheses and arrow function parameteres
const greet = name => `Hello ${name}!`;
console.log(greet('Minhyeok'));

// Empty parameter list requires parentheses
const sayHello = () => console.log('Hello Udacity Student!');
sayHello();

setTimeout(_ => {
  console.log('Starting the test');
}, 2000);

// Split and join
let vowels = 'aeiou'.split('');
vowels = vowels.map(letter => letter.toUpperCase());
console.log(vowels.join(''));
