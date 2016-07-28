var BST = require('./');

var bst = new BST();

bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(3);
bst.insert(99);
bst.insert(22);

// console.log(bst.root);

bst.inOrder(bst.root);
