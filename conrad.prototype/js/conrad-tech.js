/**
 * Conrad Prototype — Technology Route Specifications Matrix & Comparison Table
 */

(function() {
  var specMatrixHTML = `
  <section id="conrad-tech-spec-matrix" class="conrad-spec-section">
    <div class="conrad-spec-inner">
      <div class="conrad-spec-header">
        <div class="conrad-kicker">02 // INDUSTRIAL SPECIFICATIONS</div>
        <h2 class="conrad-section-title">Technical Envelope &amp; Tolerances</h2>
        <p class="conrad-section-lead">High-density physical metrics, structural tolerances, and interface protocols built to military standards with commercial manufacturing agility.</p>
        
        <div class="conrad-spec-tabs" role="tablist">
          <button class="conrad-spec-tab active" data-filter="all" role="tab" aria-selected="true" aria-controls="panel-all">ALL</button>
          <button class="conrad-spec-tab" data-filter="airframe" role="tab" aria-selected="false" aria-controls="panel-airframe">AIRFRAME</button>
          <button class="conrad-spec-tab" data-filter="propulsion" role="tab" aria-selected="false" aria-controls="panel-propulsion">PROPULSION</button>
          <button class="conrad-spec-tab" data-filter="avionics" role="tab" aria-selected="false" aria-controls="panel-avionics">AVIONICS</button>
          <button class="conrad-spec-tab" data-filter="materials" role="tab" aria-selected="false" aria-controls="panel-materials">MATERIALS</button>
          <button class="conrad-spec-tab" data-filter="interfaces" role="tab" aria-selected="false" aria-controls="panel-interfaces">INTERFACES</button>
        </div>
      </div>

      <div class="conrad-spec-preview-panel">
        <!-- Schematic Card for ALL -->
        <div class="conrad-schematic-card active" data-schematic="all" id="panel-all">
          <div class="schematic-media-wrap">
            <img src="/_external/cdn.sanity.io/images/61nocsj5/production/273b69f85bec5374015642647464223b0501a17f-4000x2660.png" alt="Platform Overview CAD Blueprint" />
            <div class="schematic-badge">SYSTEM CAD // OVERVIEW</div>
          </div>
          <div class="schematic-meta-row">
            <span class="meta-title">CONRAD A-1 GENERAL AVIATION ARCHITECTURE</span>
            <span class="meta-tag">MIL-STD-810H CERTIFIED</span>
          </div>
        </div>
        <!-- Schematic Card for AIRFRAME -->
        <div class="conrad-schematic-card" data-schematic="airframe" id="panel-airframe">
          <div class="schematic-media-wrap">
            <img src="/_external/cdn.sanity.io/images/61nocsj5/production/c79ccecf787d455420edb440cbc7bf6a114cc680-882x878.png" alt="Airframe Composite Monocoque" />
            <div class="schematic-badge">STRUCTURAL CAD // MONOCOQUE</div>
          </div>
          <div class="schematic-meta-row">
            <span class="meta-title">UNITARY CARBON-COMPOSITE AEROSTRUCTURE</span>
            <span class="meta-tag">LOW-OBSERVABLE AIRFRAME</span>
          </div>
        </div>
        <!-- Schematic Card for PROPULSION -->
        <div class="conrad-schematic-card" data-schematic="propulsion" id="panel-propulsion">
          <div class="schematic-media-wrap">
            <img src="/_external/cdn.sanity.io/images/61nocsj5/production/9ea5ae8181d48c78365c6f8d8e3f3f35208e5f55-3000x2000.jpg" alt="Turbofan Propulsion Cycle" />
            <div class="schematic-badge">THERMAL CAD // MICRO-TURBOFAN</div>
          </div>
          <div class="schematic-meta-row">
            <span class="meta-title">HIGH-EFFICIENCY HYBRID TURBINE CYCLE</span>
            <span class="meta-tag">48H ACOUSTIC LOITER</span>
          </div>
        </div>
        <!-- Schematic Card for AVIONICS -->
        <div class="conrad-schematic-card" data-schematic="avionics" id="panel-avionics">
          <div class="schematic-media-wrap">
            <img src="/_external/cdn.sanity.io/images/61nocsj5/production/d23c6903421f10c7191873592b8e823362fecbe8-882x878.png" alt="Avionics Sensor Fusion Bay" />
            <div class="schematic-badge">SENSOR CAD // TACTICAL EDGE</div>
          </div>
          <div class="schematic-meta-row">
            <span class="meta-title">CONRAD EDGE NEURAL COMPUTE &amp; ESM ARRAY</span>
            <span class="meta-tag">ZERO-GPS CELESTIAL NAV</span>
          </div>
        </div>
        <!-- Schematic Card for MATERIALS -->
        <div class="conrad-schematic-card" data-schematic="materials" id="panel-materials">
          <div class="schematic-media-wrap">
            <img src="/_external/cdn.sanity.io/images/61nocsj5/production/a005eecc853d709de52769704c0a6cc1083ac7c4-1131x630.png" alt="Precision Composite Tooling" />
            <div class="schematic-badge">MATERIALS CAD // RADAR ABSORBENT</div>
          </div>
          <div class="schematic-meta-row">
            <span class="meta-title">ADVANCED HIGH-TG BMI RESIN COMPOSITE</span>
            <span class="meta-tag">92% ROBOTIC FIBER PLACEMENT</span>
          </div>
        </div>
        <!-- Schematic Card for INTERFACES -->
        <div class="conrad-schematic-card" data-schematic="interfaces" id="panel-interfaces">
          <div class="schematic-media-wrap">
            <img src="/_external/cdn.sanity.io/images/61nocsj5/production/955e14dfee80e6022b1744580b6996cd435c6153-976x1952.jpg" alt="Payload Rail Interface" />
            <div class="schematic-badge">PAYLOAD CAD // NATO STD RAIL</div>
          </div>
          <div class="schematic-meta-row">
            <span class="meta-title">MIL-STD-1760 DIGITAL UMBILICAL INTERFACE</span>
            <span class="meta-tag">15-MIN SWAP ARCHITECTURE</span>
          </div>
        </div>
      </div>

      <div class="conrad-spec-table" id="conrad-spec-table">
        <div class="conrad-spec-row" data-category="airframe">
          <span class="conrad-spec-param">WINGSPAN</span>
          <span class="conrad-spec-val">7.20 m / 23.6 ft</span>
          <span class="conrad-spec-meta">[ TOLERANCE: &plusmn;0.5mm ]</span>
        </div>
        <div class="conrad-spec-row" data-category="airframe">
          <span class="conrad-spec-param">FUSELAGE LENGTH</span>
          <span class="conrad-spec-val">5.40 m / 17.7 ft</span>
          <span class="conrad-spec-meta">[ MONOCOQUE COMPOSITE ]</span>
        </div>
        <div class="conrad-spec-row" data-category="airframe">
          <span class="conrad-spec-param">OVERALL HEIGHT</span>
          <span class="conrad-spec-val">1.45 m / 4.75 ft</span>
          <span class="conrad-spec-meta">[ LOW SILHOUETTE ]</span>
        </div>
        <div class="conrad-spec-row" data-category="airframe">
          <span class="conrad-spec-param">DRY WEIGHT</span>
          <span class="conrad-spec-val">420 kg / 925 lbs</span>
          <span class="conrad-spec-meta">[ SCALED STRUCTURE ]</span>
        </div>
        <div class="conrad-spec-row" data-category="airframe">
          <span class="conrad-spec-param">MAX TAKEOFF WEIGHT (MTOW)</span>
          <span class="conrad-spec-val">1,150 kg / 2,535 lbs</span>
          <span class="conrad-spec-meta">[ FULL FUEL + PAYLOAD ]</span>
        </div>

        <div class="conrad-spec-row" data-category="propulsion">
          <span class="conrad-spec-param">DASH CRUISE SPEED</span>
          <span class="conrad-spec-val">Mach 0.85 (560 KTAS)</span>
          <span class="conrad-spec-meta">[ TRANSONIC ENVELOPE ]</span>
        </div>
        <div class="conrad-spec-row" data-category="propulsion">
          <span class="conrad-spec-param">COMBAT RADIUS</span>
          <span class="conrad-spec-val">1,200 nm / 2,220 km</span>
          <span class="conrad-spec-meta">[ UNREFUELED RADIUS ]</span>
        </div>
        <div class="conrad-spec-row" data-category="propulsion">
          <span class="conrad-spec-param">SERVICE CEILING</span>
          <span class="conrad-spec-val">45,000 ft MSL</span>
          <span class="conrad-spec-meta">[ HIGH-ALTITUDE LOITER ]</span>
        </div>
        <div class="conrad-spec-row" data-category="propulsion">
          <span class="conrad-spec-param">SILENT LOITER ENDURANCE</span>
          <span class="conrad-spec-val">48.0 Hours</span>
          <span class="conrad-spec-meta">[ HYBRID-ELECTRIC CYCLE ]</span>
        </div>

        <div class="conrad-spec-row" data-category="avionics">
          <span class="conrad-spec-param">PRIMARY RADAR</span>
          <span class="conrad-spec-val">Conformal AESA Phased Array</span>
          <span class="conrad-spec-meta">[ MULTI-BAND X/Ku ]</span>
        </div>
        <div class="conrad-spec-row" data-category="avionics">
          <span class="conrad-spec-param">OPTICAL SURVEILLANCE</span>
          <span class="conrad-spec-val">Dual-Band MWIR / SWIR / HD-EO Gimbal</span>
          <span class="conrad-spec-meta">[ 360&deg; STABILIZED ]</span>
        </div>
        <div class="conrad-spec-row" data-category="avionics">
          <span class="conrad-spec-param">ESM SPECTRUM COVERAGE</span>
          <span class="conrad-spec-val">0.5 GHz to 40.0 GHz Wideband</span>
          <span class="conrad-spec-meta">[ PASSIVE INTERCEPT ]</span>
        </div>
        <div class="conrad-spec-row" data-category="avionics">
          <span class="conrad-spec-param">AUTONOMY ARCHITECTURE</span>
          <span class="conrad-spec-val">Level 4 Tactical Edge Inference</span>
          <span class="conrad-spec-meta">[ ZERO-GPS CELESTIAL ]</span>
        </div>

        <div class="conrad-spec-row" data-category="materials">
          <span class="conrad-spec-param">PRIMARY METALLURGY</span>
          <span class="conrad-spec-val">Anodized 6063-T6 &amp; Titanium Grade 5 Spars</span>
          <span class="conrad-spec-meta">[ CNC MACHINED ]</span>
        </div>
        <div class="conrad-spec-row" data-category="materials">
          <span class="conrad-spec-param">COMPOSITE MATRIX</span>
          <span class="conrad-spec-val">Toray T1000 High-Modulus Carbon-Epoxy</span>
          <span class="conrad-spec-meta">[ OUT-OF-AUTOCLAVE ]</span>
        </div>
        <div class="conrad-spec-row" data-category="materials">
          <span class="conrad-spec-param">ENVIRONMENTAL RATING</span>
          <span class="conrad-spec-val">MIL-STD-810H &amp; IP67 Hermetic Ingress</span>
          <span class="conrad-spec-meta">[ SALT-FOG RESISTANT ]</span>
        </div>

        <div class="conrad-spec-row" data-category="interfaces">
          <span class="conrad-spec-param">PAYLOAD INTERFACE</span>
          <span class="conrad-spec-val">MIL-STD-1760 Electrical &amp; Mechanical Rail</span>
          <span class="conrad-spec-meta">[ 15-MIN QUICK-SWAP ]</span>
        </div>
        <div class="conrad-spec-row" data-category="interfaces">
          <span class="conrad-spec-param">CONTINUOUS BUS POWER</span>
          <span class="conrad-spec-val">15.0 kW (28V DC / 270V DC Dual Rail)</span>
          <span class="conrad-spec-meta">[ AUXILIARY BUS ]</span>
        </div>
        <div class="conrad-spec-row" data-category="interfaces">
          <span class="conrad-spec-param">SECURE DATALINK</span>
          <span class="conrad-spec-val">LPI/LPD Directional Mesh &amp; L/Ku SATCOM</span>
          <span class="conrad-spec-meta">[ ANTI-JAM SECURE ]</span>
        </div>
      </div>
    </div>
  </section>
  `;

  var comparisonHTML = `
  <section id="conrad-tech-comparison" class="conrad-compare-section">
    <div class="conrad-compare-inner">
      <div class="conrad-compare-header">
        <div class="conrad-kicker">03 // STRATEGIC ADVANTAGE</div>
        <h2 class="conrad-section-title">Conrad A-1 vs. Legacy Defense Platforms</h2>
        <p class="conrad-section-lead">A direct structural comparison of autonomous capabilities, procurement speed, and operational logistics against legacy prime contractors.</p>
      </div>

      <div class="conrad-compare-table-wrap">
        <table class="conrad-compare-table">
          <thead>
            <tr>
              <th class="col-metric">PERFORMANCE DIMENSION</th>
              <th class="col-conrad">CONRAD A-1 SYSTEM</th>
              <th class="col-legacy">LEGACY DEFENSE PRIMES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-metric">Unit Flyaway Cost</td>
              <td class="col-conrad"><strong>$450,000</strong> <span class="tag">40x REDUCTION</span></td>
              <td class="col-legacy">$18,500,000 (MQ-9 Block 5 Equivalent)</td>
            </tr>
            <tr>
              <td class="col-metric">Production Lead Time</td>
              <td class="col-conrad"><strong>14 Days</strong> <span class="tag">CONTINUOUS FLOW</span></td>
              <td class="col-legacy">24 Months (Traditional Defense Queue)</td>
            </tr>
            <tr>
              <td class="col-metric">Operator-to-System Ratio</td>
              <td class="col-conrad"><strong>1 Human : 16 Units</strong> <span class="tag">L4 AUTONOMY</span></td>
              <td class="col-legacy">4 Humans : 1 Drone (Heavy Crew Footprint)</td>
            </tr>
            <tr>
              <td class="col-metric">Software Mission Cycle</td>
              <td class="col-conrad"><strong>Weekly OTA Updates</strong> <span class="tag">RAPID CYCLE</span></td>
              <td class="col-legacy">3–5 Year Hardware Block Upgrades</td>
            </tr>
            <tr>
              <td class="col-metric">Deployment Logistics</td>
              <td class="col-conrad"><strong>Standard 20-Foot ISO Container</strong> <span class="tag">EXPEDITIONARY</span></td>
              <td class="col-legacy">Dedicated Heavy Cargo Aircraft (C-17)</td>
            </tr>
            <tr>
              <td class="col-metric">Supply Chain Sovereignty</td>
              <td class="col-conrad"><strong>100% US &amp; Five Eyes Sourced</strong> <span class="tag">SECURE</span></td>
              <td class="col-legacy">Fragile Multi-Tier Single-Source Bottlenecks</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
  `;

  function isTechRoute() {
    var p = (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, "")) || "/";
    return p === "/technology" || p.startsWith("/technology/");
  }

  function ensureTechSections() {
    var onTech = isTechRoute();
    var specMatrix = document.getElementById("conrad-tech-spec-matrix");
    var compareSec = document.getElementById("conrad-tech-comparison");

    if (!onTech) {
      if (specMatrix) specMatrix.remove();
      if (compareSec) compareSec.remove();
      return;
    }

    var p3d = document.querySelector(".Product3DSlice");
    var variations = document.querySelector(".ProductVariationsSlice");
    var header = document.querySelector(".ProductHeaderSlice");
    var qualities = document.querySelector(".ProductQualitiesSlice");

    // Must wait for Hydra slices to mount so custom sections never mount at the top of <main>
    var anchor = qualities || p3d || variations || header;
    if (!anchor) return;

    var newlyMounted = false;
    if (!specMatrix) {
      var w = document.createElement("div");
      w.innerHTML = specMatrixHTML;
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
      w2.innerHTML = comparisonHTML;
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

        tabs.forEach(function(t) {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
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

  if (document.readyState === "complete" || document.readyState === "interactive") {
    ensureTechSections();
  } else {
    document.addEventListener("DOMContentLoaded", ensureTechSections);
  }
})();
