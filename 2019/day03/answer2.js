/*
--- Part Two ---
It turns out that this circuit is very timing-sensitive; you actually need to minimize the signal delay.

To do this, calculate the number of steps each wire takes to reach each intersection; choose the intersection where the sum of both wires' steps is lowest. If a wire visits a position on the grid multiple times, use the steps value from the first time it visits that position when calculating the total value of a specific intersection.

The number of steps a wire takes is the total number of grid squares the wire has entered to get to that location, including the intersection being considered. Again consider the example from above:

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
In the above example, the intersection closest to the central port is reached after 8+5+5+2 = 20 steps by the first wire and 7+6+4+3 = 20 steps by the second wire for a total of 20+20 = 40 steps.

However, the top-right intersection is better: the first wire takes only 8+5+2 = 15 and the second wire takes only 7+6+2 = 15, a total of 15+15 = 30 steps.

Here are the best steps for the extra examples from above:

R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83 = 610 steps
R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = 410 steps
What is the fewest combined steps the wires must take to reach an intersection?
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
function getMinStepsFromInput(input) {
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

  // for each interesction, count the steps
  const stepCount = (x, y) =>
    line1.findIndex(([posX, posY]) => posX === x && posY === y) +
    1 +
    line2.findIndex(([posX, posY]) => posX === x && posY === y) +
    1;
  const steps = intersectionPoints.map(([x, y]) => stepCount(x, y));

  const minSteps = Math.min(...steps);
  return minSteps;
}

const minSteps = getMinStepsFromInput(data);
console.log("min steps", minSteps);
