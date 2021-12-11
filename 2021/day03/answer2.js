/*
--- Part Two ---

Next, you should verify the life support rating, which can be determined by multiplying the oxygen generator rating by the CO2 scrubber rating.

Both the oxygen generator rating and the CO2 scrubber rating are values that can be found in your diagnostic report - finding them is the tricky part. Both values are located using a similar process that involves filtering out values until only one remains. Before searching for either rating value, start with the full list of binary numbers from your diagnostic report and consider just the first bit of those numbers. Then:

    Keep only numbers selected by the bit criteria for the type of rating value for which you are searching. Discard numbers which do not match the bit criteria.
    If you only have one number left, stop; this is the rating value for which you are searching.
    Otherwise, repeat the process, considering the next bit to the right.

The bit criteria depends on which type of rating value you want to find:

    To find oxygen generator rating, determine the most common value (0 or 1) in the current bit position, and keep only numbers with that bit in that position. If 0 and 1 are equally common, keep values with a 1 in the position being considered.
    To find CO2 scrubber rating, determine the least common value (0 or 1) in the current bit position, and keep only numbers with that bit in that position. If 0 and 1 are equally common, keep values with a 0 in the position being considered.

For example, to determine the oxygen generator rating value using the same example diagnostic report from above:

    Start with all 12 numbers and consider only the first bit of each number. There are more 1 bits (7) than 0 bits (5), so keep only the 7 numbers with a 1 in the first position: 11110, 10110, 10111, 10101, 11100, 10000, and 11001.
    Then, consider the second bit of the 7 remaining numbers: there are more 0 bits (4) than 1 bits (3), so keep only the 4 numbers with a 0 in the second position: 10110, 10111, 10101, and 10000.
    In the third position, three of the four numbers have a 1, so keep those three: 10110, 10111, and 10101.
    In the fourth position, two of the three numbers have a 1, so keep those two: 10110 and 10111.
    In the fifth position, there are an equal number of 0 bits and 1 bits (one each). So, to find the oxygen generator rating, keep the number with a 1 in that position: 10111.
    As there is only one number left, stop; the oxygen generator rating is 10111, or 23 in decimal.

Then, to determine the CO2 scrubber rating value from the same example above:

    Start again with all 12 numbers and consider only the first bit of each number. There are fewer 0 bits (5) than 1 bits (7), so keep only the 5 numbers with a 0 in the first position: 00100, 01111, 00111, 00010, and 01010.
    Then, consider the second bit of the 5 remaining numbers: there are fewer 1 bits (2) than 0 bits (3), so keep only the 2 numbers with a 1 in the second position: 01111 and 01010.
    In the third position, there are an equal number of 0 bits and 1 bits (one each). So, to find the CO2 scrubber rating, keep the number with a 0 in that position: 01010.
    As there is only one number left, stop; the CO2 scrubber rating is 01010, or 10 in decimal.

Finally, to find the life support rating, multiply the oxygen generator rating (23) by the CO2 scrubber rating (10) to get 230.

Use the binary numbers in your diagnostic report to calculate the oxygen generator rating and CO2 scrubber rating, then multiply them together. What is the life support rating of the submarine? (Be sure to represent your answer in decimal, not binary.)
*/

const data = require('./data')
// const data = require('./testData')
const lines = data.split('\n')

// generate the opposite binary value
const flipBits = (bits) => bits
  .split('')
  .map(bit => bit === '0' ? '1' : '0')
  .join('')

// binary to decimal, decimal to binary
const bin2dec = (bin) => parseInt(bin, 2)

// Given an array of binary numbers, and bit index
// return the bit that is most common in that bit column (index)
// e.g. getCommonBit(['111', '101', '000'], 2) = '1' because the last bit (2) is the more common than the 0 at that bit index
// fallback is used when there is an equal amount of 1's and 0's
const getCommonBit = (binaryNumbers, bitIndex) => {
  const counts = binaryNumbers.reduce((counts, binaryNumber) => {
    const bit = binaryNumber.split('')[bitIndex]
    counts[bit]++
    return counts
  }, { '1': 0, '0': 0 })
  const commonBit = counts['1'] >= counts['0'] ? '1' : '0'
  return commonBit
}

const filterBinaryNumbersByCommonBit = (binaryNumbers, bitIndex) => {
  const commonBit = getCommonBit(binaryNumbers, bitIndex)
  return binaryNumbers.filter(binaryNumber => binaryNumber[bitIndex] == commonBit)
}

const filterBinaryNumbersByUncommonBit = (binaryNumbers, bitIndex) => {
  const commonBit = getCommonBit(binaryNumbers, bitIndex)
  const unCommonBit = commonBit == '1' ? '0' : '1'
  return binaryNumbers.filter(binaryNumber => binaryNumber[bitIndex] == unCommonBit)
}

const numBits = lines[0].length
let remainingLines = []

// Find oxygen generator rating
remainingLines = [...lines]
for (let i = 0; i < numBits && remainingLines.length > 1; i++) {
  remainingLines = filterBinaryNumbersByCommonBit(remainingLines, i)
}
const oxygenGeneratorRating = bin2dec(remainingLines[0])

// Find CO2 scrubber rating
remainingLines = [...lines]
for (let i = 0; i < numBits && remainingLines.length > 1; i++) {
  remainingLines = filterBinaryNumbersByUncommonBit(remainingLines, i)
}
const scrubberRating = bin2dec(remainingLines[0])

// Calculate life support rating
const lifeSupportRating = oxygenGeneratorRating * scrubberRating
console.log('lifeSupportRating:', lifeSupportRating) // 1800151
