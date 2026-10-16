#!/usr/bin/env python3
"""
Quick Multi-Site Server Launcher
Starts all 5 local website servers concurrently.
"""

import sys
import time
import signal
import subprocess
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent

SITES = [
    {
        "name": "Coalowl",
        "dir": "coalowl.com",
        "port": 8080,
        "script": "server.py",
        "args": ["8080", "--http"],
        "url": "http://localhost:8080/"
    },
    {
        "name": "Radiant Nuclear",
        "dir": "radiantnuclear.com",
        "port": 8081,
        "script": "server.py",
        "args": ["8081"],
        "url": "http://localhost:8081/"
    },
    {
        "name": "Varda Space",
        "dir": "varda.com",
        "port": 8082,
        "script": "server.py",
        "args": ["8082"],
        "url": "http://localhost:8082/"
    },
    {
        "name": "Helion Energy",
        "dir": "helionenergy.com",
        "port": 8083,
        "script": "server.py",
        "args": ["8083"],
        "url": "http://localhost:8083/"
    },
    {
        "name": "Teenage Engineering",
        "dir": "teenage.engineering",
        "port": 8084,
        "script": "server.py",
        "args": ["8084"],
        "url": "http://localhost:8084/"
    },
    {
        "name": "Anduril Industries",
        "dir": "anduril.com",
        "port": 8085,
        "script": "server.py",
        "args": ["8085"],
        "url": "http://localhost:8085/"
    }
]


def main():
    use_ssl = "--ssl" in sys.argv
    processes = []

    print("\n" + "=" * 65)
    print("🚀  STARTING ALL 5 WEBSITE LOCAL SERVERS")
    print("=" * 65)

    for site in SITES:
        site_dir = ROOT_DIR / site["dir"]
        script_path = site_dir / site["script"]

        if not site_dir.exists() or not script_path.exists():
            print(f"⚠️  Missing folder or server: {site['dir']}, skipping.")
            continue

        cmd = [sys.executable, site["script"]]
        if site["dir"] == "coalowl.com":
            cmd = [sys.executable, site["script"], str(site["port"])]
            if not use_ssl:
                cmd.append("--http")
                site["url"] = f"http://localhost:{site['port']}/"
            else:
                site["url"] = f"https://localhost:{site['port']}/"
        else:
            cmd = [sys.executable, site["script"], str(site["port"])]

        p = subprocess.Popen(
            cmd,
            cwd=str(site_dir),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        processes.append((site, p))
        print(f"  ➜  {site['name']:<22} {site['url']}")

    print("-" * 65)
    print("All 5 sites are online! Press Ctrl+C anytime to stop all servers.")
    print("=" * 65 + "\n")

    def shutdown(signum=None, frame=None):
        print("\nStopping all servers...")
        for site, p in processes:
            p.terminate()
            try:
                p.wait(timeout=2)
            except subprocess.TimeoutExpired:
                p.kill()
        print("✓ All servers stopped.")
        sys.exit(0)

    signal.signal(signal.SIGINT, shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    try:
        while True:
            # Check if any process died unexpectedly
            for site, p in processes:
                if p.poll() is not None:
                    # process exited
                    pass
            time.sleep(1)
    except KeyboardInterrupt:
        shutdown()


if __name__ == "__main__":
    main()
