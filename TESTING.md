# Testing Guide

This document explains how to test the prototypes using Pytest and Playwright.

## Prerequisites

Before running the tests, ensure you have the necessary dependencies installed:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install Playwright browser binaries
playwright install chromium
```

## Running Tests Locally

To run the test suite locally against the built-in development servers:

```bash
pytest tests/
```

This will run all tests, including unit tests, client-side routing tests, edition checks, and interactive DOM tests.

## Testing Live Staging

To run the tests against the live GitHub Pages deployments (or other live targets), use the `--target live` flag:

```bash
pytest --target live
```

*Note: Ensure your live target URL is properly configured in your test setup if required.*

## Artifacts and Screenshots

The testing suite may be configured to output screenshot artifacts upon test failure or as explicit verification steps (especially for visual regression or health checks).

Check the configured output directory (usually specified in `pytest.ini` or test configurations, such as `test-results/`) for screenshot artifact outputs.
