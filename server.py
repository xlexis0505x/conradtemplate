import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        path = self.translate_path(self.path)
        if os.path.exists(path):
            return super().do_GET()
        # Fallback to index.html for SPA routes (e.g. /works/*, /about)
        self.path = "/index.html"
        return super().do_GET()

if __name__ == "__main__":
    with http.server.ThreadingHTTPServer(("", PORT), SPAHandler) as httpd:
        print(f"Serving SPA on port {PORT} from {DIRECTORY}")
        httpd.serve_forever()
