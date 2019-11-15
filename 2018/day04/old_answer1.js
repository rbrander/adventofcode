// TODO: check start times of 23hr
// ASSUMPTION: guards are awake when they start shift

const { ACTIONS, HOURS_IN_A_DAY, MINS_PER_HOUR, GUARD_REGEX } = require('./constants');
const { sortSmallerTime, invertSorter, zeroPad } = require('./utils');
const data = require('./data');
const lines = data.split('\n').sort();
const LINE_REGEX = /\[(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})\] (wakes up|falls asleep|Guard #\d+ begins shift)/;

const parseLine = (line) => {
  const matches = line.match(LINE_REGEX);
  if (matches instanceof Array && matches.length > 1) {
    const [_, date, time, action] = matches;
    return { date, time, action };
  } else {
    throw new Error('Unable to match line');
  }
};
const parsedLines = lines.map(parseLine);


const groupLinesByID = (parsedLines) => {
  // 1) the lines are sorted by date/time
  // 2) there must be a guard on duty before we have an action to sleep or wake

  // first add the ID of the current guard to wake/sleep actions
  const linesWithID = {};
  let currID = undefined;
  for (var i = 0; i < parsedLines.length; i++) {
    const line = parsedLines[i];
    const hasGuardID = GUARD_REGEX.test(line.action);
    if (hasGuardID) {
      const [_, id] = line.action.match(GUARD_REGEX);
      currID = id;
    }

    const hasID = currID in linesWithID;
    const data = hasGuardID ? Object.assign({}, line, { action: ACTIONS.BEGINS_SHIFT }) : line;
    if (hasID)
      linesWithID[currID].push(data);
    else
      linesWithID[currID] = [data];
  }
  return linesWithID;
};
const groupedLines = groupLinesByID(parsedLines);

///////////////////////////////////
/*
find the smallest time (of all 'begin shift' actions)
- smallest will look for the lowest number after midnight (e.g. 00:33 < 00:44)
- smallest can be before midnight (e.g. 23:48 < 00:01)
- since we are only concerned with the hour 00h - 01h (midnight),
  we can assume any hour > 00h is less than 00h
- meaning time is sorted from 01h00 to 00h59
*/




////////////////////////////
const guardIDs = Object.keys(groupedLines);
// console.log('Guards:', guardIDs.map(x => '#'+x).join(', '),'\n');

/*
const printValues = (arr) => {
  console.log('[\n  '+arr.map(x => JSON.stringify(x)).join(',\n  ') + '\n]\n');
}
*/

const getStartTime = (events) => {
  if (events.length === 0)
    return '';
  else if (events.length === 1)
    return events[0].time;

  const shiftStartTimes = events
    .filter(event => event.action === ACTIONS.BEGINS_SHIFT)
    .map(event => event.time);
  const sortedShiftStarts = shiftStartTimes.sort(sortSmallerTime);
  return sortedShiftStarts[0];
};
const getEndTime = (events) => {
  if (events.length === 0)
    return '';
  else if (events.length === 1)
    return events[0].time;

  const shiftStartTimes = events
    .filter(event => event.action === ACTIONS.BEGINS_SHIFT)
    .map(event => event.time);
  const sortedShiftStarts = shiftStartTimes.sort(invertSorter(sortSmallerTime));
  return sortedShiftStarts[0];
};



//////////////////////////////////////////////
// Iterate over each day's actions









const processGroup = (groupLines) => {
  // Once we have the start time, we know the end time will be 00:59, so we just need to
  // iterate over each minute until the end time
  const startTime = getStartTime(groupLines)

  // subtract one hour from the startTime, so we can assume endtime is 23:59 to make things easier
  const [ startHour, startMin ] = startTime.split(':').map(Number);
  const adjustedHour = (startHour + (HOURS_IN_A_DAY - 1)) % HOURS_IN_A_DAY;

  // Get all the unique dates
  const dates = Array.from(new Set(groupLines.map(line => line.date)));

  // each key will have a boolean value, key will be date
  let isAwake = dates.reduce((data, date) => Object.assign(data, {[date]: true}), {});
  // key is date; value is object with time as key, isAwake as value
  const data = dates.reduce((data, date) => Object.assign(data, {[date]: {}}), {})
  for (let hr = adjustedHour; hr < HOURS_IN_A_DAY; hr++) {
    for (let min = (hr === adjustedHour ? startMin : 0); min < MINS_PER_HOUR; min++) {
      const time = `${zeroPad((hr+1)%HOURS_IN_A_DAY)}:${zeroPad(min)}`;
      const timeActions = groupLines.filter(action => action.time === time);
      timeActions.forEach(action => {
        isAwake[action.date] = (action.action !== ACTIONS.FALLS_ASLEEP);
      });

      if (hr === HOURS_IN_A_DAY - 1) {
        for (const date in data) {
          data[date][time] = isAwake[date]
        }
      }
    }
  }
  return data;
};

const groupAwakeDateTimes = guardIDs.reduce((guardData, guardID) =>
  Object.assign(guardData, { [guardID]: processGroup(groupedLines[guardID]) })
, {});


// provided an object with date as key; values is object with time as key, boolean as value (isAwake)
const printAwakeTimes = (id, datetimes) => {
  console.log(`\nGuard: #${id}`);
  const dates = Object.keys(datetimes);

  // print heading of minutes
  let line1 = '';
  let line2 = '';
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 10; j++) {
      line1 += i.toString();
      line2 += j.toString();
    }
  }
  console.log('Date\tMinute');
  console.log(`\t${line1}`);
  console.log(`\t${line2}`);

  const printTimeline = (date) => {
    const DATE_REGEX = /\d{4}-(\d\d)-(\d\d)/;
    const [_, month, day] = date.match(DATE_REGEX);
    let timeline = '';
    for (var minute = 0; minute < MINS_PER_HOUR; minute++) {
      // time code is going to be '00:MM'
      const time = `00:${zeroPad(minute)}`;
      timeline += (datetimes[date][time] === true /* isAwake */) ? '.' : 'X';
    }
    console.log(`${month}-${day}:\t${timeline}`);
  }

  dates.forEach(printTimeline);
