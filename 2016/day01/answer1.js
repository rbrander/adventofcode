/*
--- Day 1: No Time for a Taxicab ---

Santa's sleigh uses a very high-precision clock to guide its movements, and the clock's oscillator is regulated by stars. Unfortunately, the stars have been stolen... by the Easter Bunny. To save Christmas, Santa needs you to retrieve all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

You're airdropped near Easter Bunny Headquarters in a city somewhere. "Near", unfortunately, is as close as you can get - the instructions on the Easter Bunny Recruiting Document the Elves intercepted start here, and nobody had time to work them out further.

The Document indicates that you should start at the given coordinates (where you just landed) and face North. Then, follow the provided sequence: either turn left (L) or right (R) 90 degrees, then walk forward the given number of blocks, ending at a new intersection.

There's no time to follow such ridiculous instructions on foot, though, so you take a moment and work out the destination. Given that you can only walk on the street grid of the city, how far is the shortest path to the destination?

For example:

Following R2, L3 leaves you 2 blocks East and 3 blocks North, or 5 blocks away.
R2, R2, R2 leaves you 2 blocks due South of your starting position, which is 2 blocks away.
R5, L5, R5, R3 leaves you 12 blocks away.
How many blocks away is Easter Bunny HQ?
*/

const data = require('./data');

const DIRECTIONS = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
};
let x = 0, y = 0;
let direction = DIRECTIONS.NORTH;

const commandRegex = /([R|L])(\d+)/g;
const commands = data.match(commandRegex);

function changeDirection(newDirection) {
  if (direction === DIRECTIONS.NORTH && newDirection === 'L')
    direction = DIRECTIONS.WEST;
  else if (direction === DIRECTIONS.WEST && newDirection === 'R')
    direction = DIRECTIONS.NORTH;
  else
    direction = (direction + (newDirection === 'R' ? 1 : -1));
}

function addDistance(distance) {
  switch (direction) {
    case DIRECTIONS.NORTH:
      y += distance;
      break;
    case DIRECTIONS.EAST:
      x += distance;
      break;
    case DIRECTIONS.SOUTH:
      y -= distance;
      break;
    case DIRECTIONS.WEST:
      x -= distance;
      break;
    default:
      break;
  }
}

commands.forEach(command => {
  const dir = command[0];
  const dist = parseInt(command.substring(1), 10);
  changeDirection(dir);
  addDistance(dist);
})

console.log('x = ', x, 'y =', y);
// x =  137 y = -106

console.log('dist =', Math.abs(x) + Math.abs(y));
// answer: dist = 243
