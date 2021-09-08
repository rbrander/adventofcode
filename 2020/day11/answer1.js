/*
--- Day 11: Seating System ---
Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:

If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.
Floor (.) never changes; seats don't move, and nobody sits on the floor.

After one round of these rules, every seat in the example layout becomes occupied:

#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
After a second round, the seats with four or more occupied adjacent seats become empty again:

#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##
This process continues for three more rounds:

#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##
#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##
#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##
At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?
*/
const SEAT_AVAILABLE = 'L'
const SEAT_TAKEN = '#'

const isSeatAvailable = (grid, x, y) => grid[y][x] === SEAT_AVAILABLE
const isSeatTaken = (grid, x, y) => grid[y][x] === SEAT_TAKEN

const isLocationInBounds = (grid, x, y) => 
  x >= 0 && y >= 0 && y < grid.length && x < grid[y].length

const countAdjacentSeatsTaken = (grid, x, y) => {
  let count = 0
  for (let yOffset = -1; yOffset <= 1; yOffset++) {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      if (yOffset === 0 && xOffset === 0) continue
      const adjacentX = x + xOffset
      const adjacentY = y + yOffset
      if (isLocationInBounds(grid, adjacentX, adjacentY) &&
        isSeatTaken(grid, adjacentX, adjacentY)) {
          count++
      }
    }
  }
  return count
}

const processLocation = (grid, x, y) => {
  if (isSeatAvailable(grid, x, y) && countAdjacentSeatsTaken(grid, x, y) === 0) {
    return SEAT_TAKEN
  }
  if (isSeatTaken(grid, x, y) && countAdjacentSeatsTaken(grid, x, y) >= 4) {
    return SEAT_AVAILABLE
  }
  return grid[y][x]
}

const processGrid = (grid) => {
  // clone the grid
  const updatedGrid = JSON.parse(JSON.stringify(grid))
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      updatedGrid[y][x] = processLocation(grid, x, y)
    }
  }
  return updatedGrid
}

const drawGrid = (grid) => {
  grid.forEach(row => console.log(row.join('')))
}

const areGridsEqual = (grid1, grid2) =>
  JSON.stringify(grid1) === JSON.stringify(grid2)

const countNumSeatsTaken = (grid) => {
  let count = 0
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (isSeatTaken(grid, x, y)) {
        count++
      }
    }
  }
  return count
}

/////////////////////////////////////////////////////////

const data = require('./data')
const testData = require('./testData')

const parseData = (dataStr) =>
  dataStr
    .split('\n')
    .map(line => line.split(''))

let grid = parseData(data)
let hasChanged = true
do {
  const processedGrid = processGrid(grid)
  hasChanged = areGridsEqual(grid, processedGrid) === false
  grid = processedGrid
} while (hasChanged)

const numSeatsTaken = countNumSeatsTaken(grid) 
console.log(`numSeatsTaken = ${numSeatsTaken}`) // numSeatsTaken = 2438
