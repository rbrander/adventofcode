/*
--- Day 5: A Maze of Twisty Trampolines, All Alike ---

An urgent interrupt arrives from the CPU: it's trapped in a maze of jump instructions, and it would like assistance from any programs with spare cycles to help find the exit.

The message includes a list of the offsets for each jump. Jumps are relative: -1 moves to the previous instruction, and 2 skips the next one. Start at the first instruction in the list. The goal is to follow the jumps until one leads outside the list.

In addition, these instructions are a little strange; after each jump, the offset of that instruction increases by 1. So, if you come across an offset of 3, you would move three instructions forward, but change it to a 4 for the next time it is encountered.

For example, consider the following list of jump offsets:

0
3
0
1
-3
Positive jumps ("forward") move downward; negative jumps move upward. For legibility in this example, these offset values will be written all on one line, with the current instruction marked in parentheses. The following steps would be taken before an exit is found:

(0) 3  0  1  -3  - before we have taken any steps.
(1) 3  0  1  -3  - jump with offset 0 (that is, don't jump at all). Fortunately, the instruction is then incremented to 1.
 2 (3) 0  1  -3  - step forward because of the instruction we just modified. The first instruction is incremented again, now to 2.
 2  4  0  1 (-3) - jump all the way to the end; leave a 4 behind.
 2 (4) 0  1  -2  - go back to where we just were; increment -3 to -2.
 2  5  0  1  -2  - jump 4 steps forward, escaping the maze.
In this example, the exit is reached in 5 steps.

How many steps does it take to reach the exit?
*/
/*
const getNumSteps = (offsets, currIdx = 0, numJumpsSoFar = 0) => {
  if (currIdx < 0 || currIdx >= offsets.length)
    return numJumpsSoFar;
  const nextIdx = currIdx + offsets[currIdx];
  const increased = offsets.map((offset, idx) => currIdx === idx ? (offset + 1) : offset);
  return getNumSteps(increased, nextIdx, numJumpsSoFar + 1);
};
*/
function getNumSteps(offsets, currIdx = 0, numJumpsSoFar = 0) {
  if ((currIdx < 0) || (currIdx >= offsets.length)) {
    return { numJumpsSoFar, currIdx };
  }
  const nextIdx = currIdx + offsets[currIdx];
  offsets[currIdx] += 1;
  return getNumSteps(offsets, nextIdx, numJumpsSoFar + 1);
};

function controller(offsets) {
  const CHUNK_SIZE = 50;
  const chunkedOffsets = offsets
    .reduce((chunks, offset, idx) => {
      const chunkIdx = ~~(idx / CHUNK_SIZE);
      if (!chunks[chunkIdx])
        chunks[chunkIdx] = [offset];
      else
        chunks[chunkIdx].push(offset);
      return chunks;
    }, []);
  console.log('Chunks:')
  chunkedOffsets.forEach((chunk, idx) => {
    console.log(`  ${idx}) [${chunk.length}]`);
  });


  let currIndex = 0;
  let totalJumps = 0;
  while ((currIndex >= 0) && (currIndex < offsets.length)) {
    const selectedChunk = chunkedOffsets[~~(currIndex / CHUNK_SIZE)];
    const chunkOffset = currIndex % CHUNK_SIZE;
    const result = getNumSteps(selectedChunk, chunkOffset, totalJumps);
    totalJumps = result.numJumpsSoFar;
    currIndex += result.currIdx - chunkOffset;
  }
  return totalJumps;
}

// Sample test
const assert = require('assert');
const testData = [0, 3, 0, 1, -3];
console.log('Test 1');
assert.equal(getNumSteps(testData).numJumpsSoFar, 5);
console.log('Passed!');

// The real test
const data = require('./data');
const numbers = data
  .split('\n')
  //.filter((_, idx) => idx < 100)
  .map(x => parseInt(x, 10));
console.log(`There are ${numbers.length} numbers`)
const numSteps = controller(numbers);
console.log(`took ${numSteps} steps`); // took 373543 steps
