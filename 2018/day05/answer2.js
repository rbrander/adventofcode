const testData = `dabAcCaCBAcCcaDA`; // length should be 10 after processing
const data = require('./data');
const { processData, getDistinctUnits, removeAllUnits } = require('./utils');

////////////////////////////////////////

console.log('Starting, this may take a while...\n');
const start = Date.now();

const distinctUnits = Array.from(getDistinctUnits(data)).sort();
console.log('Found distinct units: ', distinctUnits.join(', '));

// for each distinct unit, find the length after removing it
const unitLengths = distinctUnits.reduce((unitLengths, unit) => {
  console.log('Processing unit:', unit);
  const updatedData = removeAllUnits(data, unit);
  const length = processData(updatedData);
  unitLengths[unit] = length;
  return unitLengths;
}, {});

// get the lowest unit
const lowestUnit = Object.keys(unitLengths)
  .reduce((lowestUnit, unit) => (unitLengths[unit] < unitLengths[lowestUnit] ? unit: lowestUnit));

// Lowest length: 4996, unit: f
console.log(`\nLowest length: ${unitLengths[lowestUnit]}, unit: ${lowestUnit}\n`);

console.log(`\nDone! took ${Date.now() - start} ms\n`);
