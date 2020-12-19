/*
--- Part Two ---
The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

In your expense report, what is the product of the three entries that sum to 2020?

*/

const data = require('./data');
const DECIMAL_RADIX = 10
const values = data.split('\n')
  .map(numStr => parseInt(numStr, DECIMAL_RADIX))

const findValuesThatSumTo2020 = () => {
  for (let index1 = 0; index1 < values.length - 2; index1++) {
    const value1 = values[index1]
    for (let index2 = 0; index2 < values.length - 1; index2++) {
      if (index2 === index1) {
        continue
      }
      const value2 = values[index2]
      for (let index3 = 0; index3 < values.length - 1; index3++) {
        if (index3 === index1 || index3 === index2) {
          continue
        }
        const value3 = values[index3]
        if (value1 + value2 + value3 === 2020) {
          return [value1, value2, value3]
        }
      }
    }
  }
}

const [ firstValue, secondValue, thirdValue ] = findValuesThatSumTo2020(values)
console.log('firstValue:', firstValue) // 867
console.log('secondValue:', secondValue) // 264
console.log('thirdValue:', thirdValue) // 889
console.log('firstValue * secondValue * thirdValue =', firstValue * secondValue * thirdValue) // 203481432
