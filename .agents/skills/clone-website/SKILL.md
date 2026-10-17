---
name: clone-website
description: >-
  Creates a high-fidelity, clean local copy of any website given its URL and sets it up to run on an independent local development server.
  Captures rendered DOM, CSS, JS bundles, web fonts, SVGs, images, videos, 3D GLTF models, recovers uncompiled source code from Source Maps,
  strips trackers, and generates a standalone server.py.
---

# Clone Website & Local Development Server Workflow

This skill guides the agent through downloading a complete, standalone, offline-runnable mirror of any website, extracting uncompiled source code from Source Maps, cleaning all tracking/bloat scripts, and creating a local development server.

---

## 🛠️ When to Use This Skill

Activate this skill when:
- The user provides one or more website URLs and asks to download, clone, mirror, or save a local copy.
- The user wants the frontend source code, styles, assets, fonts, or 3D models from an external website to run locally or use for design inspiration.
- The user wants a clean, self-contained folder with an independent `server.py` for each website.

---

## 📋 Step-by-Step Procedure

### Step 1: Establish Target Parameters
Identify from the user prompt:
1. **Target URL**: (e.g. `https://example.com/`)
2. **Folder Name**: (defaults to domain name, e.g. `example.com/`)
3. **Local Server Port**: (e.g. `8085` or next available port)

---

### Step 2: Run the Browser-Driven Cloner
Execute the bundled automated harvesting script:

```bash
node .agents/skills/clone-website/scripts/clone.js "<TARGET_URL>" "<FOLDER_NAME>" <PORT>
```

#### What the Cloner Does Automatically:
1. **Browser Engine**: Launches Google Chrome in headless mode with real desktop user-agent and viewport settings (bypassing Cloudflare/Fastly bot blocks).
2. **Dynamic Triggering**: Scrolls down the entire page to trigger `IntersectionObserver` lazy images, WebGL canvases, and dynamic JavaScript chunk imports.
3. **Asset Interception**: Captures and saves all HTTP/HTTPS network responses:
   - Rendered DOM (`index.html`)
   - Stylesheets (`.css`) & CSS custom property tokens
   - JavaScript runtime bundles & chunks (`.js`, `.mjs`)
   - Web Fonts (`.woff2`, `.woff`, `.ttf`)
   - Visual Assets (`.svg`, `.png`, `.webp`, `.avif`, `.jpg`)
   - 3D Models (`.glb`, `.gltf`, Draco mesh decoders)
   - Media (`.mp4`, `.webm`)
   - JSON data & state payloads
4. **Source Map Recovery**: Searches all downloaded JavaScript files for `sourceMappingURL`. If public `.map` files are present, it unpacks the original uncompiled React / TypeScript / JavaScript source code directly into `src/`.
5. **Asset Relativization**: Re-routes external CDN references (`cdn.sanity.io`, `website-files.com`, etc.) to local mirror paths under `_external/`.
6. **Automatic Sanitization**: Invokes `clean.py` to remove Google Tag Manager, Analytics, Cloudflare challenge iframes, and formats `index.html` with clean indentation.
7. **Local Server Generation**: Automatically creates a custom, executable `server.py` configured with SPA fallback routing, permissive CORS, and modern MIME types.

---

### Step 3: Verify Local Execution
Test that the generated server runs and serves the site with zero errors:

```bash
# 1. Enter the newly cloned directory:
cd <FOLDER_NAME>

# 2. Run the server:
python3 server.py <PORT>

# 3. Verify HTTP 200 response:
curl -sI http://localhost:<PORT>/
```

---

### Step 4: (Optional) Register in Multi-Site Launchers
If the user maintains a multi-site project with a master launcher (e.g. `start.py`), add the new site to the list:

```python
{
    "name": "<Site Name>",
    "dir": "<FOLDER_NAME>",
    "port": <PORT>,
    "script": "server.py",
    "args": ["<PORT>"],
    "url": "http://localhost:<PORT>/"
}
```

