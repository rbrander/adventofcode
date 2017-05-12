/*
--- Day 11: Radioisotope Thermoelectric Generators ---

You come upon a column of four floors that have been entirely sealed off from the rest of the building except for a small dedicated lobby. There are some radiation warnings and a big sign which reads "Radioisotope Testing Facility".

According to the project status board, this facility is currently being used to experiment with Radioisotope Thermoelectric Generators (RTGs, or simply "generators") that are designed to be paired with specially-constructed microchips. Basically, an RTG is a highly radioactive rock that generates electricity through heat.

The experimental RTGs have poor radiation containment, so they're dangerously radioactive. The chips are prototypes and don't have normal radiation shielding, but they do have the ability to generate an electromagnetic radiation shield when powered. Unfortunately, they can only be powered by their corresponding RTG. An RTG powering a microchip is still dangerous to other microchips.

In other words, if a chip is ever left in the same area as another RTG, and it's not connected to its own RTG, the chip will be fried. Therefore, it is assumed that you will follow procedure and keep chips connected to their corresponding RTG when they're in the same room, and away from other RTGs otherwise.

These microchips sound very interesting and useful to your current activities, and you'd like to try to retrieve them. The fourth floor of the facility has an assembling machine which can make a self-contained, shielded computer for you to take with you - that is, if you can bring it all of the RTGs and microchips.

Within the radiation-shielded part of the facility (in which it's safe to have these pre-assembly RTGs), there is an elevator that can move between the four floors. Its capacity rating means it can carry at most yourself and two RTGs or microchips in any combination. (They're rigged to some heavy diagnostic equipment - the assembling machine will detach it for you.) As a security measure, the elevator will only function if it contains at least one RTG or microchip. The elevator always stops on each floor to recharge, and this takes long enough that the items within it and the items on that floor can irradiate each other. (You can prevent this if a Microchip and its Generator end up on the same floor in this way, as they can be connected while the elevator is recharging.)

You make some notes of the locations of each component of interest (your puzzle input). Before you don a hazmat suit and start moving things around, you'd like to have an idea of what you need to do.

When you enter the containment area, you and the elevator will start on the first floor.

For example, suppose the isolated area has the following arrangement:

The first floor contains 
  - HM: a hydrogen-compatible microchip 
  - LM: and a lithium-compatible microchip.
The second floor contains 
  - HG: a hydrogen generator.
The third floor contains
  - LG: a lithium generator.
The fourth floor contains nothing relevant.
As a diagram (F# for a Floor number, E for Elevator, H for Hydrogen, L for Lithium, M for Microchip, and G for Generator), the initial state looks like this:

F4 .  .  .  .  .  
F3 .  .  .  LG .  
F2 .  HG .  .  .  
F1 E  .  HM .  LM 
Then, to get everything up to the assembling machine on the fourth floor, the following steps could be taken:

Bring the Hydrogen-compatible Microchip to the second floor, which is safe because it can get power from the Hydrogen Generator:

F4 .  .  .  .  .  
F3 .  .  .  LG .  
F2 E  HG HM .  .  
F1 .  .  .  .  LM 
Bring both Hydrogen-related items to the third floor, which is safe because the Hydrogen-compatible microchip is getting power from its generator:

F4 .  .  .  .  .  
F3 E  HG HM LG .  
F2 .  .  .  .  .  
F1 .  .  .  .  LM 
Leave the Hydrogen Generator on floor three, but bring the Hydrogen-compatible Microchip back down with you so you can still use the elevator:

F4 .  .  .  .  .  
F3 .  HG .  LG .  
F2 E  .  HM .  .  
F1 .  .  .  .  LM 
At the first floor, grab the Lithium-compatible Microchip, which is safe because Microchips don't affect each other:

F4 .  .  .  .  .  
F3 .  HG .  LG .  
F2 .  .  .  .  .  
F1 E  .  HM .  LM 
Bring both Microchips up one floor, where there is nothing to fry them:

F4 .  .  .  .  .  
F3 .  HG .  LG .  
F2 E  .  HM .  LM 
F1 .  .  .  .  .  
Bring both Microchips up again to floor three, where they can be temporarily connected to their corresponding generators while the elevator recharges, preventing either of them from being fried:

F4 .  .  .  .  .  
F3 E  HG HM LG LM 
F2 .  .  .  .  .  
F1 .  .  .  .  .  
Bring both Microchips to the fourth floor:

F4 E  .  HM .  LM 
F3 .  HG .  LG .  
F2 .  .  .  .  .  
F1 .  .  .  .  .  
Leave the Lithium-compatible microchip on the fourth floor, but bring the Hydrogen-compatible one so you can still use the elevator; this is safe because although the Lithium Generator is on the destination floor, you can connect Hydrogen-compatible microchip to the Hydrogen Generator there:

F4 .  .  .  .  LM 
F3 E  HG HM LG .  
F2 .  .  .  .  .  
F1 .  .  .  .  .  
Bring both Generators up to the fourth floor, which is safe because you can connect the Lithium-compatible Microchip to the Lithium Generator upon arrival:

F4 E  HG .  LG LM 
F3 .  .  HM .  .  
F2 .  .  .  .  .  
F1 .  .  .  .  .  
Bring the Lithium Microchip with you to the third floor so you can use the elevator:

F4 .  HG .  LG .  
F3 E  .  HM .  LM 
F2 .  .  .  .  .  
F1 .  .  .  .  .  
Bring both Microchips to the fourth floor:

F4 E  HG HM LG LM 
F3 .  .  .  .  .  
F2 .  .  .  .  .  
F1 .  .  .  .  .  
In this arrangement, it takes 11 steps to collect all of the objects at the fourth floor for assembly. (Each elevator stop counts as one step, even if nothing is added to or removed from it.)

In your situation, what is the minimum number of steps required to bring all of the objects to the fourth floor?

Puzzle Input:
The first floor contains 
  - POG: a polonium generator, 
  - THG: a thulium generator, 
  - THM: a thulium-compatible microchip, 
  - PRG: a promethium generator, 
  - RUG: a ruthenium generator, 
  - RUM: a ruthenium-compatible microchip, 
  - COG: a cobalt generator, 
  - COM: and a cobalt-compatible microchip.
The second floor contains
  - POM: a polonium-compatible microchip
  - PRM: and a promethium-compatible microchip.
The third floor contains nothing relevant.
The fourth floor contains nothing relevant.

const floorData = {
  'F1': ['POG', 'THG', 'THM', 'PRG', 'RUG', 'RUM', 'COG', 'COM'],
  'F2': ['POM', 'PRM'],
  'F3': [],
  'F4': [],
};

*/
/*
The first floor contains 
  - HM: a hydrogen-compatible microchip 
  - LM: and a lithium-compatible microchip.
The second floor contains 
  - HG: a hydrogen generator.
The third floor contains
  - LG: a lithium generator.
The fourth floor contains nothing relevant.
*/
const floorData = {
  'F1': ['HM', 'LM'],
  'F2': ['HG'],
  'F3': ['LG'],
  'F4': [],
};
const uniqueValues = Object.keys(floorData)
  .reduce((values, curr) => values.concat(floorData[curr]), []);

// Elevator stuff
let elevatorFloor = 1;
const elevatorData = [];
const FLOOR_UP = 1;
const FLOOR_DOWN = -1;
const moveElevator = (direction) => elevatorFloor += direction;


const print = () => {
  Object.keys(floorData).reverse().forEach(key => {
    const elevator = 'F' + elevatorFloor === key ? 'E' : '.';
    const floorValues = uniqueValues
      .map(value => floorData[key].includes(value) ? value : '. ');
    console.log(key + ' ' + elevator + ' ' + floorValues.join(' '));
  });
  console.log();
};

print();

// RULE: elevator must have at least 1 item to move (microchip or generator) and a max of 2 items
// RULE: elevator stops at all floors (to recharge)
// RULE: chip must be accompanied by generator to prevent destruction
// GOAL: All microchips need to be on the 4th floor

// If I am on the first floor, and I have nothing in the elevator
if (elevatorFloor === 1 && elevatorData.length === 0) {
  // pick something on the floor to take with you
  // 1) a microchip
  // 2) a generator
  // 3) two microchips
  // 4) a generator and a microchip

  // first check to see if there is a pair (chip + generator)
  
}

