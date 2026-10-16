# 5 Website Local Inspiration Folders

This directory contains standalone, clean local copies of five frontend design benchmarks. Each website has its own dedicated folder with clean source code, formatted HTML, assets, and its own local server.

---

## ⚡ Quick Start (Launch All 5 Sites)

Run one command in this directory to bring all 5 websites online simultaneously:

```bash
python3 start.py
```

| Website | Local Address | Port |
| :--- | :--- | :--- |
| **Coalowl** | [http://localhost:8080/](http://localhost:8080/) | `8080` |
| **Radiant Nuclear** | [http://localhost:8081/](http://localhost:8081/) | `8081` |
| **Varda Space** | [http://localhost:8082/](http://localhost:8082/) | `8082` |
| **Helion Energy** | [http://localhost:8083/](http://localhost:8083/) | `8083` |
| **Teenage Engineering** | [http://localhost:8084/](http://localhost:8084/) | `8084` |

*(Press `Ctrl+C` anytime in the terminal to stop all servers)*

---

## 📁 The 5 Website Folders

### 1. `coalowl.com/`
- Minimalist Japanese portfolio with high-contrast Persona 5 Royal (P5R) angled slab deck.
- Modularized CSS in `css/` (`reset.css`, `tokens.css`, `typography.css`, `layout.css`, `components/`).
- JSON data in `data/` (`works.json`, `about.json`).
- Run locally:
  ```bash
  cd coalowl.com && python3 server.py 8080
  ```

### 2. `radiantnuclear.com/`
- Clean-tech nuclear microreactor engineering showcase with warm sand and charcoal tones.
- Formatted `index.html` (<900 lines) with clean semantic structure.
- Extracted 3D WebGL GLB microreactor model in `models/reactor.glb`.
- Draco 3D mesh decompression scripts in `draco/`.
- Run locally:
  ```bash
  cd radiantnuclear.com && python3 server.py
  # Open http://localhost:8081/
  ```

### 3. `varda.com/`
- Dark aerospace aesthetic, orbital mission timeline, and microgravity capsule telemetry.
- Formatted `index.html` with tracking scripts removed.
- **Reconstructed original uncompiled JavaScript source code** in `src/` (`tabs.js`, `slider.js`, `theme-toggle.js`, `accordion.js`, `inline-video.js`).
- Run locally:
  ```bash
  cd varda.com && python3 server.py
  # Open http://localhost:8082/
  ```

### 4. `helionenergy.com/`
- Commercial fusion power plant with pulsed plasma magnetic compression visuals and high-energy physics storytelling.
- Formatted `index.html` with tracking scripts removed.
- **Reconstructed original uncompiled JavaScript source code** in `src/` (`theme-toggle.js`).
- Run locally:
  ```bash
  cd helionenergy.com && python3 server.py
  # Open http://localhost:8083/
  ```

### 5. `teenage.engineering/`
- Iconic Swedish industrial hardware design with Swiss/Nordic brutalist typography and responsive layout.
- Formatted `index.html`.
- Custom Teenage Engineering fonts (`assets/TE20L.*.woff2`, `TE40L.*.woff2`).
- Modular component scripts and styles (`button.*`, `container.*`, `flex.*`).
- Run locally:
  ```bash
  cd teenage.engineering && python3 server.py
  # Open http://localhost:8084/
  ```
