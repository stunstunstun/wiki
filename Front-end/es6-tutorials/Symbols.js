const sym1 = Symbol('apple');
console.log(sym1);

const sym2 = Symbol('banana');
const sym3 = Symbol('banana');
console.log(sym2 === sym3);     // false

const bowl = {
  'apple': { color: 'red', weight: 136.078 },
  'banana': { color: 'yellow', weight: 183.151 },
  'orange': { color: 'orange', weight: 170.097 },
  'banana': { color: 'yellow', weight: 176.845 }
};
console.log(bowl);
console.log(Object.keys(bowl).length);

const bowl2 = {
  [Symbol('apple')]: { color: 'red', weight: 136.078 },
  [Symbol('banana')]: { color: 'yellow', weight: 183.15 },
  [Symbol('orange')]: { color: 'orange', weight: 170.097 },
  [Symbol('banana')]: { color: 'yellow', weight: 176.845 }
};
console.log(bowl2);
console.log(Object.getOwnPropertySymbols(bowl2).length);
