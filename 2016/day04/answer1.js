/*
--- Day 4: Security Through Obscurity ---

Finally, you come across an information kiosk with a list of rooms. Of course, the list is encrypted and full of decoy data, but the instructions to decode the list are barely hidden nearby. Better remove the decoy data first.

Each room consists of an encrypted name (lowercase letters separated by dashes) followed by a dash, a sector ID, and a checksum in square brackets.

A room is real (not a decoy) if the checksum is the five most common letters in the encrypted name, in order, with ties broken by alphabetization. For example:

aaaaa-bbb-z-y-x-123[abxyz] is a real room because the most common letters are a (5), b (3), and then a tie between x, y, and z, which are listed alphabetically.
a-b-c-d-e-f-g-h-987[abcde] is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.
not-a-real-room-404[oarel] is a real room.
totally-real-room-200[decoy] is not.
Of the real rooms from the list above, the sum of their sector IDs is 1514.

What is the sum of the sector IDs of the real rooms?
*/

const data = require('./data');
const lines = data.split('\n');

// Each line will have some common pattern (e.g. "aczupnetwp-mfyyj-opalcexpye-977[peyac]"):
// - Encrypted name (e.g. "aczupnetwp-mfyyj-opalcexpye")
// - Sector ID (e.g. 977)
// - Checksum (e.g. peyac)
const roomRegex = /^(.+)-(\d+)\[([a-z]+)\]$/;
const rooms = lines.map(line => ({
  encryptedName: line.match(roomRegex)[1],
  sectorID: parseInt(line.match(roomRegex)[2], 10),
  checksum: line.match(roomRegex)[3],
}));

const getFiveMostCommonLetters = (str) => {
  const counts = {};
  const characters = str.split('')
  // Get a count of each character (a-z)
  characters.forEach(letter => {
    if (letter >= 'a' && letter <= 'z') {
      counts[letter] = (counts[letter] || 0) + 1;
    }
  });
  // transpose the object of counts into an array of objects, for simplicity
  const letterCounts = Object.keys(counts).map(letter => ({ letter, count: counts[letter] }));
  // sort the array by count, then by alphabetization
  const sortedLetterCounts = letterCounts.sort((a, b) => {
    if (a.count === b.count) {
      // sort by letter
      return a.letter > b.letter ? +1 : -1;
    }
    return a.count > b.count ? -1 : +1;
  });
  // Now that we have the results in order, take the first 5 and build a string of the letters
  return sortedLetterCounts
    .filter((_, idx) => idx < 5)
    .reduce((result, item) => result + item.letter, '');
};

// filter out the rooms that are valid by matching their checksum to the most common letters
const validRooms = rooms.filter(room =>
  getFiveMostCommonLetters(room.encryptedName) === room.checksum
);
console.log('num rooms =', rooms.length);
console.log('num valid rooms =', validRooms.length);

// now sum the sectorIDs of the valid rooms
console.log(
  'sum of sector IDs of valid rooms =',
  validRooms.reduce((runningTotal, room) => runningTotal + room.sectorID, 0)
);
/*
num rooms = 974
num valid rooms = 666
sum of sector IDs of valid rooms = 361724
*/