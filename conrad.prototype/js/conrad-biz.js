/**
 * Conrad Prototype — Business Route Sections & Diligence Modal
 * Deep-sea mining commercial strategy, Cook Islands TAM/SAM/SOM, pipeline & PESTLE.
 */

(function() {

  function esc(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getBizData() {
    var globalBiz = (window.Conrad && Conrad.CONTENT_GLOBAL && Conrad.CONTENT_GLOBAL.biz) || {};
    var biz = (window.Conrad && Conrad.content && Conrad.content.get("biz")) || {};

    return {
      kicker: biz.kicker || globalBiz.kicker,
      title: biz.title || globalBiz.title,
      lead: biz.lead || globalBiz.lead,
      sizing: (biz.sizing && biz.sizing.cards && biz.sizing.cards.length) ? biz.sizing : (globalBiz.sizing || {}),
      pipeline: (biz.pipeline && biz.pipeline.regions && biz.pipeline.regions.length) ? biz.pipeline : (globalBiz.pipeline || {}),
      contractors: (biz.contractors && biz.contractors.length) ? biz.contractors : (globalBiz.contractors || []),
      pestle: (biz.pestle && biz.pestle.factors && biz.pestle.factors.length) ? biz.pestle : (globalBiz.pestle || {}),
      entryStrategy: biz.entryStrategy || globalBiz.entryStrategy,
      references: (biz.references && biz.references.length) ? biz.references : (globalBiz.references || [])
    };
  }

  function generateBizHTML() {
    var biz = getBizData();
    var brand = (window.Conrad && Conrad.content && Conrad.content.get("brandName")) || "DRUNKEAST";
    var isChina = (window.Conrad && Conrad.isChina);
    var sizingCards = (biz.sizing && biz.sizing.cards) || [];
    var pestleFactors = (biz.pestle && biz.pestle.factors) || [];
    var pipelineRegions = (biz.pipeline && biz.pipeline.regions) || [];
    var contractors = biz.contractors || [];

    var doctrineHTML = `
    <section id="conrad-biz-doctrine" class="conrad-biz-section">
      <div class="conrad-biz-inner">
        <div class="conrad-biz-header">
          <div class="conrad-kicker">${biz.kicker ? esc(biz.kicker) : "01 // COMMERCIAL STRATEGY &amp; VALUE PROPOSITION"}</div>
          <h2 class="conrad-section-title">${biz.title ? esc(biz.title) : "Unlocking the Environmental License to Operate"}</h2>
          <p class="conrad-section-lead">${biz.lead ? esc(biz.lead) : "Seabed mineral developers face an existential hurdle: without verifiable sediment plume control, regulatory bodies cannot grant commercial exploitation contracts. " + esc(brand) + " turns environmental compliance into a permitted, defensible asset."}</p>
        </div>

        <div class="conrad-doctrine-grid">
          <div class="conrad-doctrine-card broken-card">
            <div class="doctrine-badge">THE UNMITIGATED PLUME DILEMMA</div>
            <h3 class="doctrine-title">Uncontrolled Sediment Dispersion</h3>
            <ul class="doctrine-list">
              <li><strong>Existential Permitting Barrier:</strong> Commercial exploitation licences cannot be granted under ISA or Cook Islands regulations without demonstrated, verifiable plume containment.</li>
              <li><strong>Transboundary Drift Liability:</strong> Sub-micron clay plumes drift 50–100+ km in the oceanic water column, causing severe ecological damage and catastrophic reputational risk.</li>
              <li><strong>Post-Hoc Monitoring Deadlock:</strong> Passive sensor buoys merely observe damage without preventing it, risking sudden shut-down orders and stranded multimillion-dollar mining capex.</li>
            </ul>
          </div>

          <div class="conrad-doctrine-card solution-card">
            <div class="doctrine-badge">THE ${esc(brand)} PERMITTING MODEL</div>
            <h3 class="doctrine-title">In-Situ Chemical Flocculation</h3>
            <ul class="doctrine-list">
              <li><strong>Unlocking the License to Operate:</strong> We de-risk environmental approval by providing concession holders with certified, auditable sedimentation control data.</li>
              <li><strong>Accelerated Benthic Deposition:</strong> Non-toxic biodegradable biopolymer binds micro-particles into dense flocs, confining redeposition strictly to primary mining swaths.</li>
              <li><strong>Automated G09 &amp; ISA Telemetry:</strong> In-situ ADCP and optical backscatter sensors stream real-time compliance proof directly to maritime authorities and stakeholders.</li>
            </ul>
            <div class="doctrine-img-wrap">
              <img src="${(typeof window.qualifyUrl === 'function') ? window.qualifyUrl('/assets/images/subsea/benthic-collector.jpg') : '/assets/images/subsea/benthic-collector.jpg'}" alt="Deep-Sea Sediment Mitigation Operation" />
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
          <div class="conrad-kicker">${biz.sizing.kicker ? esc(biz.sizing.kicker) : "02 // MARKET SIZING &amp; EXPANSION RUNWAY"}</div>
          <h2 class="conrad-section-title">${biz.sizing.title ? esc(biz.sizing.title) : "From Island Testbed to Global Abyssal Concessions"}</h2>
          <p class="conrad-section-lead">${biz.sizing.lead ? esc(biz.sizing.lead) : "A structured beachhead strategy validating in-situ plume mitigation in the Cook Islands before expanding across global International Seabed Authority concessions."}</p>
        </div>

        <div class="conrad-runway-container">
          <div class="conrad-runway-track">
            ${sizingCards.map(function(card, idx) {
              var stepNum = "0" + (idx + 1);
              return `
                <div class="runway-step">
                  <div class="step-header">
                    <span class="step-num">${esc(stepNum)}</span>
                    <span class="step-stage">${esc(card.stage)}</span>
                  </div>
                  <div class="step-val">${esc(card.cost)}</div>
                  <div class="step-sub">${esc(card.sub)}</div>
                  <div class="step-divider"></div>
                  <div class="step-specs">
                    ${card.meta.map(function(m) {
                      return `
                        <div class="step-spec-row">
                          <span class="spec-label">${esc(m.label)}</span>
                          <span class="spec-data">${esc(m.value)}</span>
                        </div>
                      `;
                    }).join("")}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    </section>
    `;

    var factoryHTML = `
    <section id="conrad-biz-factory" class="conrad-biz-section">
      <div class="conrad-biz-inner">
        <div class="conrad-biz-header">
          <div class="conrad-kicker">${biz.pipeline.kicker ? esc(biz.pipeline.kicker) : "03 // ADDRESSABLE CONCESSION PIPELINE"}</div>
          <h2 class="conrad-section-title">${biz.pipeline.title ? esc(biz.pipeline.title) : "22 Global Seabed Concession Opportunities"}</h2>
          <p class="conrad-section-lead">${biz.pipeline.lead ? esc(biz.pipeline.lead) : "Identifiable contract opportunities spanning sovereign Pacific exclusive economic zones and International Seabed Authority (ISA) deep-ocean sectors."}</p>
        </div>

        <div class="conrad-registry-ledger">
          <div class="registry-ledger-header">
            <span class="col-reg-sector">SECTOR</span>
            <span class="col-reg-region">GEOGRAPHIC REGION</span>
            <span class="col-reg-operators">OPERATORS &amp; SPONSORS</span>
            <span class="col-reg-scale">EXPLORATION FOOTPRINT</span>
            <span class="col-reg-status">STATUS</span>
          </div>

          ${pipelineRegions.map(function(r, idx) {
            var num = "0" + (idx + 1);
            return `
              <div class="registry-ledger-row">
                <div class="col-reg-sector">
                  <span class="registry-num">${esc(num)}</span>
                  <span class="registry-tag">${esc(r.match)}</span>
                </div>
                <div class="col-reg-region">
                  <h3 class="registry-title">${esc(r.name)}</h3>
                  <p class="registry-desc">${esc(r.count)}</p>
                </div>
                <div class="col-reg-operators">
                  <span class="operator-primary">${esc(r.actors)}</span>
                </div>
                <div class="col-reg-scale">
                  <span class="scale-val">${esc(r.count)}</span>
                </div>
                <div class="col-reg-status">
                  <span class="status-text">${esc(r.match)}</span>
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <div class="conrad-contractors-section" style="margin-top: 2.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem; letter-spacing: 0.05em; text-transform: uppercase;">
            Deployment Pricing & Licensing Tiers
          </h3>
          <p style="font-size: 0.85rem; color: #8E9291; margin-bottom: 2rem;">
            Modular, scalable licensing designed for early-stage trial operators through full commercial extraction fleets. All tiers include full G09 & ISA compliance data streams — no add-ons, no hidden fees.
          </p>

          <div class="conrad-pricing-grid">

            <!-- TIER 1: PILOT -->
            <div class="conrad-pricing-card">
              <div class="pricing-tier-badge">PILOT TRIAL</div>
              <div class="pricing-price">
                <span class="pricing-currency">USD</span>
                <span class="pricing-amount">85K</span>
                <span class="pricing-period">/ 30-day trial</span>
              </div>
              <p class="pricing-tagline">Validate our system in your environment. Fully backed by a performance guarantee.</p>
              <div class="pricing-divider"></div>
              <ul class="pricing-features">
                <li><span class="pricing-check">✓</span> 1× benthic manifold skid deployment</li>
                <li><span class="pricing-check">✓</span> Dual ADCP + optical backscatter sensor suite</li>
                <li><span class="pricing-check">✓</span> Real-time compliance telemetry dashboard</li>
                <li><span class="pricing-check">✓</span> G09 & ISA-aligned environmental reporting package</li>
                <li><span class="pricing-check">✓</span> On-site technical commissioning support</li>
                <li><span class="pricing-check">✓</span> Performance SLA: >90% turbidity reduction or refund</li>
                <li class="pricing-excluded"><span class="pricing-cross">–</span> Fleet-wide integration</li>
                <li class="pricing-excluded"><span class="pricing-cross">–</span> Digital twin plume modeling</li>
              </ul>
              <a href="#contact" class="pricing-cta pricing-cta--outline">Request Trial Deployment →</a>
            </div>

            <!-- TIER 2: OPERATOR — FEATURED -->
            <div class="conrad-pricing-card conrad-pricing-card--featured">
              <div class="pricing-featured-label">MOST SELECTED</div>
              <div class="pricing-tier-badge pricing-tier-badge--featured">OPERATOR LICENSE</div>
              <div class="pricing-price">
                <span class="pricing-currency">USD</span>
                <span class="pricing-amount">340K</span>
                <span class="pricing-period">/ vessel · year</span>
              </div>
              <p class="pricing-tagline">Full operational deployment for active nodule collection vessels. The industry standard for ISA compliance.</p>
              <div class="pricing-divider"></div>
              <ul class="pricing-features">
                <li><span class="pricing-check">✓</span> Up to 3× manifold skids per collector</li>
                <li><span class="pricing-check">✓</span> Full ADCP + turbidity + hydrographic sensor array</li>
                <li><span class="pricing-check">✓</span> Real-time compliance telemetry & regulatory dashboard</li>
                <li><span class="pricing-check">✓</span> Digital twin plume dispersion modeling</li>
                <li><span class="pricing-check">✓</span> Automated EMMP reporting (G09, ISA, EIA-ready)</li>
                <li><span class="pricing-check">✓</span> 24/7 remote diagnostics & alert system</li>
                <li><span class="pricing-check">✓</span> Annual calibration + sensor refresh</li>
                <li><span class="pricing-check">✓</span> Dedicated account engineer</li>
              </ul>
              <a href="#contact" class="pricing-cta pricing-cta--primary">Get Operator Pricing →</a>
            </div>

            <!-- TIER 3: FLEET ENTERPRISE -->
            <div class="conrad-pricing-card">
              <div class="pricing-tier-badge">FLEET ENTERPRISE</div>
              <div class="pricing-price">
                <span class="pricing-currency"></span>
                <span class="pricing-amount" style="font-size: 2.2rem;">Custom</span>
                <span class="pricing-period">/ multi-vessel</span>
              </div>
              <p class="pricing-tagline">End-to-end environmental compliance infrastructure for full ISA concession-scale operations.</p>
              <div class="pricing-divider"></div>
              <ul class="pricing-features">
                <li><span class="pricing-check">✓</span> Unlimited manifold skid deployments</li>
                <li><span class="pricing-check">✓</span> Fleet-wide sensor fusion & unified data lake</li>
                <li><span class="pricing-check">✓</span> Multi-zone real-time plume monitoring</li>
                <li><span class="pricing-check">✓</span> Sovereign regulator reporting API (SBMA / ISA)</li>
                <li><span class="pricing-check">✓</span> Full digital twin + long-range drift prediction</li>
                <li><span class="pricing-check">✓</span> White-label environmental compliance reports</li>
                <li><span class="pricing-check">✓</span> On-site resident engineering team</li>
                <li><span class="pricing-check">✓</span> Priority SLA — 4-hour response guarantee</li>
              </ul>
              <a href="#contact" class="pricing-cta pricing-cta--outline">Contact for Fleet Proposal →</a>
            </div>

          </div>

          <div class="pricing-footnote">
            All pricing excludes vessel mobilisation costs, consumable biopolymer reagent supply (volume-tiered), and custom hardware configurations for non-standard collector architectures.
            <strong style="color: rgba(255,255,255,0.55);">Multi-vessel volume discounts available from 3+ vessels.</strong>
            Contact us at <a href="mailto:teamdrunkeast@gmail.com" class="contact-email" style="color: #01B1C7; text-decoration: none;">teamdrunkeast@gmail.com</a>.
          </div>
        </div>
      </div>
    </section>
    `;

    var roadmapHTML = `
    <section id="conrad-biz-roadmap" class="conrad-biz-section">
      <div class="conrad-biz-inner">
        <div class="conrad-biz-header">
          <div class="conrad-kicker">${biz.pestle.kicker ? esc(biz.pestle.kicker) : "04 // PESTLE STRATEGIC FRAMEWORK"}</div>
          <h2 class="conrad-section-title">${biz.pestle.title ? esc(biz.pestle.title) : "Sovereign, Ecological &amp; Regulatory Drivers"}</h2>
          <p class="conrad-section-lead">${biz.pestle.lead ? esc(biz.pestle.lead) : "A comprehensive macro-environmental evaluation anchoring our technology in legal frameworks, economic efficiency, and ocean preservation."}</p>
        </div>

        <div class="conrad-pestle-grid">
          ${pestleFactors.map(function(item, idx) {
            var num = "0" + (idx + 1);
            return `
              <div class="conrad-pestle-card">
                <div class="pestle-card-header">
                  <span class="pestle-num">${esc(num)} // ${esc(item.letter)}</span>
                  <span class="pestle-factor-tag">${esc(item.name)}</span>
                </div>
                <div class="pestle-divider"></div>
                <ul class="pestle-point-list">
                  ${item.points.map(function(pt) {
                    return `<li class="pestle-point-item"><span class="pestle-bullet">—</span><span>${esc(pt)}</span></li>`;
                  }).join("")}
                </ul>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </section>
    `;

    return {
      doctrineHTML: doctrineHTML,
      economicsHTML: economicsHTML,
      factoryHTML: factoryHTML,
      roadmapHTML: roadmapHTML
    };
  }

  function isBizRoute() {
    var p = (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, "")) || "/";
    return p === "/business" || p.startsWith("/business/");
  }

  var currentMountedEdition = null;

  function ensureBizTrack() {
    var onBiz = isBizRoute();
    var doctrine = document.getElementById("conrad-biz-doctrine");
    var economics = document.getElementById("conrad-biz-economics");
    var factory = document.getElementById("conrad-biz-factory");
    var roadmap = document.getElementById("conrad-biz-roadmap");
    var ctaModal = document.getElementById("conrad-biz-diligence");

    if (!onBiz) {
      if (doctrine) doctrine.remove();
      if (economics) economics.remove();
      if (factory) factory.remove();
      if (roadmap) roadmap.remove();
      if (ctaModal) ctaModal.remove();
      var modalEl = document.getElementById("conrad-diligence-modal");
      if (modalEl) modalEl.remove();
      currentMountedEdition = null;
      return;
    }

    var richText = document.querySelector(".TwoColumnRichText");
    var header = document.querySelector(".ProductHeaderSlice");
    if (!richText) return;
    var anchor = richText;

    var activeEdition = (window.Conrad && Conrad.edition) || "global";
    var isChina = (activeEdition === "china");

    // Update ProductHeaderSlice titles & details
    if (header) {
      var titleEl = header.querySelector("h1.titleWrapper span.title, .title");
      if (titleEl && titleEl.dataset.customizedEdition !== activeEdition) {
        titleEl.dataset.customizedEdition = activeEdition;
        titleEl.innerText = "Commercial Strategy & Scale";
      }
      var para = header.querySelector(".paragraph1");
      if (para && para.dataset.customizedEdition !== activeEdition) {
        para.dataset.customizedEdition = activeEdition;
        para.innerHTML = isChina ? `
          <p class="detail">Global Seabed Concessions Pipeline</p>
          <p class="detail">In-Situ Plume Mitigation & Permitting</p>
          <p class="detail">[Commercialization & Market Strategy]</p>
        ` : `
          <p class="detail">PACIFIC &amp; GLOBAL SEABED CONCESSIONS</p>
          <p class="detail">IN-SITU PLUME MITIGATION &amp; SEABED LICENSING</p>
          <p class="detail">[COMMERCIAL LICENSING ROADMAP]</p>
        `;
      }
      var paraHidden = header.querySelector(".paragraph1Hidden");
      if (paraHidden && paraHidden.dataset.customizedEdition !== activeEdition) {
        paraHidden.dataset.customizedEdition = activeEdition;
        paraHidden.innerHTML = isChina ? `
          <p class="detail" aria-hidden="true">Global Seabed Concessions Pipeline</p>
          <p class="detail" aria-hidden="true">In-Situ Plume Mitigation & Permitting</p>
          <p class="detail" aria-hidden="true">[Commercialization & Market Strategy]</p>
        ` : `
          <p class="detail" aria-hidden="true">PACIFIC &amp; GLOBAL SEABED CONCESSIONS</p>
          <p class="detail" aria-hidden="true">IN-SITU PLUME MITIGATION &amp; SEABED LICENSING</p>
          <p class="detail" aria-hidden="true">[COMMERCIAL LICENSING ROADMAP]</p>
        `;
      }
    }

    // Update TwoColumnRichText
    if (richText) {
      var col1 = richText.querySelector(".column1 p, .column1");
      if (col1 && col1.dataset.customizedEdition !== activeEdition) {
        col1.dataset.customizedEdition = activeEdition;
        col1.innerHTML = '<p class="detail">THE COMMERCIAL LICENSING MODEL</p>';
      }
      var col2 = richText.querySelector(".column2 p, .column2");
      if (col2 && col2.dataset.customizedEdition !== activeEdition) {
        col2.dataset.customizedEdition = activeEdition;
        col2.innerHTML = '<p>Autonomous In-Situ Sediment Control for Seabed Mining Concessions. Turning environmental compliance into a permitted, bankable commercial asset.</p>';
      }
    }

    var needsRebuild = (currentMountedEdition !== activeEdition);

    if (needsRebuild && doctrine) {
      if (doctrine) doctrine.remove();
      if (economics) economics.remove();
      if (factory) factory.remove();
      if (roadmap) roadmap.remove();
      if (ctaModal) ctaModal.remove();
      var oldModal = document.getElementById("conrad-diligence-modal");
      if (oldModal) oldModal.remove();
      doctrine = null;
      economics = null;
      factory = null;
      roadmap = null;
      ctaModal = null;
    }

    currentMountedEdition = activeEdition;
    var htmlBlocks = generateBizHTML();
    var newlyMounted = false;

    // 1. Mount or reposition Doctrine
    if (!doctrine) {
      var w1 = document.createElement("div");
      w1.innerHTML = htmlBlocks.doctrineHTML;
      doctrine = w1.firstElementChild;
      anchor.parentNode.insertBefore(doctrine, anchor.nextSibling);
      newlyMounted = true;
    } else if (doctrine.previousElementSibling !== anchor) {
      anchor.parentNode.insertBefore(doctrine, anchor.nextSibling);
    }

    // 2. Mount or reposition Economics
    if (!economics && doctrine) {
      var w2 = document.createElement("div");
      w2.innerHTML = htmlBlocks.economicsHTML;
      economics = w2.firstElementChild;
      doctrine.parentNode.insertBefore(economics, doctrine.nextSibling);
      newlyMounted = true;
    } else if (economics && doctrine && economics.previousElementSibling !== doctrine) {
      doctrine.parentNode.insertBefore(economics, doctrine.nextSibling);
    }

    // 3. Mount or reposition Factory / Concession Pipeline
    if (!factory && economics) {
      var w3 = document.createElement("div");
      w3.innerHTML = htmlBlocks.factoryHTML;
      factory = w3.firstElementChild;
      economics.parentNode.insertBefore(factory, economics.nextSibling);
      newlyMounted = true;
    } else if (factory && economics && factory.previousElementSibling !== economics) {
      economics.parentNode.insertBefore(factory, economics.nextSibling);
    }

    // 4. Mount or reposition Roadmap / PESTLE
    if (!roadmap && factory) {
      var w4 = document.createElement("div");
      w4.innerHTML = htmlBlocks.roadmapHTML;
      roadmap = w4.firstElementChild;
      factory.parentNode.insertBefore(roadmap, factory.nextSibling);
      newlyMounted = true;
    } else if (roadmap && factory && roadmap.previousElementSibling !== factory) {
      factory.parentNode.insertBefore(roadmap, factory.nextSibling);
    }

    // Clean up any lingering diligence elements
    var ctaModal = document.getElementById("conrad-biz-diligence");
    if (ctaModal) {
      ctaModal.remove();
      newlyMounted = true;
    }
    var modalEl = document.getElementById("conrad-diligence-modal");
    if (modalEl) modalEl.remove();

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
        var isChina = (window.Conrad && Conrad.isChina);
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

  var lastBizRoute = null;
  function checkBizRoute() {
    var p = (window.getAppPath ? window.getAppPath() : window.location.pathname.replace(/\/$/, "")) || "/";
    var richText = document.querySelector(".TwoColumnRichText");
    var header = document.querySelector(".ProductHeaderSlice");
    var doctrine = document.getElementById("conrad-biz-doctrine");
    var activeEdition = (window.Conrad && Conrad.edition) || "global";
    if (p !== lastBizRoute || ((richText || header) && !doctrine) || (doctrine && currentMountedEdition !== activeEdition)) {
      lastBizRoute = p;
      ensureBizTrack();
    }
  }
  setInterval(checkBizRoute, 150);

  if (document.readyState === "complete" || document.readyState === "interactive") {
    ensureBizTrack();
  } else {
    document.addEventListener("DOMContentLoaded", ensureBizTrack);
    window.addEventListener("load", ensureBizTrack);
  }
})();
