/*
--- Part Two ---

Seeing how reindeer move in bursts, Santa decides he's not pleased with the old scoring system.

Instead, at the end of each second, he awards one point to the reindeer currently in the lead. (If there are multiple reindeer tied for the lead, they each get one point.) He keeps the traditional 2503 second time limit, of course, as doing otherwise would be entirely ridiculous.

Given the example reindeer from above, after the first second, Dancer is in the lead and gets one point. He stays in the lead until several seconds into Comet's second burst: after the 140th second, Comet pulls into the lead and gets his first point. Of course, since Dancer had been in the lead for the 139 seconds before that, he has accumulated 139 points by the 140th second.

After the 1000th second, Dancer has accumulated 689 points, while poor Comet, our old champion, only has 312. So, with the new scoring system, Dancer would win (if the race ended at 1000 seconds).

Again given the descriptions of each reindeer (in your puzzle input), after exactly 2503 seconds, how many points does the winning reindeer have?
*/

const data = require('./data')
// const data = require('./testData')

// Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
const regex = /(?<name>[A-Za-z]+) can fly (?<flySpeed>\d+) km\/s for (?<flyTime>\d+) seconds, but then must rest for (?<restTime>\d+) seconds\./g;

console.log('Answer2');
const regexFindings = [...data.matchAll(regex)];
/*
Example regexFindings:
[
  [
    'Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.',
    'Comet',
    '14',
    '10',
    '127',
    index: 0,
    input: 'Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.\n' +
      'Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.',
    groups: [Object: null prototype] {
      name: 'Comet',
      flySpeed: '14',
      flyTime: '10',
      restTime: '127'
    }
  ],
  ...
]
*/

// convert regex matches into useful data structure
const deer = regexFindings.map((match) => ({
  name: match.groups.name,
  flySpeed: parseInt(match.groups.flySpeed),
  flyTime: parseInt(match.groups.flyTime),
  restTime: parseInt(match.groups.restTime),
  points: 0
}));
/*
Example deerStats:
[{
    "name": "Comet",
    "flySpeed": 14,
    "flyTime": 10,
    "restTime": 127
  },...]
*/

const calcDistanceTravelled = (durationInSeconds, deer) => {
  const totalTime = deer.flyTime + deer.restTime;
  const maxFlyDistance = deer.flySpeed * deer.flyTime;
  if (durationInSeconds <= deer.flyTime) {
    return deer.flySpeed * durationInSeconds;
  } else if (durationInSeconds <= totalTime) {
    return maxFlyDistance;
  }
  return maxFlyDistance + calcDistanceTravelled(durationInSeconds - totalTime, deer);
};

///////////////////////////////////////////

const TIME = 2503;

for (let seconds = 1; seconds < TIME; seconds++) {
  // determine who is the lead
  const distances = deer.map((currDeer) => calcDistanceTravelled(seconds, currDeer));
  const leadDistance = distances.reduce((max, curr) => max < curr ? curr : max);
  // update deer points
  deer.forEach((currDeer) => {
    const distance = calcDistanceTravelled(seconds, currDeer);
    if (distance === leadDistance) {
      currDeer.points++;
    }
  })
}
deer.forEach((currDeer) => {
  console.log(`${currDeer.name} scored ${currDeer.points}`);
});
const maxPoints = deer.reduce((max, curr) => max.points > curr.points ? max : curr);
console.log('--------------');
console.log(`Max: ${maxPoints.name} with ${maxPoints.points} points`); // Max: Blitzen with 1256 points
