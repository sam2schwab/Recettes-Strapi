"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

async function createIngredientAndUnit(item) {
  //ingredient
  console.log("converting ingredient ", item.ingredient.name);
  let ingredient = await strapi.api.ingredient.services.ingredient.findOne({
    name: item.ingredient.name,
  });
  if (!ingredient) {
    ingredient = await strapi.api.ingredient.services.ingredient.create({
      name: item.ingredient.name,
    });
  }
  //unit
  let unit;
  if (item.unit && item.unit.name) {
    unit = await strapi.api.unit.services.unit.findOne({
      name: item.unit.name,
    });
    if (!unit) {
      unit = await strapi.api.unit.services.unit.create({
        name: item.unit.name,
      });
    }
  }
  console.log("done converting ingredient ", item.ingredient.name);
  return {
    ...item,
    ingredient: ingredient.id,
    unit: unit ? unit.id : undefined,
  };
}

const promiseAllSequence = async (iterable, action) => {
  let res = [];
  for (const x of iterable) {
    res.push(await action(x));
  }
  return res;
};

module.exports = {
  async addToGroceryList({ request }) {
    const recipe = await strapi.api.recipe.services.recipe.findOne({
      id: request.body.recipeId,
    });
    const groceryList = await strapi.api["grocery-list"].services[
      "grocery-list"
    ].find();
    const ingredients =
      groceryList && groceryList.ingredients ? groceryList.ingredients : [];
    const newIngredients = recipe.ingredients.map((ingredient) => ({
      unit: ingredient.unit,
      quantity: ingredient.quantity,
      ingredient: ingredient.ingredient,
    }));
    const updatedIngredients = [...ingredients, ...newIngredients];
    console.dir(groceryList);
    await strapi.api["grocery-list"].services["grocery-list"].createOrUpdate({
      ingredients: updatedIngredients,
    });
    return { success: true };
  },

  async createRecipeFromRicardo({ request }) {
    const recipeData = await strapi.api.recipe.services.recipe.parseRicardo(
      request.body.url
    );

    recipeData.ingredients = await promiseAllSequence(
      recipeData.ingredients,
      createIngredientAndUnit
    );
    const recipe = await strapi.api.recipe.services.recipe.create(recipeData);
    return { recipe };
  },
};
