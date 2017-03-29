/*
 *
 *
 *
 *   NOTE: THIS IS NOT QUITE RIGHT!  The answer is suppose to be 55!
 *        I have no idea why this isn't working
 *
 *
 *
 */




const data = require('./data');

const words = data.split(/\s+/);

/*
Now, a nice string is one with all of the following properties:

It contains a pair of any two letters that appears at least twice in the 
string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like 
aaa (aa, but it overlaps).

It contains at least one letter which repeats with exactly one 
letter between them, like xyx, abcdefeghi (efe), or even aaa.

*/

function has2LetterPair(word) {
  if (word.length > 3) {
    for (var i=0; i < word.length-3; i++) {
      var pair = word[i] + word[i+1];
      for (var j=i+2; j < word.length-1; j++) {
        var otherPair = word[j] + word[j+1];
        if (pair == otherPair)
          return true;
      }
    }
  }
  return false;
}

function letterBetween(word) {
  if (word.length > 2) {
    for (var i=0; i < word.length-3; i++) {
      if (word[i] == word[i+2])
        return true;
    }
  }
  return false;
}

function isNiceWord(word) {
  return has2LetterPair(word) && letterBetween(word);
}

///////////////////////////////////////////
// main loop

var numNice = 0;
for (var i=0; i < words.length; i++) {
  var word = words[i];
  if (isNiceWord(word)) {
    numNice++;
  }
}

console.log(numNice);
