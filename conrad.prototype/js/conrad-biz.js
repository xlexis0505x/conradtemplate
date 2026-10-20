/**
 * Conrad Prototype — Business Route Sections & Diligence Modal
 */

(function() {
  var doctrineHTML = `
  <section id="conrad-biz-doctrine" class="conrad-biz-section">
    <div class="conrad-biz-inner">
      <div class="conrad-biz-header">
        <div class="conrad-kicker">01 // COMMERCIAL DEFENSE DOCTRINE</div>
        <h2 class="conrad-section-title">Fixed-Price Defense vs. The Cost-Plus Trap</h2>
        <p class="conrad-section-lead">The traditional defense industrial base is constrained by outdated contracting incentives. Conrad delivers military capabilities with private capital efficiency.</p>
      </div>

      <div class="conrad-doctrine-grid">
        <div class="conrad-doctrine-card broken-card">
          <div class="doctrine-badge">THE BROKEN DEFENSE PARADIGM</div>
          <h3 class="doctrine-title">Legacy Cost-Plus Contracting</h3>
          <ul class="doctrine-list">
            <li><strong>Perverse Financial Incentives:</strong> Contractors bill costs plus a guaranteed profit percentage, directly rewarding delays and inflated budgets.</li>
            <li><strong>Multi-Year Component Lead Times:</strong> Bespoke custom military-spec semiconductors cause 24-to-36 month production delays.</li>
            <li><strong>Depot Maintenance Overhead:</strong> Proprietary hardware locks military customers into perpetual contractor logistics support.</li>
          </ul>
        </div>

        <div class="conrad-doctrine-card solution-card">
          <div class="doctrine-badge">THE CONRAD COMMERCIAL MODEL</div>
          <h3 class="doctrine-title">Fixed-Price Commercial Scale</h3>
          <ul class="doctrine-list">
            <li><strong>Privately Funded R&amp;D:</strong> We invest our own capital to design and validate platforms before offering them at fixed, predictable prices.</li>
            <li><strong>Automotive &amp; Commercial Supply Chains:</strong> Leveraging high-volume industrial suppliers to secure resilient, low-cost component pipelines.</li>
            <li><strong>Software-Defined Modularity:</strong> Autonomous software updates deploy over the air, eliminating costly hardware teardowns.</li>
          </ul>
          <div class="doctrine-img-wrap">
            <img src="/_external/cdn.sanity.io/images/61nocsj5/production/53ca8797832d67af5425ab4abdebd6233cbd441c-4000x2660.png" alt="Automated Commercial Aerospace Production" />
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  var economicsHTML = `
  <section id="conrad-biz-economics" class="conrad-biz-section">
    <div class="conrad-biz-inner">
      <div class="conrad-biz-header">
        <div class="conrad-kicker">02 // CAPITAL EFFICIENCY &amp; UNIT ECONOMICS</div>
        <h2 class="conrad-section-title">Hyperscale Manufacturing Learning Curve</h2>
        <p class="conrad-section-lead">As production volume accelerates, our software-first automated tooling drives aggressive unit cost deflation and expanding operating margins.</p>
      </div>

      <div class="conrad-economics-grid">
        <div class="conrad-econ-card">
          <div class="econ-img-wrap">
            <img src="/_external/cdn.sanity.io/images/61nocsj5/production/16113e3a588bd30e5c67bf2ee6d7a0847845fb28-3000x3000.jpg" alt="Phase 1 Airframe Prototyping" />
          </div>
          <div class="econ-stage">PHASE 1 // PROTOTYPING &amp; TEST</div>
          <div class="econ-cost">$1,200,000</div>
          <div class="econ-sub">PER AIRFRAME (UNITS 1 – 10)</div>
          <div class="econ-divider"></div>
          <div class="econ-meta">
            <div class="econ-row"><span>Production Cycle</span><span>60 Days</span></div>
            <div class="econ-row"><span>Assembly Method</span><span>Semi-Automated Layup</span></div>
            <div class="econ-row"><span>Milestone Target</span><span>Flight Envelope Clearance</span></div>
          </div>
        </div>

        <div class="conrad-econ-card">
          <div class="econ-img-wrap">
            <img src="/_external/cdn.sanity.io/images/61nocsj5/production/a005eecc853d709de52769704c0a6cc1083ac7c4-1131x630.png" alt="Phase 2 Robotic Workcell" />
          </div>
          <div class="econ-stage">PHASE 2 // LOW-RATE INITIAL PRODUCTION</div>
          <div class="econ-cost">$650,000</div>
          <div class="econ-sub">PER AIRFRAME (UNITS 11 – 100)</div>
          <div class="econ-divider"></div>
          <div class="econ-meta">
            <div class="econ-row"><span>Production Cycle</span><span>21 Days</span></div>
            <div class="econ-row"><span>Assembly Method</span><span>Hard Tooling &amp; Robotics</span></div>
            <div class="econ-row"><span>Milestone Target</span><span>DoD Operational Trials</span></div>
          </div>
        </div>

        <div class="conrad-econ-card highlight">
          <div class="econ-img-wrap">
            <img src="/_external/cdn.sanity.io/images/61nocsj5/production/362212f069102419e04043c85353fc572ead5649-4000x2660.png" alt="Phase 3 Hyperscale Flightline" />
          </div>
          <div class="econ-stage">PHASE 3 // FULL-RATE PRODUCTION (FRP)</div>
          <div class="econ-cost">$390,000</div>
          <div class="econ-sub">PER AIRFRAME (UNITS 100+)</div>
          <div class="econ-divider"></div>
          <div class="econ-meta">
            <div class="econ-row"><span>Production Cycle</span><span>14 Days</span></div>
            <div class="econ-row"><span>Gross Margin</span><span>58% Hardware / 82% SaaS</span></div>
            <div class="econ-row"><span>Milestone Target</span><span>Allied Defense Fleets</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  var factoryHTML = `
  <section id="conrad-biz-factory" class="conrad-biz-section">
    <div class="conrad-biz-inner">
      <div class="conrad-biz-header">
        <div class="conrad-kicker">03 // HYPERSCALE FACTORY FOOTPRINT</div>
        <h2 class="conrad-section-title">Modular Autonomous Assembly Cells</h2>
        <p class="conrad-section-lead">Decentralized, repeatable factory modules built for rapid geographic deployment across allied territories.</p>
      </div>

      <div class="conrad-factory-visual-wrap">
        <img src="/_external/cdn.sanity.io/images/61nocsj5/production/5769b611ee1f98af6b5ed02b0a0eb31ed6599318-4000x2660.png" alt="Modular Aerospace Factory Cleanroom" />
        <div class="factory-visual-badge">FACILITY SPEC // 50,000 SQ FT ADVANCED CELL</div>
      </div>

      <div class="conrad-factory-grid">
        <div class="conrad-factory-card">
          <div class="factory-num">50k</div>
          <div class="factory-unit">SQ FT PER PRODUCTION CELL</div>
          <h4 class="factory-title">Modular Factory Units</h4>
          <p class="factory-desc">Compact, capital-efficient assembly modules capable of producing 500 airframes annually without colossal capital outlays.</p>
        </div>

        <div class="conrad-factory-card">
          <div class="factory-num">92%</div>
          <div class="factory-unit">AUTOMATED LAYUP COVERAGE</div>
          <h4 class="factory-title">Robotic Composite Layup</h4>
          <p class="factory-desc">Precision robotic tape placement eliminates manual bottlenecks and ensures aerospace structural consistency across every hull.</p>
        </div>

        <div class="conrad-factory-card">
          <div class="factory-num">100%</div>
          <div class="factory-unit">FIVE EYES SUPPLY SOVEREIGNTY</div>
          <h4 class="factory-title">Sovereign Supply Chain</h4>
          <p class="factory-desc">Zero critical reliance on adversarial semiconductor or rare-earth supplies. Guaranteed component availability in contested scenarios.</p>
        </div>
      </div>
    </div>
  </section>
  `;

  var roadmapHTML = `
  <section id="conrad-biz-roadmap" class="conrad-biz-section">
    <div class="conrad-biz-inner">
      <div class="conrad-biz-header">
        <div class="conrad-kicker">04 // PROCUREMENT &amp; DEPLOYMENT ROADMAP</div>
        <h2 class="conrad-section-title">Phased Defense Acquisition Milestones</h2>
        <p class="conrad-section-lead">A proven, risk-mitigated progression from private prototype validation to allied fleet deployment.</p>
      </div>

      <div class="conrad-roadmap-track">
        <div class="conrad-roadmap-item">
          <div class="roadmap-phase">PHASE I // Q4 2024</div>
          <div class="roadmap-title">Aerodynamic Validation</div>
          <div class="roadmap-desc">Subscale aerodynamic flight testing, Mach 0.85 dash clearance, and autonomous stall recovery algorithms successfully completed.</div>
        </div>
        <div class="conrad-roadmap-item">
          <div class="roadmap-phase">PHASE II // Q2 2025</div>
          <div class="roadmap-title">Subsystem Integration</div>
          <div class="roadmap-desc">Full integration of the DRUNKEAST modular electronics, conformal AESA radar suite, and hybrid loiter powerplant.</div>
        </div>
        <div class="conrad-roadmap-item">
          <div class="roadmap-phase active">PHASE III // Q3 2026 [ACTIVE]</div>
          <div class="roadmap-title">DoD DIU Prototype Award</div>
          <div class="roadmap-desc">Live-fire operational demonstration in electronic-warfare contested maritime and land corridors with Defense Innovation Unit partners.</div>
        </div>
        <div class="conrad-roadmap-item">
          <div class="roadmap-phase">PHASE IV // Q1 2027</div>
          <div class="roadmap-title">Low-Rate Initial Production</div>
          <div class="roadmap-desc">First 50-unit production run delivered under fixed-price procurement contract for forward-deployed theater evaluations.</div>
        </div>
        <div class="conrad-roadmap-item">
          <div class="roadmap-phase">PHASE V // 2028</div>
          <div class="roadmap-title">Full-Rate &amp; Allied Export</div>
          <div class="roadmap-desc">Scaled 500 unit/year factory output with export authorization to NATO, Five Eyes, and Indo-Pacific partner nations.</div>
        </div>
      </div>
    </div>
  </section>
  `;

  var diligenceModalHTML = `
  <section id="conrad-biz-modal-cta" class="conrad-cta-section">
    <div class="conrad-cta-inner">
      <div class="conrad-kicker">05 // ACCREDITED INVESTOR RELATIONS</div>
      <h2 class="conrad-cta-title">Confidential Diligence &amp; Data Room</h2>
      <p class="conrad-cta-lead">
        Accredited institutional defense investors, prime contractors, and government acquisition authorities may request encrypted access to the Conrad technical data package, financial models, and full pitch deck.
      </p>
      <button id="conrad-open-diligence-btn" class="conrad-diligence-btn">
        <span>REQUEST PITCH DECK &amp; DATA ROOM</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
      </button>
    </div>
  </section>

  <!-- In-Situ Diligence Modal Overlay -->
  <div id="conrad-diligence-modal" class="conrad-modal-overlay" aria-hidden="true">
    <div class="conrad-modal-backdrop" id="conrad-modal-backdrop"></div>
    <div class="conrad-modal-window">
      <div class="conrad-modal-header">
        <div>
          <div class="conrad-kicker">ENCRYPTED DILIGENCE PORTAL</div>
          <h3 class="conrad-modal-title">Investor Deck &amp; Data Room</h3>
        </div>
        <button id="conrad-close-modal-btn" class="conrad-modal-close" aria-label="Close modal">&times;</button>
      </div>
      <form id="conrad-diligence-form" class="conrad-modal-form" onsubmit="return false;">
        <div class="conrad-form-row">
          <div class="conrad-field">
            <label for="diligence-name">FULL NAME</label>
            <input type="text" id="diligence-name" required placeholder="Alex Smith" />
          </div>
          <div class="conrad-field">
            <label for="diligence-firm">INSTITUTION / FUND / AGENCY</label>
            <input type="text" id="diligence-firm" required placeholder="Founders Fund / US Navy DIU" />
          </div>
        </div>
        <div class="conrad-form-row">
          <div class="conrad-field">
            <label for="diligence-email">OFFICIAL WORK EMAIL</label>
            <input type="email" id="diligence-email" required placeholder="alex@institution.com" />
          </div>
          <div class="conrad-field">
            <label for="diligence-tier">ACCREDITATION TIER</label>
            <select id="diligence-tier" required>
              <option value="institutional-fund">Institutional Defense / Venture LP</option>
              <option value="prime-contractor">Defense Prime Contractor Integration</option>
              <option value="government-dod">DoD / Allied Acquisition Program</option>
              <option value="family-office">Accredited Single Family Office</option>
            </select>
          </div>
        </div>
        <div class="conrad-form-actions">
          <button type="submit" id="diligence-submit-btn" class="conrad-submit-btn">SUBMIT REQUEST</button>
        </div>
        <div id="diligence-success-msg" class="conrad-success-msg" style="display:none;">
          &check; Request received. Our Investor Relations team will review your credentials and issue encrypted data room credentials within 24 hours.
        </div>
      </form>
    </div>
  </div>
  `;

  function isBizRoute() {
    var p = window.location.pathname.replace(/\/$/, "") || "/";
    return p === "/business" || p.startsWith("/business/");
  }

  function ensureBizTrack() {
    var onBiz = isBizRoute();
    var doctrine = document.getElementById("conrad-biz-doctrine");
    var economics = document.getElementById("conrad-biz-economics");
    var factory = document.getElementById("conrad-biz-factory");
    var roadmap = document.getElementById("conrad-biz-roadmap");
    var ctaModal = document.getElementById("conrad-biz-modal-cta");
    var contactSec = document.getElementById("conrad-biz-contact");

    if (contactSec) contactSec.remove();

    if (!onBiz) {
      if (doctrine) doctrine.remove();
      if (economics) economics.remove();
      if (factory) factory.remove();
      if (roadmap) roadmap.remove();
      if (ctaModal) ctaModal.remove();
      return;
    }

    var richText = document.querySelector(".TwoColumnRichText");
    var header = document.querySelector(".ProductHeaderSlice");
    var main = document.querySelector("main");

    var anchor = richText || header || main;
    if (!anchor) return;

    var newlyMounted = false;

    // 1. Mount Doctrine
    if (!doctrine) {
      var w1 = document.createElement("div");
      w1.innerHTML = doctrineHTML;
      doctrine = w1.firstElementChild;
      if (richText && richText.nextSibling) {
        richText.parentNode.insertBefore(doctrine, richText.nextSibling);
      } else if (header && header.nextSibling) {
        header.parentNode.insertBefore(doctrine, header.nextSibling);
      } else if (main) {
        main.appendChild(doctrine);
      }
      newlyMounted = true;
    }

    // 2. Mount Economics
    if (!economics && doctrine) {
      var w2 = document.createElement("div");
      w2.innerHTML = economicsHTML;
      economics = w2.firstElementChild;
      doctrine.parentNode.insertBefore(economics, doctrine.nextSibling);
      newlyMounted = true;
    }

    // 3. Mount Factory
    if (!factory && economics) {
      var w3 = document.createElement("div");
      w3.innerHTML = factoryHTML;
      factory = w3.firstElementChild;
      economics.parentNode.insertBefore(factory, economics.nextSibling);
      newlyMounted = true;
    }

    // 4. Mount Roadmap
    if (!roadmap && factory) {
      var w4 = document.createElement("div");
      w4.innerHTML = roadmapHTML;
      roadmap = w4.firstElementChild;
      factory.parentNode.insertBefore(roadmap, factory.nextSibling);
      newlyMounted = true;
    }

    // 5. Mount Diligence Modal CTA
    if (!ctaModal && roadmap) {
      var w5 = document.createElement("div");
      w5.innerHTML = diligenceModalHTML;
      ctaModal = w5.firstElementChild;
      var modalOverlay = w5.lastElementChild;
      roadmap.parentNode.insertBefore(ctaModal, roadmap.nextSibling);
      if (!document.getElementById("conrad-diligence-modal")) {
        document.body.appendChild(modalOverlay);
        bindModalEvents();
      }
      newlyMounted = true;
    }

    if (newlyMounted && window.Global && Global.lenis) {
      Global.lenis.resize();
    }
  }

  function bindModalEvents() {
    var openBtn = document.getElementById("conrad-open-diligence-btn");
    var closeBtn = document.getElementById("conrad-close-modal-btn");
    var backdrop = document.getElementById("conrad-modal-backdrop");
    var modal = document.getElementById("conrad-diligence-modal");
    var form = document.getElementById("conrad-diligence-form");
    var success = document.getElementById("diligence-success-msg");

    function openModal() {
      if (modal) {
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
    }

    function closeModal() {
      if (modal) {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    }

    if (openBtn) openBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    window.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && modal && modal.classList.contains("open")) {
        closeModal();
      }
    });

    if (form) {
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        var submitBtn = document.getElementById("diligence-submit-btn");
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = "VERIFYING CREDENTIALS...";
        }
        setTimeout(function() {
          if (success) success.style.display = "block";
          if (submitBtn) {
            submitBtn.innerText = "REQUEST SUBMITTED";
          }
          setTimeout(closeModal, 2500);
        }, 800);
      });
    }
  }

  window.ensureBizTrack = ensureBizTrack;
  if (window.Conrad) window.Conrad.ensureBizTrack = ensureBizTrack;

  window.addEventListener("conrad-locationchange", ensureBizTrack);
  window.addEventListener("popstate", ensureBizTrack);

  if (document.readyState === "complete" || document.readyState === "interactive") {
    ensureBizTrack();
  } else {
    document.addEventListener("DOMContentLoaded", ensureBizTrack);
  }
})();
