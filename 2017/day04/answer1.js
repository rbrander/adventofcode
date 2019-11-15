/*
--- Day 4: High-Entropy Passphrases ---

A new system policy has been put in place that requires all accounts to use a passphrase instead of simply a password. A passphrase consists of a series of words (lowercase letters) separated by spaces.

To ensure security, a valid passphrase must contain no duplicate words.

For example:

aa bb cc dd ee is valid.
aa bb cc dd aa is not valid - the word aa appears more than once.
aa bb cc dd aaa is valid - aa and aaa count as different words.
The system's full passphrase list is available as your puzzle input. How many passphrases are valid?
*/

const isValid = (input) => {
  const words = input.split(/\s+/).filter(input => input.length > 0);
  if (words.length === 1) return true;
  const uniqueWords = words.reduce((reducedWords, currWord) => (reducedWords.includes(currWord) ? reducedWords : reducedWords.concat(currWord)), []);
  return words.length === uniqueWords.length;
};

// Sample tests
const assert = require('assert');
// aa bb cc dd ee is valid.
console.log('Test 1');
assert.ok(isValid('aa bb cc dd ee'));
console.log('Passed!');
// aa bb cc dd aa is not valid - the word aa appears more than once.
console.log('Test 2');
assert.ok(!isValid('aa bb cc dd aa'));
console.log('Passed!');
// aa bb cc dd aaa is valid - aa and aaa count as different words.
console.log('Test 3');
assert.ok(isValid('aa bb cc dd aaa'));
console.log('Passed!');

// The real test!
const data = require('./data').split('\n');
const validData = data.filter(isValid);
console.log(`Found ${validData.length}/${data.length} valid`); // Found 477/512 valid
