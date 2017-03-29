/*
--- Day 9: All in a Single Night ---

Every year, Santa manages to deliver all of his presents in a single night.

This year, however, he has some new locations to visit; his elves have 
provided him the distances between every pair of locations. He can start 
and end at any two (different) locations he wants, but he must visit each 
location exactly once. What is the shortest distance he can travel to 
achieve this?

For example, given the following distances:

London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141
The possible routes are therefore:

Dublin -> London -> Belfast = 982
London -> Dublin -> Belfast = 605
London -> Belfast -> Dublin = 659
Dublin -> Belfast -> London = 659
Belfast -> Dublin -> London = 605
Belfast -> London -> Dublin = 982
The shortest of these is London -> Dublin -> Belfast = 605, and so the 
answer is 605 in this example.

What is the distance of the shortest route?
*/

const data = require('./data');
const dataItems = data.split('\n');
const itemRegex = /(\w+) to (\w+) = (\d+)/;

// create items from data
const items = dataItems.map((item) => {
  const matches = itemRegex.exec(item);
  return {
    from: matches[1],
    to: matches[2],
    distance: parseInt(matches[3])
  };
})

// make a distinct list of places
const uniquePlaces = items.reduce((arr, curr) => {
  if (arr.indexOf(curr.from) == -1) {
    arr.push(curr.from);
  }
  if (arr.indexOf(curr.to) == -1) {
    arr.push(curr.to);
  }
  return arr;
}, [])

for (var i = 0; i < uniquePlaces.length; i++)
  console.log(`${i}) ${uniquePlaces[i]}`);

//////////////////////////////////////////


/*

given a list of unqiuePlaces, find all combinations of places

[a, b]

ab

ba


/////////////

[a, b, c]

abc
acb

bac
bca

cab
cba

/////////////

[a, b, c, d]

abcd
abdc

acbd
acdb

adbc
adcb

bacd
badc

bcad
bcda

bdac
bdca

/////////////

[a, b, c, d, e]

abcd-e
abce-d // increment the second-last letter, then generate all possibliies after

abd-ce // incrment the third-last letter, then generate all posiblilies after
abd-ec // incrment second last

abe-cd // incrment third last
abe-dc // incrment second last

ac-bde // incrment fourth last
ac-bed // incrment second last

ac-dbe // incrment third last
ac-deb // incrment second last

ac-ebd // incrment third last
ac-edb // incrment second last

// was going to icrement third last, but none left, so go to fourth-last
ad-bce // incrment fourth last
ad-bec // incrment second last

ad-cbe // increment third last
ad-ceb // incrment second last

ad-ebc // incrment third last
ad-ecb // incrment second last

// was goign to increment third last but none left, so go to fourth-last
ae-bcd // incrment fourth last
ae-bdc // incrment second last

ae-cbd // incrment third last
ae-cdb // incrment second last

ae-dbc // incrment third last
ae-dcb // incrment second last

// tried to incrment third but failed, incrmenting fourth last
// tried to incrment fourth last but failed, incrmenting fifth last
b-acde // incrment fifth last
b-aced // inrement second last

// tried to incrment second last but failed, incrmenting third last
b-adce // incrment third last
b-adec // incrment second last

*/

