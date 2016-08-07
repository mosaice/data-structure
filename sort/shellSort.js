function shellSort(arr) {
  var gap = [5, 3, 1];
  var temp, inner;
  for (var g = 0; g < gap.length; g++) {
    for (var i = gap[g]; i < arr.length; i++) {
      temp = arr[i];
      inner = i;
      while (inner >= gap[g] && arr[inner - gap[g]] >= temp) {
        arr[inner] = arr[inner - gap[g]];
        inner -= gap[g];
      }
      arr[inner] = temp;
    }
  }
  return arr;
}

function shellSort1(arr) {
  var N = arr.length;
  var h = 1;
  var temp;
  while (h < N / 3) {
    h = 3 * h + 1;
  }
  while (h >= 1) {
    for (var i = h; i < N; i++) {
      for (var j = i; j >= h && arr[j] < arr[j - h]; j -= h) {
        temp = arr[j];
        arr[j] = arr[j - h];
        arr[j - h] = temp;
      }
    }
    h = (h - 1) / 3;
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
shellSort1(testArr);
// console.log(newArr.toString());
console.log('\n');
var endTime = Date.now();
console.log('start at' + endTime);
console.log('count' + (endTime - startTime));
