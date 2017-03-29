/*
In years past, the holiday feast with your family hasn't gone so well. 
Not everyone gets along! This year, you resolve, will be different. You're 
going to find the optimal seating arrangement and avoid all those awkward 
conversations.

You start by writing up a list of everyone invited and the amount their 
happiness would increase or decrease if they were to find themselves 
sitting next to each other person. You have a circular table that will be 
just big enough to fit everyone comfortably, and so each person will have 
exactly two neighbors.

For example, suppose you have only four attendees planned, and you calculate 
heir potential happiness as follows:

Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.

Then, if you seat Alice next to David, Alice would lose 2 happiness units 
(because David talks so much), but David would gain 46 happiness units 
(because Alice is such a good listener), for a total change of 44.

If you continue around the table, you could then seat Bob next to Alice 
(Bob gains 83, Alice gains 54). Finally, seat Carol, who sits next to Bob 
(Carol gains 60, Bob loses 7) and David (Carol gains 55, David gains 41). 
The arrangement looks like this:

     +41 +46
+55   David    -2
Carol       Alice
+60    Bob    +54
     -7  +83
After trying every other seating arrangement in this hypothetical 
scenario, you find that this one is the most optimal, with a total change 
in happiness of 330.

What is the total change in happiness for the optimal seating arrangement 
of the actual guest list?
*/

const rawdata = require('./data');
const data = rawdata.split('\n');

// e.g. Alice would gain 38 happiness units by sitting next to George.
const REGEX = /(.*) would (gain|lose) (\d*) happiness units by sitting next to (.*)\./;
const REGEX_PERSON1 = 1;
const REGEX_PERSON2 = 4;
const REGEX_HAPPINESS = 3;
const REGEX_VERB = 2;

///////////////////////////////////////////////////////////////////////

function Fact(person1, person2, verb, happiness) {
  this.Person1 = person1;
  this.Person2 = person2;
  this.Verb = verb;
  this.Happiness = happiness;
  return this;
}


function parseData(data) {
  return data.map((d) => {
    if (REGEX.test(d)) {
      var matches = REGEX.exec(d);
      return new Fact(
        matches[REGEX_PERSON1],
        matches[REGEX_PERSON2],
        matches[REGEX_VERB],
        matches[REGEX_HAPPINESS]
      );
    }
  }).filter((d) => (d != undefined));
}

const facts = parseData(data);

// get a list of distinct people
const distinctPeople = facts.reduce((
  previousValue,
  // The value previously returned in the last invocation of the callback, 
  // or initialValue, if supplied. (See below.)
  currentValue,
  // The current element being processed in the array.
  currentIndex,
  // The index of the current element being processed in the array.
  array
  // The array reduce was called upon.
) => {
  if (previousValue.indexOf(currentValue.Person1) === -1) {
    previousValue.push(currentValue.Person1);
  }
  if (previousValue.indexOf(currentValue.Person2) === -1) {
    previousValue.push(currentValue.Person2);
  }
  return previousValue;
}, [] /* inital value */);

///////////////////////////////////////////////////////////////////////
// Given distinctPeople, create all possible combinations
// Then find out what each combination's score is in happiness

// combos is an array of all possible combinations, 
// where each item is an array of names
const combos = [];

distinctPeople.forEach((person) => {

})

function genCombo(people, combo) {
  // exit condition
  if (people.length == 0) {
    return combo;
  }

  people.forEach((person) => {
    genCombo(
      people.filter((name) => (name != person), 
      combo.concat(person)
    );
  });
}

var combo = genCombo(distinctPeople, []);



///////////////////////////////////////////////////////////////////////
// output
const fs = require('fs');
fs.writeFileSync('facts.txt', JSON.stringify(facts));
fs.writeFileSync('distinctPeople.txt', JSON.stringify(distinctPeople));


