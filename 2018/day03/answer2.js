/*
--- Part Two ---
Amidst the chaos, you notice that exactly one claim doesn't overlap by even a single square inch of fabric with any other claim. If you can somehow draw attention to it, maybe the Elves will be able to make Santa's suit after all!

For example, in the claims above, only claim 3 is intact after all claims are made.

What is the ID of the only claim that doesn't overlap?
*/
const LINE_REGEX = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;
const parseLine = (line) => {
  // line looks like: "#1136 @ 600,544: 13x25"
  const [_, ID, x, y, w, h] = line.match(LINE_REGEX).map(Number);
  const [x2, y2] = [x+w, y+h];
  return { ID, x, y, x2, y2, w, h };
};
const data = require('./data');
const lines = data.split('\n')
const claims = lines.map(parseLine);


// Set all the visiting squares to the ID of the visitor
const visited = claims.reduce((visited, curr) => {
  // iterate over the area, adding to `visited`
  for (var x = curr.x; x < curr.x2; x++) {
    for (var y = curr.y; y < curr.y2; y++) {
      const key = `(${x},${y})`;
      if (key in visited) {
        visited[key].push(curr.ID);
      } else {
        visited[key] = [curr.ID];
      }
    }
  }
  return visited;
}, {});

// Check the visited location IDs to find which one doesn't overlap
// key:value pair, where key = (x, y) and value = [id1, id2...]
const nonOverlappingID = claims.reduce((foundID, curr) => {
  // iterate over all the squares for this current record
  let detectedOverlap = false;
  for (var x = curr.x; x < curr.x2; x++)
    for (var y = curr.y; y < curr.y2; y++)
      detectedOverlap |= (visited[`(${x},${y})`].length > 1);
  return detectedOverlap ? foundID : curr.ID;
}, 0);

console.log('ID of non-overlapping:', nonOverlappingID); // 1097
