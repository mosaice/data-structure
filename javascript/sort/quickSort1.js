const partition = (arr, low, hi) => {
  const pivot = arr[low];
  while (low < hi) {
      // 当队尾的元素大于等于基准数据时,向前挪动hi指针
      while (low < hi && arr[hi] >= pivot) {
          hi--;
      }
      // 如果队尾元素小于pivot了,需要将其赋值给low
      arr[low] = arr[hi];
      // 当队首元素小于等于pivot时,向前挪动low指针
      while (low < hi && arr[low] <= pivot) {
          low++;
      }
      // 当队首元素大于pivot时,需要将其赋值给hi
      arr[hi] = arr[low];

  }
  // 跳出循环时low和hi相等,此时的low或hi就是pivot的正确索引位置
  // 由原理部分可以很清楚的知道low位置的值并不是pivot,所以需要将pivot赋值给arr[low]
  arr[low] = pivot;
  return low; // 返回pivot的正确位置
}

const quickSort = (arr, low = 0, hi = arr.length - 1) => {
  console.log(low ,hi)
  if (hi - low < 2) return;
  const mi = partition(arr,low, hi);
  quickSort(arr, low, mi);
  quickSort(arr, mi + 1, hi);
}

// -------------- test ---------

var testArr = [];
for (var i = 0; i < 20; i++) {
  testArr.push(Math.floor(Math.random() * 100));
}

console.log('before sort\n');
var startTime = Date.now();
console.log('start at' + startTime + '\n');
console.log(testArr.toString());
console.log('after sort\n');
quickSort(testArr);
console.log(testArr.toString());
console.log('\n');
var endTime = Date.now();
console.log('start at' + endTime);
console.log('count' + (endTime - startTime));