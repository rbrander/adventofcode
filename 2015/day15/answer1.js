/*
--- Day 15: Science for Hungry People ---

Today, you set out on the task of perfecting your milk-dunking 
cookie recipe. All you have to do is find the right 
balance of ingredients.

Your recipe leaves room for exactly 100 teaspoons of ingredients. 
You make a list of the remaining ingredients you could use to finish 
the recipe (your puzzle input) and their properties per teaspoon:
*/
const ingredients = require('./data');

/*
capacity (how well it helps the cookie absorb milk)
durability (how well it keeps the cookie intact when full of milk)
flavor (how tasty it makes the cookie)
texture (how it improves the feel of the cookie)
calories (how many calories it adds to the cookie)

You can only measure ingredients in whole-teaspoon amounts accurately, 
and you have to be accurate so you can reproduce your results in the 
future. The total score of a cookie can be found by adding up each of
the properties (negative totals become 0) and then multiplying together 
everything except calories.

For instance, suppose you have these two ingredients:

Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
*/
/*
const ingredients = {
  Butterscotch: {
    capacity: -1, durability: -2, flavor: 6, texture: 3, calories: 8
  },
  Cinnamon: {
    capacity: 2, durability: 3, flavor: -2, texture: -1, calories: 3
  },
};
*/

/*
Then, choosing to use 44 teaspoons of butterscotch and 56 teaspoons of 
cinnamon (because the amounts of each ingredient must add up to 100) 
would result in a cookie with the following properties:

A capacity of 44*-1 + 56*2 = 68
A durability of 44*-2 + 56*3 = 80
A flavor of 44*6 + 56*-2 = 152
A texture of 44*3 + 56*-1 = 76
Multiplying these together (68 * 80 * 152 * 76, ignoring calories for now)
results in a total score of 62842880, which happens to be the best score 
possible given these ingredients. If any properties had produced a negative 
total, it would have instead become zero, causing the whole score to 
multiply to zero.

Given the ingredients in your kitchen and their properties, what is 
the total score of the highest-scoring cookie you can make?
*/

// assumes quantities is an object where key = ingredient and value = qty
// e.g. { Butterscotch: 44, Cinnamon: 56 }
function calcScore(quantities) {
  // e.g. [ 'Butterscotch', 'Cinnamon']
  var ingredientsNeeded = Object.keys(quantities);
  var ingredientCategories = [
    'capacity',
    'durability',
    'flavor',
    'texture',
  ];
  var ingredientCategoryScore = {};

  var totalScore = 1;
  for (var ingredientCategoryIdx = 0; ingredientCategoryIdx < ingredientCategories.length; ingredientCategoryIdx++) {
    var ingredientCategory = ingredientCategories[ingredientCategoryIdx];
    ingredientCategoryScore[ingredientCategory] = 0;
    for (var i = 0; i < ingredientsNeeded.length; i++) {
      var ingredientName = ingredientsNeeded[i];
      var ingredient = ingredients[ingredientName];
      ingredientCategoryScore[ingredientCategory] += (quantities[ingredientName] || 0) * (ingredient[ingredientCategory] || 0);
    }
    if (ingredientCategoryScore[ingredientCategory] < 0) {
      ingredientCategoryScore[ingredientCategory] = 0;
    }
    totalScore *= ingredientCategoryScore[ingredientCategory];
  }
  return totalScore;
}

// console.log('score = ' + calcScore({Butterscotch: 44, Cinnamon: 56}));
var bestScore = 0;
var bestIngredientQty = {};
for (var numSprinkles = 100; numSprinkles >= 0; numSprinkles--) {
  for (var numButterscotch = 100 - numSprinkles; numButterscotch >= 0; numButterscotch--) {
    for (var numChocolate = 100 - numButterscotch - numSprinkles; numChocolate >= 0; numChocolate--) {
      for (var numCandy = 100 - numChocolate - numButterscotch - numSprinkles; numCandy >= 0; numCandy--) {

        var ingredientQty = {
          Sprinkles: numSprinkles,
          Butterscotch: numButterscotch,
          Chocolate: numChocolate,
          Candy: numCandy,
        };
        var totalQty = (numSprinkles + numButterscotch + numChocolate + numCandy);

        if (totalQty == 100) {
          var currScore = calcScore(ingredientQty);
          if (currScore > bestScore) {
            bestScore = currScore;
            bestIngredientQty = ingredientQty;
          }
        }

      }
    }
  }
}

console.log('qty = ' + JSON.stringify(bestIngredientQty));
console.log('best score = ' + bestScore);
console.log('---------------');
console.log('answer is suppose to be 21367368')


