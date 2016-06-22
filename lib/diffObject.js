function diffObject(obj1, obj2) {
  var key1 = Object.keys(obj1);
  var key2 = Object.keys(obj2);
  if (key1.toString() !== key2.toString()) return false;
  var i;
  for (i = 0; i < key1.length; i++) {
    if ((typeof obj1[key1[i]] === 'object' &&
        typeof obj2[key1[i]] === 'object' &&
        diffObject(obj1[key1[i]], obj2[key1[i]]) ||
        (isNaN(obj1[key1[i]]) && isNaN(obj2[key1[i]])) ||
        (obj1[key1[i]] === obj2[key1[i]]))
      ) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

module.exports = diffObject;
