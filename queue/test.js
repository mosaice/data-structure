var Queue = require('./index');

var queue = new Queue();

console.log(queue.empty());
queue.enqueue(1);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(1);
queue.enqueue(3);
queue.dequeue();
console.log('---');
console.log(queue.toString());
console.log('---');

queue.enqueue(9);

console.log(queue.back());
console.log(queue.front());
