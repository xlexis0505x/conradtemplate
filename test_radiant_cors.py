from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.request
import threading
import time
import subprocess
import os

# Start the actual server
server_proc = subprocess.Popen(["python3", "radiantnuclear.com/server.py", "9091"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1) # wait for server to start

try:
    req = urllib.request.Request("http://127.0.0.1:9091/", headers={"Origin": "http://127.0.0.1:9091"})
    resp = urllib.request.urlopen(req)
    print("Localhost Origin:", resp.headers.get("Access-Control-Allow-Origin"))

    req2 = urllib.request.Request("http://127.0.0.1:9091/", headers={"Origin": "http://malicious.com"})
    resp2 = urllib.request.urlopen(req2)
    print("Malicious Origin:", resp2.headers.get("Access-Control-Allow-Origin"))
finally:
    server_proc.terminate()
