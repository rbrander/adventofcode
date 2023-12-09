// converts "  41 48 83 86 17  " into [41, 48, 83, 86, 17]
const numsFromString = (numStr) => Array.from(numStr.matchAll(/\d+/g)).map(match => Number(match[0]));

// example input: "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"
const parseLine = (line) => {
  const [card, numbers] = line.split(':');
  const [winningNumbers, myNumbers] = numbers.split('|');
  const parsedLine = {
    card,
    cardNum: numsFromString(card)[0],
    winningNumbers: numsFromString(winningNumbers),
    myNumbers: numsFromString(myNumbers)
  }
  parsedLine.numMatchingNumbers = parsedLine.winningNumbers.filter(num => parsedLine.myNumbers.includes(num)).length;
  parsedLine.numPoints = parsedLine.numMatchingNumbers === 0 ? 0 : (2 ** (parsedLine.numMatchingNumbers - 1));
  parsedLine.rewardedCards = new Array(parsedLine.numMatchingNumbers).fill().map((_, i) => parsedLine.cardNum + i + 1);
  return parsedLine;
}

module.exports = {
  parseLine,
}
