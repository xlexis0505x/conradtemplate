#!/usr/bin/env python3
"""
HTML Sanitizer and Prettifier for Cloned Websites
Removes tracking pixels, analytics scripts, and bot challenge iframes,
then formats the HTML into clean, human-readable code.
"""

import sys
import shutil
from pathlib import Path

try:
    from bs4 import BeautifulSoup
except ImportError:
    BeautifulSoup = None


TRACKING_KEYWORDS = [
    "googletagmanager",
    "google-analytics",
    "doubleclick",
    "gtag",
    "dataLayer",
    "fathom",
    "usefathom",
    "snap.licdn.com",
    "px.ads.linkedin.com",
    "challenge-platform",
    "cloudflareinsights",
    "beacon.min.js",
    "__CF$cv$params",
    "hotjar",
    "segment.io",
]

JUNK_DIR_PATTERNS = [
    "px.ads.linkedin.com",
    "challenges.cloudflare.com",
    "cdn.usefathom.com",
    "jnn-pa.googleapis.com",
    "static.cloudflareinsights.com",
]


def clean_html(index_path: Path):
    if not index_path.exists():
        return

    raw = index_path.read_text(encoding="utf-8", errors="ignore")

    if BeautifulSoup:
        soup = BeautifulSoup(raw, "html.parser")

        # 1. Remove tracking scripts
        for s in soup.find_all("script"):
            src = s.get("src", "").lower()
            text = (s.string or "").lower()
            if any(k in src or k in text for k in TRACKING_KEYWORDS):
                s.decompose()

        # 2. Remove tracking iframes (1px or hidden)
        for iframe in soup.find_all("iframe"):
            style = (iframe.get("style") or "").lower()
            height = iframe.get("height", "")
            if "hidden" in style or height in ("0", "1"):
                iframe.decompose()

        # 3. Format and save
        formatted = soup.prettify()
        index_path.write_text(formatted, encoding="utf-8")
        print(f"  ✓ Cleaned & formatted {index_path.name} ({len(formatted.splitlines())} lines)")
    else:
        # Fallback simple regex cleaner
        import re
        cleaned = re.sub(r"<script[^>]*google-analytics[^>]*>.*?</script>", "", raw, flags=re.DOTALL)
        cleaned = re.sub(r"<script[^>]*googletagmanager[^>]*>.*?</script>", "", cleaned, flags=re.DOTALL)
        index_path.write_text(cleaned, encoding="utf-8")
        print(f"  ✓ Sanitized {index_path.name}")


def clean_junk_assets(target_dir: Path):
    ext_dir = target_dir / "_external"
    if not ext_dir.exists():
        return

    for pattern in JUNK_DIR_PATTERNS:
        for p in ext_dir.rglob(pattern):
            if p.is_dir():
                shutil.rmtree(p, ignore_errors=True)
                print(f"  ✓ Removed tracking directory: {p.relative_to(target_dir)}")
            elif p.is_file():
                p.unlink(missing_ok=True)


def main():
    if len(sys.argv) < 2:
        print("Usage: clean.py <site_directory>")
        sys.exit(1)

    target_dir = Path(sys.argv[1]).resolve()
    if not target_dir.exists():
        print(f"Error: Directory {target_dir} does not exist.")
        sys.exit(1)

    print(f"🧹 Sanitizing {target_dir.name}...")
    clean_html(target_dir / "index.html")
    clean_junk_assets(target_dir)
    print("✓ Sanitization complete.")


if __name__ == "__main__":
    main()
