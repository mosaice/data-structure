function insertionSort(arr) {
  var temp, inner;
  for (var out = 1; out < arr.length; out++) {
    temp = arr[out];
    inner = out;
    while (inner > 0 && arr[inner - 1] >= temp) {
      arr[inner] = arr[inner - 1];
      inner--;
    }
    arr[inner] = temp;
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
insertionSort(testArr);
// console.log(newArr.toString());
console.log('\n');
var endTime = Date.now();
console.log('start at' + endTime);
console.log('count' + (endTime - startTime));
