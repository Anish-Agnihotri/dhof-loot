// Imports
const fs = require("fs");
const ethers = require("ethers");
const { abi } = require("../../abi");

// Setup contract
const xLootAddress = "0x8bf2f876e2dcd2cae9c3d272f325776c82da366d";
const rpc = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const loot = new ethers.Contract(xLootAddress, abi, rpc);

(async () => {
  // In-mem retrieval
  let retrievedLoot = [];

  // Collect 8001... ids
  for (let i = 8001; i < 16001; i++) {
    console.log("Collecting xLoot: ", i);

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
  fs.writeFileSync("./output/xLoot.json", JSON.stringify(retrievedLoot));
})();
