#!/bin/bash

echo "Installing dependencies for frontend..."
cd panel-front || exit
echo "Current directory: $(pwd)"
npm install || { echo "npm install failed for frontend"; exit 1; }
cd ..

echo "Installing dependencies for backend..."
cd panel-backend || exit
echo "Current directory: $(pwd)"
npm install || { echo "npm install failed for backend"; exit 1; }
cd ..

echo "Done."
