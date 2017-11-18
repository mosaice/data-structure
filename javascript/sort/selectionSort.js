function selectionSort(arr) {
  var length = arr.length;
  var out;
  var min;
  var temp = null;
  for (out = 0; out < length - 1; out++) {
    min = out;
    for (var i = out + 1; i < length; i++) {
      if (arr[i] < arr[min]) {
        min = i;
      }
    }
    temp = arr[out];
    arr[out] = arr[min];
    arr[min] = temp;
  }
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
selectionSort(testArr);
// console.log(newArr.toString());
console.log('\n');
var endTime = Date.now();
console.log('start at' + endTime);
console.log('count' + (endTime - startTime));
