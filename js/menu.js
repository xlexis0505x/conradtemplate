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
  const panel = document.getElementById('menu-panel');
  const backdrop = document.getElementById('menu-backdrop');

  if (panel && backdrop) {
    panel.classList.toggle('is-active');
    backdrop.classList.toggle('is-active');
  }
};

/**
 * Handles clicks on individual items inside the menu.
 * Displays relevant section modals or prompts.
 *
 * @param {'abstract' | 'science' | 'business' | 'video' | 'download'} type - Section identifier
 */
window.showSectionModal = function (type) {
  if (window.openPitchPage) {
    window.openPitchPage(type);
  }
};

/**
 * Keyboard Shortcut:
 * Pressing the Escape key automatically closes the menu if currently open.
 */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const panel = document.getElementById('menu-panel');
    const backdrop = document.getElementById('menu-backdrop');
    if (panel && panel.classList.contains('is-active')) {
      panel.classList.remove('is-active');
      backdrop.classList.remove('is-active');
    }
  }
});

