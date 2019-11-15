/*
--- Day 3: Spiral Memory ---

You come across an experimental new kind of memory stored on an infinite two-dimensional grid.

Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

For example:

Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.
How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?
*/


const isInteger = num => (num - ~~num) === 0;
/*
for (var i = 1; i < 11; i++)
  console.log(`sqrt(${i}) = ${Math.sqrt(i)}; ringLevel = ${((Math.sqrt(i) + 1) / 2) - 1}`);
*/
const getNumSteps = (numToFind) => {
  console.log(`\nnumToFind: ${numToFind}`);
  if (numToFind === 1) return 0;

  const sqrt = Math.sqrt(numToFind);
  const ringLevel = ~~((sqrt + 1) / 2);
  console.log(`sqrt: ${sqrt}, ringLevel: ${ringLevel}`);

  // If the sqrt is an even integer and its an odd number
  // Then we know we're in the lower right corner
  // Which means we can calcualte the number of steps as (ringLevel * 2)
  if (isInteger(sqrt) && sqrt % 2 === 1) {
    // e.g. when numToFind === 1, 9, 25, 49, 81, etc.
    return ringLevel * 2;
  }

  const nearestSmallerSquare = (~~sqrt) ** 2;
  console.log(`nearestSmallerSquare ${nearestSmallerSquare}`);

  /*
    starting at the nearestSmallerSquare, we move one square horizontally right
    then we move up X number of blocks, where X = (~~sqrt) + 1, before turing

    NOTE: we know the ~~sqrt value will always be odd
  */
  const offsetFromNearestSquare = numToFind - nearestSmallerSquare;
  console.log(`offsetFromNearestSquare: ${offsetFromNearestSquare}`);
  let x = 0, y = 0;
  console.log(`sideLength = ${()}`)
  if (offsetFromNearestSquare <= ~~sqrt) {
    // const centerNum = nearestSmallerSquare + offsetFromNearestSquare + ~~(~~sqrt / 2);
    console.log(`ringLevel: ${ringLevel}`)
    const offset = offsetFromNearestSquare - ringLevel;
    x = ringLevel;
    // y = Math.abs(centerNum - numToFind);
    y = offset;
    console.log(`x, y: (${x}, ${y}); sum = ${Math.abs(x) + Math.abs(y)}`);
    return Math.abs(x) + Math.abs(y);
  }
  console.log(`x, y: (${x}, ${y}); sum = ${Math.abs(x) + Math.abs(y)}`);

  /*
  const ringLevelFirstNumber = (~~sqrt)**2 + 1;
  const ringLevelLastNumber = (~~sqrt + 2)**2 - 1;
  const range = ringLevelLastNumber - ringLevelFirstNumber;
  const offset = range * (ringLevel - ~~ringLevel)

  console.log(`sqrt: ${sqrt}`);
  console.log(`ringLevel: ${ringLevel}`);
  console.log(`ringLevelFirstNumber: ${ringLevelFirstNumber}`);
  console.log(`ringLevelLastNumber: ${ringLevelLastNumber}`);
  console.log(`range: ${range}`);
  console.log(`offset: ${offset}`);
  */
  console.log('\n');
  return 0;
};

// Sample tests
const assert = require('assert');
assert.strictEqual(getNumSteps(1), 0);
assert.strictEqual(getNumSteps(2), 1);
assert.strictEqual(getNumSteps(3), 2);
assert.strictEqual(getNumSteps(4), 1);
assert.strictEqual(getNumSteps(9), 2);
assert.strictEqual(getNumSteps(11), 2);
assert.strictEqual(getNumSteps(13), 3);
assert.strictEqual(getNumSteps(16), 3);
assert.strictEqual(getNumSteps(18), 3);
assert.strictEqual(getNumSteps(23), 2);
assert.strictEqual(getNumSteps(1024), 31);

// Real test
const data = require('./data');
console.log('Number of steps:', getNumSteps(data));
