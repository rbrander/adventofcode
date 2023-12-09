#!/bin/bash
mkdir $1
cd $1
echo "module.exports = {}" > common.js
echo "module.exports = \`\`" > data.js
cp data.js testData.js

cat > answer1.js <<- EOF
/*
*/

const common = require('./common.js');
// const data = require('./data.js')
const data = require('./testData.js')
EOF

cp answer1.js answer2.js
code .
