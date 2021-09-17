# Familiars

Original metadata scraped and provided by [PhABC in #6](https://github.com/Anish-Agnihotri/dhof-loot/pull/6); script not included.

## Distribution

- tokenIds `8001` to `(block.number / 10) + 1` claimable by user.
- Each token has attributes: `chest`, `foot`, `hand`, `head`, `neck`, `ring`, `waist`, `weapon`.

## Output

- `output/familiars.json` contains all tokenIds and their attributes.
- `output/occurences.json` contains the number of occurences by attribute.
- `output/probability.json` contains a mapping of `lootId` to `rank` by probabilistic occurence rather than rank (`P(A in bag at slot 1)` and `P(B in bag at slot 2)`, then `P(A in slot 1 and B in slot 2)` is the product of the 2 probabilities).

## Run locally

```bash
# Install dependencies (in root directory)
npm install

# Collect all Familiars
# Collection script not provided
# You can iterate through via IPFS tokenURI metadata

# Parse Familiars statistics
node parse.js
```
