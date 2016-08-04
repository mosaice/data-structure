var Graph = require('./');

var graph = new Graph(5);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);
graph.newbfs(0);
var vertex = 4;
var path = graph.pathTo(vertex);

while (path.length > 0) {
  console.log(path.pop() + '-');
}
