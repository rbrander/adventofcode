/*
--- Part Two ---
The air conditioner comes online! Its cold air feels good for a while, but then the TEST alarms start to go off. Since the air conditioner can't vent its heat anywhere but back into the spacecraft, it's actually making the air inside the ship warmer.

Instead, you'll need to use the TEST to extend the thermal radiators. Fortunately, the diagnostic program (your puzzle input) is already equipped for this. Unfortunately, your Intcode computer is not.

Your computer is only missing a few opcodes:

Opcode 5 is jump-if-true: if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
Opcode 6 is jump-if-false: if the first parameter is zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
Opcode 7 is less than: if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
Opcode 8 is equals: if the first parameter is equal to the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
Like all instructions, these instructions need to support parameter modes as described above.

Normally, after an instruction is finished, the instruction pointer increases by the number of values in that instruction. However, if the instruction modifies the instruction pointer, that value is used and the instruction pointer is not automatically increased.

For example, here are several programs that take one input, compare it to the value 8, and then produce one output:

3,9,8,9,10,9,4,9,99,-1,8 - Using position mode, consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not).
3,9,7,9,10,9,4,9,99,-1,8 - Using position mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).
3,3,1108,-1,8,3,4,3,99 - Using immediate mode, consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not).
3,3,1107,-1,8,3,4,3,99 - Using immediate mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).
Here are some jump tests that take an input, then output 0 if the input was zero or 1 if the input was non-zero:

3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9 (using position mode)
3,3,1105,-1,9,1101,0,0,12,4,12,99,1 (using immediate mode)
Here's a larger example:

3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99
The above example program uses an input instruction to ask for a single number. The program will then output 999 if the input value is below 8, output 1000 if the input value is equal to 8, or output 1001 if the input value is greater than 8.

This time, when the TEST diagnostic program runs its input instruction to get the ID of the system to test, provide it 5, the ID for the ship's thermal radiator controller. This diagnostic test suite only outputs one number, the diagnostic code.

What is the diagnostic code for system ID 5?
*/

const data = require("./data.js");
// const data = require("./testData.js");

const intList = data.split(",").map((x) => Number(x));

const processIntList = (intList, input) => {
  const MEMORY = [...intList];
  let OUTPUT = [];
  let instructionPointer = 0; // instruction pointer

  while (instructionPointer < MEMORY.length) {
    const [parameterMode3, parameterMode2, parameterMode1, opCode1, opCode2] =
      MEMORY[instructionPointer].toString().padStart(5, "0");
    const isParam1Positional = parameterMode1 === "0";
    const isParam2Positional = parameterMode2 === "0";
    const isParam3Positional = parameterMode3 === "0";

    const opCode = Number(opCode1 + opCode2);
    switch (opCode) {
      case 1:
      case 2: {
        // Opcode 1 adds together numbers read from two positions and stores the result in a third position
        // Opcode 2 works exactly like opcode 1, except it multiplies the two inputs instead of adding them
        const param1 = MEMORY[instructionPointer + 1];
        const param1Value = isParam1Positional ? MEMORY[param1] : param1;
        const param2 = MEMORY[instructionPointer + 2];
        const param2Value = isParam2Positional ? MEMORY[param2] : param2;
        const outAddr = MEMORY[instructionPointer + 3];
        const isAddition = opCode === 1;
        MEMORY[outAddr] = isAddition
          ? param1Value + param2Value
          : param1Value * param2Value;
        instructionPointer += 4;
        break;
      }
      case 3: {
        // input
        const outAddr = MEMORY[instructionPointer + 1];
        MEMORY[outAddr] = input;
        instructionPointer += 2;
        break;
      }
      case 4: {
        // output
        const param1 = MEMORY[instructionPointer + 1];
        OUTPUT.push(isParam1Positional ? MEMORY[param1] : param1);
        instructionPointer += 2;
        break;
      }
      case 5:
      case 6: {
        // Opcode 5 is jump-if-true: if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
        // Opcode 6 is jump-if-false: if the first parameter is zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
        const param1 = MEMORY[instructionPointer + 1];
        const param1Value = isParam1Positional ? MEMORY[param1] : param1;
        const shouldInstructionPointerGetSet =
          (opCode === 5 && param1Value !== 0) ||
          (opCode === 6 && param1Value === 0);
        if (shouldInstructionPointerGetSet) {
          const param2 = MEMORY[instructionPointer + 2];
          const param2Value = isParam2Positional ? MEMORY[param2] : param2;
          instructionPointer = param2Value;
        } else instructionPointer += 3;
        break;
      }
      case 7:
      case 8: {
        // Opcode 7 is less than: if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
        // Opcode 8 is equals: if the first parameter is equal to the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
        const param1 = MEMORY[instructionPointer + 1];
        const param1Value = isParam1Positional ? MEMORY[param1] : param1;
        const param2 = MEMORY[instructionPointer + 2];
        const param2Value = isParam2Positional ? MEMORY[param2] : param2;
        const param3 = MEMORY[instructionPointer + 3];
        const isLessThan = param1Value < param2Value;
        const isEqual = param1Value === param2Value;
        const storeValue =
          (opCode === 7 && isLessThan) || (opCode === 8 && isEqual) ? 1 : 0;
        MEMORY[param3] = storeValue;
        instructionPointer += 4;
        break;
      }
      case 99:
        // halt
        return OUTPUT;
      default:
        throw new Error("Error, unknown opcode:", opCode);
    }
  }
};

console.log("OUTPUT =", processIntList(intList, 5));
