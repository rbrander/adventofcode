/*
--- Day 5: Hydrothermal Venture ---

You come across a field of hydrothermal vents on the ocean floor! These vents constantly produce large, opaque clouds, so it would be best to avoid them if possible.

They tend to form in lines; the submarine helpfully produces a list of nearby lines of vents (your puzzle input) for you to review. For example:

0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2

Each line of vents is given as a line segment in the format x1,y1 -> x2,y2 where x1,y1 are the coordinates of one end the line segment and x2,y2 are the coordinates of the other end. These line segments include the points at both ends. In other words:

    An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
    An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.

For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.

So, the horizontal and vertical lines from the above list would produce the following diagram:

.......1..
..1....1..
..1....1..
.......1..
.112111211
..........
..........
..........
..........
222111....

In this diagram, the top left corner is 0,0 and the bottom right corner is 9,9. Each position is shown as the number of lines which cover that point or . if no line covers that point. The top-left pair of 1s, for example, comes from 2,2 -> 2,1; the very bottom row is formed by the overlapping lines 0,9 -> 5,9 and 0,9 -> 2,9.

To avoid the most dangerous areas, you need to determine the number of points where at least two lines overlap. In the above example, this is anywhere in the diagram with a 2 or larger - a total of 5 points.

Consider only horizontal and vertical lines. At how many points do at least two lines overlap?
*/

const data = require('./data')
//const data = require('./testData')

const lineRegex = /(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/
//  sample "8,0 -> 0,8"
const parseData = (dataStr) => {
  const lines = dataStr.split('\n')
  const parsedLines = lines.map(line => ({...line.match(lineRegex).groups})) // e.g { x1: '0', y1: '9', x2: '5', y2: '9' }
  const filteredParsedLines = parsedLines
    .map(({ x1, y1, x2, y2 }) => ({ x1: Number(x1), y1: Number(y1), x2: Number(x2), y2: Number(y2) }))
    .filter(({ x1, y1, x2, y2 }) => (x1 === x2 || y1 === y2))
  return filteredParsedLines
}

// takes in an array of parsed coordinates (x1, y1, x2, y2)
// returns an object with coordinates as the key and count as the value
const plotLines = (coordinates) => {
  const pointsIntersected = {}
  const getKey = (x, y) => `${x},${y}`
  coordinates.forEach(({x1, y1, x2, y2}) => {
    const isHorizontal = (y1 === y2)
    if (isHorizontal) {
      const smallerNumber = Math.min(x1, x2)
      const biggerNumber = Math.max(x1, x2)
      for (let x = smallerNumber; x <= biggerNumber; x++) {
        const key = getKey(x, y1)
        const hasKey = key in pointsIntersected
        pointsIntersected[key] = (hasKey ? pointsIntersected[key] + 1 : 1)
      }
    } else {
      const smallerNumber = Math.min(y1, y2)
      const biggerNumber = Math.max(y1, y2)
      for (let y = smallerNumber; y <= biggerNumber; y++) {
        const key = getKey(x1, y)
        const hasKey = key in pointsIntersected
        pointsIntersected[key] = (hasKey ? pointsIntersected[key] + 1 : 1)
      }
    }
  })
  return pointsIntersected
}

///////////////////////////////////////////////////////

const parsedData = parseData(data)
const plotData = plotLines(parsedData)

const numPointsOver1 = Object.values(plotData).filter(val => val > 1).length

console.log('number of points with 2 or more:', numPointsOver1) // 8111

