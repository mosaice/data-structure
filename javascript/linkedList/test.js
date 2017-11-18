var LinkedList = require('./CirLinkedList');

var cities = new LinkedList();

cities.insert('beijing', 'head');
cities.insert('shanghai', 'beijing');
cities.insert('guangzhou', 'shanghai');
cities.insert('shenzhen', 'guangzhou');

cities.display();

cities.remove('shanghai');
console.log('---');
cities.display();
cities.remove('shenzhen');
console.log('---');
cities.display();

console.log(cities.findPrevious(null));
