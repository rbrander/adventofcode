/*
  sample input: "22 13 17 11  0\n 8  2 23  4 24\n21  9 14 16  7\n 6 10  3 18  5\n 1 12 20 15 19"
  sample output: [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19]
  ]
*/
const parseBoard = (boardString) => {
  const lines = boardString.split('\n')
  const splitLines = lines.map(line => line.trim().split(/\s+/))
  const numericSplitLines = splitLines.map(line => line.map(Number))
  return numericSplitLines
}

// Given the puzzle input, it will return an object with two keys: drawNumbers, and boards.
// drawNumbers is an array of numbers, and boards is an array of 2d arrays of numbers
const parseData = (data) => {
  const [numberString, ...rawBoardData] = data.split('\n\n')
  const drawNumbers = numberString.split(',').map(Number)
  const boards = rawBoardData.map(parseBoard)
  return { drawNumbers, boards }
}

const drawMarkedBoard = (boardIndex) => {
  const board = markedBoards[boardIndex]
  for (let y = 0; y < board.length; y++) {
    console.log(board[y].map(val => val ? 'T' : ' ').join())
  }
}

module.exports = {
  parseData,
  drawMarkedBoard
}
