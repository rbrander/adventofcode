/*
--- Part Two ---

"Great work; looks like we're on the right track after all. Here's a star for your effort." However, the program seems a little worried. Can programs be worried?

"Based on what we're seeing, it looks like all the User wanted is some information about the evenly divisible values in the spreadsheet. Unfortunately, none of us are equipped for that kind of calculation - most of us specialize in bitwise operations."

It sounds like the goal is to find the only two numbers in each row where one evenly divides the other - that is, where the result of the division operation is a whole number. They would like you to find those numbers on each line, divide them, and add up each line's result.

For example, given the following spreadsheet:

5 9 2 8
9 4 7 3
3 8 6 5
In the first row, the only two numbers that evenly divide are 8 and 2; the result of this division is 4.
In the second row, the two numbers are 9 and 3; the result is 3.
In the third row, the result is 2.
In this example, the sum of the results would be 4 + 3 + 2 = 9.

What is the sum of each row's result in your puzzle input?
*/

const getChecksum = (strData) => {
  // Convert the data string into a 2d array of integers
  const parsedData = strData.split('\n')
    .map(row => row.match(/\d+/g).map(x => parseInt(x, 10)))

  // Get the quotient of the two divisible numbers
  // const differences = parsedData.map(row => (Math.max(...row) - Math.min(...row)));
  const quotients = parsedData.map(row => {
    // A simple test to see if the number is a float or integer
    const isInteger = (num) => (num % 1 === 0);

    // find the two divisble numbers and return the quotient
    for (var i = 0; i < row.length - 1; i++) {
      // For each digit, compare it to each of the other digits
      const primaryDigit = row[i];
      for (var j = i + 1; j < row.length; j++) {
        // Now that we have two digits, we need to compare the division of each digit
        const secondaryDigit = row[j];
        const firstQuotient = primaryDigit / secondaryDigit;
        // When there is an integer returned from the division, return the quotient
        if (isInteger(firstQuotient)) {
          return firstQuotient;
        } else {
          const secondQuotient =  secondaryDigit / primaryDigit;
          if (isInteger(secondQuotient)) {
            return secondQuotient;
          }
        }
      }
    }

    return 0; // fallback, in the event there is no divisible pair
  })

  // Sum all quotients
  return quotients.reduce((total, x) => (total + x), 0);
}

// Sample tests
const assert = require('assert');
const sampleData = `5 9 2 8
9 4 7 3
3 8 6 5`;
assert.strictEqual(getChecksum(sampleData), 9);

// Real test
const data = require('./data');
console.log('Checksum is', getChecksum(data)); // Checksum is 314
