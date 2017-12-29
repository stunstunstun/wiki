const Gender = Object.freeze({
  MALE: 'male',
  FEMALE: 'female',
});

Gender.MALE = 'man';
Gender.BI = 'bisexual';
console.log(Gender);          // { MALE: 'male', FEMALE: 'female' }
console.log(Gender.values()); // ECMAScript 2017. Node.js support for it from version 7.0. TypeError: Gender.values is not a function