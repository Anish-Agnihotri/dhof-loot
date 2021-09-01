# dhof-loot

Launch tweet for [DOPE](https://twitter.com/DennisonBertram/status/1432773242163445763).

<img src="https://pbs.twimg.com/media/E90OnuPX0AAUXG8?format=png&name=medium" width="300">

## Distribution

- tokenIds `1` to `8000` claimable by user.
- Each token has attributes: `clothes`, `foot`, `hand`, `neck`, `ring`, `waist`, `weapon`, `drugs`, `vehicle`.

## Output

- `output/loot.json` contains all tokenIds and their attributes.
- `output/occurences.json` contains the number of occurences by attribute.
- `output/rare.json` contains a mapping of `lootId` to `score` (which is the sum of number of occcrences of each child attribute for a `lootId`), sorted ascending by `score`. It also includes `rarest` which is how rare the loot bags attributes are (`1` == `rarest`, `8000` == `least rare`).
- `output/images.json` contains the base64 encoded SVG of each tokenId

## Run locally

```bash
# Install dependencies
npm install

# Setup
export RPC_CONNSTRING="eth rpc url"

# Collect all loot
npm run collect

# Parse statistics
npm run parse

# Collect base64 encoded images
npm run images
```

## Credits

- [@ktasbas](https://github.com/ktasbas) for adding base64 encoded SVG retrieval support
