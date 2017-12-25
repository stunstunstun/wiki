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

function createGrid([width = 5, height = 5] = []) {
  return `Generates a ${width} x ${height} grid`;
}

console.log(createGrid()); // Generates a 5 x 5 grid
console.log(createGrid([undefined, 10])); // Generates a 5 x 10 grid

function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

console.log(createSundae());
console.log(createSundae({
  scoops: 2,
  toppings: ['Hot', 'Cold'] 
}));