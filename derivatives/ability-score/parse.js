// Imports
const fs = require("fs");

(async () => {
  // Load loot data
  const data = await fs.readFileSync("./output/ability-scores.json");
  const abilityScores = JSON.parse(data);

  // Rank by individual abilities
  for (const attribute of [
    "charisma",
    "constitution",
    "dexterity",
    "intelligence",
    "strength",
    "wisdom",
  ]) {
    // Array of attribute scores
    let attributeArr = [];

    // For each ability score nft
    for (let i = 0; i < abilityScores.length; i++) {
      // Push score
      const id = i + 1;
      const score = abilityScores[i][id][attribute];
      attributeArr.push({ id, [attribute]: score });
    }

    // Sort descending and save
    attributeArr.sort((a, b) => b[attribute] - a[attribute]);
    await fs.writeFileSync(
      `./output/sort-by-${attribute}.json`,
      JSON.stringify(attributeArr)
    );
  }

  // Overall rank
  let scoreArr = [];
  for (let i = 0; i < abilityScores.length; i++) {
    const id = i + 1;
    // Calculate score by adding up attributes
    const score = Object.keys(abilityScores[i][id]).reduce(
      (sum, key) => sum + abilityScores[i][id][key],
      0
    );
    scoreArr.push({ id, score });
  }

  // Sort score descending
  scoreArr.sort((a, b) => b.score - a.score);
  // Add rank index and save
  scoreArr = scoreArr.map((score, i) => ({
    ...score,
    rank: i + 1,
  }));
  await fs.writeFileSync("./output/score.json", JSON.stringify(scoreArr));
})();
