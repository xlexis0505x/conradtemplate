#!/usr/bin/env python3
"""
Local HTTPS Development Server for Coalowl.com
Serves on port 8080 with automatic SSL certificate generation and SPA routing support.
"""

import os
import sys
import ssl
import shutil
import subprocess
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

DEFAULT_PORT = 8080
HOST = "0.0.0.0"

# Determine document root
SCRIPT_DIR = Path(__file__).resolve().parent
if (SCRIPT_DIR / "index.html").exists():
    DOC_ROOT = SCRIPT_DIR
elif (SCRIPT_DIR / "coalowl.com" / "index.html").exists():
    DOC_ROOT = SCRIPT_DIR / "coalowl.com"
else:
    DOC_ROOT = Path.cwd()

CERTS_DIR = DOC_ROOT / ".certs"
CERT_FILE = CERTS_DIR / "cert.pem"
KEY_FILE = CERTS_DIR / "key.pem"


def ensure_ssl_certificates():
    """Generates self-signed SSL cert with SAN for localhost if not already present."""
    if CERT_FILE.exists() and KEY_FILE.exists():
        return

    CERTS_DIR.mkdir(parents=True, exist_ok=True)
    print("Generating self-signed SSL certificate for localhost...")
    openssl_bin = shutil.which("openssl") or "/usr/bin/openssl"
    cmd = [
        openssl_bin,
        "req",
        "-x509",
        "-newkey",
        "rsa:2048",
        "-nodes",
        "-sha256",
        "-days",
        "365",
        "-keyout",
        str(KEY_FILE),
        "-out",
        str(CERT_FILE),
        "-subj",
        "/CN=localhost",
        "-addext",
        "subjectAltName=DNS:localhost,IP:127.0.0.1,IP:::1",
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"✓ Certificates created in {CERTS_DIR}")
    except Exception:
        cmd_fallback = [
            openssl_bin,
            "req",
            "-x509",
            "-newkey",
            "rsa:2048",
            "-nodes",
            "-days",
            "365",
            "-keyout",
            str(KEY_FILE),
            "-out",
            str(CERT_FILE),
            "-subj",
            "/CN=localhost",
        ]
        subprocess.run(cmd_fallback, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"✓ Certificates created in {CERTS_DIR} (fallback mode)")


class CoalowlHTTPHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DOC_ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def translate_path(self, path):
        translated = super().translate_path(path)
        clean = path.split("?")[0].split("#")[0].rstrip("/")
        # SPA Fallback: if the file/dir doesn't exist and has no file extension, serve index.html
        if not os.path.exists(translated) and not Path(clean).suffix:
            return str(DOC_ROOT / "index.html")
        return translated

    def guess_type(self, path):
        p = str(path).lower()
        if p.endswith(".js"):
            return "application/javascript; charset=utf-8"
        if p.endswith(".css"):
            return "text/css; charset=utf-8"
        if p.endswith(".json"):
            return "application/json; charset=utf-8"
        if p.endswith(".svg"):
            return "image/svg+xml"
        if p.endswith(".ttf"):
            return "font/ttf"
        if p.endswith(".woff2"):
            return "font/woff2"
        if p.endswith(".woff"):
            return "font/woff"
        return super().guess_type(path)

    def log_message(self, format, *args):
        sys.stderr.write(f"[{self.log_date_time_string()}] {self.address_string()} - {args[0]} {args[1]}\n")


def run_server(port=DEFAULT_PORT, use_ssl=True):
    httpd = HTTPServer((HOST, port), CoalowlHTTPHandler)

    if use_ssl:
        ensure_ssl_certificates()
        ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        ssl_context.load_cert_chain(certfile=str(CERT_FILE), keyfile=str(KEY_FILE))
        httpd.socket = ssl_context.wrap_socket(httpd.socket, server_side=True)
        proto = "https"
    else:
        proto = "http"

    print("\n" + "=" * 60)
    print(f"🚀  Coalowl {proto.upper()} Development Server running on port {port}")
    print("=" * 60)
    print(f"  ➜  Local:    {proto}://localhost:{port}/")
    print(f"  ➜  Network:  {proto}://127.0.0.1:{port}/")
    print(f"  ➜  Root:     {DOC_ROOT}")
    print("-" * 60)
    if use_ssl:
        print("  Note: Self-signed certificates may show a browser warning on first visit.")
        print("  Click 'Advanced' -> 'Proceed to localhost' to continue.")
        print("  (Tip: pass --http to run without SSL)")
        print("=" * 60 + "\n")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    use_ssl = "--http" not in sys.argv
    args = [a for a in sys.argv[1:] if a != "--http"]
    port = int(args[0]) if len(args) > 0 else DEFAULT_PORT
    run_server(port, use_ssl=use_ssl)
