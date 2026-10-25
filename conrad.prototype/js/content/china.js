/**
 * Conrad Prototype — China Edition Content Dictionary (POSEIDON)
 * Contains the POSEIDON edition branding, 6-factor PESTLE, Cook Islands TAM/SAM/SOM,
 * 16 ISA contractors pipeline, APA 7th references, and 8-letter P-O-S-E-I-D-O-N principles.
 * Rendered in 100% English per client requirements.
 */

window.Conrad = window.Conrad || {};

window.Conrad.CONTENT_CHINA = {
  edition: "china",
  companyName: "Poseidon",
  brandName: "POSEIDON",
  metaTitle: "Engineering Ocean Harmony: Next-Gen Sediment Control | POSEIDON",

  // ── Home Route Content Overrides ──────────────────────────
  home: {
    heroKicker: "MARINE ENVIRONMENTAL ENGINEERING // 2026",
    heroTitle: "Inspired by the Sea. Driven by Innovation.",
    heroLead: "Developing next-generation subsea sediment flocculation and closed-loop turbidity control systems to harmonize marine mineral extraction with ecological sustainability.",
    
    // Stats Bar
    stats: [
      {
        value: "254,654 km²",
        label: "TARGET EXPLORATION EEZ",
        sub: "Cook Islands exploration baseline across CIC Limited, Moana Minerals, and CSR"
      },
      {
        value: "22 Contracts",
        label: "PIPELINE OPPORTUNITY",
        sub: "19 ISA nodule exploration contracts + 3 national commercial licences"
      },
      {
        value: ">90%",
        label: "TURBIDITY SUPPRESSION",
        sub: "Accelerated benthic redeposition factor vs untreated slurry discharge"
      },
      {
        value: "0 Toxic Residuals",
        label: "MARINE ECO-SAFETY",
        sub: "100% biodegradable natural biopolymer chemistry compliant with OECD 202/203"
      }
    ],

    // 7 Core Bento Cards
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

  // ── Business Route Content Overrides ──────────────────────
  biz: {
    kicker: "01 // COMMERCIAL STRATEGY & VALUE PROPOSITION",
    title: "Unlocking the Environmental License to Operate",
    lead: "Seabed mineral developers face an existential hurdle: without verifiable sediment plume control, regulatory bodies cannot grant commercial exploitation contracts. POSEIDON turns environmental compliance into a permitted, defensible asset.",
    
    // Market Sizing TAM / SAM / SOM
    sizing: {
      kicker: "02 // MARKET SIZING & EXPANSION RUNWAY",
      title: "From Island Testbed to Global Abyssal Concessions",
      lead: "A structured beachhead strategy validating in-situ plume mitigation in the Cook Islands before expanding across global International Seabed Authority concessions.",
      cards: [
        {
          stage: "INITIAL SOM // 3-YEAR PILOT CONTRACT",
          cost: "US$100k – US$300k",
          sub: "1 PILOT RESEARCH & MONITORING CONTRACT",
          meta: [
            { label: "Target Client", value: "Cook Islands Operator (e.g. CSR / CIC)" },
            { label: "Deliverable", value: "In-situ plume simulation & trial skid" },
            { label: "Objective", value: "Validate G09 baseline compliance" }
          ]
        },
        {
          stage: "INITIAL SAM // COOK ISLANDS BEACHHEAD",
          cost: "US$600k – US$1.8M",
          sub: "3 LICENSED EXPLORATION HOLDERS",
          meta: [
            { label: "Market Base", value: "CIC Ltd, Moana Minerals, CSR Ltd" },
            { label: "Monitored Area", value: "254,654 km² Exploration Licences" },
            { label: "Scope", value: "Monitoring, modeling & baseline trials" }
          ]
        },
        {
          stage: "LOCAL TAM // COOK ISLANDS SEABED",
          cost: "US$1.5M – US$4.5M",
          sub: "OVER 3 YEARS ACROSS ALL 3 CONCESSIONS",
          meta: [
            { label: "Average Concession", value: "$500k – $1.5M per operator" },
            { label: "Services", value: "Hardware lease + chemical supply" },
            { label: "Driver", value: "Environment Regulations 2023" }
          ]
        },
        {
          stage: "GLOBAL INDUSTRY TAM // 2026 – 2034",
          cost: "US$6.18B → US$65.56B",
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
      title: "Cook Islands & Global Seabed Macro Operating Environment",
      lead: "A comprehensive six-dimensional analysis grounding our technology within sovereign Pacific EEZ jurisdiction, global seabed treaties, and environmental imperatives.",
      factors: [
        {
          letter: "P",
          name: "POLITICAL & REGULATORY DIRECTION",
          points: [
            "Cook Islands Seabed Minerals Authority (SBMA) exercises direct sovereign EEZ jurisdiction, independent of ISA CCZ treaty negotiations.",
            "Three exploration licenses granted in 2022 establish immediate, identifiable customer entities (CIC, Moana Minerals, CSR).",
            "Government maintains strict evidence-first policy: exploration licensing does not guarantee automatic commercial extraction approval.",
            "State investment participation via Cook Islands Investment Corporation (CIIC) strengthens public-private alignment.",
            "Dual regulatory oversight involving both SBMA and the National Environment Service (NES) requires integrated, tamper-proof reporting."
          ]
        },
        {
          letter: "E",
          name: "ECONOMIC & CLIENT DYNAMICS",
          points: [
            "Highly concentrated initial client base (3 licensed operators: CIC, Moana Minerals, CSR); high single-customer retention priority.",
            "Polymetallic nodule resource value does not automatically equal immediate commercial profit margins.",
            "Extreme subsea vessel, robotics, and sensor costs make operators intensely scrutinize offshore trial budgets.",
            "Asset-light software modeling and modular hardware leasing lower initial client adoption hurdles.",
            "Early revenue secured through scientific trial grants and pre-mining environmental data verification."
          ]
        },
        {
          letter: "S",
          name: "SOCIAL & COMMUNITY LICENSE",
          points: [
            "Pacific marine ecology, fisheries health, and indigenous cultural heritage demand robust social license to operate.",
            "Public consultation and transparent environmental disclosure require tamper-proof, auditable third-party sensor telemetry.",
            "Local Pacific employment, technical training, and supply chain participation foster long-term community trust.",
            "Monitoring outputs must be fully auditable and scientifically explainable rather than reliant on operator self-certification.",
            "Public communication focused strictly on risk mitigation, never claiming unproven environmental harmlessness."
          ]
        },
        {
          letter: "T",
          name: "TECHNOLOGICAL RELIABILITY",
          points: [
            "6,000m abyssal conditions (600 bar hydrostatic pressure, 2°C temperature, zero ambient light) demand flawless hardware endurance.",
            "Sediment dispersion depends on abyssal bottom currents, particle size, and flocculation kinetics—requiring in-situ calibration.",
            "Integrated sensor suite includes dual ADCP acoustic profiling, optical turbidity backscatter, and hydrographic profiling.",
            "Hydrodynamic models guide sensor placement and threshold selection, but real-time telemetry remains indispensable.",
            "Prioritize deliverable architecture: 'Monitor — Predict — Alert — Report', with mechanical injectors verified in subsequent trials."
          ]
        },
        {
          letter: "E",
          name: "ECOLOGICAL IMPACT",
          points: [
            "Nodule collection physically disturbs benthic micro-habitats; plume mitigation confines settling within the primary collection swath.",
            "Prevents transboundary sediment redeposition and cross-concession drift across marine protected areas.",
            "Midwater slurry discharge must be independently evaluated to prevent pelagic water-column disruption.",
            "Long-term biological recovery in abyssal tracks requires continuous, verifiable multi-year scientific monitoring.",
            "Validate mitigation efficacy and ensure zero toxic residual accumulation from biopolymer flocculant chemistry."
          ]
        },
        {
          letter: "L",
          name: "LEGAL & COMPLIANCE",
          points: [
            "Seabed Minerals Act 2019 defines statutory framework for marine exploration and extraction licenses.",
            "Environment (Seabed Minerals Activities) Regulations 2023 mandate strict Environmental Impact Assessments (EIA).",
            "2024 Harvesting and Mining Regulations establish future mining license framework, which is not automatically granted.",
            "Cook Islands G09 Standards guide Environmental Management & Monitoring Plans (EMMP), establishing clear demand for plume controls.",
            "Trials and extraction require independent environmental permits; compliance telemetry serves as primary evidentiary proof."
          ]
        }
      ]
    },

    // Global Pipeline
    pipeline: {
      kicker: "04 // ADDRESSABLE CONCESSION PIPELINE",
      title: "Global Seabed Contract Opportunities",
      lead: "22 identifiable contract-level opportunities across the International Seabed Authority and sovereign Pacific exclusive economic zones.",
      regions: [
        { name: "Clarion-Clipperton Zone (CCZ)", count: "17 Contracts", match: "★★★★★", actors: "NORI (Nauru/TMC), TOML (Tonga/TMC), GSR (Belgium), UKSR (UK), China Minmetals, DORD (Japan), OMS (Singapore), BGR (Germany)" },
        { name: "Cook Islands EEZ", count: "3 Licences", match: "★★★★★", actors: "CIC Limited (211,545 km²), Moana Minerals (23,630 km²), Cobalt Seabed Resources (19,479 km²)" },
        { name: "Central Indian Ocean Basin", count: "1 Contract", match: "★★★★★", actors: "Government of India (Polymetallic Nodules)" },
        { name: "Western Pacific Basin", count: "1 Contract", match: "★★★★★", actors: "Beijing Pioneer Hi-Tech Development Corporation (China)" },
        { name: "Indian Ocean Ridges", count: "5 Contracts", match: "★★★", actors: "COMRA (China), Republic of Korea, Germany (BGR), India (Polymetallic Sulfides)" },
        { name: "Mid-Atlantic Ridge", count: "3 Contracts", match: "★★★", actors: "Yuzhmorgeologiya (Russia), Ifremer (France), Poland (Polymetallic Sulfides)" },
        { name: "Western Pacific Seamounts", count: "4 Contracts", match: "★★★", actors: "JOGMEC (Japan), COMRA (China), Russia, South Korea (Cobalt-Rich Crusts)" }
      ]
    }
  },

  // ── About Route Content Overrides ─────────────────────────
  about: {
    heroKicker: "ABOUT US // POSEIDON",
    heroTitle: "Inspired by the Sea. Driven by Innovation.",
    heroLead: "In ancient Greek mythology, Poseidon was the god of the sea, a symbol of the ocean's immense power, mystery, and influence over the natural world. Inspired by this legacy, POSEIDON represents our ambition to explore the deep ocean while developing innovative solutions to its environmental challenges.",
    
    // Origin Story Details
    storyTitle: "The Story Behind POSEIDON",
    storyParagraphs: [
      "In ancient Greek mythology, Poseidon was the god of the sea, a symbol of the ocean's immense power, mystery, and influence over the natural world.",
      "Inspired by this legacy, POSEIDON represents our ambition to explore the deep ocean while developing innovative solutions to its environmental challenges. Just as the sea has fascinated humanity for millennia, the deep ocean continues to hold unanswered questions and untapped scientific potential.",
      "Yet exploration must come with responsibility. As human activity extends further into the ocean, we believe that scientific progress should be accompanied by a commitment to protecting marine ecosystems.",
      "For us, POSEIDON is more than a name. It is a reminder of the relationship between humanity, technology, and the natural world — and of our responsibility to ensure that the ocean's future remains sustainable."
    ],

    // Interactive Acronym Board (P-O-S-E-I-D-O-N)
    acronymTitle: "What POSEIDON Stands For",
    acronymSubtitle: "Each letter reflects a principle that guides our mission.",
    acronym: [
      {
        letter: "P",
        word: "Protection",
        principle: "Safeguarding marine ecosystems through responsible innovation.",
        image: "/assets/images/subsea/benthic-collector.jpg"
      },
      {
        letter: "O",
        word: "Ocean",
        principle: "Placing the ocean at the heart of our research and development.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/b95abc74192ac5ae36f6076031bb09dc0e09d318-1920x1080.png"
      },
      {
        letter: "S",
        word: "Sustainability",
        principle: "Designing solutions with long-term environmental impact in mind.",
        image: "/assets/images/subsea/bento-01-flocculation.jpg"
      },
      {
        letter: "E",
        word: "Exploration",
        principle: "Investigating the deep sea and the challenges that remain unknown.",
        image: "/assets/images/subsea/bento-06-offshore-skid.jpg"
      },
      {
        letter: "I",
        word: "Innovation",
        principle: "Turning scientific ideas into practical, effective solutions.",
        image: "/assets/images/subsea/bento-02-manifold.jpg"
      },
      {
        letter: "D",
        word: "Discovery",
        principle: "Using experimentation and research to deepen our understanding.",
        image: "/assets/images/subsea/bento-04-digital-twin.jpg"
      },
      {
        letter: "O",
        word: "Observation",
        principle: "Examining environmental changes through evidence and scientific measurement.",
        image: "/assets/images/subsea/bento-03-adcp.jpg"
      },
      {
        letter: "N",
        word: "Navigation",
        principle: "Finding a path towards a more sustainable relationship between technology and the ocean.",
        image: "/assets/images/subsea/bento-05-telemetry.jpg"
      }
    ],

    // Mission & Vision
    mission: "The deep sea is one of the least understood environments on Earth, yet it faces growing pressures from human activities. POSEIDON seeks to bridge the gap between technological innovation and environmental responsibility. Through scientific research, engineering, and experimentation, we aim to develop practical approaches to deep-sea challenges while recognising the complexity and uncertainty of marine ecosystems. Our goal is not simply to advance what technology can do, but to explore how it can be used more responsibly.",
    vision: "We envision a future in which the exploration of the deep ocean and the protection of its ecosystems can progress together. By combining curiosity with scientific rigour and innovation with sustainability, POSEIDON aspires to contribute to a future where technological advancement does not come at the expense of the natural world. The ocean holds the unknown. We work towards a better way to understand and protect it.",

    // Contact Directory
    contact: {
      kicker: "02 // CONNECT WITH US",
      title: "Direct Inquiries",
      lead: "Have a question, an idea, or an opportunity to collaborate? We welcome conversations with fellow innovators, ocean researchers, and state/private engineering partners.",
      email: "teamposeidon@gmail.com",
      company: "POSEIDON"
    }
  }
};
