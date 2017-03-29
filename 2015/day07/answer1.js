/*
--- Day 7: Some Assembly Required ---

This year, Santa brought little Bobby Tables a set of wires and bitwise 
logic gates! Unfortunately, little Bobby is a little under the recommended 
age range, and he needs help assembling the circuit.

Each wire has an identifier (some lowercase letters) and can carry a 16-bit 
signal (a number from 0 to 65535). A signal is provided to each wire by a 
gate, another wire, or some specific value. Each wire can only get a signal 
from one source, but can provide its signal to multiple destinations. A gate 
provides no signal until all of its inputs have a signal.

The included instructions booklet describes how to connect the parts 
together: x AND y -> z means to connect wires x and y to an AND gate, 
and then connect its output to wire z.

For example:

123 -> x means that the signal 123 is provided to wire x.
x AND y -> z means that the bitwise AND of wire x and wire y is provided to
wire z.
p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and 
then provided to wire q.
NOT e -> f means that the bitwise complement of the value from wire e is 
provided to wire f.
Other possible gates include OR (bitwise OR) and RSHIFT (right-shift). If, 
for some reason, you'd like to emulate the circuit instead, almost all 
programming languages (for example, C, JavaScript, or Python) provide 
operators for these gates.

For example, here is a simple circuit:

123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
After it is run, these are the signals on the wires:

d: 72
e: 507
f: 492
g: 114
h: 65412
i: 65079
x: 123
y: 456
In little Bobby's kit's instructions booklet (provided as your puzzle input),
what signal is ultimately provided to wire a?
*/

const data = require('./data');
const raw_gates = data.split('\n');

function Gate(input1, input2, verb, output) {
  this.input1 = input1;
  this.input2 = input2;
  this.isInput1Numeric = !isNaN(Number(input1));
  this.isInput2Numeric = !isNaN(Number(input2));
  this.verb = verb;
  this.output = output;
  return this;
}
Gate.prototype.toString = function() {
  if (this.verb === 'LITERAL' || this.verb === 'ASSIGNMENT') {
    return `${this.output} = ${this.input1}`;
  } else if (this.verb === 'NOT') {
    return `${this.output} = !${this.input1}`;
  } else {
    var verbAction = '';
    switch (this.verb) {
      case 'RSHIFT':
        verbAction = '>>';
        break;
      case 'LSHIFT':
        verbAction = '<<';
        break;
      case 'AND':
        verbAction = '&';
        break;
      case 'OR':
        verbAction = '|';
        break;
      default:
        verbAction = this.verb;
        break;
    }
    return `${this.output} = ${this.input1} ${verbAction} ${this.input2}`;
  }
  return JSON.stringify(this);
};


const fs = require('fs');
function log(text) {
  fs.appendFileSync('log.txt', text + '\n');
}

function parseGates(raw_gates) {
  const not_gate = /NOT (.*) -> (.*)/;
  const binary_gate = /(.*) ([A-Z]*) (.*) -> (.*)/;
  const assignment_gate = /(.*) -> (.*)/;
  const gates = [];
  raw_gates.forEach((gate) => {
    if (not_gate.test(gate)) {
      // log('NOT: ' + gate);
      var matches = not_gate.exec(gate);
      gates.push(new Gate(matches[1], null, 'NOT', matches[2]));
    } else if (binary_gate.test(gate)) {
      // log('Binary: ' + gate);
      var matches = binary_gate.exec(gate);
      gates.push(new Gate(matches[1], matches[3], matches[2], matches[4]));
    } else if (assignment_gate.test(gate)) {
      // log('Assignment: ' + gate);
      var matches = assignment_gate.exec(gate);
      if (isNaN(Number(matches[1]))) {
        gates.push(new Gate(matches[1], null, 'ASSIGNMENT', matches[2]));
      }
      else {
        gates.push(new Gate(parseInt(matches[1]), null, 'LITERAL', matches[2]));
      }
    } else {
      log('   *** UNKNOWN GATE --> ' + gate);
    }
  });
  return gates;
}

var gates = parseGates(raw_gates);

// Sort the gates based on verb
gates = gates.sort((a,b) => (a.verb < b.verb ? -1 : (a.verb === b.verb ? 0 : 1)));

///////////////////////////////////////////////

var knownValues = {};
/*
// add the literals to the known values
const literals = gates.filter((gate) => (gate.verb === 'LITERAL'));
literals.forEach((gate) => {
  knownValues[gate.output] = parseInt(gate.input1);
});
*/

///////////////////////////////////////////////

function findGatesToSolve(gates, knownValues) {
  const knownValuesKeys = Object.keys(knownValues);
  return gates.filter((gate) => {
    // 1st requirement: must be unknown
    var isUnknown = knownValuesKeys.indexOf(gate.output) === -1;
    if (!isUnknown) {
      return false;
    }
    // 2nd requirement: input1 is numeric or known
    var hasFirstInput = (knownValuesKeys.indexOf(gate.input1) > -1) ||
      !isNaN(Number(gate.input1));
    // 3rd requirement: input2 is null or known or numeric
    var hasSecondInput = (
      gate.input2 === null ||
      knownValuesKeys.indexOf(gate.input2) > -1 ||
      !isNaN(Number(gate.input2))
    );
    return hasFirstInput && hasSecondInput;
  });
}

function getValue(input, knownValues) {
  return input === null ? null :
    (isNaN(Number(input)) ? knownValues[input] : parseInt(input));
}

function solveGate(gate, knownValues) {
  var input1 = getValue(gate.input1, knownValues);
  var input2 = getValue(gate.input2, knownValues);
  var output = 0;
  switch (gate.verb) {
    case 'NOT':
      output = ~input1;
      break;
    case 'RSHIFT':
      output = input1 >> input2;
      break;
    case 'LSHIFT':
      output = input1 << input2;
      break;
    case 'AND':
      output = input1 & input2;
      break;
    case 'OR':
      output = input1 | input2;
      break;
    default:
      output = input1;
      break;
  }
  return output;
}

function solveGates(gatesToSolve, knownValues) {
  var solutions = {};
  gatesToSolve.forEach((gate) => {
    solutions[gate.output] = solveGate(gate, knownValues);
  });
  return solutions;
}

var pass = 1;
while (knownValues['a'] === undefined) {
  log('---------------------------------------');
  log('pass ' + pass++);
  var gatesToSolve = findGatesToSolve(gates, knownValues);
  var solvedGates = solveGates(gatesToSolve, knownValues);
  knownValues = Object.assign(knownValues, solvedGates);
  var knownValueKeys = Object.keys(knownValues);
  knownValueKeys.forEach((key) => log(`${key} = ${knownValues[key]}`));
}

console.log('a = ' + knownValues['a']);
// NOTE: the answer is 16076