/*
// given [a, b, c] (aka uniquePlaces), build an array of all first options
function buildArray(currPath, places) {
  return (places.length == 0 ? currPath :
    buildArray(currPath.concat(places[0]), places.filter((_, i) => i > 0))
  );
}

const result = buildArray([], uniquePlaces);
console.log();
console.log(' result['+result.length+'] = ' + result.map(
  (x) => uniquePlaces.indexOf(x).toString()).join(', ')
);


// incrment the array

function incrementArray(array, idx, uniqueValues) {
  // exit if the idx is 0 and you cannot increment anymore
  if (idx === 0 && array[0] === uniqueValues[uniqueValues.length-1])
    return array;

  // get the index of the current value at idx
  const currValue = array[idx];
  const beforeIdx = array.slice(0, idx);
  const remainingUniqueValues = uniqueValues.filter((x) => beforeIdx.indexOf(x) == -1);
  const currUniqueValuesIndex = remainingUniqueValues.indexOf(currValue);
  const nextUniqueValuesIndex = currUniqueValuesIndex + 1;

  // increment the next one up if we're at the end of the array
  const incrementNextLevel = nextUniqueValuesIndex >= remainingUniqueValues.length;
  if (incrementNextLevel) {
    return incrementArray(array, idx - 1, uniqueValues);
  } else {

    // take the items before idx (when idx > 0), and 
    const itemsBefore = array.slice(0, idx);

    // get the nextUniqueValue
    const nextUniqueValue = remainingUniqueValues[nextUniqueValuesIndex];

    // append the next value to the items before
    const incrementedArrayStart = itemsBefore.concat(nextUniqueValue);

    // make a list of remaining places not found in incrmentedArray
    const remainingPlaces = uniqueValues.filter(
      (place) => incrementedArrayStart.indexOf(place) === -1
    );

    // call buildArray given the incrmented array
    return buildArray(incrementedArrayStart, remainingPlaces);
  }
}
const incrementResult = incrementArray(result, result.length-1, uniquePlaces);
console.log();
console.log(' incrementResult['+incrementResult.length+'] = ' + incrementResult.map(
  (x) => uniquePlaces.indexOf(x).toString()).join(', ')
);


////////////////////////////////////////

console.log();
// using [a, b, c, d], build all combinations
const allValues = ['a', 'b', 'c'];
console.log('allValues = ' + allValues.join(', '));

const allPossibleValues = [allValues];
*/

/*
do {
  const currArray = allPossibleValues[allPossibleValues.length - 1];
  const incArray = incrementArray(currArray, currArray.length - 1, allValues);
  if (currArray !== incArray)
    allPossibleValues.push(incArray);
} while (currArray !== incArray);
console.log('inc = ' + 
  incrementArray(allValues, allValues.length - 1, allValues).join(', ')
);
*/

/*
const _vals = ['a', 'b', 'c'];

function testSet(strPattern, srcArray) {
  const input = strPattern.split('');
  const inc = incrementArray(input, strPattern.length-2, srcArray);
  console.log('%s = %s = %s', strPattern, input.join(','), inc.join(','));
}

const abc = incrementArray([_vals[0], _vals[1], _vals[2]], 2, _vals);
console.log('abc = ' + abc.join(','));

testSet('bca', _vals);
testSet('cab', _vals);
testSet('cba', _vals);
testSet('abc', _vals);
testSet('acb', _vals);
*/

/*
const bca = incrementArray([_vals[1], _vals[2], _vals[0]], 2, _vals);
console.log('bca = ' + bca.join(','));

const cab = incrementArray([_vals[2], _vals[0], _vals[1]], 2, _vals);
console.log('cab = ' + cab.join(','));


const cba = incrementArray([_vals[2], _vals[1], _vals[0]], 2, _vals);
console.log('cba = ' + cba.join(','));
*/



/*

for (var i = 0; i < uniquePlaces.length; i++) {
  var curr = uniquePlaces[i];

  for (var j = 0; j < uniquePlaces.length; j++) {
    var curr2 = uniquePlaces[j];
    if (curr2 != curr) {
      result = curr + curr2
    }
  }
}


const remainingPlaces = uniquePlaces;
const travelledPlaces = [];

for (var i = 0; i < remainingPlaces; i++){
  var curr = remainingPlaces[i];
  var leftover = remainingPlaces.filter((_, idx) => idx != i);

}
*/

// recursively figure out all combinations of source to dest
function buildPaths(remainingPlaces, travelledPlaces) {
  if (remainingPlaces.length === 0)
    return travelledPlaces;

  remainingPlaces.forEach(place =>
    buildPaths(remainingPlaces.filter(p => p != place),
      travelledPlaces.concat(place))
  );
}
/*
a b c
a c b

b a c
b c a

c a b
c b a
*/

const paths = buildPaths(['a', 'b', 'c'], []);
//const paths = buildPaths(uniquePlaces, []);

console.log(JSON.stringify(paths));

