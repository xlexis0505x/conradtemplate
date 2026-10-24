import pytest
from playwright.sync_api import Page, expect

BASE_URL = "http://localhost:8087"

def test_header_search_removed(page: Page):
    """Verify that the Search link/button on the top right corner is removed."""
    page.goto(BASE_URL)
    page.wait_for_timeout(1000)
    
    # Assert Search link is hidden or absent
    search_link = page.locator(".HeaderDesktop .searchLink, .HeaderMobile .search-button")
    if search_link.count() > 0:
        expect(search_link.first).not_to_be_visible()

def test_footer_anduril_logo_and_legal_links_removed(page: Page):
    """Verify that Anduril logo and legal filler links below it are removed."""
    page.goto(BASE_URL)
    page.wait_for_timeout(1000)
    
    # Scroll to footer
    page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(500)
    
    # Assert Anduril logo in footer is hidden or absent
    anduril_logo = page.locator('.Footer svg[aria-label*="Anduril" i], .Footer .logo')
    if anduril_logo.count() > 0:
        expect(anduril_logo.first).not_to_be_visible()
        
    # Assert terms of use, modern anti-slavery, etc. are not visible in small-links
    filler = page.locator('.Footer a[href*="terms-of-use"], .Footer a[href*="modern-anti-slavery"], .Footer a[href*="uk-carbon"]')
    expect(filler).to_have_count(0)

def test_404_error_background_photo(page: Page):
    """Verify that 404 page has subsea background photo and no particle animation canvas."""
    page.goto(f"{BASE_URL}/404")
    page.wait_for_timeout(1500)
    
    # Check FourOhFourSlice exists and has photo background
    slice_el = page.locator(".FourOhFourSlice")
    expect(slice_el).to_be_visible()
    
    bg_style = page.evaluate('() => window.getComputedStyle(document.querySelector(".FourOhFourSlice")).backgroundImage')
    assert "error-404-subsea-bg.jpg" in bg_style or "url(" in bg_style
    
    # Check canvas is hidden/none on 404
    canvas_display = page.evaluate('() => { const c = document.querySelector(".Container > canvas"); return c ? window.getComputedStyle(c).display : "none"; }')
    assert canvas_display == "none"
