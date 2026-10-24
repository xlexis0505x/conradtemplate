#!/usr/bin/env python3
"""
Local Development Server for Conrad Challenge
Serves on port 8085 with SPA routing, ThreadingHTTPServer, Byte-Range streaming for videos,
and custom MIME types.
"""

import os
import re
import sys
from pathlib import Path

try:
    from http.server import ThreadingHTTPServer as ServerClass
except ImportError:
    from http.server import ThreadingHTTPServer as ServerClass
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
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def translate_path(self, path):
        translated = super().translate_path(path)
        clean = path.split("?")[0].split("#")[0].rstrip("/")
        
        # 1. Existing local file
        if os.path.exists(translated) and not os.path.isdir(translated):
            return translated

        # 2. Dynamic upstream cache for route .json files
        ext = Path(clean).suffix.lower()
        if ext == ".json":
            try:
                import urllib.request, ssl
                rel_url = clean.lstrip("/")
                live_url = f"https://www.Conrad Challenge/{rel_url}"
                req = urllib.request.Request(
                    live_url,
                    headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}
                )
                with urllib.request.urlopen(req, timeout=5, context=ssl._create_unverified_context()) as resp:
                    data = resp.read()
                    target = Path(translated)
                    target.parent.mkdir(parents=True, exist_ok=True)
                    target.write_bytes(data)
                    return str(target)
            except Exception:
                pass

        # 3. Dynamic upstream cache for Sanity CDN assets
        if clean.startswith("/_external/cdn.sanity.io/"):
            try:
                import urllib.request, ssl
                sanity_path = clean[len("/_external/cdn.sanity.io/"):]
                live_url = f"https://cdn.sanity.io/{sanity_path}"
                req = urllib.request.Request(
                    live_url,
                    headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}
                )
                with urllib.request.urlopen(req, timeout=8, context=ssl._create_unverified_context()) as resp:
                    data = resp.read()
                    target = Path(translated)
                    target.parent.mkdir(parents=True, exist_ok=True)
                    target.write_bytes(data)
                    return str(target)
            except Exception:
                pass

        # 4. Dynamic upstream cache for missing /assets/ files
        if clean.startswith("/assets/"):
            try:
                import urllib.request, ssl
                live_url = f"https://www.Conrad Challenge{clean}"
                req = urllib.request.Request(
                    live_url,
                    headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}
                )
                with urllib.request.urlopen(req, timeout=8, context=ssl._create_unverified_context()) as resp:
                    data = resp.read()
                    target = Path(translated)
                    target.parent.mkdir(parents=True, exist_ok=True)
                    target.write_bytes(data)
                    return str(target)
            except Exception:
                pass

        # 5. SPA Fallback: if the file/dir does not exist and has no extension, serve index.html
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


def run(port=DEFAULT_PORT):
    httpd = ServerClass((HOST, port), DevHandler)
    print(f"\n🚀 Conrad Challenge running at http://localhost:{port}/")
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
