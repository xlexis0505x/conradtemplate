/**
 * Conrad Prototype — About Route Walk Alone Conveyor & Contact Section
 * High-performance diagonal card conveyor with GSAP inspection modal, rolling drum counter,
 * and dual-edition support (DRUNKEAST vs POSEIDON).
 */

// Shared Contact & Mission HTML generator
window.generateContactHTML = function(kicker, leadText) {
  var aboutData = (window.Conrad && Conrad.content && Conrad.content.get("about")) || {};
  var contactData = aboutData.contact || {};
  var isChina = (window.Conrad && Conrad.isChina);
  var company = isChina ? "POSEIDON" : "DRUNKEAST";
  var k = kicker || contactData.kicker || "02 // GET IN TOUCH";
  var l = leadText || contactData.lead || "Have a question, an idea, or an opportunity to collaborate? We welcome conversations with fellow innovators, ocean researchers, and mining concession operators.";
  var email = contactData.email || "teamdrunkeast@gmail.com";
  var mission = aboutData.mission || "";
  var vision = aboutData.vision || "";
  var storyParas = aboutData.storyParagraphs || [];

  var storyHTML = "";
  if (storyParas.length) {
    storyHTML = `
      <div class="conrad-about-story-wrap" style="margin-bottom: 3.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div class="conrad-contact-kicker">01 // ORIGIN &amp; INSPIRATION</div>
        <h2 class="conrad-contact-title" style="margin-bottom: 1.5rem;">${aboutData.storyTitle || "The Story Behind " + company}</h2>
        ${storyParas.map(function(p) { return `<p class="conrad-contact-lead" style="margin-bottom: 1.25rem; max-width: 900px;">${p}</p>`; }).join("")}
        ${mission ? `<div style="margin-top: 2rem; padding: 1.5rem 2rem; background: rgba(255,255,255,0.03); border-left: 2px solid #ffffff;"><h3 style="font-size: 1.15rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem;">Our Mission</h3><p style="font-size: 0.95rem; line-height: 1.6; color: rgba(255,255,255,0.7); margin: 0;">${mission}</p></div>` : ""}
        ${vision ? `<div style="margin-top: 1.25rem; padding: 1.5rem 2rem; background: rgba(255,255,255,0.03); border-left: 2px solid rgba(255,255,255,0.4);"><h3 style="font-size: 1.15rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem;">Our Vision</h3><p style="font-size: 0.95rem; line-height: 1.6; color: rgba(255,255,255,0.7); margin: 0;">${vision}</p></div>` : ""}
      </div>
    `;
  } else if (mission) {
    storyHTML = `
      <div class="conrad-about-story-wrap" style="margin-bottom: 3.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div class="conrad-contact-kicker">01 // OUR MISSION</div>
        <h2 class="conrad-contact-title" style="margin-bottom: 1.5rem;">Responsible Ocean Innovation</h2>
        <p class="conrad-contact-lead" style="margin-bottom: 1.25rem; max-width: 900px;">${mission}</p>
      </div>
    `;
  }

  return `
      <div class="conrad-contact-inner">
        ${storyHTML}
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
            <div class="conrad-card-label">General Operations &amp; Ocean Partnerships</div>
            <a href="mailto:${email}" class="conrad-contact-email">
              <span>${email}</span>
              <svg class="conrad-arrow-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
            <p class="conrad-card-note">Monitored directly by the ${company} engineering and research team.</p>
          </div>

          <div class="conrad-contact-card channels-card">
            <div class="conrad-card-badge">SPECIALIZED INQUIRIES</div>
            <div class="conrad-channel-list">
              <a href="mailto:${email}?subject=Concession%20EMMP%20Integration" class="conrad-channel-row">
                <div>
                  <span class="conrad-channel-name">Concession &amp; Allied EMMP Programs</span>
                  <span class="conrad-channel-sub">Cook Islands SBMA, ISA Contractors &amp; Survey Vessels</span>
                </div>
                <span class="conrad-channel-link">${email} &rarr;</span>
              </a>
              <a href="mailto:${email}?subject=Scientific%20Research%20Collaboration" class="conrad-channel-row">
                <div>
                  <span class="conrad-channel-name">Oceanographic &amp; Benthic Research</span>
                  <span class="conrad-channel-sub">Turbidity dynamics, flocculation chemistry &amp; sensors</span>
                </div>
                <span class="conrad-channel-link">${email} &rarr;</span>
              </a>
              <a href="mailto:${email}?subject=Engineering%20Careers" class="conrad-channel-row">
                <div>
                  <span class="conrad-channel-name">Engineering &amp; Deep-Sea Careers</span>
                  <span class="conrad-channel-sub">Subsea mechanical, fluid dynamics, marine robotics</span>
                </div>
                <span class="conrad-channel-link">${email} &rarr;</span>
              </a>
            </div>
          </div>
        </div>

        <div class="conrad-contact-bottom">
          <div class="conrad-socials-group">
            <span class="conrad-socials-label">NETWORK</span>
            <div class="conrad-socials-links">
              <a href="mailto:${email}" class="conrad-social-link">EMAIL DIRECT &nearr;</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="conrad-social-link">LINKEDIN &nearr;</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="conrad-social-link">X / TWITTER &nearr;</a>
            </div>
          </div>
          <div class="conrad-facilities-group">
            <span class="conrad-socials-label">OPERATIONAL HUBS</span>
            <div class="conrad-facilities-list">
              <span>RAROTONGA (COOK ISLANDS)</span>
              <span class="dot">&middot;</span>
              <span>BEIJING</span>
              <span class="dot">&middot;</span>
              <span>SINGAPORE</span>
              <span class="dot">&middot;</span>
              <span>HONOLULU</span>
            </div>
          </div>
        </div>
      </div>
  `;
};

