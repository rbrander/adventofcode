const data = require('./data');


var floor = 0;
var firstBasementFloor = null;
for (var i=0; i < data.length; i++) {
  if (data[i] === '(') {
    floor++;
  } else if (data[i] === ')') {
    floor--;
    if (floor === -1 && firstBasementFloor === null) {
      firstBasementFloor = i + 1;
    }
  }
}

console.log('floor = ' + floor);
console.log('first basement floor happens at position: ' + firstBasementFloor);
