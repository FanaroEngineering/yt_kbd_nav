#!/bin/bash

vite build --config vite.build.config.ts
printf "\n✓ 1. Built with Vite\n"

cp manifest.json dist/
echo "✓ 2. Copied Manifest"
cp -r pages/ dist/
echo "✓ 3. Copied Pages"
