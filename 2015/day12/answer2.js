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

--- Part Two ---

Uh oh - the Accounting-Elves have realized that they double-counted everything red.

Ignore any object (and all of its children) which has any property with the value "red". Do this only for objects ({...}), not arrays ([...]).

    [1,2,3] still has a sum of 6.
    [1,{"c":"red","b":2},3] now has a sum of 4, because the middle object is ignored.
    {"d":"red","e":[1,2,3,4],"f":5} now has a sum of 0, because the entire structure is ignored.
    [1,"red",5] has a sum of 6, because "red" in an array has no effect.

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
        const thingyKeys = Object.keys(thingy);
        const thingyContainsRed = thingyKeys.reduce((hasRed, key) => hasRed || (thingy[key] === 'red'), false);
        return thingyContainsRed ? 0 :
          thingyKeys
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
console.log('Done; sum =', sum); // 87842