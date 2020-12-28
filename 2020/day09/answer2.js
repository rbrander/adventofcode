/*
--- Part Two ---
The final step in breaking the XMAS encryption relies on the invalid number you just found: you must find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1.

Again consider the above example:

35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
In this list, adding up all of the numbers from 15 through 40 produces the invalid number from step 1, 127. (Of course, the contiguous set of numbers in your actual list might be much longer.)

To find the encryption weakness, add together the smallest and largest number in this contiguous range; in this example, these are 15 and 47, producing 62.

What is the encryption weakness in your XMAS-encrypted list of numbers?
*/
const DECIMAL_RADIX = 10
const parseData = (strData) =>
  strData
    .split('\n')
    .map(strNumber => parseInt(strNumber, DECIMAL_RADIX))

const doesSumExistInSet = (sum, set) => {
  for (let i = 0; i < set.length - 1; i++) {
    for (let j = i + 1; j < set.length; j++) {
      if (sum === set[i] + set[j]) {
        return true
      }
    }
  }
  return false
}

const findFirstFail = (data, preambleSize) => {
  // initalize preamble
  let index = preambleSize
  while (index < data.length) {
    const preamble = data.slice(index - preambleSize, index)
    if (!doesSumExistInSet(data[index], preamble)) {
      return index
    }
    index++
  }
  return -1
}

const sum = (nums) => nums.reduce((sum, num) => sum + num)

const findNumbersToSum = (total, data) => {
  let index = 0, numNums = 2
  while (index < data.length) {
    const nums = data.slice(index, index + numNums)
    const sumOfNums = sum(nums)
    if (sumOfNums === total) {
      // Goal!
      console.log('Goal!')
      console.log(' -> nums =', nums)
      console.log(' - min:', Math.min(...nums))
      console.log(' - max:', Math.max(...nums))
      return Math.min(...nums) + Math.max(...nums)
    } else if (sumOfNums > total) {
      // sum has exceeded, move on to the next index
      index++
      numNums = 2
    } else {
      // sumOfNums < total
      // add another number to the set and try again
      numNums++
    }
  }
}

/////////////////////////////////

/*
const testData = parseData(require('./testData'))
const failIndex = findFirstFail(testData, 5)
const failNumber = testData[failIndex]
console.log({ failNumber, failIndex }) // { failNumber: 127, failIndex: 14 }
console.log(' - weakness:', findNumbersToSum(failNumber, testData))
*/
/*
Goal!
-> nums = [ 15, 25, 47, 40 ]
- min: 15
- max: 47
- weakness: 62
*/

const data = parseData(require('./data'))
const failIndex = findFirstFail(data, 25)
const failNumber = data[failIndex]
console.log({ failNumber, failIndex }) // { failNumber: 1492208709, failIndex: 659 }
console.log(' - weakness:', findNumbersToSum(failNumber, data))
/*
Goal!
 -> nums = [
   48367338, 53774870,
  109748499, 72922560,
   60786951, 68699579,
   84739631, 86831227,
   91922219, 80127669,
  119222989, 84246061,
   84350650, 85835403,
  189876168, 84636071,
   86120824
]
 - min: 48367338
 - max: 189876168
 - weakness: 238243506
*/
