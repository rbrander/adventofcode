var md5 = require('md5');

function hasPrefix6zeros(key, i) {
  var hashKey = key + i.toString();
  var hash = md5(hashKey);
  var prefixRegex = /^[0]{6}/;
  return prefixRegex.test(hash);
}

var prefix = 'bgvyzdsv';
var i = 0;
var found = false;
while (!hasPrefix6zeros(prefix, i++));

--i;
console.log('num = ' + i);
console.log('hash = ' + md5(prefix+i));
console.log('hasPrefix6zeros ? ' + hasPrefix6zeros(prefix, i).toString())