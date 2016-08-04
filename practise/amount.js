var money = [1, 5, 10, 25, 50];

function exchange(acount, type) {
  if (type === 0) return 0;
  if (acount === 0) return 1;
  if (acount < 0) return 0;
  return exchange(acount, type - 1) + exchange(acount - money[type - 1], type);
}

var all = exchange(100, 5);

console.log(all);
