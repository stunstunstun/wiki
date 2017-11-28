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
