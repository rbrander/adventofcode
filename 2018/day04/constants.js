const LINE_REGEX = /\[(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})\] (wakes up|falls asleep|Guard #\d+ begins shift)/;
const GUARD_REGEX = /Guard #(\d+) begins shift/;
const TIME_REGEX = /(\d{2}):(\d{2})/;

const ACTIONS = {
  BEGINS_SHIFT: 'begins shift',
  WAKES_UP: 'wakes up',
  FALLS_ASLEEP: 'falls asleep'
};

module.exports = {
  LINE_REGEX,
  GUARD_REGEX,
  TIME_REGEX,
  ACTIONS,
};