/*
  {
    "1518-11-01": {
      "00:00": true,
      "00:01": true,
      "00:02": true,
      "00:03": true,
      "00:04": true,
      "00:05": false,
      "00:06": false,
      "00:07": false,
      "00:08": false,
      "00:09": false,
      ...
    },
    "1518-11-02": {
      "00:00": true,
      "00:01": true,
      ...
    }
  }
*/
};

// Object.keys(groupAwakeDateTimes).forEach(key => printAwakeTimes(key, groupAwakeDateTimes[key]));



// find the guard with the most amount of sleep
// takes in an object, keyed with date; value is object keyed with time
// returns number of minutes asleep
getNumMinutesAsleep = (guardData) => {
  let numberOfMinutesAsleep = 0;
  for (let date in guardData) {
    for (let time in guardData[date]) {
      numberOfMinutesAsleep += (guardData[date][time] === true ? 0 : 1);
    }
  }
  return numberOfMinutesAsleep;
};

// Object where key is guardID, value is total number of minutes asleep
const guardSleepMinutes = guardIDs.reduce((sleepMinutes, guardID) =>
  Object.assign(sleepMinutes, { [guardID]: getNumMinutesAsleep(groupAwakeDateTimes[guardID]) }), {})

const sleepestGuardID = Object.keys(guardSleepMinutes)
  .reduce((sleepestGuardID, guardID) =>
    ((guardSleepMinutes[guardID] > guardSleepMinutes[sleepestGuardID]) ? guardID : sleepestGuardID));
console.log('sleepestGuardID: ', sleepestGuardID);

// now to find the overlap
// by iterating over all the datetimes for the sleepest guard and finding the first instance
// where there are multiple times the guard is asleep
const findOverlapMinute = (data) => {
  const dates = Object.keys(data);
  for (var i = 0; i < 60; i++) {
    const time = `00:${zeroPad(i)}`;
    const numOverlaps = dates.reduce((sum, date) => data[date][time] === true ? sum : sum + 1, 0);
    if (numOverlaps > 1) {
      return i;
    }
  }
}
const overlapMinute = findOverlapMinute(groupAwakeDateTimes[sleepestGuardID]);
console.log('overlapMinute:', overlapMinute);

// finally, the result is the multiplication of the sleepest guard ID and the minute of overlap

const result = sleepestGuardID * overlapMinute;
console.log('result:', result); // 7989 (wrong answer)

/*
That's not the right answer; your answer is too low. If you're stuck,
there are some general tips on the about page, or you can ask for hints on the subreddit.
Please wait one minute before trying again. (You guessed 7989.) [Return to Day 4]
*/











