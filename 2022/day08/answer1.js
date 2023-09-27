/*
--- Day 8: Treetop Tree House ---

The expedition comes across a peculiar patch of tall trees all planted carefully in a grid. The Elves explain that a previous expedition planted these trees as a reforestation effort. Now, they're curious if this would be a good location for a tree house.

First, determine whether there is enough tree cover here to keep a tree house hidden. To do this, you need to count the number of trees that are visible from outside the grid when looking directly along a row or column.

The Elves have already launched a quadcopter to generate a map with the height of each tree (your puzzle input). For example:

30373
25512
65332
33549
35390

Each tree is represented as a single digit whose value is its height, where 0 is the shortest and 9 is the tallest.

A tree is visible if all of the other trees between it and an edge of the grid are shorter than it. Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.

All of the trees around the edge of the grid are visible - since they are already on the edge, there are no trees to block the view. In this example, that only leaves the interior nine trees to consider:

    The top-left 5 is visible from the left and top. (It isn't visible from the right or bottom since other trees of height 5 are in the way.)
    The top-middle 5 is visible from the top and right.
    The top-right 1 is not visible from any direction; for it to be visible, there would need to only be trees of height 0 between it and an edge.
    The left-middle 5 is visible, but only from the right.
    The center 3 is not visible from any direction; for it to be visible, there would need to be only trees of at most height 2 between it and an edge.
    The right-middle 3 is visible from the right.
    In the bottom row, the middle 5 is visible, but the 3 and 4 are not.

With 16 trees visible on the edge and another 5 visible in the interior, a total of 21 trees are visible in this arrangement.

Consider your map; how many trees are visible from outside the grid?
*/

const data = require('./data')
// const data = require('./testData')

// Create 2D number array from the input string
const treeHeights = data.split('\n').map(line => line.split('').map(Number));

// add two full sides, and two other sides (reduced by 2 to prevent double counting the corners)
const calculatePerimeter = (grid) => (grid.length - 2) * 2 + grid[0].length * 2;

const canSeeTree = (treeX, treeY, grid) => {
  const treeHeight = grid[treeY][treeX];

  let canSeeFromNorth = true;
  // iterate vertically up in the grid
  for (let y = treeY - 1; y >= 0 && canSeeFromNorth; y--) {
    if (grid[y][treeX] >= treeHeight) {
      canSeeFromNorth = false;
    }
  }

  let canSeeFromEast = true;
  // iterate horizontally to the right in the grid
  for (let x = treeX + 1; x < grid[treeY].length && canSeeFromEast; x++) {
    if (grid[treeY][x] >= treeHeight) {
      canSeeFromEast = false;
    }
  }

  let canSeeFromSouth = true;
  // iterate vertically down in the grid
  for (let y = treeY + 1; y < grid.length && canSeeFromSouth; y++) {
    if (grid[y][treeX] >= treeHeight) {
      canSeeFromSouth = false;
    }
  }

  let canSeeFromWest = true;
  // iterate horizontally to the left in the grid
  for (let x = treeX - 1; x >= 0 && canSeeFromWest; x--) {
    if (grid[treeY][x] >= treeHeight) {
      canSeeFromWest = false;
    }
  }

  return canSeeFromNorth || canSeeFromEast || canSeeFromSouth || canSeeFromWest;
};

/////////////////////////////////////////////////////////////////

let numVisibleTrees = calculatePerimeter(treeHeights);

// for each inner tree...
for (let y = 1; y < treeHeights.length - 1; y++) {
  for (let x = 1; x < treeHeights[y].length - 1; x++) {
    // see if the tree can be seen from any direction
    // if it can, add it to the count
    if (canSeeTree(x, y, treeHeights)) {
      numVisibleTrees++;
    }
  }
}

console.log('Number of visible trees: ', numVisibleTrees);

