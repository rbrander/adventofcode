// Answer 1
/*
--- Day 6: Chronal Coordinates ---
The device on your wrist beeps several times, and once again you feel like you're falling.

"Situation critical," the device announces. "Destination indeterminate. Chronal interference detected. Please specify new target coordinates."

The device then produces a list of coordinates (your puzzle input). Are they places it thinks are safe or dangerous? It recommends you check manual page 729. The Elves did not give you a manual.

If they're dangerous, maybe you can minimize the danger by finding the coordinate that gives the largest distance from the other points.

Using only the Manhattan distance, determine the area around each coordinate by counting the number of integer X,Y locations that are closest to that coordinate (and aren't tied in distance to any other coordinate).

Your goal is to find the size of the largest area that isn't infinite. For example, consider the following list of coordinates:

1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
If we name these coordinates A through F, we can draw them on a grid, putting 0,0 at the top left:

..........
.A........
..........
........C.
...D......
.....E....
.B........
..........
..........
........F.
This view is partial - the actual grid extends infinitely in all directions. Using the Manhattan distance, each location's closest coordinate can be determined, shown here in lowercase:

aaaaa.cccc
aAaaa.cccc
aaaddecccc
aadddeccCc
..dDdeeccc
bb.deEeecc
bBb.eeee..
bbb.eeefff
bbb.eeffff
bbb.ffffFf
Locations shown as . are equally far from two or more coordinates, and so they don't count as being closest to any.

In this example, the areas of coordinates A, B, C, and F are infinite - while not shown here, their areas extend forever outside the visible grid. However, the areas of coordinates D and E are finite: D is closest to 9 locations, and E is closest to 17 (both including the coordinate's location itself). Therefore, in this example, the size of the largest area is 17.

What is the size of the largest area that isn't infinite?
*/
const { COORDINATE_REGEX } = require('./constants');
const { getManhattenDistance } = require('./utils');
const testData = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;
const data = require('./data');
const lines = data.split('\n');
const coordinateFromLine = (line) => {
  const [_coordinate, x, y] = line.match(COORDINATE_REGEX)
  return { x: Number(x), y: Number(y) };
}
const coordinates = lines.map(coordinateFromLine);

// ASSUMPTION: four outer most corners would have infite area; thus only points inside that box can be finite
// ASSUMPTOIN: coordinates will always be positive (lowest is 0, 0)

const firstCoordinate = coordinates[0];
let minX = firstCoordinate.x, minY = firstCoordinate.y;
let maxX = firstCoordinate.x, maxY = firstCoordinate.y;
coordinates.forEach(coordinate => {
  // x
  if (minX > coordinate.x) {
    minX = coordinate.x;
  }
  if (maxX < coordinate.x) {
    maxX = coordinate.x;
  }
  // y
  if (minY > coordinate.y) {
    minY = coordinate.y;
  }
  if (maxY < coordinate.y) {
    maxY = coordinate.y;
  }
});

console.log(JSON.stringify(coordinates, undefined, 2));
console.log('num coordinates =', coordinates.length);
// console.log(`min (${minX}, ${minY})`);
// console.log(`max (${maxX}, ${maxY})`);

// Minimums act as a padding around the working area
const fieldWidth = maxX + minX;
const fieldHeight = maxY + minY;

// field[23][43] = { shortestIndex: 'many', distance: 22, hasMultiple: true }
const field = new Array(fieldWidth).fill()
  .map(() => new Array(fieldHeight).fill({}));

for (let x = 0; x < fieldWidth; x++) {
  for (let y = 0; y < fieldHeight; y++) {
    const currCoordinate = { x, y };
    const coordinateDistances = [];
    for (let idx in coordinates) {
      coordinateDistances.push({
        idx,
        distance: getManhattenDistance(currCoordinate, coordinates[idx]),
        pos: coordinates[idx]
      });
    }
    // TODO: iterate over coordinate distance to determine:
    // 1) minimum distance
    // 2) how many have same distance
    // 3) index of smallest distance (unless more than 1)
    // Then store the result in the field array
    const minDistance = coordinateDistances
      .map(x => x.distance)
      .reduce((min, curr) => (curr < min ? curr : min));
    const matchingIndicies = coordinateDistances
      .filter(x => x.distance === minDistance)
      .map(x => x.idx);
    const hasMany = matchingIndicies.length > 1;
    field[x][y] = (hasMany ? '.' : matchingIndicies[0]);
  }
}

const drawField = (x1, y1, x2, y2) => {
  const uniqueIdx = new Set();
  for (let x = x1; x < x2; x++) {
    for (let y = y1; y < y2; y++) {
      uniqueIdx.add(field[x][y]);
    }
  }
  console.log('uniqueIdx\n', JSON.stringify(uniqueIdx));
};

drawField(40, 40, 50, 50);

// TODO: remove infinite areas
// iterate around the perimeter of the area from minX, minY to maxX, maxY
// use a set to collect all the values
// iterate over the set and convert all those '.' (hasMany) block, so it's ignored





