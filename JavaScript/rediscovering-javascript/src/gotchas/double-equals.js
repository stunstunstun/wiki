// Use === Instead of ==
const a = '1';
const b = 1;
const c = '1.0';

console.log(a == b);
console.log(b == c);
console.log(a == c);
console.log(typeof a === 'string');
console.log(typeof a, typeof b, typeof c);
console.log('Use ===')
console.log(a === b);
console.log(b === c);
console.log(a === c);