#!/bin/bash

# Helper script to run responsive tests
# This script starts the dev server and waits for it to be ready before running tests

set -e

echo "Starting Next.js development server..."
pnpm dev > /tmp/nextjs-dev.log 2>&1 &
DEV_PID=$!

echo "Waiting for server to be ready on http://localhost:3000..."
npx wait-on http://localhost:3000 -t 30000

echo "Running responsive tests..."
pnpm test:responsive

# Cleanup
echo "Stopping development server..."
kill $DEV_PID 2>/dev/null || true

echo "Tests completed!"
