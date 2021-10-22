module.exports = {
  definition: `
    type addRecipeToGroceryListResult {
      success: Boolean!
    }
  `,
  mutation: `
    addRecipeToGroceryList(recipeId: ID): addRecipeToGroceryListResult!
  `,
  resolver: {
    Mutation: {
      addRecipeToGroceryList: {
        resolver: "application::recipe.recipe.addToGroceryList",
      },
    },
  },
};
