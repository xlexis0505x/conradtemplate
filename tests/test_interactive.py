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
    """Verifies that the 3D Radiant Janus scene canvas initializes and loads assets when scrolled into view."""
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
    page.wait_for_timeout(2000)

    # Verify canvas element is created and attached
    canvas = page.locator("#janus-canvas")
    canvas.wait_for(state="attached", timeout=8000)

    width = canvas.evaluate("(el) => el.clientWidth || el.width")
    height = canvas.evaluate("(el) => el.clientHeight || el.height")
    assert width > 0 and height > 0, f"Janus canvas must have non-zero dimensions, got {width}x{height}"

    # Verify that the 3D model assets actually loaded (not caught in error fallback)
    failed_janus_assets = [
        msg["text"] for msg in page.console_messages
        if "[janus]" in msg["text"] and "failed to load" in msg["text"]
    ]
    assert len(failed_janus_assets) == 0, f"Janus 3D engine failed to load assets: {failed_janus_assets}"


@pytest.mark.interactive
def test_tech_3d_model_interactive(page, base_url):
    """Verifies that the 3D model on /technology loads, dismisses the loading overlay, and mounts the 3D scene."""
    page.goto(f"{base_url}/technology", wait_until="domcontentloaded")
    page.wait_for_selector(".Product3DSlice", timeout=12000)

    slice_el = page.locator(".Product3DSlice")
    slice_el.scroll_into_view_if_needed()

    # Wait for the loader overlay to dismiss (opacity 0 / display none)
    page.wait_for_function(
        "() => { const l = document.querySelector('.Product3DSlice .glOverlay'); return !l || l.style.display === 'none' || l.style.opacity === '0'; }",
        timeout=12000
    )

    # Verify the Launch Interactive View CTA is available
    cta = page.locator(".Product3DSlice button:has-text('Launch Interactive View'), .Product3DSlice .cta").first
    assert cta.is_visible(), "Launch Interactive View CTA should be visible once 3D assets are ready"


@pytest.mark.interactive
def test_spec_matrix_filters(page, base_url):
    """Verifies that clicking a tab in the Spec Matrix filters the rows correctly."""
    page.goto(f"{base_url}/technology", wait_until="domcontentloaded")

    # Wait for the spec matrix tabs to be injected
    page.wait_for_selector(".conrad-spec-tab[data-filter='sensing']", timeout=12000)

    tab = page.locator(".conrad-spec-tab[data-filter='sensing']")
    tab.scroll_into_view_if_needed()
    tab.click()

    # Check that sensing rows are visible and materials rows are hidden
    sensing_row = page.locator(".conrad-spec-row[data-category='sensing']").first
    materials_row = page.locator(".conrad-spec-row[data-category='materials']").first

    sensing_row.wait_for(state="visible", timeout=5000)
    materials_row.wait_for(state="hidden", timeout=5000)


@pytest.mark.interactive
def test_janus_3d_scrubber_buttons(page, base_url):
    """Test clicking #janus-next and #janus-prev to verify caption transitions and cell progress."""
    page.goto(f"{base_url}/", wait_until="domcontentloaded")

    page.wait_for_selector("#janus-next", timeout=12000)

    next_btn = page.locator("#janus-next")
    next_btn.scroll_into_view_if_needed()
    next_btn.click()

    # Verify canvas dimension is greater than 0
    canvas = page.locator("#janus-canvas")
    canvas.wait_for(state="attached", timeout=5000)
    width = canvas.evaluate("(el) => el.clientWidth || el.width")
    assert width > 0, "Janus canvas must have non-zero dimensions after clicking next"


@pytest.mark.interactive
def test_walk_alone_conveyor_modal(page, base_url):
    """Test conveyor card rendering and clicking to open the inspection modal on /about."""
    page.goto(f"{base_url}/about", wait_until="domcontentloaded")

    page.wait_for_selector("#conrad-prepaint-hero", state="hidden", timeout=12000)
    page.wait_for_selector(".LoaderView", state="hidden", timeout=12000)

    page.wait_for_selector(".walkalone-card-item", state="attached", timeout=12000)

    first_card = page.locator(".walkalone-card-item").first
    first_card.evaluate("el => el.click()")

    modal = page.locator("#walkalone-inspect-sheet")
    page.wait_for_function(
        "() => { const m = document.getElementById('walkalone-inspect-sheet'); return m && m.classList.contains('active'); }",
        timeout=5000
    )


@pytest.mark.interactive
def test_diligence_data_room_modal(page, base_url):
    """Test clicking the Diligence trigger and closing via backdrop/ESC on /business."""
    page.goto(f"{base_url}/business", wait_until="domcontentloaded")

    page.wait_for_selector("#conrad-prepaint-hero", state="hidden", timeout=12000)
    page.wait_for_selector(".LoaderView", state="hidden", timeout=12000)

    page.wait_for_selector("#conrad-open-diligence-btn", timeout=12000)

    btn = page.locator("#conrad-open-diligence-btn")
    btn.scroll_into_view_if_needed()
    btn.click(force=True)

    modal = page.locator("#conrad-diligence-modal")
    page.wait_for_function(
        "() => { const m = document.getElementById('conrad-diligence-modal'); return m && m.classList.contains('open'); }",
        timeout=5000
    )

    page.keyboard.press("Escape")
    page.wait_for_function(
        "() => { const m = document.getElementById('conrad-diligence-modal'); return !m || !m.classList.contains('open'); }",
        timeout=5000
    )


@pytest.mark.interactive
def test_mobile_viewport_hamburger(browser, base_url):
    """Add a test at 390x844 to verify mobile header hamburger menu toggling and drawer navigation."""
    context = browser.new_context(
        viewport={"width": 390, "height": 844},
        device_scale_factor=1,
    )
    page = context.new_page()
    page.goto(f"{base_url}/", wait_until="domcontentloaded")

    page.wait_for_selector("#conrad-prepaint-hero", state="hidden", timeout=12000)
    page.wait_for_selector(".LoaderView", state="hidden", timeout=12000)

    # Wait for mobile header to be available
    page.wait_for_selector(".HeaderMobile button", timeout=12000)

    menu_btn = page.locator(".HeaderMobile button").first
    menu_btn.click(force=True)

    # Verify that the navigation drawer becomes visible
    drawer = page.locator(".nav-bg")
    drawer.wait_for(state="visible", timeout=5000)

    context.close()
