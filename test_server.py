from http.server import HTTPServer, SimpleHTTPRequestHandler

class DevHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        print(f"Server port: {self.server.server_port}")
        super().end_headers()

if __name__ == "__main__":
    httpd = HTTPServer(("127.0.0.1", 8081), DevHandler)
    import threading
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    import urllib.request
    try:
        urllib.request.urlopen("http://127.0.0.1:8081/")
    except Exception as e:
        print(e)
    httpd.shutdown()
