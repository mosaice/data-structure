function HashTable(hash) {
  var table = {};
  this.hash = hash || simpleHash;

  this.put = function (data) {
    var key = this.hash(data);
    table[key] = data;
  };

}

function simpleHash(data) {
  var total = 0;
  for (var i = 0; i < data.length; i++) {
    total += data.charCodeAt(i);
  }
  return total % 137;
}

function betterHash(data) {
  var total = 0;
  var H = 37;
  for (var i = 0; i < data.length; i++) {
    total += H * total + data.charCodeAt(i);
  }
  return total % 137;
}

module.exports = HashTable;
