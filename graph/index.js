function Graph(v) {
  var vertices = v;
  var edges = 0;
  var adj = [];
  var marked = [];
  var edgeTo = [];
  for (var i = 0; i < vertices; i++) {
    adj[i] = [];
    marked[i] = false;
  }

  this.addEdge = function (v, w) {
    if (!adj[v] || !adj[w]) throw new Error('vertice not found');
    adj[v].push(w);
    adj[w].push(v);
    edges++;
  };

  this.showGraph = function () {
    for (var i = 0; i < vertices; i++) {
      console.log('' + i + '--->');
      adj[i].forEach(function (adjItem) {
        if (adjItem !== undefined) console.log(adjItem);
      });
    }
  };

  this.dfs = function (v) {
    marked[v] = true;
    if (adj[v] !== undefined) console.log('Visited ' + v);
    adj[v].forEach(function (value) {
      if (!marked[value]) this.dfs(value);
    }.bind(this));
  };

  this.bfs = function (v) {
    var queue = [];
    marked[v] = true;
    queue.push(v);
    while (queue.length > 0) {
      var h = queue.shift();
      if (h !== undefined) console.log('Visited ' + h);
      adj[h].forEach(function (value) {
        if (!marked[value]) {
          marked[value] = true;
          queue.push(value);
        }
      });
    }
  };

  this.newbfs = function (v) {
    var queue = [];
    marked[v] = true;
    queue.push(v);
    while (queue.length > 0) {
      var h = queue.shift();
      if (h !== undefined) console.log('Visited ' + h);
      adj[h].forEach(function (value) {
        if (!marked[value]) {
          edgeTo[value] = h;
          marked[value] = true;
          queue.push(value);
        }
      });
    }
  };

  this.pathTo = function (v) {
    var source = 0;
    if (!marked[v]) return undefined;
    var path = [];
    var tempV = v;
    while (tempV !== source) {
      path.push(tempV);
      tempV = edgeTo[tempV];
    }
    path.push(source);
    return path;
  };

  this.topSort = function () {
    var v = 0;
    var queue = [];
    var topQ = [];
    marked[v] = true;
    queue.push(v);
    topQ.push(v);
    while (queue.length > 0) {
      var h = queue.shift();
      console.log(h);
      if (h !== undefined) console.log('Visited ' + h);
      adj[h].forEach(function (value) {
        if (!marked[value]) {
          marked[value] = true;
          queue.push(value);
          topQ.push(value);
        }
      });
    }
    return topQ;
  };
}

module.exports = Graph;
