# varda.com — Local Source Code & Assets

Cloned from: https://www.varda.com/

## 📁 Directory Structure
- `index.html`: Clean, formatted DOM with aerospace mission timeline, orbital reentry telemetry, and dark aesthetic.
- `src/`: **Reconstructed original uncompiled JavaScript source code** recovered from Source Maps:
  - `src/gh/nocodesupplyco/mast@HEAD/inline-video.js`
  - `src/gh/nocodesupplyco/mast@HEAD/tabs.js`
  - `src/gh/nocodesupplyco/mast@HEAD/slider.js`
  - `src/gh/nocodesupplyco/mast@HEAD/theme-toggle.js`
  - `src/gh/nocodesupplyco/mast@HEAD/accordion.js`
- `_external/`: Webflow staging stylesheets, fonts, and responsive graphics.
- `server.py`: Standalone local development server.

## 🚀 Running Locally
```bash
python3 server.py
# Serves at http://localhost:8082/
```
Or with custom port:
```bash
python3 server.py 9000
```
