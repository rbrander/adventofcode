/*
--- Part Two ---
It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!

Consider again your shiny gold bag and the rules from the above example:

faded blue bags contain 0 other bags.
dotted black bags contain 0 other bags.
vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.
So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags within it) plus 2 vibrant plum bags (and the 11 bags within each of those): 1 + 1*7 + 2 + 2*11 = 32 bags!

Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!

Here's another example:

shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
In this example, a single shiny gold bag must contain 126 other bags.

How many individual bags are required inside your single shiny gold bag?
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

const countBags = (dataset, bags) => {
  const bagsContents = bags
    .map(bagName =>
      Object.entries(
        dataset
          .find(bag => bag.bagName === bagName)
          .contents
      )
      .map(([name, qty]) => new Array(qty).fill(name))
      .flat()
    )
    .flat()
  
  if (bagsContents.length === 0) {
    return 0
  }
  return bagsContents.length + countBags(dataset, bagsContents)
}

/////////////////////////////////////////////

const MY_PACKAGE_COLOUR = 'shiny gold'
const parsedData = parseData(data)
// const parsedData = parseData(testData)
console.log('num bags in shiny gold bag =', countBags(parsedData, [MY_PACKAGE_COLOUR])) // 6260
