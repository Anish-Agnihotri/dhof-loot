// Imports
const fs = require("fs");
const ethers = require("ethers");
const { abi } = require("./abi");

// Setup contract
const lootAddress = "0x8707276df042e89669d69a177d3da7dc78bd8723";
const rpc = new ethers.providers.JsonRpcProvider(process.env.RPC_CONNSTRING);
const loot = new ethers.Contract(lootAddress, abi, rpc);

(async () => {
  // In-mem retrieval
  let retrievedLoot = [];

  // Collect 1...8000 ids
  await Promise.all([...Array(8000).keys()].map(async (i) => {
    console.log("Collecting: ", i);

    // Collect parts
    const [clothes, foot, hand, neck, ring, waist, weapon, drugs, vehicle] =
      await Promise.all([
        loot.getClothes(i),
        loot.getFoot(i),
        loot.getHand(i),
        loot.getNeck(i),
        loot.getRing(i),
        loot.getWaist(i),
        loot.getWeapon(i),
        loot.getDrugs(i),
        loot.getVehicle(i),
      ]);

    // Push parts to array
    retrievedLoot.push({
      [i]: {
        clothes,
        foot,
        hand,
        neck,
        ring,
        waist,
        weapon,
        drugs,
        vehicle
      },
    });
  }))

  // Write output
  fs.writeFileSync("./output/loot.json", JSON.stringify(retrievedLoot));
})();
