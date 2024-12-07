// given a single line, return array of numbers
// e.g. "123   456" => [123, 456]
const convertLineIntoNumbers = (line) => {
  if (typeof line !== "string" || line.length === 0) return [];
  const [firstNumStr, secondNumStr] = line.split("  ");
  const firstNum = parseInt(firstNumStr, 10);
  const secondNum = parseInt(secondNumStr, 10);
  return [firstNum, secondNum];
};

// convert file contents into two arrays of integers, left list and right list
const parseData = (data) => {
  // an array of tuples
  const linesAsNumbers = data.split("\n").map(convertLineIntoNumbers);
  // convert the array of tuples into two arrays for each list (left and right)
  // e.g. [[1,2], [3, 4], [5, 6]] => { left: [1, 3, 5], right: [2, 4, 6] }
  const lists = linesAsNumbers.reduce(
    (lists, line) => {
      lists.left.push(line[0]);
      lists.right.push(line[1]);
      return lists;
    },
    { left: [], right: [] }
  );
  return lists;
};

// iterate through each of the lists and return a list of differences of the values
// e.g. ([20, 30, 40], [22, 33, 44]) => [2, 3, 4]
const calcDiffs = (leftNumbers, rightNumbers) =>
  leftNumbers.map((left, idx) => {
    const right = rightNumbers[idx];
    const min = Math.min(left, right);
    const max = Math.max(left, right);
    return max - min;
  });

// given an array of numbers it will return a map the frequency of each number
const getFrequencyMap = (numbers) =>
  numbers.reduce((map, number) => {
    const count = map.get(number) ?? 0;
    map.set(number, count + 1);
    return map;
  }, new Map());

// given an array of numbers an a map of frequency, return a sum of the leftNumbers by rightNumber frequncy
// e.g. ([3, 4, 5], [[3, 10], [4, 1]]) => (3 * 10) + (4 * 1) + (5 * 0) = 34
const calcSimilarityScore = (leftNumbers, rightNumberFreqMap) =>
  leftNumbers
    .map((leftNumber) => leftNumber * (rightNumberFreqMap.get(leftNumber) ?? 0))
    .reduce((a, b) => a + b); // sum the numbers

module.exports = { parseData, calcDiffs, getFrequencyMap, calcSimilarityScore };