(function() {
  var DEFAULT_WALK_DATA = [
    {
      letter: "D",
      stage: "01 // DEEP-SEA EXPLORATION",
      title: "Deep-Sea Exploration",
      subtitle: "D — Deep-Sea Exploration",
      desc: "Investigating the mysteries, extreme pressures, and environmental dynamics of the abyssal plain.",
      image: "/assets/images/subsea/benthic-collector.jpg"
    },
    {
      letter: "R",
      stage: "02 // RESTORATION",
      title: "Restoration",
      subtitle: "R — Restoration",
      desc: "Developing solutions that support the recovery of marine environments.",
      image: "/assets/images/subsea/bento-01-flocculation.jpg"
    },
    {
      letter: "U",
      stage: "03 // UNCERTAINTY",
      title: "Uncertainty",
      subtitle: "U — Uncertainty",
      desc: "Embracing the unknown through research, experimentation, and critical thinking.",
      image: "/assets/images/subsea/bento-04-digital-twin.jpg"
    },
    {
      letter: "N",
      stage: "04 // NAVIGATION",
      title: "Navigation",
      subtitle: "N — Navigation",
      desc: "Finding pathways through complex scientific and environmental challenges.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/0126fc76978b2fedd63aeeacd2e3b1f55f5c617f-952x952.png"
    },
    {
      letter: "K",
      stage: "05 // KNOWLEDGE",
      title: "Knowledge",
      subtitle: "K — Knowledge",
      desc: "Turning research and evidence into informed decisions.",
      image: "/assets/images/subsea/bento-05-telemetry.jpg"
    },
    {
      letter: "E",
      stage: "06 // ENVIRONMENTAL PROTECTION",
      title: "Environmental Protection",
      subtitle: "E — Environmental Protection",
      desc: "Prioritising the health and resilience of marine ecosystems.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/b95abc74192ac5ae36f6076031bb09dc0e09d318-1920x1080.png"
    },
    {
      letter: "A",
      stage: "07 // ADAPTATION",
      title: "Adaptation",
      subtitle: "A — Adaptation",
      desc: "Responding to changing conditions with flexible, innovative solutions.",
      image: "/assets/images/subsea/bento-02-manifold.jpg"
    },
    {
      letter: "S",
      stage: "08 // SUSTAINABILITY",
      title: "Sustainability",
      subtitle: "S — Sustainability",
      desc: "Balancing technological progress with long-term environmental responsibility.",
      image: "/assets/images/subsea/bento-03-adcp.jpg"
    },
    {
      letter: "T",
      stage: "09 // TECHNOLOGY",
      title: "Technology",
      subtitle: "T — Technology",
      desc: "Applying science and engineering to tackle real-world problems.",
      image: "/assets/images/subsea/bento-07-pressure-vessel.jpg"
    }
  ];

  var GAP = 350;
  var ANGLE = -22;

  function getWalkData() {
    var acronym = (window.Conrad && Conrad.content && Conrad.content.get("about.acronym"));
    if (Array.isArray(acronym) && acronym.length) {
      return acronym.map(function(item, idx) {
        var num = idx + 1;
        var stageStr = (num < 10 ? "0" + num : num) + " // " + item.word.toUpperCase();
        var imgPath = (typeof window.qualifyUrl === "function") ? window.qualifyUrl(item.image) : item.image;
        return {
          letter: item.letter,
          stage: stageStr,
          title: item.word,
          subtitle: item.letter + " \u2014 " + item.word,
          desc: item.principle,
          image: imgPath
        };
      });
    }
    return DEFAULT_WALK_DATA;
  }

  function generateWalkHTML() {
    var WALK_DATA = getWalkData();
    var brand = (window.Conrad && Conrad.content && Conrad.content.get("brandName")) || "DRUNKEAST";

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
        <div class="walkalone-steps-indicator" id="walkalone-steps-nav" aria-label="${brand} navigation">
          ${lettersTrackHTML}
        </div>
      </section>
    `;
  }

  function generateContact() {
    return (typeof window.generateContactHTML === "function") 
      ? window.generateContactHTML("02 // GET IN TOUCH") 
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

    var WALK_DATA = getWalkData();
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

    var WALK_DATA = getWalkData();

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
            rotation: -ANGLE,
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
              rotation: -ANGLE,
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


  var cachedTrack = null;
  var cachedSticky = null;
  var cachedStrip = null;
  var cachedNav = null;
  var cachedCards = null;
  var cachedLetters = null;
  var cachedInfoItems = null;
  var cachedStepLetters = null;

  function updateWalkScroll() {
    if (!cachedTrack || !cachedTrack.isConnected) {
      cachedTrack = document.getElementById("conrad-walkalone-track");
      cachedSticky = document.getElementById("conrad-walkalone-sticky");
      cachedStrip = document.getElementById("walkalone-strip");
      cachedNav = document.getElementById("walkalone-steps-nav");
      if (cachedTrack) {
        cachedCards = cachedTrack.querySelectorAll(".walkalone-card-item");
        cachedLetters = cachedTrack.querySelectorAll(".walkalone-letter-item");
        cachedInfoItems = cachedTrack.querySelectorAll(".walkalone-info-item");
        cachedStepLetters = cachedTrack.querySelectorAll(".walkalone-step-letter");
      }
    }
    var track = cachedTrack, sticky = cachedSticky, strip = cachedStrip, nav = cachedNav;
    if (!track || !sticky || !strip) return;

    var WALK_DATA = getWalkData();
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

      if (cachedCards) { cachedCards.forEach(function(card, idx) {
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
      }); }

      if (cachedLetters) { cachedLetters.forEach(function(letterEl, idx) {
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
      }); }

      if (cachedInfoItems) { cachedInfoItems.forEach(function(item, idx) {
        if (idx === activeStep && sectionOpacity > 0.1) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      }); }

      if (cachedStepLetters) { cachedStepLetters.forEach(function(stepEl, idx) {
        if (idx === activeStep) {
          stepEl.classList.add("active");
        } else {
          stepEl.classList.remove("active");
        }
      }); }

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
    var WALK_DATA = getWalkData();
    var targetProgress = targetStep / Math.max(1, (WALK_DATA.length - 1));
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
    var p = (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, "")) || "/";
    return p === "/about" || p.startsWith("/about/");
  }

  var currentMountedEdition = null;

  function ensureAboutTrack() {
    var onAbout = isAboutRoute();
    var track = document.getElementById("conrad-walkalone-track");
    var contact = document.getElementById("conrad-contact-block");

    if (!onAbout) {
      if (track) track.remove();
      if (contact) contact.remove();
      currentMountedEdition = null;
      return;
    }

    var hero = document.querySelector(".PageHero");
    if (!hero) return;

    var activeEdition = (window.Conrad && Conrad.edition) || "global";
    var isChina = (activeEdition === "china");
    var aboutData = (window.Conrad && Conrad.content && Conrad.content.get("about")) || {};
    var heroKicker = aboutData.heroKicker || (isChina ? "ABOUT US // POSEIDON" : "WHO WE ARE // DRUNKEAST");
    var heroTitle = aboutData.heroTitle || (isChina ? "Inspired by the Sea. Driven by Innovation." : "Driven by Curiosity. Dedicated to Marine Restoration.");
    
    var h1 = hero.querySelector(".titleWrapper h1");
    if (h1 && h1.innerText !== heroKicker) {
      h1.innerText = heroKicker;
    }
    var h2 = hero.querySelector(".titleWrapper h2");
    if (h2 && h2.innerText !== heroTitle) {
      h2.innerText = heroTitle;
    }
    var heroImg = hero.querySelector("img.ResponsiveImage, img");
    var subseaCollectorPath = (typeof window.qualifyUrl === "function") 
      ? window.qualifyUrl("/assets/images/subsea/benthic-collector.jpg") 
      : "/assets/images/subsea/benthic-collector.jpg";
    if (heroImg && (!heroImg.src.includes("benthic-collector") || heroImg.hasAttribute("srcset"))) {
      heroImg.src = subseaCollectorPath;
      heroImg.removeAttribute("srcset");
      heroImg.alt = "Autonomous Deep-Sea Plume Mitigation Platform";
    }

    var needsRebuild = (currentMountedEdition !== activeEdition);

    if (needsRebuild && track) {
      track.remove();
      if (contact) contact.remove();
      track = null;
      contact = null;
    }

    if (!track) {
      currentMountedEdition = activeEdition;
      var WALK_DATA = getWalkData();
      var div = document.createElement("div");
      div.id = "conrad-walkalone-track";
      div.style.height = (WALK_DATA.length * 68) + "vh";
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
      if (!contact || needsRebuild) {
        if (contact) contact.remove();
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
    var p = (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, "")) || "/";
    var hero = document.querySelector(".PageHero");
    var track = document.getElementById("conrad-walkalone-track");
    var activeEdition = (window.Conrad && Conrad.edition) || "global";
    if (p !== lastAboutRoute || (hero && !track) || (track && currentMountedEdition !== activeEdition)) {
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
