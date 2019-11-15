/*
--- Part Two ---

For added security, yet another system policy has been put in place. Now, a valid passphrase must contain no two words that are anagrams of each other - that is, a passphrase is invalid if any word's letters can be rearranged to form any other word in the passphrase.

For example:

abcde fghij is a valid passphrase.
abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the first word.
a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming another word.
iiii oiii ooii oooi oooo is valid.
oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
Under this new system policy, how many passphrases are valid?
*/

// isAnagram('abcde', 'ecdab')

const isAnagram = (firstWord, secondWord) => (
  // has same length
  (firstWord.length === secondWord.length) &&
  // contains each letter
  (firstWord
    .split('')
    .reduce((remainingLetters, currLetter) => {
      const matchingIndex = remainingLetters.indexOf(currLetter);
      if (matchingIndex > -1) {
        remainingLetters.splice(matchingIndex, 1);
      }
      return remainingLetters;
    }, secondWord.split(''))
    .length === 0)
);

const isValid = (input) => {
  const words = input.split(/\s+/).filter(input => input.length > 0);
  const isValidForNotHavingAnagrams =
  words.reduce((result, currWord, wordIdx) => {
    // exclude the current word
    const allWordsExceptCurrWord = words.filter((_, idx) => idx !== wordIdx);
    const isCurrWordAnAnangram = isAnagram.bind(null, currWord);
    const allWordsValid = allWordsExceptCurrWord
      .filter(isCurrWordAnAnangram).length === 0;

    return result && allWordsValid;
  }, true);

  return isValidForNotHavingAnagrams;
};

// Sample tests
const assert = require('assert');

const testParameters = [
  // abcde fghij is a valid passphrase.
  { test: 'abcde fghij', result: true },
  // abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the first word.
  { test: 'abcde xyz ecdab', result: false },
  // a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming another word.
  { test: 'a ab abc abd abf abj', result: true },
  // iiii oiii ooii oooi oooo is valid.
  { test: 'iiii oiii ooii oooi oooo', result: true },
  // oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
  { test: 'oiii ioii iioi iiio', result: false },
];

testParameters.forEach((param, idx) => {
  console.log(`\nTest ${idx + 1}`);
  assert.equal(isValid(param.test), param.result);
  console.log('Passed!');
});
console.log('\n *** All tests passed ***\n');

// The real test!

const data = require('./data').split('\n');
const validData = data.filter(isValid);
console.log(`Found ${validData.length}/${data.length} valid\n`); // Found 167/512 valid
