/*
--- Part Two ---

On the other hand, it might be wise to try a different strategy: let the giant squid win.

You aren't sure how many bingo boards a giant squid could play at once, so rather than waste time counting its arms, the safe thing to do is to figure out which board will win last and choose that one. That way, no matter which boards it picks, it will win for sure.

In the above example, the second board is the last to win, which happens after 13 is eventually called and its middle column is completely marked. If you were to keep playing until this point, the second board would have a sum of unmarked numbers equal to 148 for a final score of 148 * 13 = 1924.

Figure out which board will win last. Once it wins, what would its final score be?
*/

const data = require('./data')
// const data = require('./testData')
const utils = require('./utils')

const { drawNumbers, boards } = utils.parseData(data)
const markedBoards = new Array(boards.length).fill()
  .map(() => new Array(5).fill()
    .map(() => new Array(5).fill(false))
    )

const markCell = (boardIndex, x, y) => {
  markedBoards[boardIndex][y][x] = true
}

const isCellMarked = (boardIndex, x, y) => markedBoards[boardIndex][y][x]

const markBoard = (board, boardNumber, number) => {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] == number) {
        markCell(boardNumber, x, y)
      }
    }
  }
}

const checkForWin = (board, boardNumber) => {
  // check horizontal lines
  for (let y = 0; y < board.length; y++) {
    const hasWon = board[y].reduce((hasWon, _, x) => hasWon && isCellMarked(boardNumber, x, y), true)
    if (hasWon) {
      return true
    }
  }
  // check vertical lines
  for (let x = 0; x < board[0].length; x++) {
    let hasWon = true
    for (let y = 0; y < board.length; y++) {
      hasWon &= isCellMarked(boardNumber, x, y)
    }
    if (hasWon) {
     return true
    }
  }
  return false
}

const sumUnmarkedCells = (boardIndex) => {
  const marked = markedBoards[boardIndex].flat()
  const numbers = boards[boardIndex].flat().filter((_, idx) => !marked[idx])
  const sum = numbers.reduce((sum, number) => sum + number)
  return sum
}

//////////////////////////////////

let hasWon = false
let sum = undefined
let lastNum = undefined
let boardIndexWon = undefined

for (let drawNumberIndex = 0; drawNumberIndex < drawNumbers.length && lastNum === undefined; drawNumberIndex++) {
  const number = drawNumbers[drawNumberIndex]
  for (let boardIndex = boards.length - 1; boardIndex >= 0 && boardIndexWon === undefined; boardIndex--) {
    const board = boards[boardIndex]
    markBoard(board, boardIndex, number)
    // check for win
    hasWon = checkForWin(board, boardIndex)
    if (hasWon) {
      // if this is the last board to win, set vars
      // else remove this board from boards/markedBoards
      const isLastBoard = boards.length === 1
      if (isLastBoard) {
        // if this is the last board to win, set vars
        hasWon = true
        lastNum = number
        boardIndexWon = boardIndex
        sum = sumUnmarkedCells(boardIndexWon)
      } else {
        // remove this board from boards/markedBoards
        boards.splice(boardIndex, 1)
        markedBoards.splice(boardIndex, 1)
      }
    }
  }
}
console.log({ hasWon, lastNum, sum })
console.log(`lastNum x sum = ${lastNum} x ${sum} = ${lastNum * sum}`)
// lastNum x sum = 31 x 367 = 11377