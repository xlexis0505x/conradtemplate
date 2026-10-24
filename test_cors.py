from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.request
import threading

class DevHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        origin = self.headers.get("Origin")
        if origin:
            expected_origins = [
                f"http://localhost:{self.server.server_port}",
                f"http://127.0.0.1:{self.server.server_port}"
            ]
            if origin in expected_origins:
                self.send_header("Access-Control-Allow-Origin", origin)
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

if __name__ == "__main__":
    httpd = HTTPServer(("127.0.0.1", 8081), DevHandler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()

    req = urllib.request.Request("http://127.0.0.1:8081/", headers={"Origin": "http://127.0.0.1:8081"})
    try:
        resp = urllib.request.urlopen(req)
        print("CORS header:", resp.headers.get("Access-Control-Allow-Origin"))
    except Exception as e:
        print(e)

    req2 = urllib.request.Request("http://127.0.0.1:8081/", headers={"Origin": "http://malicious.com"})
    try:
        resp2 = urllib.request.urlopen(req2)
        print("CORS header for malicious:", resp2.headers.get("Access-Control-Allow-Origin"))
    except Exception as e:
        print(e)

    httpd.shutdown()
