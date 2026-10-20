#!/usr/bin/env python3
"""
Local Development Server for walkal.one
Serves on port 8086 with full subpage routing, dynamic live proxy/caching for projects,
HTTP Byte-Range streaming, and ThreadingHTTPServer.
"""

import os
import sys
import urllib.parse
import urllib.request
from pathlib import Path

try:
    from http.server import ThreadingHTTPServer as ServerClass
except ImportError:
    from http.server import HTTPServer as ServerClass
from http.server import SimpleHTTPRequestHandler

DEFAULT_PORT = 8086
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
        self.send_header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def translate_path(self, path):
        # Decode URL (supports Japanese characters e.g. /原口沙輔)
        clean = path.split("?")[0].split("#")[0].strip("/")
        unquoted = urllib.parse.unquote(clean)

        # 1. Root
        if not clean:
            return str(DOC_ROOT / "index.html")

        # 2. Check if file exists directly
        candidate = DOC_ROOT / unquoted
        if candidate.is_file():
            return str(candidate)

        # 3. Check for subpage index.html (e.g. /原口沙輔 -> 原口沙輔/index.html)
        sub_index = DOC_ROOT / unquoted / "index.html"
        if sub_index.is_file():
            return str(sub_index)

        # 4. Check case-insensitive / normalized (e.g. /about -> about/index.html)
        unquoted_lower = unquoted.lower()
        for d in DOC_ROOT.iterdir():
            if d.is_dir() and d.name.lower() == unquoted_lower:
                sub_cand = d / "index.html"
                if sub_cand.is_file():
                    return str(sub_cand)

        # 5. Asset with extension that exists
        ext = Path(unquoted).suffix.lower()
        if ext and candidate.exists():
            return str(candidate)

        # 6. Dynamic Fetch & Cache Fallback for any uncached project subpage (fast 2s timeout)
        try:
            live_url = f"https://walkal.one/{urllib.parse.quote(unquoted)}"
            req = urllib.request.Request(
                live_url,
                headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}
            )
            with urllib.request.urlopen(req, timeout=2) as resp:
                content = resp.read()
                ct = resp.headers.get("content-type", "")
                if "html" in ct or not ext:
                    save_path = DOC_ROOT / unquoted / "index.html"
                else:
                    save_path = candidate
                save_path.parent.mkdir(parents=True, exist_ok=True)
                with open(save_path, "wb") as f:
                    f.write(content)
                return str(save_path)
        except Exception:
            pass

        # 7. Fallback to index.html ONLY for extensionless routes
        if not ext:
            return str(DOC_ROOT / "index.html")
        return str(candidate)

    def guess_type(self, path):
        ext = Path(path).suffix.lower()
        if ext in MIME_TYPES:
            return MIME_TYPES[ext]
        return super().guess_type(path)

    def send_head(self):
        # Support HTTP Range requests for video playback
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


def run(port=DEFAULT_PORT):
    httpd = ServerClass((HOST, port), DevHandler)
    print(f"\n🚀 walkal.one running at http://localhost:{port}/")
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
