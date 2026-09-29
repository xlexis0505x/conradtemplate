/* ============================================================
   pitch-deck.js — Alias to menu.js for backward compatibility
   ============================================================ */

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

window.toggleP5RDeck = window.toggleMenu;

window.showSectionModal = function (type) {
  if (window.openPitchPage) {
    window.openPitchPage(type);
  }
};

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
