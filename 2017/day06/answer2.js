/*
--- Part Two ---

Out of curiosity, the debugger would also like to know the size of the loop: starting from a state that has already been seen, how many block redistribution cycles must be performed before that same state is seen again?

In the example above, 2 4 1 2 is seen again after four cycles, and so the answer in that example would be 4.

How many cycles are in the infinite loop that arises from the configuration in your puzzle input?
*/


function redistributionCycle(originalData) {
  const data = [...originalData];
  let max = Math.max(...data);
  let idx = data.indexOf(max);
  data[idx] = 0;
  while (max--) {
    data[++idx % data.length]++;
  };
  return data;
}

function getNumCycles(data) {
  let prevData = [];
  let currData = [...data];
  while (!prevData.includes(currData.join())) {
    prevData.push(currData.join());
    currData = redistributionCycle(currData);
  };
  const stringToLookFor = currData.join();
  prevData = [];
  while (!prevData.includes(stringToLookFor)) {
    currData = redistributionCycle(currData);
    prevData.push(currData.join());
  };
  return prevData.length;
}


// Sample test
const assert = require('assert');
const sampleData = [0, 2, 7, 0];
console.log('Test 1');
assert.equal(getNumCycles(sampleData), 4)
console.log('Passed!\n');

// The real test
const data = require('./data');
const banks = data.split(/\s+/).map(Number);
const numCycles = getNumCycles(banks);
console.log(`took ${numCycles} cycles`); // took 1086 cycles
