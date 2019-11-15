const testData = `dabAcCaCBAcCcaDA`; // length should be 10 after processing
const data = require('./data');
const { processData } = require('./utils');

console.log('Starting, this may take a while...\n');
const start = Date.now();

const length = processData(data);
console.log('Final length is: ', length); // 9348

console.log(`\nDone! took ${Date.now() - start} ms\n`);
