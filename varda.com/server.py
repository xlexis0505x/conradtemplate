#!/usr/bin/env python3
"""
Local Development Server for Varda Space Industries
Serves on port 8082 with SPA routing, recovered source code, and Webflow asset support.
"""

import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

DEFAULT_PORT = 8082
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
        origin = self.headers.get("Origin")
        if origin:
            # Only allow localhost or 127.0.0.1 on the server's port
            host = self.server.server_address[0]
            if host == "0.0.0.0":
                host_options = ["localhost", "127.0.0.1"]
            else:
                host_options = [host]

            port = self.server.server_address[1]
            allowed_origins = [f"http://{h}:{port}" for h in host_options] + [f"https://{h}:{port}" for h in host_options]

            if origin in allowed_origins:
                self.send_header("Access-Control-Allow-Origin", origin)

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
    print(f"\n🚀 Varda Space Industries running at http://localhost:{port}/")
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
