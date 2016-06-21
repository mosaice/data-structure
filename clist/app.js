function List() {
  var dataSource = [];
  if (arguments) {
    console.log(arguments);
    dataSource = arguments;
  }
  return dataSource;
}

List(1, 2, 3);
