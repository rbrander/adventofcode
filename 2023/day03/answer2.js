/*
--- Part Two ---

The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.

You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.

Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.

The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

Consider the same engine schematic again:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..

In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.

What is the sum of all of the gear ratios in your engine schematic?
*/

// groupBy is a polyfill for Object.groupBy() as it is only available in node v21+
const { groupBy } = require('./groupBy.js');

const data = require('./data')
// const data = require('./testData')
const lines = data.split('\n');
const grid = lines.map(line => line.split(''));

const findNumbers = (line) => {
  const numberRegex = /(?<number>\d+)/g;
  const results = [];
  const matches = line.matchAll(numberRegex);
  for (let match of matches) {
    results.push({ numStr: match.groups.number, startIndex: match.index });
  }
  return results;
};

const isSymbol = (char) => char === '*';

const hasSymbolNearNumber = (numStr, x, y) => {
  // check positions:
  // x - 1 -> x + numStr.length + 1, y - 1
  // x - 1, y
  // x + numStr.length + 1, y
  // x - 1 -> x + numStr.length + 1, y + 1

  const symbolRegex = /[\*]/g
  const foundPositions = [];
 // line above
  if (y - 1 >= 0) {
    const lineAbove = lines[y - 1].slice(Math.max(x - 1, 0), Math.min(x + numStr.length + 1, lines[y - 1].length - 1));
    const foundPositionsInLineAbove = Array.from(lineAbove.matchAll(symbolRegex))
      .map(match => ({ numStr, x: Math.max(x - 1, 0) + match.index, y: y - 1}));
    foundPositions.push(...foundPositionsInLineAbove);
  }
  // check before and after on current line
  if (x - 1 >= 0 && isSymbol(grid[y][x - 1])) {
    foundPositions.push({ numStr, x: x - 1, y });
  }
  if (x + numStr.length < lines[y].length && isSymbol(grid[y][x + numStr.length])) {
    foundPositions.push({ numStr, x: x + numStr.length, y });
  }
  // line below
  if (y + 1 < lines.length) {
    const lineBelow = lines[y + 1].slice(Math.max(x - 1, 0), Math.min(x + numStr.length + 1, lines[y + 1].length - 1));
    const foundPositionsInLineBelow = Array.from(lineBelow.matchAll(symbolRegex))
      .map(match => ({ numStr, x: Math.max(x - 1, 0) + match.index, y: y + 1}));
    foundPositions.push(...foundPositionsInLineBelow);
  }
  return foundPositions;
};

////////////////////////////////////////////////////

const validNumbers = [];
// find all the numbers with a symbol next to them
/*
e.g.
validNumbers (5): [
  {"numStr":"467","x":3,"y":1},
  {"numStr":"35","x":3,"y":1},
  {"numStr":"617","x":3,"y":4},
  {"numStr":"755","x":5,"y":8},
  {"numStr":"598","x":5,"y":8}
]
*/
for (let y = 0; y < lines.length; y++) {
  const numbers = findNumbers(lines[y]);
  for (let number of numbers) {
    validNumbers.push(...hasSymbolNearNumber(number.numStr, number.startIndex, y));
  }
}

// now find pairs of coordinates by grouping by it
const numberGroups = groupBy(validNumbers, ({ x, y }) => JSON.stringify({ x, y }));
/*
numberGroups =
{
  '{"x":3,"y":1}': [ { numStr: '467', x: 3, y: 1 }, { numStr: '35', x: 3, y: 1 } ],
  '{"x":3,"y":4}': [ { numStr: '617', x: 3, y: 4 } ],
  '{"x":5,"y":8}': [ { numStr: '755', x: 5, y: 8 }, { numStr: '598', x: 5, y: 8 } ]
}
*/

// iterate over the values; if the length is 2 (we have a pair!), calculate the ratio
// otherwise return 0 so we can them sum all the values
const ratios = Object.values(numberGroups).map(matches => {
  if (matches.length !== 2) {
    return 0;
  }
  return Number(matches[0].numStr) * Number(matches[1].numStr);
});

// get the sum
const sum = ratios.reduce((sum, curr) => sum + curr);
console.log('sum:', sum);
