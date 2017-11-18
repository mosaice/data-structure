var BST = require('./');

var bst = new BST();

bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(3);
bst.insert(99);
bst.insert(22);
bst.insert(70);

// console.log(bst.root);

// bst.inOrder(bst.root);
// console.log('perOrder');
// bst.perOrder(bst.root);
// console.log('postOrder');
// bst.postOrder(bst.root);
//
// console.log('---');
// console.log(bst.getMin(bst.root));
// console.log(bst.getMax(bst.root));
//
// console.log('-+-=_+-');
// console.log(bst.find(16));

// console.log(JSON.stringify(bst.root));
bst.remove(45);
bst.remove(100);
console.log(JSON.stringify(bst.root));
