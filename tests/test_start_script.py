import subprocess
import time
import urllib.request
import urllib.error
import sys
import os
import signal
from pathlib import Path
import pytest

def test_start_script_launches_servers():
    """Verifies that start.py launches servers for all 8 websites."""

    # Path to start.py
    root_dir = Path(__file__).resolve().parent.parent
    start_script_path = root_dir / "start.py"

    # Run the start.py script as a subprocess
    process = subprocess.Popen([sys.executable, str(start_script_path)], cwd=str(root_dir))

    try:
        # Expected ports for all 8 sites
        ports_to_check = [8080, 8081, 8082, 8083, 8084, 8085, 8086, 8087]

        # Poll servers up to 10 seconds to avoid flakiness
        max_retries = 20
        retry_delay = 0.5

        for port in ports_to_check:
            server_up = False
            for attempt in range(max_retries):
                try:
                    response = urllib.request.urlopen(f"http://localhost:{port}/", timeout=1)
                    if response.status == 200:
                        server_up = True
                        break
                except (urllib.error.URLError, ConnectionError):
                    time.sleep(retry_delay)
                except Exception as e:
                    pytest.fail(f"Unexpected error when connecting to port {port}: {e}")

            assert server_up, f"Failed to connect to server on port {port} after {max_retries * retry_delay} seconds"

    finally:
        # Send SIGINT (Ctrl+C) which is handled gracefully by start.py's shutdown function
        process.send_signal(signal.SIGINT)
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            # If graceful shutdown fails, forcefully kill
            process.kill()
