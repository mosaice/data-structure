function Set() {
  var data = [];

  this.add = function (item) {
    if (~data.indexOf(item)) return false;
    data.push(item);
    return true;
  };

  this.remove = function (item) {
    var pos = data.indexOf(item);
    if (!~pos) return false;
    data.splice(pos, 1);
    return true;
  };

  this.show = function () {
    return data;
  };

  this.size = function () {
    return data.length;
  };

  this.contain = function (item) {
    if (~data.indexOf(item)) return true;
    return false;
  };

  this.union = function (set) {
    var tempSet = new Set();
    var setData = set.show();

    data.forEach(function (item) {
      tempSet.add(item);
    });

    for (var i = 0; i < setData.length; i++) {
      if (!this.contain(setData[i])) tempSet.add(setData[i]);
    }

    return tempSet;
  };

  this.intersect = function (set) {
    var tempSet = new Set();
    var setData = set.show();
    for (var i = 0; i < setData.length; i++) {
      if (this.contain(setData[i])) tempSet.add(setData[i]);
    }
    return tempSet;
  };

  this.subset = function (set) {
    if (this.size() > set.size()) return false;
    for (var i = 0; i < data.length; i++) {
      if (!set.contain(data[i])) return false;
    }
    return true;
  };

  this.difference = function (set) {
    var tempSet = new Set();
    var setData = set.show();
    for (var i = 0; i < setData.length; i++) {
      if (!this.contain(setData[i])) tempSet.add(setData[i]);
    }
    return tempSet;
  };
}

module.exports = Set;
