const data = require('./data');

function calcArea(x, y, z) {
  return 2*x*y + 2*y*z + 2*x*z;
}

function smallest(a, b, c) {
  if (a <= b && a <= c) return a;
  if (b <= a && b <= c) return b;
  if (c <= a && c <= b) return c;
}

function calcNeededArea(x, y, z) {
  const area = calcArea(x, y, z);
  const smallestArea = smallest(x * y, y * z, x * z);
  return area + smallestArea;
}

function calcNeededRibbon(x, y, z) {
  var volume = x * y * z;
  var smallestPerimeter = smallest(x + y, y + z, x + z) * 2;
  return volume + smallestPerimeter;
}

function parseData() {
  const dataItems = data.split(/\s+/);
  const dimensionRegex = /(\d+)x(\d+)x(\d+)/;

  var totalArea = 0;
  var totalRibbon = 0;
  for (var i = 0; i < dataItems.length; i++) {
    var currItem = dataItems[i];
    if (!dimensionRegex.test(currItem))
      continue;
    var matches = dimensionRegex.exec(currItem);
    var x = parseInt(matches[1]);
    var y = parseInt(matches[2]);
    var z = parseInt(matches[3]);
    var area = calcNeededArea(x, y, z);
    var ribbon = calcNeededRibbon(x, y ,z);
    totalRibbon += ribbon
    totalArea += area;
  }

  console.log('needed area of wrapping paper: ' + totalArea + ' sqft');
  console.log('needed ribbon: ' + totalRibbon + ' ft');
}

parseData();
