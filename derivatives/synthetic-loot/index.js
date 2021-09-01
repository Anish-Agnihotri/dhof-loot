// Imports
const fs = require("fs");
const crypto = require("crypto");
const ethers = require("ethers");
const keccak = require("keccak");
const { abi } = require("./abi");
const secp256k1 = require("secp256k1");

// Setup contract (recommend forknet for speed)
// @dev Improvement: can transcribe solidity functions to JS for speed
const syntheticLootAddress = "0x869Ad3Dfb0F9ACB9094BA85228008981BE6DBddE";
const rpc = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const syntheticLoot = new ethers.Contract(syntheticLootAddress, abi, rpc);

/**
 * Inspired by @bokub's vanity-eth generation
 * @returns {Record<{ address: string, privateKey: string }>} wallet details
 */
const generateWallet = () => {
  const privateKeyBytes = crypto.randomBytes(32);
  const pub = secp256k1.publicKeyCreate(privateKeyBytes, false).slice(1);
  const address = keccak("keccak256")
    .update(pub)
    .digest()
    .slice(-20)
    .toString("hex");

  return {
    address,
    privateKey: privateKeyBytes.toString("hex"),
  };
};

/**
 * Checks if an address has a Divine Robe via Synthetic Loot
 * @param {string} address to check
 * @returns {bool} true/false status
 */
const checkDivineRobe = async (address) => {
  const chest = await syntheticLoot.getChest(address);
  return chest.includes("Divine Robe");
};

(async () => {
  // Inifinite loop
  while (true) {
    // Generate wallet
    const { address, privateKey } = generateWallet();
    console.log("Checking wallet: ", address);

    // Check for divine robe
    const hasDivineRobe = await checkDivineRobe(address);
    if (hasDivineRobe) {
      // Save wallet with divine robe
      console.log("Found wallet with divine robe, saving!");
      await fs.appendFileSync(
        "./divine-robe-wallets.txt",
        `${address}: ${privateKey}\n`
      );
    }
  }
})();
