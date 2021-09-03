// Imports
const fs = require("fs");
const ethers = require("ethers");
const { abi } = require("./abi");

// Setup contract
const abilityScoreAddress = "0x42a87e04f87a038774fb39c0a61681e7e859937b";
const rpc = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const score = new ethers.Contract(abilityScoreAddress, abi, rpc);

/**
 * Takes substring of stat (removing name) and returns as number
 * @param {string} stat
 * @returns {number} stat cleaned
 */
const returnStat = (stat) => {
  return Number(stat.split(" ")[1]);
};

(async () => {
  // In-mem retrieval
  let retrievedAbilities = [];

  // Collect 1...10000 ids
  for (let i = 1; i <= 10000; i++) {
    console.log("Collecting: ", i);

    // Collect parts
    const [charisma, constitution, dexterity, intelligence, strength, wisdom] =
      await Promise.all([
        score.getCharisma(i),
        score.getConstitution(i),
        score.getDexterity(i),
        score.getIntelligence(i),
        score.getStrength(i),
        score.getWisdom(i),
      ]);

    // Push parts to array
    retrievedAbilities.push({
      [i]: {
        charisma: returnStat(charisma),
        constitution: returnStat(constitution),
        dexterity: returnStat(dexterity),
        intelligence: returnStat(intelligence),
        strength: returnStat(strength),
        wisdom: returnStat(wisdom),
      },
    });
  }

  // Write output
  fs.writeFileSync("./output/scores.json", JSON.stringify(retrievedAbilities));
})();
