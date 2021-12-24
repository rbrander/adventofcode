/*
--- Part Two ---

Unfortunately, considering only horizontal and vertical lines doesn't give you the full picture; you need to also consider diagonal lines.

Because of the limits of the hydrothermal vent mapping system, the lines in your list will only ever be horizontal, vertical, or a diagonal line at exactly 45 degrees. In other words:

    An entry like 1,1 -> 3,3 covers points 1,1, 2,2, and 3,3.
    An entry like 9,7 -> 7,9 covers points 9,7, 8,8, and 7,9.

Considering all lines from the above example would now produce the following diagram:

1.1....11.
.111...2..
..2.1.111.
...1.2.2..
.112313211
...1.2....
..1...1...
.1.....1..
1.......1.
222111....

You still need to determine the number of points where at least two lines overlap. In the above example, this is still anywhere in the diagram with a 2 or larger - now a total of 12 points.

Consider all of the lines. At how many points do at least two lines overlap?
*/

const data = require('./data')
// const data = require('./testData')

const lineRegex = /(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/
/*
input: "0,9 -> 2,9"
output: {
  x1: 0,
  y1: 9,
  x2: 2,
  y2: 9,
  isHorizontal: true,
  isVertical: false,
  isDiagonal: false
}
*/
const parseData = (dataStr) => {
  const lines = dataStr.split('\n')
  const parsedLines = lines.map(line => ({...line.match(lineRegex).groups})) // e.g { x1: '0', y1: '9', x2: '5', y2: '9' }
  const filteredParsedLines = parsedLines
    .map(({ x1, y1, x2, y2 }) => ({ x1: Number(x1), y1: Number(y1), x2: Number(x2), y2: Number(y2) }))
    .map((coordinates) => ({
      ...coordinates,
      isHorizontal: coordinates.y1 === coordinates.y2 && coordinates.x1 !== coordinates.x2,
      isVertical: coordinates.x1 === coordinates.x2 && coordinates.y1 !== coordinates.y2,
      isDiagonal: Math.abs(coordinates.x1 - coordinates.x2) === Math.abs(coordinates.y1 - coordinates.y2)
    }))
    .filter(({ isHorizontal, isVertical, isDiagonal }) => (isHorizontal || isVertical || isDiagonal))
  return filteredParsedLines
}

// takes in an array of parsed coordinates (x1, y1, x2, y2)
// returns an object with coordinates as the key and count as the value
const plotLines = (coordinates) => {
  const pointsIntersected = {}
  const markPoint = (x, y) => {
    const key = `${x},${y}`
    const hasKey = key in pointsIntersected
    pointsIntersected[key] = (hasKey ? pointsIntersected[key] + 1 : 1)
  }
  coordinates.forEach(({x1, y1, x2, y2, isHorizontal, isVertical, isDiagonal }) => {
    const yDelta = (isHorizontal ? 0 : (y1 > y2 ? -1 : +1))
    const xDelta = (isVertical ? 0 : (x1 > x2 ? -1 : +1))
    let x = x1, y = y1
    while (
      (isHorizontal && (xDelta > 0 ? (x <= x2) : (x >= x2))) ||
      (isVertical && (yDelta > 0 ? (y <= y2) : (y >= y2))) ||
      (isDiagonal &&
        (xDelta > 0 ? (x <= x2) : (x >= x2)) &&
        (yDelta > 0 ? (y <= y2) : (y >= y2)))
    ) {
      markPoint(x, y)
      x += xDelta
      y += yDelta
    }
  })
  return pointsIntersected
}


///////////////////////////////////////////////

const parsedData = parseData(data)
const plotData = plotLines(parsedData)

const numPointsOver1 = Object.values(plotData).filter(val => val > 1).length
console.log('number of points with 2 or more:', numPointsOver1) // 22088
