"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function parseIngredient(ingredientString) {
  let [rest, state] = ingredientString.split(", ");

  //remove unit conversion
  rest = rest.replace(/\([^)]*\)/g, "");

  const quantityRegExp = /^\d+,*\d*/;
  let quantity = quantityRegExp.exec(rest);
  rest = rest.replace(quantityRegExp, "");

  //convert number format to english
  if (quantity) {
    quantity = quantity[0].replace(",", ".");
  } else {
    quantity = undefined;
  }

  let [unit, ingredient] = rest.split(/\s{2,}/);

  //manage entries with no qty
  if (!ingredient) {
    ingredient = unit;
    unit = undefined;
  }

  //remove de or d'
  ingredient = ingredient.trim().replace(/^(de\s|d’)/, "");

  return {
    ingredient: { name: ingredient },
    quantity,
    state,
    unit: unit ? { name: unit } : undefined,
  };
}

async function parseRicardo(url) {
  const response = await axios.get(url);
  const dom = new JSDOM(response.data);
  const {
    name,
    recipeCategory,
    recipeYield,
    recipeInstructions,
    recipeIngredient,
  } = JSON.parse(
    dom.window.document.querySelector('script[type="application/ld+json"]')
      .innerHTML
  );
  const steps = recipeInstructions.reduce(
    (arr, { itemListElement }) =>
      arr.concat(itemListElement.map(({ text }) => ({ text }))),
    []
  );
  const recette = {
    title: name,
    servings: parseInt(recipeYield),
    tags: [{ text: recipeCategory }],
    steps,
    ingredients: recipeIngredient.map(parseIngredient),
  };

  return recette;
}

module.exports = { parseRicardo };
