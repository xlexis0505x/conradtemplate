# Conrad Challenge Prototype

Dedicated Conrad Challenge pitch website (Energy & Environment: Deep-Sea Mining Sediment Plume Acoustic Suppression).

## 🚀 Running Locally
```bash
cd conrad.prototype
python3 server.py
# Open http://localhost:8087/
```
Or run with any custom port:
```bash
python3 server.py 9000
```

## 🌍 Dual-Edition System

The prototype supports a dual-edition system:
- **Global Edition**: Branded as DRUNKEAST.
- **China Edition**: Branded as POSEIDON (accessed via `/?edition=china`).

## 📁 Directory Structure

- `index.html`: Clean, formatted DOM snapshot with animations and layout intact.
- `js/`: Modular JavaScript controllers including a centralized SPA router (`js/conrad-router.js`) and transparent WebGL stage integration.
- `css/`: Scoped CSS modules.
- `assets/`, `models/`, `textures/`, `data/`: All downloaded styles, fonts, images, and models for the 3D interactive showcase.
- `server.py`: Standalone local development server configured for port 8087.
