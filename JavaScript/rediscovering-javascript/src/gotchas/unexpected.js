// Be careful where you break lines
const unexpected = function () {
  let first
  second = 1;

  console.log(first);
  console.log(second);
}

unexpected();

console.log(second);