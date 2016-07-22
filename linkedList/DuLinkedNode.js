function Node(element) {
  this.element = element;
  this.next = null;
  this.previous = null;
}

function DuLinkedList(element) {
  var head = new Node(element !== undefined ? element : 'head');

  this.find = function (item) {
    var currNode = head;
    while (currNode.element !== item) {
      currNode = currNode.next;
    }
    return currNode;
  };

  this.insert = function (element, item) {
    var newNode = new Node(element);
    var currNode = this.find(item);
    newNode.next = currNode.next;
    newNode.previous = currNode;
    currNode.next = newNode;
  };

  this.display = function () {
    var currNode = head;
    while (currNode.next !== null) {
      console.log(currNode.element);
      currNode = currNode.next;
    }
    console.log(currNode.element);
  };

  this.findLast = function () {
    var currNode = head;
    while (currNode.next !== null) {
      currNode = currNode.next;
    }
    return currNode;
  };

  this.displayReverse = function () {
    var lastNode = this.findLast();
    while (lastNode.previous !== null) {
      console.log(lastNode.element);
      lastNode = lastNode.previous;
    }
    console.log(lastNode.element);
  };

  this.remove = function (item) {
    var currNode = this.find(item);
    if (currNode.previous !== null) currNode.previous.next = currNode.next;
    if (currNode.next !== null) currNode.next.previous = currNode.previous;
  };

}

module.exports = DuLinkedList;
