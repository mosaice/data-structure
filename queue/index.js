function Queue() {
  var dataSource = [];

  this.length = function () {
    return dataSource.length;
  };

  this.enqueue = function (element) {
    dataSource.push(element);
  };

  this.dequeue = function () {
    return dataSource.shift();
  };

  this.front = function () {
    return dataSource[0];
  };

  this.back = function () {
    return dataSource[dataSource.length - 1];
  };

  this.toString = function () {
    return dataSource.toString().replace(/\,/g, '\n');
  };

  this.empty = function () {
    return dataSource.length === 0;
  };

}

module.exports = Queue;
