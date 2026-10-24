import pytest


@pytest.mark.editions
def test_edition_branding_switch(page, base_url):
    """Verifies that the Global edition shows DRUNKEAST and the China edition shows POSEIDON."""
    # 1. Global Edition Check
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_selector("#Stage", timeout=10000)

    global_title = page.title()
    assert "DRUNKEAST" in global_title, f"Expected 'DRUNKEAST' in title, got: {global_title}"

    # 2. China Edition Check
    china_url = f"{base_url}/cn/" if "github.io" in base_url else f"{base_url}/?edition=china"
    page.goto(china_url, wait_until="domcontentloaded")
    page.wait_for_selector("#Stage", timeout=10000)

    # Wait for brand to hydrate client-side
    page.wait_for_function("() => document.title.includes('POSEIDON')", timeout=5000)
    china_title = page.title()
    assert "POSEIDON" in china_title, f"Expected 'POSEIDON' in title, got: {china_title}"


@pytest.mark.editions
def test_business_financials_rendered(page, base_url):
    """Verifies that the Business route renders financial models, ledger, and analysis sections."""
    page.goto(f"{base_url}/business", wait_until="domcontentloaded")
    page.wait_for_selector("#Stage", timeout=10000)

    # Allow custom conrad-biz sections to inject
    page.wait_for_selector(".conrad-biz-section, #conrad-biz-doctrine", timeout=8000)

    # Check for presence of financial doctrine/sections
    sections = page.locator(".conrad-biz-section, .conrad-doctrine-card")
    assert sections.count() > 0, "Business route must render financial model and doctrine cards"


@pytest.mark.editions
def test_tech_pipeline_rendered(page, base_url):
    """Verifies that the Technology route renders the technical architecture matrix and specifications."""
    page.goto(f"{base_url}/technology", wait_until="domcontentloaded")
    page.wait_for_selector("#Stage", timeout=10000)

    # Check for tech specification matrix or custom cards
    page.wait_for_selector(".conrad-spec-section, #conrad-tech-spec-matrix", timeout=8000)

    spec_cards = page.locator(".conrad-spec-section, .conrad-spec-tab")
    assert spec_cards.count() > 0, "Technology route must render specification tabs/sections"
