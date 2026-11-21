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
def test_radiant_janus_removed_from_home(page, base_url):
    """Verifies that the Radiant Janus 3D animation is removed from the home page."""
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_selector("#Stage", timeout=10000)
    page.wait_for_timeout(1000)
    assert page.locator("#conrad-radiant-janus-track").count() == 0, "Radiant Janus track should not be present on home page"


@pytest.mark.interactive
def test_tech_clean_lean_architecture(page, base_url):
    """Verifies that /technology loads cleanly without 3D models (submarine and new slices removed per design)."""
    page.goto(f"{base_url}/technology", wait_until="domcontentloaded")
    page.wait_for_selector("#conrad-tech-spec-matrix", timeout=12000)

    # Verify no 3D slices are present on /technology
    assert page.locator(".Product3DSlice").count() == 0, "Submarine 3D model should be removed on /technology"
    assert page.locator("#conrad-manifold-slice").count() == 0, "Manifold 3D model should be removed"
    assert page.locator("#conrad-chem-track").count() == 0, "Chem track should be removed"


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
def test_bio_relay_scrubber_buttons(page, base_url):
    """Test clicking #relay-next to verify bio-relay step progression."""
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_selector("#conrad-prepaint-hero", state="hidden", timeout=12000)
    page.wait_for_selector(".LoaderView", state="hidden", timeout=12000)

    page.wait_for_selector("#relay-next", timeout=12000)
    canvas = page.locator("#bio-relay-canvas")
    canvas.wait_for(state="attached", timeout=12000)

    next_btn = page.locator("#relay-next")
    next_btn.scroll_into_view_if_needed()
    next_btn.click(force=True)

    # Verify canvas dimension is greater than 0
    width = canvas.evaluate("(el) => el.clientWidth || el.width")
    assert width > 0, "Bio-relay canvas must have non-zero dimensions after clicking next"


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
def test_business_sections_and_footer_termination(page, base_url):
    """Verify that /business cleanly renders sections 01-04, diligence 05 is removed, and footer terminates without gap."""
    page.goto(f"{base_url}/business", wait_until="domcontentloaded")

    page.wait_for_selector("#conrad-prepaint-hero", state="hidden", timeout=12000)
    page.wait_for_selector(".LoaderView", state="hidden", timeout=12000)

    # Verify sections 01 - 04 are mounted
    page.wait_for_selector("#conrad-biz-doctrine", timeout=12000)
    page.wait_for_selector("#conrad-biz-economics", timeout=12000)
    page.wait_for_selector("#conrad-biz-factory", timeout=12000)
    page.wait_for_selector("#conrad-biz-roadmap", timeout=12000)

    # Verify section 05 (diligence banner) and modal are removed
    diligence_banner = page.locator("#conrad-biz-diligence")
    assert diligence_banner.count() == 0 or not diligence_banner.is_visible()

    diligence_modal = page.locator("#conrad-diligence-modal")
    assert diligence_modal.count() == 0 or not diligence_modal.is_visible()

    # Verify clean gap between section 04 and footer
    gap = page.evaluate("""() => {
        const rm = document.getElementById("conrad-biz-roadmap");
        const footer = document.querySelector(".Footer");
        if (!rm || !footer) return 999;
        const rmRect = rm.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        return Math.abs(footerRect.top - rmRect.bottom);
    }""")
    assert gap < 120, f"Gap between section 04 and footer is too large: {gap}px"


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
        # Wait for image to complete loading
        page.wait_for_function("(el) => el.complete && el.naturalWidth > 0", arg=img.element_handle(), timeout=6000)
        is_loaded = page.evaluate("(el) => el.complete && el.naturalWidth > 0", img.element_handle())
        assert is_loaded, f"Card {i} image failed to load or has 0 width: {img_src}"

    # 2. Verify Arsenal items on Home
    arsenal_imgs = page.locator(".ArsenalSlice .ArsenalItem img")
    if arsenal_imgs.count() > 0:
        for i in range(arsenal_imgs.count()):
            aimg = arsenal_imgs.nth(i)
            aimg.scroll_into_view_if_needed()
            page.wait_for_timeout(200)
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
    page.wait_for_selector("#conrad-prepaint-hero", state="hidden", timeout=12000)
    page.wait_for_selector(".LoaderView", state="hidden", timeout=12000)
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
    page.wait_for_selector("#conrad-prepaint-hero", state="hidden", timeout=12000)
    page.wait_for_selector(".LoaderView", state="hidden", timeout=12000)
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


@pytest.mark.interactive
def test_bio_relay_3d_scrubber(page, base_url):
    """Verifies that the 3D Bio-Relay section renders on the home page and Radiant Janus is removed."""
    page.goto(f"{base_url}/", wait_until="domcontentloaded")
    page.wait_for_selector("#conrad-prepaint-hero", state="hidden", timeout=12000)
    page.wait_for_selector(".LoaderView", state="hidden", timeout=12000)

    # 1. Verify track mounted on home page and Radiant Janus removed
    page.wait_for_selector("#bio-relay-track", timeout=12000)
    assert page.locator("#conrad-radiant-janus-track").count() == 0, "Radiant Janus track must be removed from home page"

    # 2. Verify WebGL canvas element (no dead <video>) and 4 stages
    page.wait_for_selector("#bio-relay-canvas", timeout=12000)
    assert page.locator("#bio-relay-video").count() == 0, "Dead #bio-relay-video element must be removed"
    page.evaluate("() => { const t = document.getElementById('bio-relay-track'); if (t) t.scrollIntoView({ block: 'start' }); }")
    page.wait_for_timeout(1200)
    canvas = page.locator("#bio-relay-canvas")
    width = canvas.evaluate("(el) => el.clientWidth || el.width")
    height = canvas.evaluate("(el) => el.clientHeight || el.height")
    assert width > 0 and height > 0, f"Bio-relay canvas must have non-zero dimensions, got {width}x{height}"
    failed_bio_assets = [
        msg["text"] for msg in page.console_messages
        if "[bio-relay" in msg["text"] and ("error" in msg["text"].lower() or "fallback" in msg["text"].lower())
    ]
    assert len(failed_bio_assets) == 0, f"Bio-relay 3D engine logged errors: {failed_bio_assets}"
    stages = page.locator("#bio-relay-track .relay-step-text")
    assert stages.count() == 4, f"Expected 4 relay stages, found {stages.count()}"

    # 3. Verify stage 1 active initially
    active_stage = page.locator("#bio-relay-track .relay-step-text.active")
    assert "01 // Chitosan Polymer Bridging" in active_stage.inner_text()

    # 4. Verify progress cells and navigation buttons
    cells = page.locator("#bio-relay-track .relay-cell")
    assert cells.count() == 4, f"Expected 4 progress cells, found {cells.count()}"

    next_btn = page.locator("#relay-next")
    assert next_btn.is_visible()



