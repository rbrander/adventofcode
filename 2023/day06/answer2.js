/*
--- Part Two ---

As the race is about to start, you realize the piece of paper with race times and record distances you got earlier actually just has very bad kerning. There's really only one race - ignore the spaces between the numbers on each line.

So, the example from before:

Time:      7  15   30
Distance:  9  40  200

...now instead means this:

Time:      71530
Distance:  940200

Now, you have to figure out how many ways there are to win this single race. In this example, the race lasts for 71530 milliseconds and the record distance you need to beat is 940200 millimeters. You could hold the button anywhere from 14 to 71516 milliseconds and beat the record, a total of 71503 ways!

How many ways can you beat the record in this one much longer race?
*/

const common = require('./common.js');
const data = require('./data.js')
// const data = require('./testData.js')
////////////////////////////////////////////

console.log(data);
const { times, distances } = common.parseData(data);

/*

holding time + running time = total time

holding time * running time = total distance

running time = total time - holding time

total distance = holding time * (total time - holding time)

*/
console.log();

const totalTime = Number(times.join(''));
const totalDistance = Number(distances.join(''));
console.log('Time:', totalTime, 'Distance:', totalDistance);

let distancesGreaterThanMax = 0;
for (let holdingTime = 1; holdingTime < totalTime; holdingTime++) {
  // total distance = holding time * (total time - holding time)
  const distance = holdingTime * (totalTime - holdingTime);
  if (distance > totalDistance) {
    distancesGreaterThanMax++;
  }
}
console.log('answer:', distancesGreaterThanMax);
