const digits = [1, 2, 3];
for (const index in digits) {
  console.log(digits[index]);
}

const arrayIterator = digits[Symbol.iterator]();
console.log(arrayIterator.next()); // Object {value: 0, done: false}
console.log(arrayIterator.next()); // Object {value: 1, done: false}
console.log(arrayIterator.next()); // Object {value: 2, done: false}
console.log(arrayIterator.next()); // Object { value: undefined, done: true }

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