/*
--- Day 6: Signals and Noise ---

Something is jamming your communications with Santa. Fortunately, your signal is only partially jammed, and protocol in situations like this is to switch to a simple repetition code to get the message through.

In this model, the same message is sent repeatedly. You've recorded the repeating message signal (your puzzle input), but the data seems quite corrupted - almost too badly to recover. Almost.

All you need to do is figure out which character is most frequent for each position. For example, suppose you had recorded the following messages:

eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar
The most common character in the first column is e; in the second, a; in the third, s, and so on. Combining these characters returns the error-corrected message, easter.

Given the recording in your puzzle input, what is the error-corrected version of the message being sent?

--- Part Two ---

Of course, that would be the message - if you hadn't agreed to use a modified repetition code instead.

In this modified code, the sender instead transmits what looks like random data, but for each character, the character they actually want to send is slightly less likely than the others. Even after signal-jamming noise, you can look at the letter distributions in each column and choose the least common letter to reconstruct the original message.

In the above example, the least common character in the first column is a; in the second, d, and so on. Repeating this process for the remaining characters produces the original message, advent.

Given the recording in your puzzle input and this new decoding methodology, what is the original message that Santa is trying to send?
*/

const data = require('./data');
const lines = data.split('\n');
const counts = [];

// For each column in the data, we're going to create an object to keep track of counts
for (var i = 0; i < lines[0].length; i++)
  counts[i] = {};

// Iterate over each line and increment the count for each letter in each column
lines.forEach(line => {
  line.split('').forEach((character, idx) => {
    counts[idx][character] = (counts[idx][character] || 0) + 1;
  });
});

// Find the lowest count for each letter
counts.forEach(countObj => {
  countObj['min'] = Object.keys(countObj).reduce((minObj, currChar) => {
    const isSmaller = (minObj.count || Number.MAX_VALUE) > countObj[currChar];
    return isSmaller ? { char: currChar, count: countObj[currChar] } : minObj;
  }, {});
});

// Now return a string that contains the min count character for each column
const password = counts.reduce((result, countObj) => result += countObj['min'].char, '');
console.log('password =', password);
// Answer: bhkzekao