<p align="center">
  <h1 align="center">dhof-loot</h1>
</p>
<p align="center">
<b><a href="https://github.com/anish-agnihotri/dhof-loot#About">About</a></b>
|
<b><a href="https://github.com/anish-agnihotri/dhof-loot#Derivatives">Derivatives</a></b>
|
<b><a href="https://github.com/anish-agnihotri/dhof-loot#License">License</a></b>
</p>

# About

This repository contains tooling and data for [Loot](https://www.lootproject.com/faq) and other derivative projects, and is free to use without credit or attribution, for any means.

The `/` directory contains scripts and data for Loot, and `/derivatives` contains the same for projects inspired from or built atop Loot.

> Loot itself is a collection of 8,000 unique bags of adventurer gear NFTs. At release, anyone could claim loot bags for just gas, and all bags were claimed in under 4 hours. Each loot bag contains 8 items: a piece for an adventurer's chest, foot, hand, head, neck, ring, waist, and weapon.

# Loot

## Distribution

- tokenIds `1` to `7778` claimable by user.
- tokenIds `7778` to `8000` claimable by contract owner.
- Each token has attributes: `chest`, `foot`, `hand`, `head`, `neck`, `ring`, `waist`, `weapon`.

## Output

- `output/loot.json` contains all tokenIds and their attributes.
- `output/occurences.json` contains the number of occurences by attribute.
- `output/rare.json` contains a mapping of `lootId` to `score` (which is the sum of number of occcrences of each child attribute for a `lootId`), sorted ascending by `score`. It also includes `rarest` which is how rare the loot bags attributes are (`1` == `rarest`, `8000` == `least rare`), based on this specific ranking mechanism.
- `output/probability.json` contains a mapping of `lootId` to `rank` by probabilistic occurence rather than rank (`P(A in bag at slot 1)` and `P(B in bag at slot 2)`, then `P(A in slot 1 and B in slot 2)` is the product of the 2 probabilities).
- `output/images.json` contains the base64 encoded SVG of each tokenId

## Run locally

```bash
 Run the run_script.sh
sh run_script.sh 
```

To run derivative scripts, follow the README in their subdirectory.

# Derivatives

- [Ability Score](https://github.com/Anish-Agnihotri/dhof-loot/tree/master/derivatives/ability-score) — Ability score NFTs by [andy8052](https://twitter.com/andy8052)
- [Extension Loot](https://github.com/Anish-Agnihotri/dhof-loot/tree/master/derivatives/extension-loot) — Data for the [Extension Loot](https://twitter.com/xLootProject) project
- [Synthetic Loot Botting](https://github.com/Anish-Agnihotri/dhof-loot/tree/master/derivatives/synthetic-loot) — Botting ideal synthetic loot by mass generating addresses
- [Fork: Dope Wars Loot](https://github.com/cybergen/dope-wars-loot) by [@cybergen](https://cybergen/dope-wars-loot)
- [Temporal Loot](https://github.com/Anish-Agnihotri/dhof-loot/tree/master/derivatives/temporal-loot) — Extension pack for Loot

# Credits

- [@ktasbas](https://github.com/ktasbas) for adding Loot base64 encoded SVG retrieval support
- `vance46#5648` and `UFvOgue, X-Divine Rober#8392` for helping me flag and think through the probabilistic occurence for Loot items

# License

Loot is licensed under [The Unlicense](https://github.com/Anish-Agnihotri/dhof-loot/blob/master/LICENSE)—a license with no conditions whatsoever which dedicates works to the public domain.

Unlicensed works, modifications, and larger works may be distributed under different terms and without source code.
