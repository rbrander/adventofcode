/*
--- Day 2: Corruption Checksum ---

As you walk through the door, a glowing humanoid shape yells in your direction. "You there! Your state appears to be idle. Come help us repair the corruption in this spreadsheet - if we take another millisecond, we'll have to display an hourglass cursor!"

The spreadsheet consists of rows of apparently-random numbers. To make sure the recovery process is on the right track, they need you to calculate the spreadsheet's checksum. For each row, determine the difference between the largest value and the smallest value; the checksum is the sum of all of these differences.

For example, given the following spreadsheet:

5 1 9 5
7 5 3
2 4 6 8
The first row's largest and smallest values are 9 and 1, and their difference is 8.
The second row's largest and smallest values are 7 and 3, and their difference is 4.
The third row's difference is 6.
In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.

What is the checksum for the spreadsheet in your puzzle input?
*/

const getChecksum = (strData) => {
  // Convert the data string into a 2d array of integers
  const parsedData = strData.split('\n')
    .map(row => row.match(/\d+/g).map(x => parseInt(x, 10)))

  // Get the min and max for each row
  const differences = parsedData.map(row => (Math.max(...row) - Math.min(...row)));

  // Sum all differences
  return differences.reduce((total, x) => (total + x), 0);
}

// Sample tests
const assert = require('assert');
const sampleData = `5 1 9 5
7 5 3
2 4 6 8`;
assert.strictEqual(getChecksum(sampleData), 18);

// Real test
const data = require('./data');
console.log('Checksum is', getChecksum(data)); // Checksum is 53978
