/*
--- Day 7: Internet Protocol Version 7 ---

While snooping around the local network of EBHQ, you compile a list of IP addresses (they're IPv7, of course; IPv6 is much too limited). You'd like to figure out which IPs support TLS (transport-layer snooping).

An IP supports TLS if it has an Autonomous Bridge Bypass Annotation, or ABBA. An ABBA is any four-character sequence which consists of a pair of two different characters followed by the reverse of that pair, such as xyyx or abba. However, the IP also must not have an ABBA within any hypernet sequences, which are contained by square brackets.

For example:

abba[mnop]qrst supports TLS (abba outside square brackets).
abcd[bddb]xyyx does not support TLS (bddb is within square brackets, even though xyyx is outside square brackets).
aaaa[qwer]tyui does not support TLS (aaaa is invalid; the interior characters must be different).
ioxxoj[asdfgh]zxcvbn supports TLS (oxxo is outside square brackets, even though it's within a larger string).
How many IPs in your puzzle input support TLS?

--- Part Two ---

You would also like to know which IPs support SSL (super-secret listening).

An IP supports SSL if it has an Area-Broadcast Accessor, or ABA, anywhere in the supernet sequences (outside any square bracketed sections), and a corresponding Byte Allocation Block, or BAB, anywhere in the hypernet sequences. An ABA is any three-character sequence which consists of the same character twice with a different character between them, such as xyx or aba. A corresponding BAB is the same characters but in reversed positions: yxy and bab, respectively.

For example:

aba[bab]xyz supports SSL (aba outside square brackets with corresponding bab within square brackets).
xyx[xyx]xyx does not support SSL (xyx, but no corresponding yxy).
aaa[kek]eke supports SSL (eke in supernet with corresponding kek in hypernet; the aaa sequence is not related, because the interior character must be different).
zazbz[bzb]cdb supports SSL (zaz has no corresponding aza, but zbz has a corresponding bzb, even though zaz and zbz overlap).
How many IPs in your puzzle input support SSL?
*/

const data = require('./data');
const lines = data.split('\n');

const isValid = line => {
  // Grab all of the bracketed content
  const bracketedContent = /\[([a-z]+)\]/ig;
  const bracketedMatches = line.match(bracketedContent);
  // bracketedMatches looks like: [ '[arktzcssgkxktejbno]', '[zblrboqsvezcgfmfvcz]' ]

  const numAbaMatches = bracketedMatches.reduce((result, match) => result + (isAba(match) ? 1 : 0), 0);
  if (numAbaMatches > 0)  {
    const abaPatterns = bracketedMatches.reduce((result, match) => 
      isAba(match) ? result.concat(getAba(match)) : result, []);

    // Remove the bracketed content by replacing it with a pipe; then split each word by pipe
    const lineWithoutBracketedContent = line.replace(bracketedContent, '|').split('|');

    // Check each aba pattern for the inverse in the non-bracketed content
    const foundBab = abaPatterns.reduce((result, pattern) => {
      const bab = getInverseAba(pattern);
      return result || lineWithoutBracketedContent.reduce((foundBabInWord, word) => 
          foundBabInWord || word.includes(bab), false);
      }, false);
    if (foundBab) return true;
  }
  return false;
};

const getAba = str => {
  // Short-circuit if not enough characters for ABA pattern
  if (str.length < 3) return [];
  // Iterate through the string, comparing four chars at a time
  const foundValues = [];
  for (var i = 0; i <= str.length - 3; i++) {
    // grab the next four characters
    const charGroup = str.substr(i, 3);
    // compare the first and the last
    const isFirstSameAsLast = (charGroup[0] === charGroup[2]);
    // finally, are the first two chars different
    const areFirstTwoDifferent = (charGroup[0] !== charGroup[1])
    const isValid = areFirstTwoDifferent && isFirstSameAsLast;
    if (isValid) foundValues.push(charGroup);
  }
  return foundValues;
}
const getInverseAba = aba => aba[1] + aba[0] + aba[1];
const isAba = str => getAba(str).length > 0;

console.log('# lines =', lines.length);
const validLines = lines.filter(isValid);
const numValid = validLines.length;
console.log('# valid =', numValid);
// Answer: 231
