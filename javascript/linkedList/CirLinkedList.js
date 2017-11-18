function Node(element) {
  this.element = element;
  this.next = null;
}

function CirLinkedList() {
  var head = new Node('head');
  head.next = head;
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
    currNode.next = newNode;
  };

  this.display = function () {
    var currNode = head;

    while (currNode.next !== null && currNode.next.element !== 'head') {
      console.log(currNode.element);
      currNode = currNode.next;
    }
    console.log(currNode.element);
  };

  this.findFirst = function () {
    return head;
  };

  this.findPrevious = function (item) {
    var currNode = head;
    while (currNode.next !== null && currNode.next.element !== item) {
      currNode = currNode.next;
    }
    return currNode;
  };

  this.remove = function (item) {
    var prevNode = this.findPrevious(item);
    prevNode.next = prevNode.next === null ? null : prevNode.next.next;
  };

}

module.exports = CirLinkedList;
