# Extension Loot

## Distribution

- tokenIds `8001` to `15777` claimable by user.
- tokenIds `15778` to `16000` claimable by contract owner.
- Each token has attributes: `chest`, `foot`, `hand`, `head`, `neck`, `ring`, `waist`, `weapon`.

## Output

- `output/loot.json` contains all tokenIds and their attributes.
- `output/occurences.json` contains the number of occurences by attribute.
- `output/probability.json` contains a mapping of `lootId` to `rank` by probabilistic occurence rather than rank (`P(A in bag at slot 1)` and `P(B in bag at slot 2)`, then `P(A in slot 1 and B in slot 2)` is the product of the 2 probabilities).

## Run locally

```bash
# Install dependencies (in root directory)
npm install

# Collect all xLoot
node index.js

# Parse xLoot statistics
node parse.js
```
