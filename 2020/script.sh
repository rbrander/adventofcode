#!/bin/bash
mkdir $1
cd $1
echo "module.exports = \`\`" > data.js
echo "const data = require('./data')" > answer1.js
touch answer2.js
code .
