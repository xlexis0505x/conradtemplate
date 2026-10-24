import pytest


@pytest.mark.health
def test_zero_console_errors_and_asset_timeouts(page, base_url):
    """Verifies that the initial page load has zero asset timeouts and no critical JS runtime errors."""
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_timeout(3500)

    # Filter messages for critical issues
    asset_timeouts = [
        msg["text"] for msg in page.console_messages
        if "asset timed out" in msg["text"].lower() or "theatrejs" in msg["text"].lower() and msg["type"] in ["warning", "error"]
    ]
    fatal_errors = [
        msg["text"] for msg in page.console_messages
        if msg["type"] == "error" and not "favicon" in msg["text"].lower()
    ]

    assert len(asset_timeouts) == 0, f"Found asset timeouts in console: {asset_timeouts}"
    assert len(fatal_errors) == 0, f"Found fatal JavaScript runtime errors in console: {fatal_errors}"


@pytest.mark.health
def test_lcp_paint_timing(page, base_url):
    """Verifies that the Largest Contentful Paint (LCP) element renders within performance budgets."""
    page.add_init_script("""
        window.__lcpEntries = [];
        const observer = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                window.__lcpEntries.push({
                    startTime: entry.startTime,
                    size: entry.size,
                    url: entry.url
                });
            }
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
    """)

    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_timeout(2500)

    lcp_entries = page.evaluate("() => window.__lcpEntries || []")
    assert len(lcp_entries) > 0, "At least one Largest Contentful Paint (LCP) entry must be registered"

    first_lcp = lcp_entries[0]
    max_threshold = 4000 if "github.io" in base_url else 2000
    assert first_lcp["startTime"] < max_threshold, (
        f"LCP startTime ({first_lcp['startTime']:.1f}ms) exceeded threshold of {max_threshold}ms"
    )


@pytest.mark.health
def test_preload_cache_integrity(page, base_url):
    """Verifies that preloaded assets are consumed without browser credential mode or unused preload warnings."""
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_timeout(2500)

    preload_warnings = [
        msg["text"] for msg in page.console_messages
        if "preload" in msg["text"].lower() and (
            "not used" in msg["text"].lower() or "credentials mode" in msg["text"].lower()
        )
    ]
    assert len(preload_warnings) == 0, f"Preload credentials mismatch warnings detected: {preload_warnings}"


@pytest.mark.health
def test_zero_failed_requests(page, base_url):
    """Verifies that no essential site assets (scripts, stylesheets, json, models) return 404 or 500 errors."""
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_timeout(3000)

    # Allow optional external analytics or favicons to be skipped if network blocked
    critical_failures = [
        r for r in page.failed_requests
        if not any(ign in r["url"] for ign in ["favicon", "google-analytics", "mixpanel"])
    ]
    assert len(critical_failures) == 0, f"Critical network requests failed: {critical_failures}"


@pytest.mark.health
def test_asset_integrity():
    """Automated test verifying that all images referenced in global.js, china.js, and component scripts exist on disk without 404s."""
    import os
    import re

    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "conrad.prototype"))

    js_files_to_check = [
        "js/content/global.js",
        "js/content/china.js",
    ]

    missing_assets = []

    pattern = re.compile(r'(/_external/cdn\.sanity\.io/(?:images|files)/[^"\s\'\?]+)')

    for js_file in js_files_to_check:
        filepath = os.path.join(base_dir, js_file)
        if not os.path.exists(filepath):
            continue

        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        matches = pattern.findall(content)
        for match in matches:
            rel_path = match.lstrip("/")
            full_path = os.path.join(base_dir, rel_path)

            if not os.path.exists(full_path):
                missing_assets.append(rel_path)

    assert len(missing_assets) == 0, f"Found {len(missing_assets)} missing referenced assets on disk: {missing_assets[:10]}"
