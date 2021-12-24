const parseData = (rawData) =>
  rawData.split(',').map(str => parseInt(str, 10 /* decimal, base 10 */))


// Given an array of integers (between 0 and 8 inclusive)
// returns an object where the key is the integer and the value is the count of the integer
const getCounts = (numbers) =>
  numbers.reduce((counts, number) => (
    {...counts, [number]: counts[number] + 1}
  ), {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  })

// Given a counts object, it will subtract the counts by 1 (by shifting)
// and add new counts when wrapping occurs (0 => 6)
const processCounts = (counts) => {
  const newCounts = {}
  const numWrapping = counts[0]
  // shift all the values from 7 to 0
  for (let i = 8; i > 0; i--) {
    newCounts[i-1] = counts[i]
  }
  /*
  Each day,
  - a 0 becomes a 6 and adds a new 8 to the end of the list
  - while each other number decreases by 1 if it was present at the start of the day.
  */
  newCounts[6] += numWrapping
  newCounts[8] = numWrapping
  return newCounts
}

// Given a counts object, will return a sum of the object's values
const sumCounts = (counts) => Object.values(counts).reduce((a, b) => a + b, 0)

module.exports = {
  parseData,
  getCounts,
  processCounts,
  sumCounts
}
