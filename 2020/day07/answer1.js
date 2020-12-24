/*
--- Day 7: Handy Haversacks ---
You land at the regional airport in time for your next flight. In fact, it looks like you'll even have time to grab some food: all flights are currently delayed due to issues in luggage processing.

Due to recent aviation regulations, many rules (your puzzle input) are being enforced about bags and their contents; bags must be color-coded and must contain specific quantities of other color-coded bags. Apparently, nobody responsible for these regulations considered how long they would take to enforce!

For example, consider the following rules:

light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
These rules specify the required contents for 9 bag types. In this example, every faded blue bag is empty, every vibrant plum bag contains 11 bags (5 faded blue and 6 dotted black), and so on.

You have a shiny gold bag. If you wanted to carry it in at least one other bag, how many different bag colors would be valid for the outermost bag? (In other words: how many colors can, eventually, contain at least one shiny gold bag?)

In the above rules, the following options would be available to you:

A bright white bag, which can hold your shiny gold bag directly.
A muted yellow bag, which can hold your shiny gold bag directly, plus some other bags.
A dark orange bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
A light red bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
So, in this example, the number of bag colors that can eventually contain at least one shiny gold bag is 4.

How many bag colors can eventually contain at least one shiny gold bag? (The list of rules is quite long; make sure you get all of it.)
*/
const DECIMAL_RADIX = 10
const data = require('./data')
const testData = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

// takes a string like '1 bright white bag, 2 muted yellow bags'
// and returns an object like: { 'bright white': 1, 'muted yellow': 2 }
const parseBagsList = (containsStr) => {
  // no other bags
  if (containsStr.indexOf('no other bags') > -1) {
    return ({})
  }

  // parse out each bag quantity and colour name
  const regex = /(([1-9]) (\w+ \w+) bag)/g
  const combinedContents = [...containsStr.matchAll(regex)]
    .reduce((result, [,,qtyStr, colour]) =>
      ({ ...result, [colour]: parseInt(qtyStr, DECIMAL_RADIX) })
    , {})
  return combinedContents
}

// parse the data into meaningful data
const parseData = (data) => {
  const rules = data.split('\n')
  
  // This regex will extract the name of the parent bag, and a single string for the children
  const ruleRegex = /(\w+ \w+) bags contain (.*)./
  const separatedRules = rules.map(rule => {
    const [, bagName, contains] = rule.match(ruleRegex)
    return ({ rule, bagName, contents: parseBagsList(contains) })
  })
  return separatedRules
}

const findNextParent = (dataset, containingChildren) => {
  // look at all the children for instance of containingChild
  const hasChild = rule => (
    containingChildren
      .filter(child => (child in rule.contents))
      .length > 0
  )
   
  const nextParents = dataset
    .filter(hasChild)
    .map(rule => rule.bagName)
  
  if (nextParents.length === 0) {
    return containingChildren
  } else {
    return [...new Set(containingChildren.concat(findNextParent(dataset, nextParents)))]
  }
}

/////////////////////////////////////////////

const MY_PACKAGE_COLOUR = 'shiny gold'
const parsedData = parseData(data)
// const parsedData = parseData(testData)

const nextParents = findNextParent(parsedData, [MY_PACKAGE_COLOUR])
// NOTE: nextParents will include MY_PACKAGE_COLOUR, so subtract 1 from length to compensate
console.log('next parents', nextParents.length - 1) // 112
