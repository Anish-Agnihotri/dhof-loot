// Imports
const fs = require("fs");

(async () => {
  // Load loot data
  const data = await fs.readFileSync("./output/loot.json");
  const loot = JSON.parse(data);

  // Calculate attribute rarities
  let rarityIndex = {};
  for (let i = 0; i < loot.length; i++) {
    const attributes = loot[i][(i + 1).toString()];

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

  // Calculate occurence scores
  let scores = [];
  for (let i = 0; i < loot.length; i++) {
    let score = 0;
    const attributes = loot[i][(i + 1).toString()];

    for (const attribute of Object.values(attributes)) {
      score += rarityIndex[attribute];
    }
    scores.push({ lootId: i + 1, score });
  }

  // Sort by score
  scores = scores.sort((a, b) => a.score - b.score);
  // Sort by index of score
  scores = scores.map((loot, i) => ({
    ...loot,
    rarest: i + 1,
  }));

  // Print loot rarity by score
  await fs.writeFileSync("./output/rare.json", JSON.stringify(scores));

  // Calculate pure probability
  let probability = [];
  for (let i = 0; i < loot.length; i++) {
    let scores = [];
    const attributes = loot[i][(i + 1).toString()];

    for (const attribute of Object.values(attributes)) {
      // Collect probability of individual attribute occurences
      scores.push(rarityIndex[attribute] / 8000);
    }

    // Multiply probabilites P(A and B) = P(A) * P(B)
    const p = scores.reduce((a, b) => a * b);
    probability.push({ lootId: i + 1, score: p });
  }

  // Sort by probability
  probability = probability.sort((a, b) => a.score - b.score);
  // Sort by index of probability
  probability = probability.map((loot, i) => ({
    ...loot,
    score: Math.abs(Math.log(loot.score)),
    rarest: i + 1,
  }));

  // Print loot rarity by score
  await fs.writeFileSync(
    "./output/probability.json",
    JSON.stringify(probability)
  );
})();
