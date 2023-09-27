/*
--- Part Two ---

Content with the amount of tree cover available, the Elves just need to know the best spot to build their tree house: they would like to be able to see a lot of trees.

To measure the viewing distance from a given tree, look up, down, left, and right from that tree; stop if you reach an edge or at the first tree that is the same height or taller than the tree under consideration. (If a tree is right on the edge, at least one of its viewing distances will be zero.)

The Elves don't care about distant trees taller than those found by the rules above; the proposed tree house has large eaves to keep it dry, so they wouldn't be able to see higher than the tree house anyway.

In the example above, consider the middle 5 in the second row:

30373
25512
65332
33549
35390

    Looking up, its view is not blocked; it can see 1 tree (of height 3).
    Looking left, its view is blocked immediately; it can see only 1 tree (of height 5, right next to it).
    Looking right, its view is not blocked; it can see 2 trees.
    Looking down, its view is blocked eventually; it can see 2 trees (one of height 3, then the tree of height 5 that blocks its view).

A tree's scenic score is found by multiplying together its viewing distance in each of the four directions. For this tree, this is 4 (found by multiplying 1 * 1 * 2 * 2).

However, you can do even better: consider the tree of height 5 in the middle of the fourth row:

30373
25512
65332
33549
35390

    Looking up, its view is blocked at 2 trees (by another tree with a height of 5).
    Looking left, its view is not blocked; it can see 2 trees.
    Looking down, its view is also not blocked; it can see 1 tree.
    Looking right, its view is blocked at 2 trees (by a massive tree of height 9).

This tree's scenic score is 8 (2 * 2 * 1 * 2); this is the ideal spot for the tree house.

Consider each tree on your map. What is the highest scenic score possible for any tree?
*/

const data = require('./data')
// const data = require('./testData')

// Create 2D number array from the input string
const treeHeights = data.split('\n').map(line => line.split('').map(Number));

const numVisibleTreesFromPoint = (treeX, treeY, grid) => {
  const treeHeight = grid[treeY][treeX];

  let numEastTreesVisible = 0;
  for (let x = treeX + 1; x < grid[treeY].length; x++) {
    const currTreeHeight = grid[treeY][x];
    numEastTreesVisible++;
    if (currTreeHeight >= treeHeight) {
      break;
    }
  }

  let numWestTreesVisible = 0;
  for (let x = treeX - 1; x >= 0; x--) {
    const currTreeHeight = grid[treeY][x];
    numWestTreesVisible++;
    if (currTreeHeight >= treeHeight) {
      break;
    }
  }

  let numNorthTreesVisible = 0;
  for (let y = treeY - 1; y >= 0; y--) {
    const currTreeHeight = grid[y][treeX];
    numNorthTreesVisible++;
    if (currTreeHeight >= treeHeight) {
      break;
    }
  }

  let numSouthTreesVisible = 0;
  for (let y = treeY + 1; y < grid.length; y++) {
    const currTreeHeight = grid[y][treeX];
    numSouthTreesVisible++;
    if (currTreeHeight >= treeHeight) {
      break;
    }
  }

  return {
    north: numNorthTreesVisible,
    east: numEastTreesVisible,
    south: numSouthTreesVisible,
    west: numWestTreesVisible
  }
};

// given a visible number of trees for each direction, it will calculate the scenic score
const calculateScenicScore = ({north, east, west, south}) =>
  north * east * west * south;

/////////////////////////////////////////////////////////////////

let bestScenicScore = 0;

// for each inner tree...
for (let y = 1; y < treeHeights.length - 1; y++) {
  for (let x = 1; x < treeHeights[y].length - 1; x++) {
    // calculate the scenic score and compare to the best
    const numTreesVisible = numVisibleTreesFromPoint(x, y, treeHeights);
    const scenicScore = calculateScenicScore(numTreesVisible);
    if (scenicScore > bestScenicScore) {
      bestScenicScore = scenicScore;
    }
  }
}

console.log('Best Scenic Score: ', bestScenicScore);
