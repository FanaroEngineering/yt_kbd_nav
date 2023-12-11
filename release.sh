#!/bin/bash

CURRENT_VERSION=$(npm pkg get version | tr -d '"')

zip -r "release_$CURRENT_VERSION.zip" dist
echo "Zipped Release $CURRENT_VERSION!"
