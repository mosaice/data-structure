var Graph = require('./');

var graph = new Graph(6);
graph.addEdge(1, 2);
graph.addEdge(2, 5);
graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(0, 1);
graph.showGraph();
var sort = graph.topSort();
console.log(sort);
