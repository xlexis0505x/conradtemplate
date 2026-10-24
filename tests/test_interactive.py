import pytest


@pytest.mark.interactive
def test_bento_card_modal_open_and_close(page, base_url):
    """Verifies clicking a Bento product card opens the inspection modal and Escape key closes it."""
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_selector(".FeaturedProductsCard", timeout=12000)

    # Click the first card
    first_card = page.locator(".FeaturedProductsCard").first
    first_card.scroll_into_view_if_needed()
    first_card.click()

    # Verify modal opens
    modal = page.locator("#conrad-bento-modal")
    modal.wait_for(state="attached", timeout=5000)

    # Check modal content is populated
    title_el = page.locator("#bento-modal-title")
    title_el.wait_for(state="visible", timeout=5000)
    title_text = title_el.inner_text()
    assert len(title_text) > 0, "Bento modal title must not be empty upon opening"

    # Close with Escape key
    page.keyboard.press("Escape")
    # Modal should close / fade out
    page.wait_for_function(
        "() => { const m = document.getElementById('conrad-bento-modal'); return !m || m.style.display === 'none' || m.style.opacity === '0' || !m.classList.contains('active'); }",
        timeout=5000
    )


@pytest.mark.interactive
def test_janus_3d_lazy_loading(page, base_url):
    """Verifies that the 3D Radiant Janus scene canvas initializes when scrolled into view."""
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_selector("#Stage", timeout=10000)

    # Locate the 3D scrubber section
    track = page.locator("#conrad-radiant-janus-track")
    if track.count() == 0:
        # Give custom script a moment to inject track into DOM
        track.wait_for(state="attached", timeout=6000)

    assert track.count() > 0, "The 3D Radiant Janus track section must be present in DOM"

    # Scroll the 3D track into view to trigger IntersectionObserver lazy-loading
    track.scroll_into_view_if_needed()
    page.wait_for_timeout(1000)

    # Verify canvas element is created and attached
    canvas = page.locator("#janus-canvas")
    canvas.wait_for(state="attached", timeout=8000)

    width = canvas.evaluate("(el) => el.clientWidth || el.width")
    height = canvas.evaluate("(el) => el.clientHeight || el.height")
    assert width > 0 and height > 0, f"Janus canvas must have non-zero dimensions, got {width}x{height}"
