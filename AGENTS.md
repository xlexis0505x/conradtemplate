# Agent Guidelines & Repository Instructions

This document provides guardrails and operating guidelines for AI coding agents (Jules, Copilot, SWE agents, Antigravity) working in this repository.

---

## 1. Project Overview & Domain Boundary

- **Project:** Conrad Challenge Prototype (Energy & Environment category: *Deep-Sea Mining Sediment Plume Acoustic Suppression & Mitigation*).
- **Core Platform (`conrad.prototype/`):**
  - High-performance, client-side SPA with a responsive 3D/canvas scrubber (`conrad-janus.js`), interactive diagonal conveyor (`conrad-about.js`), and technical spec matrix (`conrad-tech.js`).
  - **Dual Edition Architecture:**
    - **Global Edition:** Branded as **DRUNKEAST**.
    - **China Edition:** Branded as **POSEIDON** (toggled via header/footer edition pill or `/?edition=china`).
- ⚠️ **Strict Domain Boundary:**
  - This is **NOT** a military defense contractor site. The legacy Anduril drone codebase has been permanently transitioned to deep-sea marine conservation.
  - **DO NOT** resurrect deleted drone models, weapons systems, airframe specs, or military terminology.
  - Active technical tabs on `/technology`: `all`, `chassis`, `dosing`, `sensing`, `materials`, `interfaces`.

---

## 2. Git Hygiene & Repository Cleanliness

1. **No Scratch Commits:**
   - **NEVER** commit temporary files, pid files, patch files, or scratch scripts (`*.pid`, `*.patch`, `*.orig`, `fix.sh`, `test_*.sh`, `server.pid`).
   - Do **NOT** commit large binary media assets (`.mp4`, `.webm`, `.bin`, `.glb`) into git unless explicitly requested.
2. **Preserve Trimmed Manifests in `index.html`:**
   - `conrad.prototype/index.html` was deliberately pruned of 40KB+ of legacy Anduril JSON state (`ssgSiteSettings`, `ASSETS_MANIFEST`).
   - **DO NOT** re-paste or restore legacy sanity/asset manifests into `index.html`.
3. **Avoid Duplicate PRs:**
   - Check `git log` and the current `main` branch before implementing changes. Do not spawn multiple overlapping branches for the same chore (e.g. DOM query caching or CORS fixes).

---

## 3. Server & Architecture Standards

1. **Local Development Server:**
   - Always run the project using `python3 conrad.prototype/server.py <port>` (default port `8087`).
   - Do **not** use `python3 -m http.server`, as standard `http.server` lacks SPA client-side route fallback and fails on routes like `/technology`, `/business`, and `/about`.
2. **Security & CORS:**
   - Dev servers across the monorepo must strictly validate `Origin` against `localhost`, `127.0.0.1`, and authorized production/staging hosts. Never reintroduce wildcard `Access-Control-Allow-Origin: *`.
   - Never interpolate unescaped user or dynamic route strings into `innerHTML`. Use `textContent` or `document.createElement()`.

---

## 4. Testing & Verification Gate

Before submitting any Pull Request or committing changes:
1. Ensure the automated test runner passes:
   ```bash
   bash ./scripts/test.sh
   ```
2. Verify all pytest and Playwright tests pass (routing, interactive modal tests, edition toggles, and performance/health checks).
3. If writing new tests:
   - Target existing deep-sea selectors (e.g., `#conrad-tech-spec-matrix`, `.conrad-spec-tab[data-filter='sensing']`, `#walkalone-inspect-sheet`, `#conrad-diligence-modal`).
   - Always verify tests against `http://localhost:8087` before opening a PR.

---

## 5. Commit & PR Standards

- Use standard **Conventional Commits**:
  - `feat(...)`: New user-facing feature or capability
  - `fix(...)`: Bug fix or security patch
  - `perf(...)`: Performance optimization or DOM caching
  - `test(...)`: Adding or updating test suites
  - `chore(...)`: Maintenance, dependency, or configuration updates
- Keep PRs focused to a single logical change. Provide a clear summary of what was changed and the test output.
