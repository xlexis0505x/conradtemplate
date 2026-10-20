/**
 * Conrad Prototype — About Route Walk Alone Conveyor & Contact Section
 */

// Shared Contact HTML generator
window.generateContactHTML = function(kicker, leadText) {
  var k = kicker || "02 // CONTACT &amp; ENGAGEMENT";
  var l = leadText || "For defense capabilities, partner integration, commercial deployment, or mission strategy inquiries, our specialized engineering and operations teams are available directly.";
  return `
      <div class="conrad-contact-inner">
        <div class="conrad-contact-header">
          <div class="conrad-contact-kicker">${k}</div>
          <h2 class="conrad-contact-title">Direct Inquiries</h2>
          <p class="conrad-contact-lead">
            ${l}
          </p>
        </div>

        <div class="conrad-contact-grid">
          <div class="conrad-contact-card primary-card">
            <div class="conrad-card-badge">PRIMARY DIRECT CHANNEL</div>
            <div class="conrad-card-label">General Operations &amp; Mission Partnerships</div>
            <a href="mailto:inquiries@anduril.com" class="conrad-contact-email">
              <span>inquiries@anduril.com</span>
              <svg class="conrad-arrow-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
            <p class="conrad-card-note">Monitored 24/7/365 by our mission operations center. Encrypted communication available upon request.</p>
          </div>

          <div class="conrad-contact-card channels-card">
            <div class="conrad-card-badge">SPECIALIZED INQUIRIES</div>
            <div class="conrad-channel-list">
              <a href="mailto:defense@anduril.com" class="conrad-channel-row">
                <div>
                  <span class="conrad-channel-name">Defense &amp; Allied Programs</span>
                  <span class="conrad-channel-sub">DoD, NATO &amp; International Partners</span>
                </div>
                <span class="conrad-channel-link">defense@anduril.com →</span>
              </a>
              <a href="mailto:press@anduril.com" class="conrad-channel-row">
                <div>
                  <span class="conrad-channel-name">Media &amp; Communications</span>
                  <span class="conrad-channel-sub">Press kits, statements &amp; interview requests</span>
                </div>
                <span class="conrad-channel-link">press@anduril.com →</span>
              </a>
              <a href="mailto:careers@anduril.com" class="conrad-channel-row">
                <div>
                  <span class="conrad-channel-name">Engineering &amp; Careers</span>
                  <span class="conrad-channel-sub">Autonomous systems, hardware, software</span>
                </div>
                <span class="conrad-channel-link">careers@anduril.com →</span>
              </a>
            </div>
          </div>
        </div>

        <div class="conrad-contact-bottom">
          <div class="conrad-socials-group">
            <span class="conrad-socials-label">NETWORK</span>
            <div class="conrad-socials-links">
              <a href="https://twitter.com/anduriltech" target="_blank" rel="noopener noreferrer" class="conrad-social-link">X / TWITTER ↗</a>
              <a href="https://www.linkedin.com/company/anduril-industries" target="_blank" rel="noopener noreferrer" class="conrad-social-link">LINKEDIN ↗</a>
              <a href="https://www.youtube.com/@andurilindustries" target="_blank" rel="noopener noreferrer" class="conrad-social-link">YOUTUBE ↗</a>
              <a href="https://www.instagram.com/andurilindustries" target="_blank" rel="noopener noreferrer" class="conrad-social-link">INSTAGRAM ↗</a>
            </div>
          </div>
          <div class="conrad-facilities-group">
            <span class="conrad-socials-label">GLOBAL PRESENCE</span>
            <div class="conrad-facilities-list">
              <span>COSTA MESA (HQ)</span>
              <span class="dot">·</span>
              <span>SEATTLE</span>
              <span class="dot">·</span>
              <span>WASHINGTON D.C.</span>
              <span class="dot">·</span>
              <span>LONDON</span>
              <span class="dot">·</span>
              <span>SYDNEY</span>
            </div>
          </div>
        </div>
      </div>
  `;
};

