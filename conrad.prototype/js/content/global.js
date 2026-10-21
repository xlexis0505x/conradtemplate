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
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/9ea5ae8181d48c78365c6f8d8e3f3f35208e5f55-3000x2000.jpg"
      },
      {
        title: "02 // Subsea Active Dispenser Manifold",
        subtitle: "6,000-Meter Depth-Rated Injection Architecture",
        desc: "Autonomous benthic manifold skid mounted directly to mining collector discharge chutes, delivering closed-loop micro-dosed chemical dispersion under 600 bar hydrostatic pressure.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/d23c6903421f10c7191873592b8e823362fecbe8-882x878.png"
      },
      {
        title: "03 // Acoustic & Turbidity Sensing",
        subtitle: "Real-Time Sensor Fusion & Edge Hydrodynamic Processing",
        desc: "Integrated dual 600 kHz Acoustic Doppler Current Profilers (ADCP) and 850nm optical backscatter sensors providing closed-loop environmental feedback to modulate dosing.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/c79ccecf787d455420edb440cbc7bf6a114cc680-882x878.png"
      },
      {
        title: "04 // Plume Dispersion Digital Twin",
        subtitle: "Predictive Numerical Modeling & Ocean Current Calibration",
        desc: "Real-time spatial plume migration simulation calibrated against abyssal benthic currents, predicting settling footprints and preventing transboundary particle drift.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/955e14dfee80e6022b1744580b6996cd435c6153-976x1952.jpg"
      },
      {
        title: "05 // G09 & ISA Regulatory Compliance",
        subtitle: "Automated Environmental Management & Monitoring Telemetry",
        desc: "Real-time compliance data stream designed to satisfy Cook Islands SBMA G09 standards and International Seabed Authority (ISA) benthic discharge monitoring regulations.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/35c91ba3a0603c99720933d52bad4c73f9fdca5f-3000x1500.jpg"
      },
      {
        title: "06 // Modular Offshore Skid",
        subtitle: "Containerized Research Vessel & Mining Barge Integration",
        desc: "Standardized subsea modular footprint compatible with commercial nodule collector trials and environmental survey vessels without requiring bespoke deck reconstructions.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/16113e3a588bd30e5c67bf2ee6d7a0847845fb28-3000x3000.jpg"
      },
      {
        title: "07 // 600-Bar Pressure Vessel & Valving",
        subtitle: "Titanium Subsea Valving & Zero-Failure Solenoid Actuation",
        desc: "Deep-ocean pressure-balanced electromagnetic valves eliminating mechanical pinch points, delivering uninterrupted operation under abyssal temperature and salinity extremes.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/a005eecc853d709de52769704c0a6cc1083ac7c4-1131x630.png"
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

  // ── Business Route Content ────────────────────────────────
  biz: {
    kicker: "01 // COMMERCIAL STRATEGY & VALUE PROPOSITION",
    title: "Unlocking the Environmental License to Operate",
    lead: "Seabed mineral developers face an existential hurdle: without verifiable sediment plume control, regulatory bodies cannot grant commercial exploitation contracts. DRUNKEAST turns environmental compliance into a permitted, defensible asset.",
    
    // Market Sizing TAM / SAM / SOM
    sizing: {
      kicker: "02 // MARKET SIZING & VALIDATION ROADMAP",
      title: "From Initial Island Concessions to Global Seabed Scale",
      lead: "A structured beachhead strategy focused on the Cook Islands regulatory testbed before expanding across international Clarion-Clipperton Zone concessions.",
      cards: [
        {
          stage: "INITIAL SOM // 3-YEAR PILOT CONTRACT",
          cost: "$100k – $300k",
          sub: "1 PILOT RESEARCH & MONITORING CONTRACT",
          meta: [
            { label: "Target Client", value: "Cook Islands Operator (e.g. CSR / CIC)" },
            { label: "Deliverable", value: "In-situ plume simulation & test skid" },
            { label: "Objective", value: "Validate G09 baseline compliance" }
          ]
        },
        {
          stage: "INITIAL SAM // COOK ISLANDS BEACHHEAD",
          cost: "$450k – $1.5M",
          sub: "3 LICENSED EXPLORATION HOLDERS",
          meta: [
            { label: "Market Base", value: "CIC Ltd, Moana Minerals, CSR Ltd" },
            { label: "Monitored Area", value: "254,654 km² Exploration Licences" },
            { label: "Scope", value: "Monitoring, modeling & baseline trials" }
          ]
        },
        {
          stage: "LOCAL TAM // COOK ISLANDS SEABED",
          cost: "$1.5M – $4.5M",
          sub: "OVER 3 YEARS ACROSS ALL 3 CONCESSIONS",
          meta: [
            { label: "Average Concession", value: "$500k – $1.5M per operator" },
            { label: "Services", value: "Hardware lease + chemical supply" },
            { label: "Driver", value: "Environment Regulations 2023" }
          ]
        },
        {
          stage: "GLOBAL INDUSTRY TAM // 2026 – 2034",
          cost: "$6.18B → $65.56B",
          sub: "34.3% CAGR DRIVEN BY CLEAN ENERGY TRANSITION",
          meta: [
            { label: "Key Critical Metals", value: "Nickel, Cobalt, Copper, Manganese" },
            { label: "Contract Base", value: "22 ISA & national nodule contracts" },
            { label: "Primary Mandate", value: "ISA Draft Exploitation Regulations" }
          ]
        }
      ]
    },

    // PESTLE Matrix
    pestle: {
      kicker: "03 // PESTLE STRATEGIC FRAMEWORK",
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
      kicker: "04 // ADDRESSABLE CONCESSION PIPELINE",
      title: "Global Seabed Contract Opportunities",
      lead: "22 identifiable contract-level opportunities across the International Seabed Authority and sovereign Pacific exclusive economic zones.",
      regions: [
        { name: "Clarion-Clipperton Zone (CCZ)", count: "17 Contracts", match: "★★★★★", actors: "TMC/NORI (Nauru), TOML (Tonga), GSR (Belgium), UKSR (UK), China Minmetals, DORD (Japan), BGR (Germany)" },
        { name: "Cook Islands EEZ", count: "3 Licences", match: "★★★★★", actors: "CIC Limited (211,545 km²), Moana Minerals (23,630 km²), Cobalt Seabed Resources (19,479 km²)" },
        { name: "Central Indian Ocean Basin", count: "1 Contract", match: "★★★★★", actors: "Government of India (Polymetallic Nodules)" },
        { name: "Western Pacific Basin", count: "1 Contract", match: "★★★★★", actors: "Beijing Pioneer Hi-Tech Development Corporation (China)" },
        { name: "Indian Ocean Ridges", count: "5 Contracts", match: "★★★", actors: "China (COMRA), South Korea, Germany (BGR), India (Polymetallic Sulfides)" },
        { name: "Mid-Atlantic Ridge", count: "3 Contracts", match: "★★★", actors: "Russia (Yuzhmorgeologiya), France (Ifremer), Poland (Polymetallic Sulfides)" },
        { name: "Western Pacific Seamounts", count: "4 Contracts", match: "★★★", actors: "Japan (JOGMEC), China (COMRA), Russia, South Korea (Cobalt-Rich Crusts)" }
      ]
    }
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
        principle: "Investigating the mysteries, extreme pressures, and environmental dynamics of the abyssal plain.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/273b69f85bec5374015642647464223b0501a17f-4000x2660.png"
      },
      {
        letter: "R",
        word: "Restoration",
        principle: "Developing pragmatic engineering solutions that support the rapid recovery of disturbed marine habitats.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/362212f069102419e04043c85353fc572ead5649-4000x2660.png"
      },
      {
        letter: "U",
        word: "Uncertainty",
        principle: "Embracing the complex unknown through rigorous research, controlled experimentation, and critical thinking.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/113f1d96997d7375017ad46ebcd24122de1e343f-1404x1080.png"
      },
      {
        letter: "N",
        word: "Navigation",
        principle: "Charting viable pathways through intricate scientific, oceanic, and regulatory compliance frameworks.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/1ec5966e21866afda6b535cb05350e2af41090d2-1993x1115.png"
      },
      {
        letter: "K",
        word: "Knowledge",
        principle: "Transforming empirical oceanographic research and sensor telemetry into actionable, auditable decisions.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/07ffa223dc2ddf1ca9d3af7307aa8e5e1a71a3fc-1404x1080.png"
      },
      {
        letter: "E",
        word: "Environmental Protection",
        principle: "Prioritising the long-term health, trophic integrity, and resilience of fragile deep-ocean ecosystems.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/216fe60b438d0b6b0ed8245321fc2c7905f0b45d-2000x1501.jpg"
      },
      {
        letter: "A",
        word: "Adaptation",
        principle: "Responding dynamically to changing benthic currents and plume densities with flexible in-situ dosing.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/05300e9a98ce923d121333250a314b71e01bec76-4000x2659.png"
      },
      {
        letter: "S",
        word: "Sustainability",
        principle: "Balancing the clean energy transition's mineral demands with uncompromising environmental responsibility.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/8a8448ff1a911087594846b35c0f58edb645cf46-4000x2660.png"
      },
      {
        letter: "T",
        word: "Technology",
        principle: "Applying advanced chemical engineering, acoustic physics, and robotics to solve real-world ocean challenges.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/add60aa1adc75c31cd2f9a267f589a2d62b81892-4000x2660.png"
      }
    ],

    // Mission Statement
    mission: "We believe that innovation should go hand in hand with environmental responsibility. Our mission is to explore practical, science-based approaches to deep-sea challenges, combining technological development with a commitment to sustainability. By questioning existing approaches, testing new ideas, and learning from the natural world, we strive to contribute to a future in which ocean exploration and environmental protection can advance together.",

    // Contact Directory
    contact: {
      kicker: "02 // GET IN TOUCH",
      title: "Direct Inquiries",
      lead: "Have a question, an idea, or an opportunity to collaborate? We welcome conversations with fellow innovators, ocean researchers, and mining concession operators.",
      email: "teamdrunkeast@gmail.com",
      company: "DRUNKEAST"
    }
  }
};
