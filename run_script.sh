#!/bin/bash

# Install dependencies
npm install

# Collect all Loot
npm run collect

# Parse Loot statistics
npm run parse

# Collect Loot base64 encoded images
npm run images
