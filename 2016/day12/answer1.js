/*
--- Day 12: Leonardo's Monorail ---

You finally reach the top floor of this building: a garden with a slanted glass ceiling. Looks like there are no more stars to be had.

While sitting on a nearby bench amidst some tiger lilies, you manage to decrypt some of the files you extracted from the servers downstairs.

According to these documents, Easter Bunny HQ isn't just this building - it's a collection of buildings in the nearby area. They're all connected by a local monorail, and there's another building not far from here! Unfortunately, being night, the monorail is currently not operating.

You remotely connect to the monorail control systems and discover that the boot sequence expects a password. The password-checking logic (your puzzle input) is easy to extract, but the code it uses is strange: it's assembunny code designed for the new computer you just assembled. You'll have to execute the code and get the password.

The assembunny code you've extracted operates on four registers (a, b, c, and d) that start at 0 and can hold any integer. However, it seems to make use of only a few instructions:

cpy x y copies x (either an integer or the value of a register) into register y.
inc x increases the value of register x by one.
dec x decreases the value of register x by one.
jnz x y jumps to an instruction y away (positive means forward; negative means backward), but only if x is not zero.
The jnz instruction moves relative to itself: an offset of -1 would continue at the previous instruction, while an offset of 2 would skip over the next instruction.

For example:

cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a
The above code would set register a to 41, increase its value by 2, decrease its value by 1, and then skip the last dec a (because a is not zero, so the jnz a 2 skips it), leaving register a at 42. When you move past the last instruction, the program halts.

After executing the assembunny code in your puzzle input, what value is left in register a?
*/
const DECIMAL_RADIX = 10;
const data = require('./data');
const lines = data.split('\n');

const instructionRegex = /(\w+)\s+([\d\w]+)\s*([-\d\w]*)/;

class Program  {
  constructor(srcCodeLines) {
    this.instructions = srcCodeLines;
    this.regs = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
    };
    this.instructionPointer = 0; // offset of src code
  }

  next() {
    const instruction = this.instructions[this.instructionPointer];
    const instructionParts = instructionRegex.exec(instruction);
    /*
      [0] = instruction (e.g. "jnz c 2")
      [1] = first three letters (e.g. "jnz"),
      [2] is first param,
      [3] is optional second param
    */
    switch (instructionParts[1]) {
      case 'jnz':
        // jnz {comparer to zero} {if true, jump this far from here}
        const isFiniteNotZero = (isFinite(instructionParts[2]) && parseInt(instructionParts[2], DECIMAL_RADIX) !== 0);
        const isNotFiniteAndNotZero = (!isFinite(instructionParts[2]) && this.regs[instructionParts[2]] !== 0);
        if (isFiniteNotZero || isNotFiniteAndNotZero) {
          this.instructionPointer += parseInt(instructionParts[3], DECIMAL_RADIX);
          this.instructionPointer--;
        }
        break;
      case 'inc':
        this.regs[instructionParts[2]]++;
        break;
      case 'dec':
        this.regs[instructionParts[2]]--;
        break;
      case 'cpy':
        this.regs[instructionParts[3]] = isFinite(instructionParts[2]) ?
          parseInt(instructionParts[2], DECIMAL_RADIX) :
          this.regs[instructionParts[2]];
        break;
      default:
        throw 'Unknown Instruction: "' + instructionParts[1] + '"';
    }
    this.instructionPointer++;
  }

  run() {
    while (this.instructionPointer < this.instructions.length)
      this.next();
  }
}

const prog = new Program(lines);
prog.run();
console.log('value of "a" is ' + prog.regs.a);
// answer: 318083
