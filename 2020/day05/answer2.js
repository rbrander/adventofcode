/*
--- Part Two ---
Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

What is the ID of your seat?
*/
const MAX_ROWS = 127
const MAX_COLS = 7

const data = require('./data')

const traverse = (path, min, max) => {
  const range = (max - min)
  if (path.length === 0 || min === max) {
    return min // NOTE: min and max should be equal
  }
  const curr = path[0]
  const halfRange = ~~(range / 2)
  const nextMin = curr === '0' ? min : min + halfRange + 1
  const nextMax = curr === '0' ? min + halfRange : max
  return traverse(path.substr(1), nextMin, nextMax)
}

const parseSeatLocation = (seatPath) => {
  const rowPath = seatPath
    .substr(0, 7)
    .replace(/F/g, '0')
    .replace(/B/g, '1')
  const row = traverse(rowPath, 1, MAX_ROWS-1)
  const columnPath = seatPath
    .substr(7, 3)
    .replace(/L/g, '0')
    .replace(/R/g, '1')
  const column = traverse(columnPath, 0, MAX_COLS)
  return { row, column, id: row * (MAX_COLS + 1) + column }
}

const parsedSeatLocations = data.split('\n').map(parseSeatLocation)
const uniqueSeatIDs = Array.from(new Set(parsedSeatLocations.map(x => x.id))).sort()

const findSeatGap = (seats) => {
  for (let i = 0; i < seats.length - 1; i++) {
    const curr = seats[i]
    const next = seats[i+1]
    if (next - curr > 1) {
      return curr + 1
    }
  }
}

const seat = findSeatGap(uniqueSeatIDs)
console.log('seat ID is', seat) // 603
