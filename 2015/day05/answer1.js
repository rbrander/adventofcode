const data = require('./data');

const words = data.split(/\s+/);

function has3vowels(word) {
  return /([aeiou]).*([aeiou]).*([aeiou])/.test(word);
}

function containsDoubleLetter(word) {
  if (word.length > 1) {
    for (var i = 0; i < word.length-1; i++) {
      if (word[i] === word[i+1])
        return true;
    }
  }
  return false;
}

function excludesUnwantedStrings(word) {
  // 'ab', 'cd', 'pq', 'xy'
  return !/(ab|cd|pq|xy)/.test(word);
}

var numNice = 0;
for (var i=0; i < words.length; i++) {
  var word = words[i];
  if (has3vowels(word) && 
    containsDoubleLetter(word) &&
    excludesUnwantedStrings(word)) {
      numNice++;
  }
}

console.log(numNice);
