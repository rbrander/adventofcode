const parseData = (data) => {
  const [timeLine, distanceLine] = data.split('\n');
  const [, timeValues] = timeLine.split(':');
  const [, distanceValues] = distanceLine.split(':');
  const numberRegex = /(?:\s+(\d+))/g;
  const timeValueList = [...timeValues.matchAll(numberRegex)].map(match => Number(match[1]));
  const distanceValueList = [...distanceValues.matchAll(numberRegex)].map(match => Number(match[1]));
  return {
    times: timeValueList,
    distances: distanceValueList
  };
};


module.exports = {
  parseData,
};
