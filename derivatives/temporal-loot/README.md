# Temporal Loot

## Distribution

- tokenIds `8001` to `(block.number / 10) + 1` claimable by user.
- Each token has attributes: `chest`, `foot`, `hand`, `head`, `neck`, `ring`, `waist`, `weapon`.

> Flag: this derivative script, unlike others, will pull almost 1.3m bags (with 8 attribute function calls each). I highly advise running against your own local node for speed and optimizing RPC expense.

## Output

- `output/loot.json` contains all tokenIds and their attributes.
- `output/occurences.json` contains the number of occurences by attribute.
- `output/probability.json` contains a mapping of `lootId` to `rank` by probabilistic occurence rather than rank (`P(A in bag at slot 1)` and `P(B in bag at slot 2)`, then `P(A in slot 1 and B in slot 2)` is the product of the 2 probabilities).

## Run locally

```bash
# Install dependencies (in root directory)
npm install

# Collect all Temporal Loot
node index.js

# Parse Temporal Loot statistics
node parse.js
```
