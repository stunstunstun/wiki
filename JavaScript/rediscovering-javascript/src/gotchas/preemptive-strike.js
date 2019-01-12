// Apply the use strict directive. The syntax for the directive is an odd-looking, but was designed that way for a good reason. Since it appears as a string, the newer JavaScript engines can recognize it whereas the older engines can ignore it.
'use strict';

const opps = function () {
  haha = 2;
  console.log(haha);
}

opps();
console.log(haha);