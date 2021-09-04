// Imports
const fs = require("fs");

(async () => {
  // Load loot data
  const data = await fs.readFileSync("./output/TemporalLoot.json");
  const loot = JSON.parse(data);

  // Calculate attribute rarities
  let rarityIndex = {};
  for (let i = 0; i < loot.length; i++) {
    const attributes = loot[i][(i + 8001).toString()];

    // Add up number of occurences of attributes
    for (const attribute of Object.values(attributes)) {
      rarityIndex[attribute] = rarityIndex[attribute]
        ? rarityIndex[attribute] + 1
        : 1;
    }
  }

  // Output occurences
  await fs.writeFileSync(
    "./output/occurences.json",
    JSON.stringify(rarityIndex)
  );

  // Calculate pure probability
  let probability = [];
  for (let i = 0; i < loot.length; i++) {
    let scores = [];
    const attributes = loot[i][(i + 8001).toString()];

    for (const attribute of Object.values(attributes)) {
      // Collect probability of individual attribute occurences
      scores.push(rarityIndex[attribute] / 8000);
    }

    // Multiply probabilites P(A and B) = P(A) * P(B)
    const p = scores.reduce((a, b) => a * b);
    probability.push({ lootId: i + 8001, score: p });
  }

  // Sort by probability
  probability = probability.sort((a, b) => a.score - b.score);
  // Sort by index of probability
  probability = probability.map((loot, i) => ({
    ...loot,
    // Take ln for better visual score
    score: Math.abs(Math.log(loot.score)),
    rarest: i + 1,
  }));

  // Print loot rarity by score
  await fs.writeFileSync(
    "./output/probability.json",
    JSON.stringify(probability, null, 2)
  );
})();
