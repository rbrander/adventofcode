/*
--- Part Two ---
After some careful analysis, you believe that exactly one instruction is corrupted.

Somewhere in the program, either a jmp is supposed to be a nop, or a nop is supposed to be a jmp. (No acc instructions were harmed in the corruption of this boot code.)

The program is supposed to terminate by attempting to execute an instruction immediately after the last instruction in the file. By changing exactly one jmp or nop, you can repair the boot code and make it terminate correctly.

For example, consider the same program from above:

nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
If you change the first instruction from nop +0 to jmp +0, it would create a single-instruction infinite loop, never leaving that instruction. If you change almost any of the jmp instructions, the program will still eventually find another jmp instruction and loop forever.

However, if you change the second-to-last instruction (from jmp -4 to nop -4), the program terminates! The instructions are visited in this order:

nop +0  | 1
acc +1  | 2
jmp +4  | 3
acc +3  |
jmp -3  |
acc -99 |
acc +1  | 4
nop -4  | 5
acc +6  | 6
After the last instruction (acc +6), the program terminates by attempting to run the instruction below the last instruction in the file. With this change, after the program terminates, the accumulator contains the value 8 (acc +1, acc +1, acc +6).

Fix the program so that it terminates normally by changing exactly one jmp (to nop) or nop (to jmp). What is the value of the accumulator after the program terminates?
*/

const data = require('./data')
// const data = require('./testData')

const INSTRUCTION_REGEX = /([a-z]{3}) ([-\+]\d+)/
const DECIMAL_RADIX = 10

const parseInstructions = data => {
  return data.split('\n')
    .map(line => line.match(INSTRUCTION_REGEX))
}

const getInstructionAddress = (instructions, type, startingIndex) =>
  instructions
    .findIndex(([, operation, argument], idx) => (idx > startingIndex && operation === type))

const execute = (instructions, instructionPointer = 0, runInstructions = new Set(), ACC = 0) => {
  const hasRunInstructionBefore = runInstructions.has(instructionPointer)
  if (hasRunInstructionBefore) {
    return { successful: false, ACC }
  } else {
    runInstructions.add(instructionPointer)
  }
  let nextInstructionPointer = instructionPointer + 1
  const currInstruction = instructions[instructionPointer]
  const [, operation, argument] = currInstruction
  const argumentValue = parseInt(argument, DECIMAL_RADIX)
  switch (operation) {
    case 'acc':
      ACC += argumentValue
      break;
    case 'nop':
      break;
    case 'jmp':
      nextInstructionPointer = instructionPointer + argumentValue
      break;
    default:
      throw new Error(`Unexpected operation: ${operation}`)
  }
  if (nextInstructionPointer < instructions.length) {
    return execute(instructions, nextInstructionPointer, runInstructions, ACC)
  }
  return { successful: true, ACC }
}

const replaceInstruction  = (instructions, replaceIdx, newInstruction) =>
  instructions
    .map((instruction, idx) => (
      idx === replaceIdx
      ? [`${newInstruction} ${instruction[2]}`, newInstruction, instruction[2]]
      : instruction
    ))

const printInstructions = (instructions) => {
  instructions
    .map((item) => item[0])
    .forEach((line, idx) => console.log(`${idx}) ${line}`))
}

const findAndReplace = (instructions) => {
  let replaceIndex = -1
  let isRunSuccessful = false
  do {
    replaceIndex = getInstructionAddress(instructions, 'nop', replaceIndex)
    if (replaceIndex !== -1) {
      const runResult = execute(replaceInstruction(instructions, replaceIndex, 'nop'))
      if (runResult.successful) {
        return { replaceIndex, ACC: runResult.ACC }
      }
    }
  } while (!isRunSuccessful && replaceIndex > -1)
  replaceIndex = -1
  do {
    replaceIndex = getInstructionAddress(instructions, 'jmp', replaceIndex)
    if (replaceIndex !== -1) {
      const runResult = execute(replaceInstruction(instructions, replaceIndex, 'nop'))
      if (runResult.successful) {
        return { replaceIndex, ACC: runResult.ACC }
      }
    }
  } while (!isRunSuccessful && replaceIndex > -1)
  return { replaceIndex: -1, ACC: 0 }
}

///////////////////////////////

const instructions = parseInstructions(data)
const { replaceIndex, ACC } = findAndReplace(instructions)
if (replaceIndex === -1) {
  console.error("No index found!")
  return
}
const isReplaceNOP = instructions[replaceIndex][1] === 'nop'
const replaced = replaceInstruction(instructions, replaceIndex, isReplaceNOP ? 'jmp' : 'nop')
console.log({
  hasExitedSuccessfully: execute(replaced).successful,
  replaceIndex,
  from: instructions[replaceIndex][0],
  to: replaced[replaceIndex][0],
  ACC // 501
})
