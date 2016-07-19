var Stack = require('./index');

function mulBase(num, base) {
  var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  var s = new Stack();
  var converted = '';
  do {
    s.push(num % base);
    num = Math.floor(num / base);
  } while (num > 0);

  while (s.length() > 0) {
    converted += (base === 16 ? hex[s.pop()] : s.pop());
  }
  return converted;
}

console.log(mulBase(100, 2));
console.log(mulBase(100, 16));
console.log(mulBase(12312313145345345, 16));
