/**
 * Conrad Prototype — Technology Route Specifications Matrix & Comparison Table
 * Deep-sea marine engineering specs, 6,000m pressure tolerance, ADCP telemetry.
 */

(function() {
  function getTechData() {
    var globalTech = (window.Conrad && Conrad.CONTENT_GLOBAL && Conrad.CONTENT_GLOBAL.tech) || {};
    var tech = (window.Conrad && Conrad.content && Conrad.content.get("tech")) || {};

    return {
      kicker: tech.kicker || globalTech.kicker || "02 // INDUSTRIAL SPECIFICATIONS",
      title: tech.title || globalTech.title || "Subsea Technical Envelope & Tolerances",
      lead: tech.lead || globalTech.lead || "High-density physical metrics, 600-bar hydrostatic pressure ratings, and acoustic telemetry built to marine engineering standards with commercial agile deployment.",
      tabs: (tech.tabs && tech.tabs.length) ? tech.tabs : (globalTech.tabs || [
        { filter: "all", label: "ALL" },
        { filter: "chassis", label: "CHASSIS & SLED" },
        { filter: "dosing", label: "DISPENSER MANIFOLD" },
        { filter: "sensing", label: "ACOUSTIC SENSORS" },
        { filter: "materials", label: "MATERIALS & PRESSURE" },
        { filter: "interfaces", label: "SUBSEA INTERFACES" }
      ]),
      schematics: (tech.schematics && tech.schematics.length) ? tech.schematics : (globalTech.schematics || []),
      specs: (tech.specs && tech.specs.length) ? tech.specs : (globalTech.specs || []),
      comparison: tech.comparison || globalTech.comparison || {}
    };
  }

  function generateTechHTML() {
    var data = getTechData();
    var brand = (window.Conrad && Conrad.content && Conrad.content.get("brandName")) || "DRUNKEAST";
    var comp = data.comparison || {};
    var compHeaders = comp.headers || {
      metric: "PERFORMANCE DIMENSION",
      conrad: brand + " SYSTEM",
      legacy: "LEGACY UNMITIGATED / PASSIVE"
    };
    var compRows = comp.rows || [];

    var specMatrixHTML = `
    <section id="conrad-tech-spec-matrix" class="conrad-spec-section">
      <div class="conrad-spec-inner">
        <div class="conrad-spec-header">
          <div class="conrad-kicker">${data.kicker}</div>
          <h2 class="conrad-section-title">${data.title}</h2>
          <p class="conrad-section-lead">${data.lead}</p>
          
          <div class="conrad-spec-tabs" role="tablist">
            ${data.tabs.map(function(t, idx) {
              return `<button class="conrad-spec-tab ${idx === 0 ? 'active' : ''}" data-filter="${t.filter}">${t.label}</button>`;
            }).join("")}
          </div>
        </div>

        <div class="conrad-spec-preview-panel">
          ${data.schematics.map(function(s, idx) {
            return `
              <div class="conrad-schematic-card ${idx === 0 ? 'active' : ''}" data-schematic="${s.schematic}">
                <div class="schematic-media-wrap">
                  <img src="${s.image}" alt="${s.title}" />
                  <div class="schematic-badge">${s.badge}</div>
                </div>
                <div class="schematic-meta-row">
                  <span class="meta-title">${s.title}</span>
                  <span class="meta-tag">${s.tag}</span>
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <div class="conrad-spec-table" id="conrad-spec-table">
          ${data.specs.map(function(sp) {
            return `
              <div class="conrad-spec-row" data-category="${sp.category}">
                <span class="conrad-spec-param">${sp.param}</span>
                <span class="conrad-spec-val">${sp.val}</span>
                <span class="conrad-spec-meta">${sp.meta}</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </section>
    `;

    var comparisonHTML = `
    <section id="conrad-tech-comparison" class="conrad-compare-section">
      <div class="conrad-compare-inner">
        <div class="conrad-compare-header">
          <div class="conrad-kicker">${comp.kicker || "03 // STRATEGIC ADVANTAGE"}</div>
          <h2 class="conrad-section-title">${comp.title || "In-Situ Active Mitigation vs. Legacy Operations"}</h2>
          <p class="conrad-section-lead">${comp.lead || "A direct operational and environmental comparison of active chemical sediment flocculation against unmitigated mining discharge and passive post-hoc monitoring."}</p>
        </div>

        <div class="conrad-compare-table-wrap">
          <table class="conrad-compare-table">
            <thead>
              <tr>
                <th class="col-metric">${compHeaders.metric || "PERFORMANCE DIMENSION"}</th>
                <th class="col-conrad">${compHeaders.conrad || brand + " SYSTEM"}</th>
                <th class="col-legacy">${compHeaders.legacy || "LEGACY UNMITIGATED / PASSIVE"}</th>
              </tr>
            </thead>
            <tbody>
              ${compRows.map(function(r) {
                return `
                  <tr>
                    <td class="col-metric">${r.metric}</td>
                    <td class="col-conrad">${r.conrad}</td>
                    <td class="col-legacy">${r.legacy}</td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    `;

    return {
      specMatrixHTML: specMatrixHTML,
      comparisonHTML: comparisonHTML
    };
  }

  function isTechRoute() {
    var p = (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, "")) || "/";
    return p === "/technology" || p.startsWith("/technology/");
  }

  var currentMountedEdition = null;

  function ensureTechSections() {
    var onTech = isTechRoute();
    var specMatrix = document.getElementById("conrad-tech-spec-matrix");
    var compareSec = document.getElementById("conrad-tech-comparison");

    if (!onTech) {
      if (specMatrix) specMatrix.remove();
      if (compareSec) compareSec.remove();
      currentMountedEdition = null;
      return;
    }

    var p3d = document.querySelector(".Product3DSlice");
    var variations = document.querySelector(".ProductVariationsSlice");
    var header = document.querySelector(".ProductHeaderSlice");
    var qualities = document.querySelector(".ProductQualitiesSlice");

    var anchor = qualities || p3d || variations || header;
    if (!anchor) return;

    var activeEdition = (window.Conrad && Conrad.edition) || "global";
    var needsRebuild = (currentMountedEdition !== activeEdition);

    if (needsRebuild && specMatrix) {
      specMatrix.remove();
      if (compareSec) compareSec.remove();
      specMatrix = null;
      compareSec = null;
    }

    currentMountedEdition = activeEdition;
    var htmlBlocks = generateTechHTML();
    var newlyMounted = false;

    if (!specMatrix) {
      var w = document.createElement("div");
      w.innerHTML = htmlBlocks.specMatrixHTML;
      specMatrix = w.firstElementChild;
      if (qualities) {
        qualities.parentNode.insertBefore(specMatrix, qualities);
      } else if (p3d && p3d.nextSibling) {
        p3d.parentNode.insertBefore(specMatrix, p3d.nextSibling);
      } else if (variations && variations.nextSibling) {
        variations.parentNode.insertBefore(specMatrix, variations.nextSibling);
      } else if (header && header.nextSibling) {
        header.parentNode.insertBefore(specMatrix, header.nextSibling);
      }
      bindSpecTabs();
      newlyMounted = true;
    } else {
      if (qualities && specMatrix.nextElementSibling !== qualities && specMatrix !== qualities) {
        if (!compareSec || specMatrix.nextElementSibling !== compareSec || compareSec.nextElementSibling !== qualities) {
          qualities.parentNode.insertBefore(specMatrix, qualities);
        }
      } else if (!qualities && p3d && p3d.nextElementSibling !== specMatrix) {
        p3d.parentNode.insertBefore(specMatrix, p3d.nextSibling);
      }
    }

    if (!compareSec && specMatrix) {
      var w2 = document.createElement("div");
      w2.innerHTML = htmlBlocks.comparisonHTML;
      compareSec = w2.firstElementChild;
      specMatrix.parentNode.insertBefore(compareSec, specMatrix.nextSibling);
      newlyMounted = true;
    } else if (compareSec && specMatrix) {
      if (compareSec.previousElementSibling !== specMatrix) {
        specMatrix.parentNode.insertBefore(compareSec, specMatrix.nextSibling);
      }
    }

    if (newlyMounted && window.Global && Global.lenis) {
      Global.lenis.resize();
    }
  }

  function bindSpecTabs() {
    var tabs = document.querySelectorAll(".conrad-spec-tab");
    var rows = document.querySelectorAll(".conrad-spec-row");
    var schematics = document.querySelectorAll(".conrad-schematic-card");

    tabs.forEach(function(tab) {
      tab.addEventListener("click", function() {
        if (tab.classList.contains("active")) return;

        tabs.forEach(function(t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var filter = tab.getAttribute("data-filter");

        // 1. Crossfade schematic preview cards
        schematics.forEach(function(card) {
          if (card.getAttribute("data-schematic") === filter) {
            card.classList.add("active");
          } else {
            card.classList.remove("active");
          }
        });

        // 2. Filter spec rows with smooth staggered slide-in
        var matchingRows = [];
        var nonMatchingRows = [];

        rows.forEach(function(r) {
          if (filter === "all" || r.getAttribute("data-category") === filter) {
            matchingRows.push(r);
          } else {
            nonMatchingRows.push(r);
          }
        });

        // Instantly hide non-matching rows to eliminate dead space
        nonMatchingRows.forEach(function(r) {
          r.style.setProperty("display", "none", "important");
          r.style.opacity = "0";
        });

        // Reveal matching rows with staggered entrance
        matchingRows.forEach(function(r) {
          r.style.setProperty("display", "grid", "important");
        });

        if (window.gsap) {
          gsap.killTweensOf(matchingRows);
          gsap.fromTo(matchingRows, 
            { opacity: 0, y: 8 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.35, 
              stagger: 0.035, 
              ease: "power2.out",
              clearProps: "transform"
            }
          );
        } else {
          matchingRows.forEach(function(r, index) {
            setTimeout(function() {
              r.style.opacity = "1";
            }, index * 30);
          });
        }

        if (window.Global && Global.lenis) {
          Global.lenis.resize();
        }
      });
    });
  }

  window.ensureTechSections = ensureTechSections;
  if (window.Conrad) window.Conrad.ensureTechSections = ensureTechSections;

  window.addEventListener("conrad-locationchange", ensureTechSections);
  window.addEventListener("popstate", ensureTechSections);

  var lastTechRoute = null;
  function checkTechRoute() {
    var p = (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, "")) || "/";
    var specMatrix = document.getElementById("conrad-tech-spec-matrix");
    var activeEdition = (window.Conrad && Conrad.edition) || "global";
    if (p.includes("technology") && (!specMatrix || currentMountedEdition !== activeEdition)) {
      ensureTechSections();
    }
  }
  setInterval(checkTechRoute, 150);

  if (document.readyState === "complete" || document.readyState === "interactive") {
    ensureTechSections();
  } else {
    document.addEventListener("DOMContentLoaded", ensureTechSections);
  }
})();
