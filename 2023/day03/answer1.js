/*
--- Day 3: Gear Ratios ---

You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..

In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?
*/

const data = require('./data')
// const data = require('./testData');
const lines = data.split('\n');
const grid = lines.map(line => line.split(''));

const findNumbers = (line) => {
  const numberRegex = /(?<number>\d+)/g;
  const results = [];
  const matches = line.matchAll(numberRegex);
  for (let match of matches) {
    results.push({ numStr: match.groups.number, startIndex: match.index });
  }
  return results;
};

// assumes any character that is not a number or a period is a symbol
const isSymbol = (char) => !/^[0-9\.]$/.test(char);

const hasSymbolNearNumber = (numStr, x, y) => {
  // check positions:
  // x - 1 -> x + numStr.length + 1, y - 1
  // x - 1, y
  // x + numStr.length + 1, y
  // x - 1 -> x + numStr.length + 1, y + 1

 // line above
  if (y - 1 >= 0) {
    const lineAbove = lines[y - 1].slice(Math.max(x - 1, 0), Math.min(x + numStr.length + 1, lines[y - 1].length - 1));
    const hasSymbolAboveLine = lineAbove.split('')
      .reduce((hasSymbol, character)=> hasSymbol || isSymbol(character), false);
    if (hasSymbolAboveLine) {
      return true;
    }
  }
  // check before and after on current line
  if (x - 1 >= 0 && isSymbol(grid[y][x - 1])) {
    return true;
  }
  if (x + numStr.length < lines[y].length && isSymbol(grid[y][x + numStr.length])) {
    return true;
  }
  // line below
  if (y + 1 < lines.length) {
    const lineBelow = lines[y + 1].slice(Math.max(x - 1, 0), Math.min(x + numStr.length + 1, lines[y + 1].length - 1));
    const hasSymbolBelowLine = lineBelow.split('')
      .reduce((hasSymbol, character)=> hasSymbol || isSymbol(character), false);
    if (hasSymbolBelowLine) {
      return true;
    }
  }
  return false;
};

////////////////////////////////////////////////////

const validNumbers = [];
const numbersFound = [];
for (let y = 0; y < lines.length; y++) {
  const numbers = findNumbers(lines[y]);
  for (let number of numbers) {
    numbersFound.push(Number(number.numStr));
    if (hasSymbolNearNumber(number.numStr, number.startIndex, y)) {
      validNumbers.push(Number(number.numStr));
    }
  }
}
const sum = validNumbers.reduce((sum, curr) => sum + curr, 0);
console.log('sum:', sum);
