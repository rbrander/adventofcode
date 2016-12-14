/*
--- Day 8: Two-Factor Authentication ---

You come across a door implementing what you can only assume is an implementation of two-factor authentication after a long game of requirements telephone.

To get past the door, you first swipe a keycard (no problem; there was one on a nearby desk). Then, it displays a code on a little screen, and you type that code on a keypad. Then, presumably, the door unlocks.

Unfortunately, the screen has been smashed. After a few minutes, you've taken everything apart and figured out how it works. Now you just have to work out what the screen would have displayed.

The magnetic strip on the card you swiped encodes a series of instructions for the screen; these instructions are your puzzle input. The screen is 50 pixels wide and 6 pixels tall, all of which start off, and is capable of three somewhat peculiar operations:

rect AxB turns on all of the pixels in a rectangle at the top-left of the screen which is A wide and B tall.
rotate row y=A by B shifts all of the pixels in row A (0 is the top row) right by B pixels. Pixels that would fall off the right end appear at the left end of the row.
rotate column x=A by B shifts all of the pixels in column A (0 is the left column) down by B pixels. Pixels that would fall off the bottom appear at the top of the column.
For example, here is a simple sequence on a smaller screen:

rect 3x2 creates a small rectangle in the top-left corner:

###....
###....
.......
rotate column x=1 by 1 rotates the second column down by one pixel:

#.#....
###....
.#.....
rotate row y=0 by 4 rotates the top row right by four pixels:

....#.#
###....
.#.....
rotate column x=1 by 1 again rotates the second column down by one pixel, causing the bottom pixel to wrap back to the top:

.#..#.#
#.#....
.#.....
As you can see, this display technology is extremely powerful, and will soon dominate the tiny-code-displaying-screen market. That's what the advertisement on the back of the display tries to convince you, anyway.

There seems to be an intermediate check of the voltage used by the display: after you swipe your card, if the screen did work, how many pixels should be lit?

--- Part Two ---

You notice that the screen is only capable of displaying capital letters; in the font it uses, each letter is 5 pixels wide and 6 tall.

After you swipe your card, what code is the screen trying to display?

*/

const data = require('./data');
const commands = data.split('\n');

const rectRegex = /rect (\d+)x(\d+)/;
const rotateRegex = /rotate (row|column) (x|y)=(\d+) by (\d+)/;

const NUM_ROWS = 6
const NUM_COLS = 50;

const drawPixels = data => data.forEach(line => 
  console.log(line.map(light => light ? '*' : ' ').join(''))
);

// Create the pixels array and initialize all values to false (light-off)
const pixels = [];
for (var y = 0; y < NUM_ROWS; y++) {
  const line = [];
  for (var x = 0; x < NUM_COLS; x++) {
    line.push(false);
  }
  pixels.push(line);
}

// Iterate over all the commands and apply them to the pixel array
const reducer = (origPixels, command) => {
  // clone origPixels
  const pixels = origPixels.map(arr => arr.slice());
  if (rectRegex.test(command)) {
    const match = command.match(rectRegex);
    const width = match[1];
    const height = match[2];
    for (var y = 0; y < height; y++)
      for (var x = 0; x < width; x++)
        pixels[y][x] = true;
  } else if (rotateRegex.test(command)) {
    const match = command.match(rotateRegex);
    const type = match[1]; // 'row' or 'column'
    if (type === 'row') {
      const row = parseInt(match[3], 10);
      const howMany = parseInt(match[4], 10);
      for (var i = 0; i < howMany; i++)
        pixels[row].unshift(pixels[row].pop());
    } else if (type === 'column') {
      const column = parseInt(match[3], 10);
      const howMany = parseInt(match[4], 10);
      for (var i = 0; i < howMany; i++) {
        const lastOne = pixels[NUM_ROWS - 1][column];
        for (var y = NUM_ROWS - 1; y > 0; y--) {
          pixels[y][column] = pixels[y-1][column];
        }
        pixels[0][column] = lastOne;
      }
    }
  } else {
    throw new Error('Unknown command: ' + command);
  }
  return pixels;
};
const result = commands.reduce(reducer, pixels);

drawPixels(result);
let numLights = 0;
for (var y = 0; y < NUM_ROWS; y++)
  for (var x = 0; x < NUM_COLS; x++)
    numLights += (result[y][x] === true ? 1 : 0);
// Answer: EOARGPHYAO