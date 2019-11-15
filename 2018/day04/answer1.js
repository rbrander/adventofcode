//// ANSWER 1

// KNOWNS:
// - all event times are either in the hour of 23 or 00
//   - all sleep/wake actions happen in 00 hour
//   - some guards start in 23 hour, others in 00 hr
//   - sleep and awake actions always have hour set to 00
// - first event is a guard beginning shift
// - last event is a guard waking up
const assert = require('assert');
const { ACTIONS, LINE_REGEX, GUARD_REGEX } = require('./constants');
const { zeroPad, getTimeDiff } = require('./utils');
const data = require('./data');
const lines = data.split('\n').sort();

let currGuardID = undefined;
let guardSleep = {};
let guardSleepMinutes = {};

let prevLine = '';
lines.forEach(line => {
  const [_line, date, time, action] = line.match(LINE_REGEX);
  const [_prevLine, prevDate, prevTime, prevAction] = prevLine.match(LINE_REGEX) || [];
  if (action === ACTIONS.FALLS_ASLEEP) {
    // previous action can be guard starts shift or wakes up
    assert.notEqual(prevAction, ACTIONS.FALLS_ASLEEP, 'previous action must not be falls asleep');

    // nothing to do since all logic is handled by other actions
  } else if (action === ACTIONS.WAKES_UP) {
    // to wake up, you must be sleeping, and you can't start your shift asleep,
    // so that means the previous event must have been fall asleep; thus the time
    // spent asleep is the difference in time between previous event and current

    // test assumption that previous action was fall asleep
    assert.equal(prevAction, ACTIONS.FALLS_ASLEEP, 'wakes up: previous action must not be falls asleep: '+prevAction);

    // Calculate the number of minutes asleep and add it
    const minutesAsleep = getTimeDiff(prevTime, time);
    if (currGuardID in guardSleep) {
      guardSleep[currGuardID].push(minutesAsleep);
    } else {
      guardSleep[currGuardID] = [minutesAsleep];
    }

    // Apply the minutes slept to guardSleepMinutes
    if (!(currGuardID in guardSleepMinutes)) {
      guardSleepMinutes[currGuardID] = {};
    }
    for (let min = minutesAsleep.startMinute; min < minutesAsleep.endMinute; min++) {
      const minute = zeroPad(min);
      const minutes = guardSleepMinutes[currGuardID];
      if (minute in minutes) {
        minutes[minute] += 1;
      } else {
        minutes[minute] = 1;
      }
    }
  } else { // is guard begins shift
    // if previous action was falls asleep, calculate the number of minutes asleep
    assert.notEqual(prevAction, ACTIONS.FALLS_ASLEEP, 'begin shift: previous action must not be falls asleep');

    const [_, guardID] = action.match(GUARD_REGEX);
    // NOTE: guard can start on previous day in 23hr, if this happens, it should
    // use the next day as the date
    // NOTE UPDATE: it should be ok as I believe you only fall asleep once in 00hr
    currGuardID = guardID;
  }
  prevLine = line;
});

// Find which guard had the most sleep
const mostSleep = Object.keys(guardSleep).reduce((mostSleep, currGuardID) => {
  const timeAsleep = guardSleep[currGuardID].reduce((sum, curr) => curr.diff + sum, 0);
  if (mostSleep.time < timeAsleep) {
    return { id: currGuardID, time: timeAsleep };
  }
  return mostSleep;
}, { time: 0 });

// Most sleep is Guard #2663 with 522 minutes of sleep
console.log(`Most sleep is Guard #${mostSleep.id} with ${mostSleep.time} minutes of sleep`);

// Now that we know the guard who slept the longest,
// find what minute this guard falls asleep the most
const minutes = guardSleepMinutes[mostSleep.id];
const maxMinute = Object.keys(minutes)
  .reduce((maxMin, currMin) => (minutes[currMin] > minutes[maxMin] ? currMin : maxMin))

console.log('maxMinute:', maxMinute); // 45

const result = mostSleep.id * maxMinute;
console.log('result:', result); // 119835
