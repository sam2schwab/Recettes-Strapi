const { parseRicardo } = require("../api/recipe/services/recipe");

const url = process.argv[2];

(async () => {
  const recette = await parseRicardo(url);

  console.dir(recette, { depth: 5 });
})();
