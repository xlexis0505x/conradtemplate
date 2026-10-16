# 6 Website Local Inspiration Folders

This directory contains standalone, clean local copies of world-class frontend design benchmarks. Each website has its own dedicated folder with clean source code, formatted HTML, assets, and its own local server.

---

## ⚡ Quick Start (Launch All 6 Sites)

Run one command in this directory to bring all 6 websites online simultaneously:

```bash
python3 start.py
```

| Website | Local Address | Port | Highlights |
| :--- | :--- | :--- | :--- |
| **Coalowl** | [http://localhost:8080/](http://localhost:8080/) | `8080` | Japanese minimalist portfolio & P5R slab deck |
| **Radiant Nuclear** | [http://localhost:8081/](http://localhost:8081/) | `8081` | Clean-tech specs & 3D WebGL `reactor.glb` model |
| **Varda Space** | [http://localhost:8082/](http://localhost:8082/) | `8082` | Aerospace dark mode & recovered `src/` source code |
| **Helion Energy** | [http://localhost:8083/](http://localhost:8083/) | `8083` | Pulsed plasma confinement & recovered `src/` source code |
| **Teenage Engineering** | [http://localhost:8084/](http://localhost:8084/) | `8084` | Brutalist grid, tactile buttons & custom `TE20L.woff2` fonts |
| **Anduril Industries** | [http://localhost:8085/](http://localhost:8085/) | `8085` | Defense-tech aerospace UI, WebGL shaders & telemetry cards |

*(Press `Ctrl+C` anytime in the terminal to stop all servers)*

---

## 📁 The 6 Website Folders

### 1. `coalowl.com/`
- Minimalist Japanese portfolio with high-contrast Persona 5 Royal (P5R) angled slab deck.
- Modularized CSS in `css/`, JSON data in `data/`.
- Run locally: `cd coalowl.com && python3 server.py 8080`

### 2. `radiantnuclear.com/`
- Clean-tech nuclear microreactor engineering showcase with warm sand and charcoal tones.
- Formatted `index.html` with extracted 3D WebGL GLB microreactor in `models/reactor.glb`.
- Run locally: `cd radiantnuclear.com && python3 server.py` (Port 8081)

### 3. `varda.com/`
- Dark aerospace aesthetic, orbital mission timeline, and microgravity capsule telemetry.
- **Reconstructed original uncompiled JavaScript source code** in `src/`.
- Run locally: `cd varda.com && python3 server.py` (Port 8082)

### 4. `helionenergy.com/`
- Commercial fusion power plant with pulsed plasma magnetic compression visuals.
- **Reconstructed original uncompiled JavaScript source code** in `src/`.
- Run locally: `cd helionenergy.com && python3 server.py` (Port 8083)

### 5. `teenage.engineering/`
- Iconic Swedish industrial hardware design with Swiss/Nordic brutalist typography.
- Custom Teenage Engineering fonts (`assets/TE20L.*.woff2`, `TE40L.*.woff2`) and modular component scripts.
- Run locally: `cd teenage.engineering && python3 server.py` (Port 8084)

### 6. `anduril.com/`
- Next-gen defense hardware & autonomous systems design benchmark.
- Formatted `index.html` with WebGL shaders in `assets/shaders/`, fonts, and telemetry layouts.
- Run locally: `cd anduril.com && python3 server.py` (Port 8085)
