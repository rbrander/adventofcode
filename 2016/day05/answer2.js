/*
--- Day 5: How About a Nice Game of Chess? ---

You are faced with a security door designed by Easter Bunny engineers that seem to have acquired most of their security knowledge by watching hacking movies.

The eight-character password for the door is generated one character at a time by finding the MD5 hash of some Door ID (your puzzle input) and an increasing integer index (starting with 0).

A hash indicates the next character in the password if its hexadecimal representation starts with five zeroes. If it does, the sixth character in the hash is the next character of the password.

For example, if the Door ID is abc:

The first index which produces a hash that starts with five zeroes is 3231929, which we find by hashing abc3231929; the sixth character of the hash, and thus the first character of the password, is 1.
5017308 produces the next interesting hash, which starts with 000008f82..., so the second character of the password is 8.
The third time a hash starts with five zeroes is for abc5278568, discovering the character f.
In this example, after continuing this search a total of eight times, the password is 18f47a30.

Given the actual Door ID, what is the password?

--- Part Two ---

As the door slides open, you are presented with a second door that uses a slightly more inspired security mechanism. Clearly unimpressed by the last version (in what movie is the password decrypted in order?!), the Easter Bunny engineers have worked out a better solution.

Instead of simply filling in the password from left to right, the hash now also indicates the position within the password to fill. You still look for hashes that begin with five zeroes; however, now, the sixth character represents the position (0-7), and the seventh character is the character to put in that position.

A hash result of 000001f means that f is the second character in the password. Use only the first result for each position, and ignore invalid positions.

For example, if the Door ID is abc:

The first interesting hash is from abc3231929, which produces 0000015...; so, 5 goes in position 1: _5______.
In the previous method, 5017308 produced an interesting hash; however, it is ignored, because it specifies an invalid position (8).
The second interesting hash is at index 5357525, which produces 000004e...; so, e goes in position 4: _5__e___.
You almost choke on your popcorn as the final character falls into place, producing the password 05ace8e3.

Given the actual Door ID and this new method, what is the password? Be extra proud of your solution if it uses a cinematic "decrypting" animation.
*/

// NOTE: MD5 library downloaded from https://github.com/blueimp/JavaScript-MD5
const md5 = require('./md5.min.js');
const data = require('./data');

const replaceCharAt = (str, idx, char) => str.slice(0, idx) + char + str.slice(idx + 1);

let password = '_'.repeat(8);
let index = 0;
while (password.includes('_')) {
  const hashStr = data + (index++).toString();
  const hash = md5(hashStr);
  // if the hash starts with 5 zeros, check if the next digit is valid
  if (hash.substr(0, 5) === '00000') {
    const passwordPosition = hash[5];
    if (passwordPosition >= '0' && passwordPosition <= '7') {
      // check if there is already a character at that position
      const position = parseInt(passwordPosition, 10);
      if (password[position] === '_') {
        password = replaceCharAt(password, position, hash[6]);
        console.log(password + ' :: Found digit ' + hash[6] + ', for position ' + hash[5] + ', from ' + hash + ' (md5 of ' + hashStr + ')');
      }
    }
  }
}
/*
4_______ :: Found digit 4, for position 0, from 0000004ed0ede071d293b5f33de2dc2f (md5 of abbhdwsy1910966)
42______ :: Found digit 2, for position 1, from 0000012be6057b2554c26bfddab18b08 (md5 of abbhdwsy1997199)
42___1__ :: Found digit 1, for position 5, from 00000512874cc40b764728993dd71ffb (md5 of abbhdwsy2963716)
42___19_ :: Found digit 9, for position 6, from 0000069710beec5f9a1943a610be52d8 (md5 of abbhdwsy3237361)
42___197 :: Found digit 7, for position 7, from 00000776b6ff41a7e30ed2d4b6663351 (md5 of abbhdwsy7777889)
424__197 :: Found digit 4, for position 2, from 0000024cc74f8456ee0a717f3d9446c3 (md5 of abbhdwsy12850790)
424_0197 :: Found digit 0, for position 4, from 0000040cbee050fc9d43ebef7823c70e (md5 of abbhdwsy12942170)
424a0197 :: Found digit a, for position 3, from 000003af31f09c411f2d74a7c8f41831 (md5 of abbhdwsy25651067)
*/

console.log('password =', password);
// Answer: 424a0197