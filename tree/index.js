function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
};

function BST() {
  this.root = null;

  var insert = function (newNode, node) {
    if (node === null) {
      node = newNode;
      return node;
    }

    if (newNode.data < node.data) {
      insert(newNode, node.left);
    } else {
      insert(newNode, node.right);
    }
  }.bind(this)

  this.insert = function (data) {
    var node = new Node(data, null, null);
    insert(node, this.root);
    console.log(this.root);
  };

  this.inOrder = function (node) {
    if (node !== null) {
      this.inOrder(node.left);
      console.log(node.data);
      this.inOrder(node.right);
    }
  };
}

module.exports = BST;
