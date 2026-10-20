/**
 * Conrad Prototype — Home 3D Radiant Janus Scrubber (ES Module)
 */

import { JanusScene } from "/janus-engine.js";

(function() {
  var trackHTML = `
  <div id="conrad-radiant-janus-track">
    <section id="conrad-radiant-janus-sticky">
      <canvas id="janus-canvas" class="janus-canvas"></canvas>
      <div class="janus-inner">
        <div class="janus-head">
          <div>
            <div class="conrad-kicker">01 // THE JANUS PROGRAM</div>
            <h2 class="janus-title">The Janus program</h2>
            <p class="janus-subtitle">Through the Janus program, Radiant and the US military will deploy up to 50 Kaleidos reactors over a 5 year period to power bases and facilities across the country.</p>
          </div>
          <div class="janus-nav">
            <button id="janus-prev" class="janus-btn" aria-label="Previous">&lt;</button>
            <button id="janus-next" class="janus-btn" aria-label="Next">&gt;</button>
          </div>
        </div>

        <div class="janus-captions">
          <div class="janus-step-text active" data-step="0">
            <div class="janus-step-heading janus-line">From prototype to product:</div>
            <div class="janus-step-desc janus-line">Janus volume establishes Kaleidos as a repeatable energy product.</div>
          </div>
          <div class="janus-step-text" data-step="1">
            <div class="janus-step-heading janus-line">Capacity built for scale:</div>
            <div class="janus-step-desc janus-line">Janus accelerates the timeline to mass-produce reactors. Kaleidos will be refined through multiple design iterations incorporating inputs from the government’s top experts.</div>
          </div>
          <div class="janus-step-text" data-step="2">
            <div class="janus-step-heading janus-line">Real-world operating experience:</div>
            <div class="janus-step-desc janus-line">A fleet of Kaleidos will be deployed to bases across the US, generating years of combined operating experience each calendar year. This is an exponential accelerant to Radiant’s readiness for deployments at scale.</div>
          </div>
          <div class="janus-step-text" data-step="3">
            <div class="janus-step-heading janus-line">A proven path to market:</div>
            <div class="janus-step-desc janus-line">The Janus program shortens the runway to adoption across government, national security, data centers, physical AI, 24/7 critical load, main street businesses and more.</div>
          </div>
          <div class="janus-step-text" data-step="4">
            <div class="janus-step-heading janus-line">Volume to reduce costs:</div>
            <div class="janus-step-desc janus-line">The production volume achieved through the Janus program enables the reliability, efficiency and cost reduction required for commercial deployments while reducing costs for government customers.</div>
          </div>
        </div>

        <div class="janus-progress-container">
          <div class="janus-arrow-indicator" id="janus-arrow">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <polygon points="7,10 0,0 14,0" fill="#ffffff"/>
            </svg>
          </div>
          <div class="janus-cells">
            <div class="janus-cell" data-step="0"><div class="janus-cell-fill"></div></div>
            <div class="janus-cell" data-step="1"><div class="janus-cell-fill"></div></div>
            <div class="janus-cell" data-step="2"><div class="janus-cell-fill"></div></div>
            <div class="janus-cell" data-step="3"><div class="janus-cell-fill"></div></div>
            <div class="janus-cell" data-step="4"><div class="janus-cell-fill"></div></div>
          </div>
        </div>
      </div>
    </section>
  </div>
  `;

  var janusScene = null;
  var currentStep = 0;
  var lastStep = -1;
  var numSections = 5;
  var captionTimeline = null;
  var eventsBound = false;

  function isHomeRoute() {
    var p = window.location.pathname.replace(/\/$/, "") || "/";
    return p === "" || p === "/" || p === "/index.html";
  }

  function getArrowX(stepIndex) {
    var container = document.querySelector("#conrad-radiant-janus-sticky .janus-progress-container");
    if (!container) return 0;
    return ((stepIndex + 0.5) / numSections) * container.clientWidth;
  }

  function ensureHomeJanus() {
    var onHome = isHomeRoute();
    var track = document.getElementById("conrad-radiant-janus-track");

    if (!onHome) {
      if (janusScene) {
        try { janusScene.dispose(); } catch(e){}
        janusScene = null;
      }
      if (track) track.remove();
      lastStep = -1;
      return;
    }

    var mediaLink = document.querySelector(".MediaLinkSlice");
    var arsenal = document.querySelector(".ArsenalSlice");

    if (!mediaLink && !arsenal) return;

    var newlyMounted = false;
    if (!track) {
      var w = document.createElement("div");
      w.innerHTML = trackHTML;
      track = w.firstElementChild;

      if (mediaLink) {
        mediaLink.parentNode.insertBefore(track, mediaLink);
      } else if (arsenal && arsenal.nextSibling) {
        arsenal.parentNode.insertBefore(track, arsenal.nextSibling);
      } else if (arsenal) {
        arsenal.parentNode.appendChild(track);
      }
      newlyMounted = true;
    } else {
      if (mediaLink && track.nextElementSibling !== mediaLink) {
        mediaLink.parentNode.insertBefore(track, mediaLink);
      } else if (!mediaLink && arsenal && track.previousElementSibling !== arsenal) {
        if (arsenal.nextSibling) {
          arsenal.parentNode.insertBefore(track, arsenal.nextSibling);
        } else {
          arsenal.parentNode.appendChild(track);
        }
      }
    }

    var canvas = document.getElementById("janus-canvas");
    if (canvas && !janusScene) {
      try {
        janusScene = new JanusScene(canvas);
        janusScene.setSize(window.innerWidth, window.innerHeight);
        janusScene.requestRender();
      } catch (err) {
        console.error("[janus home 3D scene init error]", err);
      }
    }

    bindJanusEvents();
    updateScroll();

    if (newlyMounted && window.Global && Global.lenis) {
      Global.lenis.resize();
    }
  }

  function updateScroll() {
    if (!isHomeRoute()) return;
    var track = document.getElementById("conrad-radiant-janus-track");
    if (!track) return;

    var rect = track.getBoundingClientRect();
    var trackHeight = track.offsetHeight;
    var viewportHeight = window.innerHeight;
    var scrollableDistance = trackHeight - viewportHeight;

    if (scrollableDistance <= 0) return;

    var scrolled = -rect.top;
    var progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

    var c = numSections;
    var t = Math.max(0, Math.min(c, progress * c));
    var step = Math.min(c - 1, Math.floor(t));
    currentStep = step;

    var uArr = [];
    for (var i = 0; i < c; i++) {
      uArr[i] = Math.max(0, Math.min(1, t - i));
    }

    if (janusScene) {
      janusScene.setProgress(progress, uArr);
    }

    var cells = document.querySelectorAll("#conrad-radiant-janus-sticky .janus-cell");
    cells.forEach(function(cell, idx) {
      var cellFill = cell.querySelector(".janus-cell-fill");
      if (cellFill) {
        var scale = (idx === step) ? uArr[idx] : 0;
        if (window.gsap) {
          gsap.set(cellFill, { scaleX: scale, transformOrigin: "left center" });
        } else {
          cellFill.style.transform = "scaleX(" + scale + ")";
        }
      }
    });

    if (step !== lastStep) {
      var isInitial = (lastStep === -1);
      lastStep = step;

      var arrow = document.getElementById("janus-arrow");
      if (arrow) {
        var targetX = getArrowX(step);
        if (window.gsap) {
          gsap.to(arrow, {
            x: targetX,
            duration: isInitial ? 0 : 0.45,
            ease: "back.out(0.5)",
            overwrite: true
          });
        }
      }

      cells.forEach(function(cell, idx) {
        var isActive = (idx === step);
        if (isActive) {
          cell.classList.add("active");
        } else {
          cell.classList.remove("active");
        }
      });

      var allStepTexts = document.querySelectorAll("#conrad-radiant-janus-sticky .janus-step-text");
      if (window.gsap) {
        if (captionTimeline) captionTimeline.kill();
        captionTimeline = gsap.timeline();

        allStepTexts.forEach(function(el, idx) {
          var lines = el.querySelectorAll(".janus-line");
          if (idx === step) {
            el.classList.add("active");
            if (isInitial) {
              gsap.set(lines, { y: 0, opacity: 1 });
            } else {
              captionTimeline.fromTo(lines,
                { y: 14, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
                0.1
              );
            }
          } else {
            el.classList.remove("active");
            gsap.set(lines, { y: 14, opacity: 0 });
          }
        });
      } else {
        allStepTexts.forEach(function(el, idx) {
          if (idx === step) {
            el.classList.add("active");
          } else {
            el.classList.remove("active");
          }
        });
      }

      var prevBtn = document.getElementById("janus-prev");
      var nextBtn = document.getElementById("janus-next");
      if (prevBtn) prevBtn.disabled = (step === 0);
      if (nextBtn) nextBtn.disabled = (step === c - 1);
    }
  }

  function goToStep(targetStep) {
    if (targetStep < 0) targetStep = 0;
    if (targetStep > 4) targetStep = 4;
    var track = document.getElementById("conrad-radiant-janus-track");
    if (!track) return;

    var trackHeight = track.offsetHeight;
    var viewportHeight = window.innerHeight;
    var scrollableDistance = trackHeight - viewportHeight;
    var targetProgress = (targetStep + 0.5) / numSections;
    var trackTop = track.getBoundingClientRect().top + window.pageYOffset;
    var targetScrollY = trackTop + targetProgress * scrollableDistance;

    if (window.Global && Global.lenis) {
      Global.lenis.scrollTo(targetScrollY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }
  }

  function bindJanusEvents() {
    if (eventsBound) return;
    eventsBound = true;

    var prevBtn = document.getElementById("janus-prev");
    var nextBtn = document.getElementById("janus-next");
    if (prevBtn) prevBtn.addEventListener("click", function() { goToStep(currentStep - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function() { goToStep(currentStep + 1); });

    var cells = document.querySelectorAll("#conrad-radiant-janus-sticky .janus-cell");
    cells.forEach(function(c) {
      c.addEventListener("click", function() {
        var s = parseInt(c.getAttribute("data-step"), 10);
        goToStep(s);
      });
    });

    if (window.Global && Global.lenis) {
      Global.lenis.on("scroll", updateScroll);
    } else {
      window.addEventListener("scroll", updateScroll, { passive: true });
    }

    window.addEventListener("resize", function() {
      if (janusScene) janusScene.setSize(window.innerWidth, window.innerHeight);
      updateScroll();
    }, { passive: true });
  }

  window.ensureHomeJanus = ensureHomeJanus;
  if (window.Conrad) window.Conrad.ensureHomeJanus = ensureHomeJanus;

  window.addEventListener("conrad-locationchange", ensureHomeJanus);
  window.addEventListener("popstate", ensureHomeJanus);

  if (document.readyState === "complete" || document.readyState === "interactive") {
    ensureHomeJanus();
  } else {
    document.addEventListener("DOMContentLoaded", ensureHomeJanus);
  }
})();
