function merge(left, right) {
  var result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return result.concat(left).concat(right);
}

function mergeSort(items) {
  console.log(items);
  if (items.length === 1) {
    return items;
  }
  var middle = Math.floor(items.length / 2);
  var left = items.slice(0, middle);
  var right = items.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

// -------------- test ---------

var testArr = [];
for (var i = 0; i < 100000; i++) {
  testArr.push(Math.floor(Math.random() * 400000));
}

console.log('before sort\n');
var startTime = Date.now();
console.log('start at' + startTime + '\n');
console.log(testArr.toString());
console.log('after sort\n');
var newArr = mergeSort(testArr);
console.log(newArr.toString());
console.log('\n');
var endTime = Date.now();
console.log('start at' + endTime);
console.log('count' + (endTime - startTime));
