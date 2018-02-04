function sum() {
  console.log('ES5 with arguments object');
  let total = 0;
  for(const argument of arguments) {
    total += argument;
  }
  return total;
}

function sum(...nums) {
  console.log('ES6+ with rest parameter');
  let total = 0;  
  for(const num of nums) {
    total += num;
  }
  return total;
}

let total = sum(1, 2, 3, 4, 5);
console.log(total);
total = sum(1, 2, 3, 4, 5);
console.log(total);
