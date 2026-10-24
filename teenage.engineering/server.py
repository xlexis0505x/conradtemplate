#!/usr/bin/env python3
"""
Local Development Server for Teenage Engineering
Serves on port 8084 with multi-page Remix support, .data hydration endpoint,
automatic dynamic live proxying/caching for uncached pages, and ThreadingHTTPServer concurrency.
"""

import sys
import urllib.request
from pathlib import Path

try:
    from http.server import ThreadingHTTPServer as ServerClass
except ImportError:
    from http.server import HTTPServer as ServerClass
from http.server import SimpleHTTPRequestHandler

DEFAULT_PORT = 8084
HOST = "0.0.0.0"
DOC_ROOT = Path(__file__).resolve().parent

MIME_TYPES = {
    ".js": "application/javascript; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".data": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".ttf": "font/ttf",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".glb": "model/gltf-binary",
    ".gltf": "model/gltf+json",
    ".wasm": "application/wasm",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".webp": "image/webp",
    ".avif": "image/avif",
}


class DevHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DOC_ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_POST(self):
        # Gracefully absorb client telemetry & error logging (e.g. /_api/err)
        if self.path.startswith("/_api/"):
            self.send_response(204)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            return
        self.send_error(501, "Unsupported method")

    def translate_path(self, path):
        # Extract clean path without query or hash
        clean = path.split("?")[0].split("#")[0].strip("/")

        # 1. Handle root
        if not clean:
            return str(DOC_ROOT / "index.html")

        # 2. Check if clean path directly exists on disk as a file
        candidate = DOC_ROOT / clean
        if candidate.is_file():
            return str(candidate)

        # 3. Check for subpage index.html (e.g. /products -> products/index.html)
        sub_index = DOC_ROOT / clean / "index.html"
        if sub_index.is_file():
            return str(sub_index)

        # 4. Check for .data file (e.g. /products.data -> products.data)
        if clean.endswith(".data"):
            cand_data = DOC_ROOT / clean
            if cand_data.is_file():
                return str(cand_data)

        # 5. Check if it's an asset with extension that exists
        ext = Path(clean).suffix.lower()
        if ext and candidate.exists():
            return str(candidate)

        # 6. Dynamic Fetch & Cache Fallback for uncached pages or .data endpoints
        try:
            live_url = f"https://teenage.engineering/{clean}"
            if "?" in path:
                live_url += "?" + path.split("?", 1)[1]
            req = urllib.request.Request(
                live_url,
                headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}
            )
            with urllib.request.urlopen(req, timeout=5) as resp:
                content = resp.read()
                ct = resp.headers.get("content-type", "")
                if "html" in ct or not ext:
                    save_path = DOC_ROOT / clean / "index.html"
                else:
                    save_path = candidate
                save_path.parent.mkdir(parents=True, exist_ok=True)
                with open(save_path, "wb") as f:
                    f.write(content)
                return str(save_path)
        except Exception:
            pass

        # 7. Fallback to index.html
        return str(DOC_ROOT / "index.html")

    def guess_type(self, path):
        ext = Path(path).suffix.lower()
        if ext in MIME_TYPES:
            return MIME_TYPES[ext]
        return super().guess_type(path)


def run(port=DEFAULT_PORT):
    httpd = ServerClass((HOST, port), DevHandler)
    print(f"\n🚀 Teenage Engineering running at http://localhost:{port}/")
    print(f"📁 Serving: {DOC_ROOT}")
    print("Press Ctrl+C to stop.\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
    run(port)
