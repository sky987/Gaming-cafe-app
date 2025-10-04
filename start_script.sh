#!/bin/bash
# Kali Kalari Gaming Cafe - Startup Script for Render.com

echo "🎮 Starting Kali Kalari Gaming Cafe..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Check environment variables
if [ -z "$PGHOST" ]; then
  echo "⚠️  Warning: PGHOST not set!"
fi

if [ -z "$PGDATABASE" ]; then
  echo "⚠️  Warning: PGDATABASE not set!"
fi

# Start the server
echo "🚀 Starting server..."
node server.js