/*
--- Day 11: Corporate Policy ---

Santa's previous password expired, and he needs help choosing a new one.

To help him remember his new password after the old one expires, 
Santa has devised a method of coming up with a password based on the 
previous one. Corporate policy dictates that passwords must be exactly 
eight lowercase letters (for security reasons), so he finds his new 
password by incrementing his old password string repeatedly 
until it is valid.

Incrementing is just like counting with numbers: xx, xy, xz, ya, yb,
and so on. Increase the rightmost letter one step; if it was z, it wraps 
around to a, and repeat with the next letter to the left until one doesn't 
wrap around.
*/
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

/*

if curr === z
  curr = a
  return incrment next
else
  curr = curr + 1
return apssword
*/
function incrementPassword(password, idx) {
  idx = idx || password.length - 1;
  const passwordArray = password.split('');
  const currLetter = password[idx];
  if (currLetter === 'z') {
    passwordArray[idx] = 'a';
    return incrementPassword(passwordArray.join(''), idx-1);
  } else {
    passwordArray[idx] = alphabet[alphabet.indexOf(currLetter) + 1];
  }
  return passwordArray.join('');
}

/*
Unfortunately for Santa, a new Security-Elf recently started, and he has 
imposed some additional password requirements:

1) Passwords must include one increasing straight of at least three letters, 
like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; and 
doesn't count.
*/
const meetFirstRequirement = (password) => {
  var result = false;
  if (password.length >= 3) {
    for (var i = 0; i < password.length - 3 && !result; i++) {
      var firstCharIndex = alphabet.indexOf(password[i]);
      var secondCharIndex = alphabet.indexOf(password[i+1]);
      var thirdCharIndex = alphabet.indexOf(password[i+2]);
      result = result || ((secondCharIndex === firstCharIndex + 1) &&
        (thirdCharIndex === secondCharIndex + 1));
    }
  }
  return result;
}

/*
2) Passwords may not contain the letters i, o, or l, as these letters can be 
mistaken for other characters and are therefore confusing.
*/
const meetSecondRequirement = (password) => {
  var result = false;
  for (var i = 0; i < password.length && !result; i++) {
    var char = password.charAt(i);
    result = result || (char === 'i' || char === 'o' || char === 'l');
  }
  return !result;
}

/*
3) Passwords must contain at least two different, non-overlapping pairs of 
letters, like aa, bb, or zz.
*/
const meetThirdRequirement = (password) => {
  var pairs = [];
  if (password.length >= 4) {
    for (var i = 0; i < password.length - 1; i++) {
      var pair = password.charAt(i) + password.charAt(i+1);
      var isPair = pair.charAt(0) == pair.charAt(1);
      if (isPair && pairs.indexOf(pair) == -1) {
        pairs.push(pair);
        i++;
      }
    }
  }
  return pairs.length > 1;
}

/*
For example:

hijklmmn meets the first requirement (because it contains the straight hij) 
but fails the second requirement requirement (because it contains i and l).
abbceffg meets the third requirement (because it repeats bb and ff) but 
fails the first requirement.
abbcegjk fails the third requirement, because it only has one double 
letter (bb).
The next password after abcdefgh is abcdffaa.
The next password after ghijklmn is ghjaabcc, because you eventually 
skip all the passwords that start with ghi..., since i is not allowed.
Given Santa's current password (your puzzle input), what should his 
next password be?

Your puzzle input is vzbxkghb.
*/
var prevPassword = 'vzbxkghb';
const start = new Date();

var done = false;
while (!done) {
  var nextPassword = incrementPassword(prevPassword);

  prevPassword = nextPassword;  

  done = (
    meetFirstRequirement(nextPassword) &&
    meetSecondRequirement(nextPassword) &&
    meetThirdRequirement(nextPassword)
  );
}
console.log('nextPassword = ' + prevPassword);
const finish = new Date();
const diff = finish.valueOf() - start.valueOf();
console.log('took ' + diff + 'ms');

/*
const firstTest = 'hijklmmn';
const secondTest = 'abbceffk';
const thirdTest = 'abbcegjk';

console.log('firstTest = ' + firstTest);
console.log('1st test: firstRequirement: ' + meetFirstRequirement(firstTest).toString());
console.log('1st test: secondRequirement: ' + meetSecondRequirement(firstTest).toString());
console.log('1st test: thirdRequirement: ' + meetThirdRequirement(firstTest).toString());

console.log('secondTest = ' + secondTest);
console.log('2nd test: firstRequirement: ' + meetFirstRequirement(secondTest).toString());
console.log('2nd test: secondRequirement: ' + meetSecondRequirement(secondTest).toString());
console.log('2nd test: thirdRequirement: ' + meetThirdRequirement(secondTest).toString());

console.log('thirdTest = ' + thirdTest);
console.log('3rd test: firstRequirement: ' + meetFirstRequirement(thirdTest).toString());
console.log('3rd test: secondRequirement: ' + meetSecondRequirement(thirdTest).toString());
console.log('3rd test: thirdRequirement: ' + meetThirdRequirement(thirdTest).toString());
*/



