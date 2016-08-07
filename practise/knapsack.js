var value = [4, 5, 10, 11, 13];
var size = [3, 4, 7, 8, 9];
var capacity = 16;
var n = 5;

function knapsack(capacity, size, value, n) {
  if (n === 0 || capacity === 0) return 0;

  if (size[n - 1] > capacity) return knapsack(capacity, size, value, n - 1);

  return Math.max(value[n - 1] + knapsack(capacity - size[n - 1], size, value, n - 1), knapsack(capacity, size, value, n - 1));
}

// console.log(knapsack(capacity, size, value, n));

function dKnapsack(capacity, size, value, n) {
  var k = [];
  for (var j = 0; j < n + 1; j++) {
    k[j] = [];
  }
  for (var i = 0; i < n + 1; i++) {
    for (var w = 0; w < capacity + 1; w++) {
      if (i === 0 || w === 0) {
        k[i][w] = 0;
        continue;
      }
      if (size[i - 1] <= w) {
        k[i][w] = Math.max(value[i - 1] + k[i - 1][w - size[i - 1]], k[i - 1][w]);
      } else {
        k[i][w] = k[i - 1][w];
      }
    }
    console.log(k);
  }
  return k[n][capacity];
}

console.log(dKnapsack(capacity, size, value, n));
