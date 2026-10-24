import pytest


@pytest.mark.routing
def test_global_routes_navigation(page, base_url):
    """Verifies SPA client-side routing across all main visible navigation links on the Global edition."""
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_selector("#Stage", timeout=10000)

    # 1. Technology Route
    tech_link = page.locator('.top-nav a[href*="technology"]')
    tech_link.wait_for(state="attached", timeout=5000)
    tech_link.click(force=True)

    page.wait_for_selector("#conrad-tech-spec-matrix", state="attached", timeout=5000)

    # Wait for page transition animation to complete
    page.wait_for_timeout(2000)

    # 2. Business Route
    biz_link = page.locator('.top-nav a[href*="business"]')
    biz_link.wait_for(state="attached", timeout=5000)
    biz_link.click(force=True)

    page.wait_for_selector("#conrad-biz-doctrine", state="attached", timeout=5000)

    # Wait for page transition animation to complete
    page.wait_for_timeout(2000)

    # 3. About Route
    about_link = page.locator('.top-nav a[href*="about"]')
    about_link.wait_for(state="attached", timeout=5000)
    about_link.click(force=True)

    page.wait_for_selector("#conrad-walkalone-track", state="attached", timeout=5000)

    # Wait for page transition animation to complete
    page.wait_for_timeout(2000)

    # 4. Return to Home via Logo/Home Link
    home_link = page.locator('.top-nav a.Header__logo, .top-nav a[href="/"], .top-nav a:has-text("Home")').first
    home_link.wait_for(state="attached", timeout=5000)
    home_link.click(force=True)

    page.wait_for_selector(".FeaturedProductsCard", state="attached", timeout=5000)


@pytest.mark.routing
def test_china_routes_navigation(page, base_url):
    """Verifies that the China edition loads with the POSEIDON branding and preserves edition across routes."""
    target_url = f"{base_url}/cn/" if "github.io" in base_url else f"{base_url}/?edition=china"
    page.goto(target_url, wait_until="domcontentloaded")
    page.wait_for_selector("#Stage", timeout=10000)

    # Wait for client-side brand and edition resolution
    page.wait_for_function(
        "() => (window.Conrad && window.Conrad.edition === 'china') || window.CONRAD_EDITION === 'china'",
        timeout=5000
    )
    edition = page.evaluate("() => (window.Conrad && window.Conrad.edition) || window.CONRAD_EDITION")
    assert edition == "china", f"Expected active edition to be 'china', got '{edition}'"

    # Verify POSEIDON in title once brand has hydrated
    page.wait_for_function("() => document.title.includes('POSEIDON')", timeout=5000)
    assert "POSEIDON" in page.title()

    # Navigate to Technology under China edition
    tech_link = page.locator('.top-nav a[href*="technology"]')
    tech_link.wait_for(state="attached", timeout=5000)
    tech_link.click(force=True)

    page.wait_for_selector("#conrad-tech-spec-matrix", state="attached", timeout=5000)
    edition_after = page.evaluate("() => (window.Conrad && window.Conrad.edition) || window.CONRAD_EDITION")
    assert edition_after == "china", "China edition state must persist after client-side route navigation"


@pytest.mark.routing
def test_history_back_forward(page, base_url):
    """Verifies popstate history handling (browser Back and Forward buttons)."""
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_selector("#Stage", timeout=10000)

    # Navigate to Technology
    tech_link = page.locator('.top-nav a[href*="technology"]')
    tech_link.wait_for(state="attached", timeout=5000)
    tech_link.click(force=True)
    page.wait_for_selector("#conrad-tech-spec-matrix", state="attached", timeout=5000)

    # Allow transition to settle
    page.wait_for_timeout(2000)

    # Browser Back
    page.go_back()
    page.wait_for_selector(".FeaturedProductsCard", state="attached", timeout=5000)

    # Allow transition to settle
    page.wait_for_timeout(2000)

    # Browser Forward
    page.go_forward()
    page.wait_for_selector("#conrad-tech-spec-matrix", state="attached", timeout=5000)
