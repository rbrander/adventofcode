/*
--- Part Two ---

Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen

In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?
*/

const data = require('./data')
// const data = require('./testData')
const lines = data.split('\n');

const NUMBER_WORDS = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
};

const getCalibrationValue = (input) => {
  let firstDigit = 0;
  let secondDigit = 0;
  const isCharDigit = (char) => char >= '0' && char <= '9';
  for (let i = 0; i < input.length && (firstDigit === 0 || secondDigit === 0); i++) {
    if (firstDigit === 0) {
      if (isCharDigit(input[i])) {
        firstDigit = Number(input[i]);
      } else {
        // see if a number word starts at this position
        for (let word in NUMBER_WORDS) {
          const foundWord = input.slice(i).startsWith(word);
          if (foundWord) {
            firstDigit = NUMBER_WORDS[word];
            break;
          }
        }
      }
    }
    if (secondDigit === 0) {
      if (isCharDigit(input[input.length - i - 1])) {
        secondDigit = Number(input[input.length - i - 1]);
      } else {
        // see if a number word starts at this position
        for (let word in NUMBER_WORDS) {
          const foundWord = input.slice(input.length - i - 1).startsWith(word);
          if (foundWord) {
            secondDigit = NUMBER_WORDS[word];
            break;
          }
        }
      }
    }
  }
  return Number(`${firstDigit}${secondDigit}`);
};

///////////////////////////////

const calibrationValues = lines.map(line => getCalibrationValue(line));
const sum = calibrationValues.reduce((sum, value) => sum + value, 0);
console.log('sum =', sum);
