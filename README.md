# Coalowl.com — Modular Frontend Architecture

Welcome! This codebase is a modularized, beginner-friendly static portfolio and interactive pitch dossier built on top of the Coalowl website template.

---

## 🌿 Branches Overview

This repository maintains two distinct aesthetic directions:

1. **`main` (Classic Coalowl Template)**
   - Minimalist Japanese aesthetic with the original Coalowl artwork, soft gray background, and fluid animations.
   - Clean, lightweight, modular HTML and CSS without extraneous theme overrides.

2. **`New-Aesthetic-Changes-Test` (Conrad Challenge 2026 Pitch Dossier)**
   - High-contrast editorial style featuring a terracotta/vermilion color scheme.
   - Chamfered geometric cards (zero rounded corners).
   - Top technical metadata strip and an interactive **slide-out menu** with tactile sound/modal triggers.

---

## 📁 Directory Structure

```text
coalowl.com/
├── index.html                   # Lean HTML shell with semantic structure (<250 lines)
├── README.md                    # Project guide & beginner documentation
├── sw.js                        # Cache clearing service worker for local development
│
├── css/                         # Modular stylesheets (ordered by responsibility)
│   ├── reset.css                # destyle.css baseline to normalize browser defaults
│   ├── tokens.css               # Design variables (colors, spacing, theme tokens)
│   ├── typography.css           # @font-face rules, headings, and font size classes
│   ├── layout.css               # Global canvas (100vh lock), scrollbar, and responsive helpers
│   │
│   ├── components/              # Individual component stylesheets
│   │   ├── header.css           # Fixed top navigation bar, logo, and hover underlines
│   │   ├── footer.css           # Bottom-left "SCROLL DOWN" prompt and copyright
│   │   ├── social.css           # Bottom-right desktop social media links
│   │   ├── hamburger.css        # Mobile hamburger toggle and full-screen menu overlay
│   │   ├── loading.css          # Initial splash preloader and percentage counter
│   │   ├── thumbnail.css        # Center floating card showcase, info panel & marquee
│   │   └── copy.css             # Mobile profile description block
│   │
│   └── theme/                   # Aesthetic overrides
│       └── aesthetic-override.css  # [New-Aesthetic-Changes-Test branch] slide-out menu & Conrad styling
│
├── js/                          # Modular JavaScript
│   └── menu.js                  # [New-Aesthetic-Changes-Test branch] Slide-out menu toggles & shortcuts
│
├── data/                        # JSON structured data
│   ├── works.json               # Showcase items, schematic diagrams, and descriptions
│   └── about.json               # Biography, timeline, and background info
│
├── schematics/                  # SVG technical drawings and story graphics
│   ├── story-01.svg .. story-05.svg
│   └── sys-01.svg   .. sys-10.svg
│
└── _nuxt/                       # Pre-compiled Nuxt 2 runtime scripts and web fonts
```

---

## 🎨 How Stylesheet Loading Works

Stylesheets are loaded in `index.html` in a specific cascading order:

1. **`reset.css`**: Clears default browser styling.
2. **`tokens.css`**: Defines CSS variables (`--color-black`, `--color-gray`, etc.).
3. **`typography.css`**: Configures custom fonts and utility classes (`.font-works-title`, etc.).
4. **`layout.css`**: Establishes grid/viewport constraints and utility classes (`.pc-only`, `.sp-only`).
5. **`components/*.css`**: Styles individual UI elements independently.
6. *(Aesthetic branch)* **`theme/aesthetic-override.css`**: Injects editorial colors and the slide-out menu on top of the base system.

---

## 🚀 Running Locally

No bundlers, node modules, or build commands required! You can run the site using any static web server:

### Using Python (recommended)
```bash
# In the project root directory:
python3 -m http.server 8080
```
Then visit **[http://localhost:8080](http://localhost:8080)** in your web browser.

### Using VS Code Live Server
Right-click `index.html` and choose **"Open with Live Server"**.

---

## 💡 Beginner Tips

- **Change Theme Colors**: Open `css/tokens.css` (or `css/theme/aesthetic-override.css` on the aesthetic branch) to adjust `--color-black`, `--color-gray`, or `--accent-terracotta`.
- **Edit Navigation Links**: Check the `<div class="header">` element in `index.html` and styles in `css/components/header.css`.
- **Modify Showcase Slides**: Update text and image references in `data/works.json`.
