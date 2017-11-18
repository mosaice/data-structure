var Queue = require('../queue/');

function radix(numArr) {
  var queueArr = [];
  var tempArr = [];
  var maxDigit = 0;
  var digit = 1;

  for (var i = 0; i < 10; i++) {
    queueArr[i] = new Queue();
  }

  numArr.forEach(function (num) {
    maxDigit = String(num).length > maxDigit ? String(num).length : maxDigit;
    queueArr[num % 10].enqueue(num);
  });

  while (maxDigit !== digit - 1) {
    tempArr = [];
    digit++;
    queueArr.forEach(function (queue) {
      while (!queue.empty()) {
        tempArr.push(queue.dequeue());
      }
    });

    tempArr.forEach(function (num) {
      var numString = String(num);
      if (numString.length < digit) {
        queueArr[0].enqueue(num);
      } else {
        queueArr[numString.substr(digit * -1, 1)].enqueue(num);
      }
    });
  }

  return tempArr;
}

// -------------- test ---------

var testArr = [];
for (var i = 0; i < 100000; i++) {
  testArr.push(Math.floor(Math.random() * 400000));
}

console.log('before sort\n');
var startTime = Date.now();
console.log('start at' + startTime + '\n');
// console.log(testArr.toString());
console.log('after sort\n');
radix(testArr);
// console.log(radix(testArr).toString());
console.log('\n');
var endTime = Date.now();
console.log('start at' + endTime);
console.log('count' + (endTime - startTime));