(function() {
  var WALK_DATA = [
    {
      letter: "D",
      stage: "01 // DIRECTED AUTONOMY",
      title: "Directed Autonomy",
      subtitle: "Distributed Mission Command & Decision Advantage",
      desc: "Autonomous mission management executing software-defined tactical directives with microsecond consensus across contested operational envelopes.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/d23c6903421f10c7191873592b8e823362fecbe8-882x878.png"
    },
    {
      letter: "R",
      stage: "02 // RAPID REACTION",
      title: "Rapid Reaction",
      subtitle: "High-Throughput Thermodynamic Cycle & Integrated Powertrain",
      desc: "Solid rocket and turbojet propulsion engineered for instant readiness, aggressive throttle response, and sustained flight profiles.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/9ea5ae8181d48c78365c6f8d8e3f3f35208e5f55-3000x2000.jpg"
    },
    {
      letter: "U",
      stage: "03 // UNIFIED ARCHITECTURE",
      title: "Unified Architecture",
      subtitle: "Software-Governed Hardware Modularity & Standard Interconnects",
      desc: "Common bus interfaces across avionics, power distribution, and actuation systems for rapid subsystem field replacement in under 90 seconds.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/c79ccecf787d455420edb440cbc7bf6a114cc680-882x878.png"
    },
    {
      letter: "N",
      stage: "04 // NETWORK RESILIENCE",
      title: "Network Resilience",
      subtitle: "Decentralized Ad-Hoc Directional Mesh Telemetry",
      desc: "Self-healing tactical datalinks operating continuously in contested EW and GPS-denied environments without dependence on central ground stations.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/35c91ba3a0603c99720933d52bad4c73f9fdca5f-3000x1500.jpg"
    },
    {
      letter: "K",
      stage: "05 // KINETIC CAPACITY",
      title: "Kinetic Capacity",
      subtitle: "Modular Multirole Payload Integration",
      desc: "Standardized bay geometry accommodating kinetic, sensor, and electronic countermeasures with automated software verification and telemetry lock.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/955e14dfee80e6022b1744580b6996cd435c6153-976x1952.jpg"
    },
    {
      letter: "E",
      stage: "06 // EXPEDITIONARY FOOTPRINT",
      title: "Expeditionary Footprint",
      subtitle: "Zero Specialized Ground Depot or Runway Requirements",
      desc: "Containerized deployment packages enabling austere-field launch, retrieval, and turnaround by minimal operator detachments.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/16113e3a588bd30e5c67bf2ee6d7a0847845fb28-3000x3000.jpg"
    },
    {
      letter: "A",
      stage: "07 // AUTOMATED ASSEMBLY",
      title: "Automated Assembly",
      subtitle: "Software-Defined Precision Tooling & Arsenal Production",
      desc: "Digital-twin simulated manufacturing workcells delivering scalable serial production with automated quality inspection at aerospace tolerances.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/a005eecc853d709de52769704c0a6cc1083ac7c4-1131x630.png"
    },
    {
      letter: "S",
      stage: "08 // SENSOR SYNTHESIS",
      title: "Sensor Synthesis",
      subtitle: "Multimodal Edge Perception & Threat Classification",
      desc: "Fused onboard electro-optical, radar, and RF intelligence processed in real-time to generate instant operational awareness.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/bf1545878e8ef76600cd522becab5280ba5c9f7f-3456x1588.png"
    },
    {
      letter: "T",
      stage: "09 // TOTAL ENVELOPE",
      title: "Total Envelope",
      subtitle: "Validated Multi-Domain Operational Reach",
      desc: "Aerodynamic design and thermal shielding engineered for all-weather survivability and extended mission endurance in high-threat theaters.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/dddfeebfe9d2f943790ffdbbf2bdbcca1efe6a0d-3840x2160.png"
    }
  ];

  var GAP = 350;
  var ANGLE = -22;

  function generateWalkHTML() {
    var lettersHTML = WALK_DATA.map(function(item, idx) {
      return '<div class="walkalone-letter-item" data-letter-idx="' + idx + '">' + item.letter + '</div>';
    }).join("");

    var cardsHTML = WALK_DATA.map(function(item, idx) {
      return `
        <div class="walkalone-card-item" data-walk-idx="${idx}" title="Click to inspect">
          <img class="walkalone-card-img" src="${item.image}" alt="${item.title}">
        </div>
      `;
    }).join("");

    var infoHTML = WALK_DATA.map(function(item, idx) {
      return `
        <div class="walkalone-info-item ${idx === 0 ? 'active' : ''}" data-step="${idx}">
          <div class="walkalone-info-stage">${item.stage}</div>
          <h2 class="walkalone-info-title">${item.title}</h2>
          <div class="walkalone-info-subtitle">${item.subtitle}</div>
          <div class="walkalone-info-desc">${item.desc}</div>
        </div>
      `;
    }).join("");

    var lettersTrackHTML = WALK_DATA.map(function(item, idx) {
      return `<div class="walkalone-step-letter ${idx === 0 ? 'active' : ''}" data-step="${idx}" title="${item.stage}">${item.letter}</div>`;
    }).join("");

    return `
      <section id="conrad-walkalone-sticky">
        <div class="walkalone-diagonal-strip" id="walkalone-strip"></div>
        <div class="walkalone-stage">
          <div class="walkalone-cards-container" id="walkalone-cards-wrap">
            ${cardsHTML}
          </div>
        </div>
        <div class="walkalone-inspect-sheet" id="walkalone-inspect-sheet">
          <div class="walkalone-inspect-sheet-inner">
            <div class="walkalone-inspect-top">
              <span class="walkalone-inspect-badge" id="walkalone-inspect-badge"></span>
            </div>
            <h2 class="walkalone-inspect-title" id="walkalone-inspect-title"></h2>
            <div class="walkalone-inspect-subtitle" id="walkalone-inspect-subtitle"></div>
            <p class="walkalone-inspect-desc" id="walkalone-inspect-desc"></p>
            <div class="walkalone-inspect-hint">CLICK ANYWHERE OR ESC TO RETURN</div>
          </div>
        </div>
        <div class="walkalone-counter" id="walkalone-counter">
          <div class="walkalone-counter-inner">
            ${lettersHTML}
          </div>
        </div>
        <div class="walkalone-info-panel" id="walkalone-info">
          ${infoHTML}
        </div>
        <div class="walkalone-steps-indicator" id="walkalone-steps-nav" aria-label="DRUNKEAST navigation">
          ${lettersTrackHTML}
        </div>
      </section>
    `;
  }

  function generateContact() {
    return (typeof window.generateContactHTML === "function") 
      ? window.generateContactHTML("02 // CONTACT &amp; ENGAGEMENT") 
      : "";
  }

  var isInspectOpen = false;
  var isInspectAnimating = false;
  var activeInspectIndex = -1;

  function openWalkInspect(card, index) {
    if (isInspectOpen || isInspectAnimating) return;
    isInspectAnimating = true;
    isInspectOpen = true;
    activeInspectIndex = index;

    if (window.Global && Global.lenis) {
      Global.lenis.stop();
    }

    var data = WALK_DATA[index];
    if (!data) return;

    var track = document.getElementById("conrad-walkalone-track");
    var strip = document.getElementById("walkalone-strip");
    var cardsWrap = document.getElementById("walkalone-cards-wrap");
    var sheet = document.getElementById("walkalone-inspect-sheet");
    var counter = document.getElementById("walkalone-counter");
    var info = document.getElementById("walkalone-info");
    var nav = document.getElementById("walkalone-steps-nav");

    var badgeEl = document.getElementById("walkalone-inspect-badge");
    var titleEl = document.getElementById("walkalone-inspect-title");
    var subEl = document.getElementById("walkalone-inspect-subtitle");
    var descEl = document.getElementById("walkalone-inspect-desc");

    if (badgeEl) badgeEl.textContent = data.stage;
    if (titleEl) titleEl.textContent = data.title;
    if (subEl) subEl.textContent = data.subtitle;
    if (descEl) descEl.textContent = data.desc;

    if (strip) strip.classList.add("inspect-backdrop");

    if (window.gsap) {
      gsap.to(strip, {
        width: "160vw",
        rotation: 0,
        backgroundColor: "rgba(8, 8, 8, 0.96)",
        duration: 0.72,
        ease: "power3.inOut"
      });

      gsap.to(cardsWrap, {
        rotation: 0,
        duration: 0.72,
        ease: "power3.inOut"
      });

      var allCards = track.querySelectorAll(".walkalone-card-item");
      var heroW = Math.min(window.innerWidth * 0.58, 860);
      var heroH = Math.min(window.innerHeight * 0.42, 460);
      var cardY = -70;

      allCards.forEach(function(c, i) {
        if (i === index) {
          c.classList.add("inspecting");
          gsap.to(c, {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: cardY,
            rotation: 0,
            width: heroW,
            height: heroH,
            scale: 1,
            opacity: 1,
            duration: 0.72,
            ease: "power3.inOut"
          });
        } else {
          var dir = (i < index) ? -1 : 1;
          gsap.to(c, {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: dir * 1400,
            rotation: 0,
            opacity: 0,
            duration: 0.52,
            ease: "power2.inOut"
          });
        }
      });

      if (counter) gsap.to(counter, { opacity: 0, x: -60, duration: 0.45, ease: "power2.inOut" });
      if (info) gsap.to(info, { opacity: 0, x: 60, duration: 0.45, ease: "power2.inOut" });
      if (nav) gsap.to(nav, { opacity: 0, y: 20, duration: 0.45, ease: "power2.inOut" });

      if (sheet) {
        var sheetTopY = cardY + (heroH / 2) + 1;
        sheet.style.width = heroW + "px";
        sheet.classList.add("active");
        gsap.fromTo(sheet,
          { opacity: 0, xPercent: -50, y: sheetTopY + 30 },
          {
            opacity: 1,
            xPercent: -50,
            y: sheetTopY,
            duration: 0.5,
            delay: 0.32,
            ease: "power3.out",
            onComplete: function() {
              isInspectAnimating = false;
            }
          }
        );
      } else {
        isInspectAnimating = false;
      }
    } else {
      isInspectAnimating = false;
    }
  }

  function closeWalkInspect() {
    if (!isInspectOpen || isInspectAnimating) return;
    isInspectAnimating = true;

    var track = document.getElementById("conrad-walkalone-track");
    var strip = document.getElementById("walkalone-strip");
    var cardsWrap = document.getElementById("walkalone-cards-wrap");
    var sheet = document.getElementById("walkalone-inspect-sheet");
    var counter = document.getElementById("walkalone-counter");
    var info = document.getElementById("walkalone-info");
    var nav = document.getElementById("walkalone-steps-nav");

    if (strip) strip.classList.remove("inspect-backdrop");

    if (window.gsap) {
      if (sheet) {
        gsap.to(sheet, {
          opacity: 0,
          y: "+=20",
          duration: 0.25,
          ease: "power2.in",
          onComplete: function() {
            sheet.classList.remove("active");
          }
        });
      }

      gsap.to(strip, {
        width: 440,
        rotation: -22,
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        duration: 0.68,
        ease: "power3.inOut"
      });

      gsap.to(cardsWrap, {
        rotation: -22,
        duration: 0.68,
        ease: "power3.inOut"
      });

      var rect = track.getBoundingClientRect();
      var scrollDistance = track.offsetHeight - window.innerHeight;
      var progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, scrollDistance)));
      var floatIndex = progress * (WALK_DATA.length - 1);

      var allCards = track.querySelectorAll(".walkalone-card-item");
      allCards.forEach(function(card, idx) {
        var d = idx - floatIndex;
        var y = d * GAP;
        var dist = Math.abs(d);
        var isNearby = dist <= 2.8;
        var targetOpacity = isNearby ? Math.max(0.12, 1 - dist * 0.42) : 0;
        var targetScale = isNearby ? Math.max(0.85, 1 - dist * 0.05) : 0.85;

        if (idx === activeInspectIndex) {
          gsap.to(card, {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: y,
            rotation: 22,
            scale: targetScale,
            width: 360,
            height: 225,
            opacity: targetOpacity,
            duration: 0.68,
            ease: "power3.inOut",
            onComplete: function() {
              card.classList.remove("inspecting");
              gsap.set(allCards, { clearProps: "width,height" });
              isInspectOpen = false;
              isInspectAnimating = false;
              activeInspectIndex = -1;
              if (window.Global && Global.lenis) {
                Global.lenis.start();
              }
              updateWalkScroll();
            }
          });
        } else {
          if (isNearby) {
            card.style.display = "block";
            gsap.to(card, {
              xPercent: -50,
              yPercent: -50,
              x: 0,
              y: y,
              rotation: 22,
              scale: targetScale,
              opacity: targetOpacity,
              duration: 0.68,
              ease: "power3.inOut"
            });
          } else {
            card.style.display = "none";
            card.style.opacity = "0";
          }
        }
      });

      if (counter) gsap.to(counter, { opacity: 1, x: 0, duration: 0.55, ease: "power2.out" });
      if (info) gsap.to(info, { opacity: 1, x: 0, duration: 0.55, ease: "power2.out" });

      if (nav) {
        gsap.to(nav, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          onStart: function() {
            nav.style.pointerEvents = "auto";
          }
        });
      }
    } else {
      isInspectOpen = false;
      isInspectAnimating = false;
      activeInspectIndex = -1;
      if (window.Global && Global.lenis) {
        Global.lenis.start();
      }
      updateWalkScroll();
    }
  }

  function updateWalkScroll() {
    var track = document.getElementById("conrad-walkalone-track");
    var sticky = document.getElementById("conrad-walkalone-sticky");
    var strip = document.getElementById("walkalone-strip");
    var nav = document.getElementById("walkalone-steps-nav");
    if (!track || !sticky || !strip) return;

    var rect = track.getBoundingClientRect();
    var trackHeight = track.offsetHeight;
    var viewportHeight = window.innerHeight;
    var scrollDistance = trackHeight - viewportHeight;
    if (scrollDistance <= 0) return;

    var progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));
    var numItems = WALK_DATA.length;
    var floatIndex = progress * (numItems - 1);
    var activeStep = Math.max(0, Math.min(numItems - 1, Math.round(floatIndex)));

    var stripW = 440;
    var sectionOpacity = 1;

    if (rect.top > 0) {
      var enterRatio = Math.max(0, Math.min(1, 1 - rect.top / (viewportHeight * 0.75)));
      var openEase = enterRatio * enterRatio * (3 - 2 * enterRatio);
      stripW = Math.max(0, 440 * openEase);
      sectionOpacity = openEase;
    } else {
      stripW = 440;
      sectionOpacity = 1;
    }

    sticky.style.opacity = sectionOpacity.toString();
    sticky.style.visibility = "visible";
    sticky.style.pointerEvents = "auto";

    if (!isInspectOpen && !isInspectAnimating) {
      strip.style.width = stripW + "px";
      strip.style.opacity = sectionOpacity.toString();

      var cards = track.querySelectorAll(".walkalone-card-item");
      cards.forEach(function(card, idx) {
        var d = idx - floatIndex;
        var y = d * GAP;
        var isNearby = Math.abs(d) <= 2.8;
        if (isNearby && sectionOpacity > 0.01) {
          card.style.display = "block";
          var distFromCenter = Math.abs(d);
          var opacity = Math.max(0.12, 1 - distFromCenter * 0.42) * sectionOpacity;
          var scale = Math.max(0.85, 1 - distFromCenter * 0.05) * (0.8 + 0.2 * sectionOpacity);
          card.style.transform = "translate(-50%, -50%) translateY(" + y + "px) rotate(" + (-ANGLE) + "deg) scale(" + scale + ")";
          card.style.opacity = opacity;
          card.style.zIndex = 10 - Math.round(distFromCenter);
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
        }
      });

      var letters = track.querySelectorAll(".walkalone-letter-item");
      letters.forEach(function(letterEl, idx) {
        var offset = idx - floatIndex;
        if (Math.abs(offset) <= 1.4 && sectionOpacity > 0.01) {
          letterEl.style.display = "flex";
          var dist = Math.abs(offset);
          var opacity = Math.max(0, 1 - dist * 0.72) * sectionOpacity;
          var scale = Math.max(0.72, 1 - dist * 0.2);
          var yPct = offset * 115;
          letterEl.style.transform = "translateY(" + yPct + "%) scale(" + scale + ")";
          letterEl.style.opacity = opacity;
          if (dist < 0.38) {
            letterEl.style.color = "#ffffff";
          } else {
            letterEl.style.color = "rgba(255, 255, 255, 0.28)";
          }
        } else {
          letterEl.style.display = "none";
          letterEl.style.opacity = "0";
        }
      });

      var infoItems = track.querySelectorAll(".walkalone-info-item");
      infoItems.forEach(function(item, idx) {
        if (idx === activeStep && sectionOpacity > 0.1) {
          item.classList.add("active");
          item.style.opacity = sectionOpacity.toString();
        } else {
          item.classList.remove("active");
          item.style.opacity = "0";
        }
      });
    }

    var stepLetters = track.querySelectorAll(".walkalone-step-letter, .walkalone-step-dot");
    stepLetters.forEach(function(letterEl, idx) {
      if (idx === activeStep) {
        letterEl.classList.add("active");
      } else {
        letterEl.classList.remove("active");
      }
    });

    if (nav) {
      var isPastOrEnd = (rect.bottom <= viewportHeight + 60) || (progress >= 0.985);
      if (isPastOrEnd || isInspectOpen) {
        nav.style.opacity = "0";
        nav.style.pointerEvents = "none";
        nav.style.transform = "translateX(-50%) translateY(14px)";
      } else if (rect.top > 0) {
        nav.style.opacity = (Math.max(0, 1 - rect.top / 160) * sectionOpacity).toString();
        nav.style.pointerEvents = "auto";
        nav.style.transform = "translateX(-50%) translateY(0)";
      } else if (!isInspectAnimating) {
        nav.style.opacity = sectionOpacity.toString();
        nav.style.pointerEvents = "auto";
        nav.style.transform = "translateX(-50%) translateY(0)";
      }
    }
  }

  function goToWalkStep(targetStep) {
    var track = document.getElementById("conrad-walkalone-track");
    if (!track) return;
    var targetProgress = targetStep / (WALK_DATA.length - 1);
    var scrollDistance = track.offsetHeight - window.innerHeight;
    var targetScrollTop = track.offsetTop + targetProgress * scrollDistance;
    if (window.Global && Global.lenis) {
      Global.lenis.scrollTo(targetScrollTop);
    } else {
      window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
    }
  }
  window.goToWalkStep = goToWalkStep;
  if (window.Conrad) window.Conrad.goToWalkStep = goToWalkStep;

  var eventsBound = false;
  function bindWalkEvents() {
    var track = document.getElementById("conrad-walkalone-track");
    if (!track) return;

    var cards = track.querySelectorAll(".walkalone-card-item");
    cards.forEach(function(card, idx) {
      card.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isInspectAnimating) return;
        if (isInspectOpen) {
          closeWalkInspect();
        } else {
          openWalkInspect(card, idx);
        }
      });
    });

    var sheet = document.getElementById("walkalone-inspect-sheet");
    if (sheet) {
      sheet.addEventListener("click", function(e) {
        if (isInspectOpen && !isInspectAnimating) {
          e.preventDefault();
          e.stopPropagation();
          closeWalkInspect();
        }
      });
    }

    var strip = document.getElementById("walkalone-strip");
    if (strip) {
      strip.addEventListener("click", function(e) {
        if (isInspectOpen && !isInspectAnimating) {
          e.preventDefault();
          e.stopPropagation();
          closeWalkInspect();
        }
      });
    }

    var sticky = document.getElementById("conrad-walkalone-sticky");
    if (sticky) {
      sticky.addEventListener("click", function(e) {
        if (isInspectOpen && !isInspectAnimating) {
          closeWalkInspect();
        }
      });
    }

    var stepLetters = track.querySelectorAll(".walkalone-step-letter, .walkalone-step-dot");
    stepLetters.forEach(function(letterEl) {
      letterEl.addEventListener("click", function(e) {
        e.preventDefault();
        if (isInspectOpen) closeWalkInspect();
        var s = parseInt(letterEl.getAttribute("data-step"), 10);
        goToWalkStep(s);
      });
    });

    if (!eventsBound) {
      eventsBound = true;

      window.addEventListener("wheel", function(e) {
        if (isInspectOpen) {
          e.preventDefault();
          e.stopPropagation();
          if (!isInspectAnimating) {
            closeWalkInspect();
          }
        } else if (isInspectAnimating) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, { passive: false });

      window.addEventListener("touchmove", function(e) {
        if (isInspectOpen) {
          e.preventDefault();
          e.stopPropagation();
          if (!isInspectAnimating) {
            closeWalkInspect();
          }
        } else if (isInspectAnimating) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, { passive: false });

      if (window.Global && Global.lenis) {
        Global.lenis.on("scroll", function() {
          if (isInspectOpen && !isInspectAnimating) closeWalkInspect();
          updateWalkScroll();
        });
      } else {
        window.addEventListener("scroll", function() {
          if (isInspectOpen && !isInspectAnimating) closeWalkInspect();
          updateWalkScroll();
        }, { passive: true });
      }

      window.addEventListener("resize", function() {
        if (window.Global && Global.lenis) Global.lenis.resize();
        updateWalkScroll();
      }, { passive: true });

      document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" || e.keyCode === 27) {
          if (isInspectOpen) closeWalkInspect();
        }
      });
    }

    updateWalkScroll();
  }

  function isAboutRoute() {
    var p = window.location.pathname.replace(/\/$/, "") || "/";
    return p === "/about" || p.startsWith("/about/");
  }

  function ensureAboutTrack() {
    var onAbout = isAboutRoute();
    var track = document.getElementById("conrad-walkalone-track");
    var contact = document.getElementById("conrad-contact-block");

    if (!onAbout) {
      if (track) track.remove();
      if (contact) contact.remove();
      return;
    }

    var hero = document.querySelector(".PageHero");
    if (!hero) return;

    if (!track) {
      var div = document.createElement("div");
      div.id = "conrad-walkalone-track";
      div.innerHTML = generateWalkHTML();
      hero.parentNode.insertBefore(div, hero.nextSibling);

      var nextBtn = hero.querySelector(".scrollToNext");
      if (nextBtn && !nextBtn._walkBound) {
        nextBtn._walkBound = true;
        nextBtn.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          var t = document.getElementById("conrad-walkalone-track");
          if (t) {
            var topPos = t.getBoundingClientRect().top + window.pageYOffset;
            if (window.Global && Global.lenis) {
              Global.lenis.scrollTo(topPos);
            } else {
              window.scrollTo({ top: topPos, behavior: "smooth" });
            }
          }
        }, true);
      }

      bindWalkEvents();
      if (window.Global && Global.lenis) {
        Global.lenis.resize();
      }
    } else if (hero.nextSibling !== track) {
      hero.parentNode.insertBefore(track, hero.nextSibling);
    }

    var currentTrack = document.getElementById("conrad-walkalone-track");
    if (currentTrack) {
      if (!contact) {
        var contactSec = document.createElement("section");
        contactSec.id = "conrad-contact-block";
        contactSec.className = "conrad-contact-section";
        contactSec.innerHTML = generateContact();
        currentTrack.parentNode.insertBefore(contactSec, currentTrack.nextSibling);
        if (window.Global && Global.lenis) {
          Global.lenis.resize();
        }
      } else if (currentTrack.nextSibling !== contact) {
        currentTrack.parentNode.insertBefore(contact, currentTrack.nextSibling);
      }
    }
  }

  window.ensureAboutTrack = ensureAboutTrack;
  if (window.Conrad) window.Conrad.ensureAboutTrack = ensureAboutTrack;

  window.addEventListener("conrad-locationchange", ensureAboutTrack);

  var lastAboutRoute = null;
  function checkAboutRoute() {
    var p = window.location.pathname.replace(/\/$/, "") || "/";
    var hero = document.querySelector(".PageHero");
    var track = document.getElementById("conrad-walkalone-track");
    if (p !== lastAboutRoute || (hero && !track)) {
      lastAboutRoute = p;
      ensureAboutTrack();
    }
  }
  window.addEventListener("popstate", checkAboutRoute);
  setInterval(checkAboutRoute, 150);

  if (document.readyState === "complete" || document.readyState === "interactive") {
    ensureAboutTrack();
  } else {
    document.addEventListener("DOMContentLoaded", ensureAboutTrack);
    window.addEventListener("load", ensureAboutTrack);
  }
})();
