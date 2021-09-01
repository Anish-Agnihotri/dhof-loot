// Imports
const fs = require("fs");
const ethers = require("ethers");
const { abi } = require("./abi");

// Setup contract
const lootAddress = "0x8707276df042e89669d69a177d3da7dc78bd8723";
const rpc = new ethers.providers.JsonRpcProvider(process.env.RPC_CONNSTRING);
const loot = new ethers.Contract(lootAddress, abi, rpc);

(async () => {
  // List to hold images
  let images = [];

  for (let i = 1; i <= 8000; i++) {
    console.log("Collecting: ", i);

    try {
      // Get base64 encoded URI
      let uri = await loot.tokenURI(i);
      uri = uri.split(',')[1];

      // Decode into a JSON string 
      // { 
      //   "name": "Bag #{#}",
      //   "description": "{GENERIC_STRING}", 
      //   "image": "data:image/svg+xml;base64,{BASE64_DATA}"
      // }
      const json_uri = Buffer.from(uri, 'base64').toString('utf-8');
      const image = JSON.parse(json_uri)['image']

      images.push({
        [i]: {
          image
        }
      });
      
      if (i % 1000 === 0) {
        // Save to file every 1000 so we don't lose everything on a crash
        console.log("Saving...")
        fs.writeFileSync("./output/images.json", JSON.stringify(images));
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  // Write output
  fs.writeFileSync("./output/images.json", JSON.stringify(images));
})();