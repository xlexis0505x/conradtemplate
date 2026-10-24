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
    heroTitle: "Restoring the Abyss: Autonomous Deep-Sea Plume Mitigation",
    heroLead: "Engineered in-situ chemical flocculation and real-time turbidity telemetry designed to mitigate deep-sea sediment dispersion and unlock international environmental approvals.",
    
    // Stats Bar (Directly below video)
    stats: [
      {
        value: "254,654 km²",
        label: "TARGET EXPLORATION EEZ",
        sub: "Cook Islands exploration license baseline across CIC, Moana & CSR"
      },
      {
        value: "22 Contracts",
        label: "PIPELINE OPPORTUNITY",
        sub: "19 ISA nodule exploration contracts + 3 national commercial licences"
      },
      {
        value: ">90%",
        label: "TURBIDITY SUPPRESSION",
        sub: "Accelerated benthic redeposition factor vs. untreated slurry discharge"
      },
      {
        value: "0 Toxic Residuals",
        label: "MARINE ECO-SAFETY",
        sub: "100% biodegradable biopolymer chemistry compliant with OECD 202/203"
      }
    ],

    // 7 Core Subsystem Bento Cards
    bentoCards: [
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
    ],

    // Interactive Scrubber Steps
    scrubber: {
      kicker: "02 // PLUME MITIGATION DISSECTION",
      title: "Active Benthic Sediment Neutralization Cycle",
      lead: "Scroll through real-time internal fluid dynamics, in-situ chemical binding, and accelerated abyssal sedimentation.",
      steps: [
        {
          heading: "01 // Benthic Extraction & Disturbance Zone",
          desc: "Collector track and nodule pick-up generate high-density sediment slurry at the seafloor interface."
        },
        {
          heading: "02 // In-Chute Flocculant Dosing & Turbulence Mixing",
          desc: "Electromagnetic injection nozzles micro-dose eco-compatible biopolymer directly into the discharge flow."
        },
        {
          heading: "03 // Rapid Macro-Floc Agglomeration",
          desc: "Polymer bridging forces sub-micron clay and silt into dense macro-flocs, accelerating settling velocity by over 20x."
        },
        {
          heading: "04 // Localized Redeposition & Verified Telemetry",
          desc: "Sediment drops within designated mining corridors, eliminating midwater plumes and generating auditable sensor proof."
        }
      ]
    }
  },

  // ── Tech Route Content ────────────────────────────────────
  tech: {
    kicker: "02 // INDUSTRIAL SPECIFICATIONS",
    title: "Subsea Technical Envelope & Tolerances",
    lead: "High-density physical metrics, 600-bar hydrostatic pressure ratings, and acoustic telemetry built to marine engineering standards with commercial agile deployment.",
    tabs: [
      { filter: "all", label: "ALL" },
      { filter: "chassis", label: "CHASSIS & SLED" },
      { filter: "dosing", label: "DISPENSER MANIFOLD" },
      { filter: "sensing", label: "ACOUSTIC SENSORS" },
      { filter: "materials", label: "MATERIALS & PRESSURE" },
      { filter: "interfaces", label: "SUBSEA INTERFACES" }
    ],
    schematics: [
      {
        schematic: "all",
        image: "/assets/images/subsea/benthic-collector.jpg",
        badge: "SYSTEM SCHEMATIC // OVERVIEW",
        title: "AUTONOMOUS SUBSEA PLUME MITIGATION PLATFORM",
        tag: "6,000M DEPTH RATED // SBMA G09 COMPLIANT"
      },
      {
        schematic: "chassis",
        image: "/assets/images/subsea/bento-06-offshore-skid.jpg",
        badge: "STRUCTURAL SCHEMATIC // CHASSIS",
        title: "TITANIUM BENTHIC MONOCOQUE FRAME",
        tag: "600-BAR HYDROSTATIC RATING"
      },
      {
        schematic: "dosing",
        image: "/assets/images/subsea/bento-02-manifold.jpg",
        badge: "DISPENSER SCHEMATIC // FLUIDICS",
        title: "ACTIVE CLOSED-LOOP INJECTION MANIFOLD",
        tag: "MICRO-DOSED BIO-POLYMER"
      },
      {
        schematic: "sensing",
        image: "/assets/images/subsea/bento-03-adcp.jpg",
        badge: "SENSOR SCHEMATIC // TELEMETRY",
        title: "DUAL 600 KHZ ADCP & OPTICAL TURBIDITY ARRAY",
        tag: "REAL-TIME HYDRODYNAMIC PROCESSING"
      },
      {
        schematic: "materials",
        image: "/assets/images/subsea/bento-07-pressure-vessel.jpg",
        badge: "MATERIALS SCHEMATIC // CORROSION PROOF",
        title: "GRADE 5 TITANIUM ENCLOSURES & RESIN MATRIX",
        tag: "PRESSURE-BALANCED OIL-FILLED (PBOF)"
      },
      {
        schematic: "interfaces",
        image: "/assets/images/subsea/bento-05-telemetry.jpg",
        badge: "PAYLOAD SCHEMATIC // UMBILICAL",
        title: "ISO 13628-8 SUBSEA UMBILICAL INTERFACE",
        tag: "HOT-SWAPPABLE 10 GBPS LINK"
      }
    ],
    specs: [
      { category: "chassis", param: "OPERATIONAL DEPTH", val: "6,000 m / 19,685 ft", meta: "[ 600 BAR HYDROSTATIC ]" },
      { category: "chassis", param: "FRAME DIMENSIONS", val: "3.80 m × 2.40 m × 1.85 m", meta: "[ MODULAR BENTHIC SLED ]" },
      { category: "chassis", param: "DRY WEIGHT", val: "1,850 kg / 4,078 lbs", meta: "[ CRANE DEPLOYABLE ]" },
      { category: "chassis", param: "IN-WATER WEIGHT", val: "Neutrally Buoyant", meta: "[ SYNTACTIC FOAM BALANCED ]" },
      { category: "chassis", param: "MAX PAYLOAD RATING", val: "2,500 kg / 5,510 lbs", meta: "[ COLLECTOR INTERFACE ]" },
      { category: "dosing", param: "SLURRY FLOW CAPACITY", val: "12,000 m³/h Throughput", meta: "[ CONTINUOUS PROCESSING ]" },
      { category: "dosing", param: "FLOCCULANT DOSING RANGE", val: "0.5 – 5.0 ppm Active Dosing", meta: "[ CLOSED-LOOP ADAPTIVE ]" },
      { category: "dosing", param: "SETTLING VELOCITY MULTIPLIER", val: ">20x Acceleration", meta: "[ RAPID BENTHIC DROP ]" },
      { category: "dosing", param: "INJECTION VALVE RATING", val: "600 Bar Pressure-Balanced", meta: "[ ZERO-LEAK SOLENOIDS ]" },
      { category: "sensing", param: "ACOUSTIC CURRENT PROFILER", val: "Dual 600 kHz Teledyne ADCP", meta: "[ 3D WATER COLUMN VECTORS ]" },
      { category: "sensing", param: "OPTICAL BACKSCATTER", val: "Dual 850 nm Nephelometric OBS", meta: "[ 0 – 4,000 NTU RANGE ]" },
      { category: "sensing", param: "SEDIMENT REDEPOSITION FACTOR", val: ">90% within 15 Minutes", meta: "[ NATURE COMM. 2025 BENCHMARK ]" },
      { category: "sensing", param: "TELEMETRY UPLINK", val: "Acoustic & Subsea Optical Fiber", meta: "[ AUDITABLE G09 LOG ]" },
      { category: "materials", param: "PRIMARY METALLURGY", val: "Titanium Grade 5 (Ti-6Al-4V)", meta: "[ DEEP-ABYSS CORROSION IMMUNE ]" },
      { category: "materials", param: "BUOYANCY COMPOSITE", val: "6,000m Rated Syntactic Glass Foam", meta: "[ ZERO WATER ABSORPTION ]" },
      { category: "materials", param: "CHEMICAL BIO-COMPATIBILITY", val: "100% Non-Toxic Natural Biopolymer", meta: "[ OECD 202/203 COMPLIANT ]" },
      { category: "interfaces", param: "POWER & DATA UMBILICAL", val: "48V DC Bus / 10 Gbps Ethernet Fiber", meta: "[ ISO 13628-8 COMPLIANT ]" },
      { category: "interfaces", param: "MOBILIZATION FOOTPRINT", val: "Standard 20-Foot ISO Container Skid", meta: "[ NO SHIP RECONSTRUCTION ]" },
      { category: "interfaces", param: "DECK INTEGRATION", val: "Compatible with Commercial Vessels", meta: "[ 24-HOUR RAPID MOBILIZATION ]" }
    ],
    comparison: {
      kicker: "03 // STRATEGIC ADVANTAGE",
      title: "In-Situ Active Mitigation vs. Legacy Unmitigated Operations",
      lead: "A direct operational and environmental comparison of active chemical sediment flocculation against unmitigated mining discharge and passive post-hoc monitoring.",
      headers: {
        metric: "PERFORMANCE DIMENSION",
        conrad: "DRUNKEAST SYSTEM",
        legacy: "LEGACY UNMITIGATED / PASSIVE"
      },
      rows: [
        {
          metric: "Sediment Settling Velocity",
          conrad: "<strong>Accelerated >20x</strong> <span class=\"tag\">&lt;15 MIN SETTLING</span>",
          legacy: "3–6 Months (Uncontrolled 100+ km midwater drift)"
        },
        {
          metric: "Environmental Permitting",
          conrad: "<strong>Pre-Clearance Proof</strong> <span class=\"tag\">G09 &amp; ISA EMMP</span>",
          legacy: "Moratorium Risk / Suspended Exploitation Licences"
        },
        {
          metric: "Real-Time Feedback Control",
          conrad: "<strong>Autonomous Closed-Loop</strong> <span class=\"tag\">ADCP &amp; OBS TELEMETRY</span>",
          legacy: "Delayed Post-Hoc Retrieval (Zero active mitigation)"
        },
        {
          metric: "Marine Ecological Safety",
          conrad: "<strong>100% Biodegradable</strong> <span class=\"tag\">OECD 202/203 NON-TOXIC</span>",
          legacy: "Heavy Metal Re-suspension & Toxic Chemical Additives"
        },
        {
          metric: "Deployment Logistics",
          conrad: "<strong>20-Foot ISO Container Skid</strong> <span class=\"tag\">EXPEDITIONARY</span>",
          legacy: "Bespoke Multi-Million Offshore Vessel Retrofits"
        },
        {
          metric: "Commercial Cost Profile",
          conrad: "<strong>$100k–$300k Pilot Contract</strong> <span class=\"tag\">LIGHT ASSET LEASE</span>",
          legacy: "Tens of Millions in Stranded Vessel Downtime & Fines"
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
            "Highly concentrated initial client base (3 licensed operators: CIC, Moana Minerals, CSR); high customer engagement priority.",
            "Offshore support vessels and deep-sea robotics represent extreme capex; light-asset leasing and pilot service contracts reduce adoption hurdles.",
            "Early revenue secured through scientific trial grants and pre-mining environmental data verification."
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
            "6,000m abyssal conditions (600 bar hydrostatic pressure, 2°C temperature, zero ambient light) demand flawless hardware endurance.",
            "Sediment dispersion depends on abyssal bottom currents, particle size, and flocculation kinetics—requiring in-situ calibration.",
            "Dual architecture: 'Predictive Modeling' guides monitoring points while 'In-Situ Dosing' actively accelerates sedimentation."
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

    // Mission Statement
    mission: "We believe that innovation should go hand in hand with environmental responsibility. Our mission is to explore practical, science-based approaches to deep-sea challenges, combining technological development with a commitment to sustainability. By questioning existing approaches, testing new ideas, and learning from the natural world, we strive to contribute to a future in which ocean exploration and environmental protection can advance together.",

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
