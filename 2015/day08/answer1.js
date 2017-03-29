/*
--- Day 8: Matchsticks ---

Space on the sleigh is limited this year, and so Santa will be 
bringing his list as a digital copy. He needs to know how much 
space it will take up when stored.

It is common in many programming languages to provide a way to 
escape special characters in strings. For example, C, JavaScript, 
Perl, Python, and even PHP handle special characters in very similar ways.

However, it is important to realize the difference between 
the number of characters in the code representation of the 
string literal and the number of characters in the in-memory 
string itself.

For example:

"" is 2 characters of code (the two double quotes), but the 
  string contains zero characters.

"abc" is 5 characters of code, but 3 characters in the string data.

"aaa\"aaa" is 10 characters of code, but the string itself 
  contains six "a" characters and a single, escaped quote character, 
  for a total of 7 characters in the string data.

"\x27" is 6 characters of code, but the string itself contains 
  just one - an apostrophe ('), escaped using hexadecimal notation.

Santa's list is a file that contains many double-quoted string 
literals, one on each line. The only escape sequences used are: 

\\ (which represents a single backslash), 
\" (which represents a lone double-quote character), and 
\x plus two hexadecimal characters (which represents a single 
   character with that ASCII code).

Disregarding the whitespace in the file, what is the number of 
characters of code for string literals minus the number of 
characters in memory for the values of the strings in total for 
the entire file?

For example, given the four strings above, the total number of 
characters of string code (2 + 5 + 10 + 6 = 23) minus the total 
number of characters in memory for string values 
(0 + 3 + 7 + 1 = 11) is 23 - 11 = 12.
*/

/****
** FOUND ANSWER - on reddit
'use strict';
let input = document.body.textContent.trim().split('\n'),
    [esc, char] = [/\\(?:"|\\)/g, /\\x[0-9a-f]{2}/g],
    matches = (re, s) => (s.match(re) || []).length,
    clean = s => s.replace(esc, 'X'),
    diff1 = s => 2 +     matches(esc, s) + 3 * matches(char, clean(s)),
    diff2 = s => 4 + 2 * matches(esc, s) +     matches(char, clean(s)),
    countAll = (f, arr) => arr.reduce((a, b) => a + f(b), 0);

console.log([diff1, diff2].map(f => countAll(f, input)));
*/


const data = require('./data');
const dataItems = data.split(/\s+/);
/////////////////////////////

/*
var input = data.trim().split('\n'),
    esc = /\\(?:"|\\)/g, 
    char = /\\x[0-9a-f]{2}/g,
    matches = (re, s) => (s.match(re) || []).length,
    clean = s => s.replace(esc, 'X'),
    diff1 = s => 2 +     matches(esc, s) + 3 * matches(char, clean(s)),
    diff2 = s => 4 + 2 * matches(esc, s) +     matches(char, clean(s)),
    countAll = (f, arr) => arr.reduce((a, b) => a + f(b), 0);

console.log([diff1, diff2].map(f => countAll(f, input)));
*/


//////////////////////////////////

// const phraseIdx = 148; // ~~(Math.random() * dataItems.length);
const rawphrase = '"first:\\ second:\" third:\x41 first:\\ second:\" third:\x42"'; // dataItems[phraseIdx];
// const phrase = rawphrase.substring(1, rawphrase.length-1); 

/******
** another solution I found on reddit

var str = document.body.innerText.trim();

var partOne = 0;
var partTwo = 0;

str.split('\n').forEach(function(s, i) {
    partOne += s.length - eval(s).length;
    partTwo += JSON.stringify(s).length - s.length;
});

console.log('Part One:', partOne);
console.log('Part Two:', partTwo);
*/


var partOne = 0;
var partTwo = 0;

dataItems.forEach(function(s, i) {
    partOne += s.length - eval(s).length;
    partTwo += JSON.stringify(s).length - s.length;
});

console.log('Part One:', partOne);
console.log('Part Two:', partTwo);

/*
const calc = (str) => {
  // console.log('str = ' + str);
  // console.log('JSON.stringify(str) = ' + JSON.stringify(str));
  return JSON.stringify(str).length;  
};

const total = dataItems.reduce((prev, curr) => (prev + calc(curr)), 0);
console.log('total = ' + total);
*/

// calc(phrase);

/*
console.log('phraseIdx = ' + phraseIdx);
console.log('phrase = ' + phrase);
console.log('phrase.length = ' + phrase.length);
console.log('escape(phrase) = ' + escape(phrase));
console.log('escape(phrase).length = ' + escape(phrase).length);
console.log('phrase.replace() = ' + phrase.replace(/\\\\/, '\\\\'));
console.log('phrase.replace().length = ' + phrase.replace(/\\\\/, '\\\\').length);
*/
