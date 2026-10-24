import threading
import urllib.request
import urllib.error
from http.server import HTTPServer
import sys
from pathlib import Path
import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "anduril.com"))
from server import DevHandler

def test_invalid_range_header():
    server = HTTPServer(('127.0.0.1', 0), DevHandler)
    t = threading.Thread(target=server.serve_forever, daemon=True)
    t.start()
    url = f"http://127.0.0.1:{server.server_port}/index.html"
    try:
        assert urllib.request.urlopen(urllib.request.Request(url, headers={"Range": "invalid=0-10"})).status == 200
        assert urllib.request.urlopen(urllib.request.Request(url, headers={"Range": "bytes=abc-def"})).status == 200
        with pytest.raises(urllib.error.HTTPError) as exc_info:
            urllib.request.urlopen(urllib.request.Request(url, headers={"Range": "bytes=1000000000-2000000000"}))
        assert exc_info.value.code == 416
    finally:
        server.shutdown()
        server.server_close()
