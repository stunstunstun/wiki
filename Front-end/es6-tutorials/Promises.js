let p2 = Promise.resolve('foo');
p2.then((res) => console.log(res));

let p = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(4), 2000);
});

p.then((res) => {
    res += 2;
    console.log(res);
});

p.then((res) => console.log(res));
