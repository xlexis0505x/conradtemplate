/* ============================================================
   pitch-dossier.js — Pitch Deck Pages Motion & Route Controller
   Conrad Challenge 2026 // Terracotta Editorial Theme
   ============================================================ */

(function () {
  const SECTIONS = [
    { id: 'abstract', slug: '01', num: '01', title: 'Executive Abstract & Problem', shortTitle: '01 ABSTRACT' },
    { id: 'science',  slug: '02', num: '02', title: 'Core Science & Propulsion',     shortTitle: '02 PROPULSION' },
    { id: 'business', slug: '03', num: '03', title: 'Business Model & Unit BOM',     shortTitle: '03 ECONOMICS' },
    { id: 'video',    slug: '04', num: '04', title: '3-Minute Pitch Video',          shortTitle: '04 VIDEO' },
    { id: 'download', slug: '05', num: '05', title: 'Executive Brief & Patent',      shortTitle: '05 PATENT' }
  ];

  let currentSectionIdx = 0;
  let isDossierOpen = false;
  let waveAnimId = null;
  let isTransitioning = false;
  let currentTL = null;

  function getGSAP() {
    if (typeof window.gsap !== 'undefined') return window.gsap;
    if (window.$nuxt && window.$nuxt.$gsap) return window.$nuxt.$gsap;
    return null;
  }

  function getSectionIndex(val) {
    if (typeof val === 'number') return Math.max(0, Math.min(SECTIONS.length - 1, val - 1));
    const s = String(val).toLowerCase().replace('/pitch/', '').replace('/', '').trim();
    const idx = SECTIONS.findIndex(sec => sec.id === s || sec.slug === s || sec.num === s);
    return idx !== -1 ? idx : 0;
  }

  /**
   * Opens the full-screen pitch deck dossier at the given section.
   * Smoothly slides in the dossier sheet from below,
   * tucks away the slide-out menu (if active), and staggers section content.
   */
  window.openPitchPage = function (sectionKey) {
    const idx = getSectionIndex(sectionKey);
    const dossier = document.getElementById('pitch-dossier');
    if (!dossier) return;
    const gsap = getGSAP();

    if (currentTL) {
      currentTL.kill();
      currentTL = null;
    }

    // 1. Close slide-out menu smoothly if active
    const menuPanel = document.getElementById('menu-panel');
    const menuBackdrop = document.getElementById('menu-backdrop');
    if (menuPanel && menuPanel.classList.contains('is-active')) {
      menuPanel.classList.remove('is-active');
      if (menuBackdrop) menuBackdrop.classList.remove('is-active');
    }

    const targetSection = SECTIONS[idx];
    const targetSlug = targetSection.slug;

    // Push URL state without reloading
    if (window.location.pathname !== '/pitch/' + targetSlug) {
      window.history.pushState({ pitchSection: targetSlug }, '', '/pitch/' + targetSlug);
    }

    // --- CASE A: Opening dossier from main page ---
    if (!isDossierOpen) {
      isDossierOpen = true;
      isTransitioning = true;
      currentSectionIdx = idx;

      // Show dossier and activate target pane
      dossier.style.display = 'block';
      dossier.classList.add('is-active');
      dossier.scrollTop = 0;

      const panes = document.querySelectorAll('.pitch-section-pane');
      panes.forEach((p, i) => {
        if (i === idx) {
          p.style.display = 'block';
          p.classList.add('is-active');
        } else {
          p.style.display = 'none';
          p.classList.remove('is-active');
        }
      });

      updateTabStates(idx);
      updateNavButtons(idx);

      if (gsap) {
        const tl = gsap.timeline({
          onComplete: () => {
            isTransitioning = false;
            currentTL = null;
            const activePane = panes[idx];
            if (activePane) {
              gsap.set(activePane.querySelectorAll('*'), { clearProps: 'transform,opacity' });
            }
          }
        });
        currentTL = tl;

        // Sheet drops up from below (vertical sheet slide)
        tl.fromTo(dossier,
          { y: '100vh', opacity: 1 },
          { y: '0vh', opacity: 1, duration: 0.52, ease: 'power3.out' }
        );

        // Header and bottom bar slide into place
        tl.fromTo('.pitch-top-bar',
          { y: -64, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.42, ease: 'power2.out' },
          '-=0.32'
        );
        tl.fromTo('.pitch-bottom-bar',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.42, ease: 'power2.out' },
          '-=0.38'
        );

        // Active pane content elements stagger entrance
        const activePane = panes[idx];
        if (activePane) {
          const headerEls = activePane.querySelectorAll('.pitch-badge, .pitch-title, .pitch-lead');
          const contentCards = activePane.querySelectorAll('.pitch-card, .pitch-table-wrap, .pitch-player-box, .pitch-download-card, .pitch-grid-3col > *, .pitch-grid-2col > *, .pitch-grid-4col > *');

          tl.fromTo(headerEls,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.42, stagger: 0.04, ease: 'power2.out' },
            '-=0.28'
          );
          tl.fromTo(contentCards,
            { y: 40, opacity: 0, scale: 0.98 },
            { y: 0, opacity: 1, scale: 1, duration: 0.46, stagger: 0.04, ease: 'power3.out' },
            '-=0.32'
          );
        }
      } else {
        isTransitioning = false;
      }

      if (idx === 3) initWaveAnimation();
      return;
    }

    // --- CASE B: Switching between pitch deck pages while already open ---
    if (idx !== currentSectionIdx) {
      switchSection(currentSectionIdx, idx);
    }
  };

  /**
   * Smooth directional transition between two pitch sections.
   * Forward: outgoing slides up & fades; incoming slides up from bottom with staggered elements.
   * Backward: outgoing slides down & fades; incoming slides down from top.
   * Chained in a single coordinated GSAP timeline via tl.call() to prevent any visual snapping.
   */
  function switchSection(fromIdx, toIdx) {
    const gsap = getGSAP();
    const dossier = document.getElementById('pitch-dossier');
    if (!dossier) return;

    const panes = document.querySelectorAll('.pitch-section-pane');
    const oldPane = panes[fromIdx];
    const newPane = panes[toIdx];
    if (!oldPane || !newPane) return;

    if (currentTL) {
      currentTL.kill();
      currentTL = null;
    }

    isTransitioning = true;
    currentSectionIdx = toIdx;

    updateTabStates(toIdx);
    updateNavButtons(toIdx);

    const dir = toIdx > fromIdx ? 1 : -1; // 1 = forward (slide up), -1 = backward (slide down)

    if (gsap) {
      const tl = gsap.timeline({
        onComplete: () => {
          isTransitioning = false;
          currentTL = null;
          // Clear temporary inline styles from newPane and children
          gsap.set(newPane, { clearProps: 'transform,opacity' });
          gsap.set(newPane.querySelectorAll('*'), { clearProps: 'transform,opacity' });
        }
      });
      currentTL = tl;

      // 1. Animate outgoing pane cleanly out
      tl.to(oldPane, {
        y: -30 * dir,
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in'
      }, 0);

      // 2. Coordinated midpoint swap
      tl.call(() => {
        oldPane.style.display = 'none';
        oldPane.classList.remove('is-active');
        gsap.set(oldPane, { clearProps: 'all' });
        gsap.set(oldPane.querySelectorAll('*'), { clearProps: 'transform,opacity' });

        newPane.style.display = 'block';
        newPane.classList.add('is-active');
        dossier.scrollTop = 0;

        if (toIdx === 3) initWaveAnimation();
        else stopWaveAnimation();
      });

      // 3. Animate incoming pane container and staggered children in
      const newHeaderEls = newPane.querySelectorAll('.pitch-badge, .pitch-title, .pitch-lead');
      const newCards = newPane.querySelectorAll('.pitch-card, .pitch-table-wrap, .pitch-player-box, .pitch-download-card, .pitch-grid-3col > *, .pitch-grid-2col > *, .pitch-grid-4col > *');

      tl.fromTo(newPane,
        { y: 35 * dir, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.34, ease: 'power2.out' }
      );

      tl.fromTo(newHeaderEls,
        { y: 24 * dir, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.38, stagger: 0.035, ease: 'power2.out' },
        '-=0.28'
      );

      tl.fromTo(newCards,
        { y: 36 * dir, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.42, stagger: 0.035, ease: 'power3.out' },
        '-=0.32'
      );

      // Animate bottom buttons subtle transition
      tl.fromTo(['#pitch-nav-prev', '#pitch-nav-next'],
        { opacity: 0.3, y: 6 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        '-=0.3'
      );

    } else {
      // Fallback
      oldPane.style.display = 'none';
      oldPane.classList.remove('is-active');
      newPane.style.display = 'block';
      newPane.classList.add('is-active');
      dossier.scrollTop = 0;
      isTransitioning = false;
      if (toIdx === 3) initWaveAnimation();
      else stopWaveAnimation();
    }
  }

  /**
   * Smoothly closes the pitch deck dossier and returns to the main page.
   * The entire dossier sheet slides DOWN off the viewport (y: 100vh),
   * simultaneously revealing the main page and smoothly settling the home page elements.
   */
  window.closePitchPage = function () {
    const dossier = document.getElementById('pitch-dossier');
    if (!dossier || !isDossierOpen) return;

    const gsap = getGSAP();
    if (currentTL) {
      currentTL.kill();
      currentTL = null;
    }

    isDossierOpen = false;
    isTransitioning = true;
    stopWaveAnimation();

    if (gsap) {
      const tl = gsap.timeline({
        onComplete: () => {
          dossier.classList.remove('is-active');
          dossier.style.display = 'none';
          isTransitioning = false;
          currentTL = null;
          // Clear all props
          gsap.set(dossier, { clearProps: 'all' });
          gsap.set('.pitch-top-bar', { clearProps: 'all' });
          gsap.set('.pitch-bottom-bar', { clearProps: 'all' });
          document.querySelectorAll('.pitch-section-pane').forEach(p => {
            gsap.set(p, { clearProps: 'all' });
            gsap.set(p.querySelectorAll('*'), { clearProps: 'transform,opacity' });
          });
        }
      });
      currentTL = tl;

      // 1. Top bar slides up
      tl.to('.pitch-top-bar', { y: -64, opacity: 0, duration: 0.28, ease: 'power2.in' }, 0);

      // 2. Bottom bar fades down
      tl.to('.pitch-bottom-bar', { y: 20, opacity: 0, duration: 0.24, ease: 'power2.in' }, 0);

      // 3. Slide active pane content downward slightly
      const activePane = document.querySelector('.pitch-section-pane.is-active');
      if (activePane) {
        const paneChildren = activePane.querySelectorAll('.pitch-card, .pitch-table-wrap, .pitch-player-box, .pitch-download-card, .pitch-lead, .pitch-title, .pitch-badge');
        tl.to(paneChildren, {
          y: 35,
          opacity: 0,
          duration: 0.24,
          stagger: 0.015,
          ease: 'power2.in'
        }, 0);
      }

      // 4. The entire dossier sheet slides DOWN off the viewport
      tl.to(dossier, {
        y: '100vh',
        duration: 0.48,
        ease: 'power3.in'
      }, 0.05);

      // 5. Main page elements underneath gently settle into position
      const mainHeader = document.querySelector('.header');
      const mainInfo = document.querySelector('.infomation');
      const mainFooter = document.querySelector('.footer');
      const mainThumbFloat = document.querySelector('.thumbnail__float');

      if (mainHeader) {
        gsap.fromTo(mainHeader,
          { y: -16, opacity: 0.6 },
          { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', delay: 0.12 }
        );
      }
      if (mainInfo) {
        gsap.fromTo(mainInfo,
          { y: 24, opacity: 0.6 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.15 }
        );
      }
      if (mainThumbFloat) {
        gsap.fromTo(mainThumbFloat,
          { rotate: '8deg', scale: 0.97 },
          { rotate: '10deg', scale: 1, duration: 0.55, ease: 'power2.out', delay: 0.12 }
        );
      }
      if (mainFooter) {
        gsap.fromTo(mainFooter,
          { opacity: 0.4 },
          { opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.18 }
        );
      }

    } else {
      dossier.classList.remove('is-active');
      dossier.style.display = 'none';
      isTransitioning = false;
    }

    if (window.location.pathname.startsWith('/pitch')) {
      window.history.pushState(null, '', '/');
    }
  };

  function updateTabStates(idx) {
    const gsap = getGSAP();
    document.querySelectorAll('.pitch-tab-btn').forEach((btn, i) => {
      if (i === idx) {
        btn.classList.add('is-active');
        if (gsap) {
          gsap.fromTo(btn, { scale: 0.94 }, { scale: 1, duration: 0.25, ease: 'power2.out' });
        }
      } else {
        btn.classList.remove('is-active');
      }
    });
  }

  function updateNavButtons(idx) {
    const prevBtn = document.getElementById('pitch-nav-prev');
    const nextBtn = document.getElementById('pitch-nav-next');

    if (prevBtn) {
      if (idx > 0) {
        prevBtn.classList.remove('is-disabled');
        prevBtn.innerHTML = `&larr; [${SECTIONS[idx - 1].num}] ${SECTIONS[idx - 1].shortTitle}`;
        prevBtn.onclick = () => window.openPitchPage(idx);
      } else {
        prevBtn.classList.add('is-disabled');
        prevBtn.innerHTML = `&larr; START OF DOSSIER`;
        prevBtn.onclick = null;
      }
    }

    if (nextBtn) {
      if (idx < SECTIONS.length - 1) {
        nextBtn.innerHTML = `[${SECTIONS[idx + 1].num}] ${SECTIONS[idx + 1].shortTitle} &rarr;`;
        nextBtn.onclick = () => window.openPitchPage(idx + 2);
      } else {
        nextBtn.innerHTML = `[01] RETURN TO START &rarr;`;
        nextBtn.onclick = () => window.openPitchPage(1);
      }
    }
  }

  // --- Oscilloscope wave animation for section 04 ---
  function initWaveAnimation() {
    const canvas = document.getElementById('pitch-wave-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    function resize() {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cy = h / 2;

      // Primary terracotta wave
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#C85A32';
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const angle = (x / w) * Math.PI * 8 + phase;
        const envelope = Math.sin((x / w) * Math.PI);
        const y = cy + Math.sin(angle) * 35 * envelope + Math.cos(angle * 2.3) * 15 * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Ghost secondary wave
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const angle = (x / w) * Math.PI * 5 - phase * 0.7;
        const envelope = Math.sin((x / w) * Math.PI);
        const y = cy + Math.sin(angle) * 20 * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.05;
      waveAnimId = requestAnimationFrame(draw);
    }

    stopWaveAnimation();
    draw();
  }

  function stopWaveAnimation() {
    if (waveAnimId) {
      cancelAnimationFrame(waveAnimId);
      waveAnimId = null;
    }
  }

  // Alias for backward compatibility
  window.showSectionModal = function (type) {
    window.openPitchPage(type);
  };

  // Browser Popstate Support
  window.addEventListener('popstate', function () {
    if (window.location.pathname.startsWith('/pitch')) {
      const slug = window.location.pathname.replace('/pitch/', '');
      window.openPitchPage(slug || '01');
    } else if (isDossierOpen) {
      window.closePitchPage();
    }
  });

  // ESC key to close dossier
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (isDossierOpen) {
        window.closePitchPage();
      }
    }
  });

  // Auto-open on direct URL load
  document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.startsWith('/pitch')) {
      const slug = window.location.pathname.replace('/pitch/', '').replace('/', '');
      window.openPitchPage(slug || '01');
    }
  });

  // Video chapter seeking helper
  window.seekPitchVideo = function (timeStr, progressPct, el) {
    const timeEl = document.getElementById('pitch-player-time');
    const fillEl = document.getElementById('pitch-scrub-fill');
    if (timeEl) timeEl.innerText = `${timeStr} / 03:00`;
    if (fillEl) fillEl.style.width = `${progressPct}%`;
    document.querySelectorAll('.pitch-chapter-card').forEach(c => c.classList.remove('is-active'));
    if (el) el.classList.add('is-active');
  };

  // Simulated PDF download helper
  window.downloadExecutivePDF = function () {
    const btn = document.getElementById('pitch-pdf-btn');
    if (btn) {
      const origText = btn.innerText;
      btn.innerText = 'VERIFYING SIGNATURE...';
      btn.style.background = '#C85A32';
      setTimeout(() => {
        btn.innerText = 'DOWNLOADING (4.2 MB)...';
        setTimeout(() => {
          btn.innerText = 'DOWNLOAD COMPLETE [✓]';
          setTimeout(() => {
            btn.innerText = origText;
            btn.style.background = '';
          }, 3000);
        }, 800);
      }, 600);
    }
  };
})();
