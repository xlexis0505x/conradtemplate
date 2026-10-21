/**
 * Conrad Prototype — Global Content Dictionary
 * Serves as the primary content base for the Global (DrunkEast) edition.
 */

window.Conrad = window.Conrad || {};

window.Conrad.CONTENT_GLOBAL = {
  edition: "global",
  companyName: "DrunkEast",
  brandName: "DrunkEast",
  metaTitle: "Transforming Defense Capabilities with Advanced Technology | DrunkEast",
  
  // ── Navigation & Brand ────────────────────────────────────
  nav: {
    home: "Home",
    tech: "Technology",
    biz: "Business",
    about: "About Us"
  },

  // ── Home Route Content ────────────────────────────────────
  home: {
    heroKicker: "DEFENSE ARCHITECTURE // 2026",
    heroTitle: "Transforming Defense Capabilities with Advanced Technology",
    bentoCards: [
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
        desc: "Digitally synchronized robotic cell tooling driving unit manufacturing time down by an order of magnitude compared to legacy defense aerospace prime contractors.",
        image: "/_external/cdn.sanity.io/images/61nocsj5/production/a005eecc853d709de52769704c0a6cc1083ac7c4-1131x630.png"
      }
    ],
    scrubber: {
      kicker: "02 // ACOUSTIC SUPPRESSION DISSECTION",
      title: "Active Plume Boundary & Hydrodynamic Scrubber",
      lead: "Scroll through real-time internal flow geometry, high-frequency cavitation damping zones, and magnetic sensor telemetry.",
      steps: [
        {
          heading: "01 // Intake Flow Straightener & Acoustic Baffles",
          desc: "Engineered vortex suppression vanes eliminate high-frequency flow turbulence before hydrodynamic boundary compression."
        },
        {
          heading: "02 // Multi-Chamber Resonator Array",
          desc: "Tuned acoustic helmholtz cavities attenuate low-frequency acoustic radiation across 10 Hz to 2.5 kHz spectra."
        },
        {
          heading: "03 // Micro-Cavitation Annular Injectors",
          desc: "Sub-millimeter micro-bubble boundary layer decoupling acoustic transmission from seabed rock structures."
        },
        {
          heading: "04 // Autonomous Edge Sensor & Valve Modulator",
          desc: "Real-time acoustic feedback loop dynamically adjusts backpressure via electromagnetic pintles at 120 Hz."
        }
      ]
    }
  },

  // ── Technology Route Content ──────────────────────────────
  tech: {
    kicker: "02 // INDUSTRIAL SPECIFICATIONS",
    title: "Technical Envelope & Tolerances",
    lead: "High-density physical metrics, structural tolerances, and interface protocols built to military standards with commercial manufacturing agility."
  },

  // ── Business Route Content ────────────────────────────────
  biz: {
    kicker: "01 // COMMERCIAL DEFENSE DOCTRINE",
    title: "Fixed-Price Defense vs. The Cost-Plus Trap",
    lead: "The traditional defense industrial base is constrained by outdated contracting incentives. Conrad delivers military capabilities with private capital efficiency."
  },

  // ── About Route Content ───────────────────────────────────
  about: {
    kicker: "02 // CONTACT & ENGAGEMENT",
    title: "Direct Inquiries",
    lead: "For defense capabilities, partner integration, commercial deployment, or mission strategy inquiries, our specialized engineering and operations teams are available directly.",
    email: "inquiries@anduril.com"
  }
};
