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
def test_clean_root_defaults_to_global_and_logo_loads(page, base_url):
    """Verifies that clean root URLs always default to Global (DRUNKEAST) and header emblem images load."""
    # 1. Visit China edition first
    china_url = f"{base_url}/cn/" if "github.io" in base_url else f"{base_url}/?edition=china"
    page.goto(china_url, wait_until="domcontentloaded")
    page.wait_for_selector(".conrad-brand-emblem", timeout=8000)
    
    # Verify Poseidon emblem loaded successfully with positive natural dimensions
    page.wait_for_function("() => { const img = document.querySelector('.conrad-brand-emblem'); return img && img.naturalWidth > 0; }", timeout=5000)
    poseidon_nw = page.evaluate("() => document.querySelector('.conrad-brand-emblem').naturalWidth")
    assert poseidon_nw > 0, "Poseidon logo image must load with positive natural width"

    # 2. Revisit clean root - MUST default back to DRUNKEAST
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_selector(".conrad-brand-name", timeout=8000)
    
    page.wait_for_function("() => window.Conrad && window.Conrad.edition === 'global'", timeout=5000)
    edition = page.evaluate("() => window.Conrad.edition")
    assert edition == "global", f"Clean root must default to 'global', got: {edition}"
    
    brand_text = page.evaluate("() => document.querySelector('.conrad-brand-name').textContent")
    assert "DrunkEast" in brand_text, f"Expected 'DrunkEast' in brand lockup, got: {brand_text}"
    
    drunkeast_nw = page.evaluate("() => document.querySelector('.conrad-brand-emblem').naturalWidth")
    assert drunkeast_nw > 0, "DrunkEast logo image must load with positive natural width"


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
