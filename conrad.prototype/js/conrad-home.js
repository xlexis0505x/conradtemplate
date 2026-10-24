/**
 * Conrad Prototype — Home Route Bento Grid Interactive Zoom Modal
 */

(function() {
  function escapeHTML(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  var DEFAULT_SUB_DATA = [
    {
      title: "01 // Eco-Flocculation Chemistry",
      subtitle: "High-Efficiency Bio-Compatible Aggregate Binding",
      desc: "Proprietary non-toxic natural biopolymer designed to agglomerate sub-micron abyssal sediment particles into heavy macro-flocs, increasing settling velocity by over an order of magnitude.",
      image: "/assets/images/subsea/bento-01-flocculation.jpg"
    },
    {
      title: "02 // Subsea Active Dispenser Manifold",
      subtitle: "6,000-Meter Depth-Rated Injection Architecture",
      desc: "Autonomous benthic manifold skid mounted directly to mining collector discharge chutes, delivering closed-loop micro-dosed chemical dispersion under 600 bar hydrostatic pressure.",
      image: "/assets/images/subsea/bento-02-manifold.jpg"
    },
    {
      title: "03 // Acoustic & Turbidity Sensing",
      subtitle: "Real-Time Sensor Fusion & Edge Hydrodynamic Processing",
      desc: "Integrated dual 600 kHz Acoustic Doppler Current Profilers (ADCP) and 850nm optical backscatter sensors providing closed-loop environmental feedback to modulate dosing.",
      image: "/assets/images/subsea/bento-03-adcp.jpg"
    },
    {
      title: "04 // Plume Dispersion Digital Twin",
      subtitle: "Predictive Numerical Modeling & Ocean Current Calibration",
      desc: "Real-time spatial plume migration simulation calibrated against abyssal benthic currents, predicting settling footprints and preventing transboundary particle drift.",
      image: "/assets/images/subsea/bento-04-digital-twin.jpg"
    },
    {
      title: "05 // G09 & ISA Regulatory Compliance",
      subtitle: "Automated Environmental Management & Monitoring Telemetry",
      desc: "Real-time compliance data stream designed to satisfy Cook Islands SBMA G09 standards and International Seabed Authority (ISA) benthic discharge monitoring regulations.",
      image: "/assets/images/subsea/bento-05-telemetry.jpg"
    },
    {
      title: "06 // Modular Offshore Skid",
      subtitle: "Containerized Research Vessel & Mining Barge Integration",
      desc: "Standardized subsea modular footprint compatible with commercial nodule collector trials and environmental survey vessels without requiring bespoke deck reconstructions.",
      image: "/assets/images/subsea/bento-06-offshore-skid.jpg"
    },
    {
      title: "07 // 600-Bar Pressure Vessel & Valving",
      subtitle: "Titanium Subsea Valving & Zero-Failure Solenoid Actuation",
      desc: "Deep-ocean pressure-balanced electromagnetic valves eliminating mechanical pinch points, delivering uninterrupted operation under abyssal temperature and salinity extremes.",
      image: "/assets/images/subsea/bento-07-pressure-vessel.jpg"
    }
  ];

  function getSubData() {
    if (window.Conrad && Conrad.content) {
      var cards = Conrad.content.get("home.bentoCards");
      if (cards && cards.length) return cards;
    }
    return DEFAULT_SUB_DATA;
  }

  var activeCard = null;
  var isClosing = false;
  var isOpen = false;

  function ensureModalDOM() {
    var oldBackdrop = document.getElementById("conrad-inspection-backdrop");
    if (oldBackdrop) oldBackdrop.remove();
    var oldPanel = document.getElementById("conrad-inspection-panel");
    if (oldPanel) oldPanel.remove();

    document.querySelectorAll(".inspect-pill").forEach(function(p) { p.remove(); });

    if (document.getElementById("conrad-bento-modal")) return;

    var modal = document.createElement("div");
    modal.id = "conrad-bento-modal";
    modal.innerHTML = `
      <div class="bento-modal-backdrop"></div>
      <div class="bento-modal-container">
        <div class="bento-modal-media">
          <img id="bento-modal-img" src="" alt="Subsystem Expanded View">
        </div>
        <div class="bento-modal-info">
          <h3 class="bento-modal-title" id="bento-modal-title"></h3>
          <div class="bento-modal-subtitle" id="bento-modal-subtitle"></div>
          <p class="bento-modal-desc" id="bento-modal-desc"></p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      zoomBack();
    });
  }

  function zoomOutwards(card, index) {
    if (isOpen || isClosing) return;
    ensureModalDOM();

    var data = getSubData()[index];
    if (!data) return;

    var modal = document.getElementById("conrad-bento-modal");
    var container = modal.querySelector(".bento-modal-container");
    var backdrop = modal.querySelector(".bento-modal-backdrop");
    var imgEl = document.getElementById("bento-modal-img");
    var titleEl = document.getElementById("bento-modal-title");
    var subEl = document.getElementById("bento-modal-subtitle");
    var descEl = document.getElementById("bento-modal-desc");

    var cardImg = card.querySelector("img");
    var imgSrc = (cardImg && (cardImg.currentSrc || cardImg.src)) || data.image;
    if (typeof window.qualifyUrl === "function" && imgSrc) {
      imgSrc = window.qualifyUrl(imgSrc);
    }

    imgEl.src = imgSrc;
    titleEl.textContent = data.title;
    subEl.textContent = data.subtitle;
    descEl.textContent = data.desc;

    activeCard = card;
    isOpen = true;

    var cardRect = card.getBoundingClientRect();

    modal.style.display = "flex";
    modal.classList.add("active");

    if (window.gsap) {
      gsap.killTweensOf([container, backdrop]);
      var finalRect = container.getBoundingClientRect();

      var scaleX = Math.max(0.2, cardRect.width / finalRect.width);
      var scaleY = Math.max(0.2, cardRect.height / finalRect.height);
      var deltaX = (cardRect.left + cardRect.width / 2) - (finalRect.left + finalRect.width / 2);
      var deltaY = (cardRect.top + cardRect.height / 2) - (finalRect.top + finalRect.height / 2);

      gsap.fromTo(backdrop, 
        { opacity: 0, backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" }, 
        { opacity: 1, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", duration: 0.38, ease: "power2.out" }
      );

      gsap.fromTo(container,
        {
          x: deltaX,
          y: deltaY,
          scaleX: scaleX,
          scaleY: scaleY,
          opacity: 0.85,
          transformOrigin: "center center"
        },
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          duration: 0.42,
          ease: "power3.out"
        }
      );
    }
  }

  function zoomBack() {
    if (!isOpen || isClosing) return;
    isClosing = true;

    var modal = document.getElementById("conrad-bento-modal");
    if (!modal) {
      isOpen = false;
      isClosing = false;
      return;
    }

    var container = modal.querySelector(".bento-modal-container");
    var backdrop = modal.querySelector(".bento-modal-backdrop");

    if (window.gsap && activeCard) {
      var currentCardRect = activeCard.getBoundingClientRect();
      var finalRect = container.getBoundingClientRect();

      var scaleX = Math.max(0.2, currentCardRect.width / finalRect.width);
      var scaleY = Math.max(0.2, currentCardRect.height / finalRect.height);
      var deltaX = (currentCardRect.left + currentCardRect.width / 2) - (finalRect.left + finalRect.width / 2);
      var deltaY = (currentCardRect.top + currentCardRect.height / 2) - (finalRect.top + finalRect.height / 2);

      gsap.killTweensOf([container, backdrop]);

      gsap.to(backdrop, {
        opacity: 0,
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)",
        duration: 0.3,
        ease: "power2.inOut"
      });

      gsap.to(container, {
        x: deltaX,
        y: deltaY,
        scaleX: scaleX,
        scaleY: scaleY,
        opacity: 0,
        duration: 0.32,
        ease: "power2.inOut",
        onComplete: function() {
          modal.style.display = "none";
          modal.classList.remove("active");
          gsap.set(container, { clearProps: "all" });
          gsap.set(backdrop, { clearProps: "all" });
          isOpen = false;
          isClosing = false;
          activeCard = null;
        }
      });
    } else {
      modal.style.display = "none";
      modal.classList.remove("active");
      isOpen = false;
      isClosing = false;
      activeCard = null;
    }
  }

  var cachedDOM = {
    path: null,
    videoSlice: null,
    homeHero: null,
    cards: null,
    arsenalItems: null
  };

  function isNodeValid(nodeOrList) {
    if (!nodeOrList) return false;
    if (nodeOrList instanceof NodeList || Array.isArray(nodeOrList)) {
      return nodeOrList.length > 0 && document.contains(nodeOrList[0]);
    }
    return document.contains(nodeOrList);
  }

  function updateHomeContent() {
    var p = (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, "")) || "/";
    var onHome = (p === "" || p === "/" || p === "/index.html");

    if (cachedDOM.path !== p) {
      cachedDOM.path = p;
      cachedDOM.videoSlice = null;
      cachedDOM.homeHero = null;
      cachedDOM.cards = null;
      cachedDOM.arsenalItems = null;
    }

    if (!onHome) {
      var stats = document.getElementById("conrad-company-stats");
      if (stats) stats.remove();
      return;
    }

    // 1. Mount Stats Section right below FeaturedAnnouncementSlice or HomeHero
    if (!isNodeValid(cachedDOM.videoSlice)) cachedDOM.videoSlice = document.querySelector(".FeaturedAnnouncementSlice");
    if (!isNodeValid(cachedDOM.homeHero)) cachedDOM.homeHero = document.querySelector(".HomeHero");

    var videoSlice = cachedDOM.videoSlice;
    var homeHero = cachedDOM.homeHero;
    var anchor = videoSlice || homeHero;
    var statsEl = document.getElementById("conrad-company-stats");

    if (anchor) {
      if (!statsEl) {
        var statsList = (window.Conrad && Conrad.content && Conrad.content.get("home.stats")) || [];
        if (statsList.length) {
          var sec = document.createElement("section");
          sec.id = "conrad-company-stats";
          sec.className = "conrad-stats-section";
          sec.innerHTML = `
            <div class="conrad-stats-inner">
              <div class="conrad-stats-header">
                <div class="conrad-kicker">01 // CONCESSION BASELINE &amp; IMPACT METRICS</div>
                <h2 class="conrad-section-title">Deep-Ocean Operational Footprint</h2>
                <p class="conrad-section-lead">Verified operational metrics across our Pacific exclusive economic zone testbed and global International Seabed Authority exploration tracts.</p>
              </div>
              <div class="conrad-stats-grid">
                ${statsList.map(function(s) {
                  return `
                    <div class="conrad-stat-card">
                      <div>
                        <div class="conrad-stat-val">${escapeHTML(s.value)}</div>
                        <div class="conrad-stat-label">${escapeHTML(s.label)}</div>
                      </div>
                      <div class="conrad-stat-sub">${escapeHTML(s.sub)}</div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          `;
          anchor.parentNode.insertBefore(sec, anchor.nextSibling);
          if (window.Global && Global.lenis) Global.lenis.resize();
        }
      } else if (statsEl.previousElementSibling !== anchor) {
        anchor.parentNode.insertBefore(statsEl, anchor.nextSibling);
      }
    }

    // 2. Update FeaturedAnnouncementSlice title & subtitle
    if (videoSlice) {
      var title = videoSlice.querySelector("h2, .title");
      if (title && !title.dataset.customized) {
        title.dataset.customized = "true";
        title.innerText = "Autonomous Plume Mitigation System";
      }
      var desc = videoSlice.querySelector(".description, p");
      if (desc && !desc.dataset.customized) {
        desc.dataset.customized = "true";
        desc.innerText = "In-Situ Benthic Sediment Control & Turbidity Abatement";
      }
    }

    // 3. Update 7 Bento Cards text on Home
    if (!isNodeValid(cachedDOM.cards)) cachedDOM.cards = document.querySelectorAll(".FeaturedProductsCard");
    var cards = cachedDOM.cards;
    var subData = getSubData();
    cards.forEach(function(card, idx) {
      if (idx < subData.length) {
        var data = subData[idx];
        var titleEl = card.querySelector("h2.title, .title");
        var descEl = card.querySelector("h4.description, .description");
        var descHidden = card.querySelector("h4.descriptionHidden, .descriptionHidden");
        if (titleEl && titleEl.innerText !== data.title) {
          titleEl.innerText = data.title;
        }
        if (descEl && descEl.innerText !== data.subtitle) {
          descEl.innerText = data.subtitle;
        }
        if (descHidden && descHidden.innerText !== data.subtitle) {
          descHidden.innerText = data.subtitle;
        }
        var imgEl = card.querySelector("img");
        if (imgEl && data.image && !imgEl.src.endsWith(data.image)) {
          imgEl.src = data.image;
          imgEl.removeAttribute("srcset");
        }
      }
    });

    // 4. Update 4 ArsenalSlice metric cards images on Home
    if (!isNodeValid(cachedDOM.arsenalItems)) cachedDOM.arsenalItems = document.querySelectorAll(".ArsenalSlice .ArsenalItem");
    var arsenalItems = cachedDOM.arsenalItems;
    var arsenalImages = [
      "/assets/images/subsea/bento-01-flocculation.jpg",
      "/assets/images/subsea/bento-06-offshore-skid.jpg",
      "/assets/images/subsea/bento-02-manifold.jpg",
      "/assets/images/subsea/bento-05-telemetry.jpg"
    ];
    arsenalItems.forEach(function(item, idx) {
      if (idx < arsenalImages.length) {
        var img = item.querySelector("img");
        if (img && (!img.src || !img.src.includes(arsenalImages[idx]))) {
          img.src = arsenalImages[idx];
          img.removeAttribute("srcset");
        }
      }
    });
  }

  function attachCardListeners() {
    var p = (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, "")) || "/";
    if (p !== "" && p !== "/" && p !== "/index.html") return;
    if (window.__dismissPrepaint) window.__dismissPrepaint();
    ensureModalDOM();
    updateHomeContent();

    if (!isNodeValid(cachedDOM.cards)) cachedDOM.cards = document.querySelectorAll(".FeaturedProductsCard");
    var cards = cachedDOM.cards;
    cards.forEach(function(card, idx) {
      var pill = card.querySelector(".inspect-pill");
      if (pill) pill.remove();

      if (!card.dataset.bentoZoomBound) {
        card.dataset.bentoZoomBound = "true";
        card.dataset.bentoIndex = idx;

        card.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();

          if (isClosing) return;
          var index = parseInt(card.dataset.bentoIndex, 10);
          if (isOpen && activeCard === card) {
            zoomBack();
          } else {
            zoomOutwards(card, index);
          }
        }, true);
      }
    });
  }

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.keyCode === 27) {
      zoomBack();
    }
  });

  setInterval(attachCardListeners, 250);

  if (window.Conrad && Conrad.onReady) {
    Conrad.onReady(attachCardListeners);
  } else if (document.readyState === "complete" || document.readyState === "interactive") {
    attachCardListeners();
  } else {
    window.addEventListener("DOMContentLoaded", attachCardListeners);
    window.addEventListener("load", attachCardListeners);
  }
})();
