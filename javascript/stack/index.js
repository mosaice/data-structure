function Stack() {
  var dataSource = [];
  var top = 0;

  this.clear = function () {
    top = 0;
  };

  this.length = function () {
    return top;
  };

  this.push = function (element) {
    dataSource[top++] = element;
  };

  this.pop = function () {
    return dataSource[--top];
  };

  this.peek = function () {
    return dataSource[top - 1];
  };

}

module.exports = Stack;
