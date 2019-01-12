// Be careful where you break lines
const compute = function (number) {
  if (number > 5) {
    return number
     + 2
  }
  
  if (number > 2) {
    return
      number * 2;
  }
};

console.log(compute(6));
console.log(compute(3));
