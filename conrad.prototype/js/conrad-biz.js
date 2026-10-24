/**
 * Conrad Prototype — Business Route Sections & Diligence Modal
 * Deep-sea mining commercial strategy, Cook Islands TAM/SAM/SOM, pipeline & PESTLE.
 */

(function() {
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
          <div class="conrad-kicker">${biz.kicker || ("01 // COMMERCIAL STRATEGY &amp; VALUE PROPOSITION")}</div>
          <h2 class="conrad-section-title">${biz.title || ("Unlocking the Environmental License to Operate")}</h2>
          <p class="conrad-section-lead">${biz.lead || ("Seabed mineral developers face an existential hurdle: without verifiable sediment plume control, regulatory bodies cannot grant commercial exploitation contracts. " + brand + " turns environmental compliance into a permitted, defensible asset.")}</p>
        </div>

        <div class="conrad-doctrine-grid">
          <div class="conrad-doctrine-card broken-card">
            <div class="doctrine-badge">${"THE UNMITIGATED PLUME DILEMMA"}</div>
            <h3 class="doctrine-title">${"Uncontrolled Sediment Dispersion"}</h3>
            <ul class="doctrine-list">
              <li><strong>${"Existential Permitting Barrier:"}</strong> ${"Commercial exploitation licences cannot be granted under ISA or Cook Islands regulations without demonstrated, verifiable plume containment."}</li>
              <li><strong>${"Transboundary Drift Liability:"}</strong> ${"Sub-micron clay plumes drift 50–100+ km in the oceanic water column, causing severe ecological damage and catastrophic reputational risk."}</li>
              <li><strong>${"Post-Hoc Monitoring Deadlock:"}</strong> ${"Passive sensor buoys merely observe damage without preventing it, risking sudden shut-down orders and stranded multimillion-dollar mining capex."}</li>
            </ul>
          </div>

          <div class="conrad-doctrine-card solution-card">
            <div class="doctrine-badge">${"THE " + brand + " PERMITTING MODEL"}</div>
            <h3 class="doctrine-title">${"In-Situ Chemical Flocculation"}</h3>
            <ul class="doctrine-list">
              <li><strong>${"Unlocking the License to Operate:"}</strong> ${"We de-risk environmental approval by providing concession holders with certified, auditable sedimentation control data."}</li>
              <li><strong>${"Accelerated Benthic Deposition:"}</strong> ${"Non-toxic biodegradable biopolymer binds micro-particles into dense flocs, confining redeposition strictly to primary mining swaths."}</li>
              <li><strong>${"Automated G09 &amp; ISA Telemetry:"}</strong> ${"In-situ ADCP and optical backscatter sensors stream real-time compliance proof directly to maritime authorities and stakeholders."}</li>
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
          <div class="conrad-kicker">${biz.sizing.kicker || ("02 // MARKET SIZING &amp; EXPANSION RUNWAY")}</div>
          <h2 class="conrad-section-title">${biz.sizing.title || ("From Island Testbed to Global Abyssal Concessions")}</h2>
          <p class="conrad-section-lead">${biz.sizing.lead || ("A structured beachhead strategy validating in-situ plume mitigation in the Cook Islands before expanding across global International Seabed Authority concessions.")}</p>
        </div>

        <div class="conrad-runway-container">
          <div class="conrad-runway-track">
            ${sizingCards.map(function(card, idx) {
              var stepNum = "0" + (idx + 1);
              return `
                <div class="runway-step">
                  <div class="step-header">
                    <span class="step-num">${stepNum}</span>
                    <span class="step-stage">${card.stage}</span>
                  </div>
                  <div class="step-val">${card.cost}</div>
                  <div class="step-sub">${card.sub}</div>
                  <div class="step-divider"></div>
                  <div class="step-specs">
                    ${card.meta.map(function(m) {
                      return `
                        <div class="step-spec-row">
                          <span class="spec-label">${m.label}</span>
                          <span class="spec-data">${m.value}</span>
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
          <div class="conrad-kicker">${biz.pipeline.kicker || ("03 // ADDRESSABLE CONCESSION PIPELINE")}</div>
          <h2 class="conrad-section-title">${biz.pipeline.title || ("22 Global Seabed Concession Opportunities")}</h2>
          <p class="conrad-section-lead">${biz.pipeline.lead || ("Identifiable contract opportunities spanning sovereign Pacific exclusive economic zones and International Seabed Authority (ISA) deep-ocean sectors.")}</p>
        </div>

        <div class="conrad-registry-ledger">
          <div class="registry-ledger-header">
            <span class="col-reg-sector">${"SECTOR"}</span>
            <span class="col-reg-region">${"GEOGRAPHIC REGION"}</span>
            <span class="col-reg-operators">${"OPERATORS &amp; SPONSORS"}</span>
            <span class="col-reg-scale">${"EXPLORATION FOOTPRINT"}</span>
            <span class="col-reg-status">${"STATUS"}</span>
          </div>

          ${pipelineRegions.map(function(r, idx) {
            var num = "0" + (idx + 1);
            return `
              <div class="registry-ledger-row">
                <div class="col-reg-sector">
                  <span class="registry-num">${num}</span>
                  <span class="registry-tag">${r.match}</span>
                </div>
                <div class="col-reg-region">
                  <h3 class="registry-title">${r.name}</h3>
                  <p class="registry-desc">${r.count}</p>
                </div>
                <div class="col-reg-operators">
                  <span class="operator-primary">${r.actors}</span>
                </div>
                <div class="col-reg-scale">
                  <span class="scale-val">${r.count}</span>
                </div>
                <div class="col-reg-status">
                  <span class="status-text">${r.match}</span>
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <div class="conrad-contractors-section" style="margin-top: 2.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem; letter-spacing: 0.05em; text-transform: uppercase;">
            ${"16 Priority International Seabed Authority (ISA) Exploration Contractors"}
          </h3>
          <p style="font-size: 0.85rem; color: #8E9291; margin-bottom: 1.25rem;">
            ${"Strategic partner prospects evaluated by tract location, sponsor nation regulatory frameworks, and plume abatement demand."}
          </p>
          <div class="conrad-contractor-table-wrap" style="overflow-x: auto;">
            <table class="conrad-compare-table" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
              <thead>
                <tr>
                  <th style="padding: 10px 14px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.15); color: #8E9291;">${"ID"}</th>
                  <th style="padding: 10px 14px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.15); color: #8E9291;">${"SPONSORING STATE"}</th>
                  <th style="padding: 10px 14px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.15); color: #8E9291;">${"CONTRACTOR ENTITY"}</th>
                  <th style="padding: 10px 14px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.15); color: #8E9291;">${"ENTITY TYPE"}</th>
                  <th style="padding: 10px 14px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.15); color: #8E9291;">${"CONTRACT AREA"}</th>
                  <th style="padding: 10px 14px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.15); color: #8E9291;">${"MINERAL TYPE"}</th>
                  <th style="padding: 10px 14px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.15); color: #8E9291;">${"MATCH"}</th>
                </tr>
              </thead>
              <tbody>
                ${contractors.map(function(c) {
                  return `
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                      <td style="padding: 10px 14px; font-family: monospace; color: #8E9291;">${c.id}</td>
                      <td style="padding: 10px 14px; font-weight: 600; color: #ffffff;">${c.country}</td>
                      <td style="padding: 10px 14px; color: rgba(255,255,255,0.9);">${c.entity}</td>
                      <td style="padding: 10px 14px; color: #8E9291;">${c.type}</td>
                      <td style="padding: 10px 14px; color: #8E9291;">${c.area}</td>
                      <td style="padding: 10px 14px; color: #8E9291;">${c.mineral}</td>
                      <td style="padding: 10px 14px; text-align: center; color: #f59e0b;">${c.match}</td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    `;

    var roadmapHTML = `
    <section id="conrad-biz-roadmap" class="conrad-biz-section">
      <div class="conrad-biz-inner">
        <div class="conrad-biz-header">
          <div class="conrad-kicker">${biz.pestle.kicker || ("04 // PESTLE STRATEGIC FRAMEWORK")}</div>
          <h2 class="conrad-section-title">${biz.pestle.title || ("Sovereign, Ecological &amp; Regulatory Drivers")}</h2>
          <p class="conrad-section-lead">${biz.pestle.lead || ("A comprehensive macro-environmental evaluation anchoring our technology in legal frameworks, economic efficiency, and ocean preservation.")}</p>
        </div>

        <div class="conrad-pestle-grid">
          ${pestleFactors.map(function(item, idx) {
            var num = "0" + (idx + 1);
            return `
              <div class="conrad-pestle-card">
                <div class="pestle-card-header">
                  <span class="pestle-num">${num} // ${item.letter}</span>
                  <span class="pestle-factor-tag">${item.name}</span>
                </div>
                <div class="pestle-divider"></div>
                <ul class="pestle-point-list">
                  ${item.points.map(function(pt) {
                    return `<li class="pestle-point-item"><span class="pestle-bullet">—</span><span>${pt}</span></li>`;
                  }).join("")}
                </ul>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </section>
    `;

    var diligenceModalHTML = `
    <section id="conrad-biz-diligence" class="conrad-biz-section diligence-banner-section">
      <div class="conrad-biz-inner">
        <div class="conrad-diligence-banner">
          <div class="diligence-text-block">
            <div class="conrad-kicker">${"05 // ENVIRONMENTAL DATA ROOM &amp; REFERENCES"}</div>
            <h2 class="conrad-section-title">${"Access Technical Diligence &amp; G09 Dossier"}</h2>
            <p class="conrad-section-lead">${"Download certified G09 EMMP compliance dossiers, Nature Communications (2025) benthic sediment benchmarks, and OECD 202/203 flocculant ecotoxicity laboratory certifications."}</p>
          </div>
          <div class="diligence-cta-block">
            <button id="conrad-open-diligence-btn" class="conrad-diligence-btn">
              <span>${"REQUEST DATA ROOM ACCESS"}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </button>
            <div class="diligence-secure-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>${"AUDITABLE COMPLIANCE DOSSIER"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Diligence Request Modal -->
    <div id="conrad-diligence-modal" class="conrad-modal-overlay" aria-hidden="true">
      <div class="conrad-modal-backdrop" id="conrad-modal-backdrop"></div>
      <div class="conrad-modal-window conrad-modal-dialog">
        <div class="conrad-modal-header">
          <div>
            <div class="modal-kicker">${"VERIFIED INSTITUTIONAL ACCESS"}</div>
            <h3 class="modal-title">${"Environmental Data Room Dossier"}</h3>
          </div>
          <button id="conrad-close-modal-btn" class="conrad-modal-close modal-close-btn" aria-label="Close dialog">&times;</button>
        </div>
        <div class="conrad-modal-body">
          <p class="modal-desc">${"Authorized concession operators, marine scientists, and regulatory observers may request the full technical dossier, including:"}</p>
          <div class="modal-files-list">
            <div class="modal-file-item">
              <div class="file-icon">DOC</div>
              <div class="file-info">
                <span class="file-name">${"Cook Islands SBMA G09 EMMP Technical Compliance Architecture"}</span>
                <span class="file-size">${"Environmental Management & Monitoring Plan Guide · 4.8 MB"}</span>
              </div>
            </div>
            <div class="modal-file-item">
              <div class="file-icon">SCI</div>
              <div class="file-info">
                <span class="file-name">${"Benthic Plume Dispersion & Redeposition Dynamics (Nature Comm. 2025)"}</span>
                <span class="file-size">${"Empirical Seafloor Nodule Disturbance Analysis · 8.2 MB"}</span>
              </div>
            </div>
            <div class="modal-file-item">
              <div class="file-icon">LAB</div>
              <div class="file-info">
                <span class="file-name">${"Eco-Compatible Flocculant Ecotoxicity & Biodegradation Report"}</span>
                <span class="file-size">${"OECD 202/203 Standard Laboratory Certification · 3.1 MB"}</span>
              </div>
            </div>
          </div>

          <!-- APA References Section -->
          <div class="conrad-references-block" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #ffffff; margin-bottom: 0.75rem;">References (APA 7th Edition)</h4>
            <div id="diligence-references-container" style="max-height: 180px; overflow-y: auto; font-size: 0.78rem; line-height: 1.55; color: rgba(255,255,255,0.7); display: flex; flex-direction: column; gap: 0.45rem;">
            </div>
          </div>

          <form id="conrad-diligence-form" class="modal-form" style="margin-top: 1.5rem;">
            <div class="form-row">
              <input type="text" class="modal-input" placeholder="${'Organization / Concession Entity *'}" required />
              <input type="email" class="modal-input" placeholder="${'Official Institutional Email *'}" required />
            </div>
            <div class="form-row">
              <select class="modal-input" required>
                <option value="" disabled selected>${'Primary Area of Interest *'}</option>
                <option value="cook-islands">${'Cook Islands Concession Baseline'}</option>
                <option value="ccz">${'Clarion-Clipperton Zone (CCZ) Integration'}</option>
                <option value="regulatory">${'Regulatory & ISA Observer Inquiries'}</option>
                <option value="scientific">${'Academic / Oceanographic Collaboration'}</option>
              </select>
            </div>
            <button type="submit" id="diligence-submit-btn" class="modal-submit-btn">${'REQUEST ACCESS CREDENTIALS'}</button>
            <div id="diligence-success-msg" class="modal-success-msg" style="display: none;">
              ✓ ${'Request submitted. Our team will deliver credentials to your institutional address within 24 hours.'}
            </div>
          </form>
        </div>
      </div>
    </div>
    `;

    return {
      doctrineHTML: doctrineHTML,
      economicsHTML: economicsHTML,
      factoryHTML: factoryHTML,
      roadmapHTML: roadmapHTML,
      diligenceModalHTML: diligenceModalHTML,
      references: biz.references || []
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
    var anchor = richText || header;
    if (!anchor) return;

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

    // 5. Mount or reposition Diligence Modal CTA
    if (!ctaModal && roadmap) {
      var w5 = document.createElement("div");
      w5.innerHTML = htmlBlocks.diligenceModalHTML;
      ctaModal = w5.firstElementChild;
      var modalOverlay = w5.lastElementChild;

      var referencesContainer = w5.querySelector("#diligence-references-container");
      if (referencesContainer && htmlBlocks.references) {
        htmlBlocks.references.forEach(function(ref) {
          var refDiv = document.createElement("div");
          refDiv.textContent = ref;
          referencesContainer.appendChild(refDiv);
        });
      }

      roadmap.parentNode.insertBefore(ctaModal, roadmap.nextSibling);
      if (!document.getElementById("conrad-diligence-modal")) {
        document.body.appendChild(modalOverlay);
        bindModalEvents();
      }
      newlyMounted = true;
    } else if (ctaModal && roadmap && ctaModal.previousElementSibling !== roadmap) {
      roadmap.parentNode.insertBefore(ctaModal, roadmap.nextSibling);
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
