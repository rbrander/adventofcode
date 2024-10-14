/*
--- Day 3: Crossed Wires ---
The gravity assist was successful, and you're well on your way to the Venus refuelling station. During the rush back on Earth, the fuel management system wasn't completely installed, so that's next on the priority list.

Opening the front panel reveals a jumble of wires. Specifically, two wires are connected to a central port and extend outward on a grid. You trace the path each wire takes as it leaves the central port, one wire per line of text (your puzzle input).

The wires twist and turn, but the two wires occasionally cross paths. To fix the circuit, you need to find the intersection point closest to the central port. Because the wires are on a grid, use the Manhattan distance for this measurement. While the wires do technically cross right at the central port where they both start, this point does not count, nor does a wire count as crossing with itself.

For example, if the first wire's path is R8,U5,L5,D3, then starting from the central port (o), it goes right 8, up 5, left 5, and finally down 3:

...........
...........
...........
....+----+.
....|....|.
....|....|.
....|....|.
.........|.
.o-------+.
...........
Then, if the second wire's path is U7,R6,D4,L4, it goes up 7, right 6, down 4, and left 4:

...........
.+-----+...
.|.....|...
.|..+--X-+.
.|..|..|.|.
.|.-X--+.|.
.|..|....|.
.|.......|.
.o-------+.
...........
These wires cross at two locations (marked X), but the lower-left one is closer to the central port: its distance is 3 + 3 = 6.

Here are a few more examples:

R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83 = distance 159
R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = distance 135
What is the Manhattan distance from the central port to the closest intersection?
*/
const data = require("./data");
// const data = require("./testData");

const convertToStep = (input) => ({
  direction: input[0],
  magnitude: Number(input.slice(1)),
});
const convertLineToSteps = (line) => line.map(convertToStep);

const convertStepsToPoints = (steps) => {
  const points = [];
  let originPoint = [0, 0];
  steps.forEach((step) => {
    let xVel = 0,
      yVel = 0;
    let point = [...originPoint];
    switch (step.direction) {
      case "U":
        yVel = -1;
        break;
      case "D":
        yVel = +1;
        break;
      case "L":
        xVel = -1;
        break;
      case "R":
        xVel = +1;
        break;
      default:
        throw new Error("Invalid direction:", step.direction);
    }
    for (let i = 0; i < step.magnitude; i++) {
      point = [point[0] + xVel, point[1] + yVel];
      points.push(point);
    }
    originPoint = point;
  });
  return points;
};

// input is a string containing two lines of instructions (ie. D12 R34)
function getMinDistanceFromInput(input) {
  // read instructions; input consists of two lines of words, comma separated
  // yields an array of strings, each string starts with a letter and ends with digits
  const inputLines = data.split("\n").map((line) => line.split(","));

  // process both lines into two lists
  const lineSteps = inputLines.map((line) => convertLineToSteps(line));

  // process instructions by adding points to a list as traversed
  const linePoints = lineSteps.map((steps) => convertStepsToPoints(steps));

  // iterate over one list, comparaing aginst second list or intersections
  // ASSUMING we have only two lines
  const [line1, line2] = linePoints;
  const intersectionPoints = line1.filter((line1Point) =>
    line2.some(
      (line2Point) =>
        line1Point[0] === line2Point[0] && line1Point[1] === line2Point[1]
    )
  );

  // for each interesction, find manhatten distance
  const distances = intersectionPoints.map(
    ([x, y]) => Math.abs(x) + Math.abs(y)
  );

  // return min distance
  const minDistance = Math.min(...distances);
  return minDistance;
}

const minDistance = getMinDistanceFromInput(data);
console.log("min distance", minDistance);
