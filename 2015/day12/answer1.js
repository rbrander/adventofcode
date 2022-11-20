/*
--- Day 12: JSAbacusFramework.io ---

Santa's Accounting-Elves need help balancing the books after a recent order. Unfortunately, their accounting software uses a peculiar storage format. That's where you come in.

They have a JSON document which contains a variety of things: arrays ([1,2,3]), objects ({"a":1, "b":2}), numbers, and strings. Your first job is to simply find all of the numbers throughout the document and add them together.

For example:

    [1,2,3] and {"a":2,"b":4} both have a sum of 6.
    [[[3]]] and {"a":{"b":4},"c":-1} both have a sum of 3.
    {"a":[-1,1]} and [-1,{"a":1}] both have a sum of 0.
    [] and {} both have a sum of 0.

You will not encounter any strings containing numbers.

What is the sum of all numbers in the document?
*/

const data = require('./data')
// const data = require('./testData')
const parsedData = JSON.parse(data);

const findSum = (thingy) => {
  const thingyType = typeof thingy;
  switch (thingyType) {
    case 'number':
      return thingy;
    case 'string':
      return 0;
    case 'object':
      if (Array.isArray(thingy)) {
        return thingy
          .flat(Infinity)
          .reduce((sum, value) => sum + findSum(value), 0)
      } else {
        return Object.keys(thingy)
          .map(key => findSum(thingy[key]))
          .reduce((sum, value) => sum + value, 0)
      }
    default:
      console.log('** UNKNOWN TYPE:', thingyType);
      break;
  }
  return 0;
}

const sum = findSum(parsedData);
console.log('Done; sum =', sum); // 191164