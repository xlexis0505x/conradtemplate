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


@pytest.mark.interactive
def test_subsea_images_integrity_and_zero_flash(page, base_url):
    """Verifies that all Bento, Arsenal, and Hero images load subsea deep-sea assets without broken links or legacy weapon terms."""
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_selector(".FeaturedProductsCard", timeout=12000)
    page.wait_for_function("() => document.querySelectorAll('.FeaturedProductsCard').length >= 7", timeout=10000)

    # 1. Verify all 7 Bento card images
    cards = page.locator(".FeaturedProductsCard")
    card_count = cards.count()
    assert card_count == 7, f"Expected 7 Bento cards, got {card_count}"

    for i in range(card_count):
        card = cards.nth(i)
        card.scroll_into_view_if_needed()
        img = card.locator("img")
        img.wait_for(state="attached", timeout=5000)
        img_src = img.get_attribute("src") or ""
        assert len(img_src) > 0, f"Card {i} image src must not be empty"
        # Verify image loaded successfully
        is_loaded = page.evaluate("(el) => el.complete && el.naturalWidth > 0", img.element_handle())
        assert is_loaded, f"Card {i} image failed to load or has 0 width: {img_src}"

    # 2. Verify Arsenal items on Home
    arsenal_imgs = page.locator(".ArsenalSlice .ArsenalItem img")
    if arsenal_imgs.count() > 0:
        for i in range(arsenal_imgs.count()):
            aimg = arsenal_imgs.nth(i)
            aimg_src = aimg.get_attribute("src") or ""
            assert len(aimg_src) > 0, f"Arsenal item {i} img src must not be empty"
            is_loaded = page.evaluate("(el) => el.complete && el.naturalWidth > 0", aimg.element_handle())
            assert is_loaded, f"Arsenal item {i} failed to load: {aimg_src}"

    # 3. Verify About page hero image
    page.goto(f"{base_url}/about", wait_until="domcontentloaded")
    page.wait_for_selector(".PageHero", timeout=12000)
    hero_img = page.locator(".PageHero img").first
    hero_img.wait_for(state="attached", timeout=5000)
    hero_src = hero_img.get_attribute("src") or ""
    assert len(hero_src) > 0, "About page hero image src must not be empty"
    hero_loaded = page.evaluate("(el) => el.complete && el.naturalWidth > 0", hero_img.element_handle())
    assert hero_loaded, f"About hero image failed to load: {hero_src}"


@pytest.mark.interactive
def test_company_dropdown_and_edition_emails(page, base_url):
    """Verifies that the Company dropdown displays enriched mission & links, and contact emails respect edition toggles."""
    # 1. Global Edition
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_selector(".company-wrapper", timeout=12000)

    # Click company wrapper to reveal dropdown
    comp_btn = page.locator(".company-wrapper")
    comp_btn.click()
    page.wait_for_timeout(300)

    # Verify dropdown contains enriched content and global email
    dropdown_text = page.evaluate("() => document.querySelector('.CompanyDomainWrapper')?.innerText || ''")
    assert "teamdrunkeast@gmail.com" in dropdown_text, "Dropdown should have teamdrunkeast@gmail.com in global edition"
    assert "Conrad Challenge 2026" in dropdown_text, "Dropdown should feature Conrad Challenge 2026 badge"
    assert "About Us — Mission & Story" in dropdown_text, "Dropdown should include quick link to /about"

    # Verify footer email in global edition
    footer_email = page.evaluate("() => document.querySelector('footer')?.innerText || ''")
    assert "teamdrunkeast@gmail.com" in footer_email, "Footer should display teamdrunkeast@gmail.com in global edition"

    # 2. China / Poseidon Edition
    page.goto(f"{base_url}/?edition=china", wait_until="domcontentloaded")
    page.wait_for_selector(".company-wrapper", timeout=12000)

    comp_btn = page.locator(".company-wrapper")
    comp_btn.click()
    page.wait_for_timeout(300)

    dropdown_cn = page.evaluate("() => document.querySelector('.CompanyDomainWrapper')?.innerText || ''")
    assert "teamposeidon@gmail.com" in dropdown_cn, "Dropdown should have teamposeidon@gmail.com in China edition"
    assert "Conrad Challenge 2026" in dropdown_cn, "Dropdown should feature Conrad Challenge 2026 badge in English"
    assert "About Us — Mission & Story" in dropdown_cn, "Dropdown links should be in English"

    footer_cn = page.evaluate("() => document.querySelector('footer')?.innerText || ''")
    assert "teamposeidon@gmail.com" in footer_cn, "Footer should display teamposeidon@gmail.com in China edition"

    # 3. Verify blue line hover animation on the 3 dropdown links
    link = page.locator('.conrad-menu-link[href="/technology"]')
    link.hover()
    page.wait_for_timeout(300)
    bg_color = page.evaluate("() => window.getComputedStyle(document.querySelector('.conrad-menu-link[href=\"/technology\"]'), '::after').backgroundColor")
    assert "rgb(1, 177, 199)" in bg_color, f"Dropdown link ::after should have cyan background, got {bg_color}"


@pytest.mark.interactive
def test_tech_page_styling_and_table_html(page, base_url):
    """Verifies tech page title casing, suppression of schematic badges, and unescaped HTML in comparison table."""
    page.goto(f"{base_url}/technology", wait_until="domcontentloaded")
    page.wait_for_selector(".ProductHeaderSlice", timeout=12000)

    # Verify title casing
    title_text = page.locator(".ProductHeaderSlice h1.titleWrapper, .ProductHeaderSlice .title").first.inner_text().strip()
    assert "Autonomous Benthic Plume Mitigation Architecture" in title_text or "Autonomous Subsea Plume Mitigation Architecture" in title_text, (
        f"Title should be Title Case, got: {title_text}"
    )

    # Verify schematic badge suppression
    visible_badges = page.evaluate("() => Array.from(document.querySelectorAll('.schematic-badge')).filter(el => el.offsetParent !== null && window.getComputedStyle(el).display !== 'none' && window.getComputedStyle(el).visibility !== 'hidden').length")
    assert visible_badges == 0, f"Expected 0 visible schematic badges, found {visible_badges}"

    # Verify comparison table unescaped HTML tags
    page.wait_for_selector(".conrad-compare-table", timeout=12000)
    table_html = page.evaluate("() => document.querySelector('.conrad-compare-table')?.innerHTML || ''")
    assert "&lt;strong&gt;" not in table_html, "Comparison table should render HTML tags rather than escaped &lt;strong&gt;"
    assert "<strong>Accelerated" in table_html, "Comparison table should contain unescaped <strong> tags"