---

## 💡 Architecture Patterns & Field Debugging Guide

Based on real-world edge cases encountered across modern production websites (e.g. Teenage Engineering, Anduril Industries, Walk Alone), apply these critical lessons:

### 1. SSR / Framework Data Slices (`.data`, `_rsc`, `_next/data`)
- **Symptom**: Clicking subpage navigation or tabs causes blank screens, infinite spinners, or "Can't find page" errors even though HTML exists.
- **Root Cause**: Frameworks like Remix, Next.js, and Astro do not perform full HTML page reloads. Instead, client-side routers fetch data endpoints (e.g. `/products.data`, `/store.data`, or `_next/data/.../page.json`).
- **Solution**:
  - In `server.py`, implement transparent upstream fallback caching: when an uncached `.data` or data JSON request arrives, fetch it dynamically from upstream, write it to disk, and serve it.
  - Pre-fetch critical route data payloads during the initial crawl.

### 2. Client-Side Hydration vs. Static DOM Snapshot Conflicts
- **Symptom**: Page renders, but buttons cannot be clicked, hover animations do not fire, and navigation does nothing.
- **Root Cause**: When a cloner serializes the rendered DOM into `index.html`, it freezes dynamic container nodes (e.g. `#Stage`, `#app`, `<header>`, `<nav>`). When the runtime bundle executes, it mounts new runtime component instances. The static "ghost" DOM nodes sit on top of the dynamic nodes, intercepting pointer events and blocking `:hover` states and click handlers.
- **Solution**:
  - Keep initial HTML mount points clean. In SPAs that build the DOM dynamically from embedded state, preserve only critical SSR state scripts (e.g. `<script id="ssgContent" type="application/json">`, `<script id="ssgSiteSettings">`, `window.__INITIAL_STATE__`), leaving the mount container empty so runtime code hydrates without duplication.
  - **Deduplicate Scripts**: Never convert `<link rel="preload" as="script">` into `<script>` tags, which causes libraries (like `@theatre/core` or `lenis`) to execute twice and crash.

### 3. SPA Route Data Files (`<route>.json`)
- **Symptom**: SPA navigation freezes on first click, and console shows `SyntaxError: Unexpected token '<'`.
- **Root Cause**: Client routers often request `/<route>.json` (e.g. `/space/space.json`, `/arsenal.json`, `/404.json`). When missing locally, standard servers return a 404 HTML document. The router tries to parse HTML as JSON, throws an unhandled exception, and crashes the router state machine permanently.
- **Solution**:
  - Extract all internal route paths from the navigation tree.
  - Pre-download all `/<route>.json` payloads.
  - In `server.py`, ensure missing `.json` files are fetched from upstream or return a valid fallback `{}` rather than an HTML 404 page.

### 4. Interactive Carousels & 3D Stacking Order
- **Symptom**: In carousels (e.g. Walk Alone), clicking takes 5–10 seconds to load, or clicking the center card opens a completely different project.
- **Root Cause**:
  1. **Blocking Upstream Fallback**: If subpages are not pre-downloaded, synchronous server-side `urllib` requests against bot-protected sites (Cloudflare) hang for 5–10s before timing out.
  2. **False Fallback to Home**: When the timeout occurs, naive server fallback returns `index.html` (the home page), which resets the carousel to index 0, giving the user the impression that the "wrong page" loaded.
  3. **3D Transformed Card Stacking**: Rotated, absolutely positioned cards overlap bounding boxes. Elements placed later in DOM order capture mouse clicks meant for earlier centered items.
- **Solution**:
  - **Pre-download all subpages upfront**: Scrape all carousel work items and gallery images so every click resolves locally in 0ms.
  - **Elevate Active Item Z-Index**: Add `.base-works__item[data-item-center] { z-index: 10 !important; }` so the visually centered item always has highest stacking priority.

