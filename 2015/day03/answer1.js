const data = require('./data');

function Home(x, y) {
  this.x = x;
  this.y = y;
  this.gifts = 1;
};

var Houses = [];
Houses.push(new Home());

var currX = 0;
var currY = 0;
for (var i = 0; i < data.length; i++) {
  var dir = data[i];
  switch (dir) {
    case '^':
      currY++;
      break;
    case '>':
      currX++;
      break;
    case 'v':
      currY--;
      break;
    case '<':
      currX--;
      break;
    default:
      break;
  }
  // see if a house already exists at this location
  var foundHome = Houses.filter((h) => {
    if (h.x == currX && h.y == currY)
      return h;
  });
  if (foundHome !== undefined && foundHome.length > 0) {
    foundHome[0].gifts++;
  } else {
    Houses.push(new Home(currX, currY));
  }
}

console.log('Num houses visted: ' + Houses.length);
