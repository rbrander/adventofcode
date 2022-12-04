/*
--- Part Two ---

It seems like there is still quite a bit of duplicate work planned. Instead, the Elves would like to know the number of pairs that overlap at all.

In the above example, the first two pairs (2-4,6-8 and 2-3,4-5) don't overlap, while the remaining four pairs (5-7,7-9, 2-8,3-7, 6-6,4-6, and 2-6,4-8) do overlap:

    5-7,7-9 overlaps in a single section, 7.
    2-8,3-7 overlaps all of the sections 3 through 7.
    6-6,4-6 overlaps in a single section, 6.
    2-6,4-8 overlaps in sections 4, 5, and 6.

So, in this example, the number of overlapping assignment pairs is 4.

In how many assignment pairs do the ranges overlap?
*/

const data = require('./data')
// const data = require('./testData')

///////////////////
// parse data

// converts '2-4' to [2, 4]
const convertStringPair = (strPair) => strPair.split('-').map(number => parseInt(number, 10));

// each line will have two sets of numbers
// e.g. '2-4,6-8' => [[2, 4], [6, 8]]
const processLine = (line) => line.split(',').map(convertStringPair)
const lines = data.split('\n').map(processLine);

const rangeContainsRange = (range1, range2) => (
  (range1[0] >= range2[0] && range1[1] <= range2[1]) ||
  (range2[0] >= range1[0] && range2[1] <= range1[1])
)

/*
....567..  5-7 (a-b)
......789  7-9 (c-d)

......789  7-9 (a-b)
....567..  5-7 (c-d)

.2345678.  2-8 (a-b)
..34567..  3-7 (c-d)

..34567..  3-7 (a-b)
.2345678.  2-8 (c-d)
*/
const rangeOverlaps = ([a, b], [c, d]) => (
  (a >= c && b <= d) || /* /\ */
  (c >= a && d <= b) || /* \/ */
  (a <= c && d >= b && b >= c) || /* \\ */
  (c <= a && b >= d && d >= a)    /* // */
);

///////////////////////

console.log('Day 4 - Camp Cleanup');

const numOverlappingRanges = lines.reduce((total, curr) => total + (rangeOverlaps(...curr) ? 1 : 0), 0)

console.log(`There are ${numOverlappingRanges} overlapping ranges`) // 952
