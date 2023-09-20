/*
--- Part Two ---

Your device's communication system is correctly detecting packets, but still isn't working. It looks like it also needs to look for messages.

A start-of-message marker is just like a start-of-packet marker, except it consists of 14 distinct characters rather than 4.

Here are the first positions of start-of-message markers for all of the above examples:

    mjqjpqmgbljsphdztnvjfqwrcgsmlb: first marker after character 19
    bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 23
    nppdvjthqldpwncqszvftbrmjlhg: first marker after character 23
    nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 29
    zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 26

How many characters need to be processed before the first start-of-message marker is detected?
*/

const data = require('./data')
// const data = require('./testData')

const hasUniqueLetters = (str) =>
  new Set(str.split('')).size === str.length;

const findMarkerPosition = (data) => {
  const MARKER_LENGTH = 14;
  for (let i = 0; i < data.length - MARKER_LENGTH; i++) {
    const marker = data.slice(i, i + MARKER_LENGTH);
    if (hasUniqueLetters(marker)) {
      return i + MARKER_LENGTH;
    }
  }
  // unable to find marker
  return -1;
}

///////////////////////////////////////////////

const markerPosition = findMarkerPosition(data);
console.log('markerPosition:', markerPosition);
