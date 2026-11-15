/**
 * Conrad Prototype — Bio-Relay Cinema Flocculation Scrubber
 * Scroll-driven photorealistic canvas scrubber of the 4-stage
 * ternary bio-composite flocculation cascade:
 *   Stage 1: Chitosan salt-tolerant flocculation growth (charge collapse)
 *   Stage 2: Starch shear-resistant cohesion & rapid settling (organic marine snow flocs)
 *   Stage 3: Bentonite internal skeleton filling (seawater expulsion / syneresis)
 *   Stage 4: In-situ seabed solidification (intercalated armor crust & clean water)
 */

(function () {
  'use strict';

  /* ─── Constants ──────────────────────────────────────────────── */
  var NUM_STAGES   = 4;
  var TOTAL_FRAMES = 120;
  var TRACK_ID     = 'bio-relay-track';
  var STICKY_ID    = 'bio-relay-sticky';
  var CANVAS_ID    = 'bio-relay-canvas';

  /* Stage descriptions matching scientific documentation */
  var STAGE_DATA = [
    {
      pill:    'STAGE 01 // CHITOSAN INITIATOR',
      heading: '01 // Salt-Tolerant Flocculation Growth',
      desc:    'Pre-protonated chitosan (–NH₃⁺) carries multi-point electrostatic anchors. In high-salinity seawater (35 PSU), it overcomes double-layer charge shielding, lassooing dispersed 10–37 µm clay particles into visible macro-flocs within seconds.'
    },
    {
      pill:    'STAGE 02 // STARCH BINDER',
      heading: '02 // Shear-Resistant Cohesion & Rapid Settling',
      desc:    'Bio-starch weaves an intermolecular hydrogen-bonded 3D mesh across chitosan chains and clay platelets. This flexible molecular glue reinforces flocs against 600-bar turbulent discharge shear, preventing breakup and accelerating settling by 20×.'
    },
    {
      pill:    'STAGE 03 // BENTONITE BALLAST',
      heading: '03 // Internal Skeleton Filling & Expulsion',
      desc:    'High-density bentonite grains infiltrate the open interior pores of the descending floc like aggregate in concrete. The entering mineral ballast physically expels trapped seawater, raising effective aggregate density to 1.68 g/cm³ for a sub-30s seabed plunge.'
    },
    {
      pill:    'STAGE 04 // COMPOSITE SOLIDIFICATION',
      heading: '04 // In-Situ Seabed Interlocking & Crust',
      desc:    'On the seafloor, chitosan intercalates directly into the expandable interlayer spacing (d₀₀₁) of bentonite sheets. Weak mineral hydration and starch cross-links cure the deposit into a semi-rigid erosion-resistant crust that permanently resists bottom currents.'
    }
  ];

  /* ─── DOM Template ───────────────────────────────────────────── */
  var trackHTML = [
    '<div id="' + TRACK_ID + '">',
    '  <section id="' + STICKY_ID + '">',
    '    <canvas id="' + CANVAS_ID + '"></canvas>',
    '    <div class="relay-inner">',
    '      <div class="relay-head">',
    '        <div>',
    '          <div class="conrad-kicker">03 // ECO-FLOCCULATION RELAY</div>',
    '          <h2 class="relay-title">Ternary Bio-Composite Relay</h2>',
    '          <p class="relay-subtitle">Scroll through the four-stage chemical and hydrodynamic cascade that transforms suspended abyssal clay into an erosion-resistant seabed crust.</p>',
    '        </div>',
    '        <div class="relay-nav">',
    '          <button id="relay-prev" class="relay-btn" aria-label="Previous stage">&lt;</button>',
    '          <button id="relay-next" class="relay-btn" aria-label="Next stage">&gt;</button>',
    '        </div>',
    '      </div>',
    '      <div class="relay-stage-pill" id="relay-stage-pill">STAGE 01 // CHITOSAN INITIATOR</div>',
    '      <div class="relay-callouts" id="relay-callouts">',
    '        <!-- Stage 1 Callouts -->',
    '        <div class="relay-pin" id="pin-clay">',
    '          <div class="pin-marker"></div>',
    '          <div class="pin-card">',
    '            <div class="pin-tag">CLAY COLLOID PARTICLES (–)</div>',
    '            <div class="pin-desc">Suspended 10–37 µm mineral platelets held apart by repulsive electrical double layer</div>',
    '          </div>',
    '        </div>',
    '        <div class="relay-pin" id="pin-chitosan">',
    '          <div class="pin-marker"></div>',
    '          <div class="pin-card">',
    '            <div class="pin-tag">CHITOSAN –NH₃⁺ AMINE LASSO</div>',
    '            <div class="pin-desc">Cationic biopolymer weaves through fluid, bridging particles & neutralizing surface charge</div>',
    '          </div>',
    '        </div>',
    '        <!-- Stage 2 Callout -->',
    '        <div class="relay-pin" id="pin-starch">',
    '          <div class="pin-marker"></div>',
    '          <div class="pin-card">',
    '            <div class="pin-tag">BIO-STARCH HYDROGEL MATRIX</div>',
    '            <div class="pin-desc">Intermolecular hydrogen-bonded web reinforces flocs against 600-bar shear turbulence</div>',
    '          </div>',
    '        </div>',
    '        <!-- Stage 3 Callouts -->',
    '        <div class="relay-pin" id="pin-bentonite">',
    '          <div class="pin-marker"></div>',
    '          <div class="pin-card">',
    '            <div class="pin-tag">BENTONITE MINERAL BALLAST</div>',
    '            <div class="pin-desc">Dense crystal bipyramids (2.65 g/cm³) pack into pores like aggregate in concrete</div>',
    '          </div>',
    '        </div>',
    '        <div class="relay-pin" id="pin-water">',
    '          <div class="pin-marker"></div>',
    '          <div class="pin-card">',
    '            <div class="pin-tag">EXPELLED SEAWATER (SYNERESIS)</div>',
    '            <div class="pin-desc">Trapped pore fluid squeezed out → floc density jumps to 1.68 g/cm³</div>',
    '          </div>',
    '        </div>',
    '        <!-- Stage 4 Callouts -->',
    '        <div class="relay-pin" id="pin-crust">',
    '          <div class="pin-marker"></div>',
    '          <div class="pin-card">',
    '            <div class="pin-tag">IN-SITU INTERCALATED CRUST</div>',
    '            <div class="pin-desc">Consolidated d₀₀₁ armor layer cures on seabed, permanently resisting 0.15 m/s currents</div>',
    '          </div>',
    '        </div>',
    '        <div class="relay-pin" id="pin-clean">',
    '          <div class="pin-marker"></div>',
    '          <div class="pin-card">',
    '            <div class="pin-tag">CLARIFIED WATER COLUMN</div>',
    '            <div class="pin-desc">Suspended abyssal sediment cloud permanently cleared, restoring ocean clarity</div>',
    '          </div>',
    '        </div>',
    '      </div>',
    '      <div class="relay-captions">',
    STAGE_DATA.map(function (s, i) {
      return [
        '        <div class="relay-step-text' + (i === 0 ? ' active' : '') + '" data-step="' + i + '">',
        '          <div class="relay-step-heading relay-line">' + s.heading + '</div>',
        '          <p class="relay-step-desc relay-line">' + s.desc + '</p>',
        '        </div>'
      ].join('\n');
    }).join('\n'),
    '      </div>',
    '      <div class="relay-progress-container">',
    '        <div class="relay-arrow-indicator" id="relay-arrow">',
    '          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">',
    '            <polygon points="7,10 0,0 14,0" fill="#ffffff"/>',
    '          </svg>',
    '        </div>',
    '        <div class="relay-cells">',
    [0,1,2,3].map(function (i) {
      return '          <div class="relay-cell" data-step="' + i + '"><div class="relay-cell-fill"></div></div>';
    }).join('\n'),
    '        </div>',
    '      </div>',
    '    </div>',
    '  </section>',
    '</div>'
  ].join('\n');

  /* ─── State ──────────────────────────────────────────────────── */
  var currentStep     = 0;
  var lastStep        = -1;
  var eventsBound     = false;
  var domCache        = {};
  var captionTimeline = null;

  /* ─── Cinema Frame Scrubber (Sub-Frame Alpha Dissolve & Lenis Sync) ── */
  var frames = [];
  var currentFrameFloat = 1.0;
  var targetFrame = 1.0;
  var targetProgress = 0;
  var currentProgressFloat = 0;
  var canvas = null;
  var ctx = null;
  var scrubberInitialized = false;
  var isRendering = false;
  var rafId = null;

  function pad3(num) {
    return String(num).padStart(3, '0');
  }

  function getLoadedFrame(idx) {
    if (frames[idx]) return frames[idx];
    for (var offset = 1; offset < TOTAL_FRAMES; offset++) {
      if (frames[idx - offset]) return frames[idx - offset];
      if (frames[idx + offset]) return frames[idx + offset];
    }
    return null;
  }

  // Pre-decode frames off main thread using ImageBitmap to eliminate drawImage jank
  async function loadAndDecodeFrame(idx) {
    var url = 'assets/floc_frames/frame_' + pad3(idx) + '.webp';
    try {
      var res = await fetch(url);
      var blob = await res.blob();
      if (window.createImageBitmap) {
        var bitmap = await createImageBitmap(blob);
        frames[idx] = bitmap;
      } else {
        var img = new Image();
        img.src = URL.createObjectURL(blob);
        if (img.decode) await img.decode();
        frames[idx] = img;
      }
      var base = Math.floor(currentFrameFloat);
      if (idx === base || idx === base + 1) {
        drawSubframe(currentFrameFloat);
      }
    } catch (e) {
      // Fallback: standard Image
      var fallback = new Image();
      fallback.onload = function () {
        frames[idx] = fallback;
        var base = Math.floor(currentFrameFloat);
        if (idx === base || idx === base + 1) drawSubframe(currentFrameFloat);
      };
      fallback.src = url;
    }
  }

  function initScrubber(targetCanvas) {
    if (scrubberInitialized && canvas === targetCanvas) return;
    canvas = targetCanvas;
    if (!canvas) return;

    ctx = canvas.getContext('2d', { alpha: false });
    scrubberInitialized = true;

    function resizeCanvas() {
      if (!canvas) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      drawSubframe(currentFrameFloat);
    }
    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    // 1. Immediately prioritize and decode Frame 1
    loadAndDecodeFrame(1);

    // 2. Stream and pre-decode all remaining frames asynchronously
    for (var i = 2; i <= TOTAL_FRAMES; i++) {
      loadAndDecodeFrame(i);
    }

    // 3. Start silky smooth 60/120fps sub-frame alpha cross-dissolve loop
    startRafLoop();
  }

  /**
   * Continuous Sub-Frame Cross-Fading (Apple / Nike Standard)
   * Instead of snapping between integer frames, calculates the fractional
   * sub-frame delta (e.g. frame 42.4 -> base 42 at 1.0, next 43 at alpha 0.4).
   * Completely dissolves discrete frame stepping into smooth continuous motion.
   */
  function drawSubframe(frameFloat) {
    if (!canvas || !ctx) return;
    var clamped = Math.max(1, Math.min(TOTAL_FRAMES, frameFloat));
    var baseIdx = Math.floor(clamped);
    var nextIdx = Math.min(TOTAL_FRAMES, baseIdx + 1);
    var alpha   = clamped - baseIdx; // fractional delta: 0.0 to 1.0

    var imgBase = getLoadedFrame(baseIdx);
    if (!imgBase) return;

    var cw = canvas.width;
    var ch = canvas.height;
    var imgW = imgBase.width || imgBase.naturalWidth;
    var imgH = imgBase.height || imgBase.naturalHeight;
    if (!imgW || !imgH) return;

    var imgAspect = imgW / imgH;
    var canvasAspect = cw / ch;
    var renderW, renderH, x, y;

    if (canvasAspect > imgAspect) {
      renderH = ch;
      renderW = ch * imgAspect;
      x = (cw - renderW) / 2;
      y = 0;
    } else {
      renderW = cw;
      renderH = cw / imgAspect;
      x = 0;
      y = (ch - renderH) / 2;
    }

    // 1. Draw base frame at full opacity over seamless abyssal void
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#020407';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(imgBase, x, y, renderW, renderH);

    // 2. Sub-frame alpha cross-fade: smooth continuous blending
    if (alpha > 0.005 && nextIdx !== baseIdx) {
      var imgNext = getLoadedFrame(nextIdx);
      if (imgNext) {
        ctx.globalAlpha = alpha;
        ctx.drawImage(imgNext, x, y, renderW, renderH);
        ctx.globalAlpha = 1.0;
      }
    }
  }

  function startRafLoop() {
    if (isRendering) return;
    isRendering = true;

    function tick() {
      // 1. Double-damping removal: sync directly with Lenis smooth scroll ticks (coeff 0.32)
      var frameDiff = targetFrame - currentFrameFloat;
      if (Math.abs(frameDiff) > 0.002) {
        currentFrameFloat += frameDiff * 0.32;
        drawSubframe(currentFrameFloat);
      } else if (currentFrameFloat !== targetFrame) {
        currentFrameFloat = targetFrame;
        drawSubframe(currentFrameFloat);
      }

      // 2. Smooth lerp on callout pin transitions
      var pDiff = targetProgress - currentProgressFloat;
      if (Math.abs(pDiff) > 0.0005) {
        currentProgressFloat += pDiff * 0.32;
        updateCalloutPins(currentProgressFloat);
      } else if (currentProgressFloat !== targetProgress) {
        currentProgressFloat = targetProgress;
        updateCalloutPins(currentProgressFloat);
      }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
  }

  function updateScrubber(progress) {
    var p = Math.max(0, Math.min(1, progress));
    targetProgress = p;
    targetFrame = 1 + p * (TOTAL_FRAMES - 1);
  }

  function updateCalloutPins(progress) {
    var p = progress;

    function setPin(id, pStart, pEnd, leftPct, topPct, transform) {
      var el = document.getElementById(id);
      if (!el) return;
      var active = (p >= pStart && p <= pEnd);
      if (!active) {
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('pointer-events', 'none', 'important');
        return;
      }
      var fadeIn = Math.min(1, (p - pStart) / 0.03);
      var fadeOut = Math.min(1, (pEnd - p) / 0.03);
      var alpha = Math.max(0, Math.min(1, Math.min(fadeIn, fadeOut)));
      el.style.setProperty('left', leftPct, 'important');
      el.style.setProperty('top', topPct, 'important');
      el.style.setProperty('transform', transform || 'none', 'important');
      el.style.setProperty('opacity', alpha.toFixed(3), 'important');
      el.style.setProperty('pointer-events', 'none', 'important');
    }

    // Stage 1 Callouts (0.01 to 0.24)
    setPin('pin-clay', 0.01, 0.24, '26%', '36%', 'none');
    setPin('pin-chitosan', 0.01, 0.24, '65%', '58%', 'none');

    // Stage 2 Callout (0.26 to 0.49)
    setPin('pin-starch', 0.26, 0.49, '64%', '34%', 'none');

    // Stage 3 Callouts (0.51 to 0.74)
    setPin('pin-bentonite', 0.51, 0.74, '32%', '34%', 'none');
    setPin('pin-water', 0.51, 0.74, '68%', '22%', 'none');

    // Stage 4 Callouts (0.76 to 0.99)
    setPin('pin-crust', 0.76, 0.99, '50%', '68%', 'translateX(-50%)');
    setPin('pin-clean', 0.76, 0.99, '50%', '24%', 'translateX(-50%)');
  }

  /* ─── Route guard ────────────────────────────────────────────── */
  function isHomeRoute() {
    var p = (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, '')) || '/';
    return p === '' || p === '/' || p === '/index.html';
  }

  function isNodeValid(n) {
    if (!n) return false;
    return document.contains(n);
  }

  function getArrowX(stepIndex) {
    if (!domCache.progressContainer) {
      domCache.progressContainer = document.querySelector('#' + STICKY_ID + ' .relay-progress-container');
    }
    var container = domCache.progressContainer;
    if (!container) return 0;
    return ((stepIndex + 0.5) / NUM_STAGES) * container.clientWidth;
  }

  /* ─── Mount / unmount ────────────────────────────────────────── */
  function ensureBioRelaySection() {
    var onHome = isHomeRoute();
    var track  = document.getElementById(TRACK_ID);

    if (!onHome) {
      if (track) track.remove();
      domCache = {};
      eventsBound = false;
      lastStep = -1;
      scrubberInitialized = false;
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
      w.innerHTML = trackHTML;
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

    var targetCanvas = document.getElementById(CANVAS_ID);
    if (targetCanvas) {
      initScrubber(targetCanvas);
    }

    bindEvents();
    updateScroll();

    if (newlyMounted && window.Global && Global.lenis) {
      Global.lenis.resize();
    }
  }

  /* ─── Scroll → stage mapping ─────────────────────────────────── */
  function updateScroll() {
    if (!isHomeRoute()) return;

    if (!domCache.track) domCache.track = document.getElementById(TRACK_ID);
    var track = domCache.track;
    if (!track) return;

    var rect           = track.getBoundingClientRect();
    var trackHeight    = track.offsetHeight;
    var viewportHeight = window.innerHeight;
    var scrollable     = trackHeight - viewportHeight;
    if (scrollable <= 0) return;

    var scrolled = -rect.top;
    var progress = Math.max(0, Math.min(1, scrolled / scrollable));

    var c = NUM_STAGES;
    var t = Math.max(0, Math.min(c, progress * c));
    var step = Math.min(c - 1, Math.floor(t));
    currentStep = step;

    var uArr = [];
    for (var i = 0; i < c; i++) {
      uArr[i] = Math.max(0, Math.min(1, t - i));
    }

    /* 1. Update cell fills */
    if (!domCache.cells) {
      domCache.cells = document.querySelectorAll('#' + STICKY_ID + ' .relay-cell');
      domCache.cellFills = [];
      domCache.cells.forEach(function (cell, idx) {
        domCache.cellFills[idx] = cell.querySelector('.relay-cell-fill');
      });
    }
    var cells = domCache.cells;
    cells.forEach(function (cell, idx) {
      var cellFill = domCache.cellFills[idx];
      if (cellFill) {
        var scale = (idx === step) ? uArr[idx] : (idx < step ? 1 : 0);
        if (window.gsap) {
          gsap.set(cellFill, { scaleX: scale, transformOrigin: 'left center' });
        } else {
          cellFill.style.transform = 'scaleX(' + scale + ')';
        }
      }
    });

    /* 2. Step change trigger (arrow bounce, captions, HUD) */
    if (step !== lastStep) {
      var isInitial = (lastStep === -1);
      lastStep = step;

      if (!domCache.arrow) {
        domCache.arrow = document.getElementById('relay-arrow');
      }
      var arrow = domCache.arrow;
      if (arrow) {
        var targetX = getArrowX(step);
        if (window.gsap) {
          gsap.to(arrow, {
            x: targetX,
            duration: isInitial ? 0 : 0.45,
            ease: 'back.out(0.5)',
            overwrite: true
          });
        } else {
          arrow.style.transform = 'translate3d(' + targetX + 'px, 0, 0)';
        }
      }

      cells.forEach(function (cell, idx) {
        if (idx === step) {
          cell.classList.add('active');
        } else {
          cell.classList.remove('active');
        }
      });

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
                { y: 14, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
                0.1
              );
            }
          } else {
            el.classList.remove('active');
            gsap.set(lines, { y: 14, opacity: 0 });
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

      /* Stage Pill */
      if (!domCache.pill) domCache.pill = document.getElementById('relay-stage-pill');
      if (domCache.pill) {
        domCache.pill.textContent = STAGE_DATA[step].pill;
        domCache.pill.classList.add('visible');
      }

      /* Nav buttons disabled state */
      if (!domCache.prevBtn) domCache.prevBtn = document.getElementById('relay-prev');
      if (!domCache.nextBtn) domCache.nextBtn = document.getElementById('relay-next');
      if (domCache.prevBtn) domCache.prevBtn.disabled = (step === 0);
      if (domCache.nextBtn) domCache.nextBtn.disabled = (step === c - 1);
    }

    /* 3. Scrub cinema frame sequence */
    updateScrubber(progress);
  }

  /* ─── Step Navigation ─────────────────────────────────────────── */
  function goToStep(targetStep) {
    if (targetStep < 0) targetStep = 0;
    if (targetStep > NUM_STAGES - 1) targetStep = NUM_STAGES - 1;
    if (!domCache.track) {
      domCache.track = document.getElementById(TRACK_ID);
    }
    var track = domCache.track;
    if (!track) return;

    var trackHeight = track.offsetHeight;
    var viewportHeight = window.innerHeight;
    var scrollableDistance = trackHeight - viewportHeight;
    var targetProgress = (targetStep + 0.5) / NUM_STAGES;
    var trackTop = track.getBoundingClientRect().top + window.pageYOffset;
    var targetScrollY = trackTop + targetProgress * scrollableDistance;

    if (window.Global && Global.lenis) {
      Global.lenis.scrollTo(targetScrollY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  }

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

    /* LENIS SCROLL BINDING */
    if (window.Global && Global.lenis) {
      Global.lenis.on('scroll', updateScroll);
    } else {
      window.addEventListener('scroll', updateScroll, { passive: true });
    }

    window.addEventListener('resize', function () {
      domCache.progressContainer = null;
      updateScroll();
    }, { passive: true });

    window.addEventListener('conrad-locationchange', ensureBioRelaySection);
    window.addEventListener('popstate', ensureBioRelaySection);
  }

  /* ─── Polling Initializer ─────────────────────────────────────── */
  setInterval(ensureBioRelaySection, 300);

  if (window.Conrad && Conrad.onReady) {
    Conrad.onReady(ensureBioRelaySection);
  } else if (document.readyState === 'complete' || document.readyState === 'interactive') {
    ensureBioRelaySection();
  } else {
    window.addEventListener('DOMContentLoaded', ensureBioRelaySection);
    window.addEventListener('load', ensureBioRelaySection);
  }

})();
