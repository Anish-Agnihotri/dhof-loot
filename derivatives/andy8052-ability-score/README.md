# andy8052-ability-score

Launch tweet for [ability-score](https://twitter.com/andy8052/status/1432802588194377742).

## Distribution

- tokenIds `1` to `8000` claimable by loot holders.
- tokenIds `8001` to `9975` claimable by public.
- tokenIds `9976` to `10000` claimable by Andy.
- Each token has attributes: `charisma`, `constitution`, `dexterity`, `intelligence`, `strength`, `wisdom`.

## Output

- `output/ability-scores.json` contains all tokenIds and their attributes.
- `output/score.json` contains the cumulative attribute scores by tokenId.
- `output/[attribute].json` (replacing `[attribute]` for an attribute name) provides a sorted list of tokenIds by their rank in that attribute.

## Run locally

```bash
# Install dependencies (in root folder)
npm install

# Collect all ability scores
node index.js

# Parse statistics
node parse.js
```
