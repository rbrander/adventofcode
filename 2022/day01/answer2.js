/*
--- Part Two ---

By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). The sum of the Calories carried by these three elves is 45000.

Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
*/

const data = require('./data')
// const data = require('./testData')

const getElfData = (data) =>
  data
    .split('\n\n') // divide the data by elf (double blank line)
    .map(lines => lines.split('\n').map(line => parseInt(line, 10))); // divide the elf data by line, convert to number

const sumValues = (values) => values.reduce((sum, curr) => sum + curr, 0);
const getElfSums = (elfData) => elfData.map(sumValues);


///////////////////


console.log('Day 1 - Elf calories');

const elfCalorieData = getElfData(data);
const elfCalorieSums = getElfSums(elfCalorieData);
const sortedCalorieSums = elfCalorieSums.sort((a, b) => b - a); // sort them in descending order (highest to lowest)
const totalCaloriesInTop3 = sumValues(sortedCalorieSums.filter((value, index) => index <= 2)) // take the top 3 and sum them

console.log('Total calories carreid by top 3 elves:', totalCaloriesInTop3); // 208567
