const data = require('./data');

function Home(x, y) {
  this.x = x;
  this.y = y;
  this.gifts = 1;
};

var Houses = [];
var firstHouse = new Home(0, 0);
firstHouse.gifts++; // because RoboSanta drops a gift too
Houses.push(firstHouse);

var Santa = { x: 0, y: 0 }
var RoboSanta = { x: 0, y: 0}
for (var i = 0; i < data.length; i++) {
  var dir = data[i];
  var who = (i%2==0) ? Santa : RoboSanta;
  switch (dir) {
    case '^':
      who.y++;
      break;
    case '>':
      who.x++;
      break;
    case 'v':
      who.y--;
      break;
    case '<':
      who.x--;
      break;
    default:
      break;
  }
  // see if a house already exists at this location
  var foundHome = Houses.filter((h) => {
    if (h.x == who.x && h.y == who.y)
      return h;
  });
  if (foundHome !== undefined && foundHome.length > 0) {
    foundHome[0].gifts++;
  } else {
    Houses.push(new Home(who.x, who.y));
  }
}

console.log('Num houses visted: ' + Houses.length);
