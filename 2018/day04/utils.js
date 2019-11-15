const { TIME_REGEX } = require('./constants');

const zeroPad = (num) => ('00' + num).substr(-2);

const getTimeDiff = (prevTime, currTime) => {
  const [_prevTime, prevHr, prevMin] = prevTime.match(TIME_REGEX);
  const [_currTime, currHr, currMin] = currTime.match(TIME_REGEX);
  if (prevHr === currHr) {
    const startMinute = Number(prevMin);
    const endMinute = Number(currMin);
    const diff = endMinute - startMinute;
    // return difference in minutes
    return { diff, startMinute, endMinute };
  }
  throw new Error(`Hours don't match: ${prevHr} vs ${currHr}`);
}

module.exports = {
  getTimeDiff,
  zeroPad
};

