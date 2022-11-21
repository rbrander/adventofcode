/*
--- Day 14: Reindeer Olympics ---

This year is the Reindeer Olympics! Reindeer can fly at high speeds, but must rest occasionally to recover their energy. Santa would like to know which of his reindeer is fastest, and so he has them race.

Reindeer can only either be flying (always at their top speed) or resting (not moving at all), and always spend whole seconds in either state.

For example, suppose you have the following Reindeer:

    Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
    Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.

After one second, Comet has gone 14 km, while Dancer has gone 16 km. After ten seconds, Comet has gone 140 km, while Dancer has gone 160 km. On the eleventh second, Comet begins resting (staying at 140 km), and Dancer continues on for a total distance of 176 km. On the 12th second, both reindeer are resting. They continue to rest until the 138th second, when Comet flies for another ten seconds. On the 174th second, Dancer flies for another 11 seconds.

In this example, after the 1000th second, both reindeer are resting, and Comet is in the lead at 1120 km (poor Dancer has only gotten 1056 km by that point). So, in this situation, Comet would win (if the race ended at 1000 seconds).

Given the descriptions of each reindeer (in your puzzle input), after exactly 2503 seconds, what distance has the winning reindeer traveled?
*/

const data = require('./data')
// const data = require('./testData')

// Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
const regex = /(?<name>[A-Za-z]+) can fly (?<flySpeed>\d+) km\/s for (?<flyTime>\d+) seconds, but then must rest for (?<restTime>\d+) seconds\./g;

console.log('Answer1');
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
const deerStats = regexFindings.map((match) => ({
  name: match.groups.name,
  flySpeed: parseInt(match.groups.flySpeed),
  flyTime: parseInt(match.groups.flyTime),
  restTime: parseInt(match.groups.restTime)
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
let maxDistance = 0;
deerStats.forEach(deer => {
  const distance = calcDistanceTravelled(TIME, deer);
  if (distance > maxDistance) {
    maxDistance = distance;
  }
  console.log(`${deer.name}: ${distance}km`);
})
console.log('max distance:', maxDistance); // 2660