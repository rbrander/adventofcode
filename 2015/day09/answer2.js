/*
--- Part Two ---

The next year, just to show off, Santa decides to take the route with the longest distance instead.

He can still start and end at any two (different) locations he wants, and he still must visit each location exactly once.

For example, given the distances above, the longest route would be 982 via (for example) Dublin -> London -> Belfast.

What is the distance of the longest route?
*/

const data = require('./data');
// const data = require('./testData');
const dataItems = data.split('\n');
const itemRegex = /(\w+) to (\w+) = (\d+)/;

// create items from data
const items = dataItems.map((item) => {
  const matches = itemRegex.exec(item);
  return {
    from: matches[1],
    to: matches[2],
    distance: parseInt(matches[3])
  };
})

// make a distinct list of places
const uniquePlaces = items.reduce((arr, curr) => {
  if (arr.indexOf(curr.from) == -1) {
    arr.push(curr.from);
  }
  if (arr.indexOf(curr.to) == -1) {
    arr.push(curr.to);
  }
  return arr;
}, [])

// recursively figure out all combinations of source to dest
function buildPaths(remainingPlaces, travelledPlaces) {
  if (remainingPlaces.length === 0)
    return travelledPlaces;

  return remainingPlaces.map(place =>
    buildPaths(remainingPlaces.filter(p => p != place),
      travelledPlaces.concat(place))
  );
}

const calcDistance = (distances, path) => {
  let distance = 0;
  for (let pathIndex = 0; path.length > 1 && pathIndex < path.length - 1; pathIndex++) {
    const from = path[pathIndex];
    const to = path[pathIndex + 1]
    distance += distances.reduce((distance, node) =>
      ((node.from === from && node.to === to)||(node.from === to && node.to === from)) ? node.distance : distance
    , 0)
  }
  return distance;
}

/*

Dublin -> London -> Belfast = 982
London -> Dublin -> Belfast = 605
London -> Belfast -> Dublin = 659
Dublin -> Belfast -> London = 659
Belfast -> Dublin -> London = 605
Belfast -> London -> Dublin = 982
The shortest of these is London -> Dublin -> Belfast = 605, and so the
answer is 605 in this example.
*/

//////////////////////////////////////////

const paths = buildPaths(uniquePlaces, []).flat(uniquePlaces.length - 1);
console.log('num paths =', paths.length); // 40320

const bestPath = paths.reduce((bestPath, path) =>
  calcDistance(items, bestPath) > calcDistance(items, path) ? bestPath : path
)
console.log('best path: ', bestPath);
/*
[
  'Snowdin',
  'Tambi',
  'Norrath',
  'AlphaCentauri',
  'Straylight',
  'Arbre',
  'Faerun',
  'Tristram'
]
*/
console.log('distance: ', calcDistance(items, bestPath)) // 898
