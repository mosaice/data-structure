function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
};

function BST() {
  this.root = null;

  var remove = function (data, node) {
    if (node === null) return null;
    if (node.data === data) {
      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      var min = this.getMin(node.right);
      node.data = min;
      node.right = remove(min, node.right);
      return node;
    }
    if (data < node.data) {
      node.left = remove(data, node.left);
    }
    if (data > node.data) {
      node.right = remove(data, node.right);
    }
    return node;
  }.bind(this);

  this.insert = function (data) {
    var node = new Node(data, null, null);
    if (this.root === null) {
      this.root = node;
      return 'root';
    }

    var current = this.root;
    while (true) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = node;
          return 'left';
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = node;
          return 'right';
        }
        current = current.right;
      }
    }
  };

  this.inOrder = function (node) {
    if (node !== null) {
      this.inOrder(node.left);
      console.log(node.data);
      this.inOrder(node.right);
    }
  };

  this.perOrder = function (node) {
    if (node !== null) {
      console.log(node.data);
      this.inOrder(node.left);
      this.inOrder(node.right);
    }
  };

  this.postOrder = function (node) {
    if (node !== null) {
      this.inOrder(node.left);
      this.inOrder(node.right);
      console.log(node.data);
    }
  };

  this.getMin = function (node) {
    var current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  };

  this.getMax = function (node) {
    var current = node;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  };

  this.find = function (data) {
    var current = this.root;
    while (current !== null) {
      if (current.data === data) return current;

      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  };

  this.remove = function (data) {
    this.root = remove(data, this.root);
  };
}

module.exports = BST;
