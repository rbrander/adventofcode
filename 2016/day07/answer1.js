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
*/

const data = require('./data');
const lines = data.split('\n');

const isValid = line => {
  // Grab all of the bracketed content
  const bracketedContent = /\[([a-z]+)\]/ig;
  const bracketedMatches = line.match(bracketedContent);
  // bracketedMatches looks like: [ '[arktzcssgkxktejbno]', '[zblrboqsvezcgfmfvcz]' ]

  // Search for ABBA pattern in each bracketed string
  const isBracketedContentAbba = bracketedMatches.reduce((result, match) => result || isAbba(match), false);

  // Short-circuit when there is a pattern in brackets
  if (isBracketedContentAbba) return false;

  // Remove the bracketd content by replacing it with a pipe; then split each word by pipe
  const lineWithoutBracketedContent = line.replace(bracketedContent, '|').split('|');

  // Check each word to see if one of them is ABBA
  return lineWithoutBracketedContent.reduce((result, word) => result || isAbba(word), false);
};

const isAbba = str => {
  // Short-circuit if not enough characters for ABBA pattern
  if (str.length < 4) return false;
  // Iterate through the string, comparing four chars at a time
  for (var i = 0; i <= str.length - 4; i++) {
    // grab the next four characters
    const charGroup = str.substr(i, 4);
    // compare the first and the last
    const isFirstSameAsLast = (charGroup[0] === charGroup[3]);
    // compare the two middle
    const areMiddleCharsSame = (charGroup[1] === charGroup[2]);
    // finally, are the first two chars different
    const areFirstTwoDifferent = (charGroup[0] !== charGroup[1])
    const isValid = areFirstTwoDifferent && isFirstSameAsLast && areMiddleCharsSame;
    if (isValid) return true;
  }
  return false;
};

console.log('# lines =', lines.length);
const validLines = lines.filter(isValid);
const numValid = validLines.length;
console.log('# valid =', numValid);
// Answer: 115
