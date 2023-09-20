/*
--- Part Two ---

As you watch the crane operator expertly rearrange the crates, you notice the process isn't following your prediction.

Some mud was covering the writing on the side of the crane, and you quickly wipe it away. The crane isn't a CrateMover 9000 - it's a CrateMover 9001.

The CrateMover 9001 is notable for many new and exciting features: air conditioning, leather seats, an extra cup holder, and the ability to pick up and move multiple crates at once.

Again considering the example above, the crates begin in the same configuration:

    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

Moving a single crate from stack 2 to stack 1 behaves the same as before:

[D]
[N] [C]
[Z] [M] [P]
 1   2   3

However, the action of moving three crates from stack 1 to stack 3 means that those three moved crates stay in the same order, resulting in this new configuration:

        [D]
        [N]
    [C] [Z]
    [M] [P]
 1   2   3

Next, as both crates are moved from stack 2 to stack 1, they retain their order as well:

        [D]
        [N]
[C]     [Z]
[M]     [P]
 1   2   3

Finally, a single crate is still moved from stack 1 to stack 2, but now it's crate C that gets moved:

        [D]
        [N]
        [Z]
[M] [C] [P]
 1   2   3

In this example, the CrateMover 9001 has put the crates in a totally different order: MCD.

Before the rearrangement process finishes, update your simulation so that the Elves know where they should stand to be ready to unload the final supplies. After the rearrangement procedure completes, what crate ends up on top of each stack?
*/

const data = require('./data')
// const data = require('./testData')

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
  const crates = setup[source - 1].splice(setup[source - 1].length - quantity);
  setup[destination - 1].push(...crates);
}

///////////////////////

console.log('Day 5 -- Supply Stacks');
const [setup, steps] = processData(data);

// process all the steps
steps.forEach(step => { applyStep(setup, step) });

// build a string using the last characters from each stack
const finalString = setup.reduce((str, currStack) => str + currStack.pop() ?? '', '');

console.log('final string is:', finalString); // MCD
