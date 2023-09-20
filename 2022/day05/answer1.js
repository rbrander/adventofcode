/*
--- Day 5: Supply Stacks ---

The expedition can depart as soon as the final supplies have been unloaded from the ships. Supplies are stored in stacks of marked crates, but because the needed supplies are buried under many other crates, the crates need to be rearranged.

The ship has a giant cargo crane capable of moving crates between stacks. To ensure none of the crates get crushed or fall over, the crane operator will rearrange them in a series of carefully-planned steps. After the crates are rearranged, the desired crates will be at the top of each stack.

The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot to ask her which crate will end up where, and they want to be ready to unload them as soon as possible so they can embark.

They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input). For example:

    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2

In this example, there are three stacks of crates. Stack 1 contains two crates: crate Z is on the bottom, and crate N is on top. Stack 2 contains three crates; from bottom to top, they are crates M, C, and D. Finally, stack 3 contains a single crate, P.

Then, the rearrangement procedure is given. In each step of the procedure, a quantity of crates is moved from one stack to a different stack. In the first step of the above rearrangement procedure, one crate is moved from stack 2 to stack 1, resulting in this configuration:

[D]
[N] [C]
[Z] [M] [P]
 1   2   3

In the second step, three crates are moved from stack 1 to stack 3. Crates are moved one at a time, so the first crate to be moved (D) ends up below the second and third crates:

        [Z]
        [N]
    [C] [D]
    [M] [P]
 1   2   3

Then, both crates are moved from stack 2 to stack 1. Again, because crates are moved one at a time, crate C ends up below crate M:

        [Z]
        [N]
[M]     [D]
[C]     [P]
 1   2   3

Finally, one crate is moved from stack 1 to stack 2:

        [Z]
        [N]
        [D]
[C] [M] [P]
 1   2   3

The Elves just need to know which crate will end up on top of each stack; in this example, the top crates are C in stack 1, M in stack 2, and Z in stack 3, so you should combine these together and give the Elves the message CMZ.

After the rearrangement procedure completes, what crate ends up on top of each stack?
*/

const data = require('./data')
// const data = require('./testData');

/*
Convert:
[
  "    [D]",
  "[N] [C]",
  "[Z] [M] [P]",
  " 1   2   3"
]
into
[
  ['Z', 'N'],
  ['M', 'C', 'D'],
  ['P']
]
*/
const CHARS_PER_COLUMN = 4; // e.g. " 1   2   3" => " 1  ", " 2  ", " 3"
const processInitialSetupLines = (initialSetupLines) => {
  // First, get the number of columns by looking at the last line
  const [columnLabels, ...stackLines] = initialSetupLines.reverse();
  const numColumnLabels = parseInt(columnLabels.split(/\s+/).reverse()[0], 10);
  // console.log({stackLines, numColumnLabels });

  // create a 2D array to store the stacks
  const stacks = new Array(numColumnLabels).fill().map(() => []);

  // go through each of the stack lines and push them onto the stacks, based on position
  stackLines.forEach((stackLine) => {
    const crateRegex = /\[(.)\]/g
    const matches = stackLine.matchAll(crateRegex);
    for (let match of matches) {
      const stackIndex = Math.floor(match.index / CHARS_PER_COLUMN);
      const crate = match[1];
      stacks[stackIndex].push(crate);
    }
  })

  return stacks;
}

// e.g. "move 1 from 2 to 1" => { quantity: 1, source: 2, destination: 1 }
const processStepLine = (stepLine) => {
  const stepLineRegex = /move (?<quantity>\d+) from (?<source>\d+) to (?<destination>\d+)/g;
  const { groups } = stepLineRegex.exec(stepLine);
  return ({
    quantity: parseInt(groups.quantity, 10),
    source: parseInt(groups.source, 10),
    destination: parseInt(groups.destination, 10)
  })
}

// takes the original data string and converts it into two sections
const processData = (data) => {
  const [initialSetupLines, stepLines] = data.split('\n\n').map(lines => lines.split('\n'));
  const initialSetup = processInitialSetupLines(initialSetupLines);
  const isNotEmptyString = (item) => typeof item === 'string' && item.length > 0;
  const steps = stepLines.filter(isNotEmptyString).map(processStepLine);
  return [initialSetup, steps]
}

// mutate the setup by applying step
const applyStep = (setup, step) => {
  // move step.quantity from step.source to step.destination
  const { quantity, source, destination } = step;
  for (let i = 0; i < quantity; i++) {
    const crate = setup[source - 1].pop();
    setup[destination - 1].push(crate);
  }
}

///////////////////////

console.log('Day 5 -- Supply Stacks');
const [setup, steps] = processData(data);

// process all the steps
steps.forEach(step => { applyStep(setup, step) });

// build a string using the last characters from each stack
const finalString = setup.reduce((str, currStack) => str + currStack.pop() ?? '', '');

console.log('final string is:', finalString); // CMZ
