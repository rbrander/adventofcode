#!/bin/bash
mkdir $1
cd $1
echo "module.exports = \`\`" > data.js
cp data.js testData.js
echo "/**/" >> answer1.js
echo "" >> answer1.js
echo "// const data = require('./data')" >> answer1.js
echo "const data = require('./testData')" >> answer1.js
cp answer1.js answer2.js
code .
