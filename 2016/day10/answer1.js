/*
--- Day 10: Balance Bots ---

You come upon a factory in which many robots are zooming around handing small microchips to each other.

Upon closer examination, you notice that each bot only proceeds when it has two microchips, and once it does, it gives each one to a different bot or puts it in a marked "output" bin. Sometimes, bots take microchips from "input" bins, too.

Inspecting one of the microchips, it seems like they each contain a single number; the bots must use some logic to decide what to do with each chip. You access the local control computer and download the bots' instructions (your puzzle input).

Some of the instructions specify that a specific-valued microchip should be given to a specific bot; the rest of the instructions indicate what a given bot should do with its lower-value or higher-value chip.

For example, consider the following instructions:

value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2
Initially, bot 1 starts with a value-3 chip, and bot 2 starts with a value-2 chip and a value-5 chip.
Because bot 2 has two microchips, it gives its lower one (2) to bot 1 and its higher one (5) to bot 0.
Then, bot 1 has two microchips; it puts the value-2 chip in output 1 and gives the value-3 chip to bot 0.
Finally, bot 0 has two microchips; it puts the 3 in output 2 and the 5 in output 0.
In the end, output bin 0 contains a value-5 microchip, output bin 1 contains a value-2 microchip, and output bin 2 contains a value-3 microchip. In this configuration, bot number 2 is responsible for comparing value-5 microchips with value-2 microchips.

Based on your instructions, what is the number of the bot that is responsible for comparing value-61 microchips with value-17 microchips?
*/
var data = require('./data');
var lines = data.split('\n');

// parse data
var valueRegex = /^value (\d+) goes to bot (\d+)$/;
var botGiveRegex = /^bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)$/;

var bots = {}; // key = botID (integer), value = the value held by the bot
var outputs = {}; // key = outputID (integer), value = the value held by the output
var commands = [];

lines.forEach(function(line) {
  if (valueRegex.test(line)) {
    var matches = line.match(valueRegex)
    var chipValue = matches[1];
    var botID = matches[2];

    // append the value to the bot
    if (bots[botID] === undefined) {
      bots[botID] = [];
    }
    bots[botID].push(chipValue);
  } else if (botGiveRegex.test(line)) {
    var matches = line.match(botGiveRegex);
    var command = {
      sourceBotID: matches[1],
      lowDest: matches[2], // 'output' or 'bot'
      lowValue: matches[3],
      highDest: matches[4], // 'output' or 'bot'
      highValue: matches[5],
    };
    commands.push(command);
  } else {
    throw new Error('Unknown string');
  }
});

// find all bots with two values, and apply command(s) that apply to that bot
while (true) {
  const botIDs = Object.keys(bots);
  const fullBots = botIDs.filter(botID => bots[botID].length === 2);
  if (fullBots.length === 0) {
    break;
  }
  fullBots.forEach(botID => {
    const botCommands = commands.filter(command => command.sourceBotID === botID);
    botCommands.forEach(command => {
      // Set the low value
      const low = Math.min.apply(null, bots[botID]);
      if (command.lowDest === 'output') {
        if (outputs[command.lowValue] === undefined) {
          outputs[command.lowValue] = [];
        }
        outputs[command.lowValue].push(low);
      } else if (command.lowDest === 'bot') {
        if (bots[command.lowValue] === undefined) {
          bots[command.lowValue] = [];
        }
        bots[command.lowValue].push(low);
      }
      // set the high value
      const high = Math.max.apply(null, bots[botID]);
      if (command.highDest === 'output') {
        if (outputs[command.highValue] === undefined) {
          outputs[command.highValue] = [];
        }
        outputs[command.highValue].push(high);
      } else if (command.highDest === 'bot') {
        if (bots[command.highValue] === undefined) {
          bots[command.highValue] = [];
        }
        bots[command.highValue].push(high);
      }
      // Answer check: when a bot has two values and they are 61 and 17, then display the bot ID
      if (low === 17 && high === 61) {
        console.log('botID =', botID);
        // answer: 47
      }
      // Now that the bot has passed on the low and high values, clear them from the bot
      bots[botID] = [];
    });
  });
}
