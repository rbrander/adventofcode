/*
--- Part Two ---
Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop, after all.

Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

What do you get if you multiply together the number of trees encountered on each of the listed slopes?
*/

const data = require('./data')
const rows = data.split('\n')
const MAP = rows.map(row => row.split(''))
const MAP_WIDTH = MAP[0].length

const getTreesBySlope = (slopeX, slopeY) => {
  let numTrees = 0
  let x = 0
  let y = 0
  while (y < rows.length) {
    const MAP_X = x % MAP_WIDTH
    if (MAP[y][MAP_X]  === '#') {
      numTrees++
    }
    x += slopeX
    y += slopeY
  }
  return numTrees
}

const SLOPES = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
]

const numTreesPerSlope = SLOPES
  .map(([slopeX, slopeY]) => getTreesBySlope(slopeX, slopeY))

const treesMultiplied = numTreesPerSlope
  .reduce((total, trees) => total *= trees)

console.log('treesMultiplied:', treesMultiplied) // 5007658656
