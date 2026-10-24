import urllib.request
import threading
import time
import sys

# Import the server to run it in a thread
sys.path.append('.')
import server

PORT = 8082

def run_server():
    server.run(PORT)

# Start server in a background thread
server_thread = threading.Thread(target=run_server, daemon=True)
server_thread.start()

# Give the server a moment to start
time.sleep(1)

def test_cors(origin_header, expected_allow_origin):
    req = urllib.request.Request(f"http://localhost:{PORT}/")
    if origin_header is not None:
        req.add_header("Origin", origin_header)

    try:
        response = urllib.request.urlopen(req)
        allow_origin = response.headers.get("Access-Control-Allow-Origin")

        print(f"Testing Origin: {origin_header}")
        print(f"Got Access-Control-Allow-Origin: {allow_origin}")

        if allow_origin == expected_allow_origin:
            print("✅ PASS")
            return True
        else:
            print(f"❌ FAIL: Expected {expected_allow_origin}, got {allow_origin}")
            return False
    except Exception as e:
        print(f"❌ Error testing Origin {origin_header}: {e}")
        return False

success = True

# Test valid origin (localhost)
success &= test_cors(f"http://localhost:{PORT}", f"http://localhost:{PORT}")

# Test valid origin (127.0.0.1)
success &= test_cors(f"http://127.0.0.1:{PORT}", f"http://127.0.0.1:{PORT}")

# Test invalid origin (malicious domain)
success &= test_cors("http://evil.com", None)

# Test invalid origin (wrong port)
success &= test_cors("http://localhost:8080", None)

# Test no origin
success &= test_cors(None, None)

if success:
    print("\nAll CORS tests passed! 🎉")
    sys.exit(0)
else:
    print("\nSome CORS tests failed! 🚨")
    sys.exit(1)
