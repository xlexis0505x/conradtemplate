#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
cd "$DIR"

echo "=== Conrad Automated Test Runner ==="

# Check if local server is listening on port 8087
if ! lsof -i :8087 > /dev/null 2>&1; then
    echo "Starting local dev server on port 8087..."
    python3 conrad.prototype/server.py 8087 > /dev/null 2>&1 &
    SERVER_PID=$!
    trap 'kill $SERVER_PID' EXIT
    sleep 1
    echo "Started local server (PID: $SERVER_PID)"
else
    echo "Local dev server is already running on port 8087."
fi

echo "Running pytest suite..."
python3 -m pytest tests/ "$@"

echo "=== All Tests Completed Successfully ==="
