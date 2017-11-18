function Dictionary() {
  var data = {};

  this.add = function (key, value) {
    data[key] = value;
  };

  this.remove = function (key) {
    delete data[key];
  };

  this.find = function (key) {
    return data[key];
  };

  this.showAll = function () {
    Object.keys(data).forEach(function (key) {
      console.log(key + '--->' + data[key]);
    });
  };

  this.getValue = function () {
    return data;
  };

  this.count = function () {
    return Object.keys(data).length;
  };

  this.clear = function functionName() {
    data = {};
    return true;
  };
}

module.exports = Dictionary;
