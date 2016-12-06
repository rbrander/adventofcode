/*
--- Day 3: Squares With Three Sides ---

Now that you can think clearly, you move deeper into the labyrinth of hallways and office furniture that makes up this part of Easter Bunny HQ. This must be a graphic design department; the walls are covered in specifications for triangles.

Or are they?

The design document gives the side lengths of each triangle it describes, but... 5 10 25? Some of these aren't triangles. You can't help but mark the impossible ones.

In a valid triangle, the sum of any two sides must be larger than the remaining side. For example, the "triangle" given above is impossible, because 5 + 10 is not larger than 25.

In your puzzle input, how many of the listed triangles are possible?
*/

const data = require('./data');
// Each line is three numbers, within 5 characters, totallying 15 characters: e.g. "    4   21  894"
const lines = data.split('\n');
const numbers = lines.map(line => {
  const regex = /^\s+(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})$/;
  const matches = line.match(regex);
  const result = [ parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3], 10)];
  return result;
});

// In a valid triangle, the sum of any two sides must be larger than the remaining side.
const isValidTriangle = (sides) => (
  ((sides[0] + sides[1]) > sides[2]) && 
  ((sides[1] + sides[2]) > sides[0]) && 
  ((sides[2] + sides[0]) > sides[1])
);

// filter out the ones that have the first two numbers larger than the last
const validTriangles = numbers.filter(numberSet => isValidTriangle(numberSet));

console.log(validTriangles);
console.log('\nTotal: ' + validTriangles.length);

// Answer: 983
