import pytest
import os
import shutil
import subprocess
from pathlib import Path
from unittest.mock import patch, MagicMock

import sys
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "coalowl.com"))

import server

@patch("server.Path.exists")
@patch("server.Path.mkdir")
@patch("server.subprocess.run")
def test_existing_certs(mock_subprocess_run, mock_mkdir, mock_exists):
    """Test that generation is skipped if certificates already exist."""
    # Ensure exists() always returns True (for both CERT_FILE and KEY_FILE)
    mock_exists.return_value = True

    server.ensure_ssl_certificates()

    mock_mkdir.assert_not_called()
    mock_subprocess_run.assert_not_called()

@patch("server.Path.exists")
@patch("server.Path.mkdir")
@patch("server.subprocess.run")
@patch("server.shutil.which")
def test_generate_certs_primary(mock_which, mock_subprocess_run, mock_mkdir, mock_exists):
    """Test primary certificate generation logic when certs do not exist."""
    # Certificates don't exist
    mock_exists.return_value = False

    # Mock OpenSSL path
    mock_which.return_value = "/mock/bin/openssl"

    server.ensure_ssl_certificates()

    # Check that mkdir was called
    mock_mkdir.assert_called_once_with(parents=True, exist_ok=True)

    # Check that subprocess.run was called once for primary generation
    mock_subprocess_run.assert_called_once()

    cmd = mock_subprocess_run.call_args[0][0]
    # Check the actual arguments
    assert cmd[0] == "/mock/bin/openssl"
    assert "req" in cmd
    assert "-x509" in cmd
    assert "-addext" in cmd
    assert "subjectAltName=DNS:localhost,IP:127.0.0.1,IP:::1" in cmd


@patch("server.Path.exists")
@patch("server.Path.mkdir")
@patch("server.subprocess.run")
@patch("server.shutil.which")
def test_generate_certs_fallback(mock_which, mock_subprocess_run, mock_mkdir, mock_exists):
    """Test fallback certificate generation logic when primary generation fails."""
    # Certificates don't exist
    mock_exists.return_value = False

    # Mock OpenSSL path
    mock_which.return_value = "/mock/bin/openssl"

    # Fail first call (primary generation), succeed second (fallback)
    mock_subprocess_run.side_effect = [Exception("OpenSSL error"), MagicMock()]

    server.ensure_ssl_certificates()

    # Check that mkdir was called
    mock_mkdir.assert_called_once_with(parents=True, exist_ok=True)

    # Check that subprocess.run was called twice
    assert mock_subprocess_run.call_count == 2

    cmd_fallback = mock_subprocess_run.call_args_list[1][0][0]

    # Check the fallback arguments
    assert cmd_fallback[0] == "/mock/bin/openssl"
    assert "req" in cmd_fallback
    assert "-x509" in cmd_fallback
    assert "-addext" not in cmd_fallback
