/**
 * Conrad Prototype — Global Content Dictionary (DRUNKEAST)
 * Baseline content for the deep-sea mining plume mitigation platform.
 */

window.Conrad = window.Conrad || {};

window.Conrad.CONTENT_GLOBAL = {
  edition: "global",
  companyName: "DrunkEast",
  brandName: "DRUNKEAST",
  metaTitle: "Deep-Sea Plume Mitigation & Environmental Safeguards | DRUNKEAST",
  
  // ── Home Route Content ────────────────────────────────────
  home: {
    heroKicker: "ENVIRONMENTAL OCEAN ENGINEERING // 2026",
    heroTitle: "Restoring the Abyss: Bio-Based Deep-Sea Plume Mitigation",
    heroLead: "Combining chitosan, plant-based starch, and bentonite into a clean bio-based flocculant released directly by mining crawlers to settle disturbed sediment faster — because net zero should not come at the expense of our oceans.",
    
    // Stats Bar (Directly below video)
    stats: [
      {
        value: "+10% / yr",
        label: "CRITICAL MINERAL DEMAND",
        sub: "Annual global demand growth for energy-key minerals (IEA Outlook 2026)"
      },
      {
        value: "-37%",
        label: "SEABED FAUNA LOSS",
        sub: "Animal abundance reduction inside unmitigated mining tracks (Nature E&E, 2025)"
      },
      {
        value: "254,654 km²",
        label: "COOK ISLANDS EEZ BASELINE",
        sub: "Initial validation footprint across CIC Limited, Moana Minerals & CSR"
      },
      {
        value: "3-Part Formula",
        label: "TERNARY BIO-FLOCCULANT",
        sub: "Chitosan ([X mg/L]), plant starch ([Y mg/L]) & bentonite ([Z%]) in 35 ppt seawater"
      }
    ],

    // 7 Core Subsystem Bento Cards
    bentoCards: [
      {
        title: "01 // Chitosan Primary Bridging",
        subtitle: "Bio-Derived Amino Charge Neutralisation ([X mg/L])",
        desc: "Chitosan (tested across 0–3 mg/L in 35 ppt seawater) binds fine negatively charged abyssal sediment particles through amino-group interactions, initiating rapid primary flocculation without synthetic toxicity.",
        image: "/assets/images/subsea/bento-01-flocculation.jpg"
      },
      {
        title: "02 // Plant-Starch Reinforcement",
        subtitle: "Gelatinised Polymer Chain Bridging ([Y mg/L])",
        desc: "Gelatinised plant-based starch (tested across 0–120 mg/L) adsorbs onto chitosan-bound flocs to chain particles together, increasing floc integrity and preventing break-up under turbulent bottom currents.",
        image: "/assets/images/subsea/bento-02-manifold.jpg"
      },
      {
        title: "03 // Bentonite Deposit Compaction",
        subtitle: "Layered Mineral Lamellae Ballasting ([Z%] Mass)",
        desc: "Natural fine-grained bentonite clay (tested at 0–20% of dry sediment mass; 0–200 mg/L at 1.0 g/L sediment) packs closely into the floc matrix, raising settling velocity from [D] to [E] mm/s and resisting resuspension.",
        image: "/assets/images/subsea/bento-03-adcp.jpg"
      },
      {
        title: "04 // Crawler-Mounted Release",
        subtitle: "Direct Chemical Dosing Into Disturbed Sediment",
        desc: "Engineered as a drop-in bio-flocculant treatment released directly by existing seabed mining crawlers into the discharge plume, eliminating bespoke vessel reconstructions while treating sediment at the source.",
        image: "/assets/images/subsea/bento-04-digital-twin.jpg"
      },
      {
        title: "05 // G09 & ISA Compliance Proof",
        subtitle: "Auditable Turbidity, Settling & Resuspension Metrics",
        desc: "Generates measured suspended solids ([B%] reduction), turbidity ([A%] reduction), and settling data aligned with Cook Islands SBMA G09 guidelines and International Seabed Authority (ISA) EIS/EMMP requirements.",
        image: "/assets/images/subsea/bento-05-telemetry.jpg"
      },
      {
        title: "06 // High-Salinity Seawater Kinetics",
        subtitle: "Calibrated Across 0–35 ppt Abyssal Salinity",
        desc: "Conventional land-based synthetic flocculants degrade in saline water. Our three-material recipe is specifically formulated and benchmarked at 35 ppt full-strength seawater across 0, 10, 20, and 35 ppt salinity sweeps.",
        image: "/assets/images/subsea/bento-06-offshore-skid.jpg"
      },
      {
        title: "07 // Marine Ecological Compatibility",
        subtitle: "Bio-Based Alternative to Toxic Synthetic Polymers",
        desc: "Uses biologically sourced chitosan and plant starch alongside natural bentonite to curb suspended plumes that clog filter feeders and bury benthic habitats, cutting treatment cost to [$M/m³] ([O%] savings).",
        image: "/assets/images/subsea/bento-07-pressure-vessel.jpg"
      }
    ],

    // Interactive Scrubber Steps
    scrubber: {
      kicker: "02 // PLUME MITIGATION DISSECTION",
      title: "Crawler-Released Bio-Flocculation Cycle",
      lead: "Scroll through disturbed seabed sediment capture, ternary bio-flocculant release, and compacted benthic redeposition.",
      steps: [
        {
          heading: "01 // Benthic Extraction & Sediment Disturbance",
          desc: "Mining crawlers stir up fine abyssal clay at the seafloor, creating sediment plumes that can travel hundreds of kilometres and reduce seabed animal abundance by 37%."
        },
        {
          heading: "02 // Crawler-Released Ternary Bio-Flocculant",
          desc: "The crawler releases our bio-based formulation—chitosan ([X mg/L]), gelatinised plant starch ([Y mg/L]), and bentonite ([Z%])—directly into the turbulent discharge flow."
        },
        {
          heading: "03 // Macro-Floc Agglomeration & Compaction",
          desc: "Chitosan bridges fine particles, starch reinforces floc chains against shear, and bentonite packs the matrix to increase settling speed from [D] to [E] mm/s ([F%] increase)."
        },
        {
          heading: "04 // Rapid Seabed Redeposition & Compliance",
          desc: "Residual turbidity drops by [A%] and suspended solids by [B%], cutting settling time from [G] to [H] min and generating auditable EMMP metrics for ISA and SBMA G09."
        }
      ]
    }
  },

  // ── Tech Route Content ────────────────────────────────────
  tech: {
    kicker: "02 // FORMULATION & EXPERIMENTAL SPECIFICATIONS",
    title: "Ternary Bio-Flocculant Matrix & Crawler-Release Parameters",
    lead: "A three-material bio-based chemical treatment—chitosan, plant-based starch, and bentonite clay—formulated for 35 ppt seawater and direct release from deep-sea mining crawlers.",
    tabs: [
      { filter: "all", label: "ALL" },
      { filter: "chassis", label: "FORMULATION" },
      { filter: "dosing", label: "DOSAGE & MIXING" },
      { filter: "sensing", label: "SETTLING & TURBIDITY" },
      { filter: "materials", label: "SALINITY & SAFETY" },
      { filter: "interfaces", label: "CRAWLER RELEASE" }
    ],
    schematics: [
      {
        schematic: "all",
        image: "/assets/images/subsea/benthic-collector.jpg",
        badge: "FORMULATION OVERVIEW // TERNARY RECIPE",
        title: "Crawler-Released Ternary Bio-Flocculant Formulation",
        tag: "CHITOSAN · PLANT STARCH · BENTONITE // 35 PPT SEAWATER"
      },
      {
        schematic: "chassis",
        image: "/assets/images/subsea/bento-01-flocculation.jpg",
        badge: "THREE-MATERIAL RECIPE // CHEMISTRY",
        title: "CHITOSAN, PLANT STARCH & BENTONITE MATRIX",
        tag: "1.0 G DRY SEDIMENT/L // 3–4 REPLICATES"
      },
      {
        schematic: "dosing",
        image: "/assets/images/subsea/bento-02-manifold.jpg",
        badge: "DOSAGE MATRIX // OPTIMISATION",
        title: "CONTROLLED RATIO DOSING & RAPID DISPERSION",
        tag: "[X MG/L] CHITOSAN · [Y MG/L] STARCH · [Z%] BENTONITE"
      },
      {
        schematic: "sensing",
        image: "/assets/images/subsea/bento-03-adcp.jpg",
        badge: "PERFORMANCE METRICS // SETTLING",
        title: "TURBIDITY, SUSPENDED SOLIDS & SETTLING VELOCITY",
        tag: "[A%] TURBIDITY DROP // [D] → [E] MM/S"
      },
      {
        schematic: "materials",
        image: "/assets/images/subsea/bento-07-pressure-vessel.jpg",
        badge: "MARINE COMPATIBILITY // SALINITY",
        title: "BIO-DERIVED INGREDIENTS & 0–35 PPT SALINITY SWEEP",
        tag: "NATURAL ALTERNATIVE TO SYNTHETIC FLOCCULANTS"
      },
      {
        schematic: "interfaces",
        image: "/assets/images/subsea/bento-05-telemetry.jpg",
        badge: "DEPLOYMENT // CRAWLER INTEGRATION",
        title: "DIRECT MINING CRAWLER RELEASE & EMMP COMPLIANCE",
        tag: "SBMA G09 & ISA EIS/EMMP ALIGNED"
      }
    ],
    specs: [
      { category: "chassis", param: "PRIMARY FLOCCULANT (STAGE 1)", val: "Chitosan Biopolymer", meta: "[ AMINO CHARGE NEUTRALISATION ]" },
      { category: "chassis", param: "FLOC REINFORCER (STAGE 2)", val: "Gelatinised Plant-Based Starch", meta: "[ POLYMER CHAIN BRIDGING ]" },
      { category: "chassis", param: "DEPOSIT COMPACTOR (STAGE 3–4)", val: "Fine Natural Bentonite Clay", meta: "[ MINERAL LAMELLAE PACKING ]" },
      { category: "chassis", param: "REFERENCE SEDIMENT LOAD", val: "1.0 g Dry Sediment / L", meta: "[ 3–4 REPLICATES PER CONDITION ]" },
      { category: "chassis", param: "DEEP-SEA SALINITY BASELINE", val: "35 ppt Artificial Seawater", meta: "[ FULL-STRENGTH SEAWATER ]" },
      { category: "dosing", param: "CHITOSAN DOSAGE (OPTIMAL / SWEEP)", val: "[X mg/L] (0, 0.5, 2, 3 mg/L)", meta: "[ STAGE 1 FLOCCULATION ]" },
      { category: "dosing", param: "PLANT STARCH DOSAGE (OPTIMAL / SWEEP)", val: "[Y mg/L] (0, 30, 60, 120 mg/L)", meta: "[ STAGE 2 REINFORCEMENT ]" },
      { category: "dosing", param: "BENTONITE DOSAGE (OPTIMAL / SWEEP)", val: "[Z%] Dry Mass (0, 5, 10, 20%)", meta: "[ 0–200 MG/L AT 1.0 G/L ]" },
      { category: "dosing", param: "DISPERSION MIXING SCHEDULE", val: "Rapid Mix [rpm] for 1–2 min", meta: "[ CRAWLER WAKE DISPERSION ]" },
      { category: "sensing", param: "TURBIDITY REDUCTION", val: "[A%] vs. Untreated Control", meta: "[ WATER CLARITY GAIN ]" },
      { category: "sensing", param: "SUSPENDED SOLIDS REDUCTION", val: "[B%] ([C kg] per [Q m³])", meta: "[ REDUCED PLUME LOAD ]" },
      { category: "sensing", param: "SETTLING VELOCITY", val: "[D] → [E] mm/s ([F%] Increase)", meta: "[ STOKES SETTLING SHIFT ]" },
      { category: "sensing", param: "SETTLING TIME REDUCTION", val: "[G] → [H] min ([I%] Reduction)", meta: "[ RAPID BENTHIC DROP ]" },
      { category: "materials", param: "SALINITY SENSITIVITY SWEEP", val: "0, 10, 20, 35 ppt Tested", meta: "[ TREATED VS. UNTREATED ]" },
      { category: "materials", param: "INGREDIENT SOURCING", val: "Bio-Derived Chitosan & Starch + Clay", meta: "[ NON-SYNTHETIC ALTERNATIVE ]" },
      { category: "materials", param: "DEPOSIT RESUSPENSION STABILITY", val: "Compacted Settled Bed Under Flow", meta: "[ BENTONITE PACKING EFFECT ]" },
      { category: "interfaces", param: "RELEASE MECHANISM", val: "Direct Release via Mining Crawler", meta: "[ IN-PLUME SOURCE TREATMENT ]" },
      { category: "interfaces", param: "ESTIMATED TREATMENT COST", val: "[$M / m³] ([O%] vs. [$N / m³])", meta: "[ [$R] ANNUAL SAVINGS AT [Q m³] ]" },
      { category: "interfaces", param: "REGULATORY DATA OUTPUT", val: "Turbidity, Settling & Resuspension", meta: "[ ISA EIS/EMMP & SBMA G09 ]" }
    ],
    comparison: {
      kicker: "03 // STRATEGIC ADVANTAGE",
      title: "Ternary Bio-Flocculant vs. Conventional & Passive Approaches",
      lead: "Comparing our crawler-released chitosan, starch, and bentonite treatment against passive plume monitoring and toxic land-based synthetic flocculants.",
      headers: {
        metric: "PERFORMANCE DIMENSION",
        conrad: "DRUNKEAST BIO-FLOCCULANT",
        legacy: "SYNTHETIC FLOCCULANTS / PASSIVE MONITORING"
      },
      rows: [
        {
          metric: "Sediment Settling Velocity",
          conrad: "<strong>Accelerated [F%]</strong> <span class=\"tag\">[D] → [E] MM/S</span>",
          legacy: "Slow natural settling; plumes travel hundreds of km in currents"
        },
        {
          metric: "Turbidity & Suspended Solids",
          conrad: "<strong>[A%] Turbidity / [B%] Solids</strong> <span class=\"tag\">[G] → [H] MIN</span>",
          legacy: "Passive models track plumes without physically removing sediment"
        },
        {
          metric: "Seawater Salinity Performance",
          conrad: "<strong>35 ppt Seawater Formulated</strong> <span class=\"tag\">0–35 PPT TESTED</span>",
          legacy: "Conventional land flocculants lose effectiveness in high-salinity seawater"
        },
        {
          metric: "Marine Ecological Safety",
          conrad: "<strong>Bio-Derived + Natural Clay</strong> <span class=\"tag\">CHITOSAN · STARCH · BENTONITE</span>",
          legacy: "Industrial synthetic flocculants are toxic to marine life (-37% fauna in tracks)"
        },
        {
          metric: "Deployment Integration",
          conrad: "<strong>Direct Crawler Release</strong> <span class=\"tag\">DROP-IN CHEMICAL</span>",
          legacy: "Bespoke hardware retrofits or passive buoys with zero active mitigation"
        },
        {
          metric: "Treatment Cost Profile",
          conrad: "<strong>[$M / m³] Est. Cost</strong> <span class=\"tag\">[O%] SAVINGS</span>",
          legacy: "[$N / m³] conventional methods + regulatory delay & permitting risk"
        }
      ]
    }
  },

  // ── Business Route Content ────────────────────────────────
  biz: {
    kicker: "01 // COMMERCIAL STRATEGY & VALUE PROPOSITION",
    title: "Unlocking the Environmental License to Operate",
    lead: "Seabed mineral developers face an existential hurdle: without verifiable sediment plume control, regulatory bodies cannot grant commercial exploitation contracts. DRUNKEAST turns environmental compliance into a permitted, defensible asset.",
    
    // Market Sizing TAM / SAM / SOM
    sizing: {
      kicker: "02 // MARKET SIZING & VALIDATION ROADMAP",
      title: "From Initial Island Concessions to Global Seabed Scale",
      lead: "A structured beachhead strategy validating in-situ plume mitigation in the Cook Islands regulatory testbed before expanding across international Clarion-Clipperton Zone concessions.",
      cards: [
        {
          stage: "INITIAL SOM // 3-YEAR PILOT CONTRACT",
          cost: "$100k – $300k",
          sub: "1 PILOT RESEARCH & MONITORING CONTRACT",
          meta: [
            { label: "Target Client", value: "Cook Islands Operator (CIC / Moana / CSR)" },
            { label: "Deliverable", value: "In-situ plume simulation & test skid" },
            { label: "Objective", value: "Validate SBMA G09 baseline compliance" }
          ]
        },
        {
          stage: "INITIAL SAM // COOK ISLANDS BEACHHEAD",
          cost: "$600k – $1.8M",
          sub: "3 LICENSED EXPLORATION HOLDERS",
          meta: [
            { label: "Market Base", value: "CIC Ltd, Moana Minerals, CSR Ltd" },
            { label: "Monitored Area", value: "254,654 km² Exploration Licences" },
            { label: "Scope", value: "Monitoring, modeling & baseline trials ($200k–$600k/operator)" }
          ]
        },
        {
          stage: "PRELIMINARY TAM // 22 GLOBAL CONTRACTS",
          cost: "$4.4M – $13.2M",
          sub: "22 CONTRACT-LEVEL OPPORTUNITIES (3-YEAR EXPENDITURE)",
          meta: [
            { label: "Contract Base", value: "19 ISA Nodule Contracts + 3 Cook Islands Licences" },
            { label: "Unit Expenditure", value: "$200,000 – $600,000 per 3-year project" },
            { label: "Primary Mandate", value: "ISA Draft Exploitation Regulations & G09" }
          ]
        },
        {
          stage: "GLOBAL INDUSTRY TAM // 2026 – 2034",
          cost: "$6.18B → $65.56B",
          sub: "34.3% CAGR DRIVEN BY CLEAN ENERGY TRANSITION",
          meta: [
            { label: "Key Critical Metals", value: "Nickel, Cobalt, Copper, Manganese" },
            { label: "Target Sectors", value: "Offshore mining operators, dredging & environmental consultancies" },
            { label: "Primary Driver", value: "Global battery demand & net-zero standards" }
          ]
        }
      ]
    },

    // PESTLE Matrix
    pestle: {
      kicker: "04 // PESTLE STRATEGIC FRAMEWORK",
      title: "Regulatory & Environmental Operating Environment",
      lead: "A multi-dimensional analysis grounding our technology within sovereign jurisdiction, global seabed treaties, and environmental imperatives.",
      factors: [
        {
          letter: "P",
          name: "POLITICAL & REGULATORY",
          points: [
            "Cook Islands Seabed Minerals Authority (SBMA) exercises direct sovereign EEZ jurisdiction, independent of ISA CCZ treaty delays.",
            "Government maintains strict evidence-first policy: exploration licensing does not guarantee automatic commercial extraction approval.",
            "State investment participation via Cook Islands Investment Corporation (CIIC) strengthens public-private alignment."
          ]
        },
        {
          letter: "E",
          name: "ECONOMIC & CLIENT DYNAMICS",
          points: [
            "Highly concentrated initial client base (3 licensed operators: CIC, Moana Minerals, CSR); engineers & environmental teams use the product while mining operators/contractors finance purchases, and regulators set requirements.",
            "Estimated treatment cost of [$M / m³] delivers [O%] savings vs. conventional methods ([$N / m³]), saving [$R] annually at [Q m³] treated volume.",
            "Drop-in bio-flocculant supply and pilot monitoring contracts lower adoption hurdles compared with bespoke offshore vessel hardware retrofits."
          ]
        },
        {
          letter: "S",
          name: "SOCIAL & COMMUNITY LICENSE",
          points: [
            "Marine ecology, fisheries health, and indigenous Pacific cultural heritage demand robust social license to operate.",
            "Public consultation and transparent environmental disclosure require tamper-proof, auditable third-party sensor telemetry.",
            "Value messaging focused strictly on risk mitigation, never claiming unproven environmental harmlessness."
          ]
        },
        {
          letter: "T",
          name: "TECHNOLOGICAL RELIABILITY",
          points: [
            "Conventional land flocculants fail in 35 ppt seawater; our chitosan ([X mg/L]), plant starch ([Y mg/L]), and bentonite ([Z%]) recipe is specifically formulated for saline abyssal plumes.",
            "Sediment dispersion depends on bottom currents, particle size, and flocculation kinetics—benchmarked across 0, 10, 20, and 35 ppt salinity.",
            "Released directly from existing mining crawlers into disturbed discharge, pairing active bio-flocculation with turbidity & settling verification."
          ]
        },
        {
          letter: "E",
          name: "ECOLOGICAL IMPACT",
          points: [
            "Nodule collection physically disturbs benthic micro-habitats; plume mitigation confines settling within the primary collection swath.",
            "Prevents midwater plume drift that could threaten pelagic fisheries and deep oceanic photic zones.",
            "100% biodegradable natural flocculant chemistry ensures zero toxic bioaccumulation in marine trophic chains."
          ]
        },
        {
          letter: "L",
          name: "LEGAL & COMPLIANCE",
          points: [
            "Seabed Minerals Act 2019 defines basic statutory framework for marine exploration and extraction.",
            "Environment (Seabed Minerals Activities) Regulations 2023 mandate strict Environmental Impact Assessments (EIA).",
            "Cook Islands G09 Standards require comprehensive Environmental Management & Monitoring Plans (EMMP)."
          ]
        }
      ]
    },

    // 22 Contract Concession Pipeline
    pipeline: {
      kicker: "03 // ADDRESSABLE CONCESSION PIPELINE",
      title: "22 Global Seabed Contract Opportunities",
      lead: "22 identifiable contract-level opportunities across the International Seabed Authority and sovereign Pacific exclusive economic zones.",
      regions: [
        { name: "Clarion-Clipperton Zone (CCZ)", count: "17 Contracts", match: "★★★★★", actors: "TMC/NORI (Nauru), TOML (Tonga), GSR (Belgium), UKSR (UK), China Minmetals, DORD (Japan), BGR (Germany)" },
        { name: "Cook Islands Sovereign EEZ", count: "3 Licences", match: "★★★★★", actors: "CIC Limited (211,545 km²), Moana Minerals (23,630 km²), Cobalt Seabed Resources (19,479 km²)" },
        { name: "Central Indian Ocean Basin", count: "1 Contract", match: "★★★★★", actors: "Government of India (Polymetallic Nodules)" },
        { name: "Western Pacific Basin", count: "1 Contract", match: "★★★★★", actors: "Beijing Pioneer Hi-Tech Development Corporation (China)" },
        { name: "Indian Ocean Ridges", count: "5 Contracts", match: "★★★", actors: "China (COMRA), South Korea, Germany (BGR), India (Polymetallic Sulfides)" },
        { name: "Mid-Atlantic Ridge", count: "3 Contracts", match: "★★★", actors: "Russia (Yuzhmorgeologiya), France (Ifremer), Poland (Polymetallic Sulfides)" },
        { name: "Western Pacific Seamounts", count: "4 Contracts", match: "★★★", actors: "Japan (JOGMEC), China (COMRA), Russia, South Korea (Cobalt-Rich Crusts)" }
      ]
    },

    // 16 ISA Contractors
    contractors: [
      { id: "01", country: "Nauru", entity: "Nauru Ocean Resources Inc. (NORI)", type: "Commercial (TMC)", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "02", country: "Tonga", entity: "Tonga Offshore Mining Ltd. (TOML)", type: "Commercial (TMC)", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "03", country: "Belgium", entity: "Global Sea Mineral Resources (GSR)", type: "Commercial (DEME)", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "04", country: "United Kingdom", entity: "UK Seabed Resources (UKSR)", type: "Commercial", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "05", country: "China", entity: "China Minmetals Corporation", type: "State-Owned Enterprise", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "06", country: "Japan", entity: "Deep Ocean Resources Development (DORD)", type: "Commercial Consortium", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "07", country: "Singapore", entity: "Ocean Mineral Singapore (OMS)", type: "Commercial", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "08", country: "Kiribati", entity: "Marawa Research and Exploration", type: "State-Sponsored Entity", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "09", country: "Jamaica", entity: "Blue Minerals Jamaica", type: "Commercial", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "10", country: "Cook Islands", entity: "Cook Islands Investment Corp. (CIIC)", type: "State Investment Agency", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "11", country: "China", entity: "China Ocean Mineral Resources R&D (COMRA)", type: "National Association", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "12", country: "Germany", entity: "Federal Institute for Geosciences (BGR)", type: "Government Research", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "13", country: "France", entity: "Ifremer", type: "National Ocean Institute", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "14", country: "South Korea", entity: "Government of the Republic of Korea", type: "Sovereign State", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "15", country: "Russia", entity: "JSC Yuzhmorgeologiya", type: "State Enterprise", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" },
      { id: "16", country: "Multi-State", entity: "Interoceanmetal Joint Org. (IOM)", type: "Intergovernmental Consortium", area: "Clarion-Clipperton Zone", mineral: "Polymetallic Nodules", match: "★★★★★" }
    ],

    // References (APA 7th Edition)
    references: [
      "[1] Cook Islands Seabed Minerals Authority. (n.d.). Exploration licence holders. SBMA Registry.",
      "[2] Cook Islands Seabed Minerals Authority, & National Environment Service. (2024). G09: Environmental management and monitoring plans. SBMA Guidelines.",
      "[3] International Seabed Authority. (n.d.). Exploration contracts. ISA Official Registry.",
      "[4] Gazis, I.-Z., de Stigter, H., Mohrmann, J., et al. (2025). Monitoring benthic plumes, sediment redeposition and seafloor imprints caused by deep-sea polymetallic nodule mining. Nature Communications, 16, Article 1229. DOI: 10.1038/s41467-025-56311-0.",
      "[5] Adams, E. E., et al. (2021). Extent of impact of deep-sea nodule mining midwater plumes is influenced by sediment loading, turbulence and thresholds. Communications Earth & Environment, 2, Article 148. DOI: 10.1038/s43247-021-00213-8.",
      "[6] Nature. (2025). Long-term impact and biological recovery in a deep-sea mining track. Nature Publishing Group."
    ]
  },

  // ── About Route Content ───────────────────────────────────
  about: {
    heroKicker: "WHO WE ARE // DRUNKEAST",
    heroTitle: "Driven by Curiosity. Dedicated to Marine Restoration.",
    heroLead: "We are DRUNKEAST, a team driven by curiosity, scientific exploration, and a commitment to the future of our oceans. Working at the intersection of deep-sea research, environmental restoration, and innovative technology, we aim to address the challenges of exploring and protecting one of Earth's least understood environments.",
    
    // Interactive Acronym Board (D-R-U-N-K-E-A-S-T)
    acronymTitle: "The Principles That Guide Our Mission",
    acronymSubtitle: "Each letter in DRUNKEAST defines our technological and environmental ethos.",
    acronym: [
      {
        letter: "D",
        word: "Deep-Sea Exploration",
        principle: "Investigating the mysteries and challenges of the deep ocean.",
        image: "/assets/images/subsea/benthic-collector.jpg"
      },
      {
        letter: "R",
        word: "Restoration",
        principle: "Developing solutions that support the recovery of marine environments.",
        image: "/assets/images/subsea/bento-01-flocculation.jpg"
      },
      {
        letter: "U",
        word: "Uncertainty",
        principle: "Embracing the unknown through research, experimentation, and critical thinking.",
        image: "/assets/images/subsea/bento-04-digital-twin.jpg"
      },
      {
        letter: "N",
        word: "Navigation",
        principle: "Finding pathways through complex scientific and environmental challenges.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/0126fc76978b2fedd63aeeacd2e3b1f55f5c617f-952x952.png"
      },
      {
        letter: "K",
        word: "Knowledge",
        principle: "Turning research and evidence into informed decisions.",
        image: "/assets/images/subsea/bento-05-telemetry.jpg"
      },
      {
        letter: "E",
        word: "Environmental Protection",
        principle: "Prioritising the health and resilience of marine ecosystems.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/b95abc74192ac5ae36f6076031bb09dc0e09d318-1920x1080.png"
      },
      {
        letter: "A",
        word: "Adaptation",
        principle: "Responding to changing conditions with flexible, innovative solutions.",
        image: "/assets/images/subsea/bento-02-manifold.jpg"
      },
      {
        letter: "S",
        word: "Sustainability",
        principle: "Balancing technological progress with long-term environmental responsibility.",
        image: "/assets/images/subsea/bento-03-adcp.jpg"
      },
      {
        letter: "T",
        word: "Technology",
        principle: "Applying science and engineering to tackle real-world problems.",
        image: "/assets/images/subsea/bento-07-pressure-vessel.jpg"
      }
    ],

    // Mission Statement & Founding Team
    mission: "We believe that innovation should go hand in hand with environmental responsibility. Our mission is to explore practical, science-based approaches to deep-sea challenges, combining technological development with a commitment to sustainability. By questioning existing approaches, testing new ideas, and learning from the natural world, we strive to contribute to a future in which ocean exploration and environmental protection can advance together.",
    teamStory: "DrunkEast was sparked by conversations between Wanjing and her parents, both maritime shipping and commercial logistics professionals with over 20 years of expertise. This curiosity led her to a documentary exploring the growing demand for seabed minerals in the clean energy transition, revealing a deeper dilemma: balancing resource extraction, ISA governance, and fragile marine biodiversity. Founded on UN Sustainable Development Goal 9 (Industry, Innovation and Infrastructure) and Goal 14 (Life Below Water), we assembled five teammates to make deep-sea resource extraction more environmentally responsible through bioflocculation technology.",
    teamMembers: [
      { name: "Wanjing", role: "CEO", focus: "Strategy and communication" },
      { name: "William", role: "CTO", focus: "Bioengineering research and flocculation development" },
      { name: "Clara", role: "CESO", focus: "Marine biodiversity and ecological compatibility" },
      { name: "Alice", role: "CPO", focus: "Product design, 3D modelling and material testing" },
      { name: "Elaine", role: "CMO / CRO", focus: "Market research and commercial strategy" }
    ],

    // Contact Directory
    contact: {
      kicker: "02 // GET IN TOUCH",
      title: "Direct Inquiries",
      lead: "Have a question, an idea, or an opportunity to collaborate? We would love to hear from you. We welcome conversations with fellow innovators, ocean researchers, and mining concession operators.",
      email: "teamdrunkeast@gmail.com",
      company: "DRUNKEAST"
    }
  }
};
