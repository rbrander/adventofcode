var md5 = require('md5');

function hasPrefix5zeros(key, i) {
  var hashKey = key + i.toString();
  var hash = md5(hashKey);
  var prefixRegex = /^[0]{5}/;
  return prefixRegex.test(hash);
}

var prefix = 'bgvyzdsv';
var i = 0;
var found = false;
while (!hasPrefix5zeros(prefix, i++));

--i;
console.log('num = ' + i);
console.log('hash = ' + md5(prefix+i));
console.log('hasPrefix5zeros ? ' + hasPrefix5zeros(prefix, i).toString())