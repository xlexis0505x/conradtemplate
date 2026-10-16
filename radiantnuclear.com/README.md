# radiantnuclear.com — Local Source Code & Assets

Cloned from: https://radiantnuclear.com/

## 📁 Directory Structure
- `index.html`: Clean, formatted Next.js App Router DOM with layout, typography, and interactive spec grids.
- `models/reactor.glb`: Extracted 3D WebGL GLB microreactor model.
- `draco/`: Draco 3D mesh decompression scripts.
- `textures/`: Surface textures and shaders for the 3D model.
- `data/us_population_points.json`: Population points data for the interactive nuclear power deployment visualizer.
- `_next/static/chunks/`: Next.js client bundles, styles, and runtime scripts.
- `_external/`: External typefaces (Typekit) and Sanity CMS imagery.
- `server.py`: Standalone local development server.

## 🚀 Running Locally
```bash
python3 server.py
# Serves at http://localhost:8081/
```
Or with custom port:
```bash
python3 server.py 9000
```
