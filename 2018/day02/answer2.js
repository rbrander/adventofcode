/*
--- Part Two ---
Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.

The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:

abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz
The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.

What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)
*/
const data = require('./data');
const ids = data.split('\n');

const compareIDs = (id1, id2) => {
  // return true if both are same except for one char in same place
  let numDiff = 0;
  if (id1.length !== id2.length)
    return false;
  for (var i = 0; i < id1.length; i++) {
    if (id1[i] !== id2[i]) {
      numDiff++;
      if (numDiff > 1)
        return false;
    }
  }
  return numDiff === 1;
}


const keepSameChars = (id1, id2) => id1.split('').filter((_, idx) => id1[idx] === id2[idx]).join('');

const findCloseID = (ids) => {
  for (var i = 0; i < ids.length - 1; i++) {
    for (var j = i + 1; j < ids.length; j++) {
      if (compareIDs(ids[i], ids[j]))
        return keepSameChars(ids[i], ids[j]);
    }
  }
};

console.log('Matching ID: ', findCloseID(ids)); // bvnfawcnyoeyudzrpgslimtkj






