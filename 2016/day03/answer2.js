/*
--- Day 3: Squares With Three Sides ---

Now that you can think clearly, you move deeper into the labyrinth of hallways and office furniture that makes up this part of Easter Bunny HQ. This must be a graphic design department; the walls are covered in specifications for triangles.

Or are they?

The design document gives the side lengths of each triangle it describes, but... 5 10 25? Some of these aren't triangles. You can't help but mark the impossible ones.

In a valid triangle, the sum of any two sides must be larger than the remaining side. For example, the "triangle" given above is impossible, because 5 + 10 is not larger than 25.

In your puzzle input, how many of the listed triangles are possible?

--- Part Two ---

Now that you've helpfully marked up their design documents, it occurs to you that triangles are specified in groups of three vertically. Each set of three numbers in a column specifies a triangle. Rows are unrelated.

For example, given the following specification, numbers with the same hundreds digit would be part of the same triangle:

101 301 501
102 302 502
103 303 503
201 401 601
202 402 602
203 403 603

In your puzzle input, and instead reading by columns, how many of the listed triangles are possible?

*/

const data = require('./data');
// Each line is three numbers, within 5 characters, totallying 15 characters: e.g. "    4   21  894"
const lines = data.split('\n');
const originalNumbers = lines.map(line => {
  const regex = /^\s+(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})$/;
  const matches = line.match(regex);
  const result = [ parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3], 10)];
  return result;
});

// There is a total of 1908 lines of data, which means 636 vertical groupings (1908/3)

// It would be really helpful if we could translate the numbers into sets like in answer1
// Given three sets, a new collection of three sets will be returns
const transposeNumberSet = (numberSets) => ([
  [numberSets[0][0], numberSets[1][0], numberSets[2][0]],
  [numberSets[0][1], numberSets[1][1], numberSets[2][1]],
  [numberSets[0][2], numberSets[1][2], numberSets[2][2]],
]);
const numbers = [];
for (var i = 0; i < originalNumbers.length; i += 3) {
  const numberSet = [
    originalNumbers[i + 0], 
    originalNumbers[i + 1], 
    originalNumbers[i + 2]
  ];
  const transposedNumberSet = transposeNumberSet(numberSet);
  numbers.push(transposedNumberSet[0]);
  numbers.push(transposedNumberSet[1]);
  numbers.push(transposedNumberSet[2]);
}

// In a valid triangle, the sum of any two sides must be larger than the remaining side.
const isValidTriangle = (sides) => (
  ((sides[0] + sides[1]) > sides[2]) && 
  ((sides[1] + sides[2]) > sides[0]) && 
  ((sides[2] + sides[0]) > sides[1])
);

// filter out the ones that have the first two numbers larger than the last
const validTriangles = numbers.filter(numberSet => isValidTriangle(numberSet));

console.log(numbers);

console.log(validTriangles);
console.log('\nTotal: ' + validTriangles.length);

// Answer: 1836