### 5. Server Fallback Hygiene
- **Rule**: `server.py` must **ONLY** fall back to `index.html` for extensionless routes (SPA navigation).
- **Never** fall back to `index.html` for missing assets with extensions (`.json`, `.png`, `.avif`, `.css`), as serving HTML in place of images/JSON corrupts browser parsers.

### 6. 3D WebGL Engines, Draco Geometry & Worker CORS (e.g. Anduril, Helion)
- **Symptom**:
  1. 3D slices show black boxes, empty spaces, or infinite "System Initializing / Loading" states.
  2. Browser console reports: `Access to fetch at 'https://.../DracoWorker.js' has been blocked by CORS policy` or `TypeError: Failed to fetch`.
  3. Interactive 3D model viewer opens, but the 3D model itself is invisible (only hot-spots/text appear).
- **Root Causes**:
  1. **Accidental Canvas Hiding**: Never inject `canvas { display: none !important; }` as a global hack! Hiding the canvas sets its layout bounding box to `0x0`, breaking camera aspect ratios, matrix projections, and WebGL rendering.
  2. **Worker CORS Security Policies**: Modern 3D engines instantiate Draco geometry decoders inside Web Workers using Blob URLs (`URL.createObjectURL(new Blob(...))`). When the worker script calls `importScripts('https://external-cdn/...')` or `fetch('https://...')`, browser security policies block the request if the external server lacks `Access-Control-Allow-Origin: *`.
  3. **Fragmented 3D Assets**: High-end WebGL engines (Hydra, Three.js) don't store 3D models as single `.glb` files. They split models into Draco-compressed binary chunks (`.bin`), Basis Universal textures (`.ktx2`), normal/roughness maps, and separate wasm decoders (`draco_decoder.wasm`, `basis_transcoder.wasm`).
- **Solutions**:
  - **Never hide the canvas**: Ensure `<canvas>` has proper display styling and dimensions matching its viewport or parent container.
  - **Localize Draco Workers & Transcoders**: Download the Draco worker script (`DracoWorker.js`), wrapper (`draco_decoder.js`), and wasm decoders into `_external/` or `assets/js/lib/`.
  - **Rewrite Worker URLs to Same-Origin**: In the frontend JS, patch the worker paths to use `window.location.origin + "/_external/..."` so `importScripts` resolves from the local development server with zero CORS errors.
  - **Harvest Full 3D Manifests**: Locate the runtime asset manifest (e.g. `uil.json` in Hydra or scene descriptor JSONs). Extract all `.bin` geometry chunks, `.ktx2` basis textures, and normal maps, and pre-download them into the local mirror.
  - **Dynamic `/assets/` Caching in `server.py`**: Add an upstream fallback in `server.py` for `/assets/` and `_external/` that fetches missing geometry chunks on demand and caches them to disk.

---

## 🛠️ Edge Cases Quick Reference

| Issue | Root Cause | Fix |
| :--- | :--- | :--- |
| **Missing / Invisible 3D Model** | Global `canvas { display: none !important; }` rule or missing Draco `.bin` / `.ktx2` assets | Remove canvas suppression rule; download full geometry `.bin` and `.ktx2` textures from asset manifest |
| **3D Worker CORS Block** | Draco worker inside Blob URL fetching scripts from external CDN without CORS | Download worker & decoder locally; patch script path to `window.location.origin + "/_external/..."` |
| **Double Components / Inactive Buttons** | Static DOM tree captured during clone conflicting with runtime mount | Clear static children from mount container in `index.html` |
| **Router Crash on Route Click** | Missing `/<route>.json` or `/<route>.data` returning 404 HTML | Pre-download route data files; add dynamic proxy fallback in `server.py` |
| **Wrong Project on Carousel Click** | Later DOM elements overlapping in 3D space or failed fetch falling back to `index.html` | Pre-download all subpages; elevate centered item with `z-index: 10` |
| **Video Playback Fails/Freezes** | Server lacks HTTP 206 Byte-Range streaming | Use `ThreadingHTTPServer` with `Range` header slicing in `server.py` |

