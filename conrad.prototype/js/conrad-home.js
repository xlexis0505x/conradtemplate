/**
 * Conrad Prototype — Home Route Bento Grid Interactive Zoom Modal
 */

(function() {
  var DEFAULT_SUB_DATA = [
    {
      title: "01 // Propulsion Core",
      subtitle: "High-Throughput Thermodynamic Cycle & Integrated Powertrain",
      desc: "Engineered for maximum reliability and responsive thrust modulation in contested flight profiles, eliminating single-point mechanical valves in favor of software-governed electromagnetic pintle actuation.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/9ea5ae8181d48c78365c6f8d8e3f3f35208e5f55-3000x2000.jpg"
    },
    {
      title: "02 // Autonomous Guidance",
      subtitle: "Real-Time Sensor Fusion & Edge Tactical Processing",
      desc: "Fully autonomous navigation and edge computing architecture operating independently of GPS, fusing optical, thermal, and inertial streams to calculate dynamic evasion vectors in real time.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/d23c6903421f10c7191873592b8e823362fecbe8-882x878.png"
    },
    {
      title: "03 // Composite Airframe",
      subtitle: "Advanced Lightweight Metallurgy & Aerodynamic Envelope",
      desc: "Monocoque carbon-fiber composite architecture designed for high dynamic pressures and thermal gradients encountered during rapid supersonic transition and terminal maneuvering.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/c79ccecf787d455420edb440cbc7bf6a114cc680-882x878.png"
    },
    {
      title: "04 // Modular Payload Bay",
      subtitle: "Rapid Turnaround & Standard Mechanical Interface",
      desc: "Software-defined reconfigurable architecture supporting kinetic, electronic warfare, and sensor packages with automated interface handshake and sub-90-second mechanical swap times.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/955e14dfee80e6022b1744580b6996cd435c6153-976x1952.jpg"
    },
    {
      title: "05 // Swarm & Mesh Network",
      subtitle: "Resilient Distributed Telemetry Across Operating Theaters",
      desc: "Decentralized ad-hoc directional communication protocol immune to single-node degradation, enabling autonomous consensus and distributed cooperative mission execution.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/35c91ba3a0603c99720933d52bad4c73f9fdca5f-3000x1500.jpg"
    },
    {
      title: "06 // Expeditionary Logistics",
      subtitle: "Zero Specialized Ground Infrastructure Required",
      desc: "Austere-field deployment capability containerized in standard military pallet footprints, enabling launch and operation without specialized runways or depot tooling.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/16113e3a588bd30e5c67bf2ee6d7a0847845fb28-3000x3000.jpg"
    },
    {
      title: "07 // Sovereign Tooling",
      subtitle: "Software-Defined Precision Assembly & Mass Production",
      desc: "Arsenal-scale automated manufacturing workcells guided by digital twin simulations, delivering rapid aerospace-grade serial production at a fraction of traditional lead times.",
      image: "/_external/cdn.sanity.io/images/61nocsj5/production/a005eecc853d709de52769704c0a6cc1083ac7c4-1131x630.png"
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

  function updateHomeContent() {
    var p = (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, "")) || "/";
    var onHome = (p === "" || p === "/" || p === "/index.html");
    if (!onHome) {
      var stats = document.getElementById("conrad-company-stats");
      if (stats) stats.remove();
      return;
    }

    // 1. Mount Stats Section right below FeaturedAnnouncementSlice or HomeHero
    var videoSlice = document.querySelector(".FeaturedAnnouncementSlice");
    var homeHero = document.querySelector(".HomeHero");
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
                        <div class="conrad-stat-val">${s.value}</div>
                        <div class="conrad-stat-label">${s.label}</div>
                      </div>
                      <div class="conrad-stat-sub">${s.sub}</div>
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
    var cards = document.querySelectorAll(".FeaturedProductsCard");
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
      }
    });
  }

  function attachCardListeners() {
    var p = (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, "")) || "/";
    if (p !== "" && p !== "/" && p !== "/index.html") return;
    ensureModalDOM();
    updateHomeContent();

    var cards = document.querySelectorAll(".FeaturedProductsCard");
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
