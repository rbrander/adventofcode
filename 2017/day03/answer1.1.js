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

const getNumSteps = (numToFind) => {
  console.log(`\nnumToFind: ${numToFind}\n`);


  const memory = []; // an array of objects
  // e.g. { value: 1, x: 0, y: 0 }
  let ringLevel = 1;
  let x = 0;
  let y = 0;
  console.log('i     sqrt  ringLevel  size  offset  side  sideOffset');
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  memory.push({ value: 1, x: 0, y: 0 });
  console.log(` ${1}) = (${x}, ${y})`);
  for (var i = 1; i <= 5; i++) {
    const sqrt = Math.sqrt(i);
    const size = ((ringLevel * 2) + 1);
    const offset = i - (((size - 2) ** 2) + 1); // from last ring level
    const side = ~~(offset / size); // number between 0 and 3
    const sideOffset = (offset % size)
    console.log(
      ('00'+i).substr(-2), '  ',
      sqrt.toFixed(2), '     ',
      ringLevel, '     ',
      size, '    ',
      offset, '    ',
      side, '    ',
      sideOffset
    );


    if (side === 0) {
      console.log('y inc');
      y++;
    } else if (side === 2) {
      console.log('y dec');
      y--;
    } else if (side === 1) {
      console.log('x dec');
      x--;
    } else if (side === 3) {
      console.log('x inc');
      x++;
    }

    const isLastOfRingLevel = (isInteger(sqrt) && ((sqrt % 2) === 1));
    if (isLastOfRingLevel) {
      console.log(' ---');
      ringLevel++;
    }

    console.log(` ${i}) = (${x}, ${y})`);
    memory.push({ value: i, x, y });

    if (isLastOfRingLevel) {
      x++;
    }
    /*
    let newX = 0;
    let newY = 0;
    if (isInteger(sqrt) && ((sqrt % 2) === 1)) {
      ringLevel++;
      // new position = previous position (x, y) plus 1 on the x
      const prev = memory[memory.length - 1];
      newX = prev ? prev.x + 1 : 0;
      newY = prev ? prev.y : 0;
      console.log('  -- based on prev');
    } else {
      const side = ~~(offset / size); // number between 0 and 3
      // when the side is odd, the y is static
      // and when the side is even, the x is static
      const isEven = ((side % 2) === 0);
      newX = isEven ? ringLevel * ((side - ~~(size / 2)) * -1) : ringLevel;
      newY = isEven ? ringLevel * ((offset % size) - ~~(size / 2)) : ringLevel;
    }
    console.log('  ', JSON.stringify({ value: i, x: newX, y: newY }));
    memory.push({ value: i, x: newX, y: newY });
  */
  }

  // determine how many squares are in this level
  // if we haven't traversed the whole ring, add the next one
  // else if we have, go to the next ring level

  console.log('\n');
  return 0;
};

getNumSteps(3);

// Sample tests
const assert = require('assert');
/*
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
console.log('done');
*/

// Real test
// const data = require('./data');
// console.log('Number of steps:', getNumSteps(data));
