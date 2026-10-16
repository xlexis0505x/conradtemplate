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

## 💡 Troubleshooting & Edge Cases

- **Site Behind Heavy Cloudflare Captcha**: If a site uses interactive Turnstile/Captcha that blocks headless browsing, launch Chrome in non-headless mode or specify an existing Chrome profile:
  `--user-data-dir="<path_to_profile>"`
- **Missing Lazy Images**: If high-resolution hero images are missing, increase the wait timeout in `clone.js` or trigger click events on tab/slider controls before taking the DOM snapshot.
- **Port Conflicts**: If the target port is in use, pass a different port to `server.py`:
  `python3 server.py 9000`
