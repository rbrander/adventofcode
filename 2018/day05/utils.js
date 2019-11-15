const areSameUnits = (a, b) => a.toLowerCase() === b.toLowerCase();
const areOppositePolarities = (a, b) => areSameUnits(a, b) && (a !== b);
const removeUnits = (data, idx) => (
  ((idx === 0) ? '' : data.slice(0, idx)) +
  ((idx >= data.length - 2) ? '' : data.slice(idx + 2))
);

const processData = (data) => {
  let runningData = data;
  let hasUnitToRemove = false;
  do {
    let unitIndexToRemove = -1;
    if (runningData.length >= 2) {
      for (var i = 1; i < runningData.length; i++) {
        const unit1 = runningData[i-1];
        const unit2 = runningData[i];
        if (areOppositePolarities(unit1, unit2)) {
          unitIndexToRemove = i - 1;
          break;
        }
      }
    }
    hasUnitToRemove = (unitIndexToRemove > -1);
    if (hasUnitToRemove) {
      runningData = removeUnits(runningData, i - 1)
    }
  } while (hasUnitToRemove)
  return runningData.length;
};

const getDistinctUnits = (data) => data.split('')
  .reduce((distinctUnits, unit) => {
    distinctUnits.add(unit.toLowerCase())
    return distinctUnits;
  }, new Set());

// assumes unitToRemove is lowercase, and data is a string
const removeAllUnits = (data, unitToRemove) =>
  data
    .split('')
    .filter(x => x.toLowerCase() !== unitToRemove)
    .join('');

module.exports = {
  processData,
  getDistinctUnits,
  removeAllUnits
};
