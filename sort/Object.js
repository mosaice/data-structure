function ObjectSort(numArr) {
  var temObj = {};
  var arr = [];
  numArr.forEach(function (num) {
    if (temObj[num]) {
      temObj[num]++;
    } else {
      temObj[num] = 1;
    }
  });
  Object.keys(temObj).forEach(function (key) {
    while (temObj[key]) {
      arr.push(key);
      temObj[key]--;
    }
  });
  return arr;
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
ObjectSort(testArr);
// console.log(ObjectSort(testArr).toString());
console.log('\n');
var endTime = Date.now();
console.log('start at' + endTime);
console.log('count' + (endTime - startTime));
