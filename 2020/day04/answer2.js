/*
--- Part Two ---
The line is moving more quickly now, but you overhear airport security talking about how passports with invalid data are getting through. Better add some data validation, quick!

You can continue to ignore the cid field, but each other field has strict rules about what values are valid for automatic validation:

byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
Your job is to count the passports where all required fields are both present and valid according to the above rules. Here are some example values:

byr valid:   2002
byr invalid: 2003

hgt valid:   60in
hgt valid:   190cm
hgt invalid: 190in
hgt invalid: 190

hcl valid:   #123abc
hcl invalid: #123abz
hcl invalid: 123abc

ecl valid:   brn
ecl invalid: wat

pid valid:   000000001
pid invalid: 0123456789
Here are some invalid passports:

eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007
Here are some valid passports:

pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719
Count the number of valid passports - those that have all required fields and valid values. Continue to treat cid as optional. In your batch file, how many passports are valid?
*/

const data = require('./data')

const isYearValid = (min, max, value) => {
  const yearNumber = parseInt(value, 10)
  return yearNumber >= min && yearNumber <= max
}

const isHeightValid = (heightStr) => {
  const regex = /(\d+)(in|cm)/
  const isMatch = regex.test(heightStr)
  if (!isMatch) {
    return false 
  }
  const [, value, unit] = heightStr.match(regex)
  const heightValue = parseInt(value, 10)
  const isValid = (
    (unit === 'cm' && heightValue >= 150 && heightValue <= 193) ||
    (unit === 'in' && heightValue >= 59 && heightValue <= 76)
  )
  return isValid
}

const isHairColourValid = (value) => (/^#[0-9a-f]{6}$/.test(value))

const isEyeColourValid = (value) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)

const isPassportIDValid = (value) => (/^\d{9}$/.test(value))

const REQUIRED_FIELDS = {
  'byr': isYearValid.bind(undefined, 1920, 2002), // (Birth Year)
  'iyr': isYearValid.bind(undefined, 2010, 2020), // (Issue Year)
  'eyr': isYearValid.bind(undefined, 2020, 2030), // (Expiration Year)
  'hgt': isHeightValid, // (Height)
  'hcl': isHairColourValid, // (Hair Color)
  'ecl': isEyeColourValid, // (Eye Color)
  'pid': isPassportIDValid  // (Passport ID)
}

const hasRequiredFields = (passport) => (
  Object.keys(REQUIRED_FIELDS)
    .filter(field => field in passport)
    .length === Object.keys(REQUIRED_FIELDS).length
)

const entries = data
  .split('\n\n') // divide up the large text blob into individual passports
  .map(entry => entry.replace(/\n/g, ' ')) // remove any line breaks from passports
  .map(entry => entry
    .split(' ')
    .map(pairStr => pairStr.split(':')) // separate the key and value
    .reduce((entryData, [key, value]) => ({ ...entryData, [key]:value }), {})
  ) // convert string of fields into an object of key/values pairs

const validEntries = entries
  .filter(entry => (
    hasRequiredFields(entry) &&
    // passes each valid rule
    Object.entries(REQUIRED_FIELDS)
      .reduce((result, entryPair) => 
        (result && entryPair[1](entry[entryPair[0]]))
      , true)
  ))

console.log('validEntries.length', validEntries.length) // 160
