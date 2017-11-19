function bubbleSort(arr) {
  var out = arr.length;
  var temp = null;
  while (out > 2) {
    for (var i = 0; i < out; i++) {
      if (arr[i] > arr[i + 1]) {
        temp = arr[i + 1];
        arr[i + 1] = arr[i];
        arr[i] = temp;
      }
    }
    out--;
  }
  return arr;
}
/**
 * 冒泡排序优化版本
 * 1. 假定后续所有元素为有序的，当发生转换改为false
 *    若未发生转换则后续是有序的 中断
 * 2. 设置外圈的最大值，当转换时更新外圈最大值
 *    若外圈最大值小于当前外圈值表示后续部分是已排序的
 *    下次循环从上次最后交换的位置开始
 * @param {any} arr 
 * @returns 
 */
function bubbleSort1(arr) {
  var sorted = false;
  for (var last = i = arr.length - 1, temp = null; i > 0; i--) {
    if (sorted && i < arr.length - 1) return console.log('abort', i);
    sorted = true;
    for (var j =0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        sorted = false;
        last = j + 1;
      }
    }
    i = last;
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
var newArr = bubbleSort1(testArr);
// console.log(newArr.toString());
console.log('\n');
var endTime = Date.now();
console.log('start at' + endTime);
console.log('count' + (endTime - startTime));
