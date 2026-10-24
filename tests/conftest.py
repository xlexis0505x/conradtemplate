import os
import pytest
from playwright.sync_api import sync_playwright

DEFAULT_LOCAL_URL = "http://localhost:8087"
DEFAULT_LIVE_URL = "https://xlexis0505x.github.io/conradtemplate"
ARTIFACT_DIR = "/app/test-results"


def pytest_addoption(parser):
    parser.addoption(
        "--target",
        action="store",
        default="local",
        help="Target environment: 'local' (http://localhost:8087), 'live' (GitHub Pages), or a custom URL",
    )


@pytest.fixture(scope="session")
def base_url(request):
    target = request.config.getoption("--target")
    if target == "local":
        return DEFAULT_LOCAL_URL
    elif target == "live":
        return DEFAULT_LIVE_URL
    return target.rstrip("/")


@pytest.fixture(scope="session")
def playwright_instance():
    with sync_playwright() as p:
        yield p


@pytest.fixture(scope="session")
def browser(playwright_instance):
    browser = playwright_instance.chromium.launch(
        headless=True,
        args=["--disable-web-security", "--no-sandbox"]
    )
    yield browser
    browser.close()


@pytest.fixture(scope="function")
def page(browser, request):
    context = browser.new_context(
        viewport={"width": 1440, "height": 900},
        device_scale_factor=1,
    )
    page = context.new_page()

    console_messages = []
    failed_requests = []

    def on_console(msg):
        console_messages.append({"type": msg.type, "text": msg.text})

    def on_response(resp):
        if resp.status >= 400:
            failed_requests.append({"url": resp.url, "status": resp.status})

    page.on("console", on_console)
    page.on("response", on_response)

    # Attach tracking arrays for assertion in tests
    page.console_messages = console_messages
    page.failed_requests = failed_requests

    yield page

    # Save screenshot on failure if possible
    if hasattr(request.node, "rep_call") and request.node.rep_call.failed:
        os.makedirs(ARTIFACT_DIR, exist_ok=True)
        screenshot_path = os.path.join(ARTIFACT_DIR, f"fail_{request.node.name}.png")
        try:
            page.screenshot(path=screenshot_path)
            print(f"\n[Test Failed] Saved failure screenshot to {screenshot_path}")
        except Exception:
            pass

    context.close()


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    setattr(item, f"rep_{rep.when}", rep)
