"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

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
};
