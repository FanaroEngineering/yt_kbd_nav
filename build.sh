#!/bin/bash

vite build --config vite.build.config.ts

cp manifest.json dist/manifest.json
cp package.json dist/
cp -r pages/ dist/
