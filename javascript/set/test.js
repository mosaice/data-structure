var Set = require('./');

var set1 = new Set();

set1.add('haha');
set1.add('xixi');
set1.add('hehe');
set1.add('haha');

console.log(set1.show().toString());

var set2 = new Set();

set2.add('hehe');
set2.add('momo');
set2.add('caca');
set2.add('jiji');
set2.add('haha');

set2.remove('haha');

console.log(set2.show().toString());

var set3 = set1.union(set2);

console.log(set3.show().toString());

var set4 = set1.intersect(set2);

console.log(set4.show().toString());

var sub1 = set1.subset(set2);
var sub2 = set4.subset(set2);

console.log(sub1, sub2);

var set5 = set1.difference(set2);

console.log(set5.show().toString());
