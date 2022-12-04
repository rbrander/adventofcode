/*
--- Part Two ---

The Elf finishes helping with the tent and sneaks back over to you. "Anyway, the second column says how the round needs to end: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!"

The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. The example above now goes like this:

    In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.
    In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.
    In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.

Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of 12.

Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?
*/

const data = require('./data')
// const data = require('./testData')
const lines = data.split('\n');

const getValuesFromLine = (line) => line.split(' '); // e.g. 'A X' becomes ['A', 'X']

const ROCK = 'A';
const PAPER = 'B';
const SCISSORS = 'C';

const OUTCOME_DRAW = 'draw';
const OUTCOME_WIN = 'win';
const OUTCOME_LOSS = 'loss';
const OUTCOME_SCORES = {
  [OUTCOME_WIN]: 6,
  [OUTCOME_DRAW]: 3,
  [OUTCOME_LOSS]: 0
};

// firstValue will be A, B, or C
// secondValue will be X, Y, or Z
// should return A, B, or C based on secondValue as outcome
const getSecondMapValue = (firstValue, secondValue) => {
  const outcome = valueMap[secondValue] // convert 'X' into 'loss' (OUTCOME_LOSS)
  switch (outcome) {
    case OUTCOME_DRAW:
      return firstValue;
    case OUTCOME_WIN:
      if (firstValue === ROCK) {
        return PAPER
      } else if (firstValue === PAPER) {
        return SCISSORS;
      } else {
        return ROCK;
      }
    case OUTCOME_LOSS:
      if (firstValue === ROCK) {
        return SCISSORS;
      } else if (firstValue === PAPER) {
        return ROCK;
      } else {
        return PAPER;
      }
    default:
      throw new Error("Invalid or missing outcome");
  }
};

// firstValue in [A, B, C]
// secondValue in [X, Y, Z]
const getOutcomeScore = (firstValue, secondValue) => {
  const secondMapValue = getSecondMapValue(firstValue, secondValue);
  if (firstValue === secondMapValue) {
    return OUTCOME_SCORES[OUTCOME_DRAW];
  }
  const isFirstValueBetter = getIsFirstBetter(firstValue, secondMapValue);
  return isFirstValueBetter ? OUTCOME_SCORES[OUTCOME_LOSS] : OUTCOME_SCORES[OUTCOME_WIN];
}


// first value will be A, B, or C
// second value will be X, Y, or Z
const valueMap = {
  [ROCK]: 1, // Rock
  [PAPER]: 2, // Paper
  [SCISSORS]: 3, // Scissors
  'X': OUTCOME_LOSS, // Lose
  'Y': OUTCOME_DRAW, // Draw
  'Z': OUTCOME_WIN  // Win
}

const isRock = (value) => value === ROCK;
const isPaper = (value) => value === PAPER;
const isScissors = (value) => value === SCISSORS;

// NOTE: this will return false for draw
const getIsFirstBetter = (firstValue, secondValue) => {
  if (isRock(firstValue)) {
    return isScissors(secondValue)
  }
  if (isPaper(firstValue)) {
    return isRock(secondValue)
  }
  if (isScissors(firstValue)) {
    return isPaper(secondValue)
  }
};


////////////////////////////

const values = lines.map(getValuesFromLine);

const calcScore = (firstValue, secondValue) => {
  const outcomeScore = getOutcomeScore(firstValue, secondValue);
  const secondMapValue = getSecondMapValue(firstValue, secondValue)
  const secondScore = valueMap[secondMapValue]
  return secondScore + outcomeScore;
};

let totalPoints = values.map(valuePair => calcScore(...valuePair)).reduce((sum, curr) => sum + curr);

console.log('Total points won:', totalPoints); // 13193
