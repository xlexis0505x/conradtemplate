/* ============================================================
   menu.js — Slide-Out Menu Controller
   
   Why this exists:
   Controls the interactive opening, closing, and action modal triggers
   for the top-right slide-out pitch menu.
   ============================================================ */

/**
 * Toggles the slide-out menu panel and backdrop scrim.
 * Called by clicking the "PITCH DECK" tactile buttons in the header/meta strip,
 * or by clicking the dark backdrop or the "[ESC / CLOSE]" button.
 */
window.toggleMenu = function () {
  const panel =
    document.getElementById('menu-panel') ||
    document.getElementById('p5r-corner');
  const backdrop =
    document.getElementById('menu-backdrop') ||
    document.getElementById('p5r-backdrop');

  if (panel && backdrop) {
    panel.classList.toggle('is-active');
    backdrop.classList.toggle('is-active');
  }
};

/**
 * Backwards compatibility alias for any existing click handlers
 */
window.toggleP5RDeck = window.toggleMenu;

/**
 * Handles clicks on individual items inside the menu.
 * Displays relevant section modals or prompts.
 *
 * @param {'abstract' | 'science' | 'business' | 'video' | 'download'} type - Section identifier
 */
window.showSectionModal = function (type) {
  if (type === 'download') {
    alert(
      'Downloading Executive Pitch Brief & Patent Claims (PDF)...\nSHA-256: 9f8e4a7b2c01d93e8842af5e710b37'
    );
  } else if (type === 'video') {
    alert(
      '3-Minute Pitch Video player initialized: [Playing Conrad Challenge 2026 Summit Pitch...]'
    );
  } else {
    alert('Opening section: ' + type);
  }
};

/**
 * Keyboard Shortcut:
 * Pressing the Escape key automatically closes the menu if currently open.
 */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const panel =
      document.getElementById('menu-panel') ||
      document.getElementById('p5r-corner');
    const backdrop =
      document.getElementById('menu-backdrop') ||
      document.getElementById('p5r-backdrop');
    if (panel && panel.classList.contains('is-active')) {
      panel.classList.remove('is-active');
      backdrop.classList.remove('is-active');
    }
  }
});
