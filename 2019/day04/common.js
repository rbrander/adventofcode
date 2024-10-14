const RANGE_START = 265275;
const RANGE_END = 781584;

const hasDoubleDigit = (num) =>
  num
    .toString()
    .split("")
    .reduce((hasDouble, digit, idx, arr) => {
      const isLastDigit = idx === arr.length - 1;
      if (isLastDigit) return hasDouble;
      return hasDouble || digit === arr[idx + 1];
    }, false);

const isDescendingDigit = (num) =>
  num
    .toString()
    .split("")
    .map((x) => Number(x))
    .reduce((isDescending, digit, idx, arr) => {
      const isLastDigit = idx === arr.length - 1;
      if (isLastDigit) return isDescending;
      return isDescending || digit > arr[idx + 1];
    }, false);

const hasEvenPairDigit = (num) => {
  const digits = num
    .toString()
    .split("")
    .map((x) => Number(x));

  let pairs = [];
  for (let i = 0; i < digits.length - 1; i++) {
    const isNextSameAsCurr = digits[i] === digits[i + 1];
    if (!isNextSameAsCurr) continue;

    let numConsecutiveDigits = 2;
    for (let j = i + 2; j < digits.length && digits[j] === digits[i]; j++)
      numConsecutiveDigits++;
    const hasEvenNumberOfMatching = numConsecutiveDigits % 2 === 0;
    if (hasEvenNumberOfMatching) {
      pairs.push(digits[i].toString().repeat(numConsecutiveDigits));
    }
    i += numConsecutiveDigits - 1;
  }
  const isPair = (digitStr) =>
    typeof digitStr === "string" &&
    digitStr.length === 2 &&
    digitStr[0] === digitStr[1];
  const numPairsFound = pairs.filter(isPair).length;
  return numPairsFound > 0;
};

module.exports = {
  RANGE_START,
  RANGE_END,
  hasDoubleDigit,
  isDescendingDigit,
  hasEvenPairDigit,
};
