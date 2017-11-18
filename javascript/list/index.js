var diffObject = require('../lib/diffObject');

function List() {
  var dataSource = [];
  var pos = 0;

  if (arguments.length > 0) {
    [].forEach.call(arguments, function (v, i) {
      dataSource[i] = v;
    });
  }

  this.clear = function () {
    dataSource = [];
  };

  this.length = function () {
    return dataSource.length;
  };

  this.curPos = function () {
    return pos;
  };

  this.toString = function () {
    return JSON.stringify(dataSource);
  };

  this.getElement = function () {
    return dataSource[pos];
  };

  this.insert = function (elem) {
    dataSource.splice(pos++, 0, elem);
    return pos;
  };

  this.append = function (elem) {
    dataSource.push(elem);
    return this.length();
  };

  this.find = function (elem) {
    var i;
    for (i = 0; i < this.length(); i++) {
      if (typeof elem === 'object' && typeof dataSource[i] === 'object' && diffObject(elem, dataSource[i])) return i;
      if (isNaN(elem) && isNaN(dataSource[i])) return i;
      if (dataSource[i] === elem) return i;
    }
    return -1;
  };

  this.remove = function (elem) {
    var _pos = this.find(elem);
    if (~_pos) {
      dataSource.splice(_pos, 1);
      if (pos > this.length - 1) {
        pos = this.length - 1;
      }
      return true;
    }
    return false;
  };

  this.front = function () {
    pos = 0;
  };

  this.end = function () {
    pos = this.length() - 1 ;
  };

  this.prev = function () {
    if (pos > 0) {
      pos--;
      return true;
    }
    return false;
  };

  this.next = function () {
    if (pos < this.length() - 1) {
      pos++;
      return true;
    }
    return false;
  };

  this.moveTo = function (i) {
    if (i >= 0 && i <= this.length() - 1) {
      pos = i;
      return true;
    }
    return false;
  };
}

module.exports = List;
