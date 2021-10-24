module.exports = {
  mutation: `
      createRecipeFromRicardo(url: String): createRecipePayload!
    `,
  resolver: {
    Mutation: {
      createRecipeFromRicardo: {
        resolver: "application::recipe.recipe.createRecipeFromRicardo",
      },
    },
  },
};
