var LinkedList = require('./CirLinkedList');

var peopleCirle = new LinkedList();
var killCount = 0;
var num = 41;
var currNode = peopleCirle.findFirst().next;

peopleCirle.insert(1, 'head');
for (var i = 2; i < num + 1; i++) {
  peopleCirle.insert(i, i - 1);
}

console.log('start');

while (num !== 2) {
  killCount++;
  if (currNode.next.element === 'head') {
    currNode = currNode.next.next;
  } else {
    currNode = currNode.next;
  }
  if (killCount === 3) {
    peopleCirle.remove(currNode.element);
    num--;
    killCount = 0;
  }
}

peopleCirle.display();
