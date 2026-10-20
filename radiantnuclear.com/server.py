#!/usr/bin/env python3
"""
Local Development Server for Radiant Nuclear
Serves on port 8081 with SPA routing, GLB 3D model support, and Draco mesh decoders.
"""

import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

DEFAULT_PORT = 8081
HOST = "0.0.0.0"
DOC_ROOT = Path(__file__).resolve().parent

MIME_TYPES = {
    ".js": "application/javascript; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
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

    def translate_path(self, path):
        translated = super().translate_path(path)
        clean = path.split("?")[0].split("#")[0].rstrip("/")
        if not os.path.exists(translated) and not Path(clean).suffix:
            return str(DOC_ROOT / "index.html")
        return translated

    def guess_type(self, path):
        ext = Path(path).suffix.lower()
        if ext in MIME_TYPES:
            return MIME_TYPES[ext]
        return super().guess_type(path)


def run(port=DEFAULT_PORT):
    httpd = HTTPServer((HOST, port), DevHandler)
    print(f"\n🚀 Radiant Nuclear running at http://localhost:{port}/")
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
