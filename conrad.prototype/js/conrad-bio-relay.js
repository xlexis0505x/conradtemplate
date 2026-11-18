/**
 * Conrad Prototype — Bio-Relay Real-Time 3D WebGL Scrubber
 * Continuous 120 FPS Three.js Engine (BioRelayScene) + Editorial White Left Pillar
 *
 * Scientifically grounded 4-stage ternary bio-composite flocculation visualization:
 *   Stage 1: Chitosan polymer bridging & surface charge neutralisation of fine sediment
 *   Stage 2: Gelatinised plant-starch adsorption & proposed polymer bridging under flow
 *   Stage 3: Fine-grained bentonite clay lamellae incorporation into the floc matrix
 *   Stage 4: Seabed settling & sediment deposit stability under controlled flow
 */

(function () {
  'use strict';

  /* ─── Constants ──────────────────────────────────────────────── */
  var NUM_STAGES   = 4;
  var TRACK_ID     = 'bio-relay-track';
  var STICKY_ID    = 'bio-relay-sticky';
  var CANVAS_ID    = 'bio-relay-canvas';

  /* Stage descriptions — English across both Global and China editions */
  var STAGE_DATA_EN = [
    {
      num:     '01',
      heading: 'Chitosan Polymer Bridging & Charge Neutralisation',
      desc:    'Released directly from the mining crawler into disturbed sediment, chitosan ([X mg/L]; 0–3 mg/L test range) binds fine particles via amino-group charge neutralisation and bridges suspended silt into larger flocs in 35 ppt seawater.',
      tags:    ['Chitosan [X mg/L]', 'Fine Sediment Bridging']
    },
    {
      num:     '02',
      heading: 'Gelatinised Starch Floc Reinforcement',
      desc:    'Gelatinised plant-based starch ([Y mg/L]; 0–120 mg/L test range) adsorbs onto chitosan-bound flocs, chaining particles together to increase floc integrity and resistance to break-up under turbulent bottom flow.',
      tags:    ['Plant Starch [Y mg/L]', 'Floc Shear Reinforcement']
    },
    {
      num:     '03',
      heading: 'Bentonite Fine-Clay Incorporation',
      desc:    'Natural bentonite clay ([Z%] of dry sediment mass; 0–20% test range) integrates fine mineral lamellae into the floc matrix, expelling trapped pore water and increasing settling velocity from [D] to [E] mm/s ([F%] increase).',
      tags:    ['Bentonite [Z%] Mass', 'Settling [D] → [E] mm/s']
    },
    {
      num:     '04',
      heading: 'Seabed Settling & Deposit Stability',
      desc:    'Dense ternary flocs reduce residual turbidity by [A%] and suspended solids by [B%], cutting settling time from [G] to [H] min and leaving a compacted seabed deposit resistant to current-driven resuspension.',
      tags:    ['[A%] Lower Turbidity', 'Compacted Seabed Deposit']
    }
  ];

  function getActiveStageData() {
    return STAGE_DATA_EN;
  }

  function getMainTitle() {
    return 'Ternary Bio-Composite Kinetics';
  }

  /* ─── DOM Template Generator ─────────────────────────────────── */
  function buildTrackHTML() {
    var stageData = getActiveStageData();
    var mainTitle = getMainTitle();

    return [
      '<div id="' + TRACK_ID + '">',
      '  <section id="' + STICKY_ID + '">',
      '    <canvas id="' + CANVAS_ID + '" class="relay-canvas"></canvas>',
      '',
      '    <!-- Left Text Pillar (Pure Editorial Monochrome White Typography) -->',
      '    <div class="relay-hud-pillar">',
      '      <h2 class="hud-main-title">' + mainTitle + '</h2>',
      '',
      '      <div class="hud-step-container">',
      stageData.map(function (s, i) {
        var tagsHTML = s.tags.map(function(t) {
          return '<span class="hud-chem-tag">' + t + '</span>';
        }).join('');
        return [
          '        <div class="relay-step-text' + (i === 0 ? ' active' : '') + '" data-step="' + i + '">',
          '          <div class="relay-step-heading relay-line">' + s.num + ' // ' + s.heading + '</div>',
          '          <p class="relay-step-desc relay-line">' + s.desc + '</p>',
          '          <div class="hud-tag-row">' + tagsHTML + '</div>',
          '        </div>'
        ].join('\n');
      }).join('\n'),
      '      </div>',
      '',
      '      <!-- Monochrome White Scrubber Navigation -->',
      '      <div class="hud-scrubber-row">',
      '        <div class="relay-progress-container">',
      '          <div class="relay-arrow-indicator" id="relay-arrow">',
      '            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">',
      '              <polygon points="6,8 0,0 12,0" fill="#ffffff"/>',
      '            </svg>',
      '          </div>',
      '          <div class="relay-cells">',
      [0,1,2,3].map(function (i) {
        return '            <div class="relay-cell' + (i === 0 ? ' active' : '') + '" data-step="' + i + '"><div class="relay-cell-fill"></div></div>';
      }).join('\n'),
      '          </div>',
      '        </div>',
      '        <div class="relay-nav">',
      '          <button id="relay-prev" class="relay-btn" aria-label="Previous stage">&lt;</button>',
      '          <button id="relay-next" class="relay-btn" aria-label="Next stage">&gt;</button>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </section>',
      '</div>'
    ].join('\n');
  }

  /* ─── State ──────────────────────────────────────────────────── */
  var currentStep        = 0;
  var lastStep           = -1;
  var eventsBound        = false;
  var globalEventsBound  = false;
  var domCache           = {};
  var captionTimeline    = null;
  var bioRelayScene      = null;
  var sceneLoading       = false;
  var visibilityObserver = null;
  var trackVisible       = false;

  /* ─── Route Guard & Helpers ──────────────────────────────────── */
  function isHomeRoute() {
    if (window.Conrad && window.Conrad.route && typeof window.Conrad.route.isHome === 'function') {
      return window.Conrad.route.isHome();
    }
    if (typeof window.getAppPath === 'function') {
      return window.getAppPath() === '/';
    }
    var p = window.location.pathname.replace(/\/$/, '') || '/';
    if (p.startsWith('/cn')) p = p.substring(3).replace(/\/$/, '') || '/';
    if (p.startsWith('/conradtemplate')) p = p.substring(15).replace(/\/$/, '') || '/';
    return p === '/' || p === '/index.html' || p === '';
  }

  function isNodeValid(node) {
    return node && node.parentNode && document.contains(node);
  }

  /* ─── Arrow Translation (Aligned with Bolded Line) ───────────── */
  function getArrowX(stepIndex) {
    if (!domCache.progressContainer) {
      domCache.progressContainer = document.querySelector('#' + STICKY_ID + ' .relay-progress-container');
    }
    var container = domCache.progressContainer;
    if (!container) return 0;
    return ((stepIndex + 0.5) / NUM_STAGES) * container.clientWidth;
  }

  function updateArrow(step, isInitial) {
    if (!domCache.arrow) domCache.arrow = document.getElementById('relay-arrow');
    var arrow = domCache.arrow;
    if (!arrow) return;

    var targetX = getArrowX(step);
    if (window.gsap) {
      gsap.to(arrow, {
        x: targetX,
        duration: isInitial ? 0 : 0.45,
        ease: 'back.out(0.6)',
        overwrite: true
      });
    } else {
      arrow.style.transform = 'translate3d(' + targetX + 'px, 0, 0)';
    }
  }

  /* ─── Mount / Unmount Section ────────────────────────────────── */
  function ensureBioRelaySection() {
    var onHome = isHomeRoute();
    var track  = document.getElementById(TRACK_ID);

    if (!onHome) {
      if (visibilityObserver) {
        visibilityObserver.disconnect();
        visibilityObserver = null;
      }
      trackVisible = false;
      if (bioRelayScene) {
        try { bioRelayScene.dispose(); } catch (e) {}
        bioRelayScene = null;
      }
      sceneLoading = false;
      if (track) track.remove();
      domCache = {};
      eventsBound = false;
      lastStep = -1;
      return;
    }

    if (!isNodeValid(domCache.janusTrack)) {
      domCache.janusTrack = document.getElementById('conrad-radiant-janus-track');
    }
    var janusTrack = domCache.janusTrack;
    var mediaLink  = document.querySelector('.MediaLinkSlice');
    var arsenal    = document.querySelector('.ArsenalSlice');

    if (!janusTrack && !mediaLink && !arsenal) return;

    var newlyMounted = false;
    if (!track) {
      domCache = {};
      eventsBound = false;
      lastStep = -1;
      var w = document.createElement('div');
      w.innerHTML = buildTrackHTML();
      track = w.firstElementChild;

      if (janusTrack && janusTrack.nextSibling) {
        janusTrack.parentNode.insertBefore(track, janusTrack.nextSibling);
      } else if (janusTrack) {
        janusTrack.parentNode.appendChild(track);
      } else if (mediaLink) {
        mediaLink.parentNode.insertBefore(track, mediaLink);
      } else if (arsenal && arsenal.nextSibling) {
        arsenal.parentNode.insertBefore(track, arsenal.nextSibling);
      }
      newlyMounted = true;
    } else {
      if (janusTrack && track.previousElementSibling !== janusTrack) {
        if (janusTrack.nextSibling) {
          janusTrack.parentNode.insertBefore(track, janusTrack.nextSibling);
        } else {
          janusTrack.parentNode.appendChild(track);
        }
      }
    }

    var canvas = document.getElementById(CANVAS_ID);
    var initBioRelayScene = function () {
      if (!canvas || bioRelayScene || sceneLoading || !isHomeRoute() || !document.contains(canvas)) return;
      sceneLoading = true;
      var engineUrl = (window.qualifyAssetUrl ? window.qualifyAssetUrl('/bio-relay-engine.js?v=20261118b') : './bio-relay-engine.js?v=20261118b');
      import(engineUrl).then(function (mod) {
        if (!isHomeRoute() || !document.contains(canvas)) {
          sceneLoading = false;
          return;
        }
        bioRelayScene = new mod.BioRelayScene(canvas);
        bioRelayScene.setSize(window.innerWidth, window.innerHeight);
        if (!trackVisible) {
          bioRelayScene.setPaused(true);
        }
        sceneLoading = false;
        updateScroll();
      }).catch(function (err) {
        sceneLoading = false;
        console.error('[bio-relay 3D scene init error]', err);
      });
    };

    if (canvas && !visibilityObserver) {
      if ('IntersectionObserver' in window) {
        visibilityObserver = new IntersectionObserver(function (entries) {
          var entry = entries[0];
          if (!entry) return;
          trackVisible = entry.isIntersecting;
          if (trackVisible) {
            if (!bioRelayScene && !sceneLoading) {
              initBioRelayScene();
            } else if (bioRelayScene && typeof bioRelayScene.setPaused === 'function') {
              bioRelayScene.setPaused(false);
            }
          } else if (bioRelayScene && typeof bioRelayScene.setPaused === 'function') {
            bioRelayScene.setPaused(true);
          }
        }, { rootMargin: '400px 0px' });
        visibilityObserver.observe(track);
      } else {
        trackVisible = true;
        initBioRelayScene();
      }
    }

    bindEvents();
    updateScroll();

    if (newlyMounted && window.Global && Global.lenis) {
      Global.lenis.resize();
    }
  }

  /* ─── Scroll & Navigation Events ─────────────────────────────── */
  function bindEvents() {
    if (eventsBound) return;
    eventsBound = true;

    if (!domCache.prevBtn) domCache.prevBtn = document.getElementById('relay-prev');
    if (!domCache.nextBtn) domCache.nextBtn = document.getElementById('relay-next');
    var prevBtn = domCache.prevBtn;
    var nextBtn = domCache.nextBtn;
    if (prevBtn) prevBtn.addEventListener('click', function () { goToStep(currentStep - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goToStep(currentStep + 1); });

    /* Progress-cell click */
    var cells = document.querySelectorAll('#' + STICKY_ID + ' .relay-cell');
    cells.forEach(function (c) {
      c.addEventListener('click', function () {
        var s = parseInt(c.getAttribute('data-step'), 10);
        goToStep(s);
      });
    });

    if (!globalEventsBound) {
      globalEventsBound = true;

      /* LENIS SCROLL BINDING */
      if (window.Global && Global.lenis) {
        Global.lenis.on('scroll', updateScroll);
      } else {
        window.addEventListener('scroll', updateScroll, { passive: true });
      }

      /* Window resize: recalculate arrow targetX & WebGL viewport */
      window.addEventListener('resize', function () {
        domCache.progressContainer = null;
        if (bioRelayScene) {
          bioRelayScene.setSize(window.innerWidth, window.innerHeight);
        }
        updateArrow(currentStep, true);
      }, { passive: true });

      window.addEventListener('conrad-locationchange', ensureBioRelaySection);
      window.addEventListener('popstate', ensureBioRelaySection);
    }
  }

  function updateScroll() {
    var track = document.getElementById(TRACK_ID);
    if (!track) return;

    var rect = track.getBoundingClientRect();
    var windowH = window.innerHeight;
    var totalScroll = track.offsetHeight - windowH;
    if (totalScroll <= 0) return;

    var scrolled = -rect.top;
    var progress = Math.max(0, Math.min(1, scrolled / totalScroll));

    updateUI(progress);
  }

  function goToStep(targetStep) {
    var s = Math.max(0, Math.min(NUM_STAGES - 1, targetStep));
    var track = document.getElementById(TRACK_ID);
    if (!track) return;

    var targetP = (s + 0.5) / NUM_STAGES;
    var windowH = window.innerHeight;
    var totalScroll = track.offsetHeight - windowH;
    var trackTop = track.getBoundingClientRect().top + window.pageYOffset;
    var targetScrollTop = trackTop + targetP * totalScroll;

    if (window.Global && Global.lenis && typeof Global.lenis.scrollTo === 'function') {
      Global.lenis.scrollTo(targetScrollTop, { duration: 0.9 });
    } else {
      window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    }
  }

  /* ─── UI State & Progress Bar Updates ────────────────────────── */
  function updateUI(progress) {
    var p = progress;
    var t = Math.max(0, Math.min(NUM_STAGES, p * NUM_STAGES));
    var step = Math.min(NUM_STAGES - 1, Math.floor(t));

    currentStep = step;

    // Fractional progress in each stage cell
    var uArr = [0, 0, 0, 0];
    for (var i = 0; i < NUM_STAGES; i++) {
      uArr[i] = Math.max(0, Math.min(1, t - i));
    }

    if (bioRelayScene) {
      bioRelayScene.setProgress(p, uArr);
    }

    /* 1. Update cell fills & active states */
    if (!domCache.cells) {
      domCache.cells = document.querySelectorAll('#' + STICKY_ID + ' .relay-cell');
      domCache.cellFills = [];
      domCache.cells.forEach(function (c) {
        domCache.cellFills.push(c.querySelector('.relay-cell-fill'));
      });
    }

    domCache.cells.forEach(function (cell, i) {
      if (i === step) {
        cell.classList.add('active');
      } else {
        cell.classList.remove('active');
      }
      var fill = domCache.cellFills[i];
      if (fill) {
        fill.style.transform = 'scaleX(' + uArr[i].toFixed(4) + ')';
      }
    });

    /* 2. Step change trigger (Arrow Translation & Staggered Text Reveal) */
    if (step !== lastStep) {
      var isInitial = (lastStep === -1);
      lastStep = step;

      updateArrow(step, isInitial);

      if (!domCache.allStepTexts) {
        domCache.allStepTexts = document.querySelectorAll('#' + STICKY_ID + ' .relay-step-text');
        domCache.allStepLines = [];
        domCache.allStepTexts.forEach(function (el, idx) {
          domCache.allStepLines[idx] = el.querySelectorAll('.relay-line');
        });
      }
      var allStepTexts = domCache.allStepTexts;

      if (window.gsap) {
        if (captionTimeline) captionTimeline.kill();
        captionTimeline = gsap.timeline();

        allStepTexts.forEach(function (el, idx) {
          var lines = domCache.allStepLines[idx];
          if (idx === step) {
            el.classList.add('active');
            if (isInitial) {
              gsap.set(lines, { y: 0, opacity: 1 });
            } else {
              captionTimeline.fromTo(lines,
                { y: 12, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
                0.05
              );
            }
          } else {
            el.classList.remove('active');
            gsap.set(lines, { y: 12, opacity: 0 });
          }
        });
      } else {
        allStepTexts.forEach(function (el, idx) {
          if (idx === step) {
            el.classList.add('active');
          } else {
            el.classList.remove('active');
          }
        });
      }

      /* Nav buttons disabled state */
      if (!domCache.prevBtn) domCache.prevBtn = document.getElementById('relay-prev');
      if (!domCache.nextBtn) domCache.nextBtn = document.getElementById('relay-next');
      if (domCache.prevBtn) domCache.prevBtn.disabled = (step === 0);
      if (domCache.nextBtn) domCache.nextBtn.disabled = (step === NUM_STAGES - 1);
    }
  }

  /* ─── Polling Initializer & Lifecycle ─────────────────────────── */
  setInterval(ensureBioRelaySection, 250);

  if (window.Conrad && Conrad.onReady) {
    Conrad.onReady(ensureBioRelaySection);
  } else if (document.readyState === 'complete' || document.readyState === 'interactive') {
    ensureBioRelaySection();
  } else {
    window.addEventListener('DOMContentLoaded', ensureBioRelaySection);
    window.addEventListener('load', ensureBioRelaySection);
  }

})();
