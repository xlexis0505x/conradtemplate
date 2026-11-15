#!/usr/bin/env python3
"""
Local Development Server for Conrad Challenge Prototype
Serves on port 8087 with SPA routing, ThreadingHTTPServer, Byte-Range streaming for videos,
and custom MIME types.
"""

import os
import sys
from pathlib import Path

try:
    from http.server import ThreadingHTTPServer as ServerClass
except ImportError:
    from http.server import HTTPServer as ServerClass
from http.server import SimpleHTTPRequestHandler

DEFAULT_PORT = 8087
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
        if origin and (origin.startswith("http://localhost:") or origin.startswith("http://127.0.0.1:")):
            self.send_header("Access-Control-Allow-Origin", origin)
        self.send_header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_HEAD(self):
        clean = self.path.split("?")[0].split("#")[0].lower()
        if clean.endswith(".mp4") or clean.endswith(".webm"):
            self.send_response(200)
            self.send_header("Content-Type", "video/mp4" if clean.endswith(".mp4") else "video/webm")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        super().do_HEAD()

    def do_GET(self):
        # Gracefully handle any legacy video requests with 200 OK empty payload (videos replaced by placeholders)
        clean = self.path.split("?")[0].split("#")[0].lower()
        if clean.endswith(".mp4") or clean.endswith(".webm"):
            self.send_response(200)
            self.send_header("Content-Type", "video/mp4" if clean.endswith(".mp4") else "video/webm")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return

        # If this server instance is configured to default to China edition (e.g. port 8088 or --china)
        if getattr(self.server, "edition", None) == "china":
            is_html_route = (clean == "" or clean.endswith(".html") or not Path(clean).suffix)
            if is_html_route:
                index_path = DOC_ROOT / "index.html"
                if os.path.exists(index_path):
                    try:
                        with open(index_path, "r", encoding="utf-8") as f:
                            content = f.read()
                        if 'window.CONRAD_EDITION="china"' not in content:
                            content = content.replace("<head>", '<head><script>window.CONRAD_EDITION="china";</script>', 1)
                        data = content.encode("utf-8")
                        self.send_response(200)
                        self.send_header("Content-Type", "text/html; charset=utf-8")
                        self.send_header("Content-Length", str(len(data)))
                        self.end_headers()
                        self.wfile.write(data)
                        return
                    except Exception:
                        pass

        super().do_GET()

    def translate_path(self, path):
        clean = path.split("?")[0].split("#")[0].rstrip("/")
        
        # 1. Check if stripping simulated subpaths (/conradtemplate or /cn/assets) points to a valid file
        normalized = clean
        if normalized.startswith("/conradtemplate"):
            normalized = normalized[15:] or "/"
        if normalized.startswith("/cn/assets") or normalized.startswith("/cn/_external") or normalized.startswith("/cn/css") or normalized.startswith("/cn/js"):
            normalized = normalized[3:] or "/"
            
        candidate = str(DOC_ROOT / normalized.lstrip("/"))
        if os.path.exists(candidate) and not os.path.isdir(candidate):
            return candidate

        translated = super().translate_path(path)
        
        # 2. Existing local file
        if os.path.exists(translated) and not os.path.isdir(translated):
            return translated

        # 3. SPA Fallback: if the file/dir does not exist and has no extension, serve index.html
        if not os.path.exists(translated) and not Path(clean).suffix:
            return str(DOC_ROOT / "index.html")

        return translated

    def guess_type(self, path):
        ext = Path(path).suffix.lower()
        if ext in MIME_TYPES:
            return MIME_TYPES[ext]
        return super().guess_type(path)

    def send_head(self):
        # Support HTTP Range requests for fast, stutter-free video playback
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()
        if not os.path.exists(path):
            return super().send_head()

        range_header = self.headers.get("Range")
        if not range_header or not range_header.startswith("bytes="):
            return super().send_head()

        try:
            file_size = os.path.getsize(path)
            ranges = range_header[6:].split("-")
            start = int(ranges[0]) if ranges[0] else 0
            end = int(ranges[1]) if len(ranges) > 1 and ranges[1] else file_size - 1
            if start >= file_size or end >= file_size or start > end:
                self.send_error(416, "Requested Range Not Satisfiable")
                return None

            content_length = end - start + 1
            content_type = self.guess_type(path)

            self.send_response(206)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Range", f"bytes {start}-{end}/{file_size}")
            self.send_header("Content-Length", str(content_length))
            self.send_header("Accept-Ranges", "bytes")
            self.end_headers()

            f = open(path, "rb")
            f.seek(start)

            class RangeReader:
                def __init__(self, fp, remaining):
                    self.fp = fp
                    self.remaining = remaining

                def read(self, n=-1):
                    if self.remaining <= 0:
                        return b""
                    chunk = self.fp.read(min(n, self.remaining) if n > 0 else self.remaining)
                    self.remaining -= len(chunk)
                    return chunk

                def close(self):
                    self.fp.close()

            return RangeReader(f, content_length)
        except Exception:
            return super().send_head()


def run(port=DEFAULT_PORT, edition=None):
    httpd = ServerClass((HOST, port), DevHandler)
    httpd.edition = edition
    label = "POSEIDON (China Edition)" if edition == "china" else "DRUNKEAST (Global Edition)"
    print(f"\n🚀 Conrad Prototype [{label}] running at http://localhost:{port}/")
    print(f"📁 Serving: {DOC_ROOT}")
    print("Press Ctrl+C to stop.\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 and sys.argv[1].isdigit() else DEFAULT_PORT
    edition = "china" if ("--china" in sys.argv or port == 8088) else None
    run(port, edition)
