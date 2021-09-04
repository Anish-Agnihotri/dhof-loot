// Imports
const fs = require("fs");
const ethers = require("ethers");
const { abi } = require("../../abi");

// Setup contract
const TemporalLootAddress = "0x1dfe7Ca09e99d10835Bf73044a23B73Fc20623DF";
const rpc = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const loot = new ethers.Contract(TemporalLootAddress, abi, rpc);

(async () => {
  // In-mem retrieval
  let retrievedLoot = [];

  // Collect 8001... ids
  for (let i = 8001; i < 1316005; i++) {
    console.log("Collecting Temporal Loot: ", i);

    // Collect parts
    const [chest, foot, hand, head, neck, ring, waist, weapon] =
      await Promise.all([
        loot.getChest(i),
        loot.getFoot(i),
        loot.getHand(i),
        loot.getHead(i),
        loot.getNeck(i),
        loot.getRing(i),
        loot.getWaist(i),
        loot.getWeapon(i),
      ]);

    // Push parts to array
    retrievedLoot.push({
      [i]: {
        chest,
        foot,
        hand,
        head,
        neck,
        ring,
        waist,
        weapon,
      },
    });
  }

  // Write output
  fs.writeFileSync("./output/TemporalLoot.json", JSON.stringify(retrievedLoot));
})();
