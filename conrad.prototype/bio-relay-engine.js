import * as THREE from "./assets/js/lib/three.module.js";
import { GLTFLoader } from "./assets/js/lib/GLTFLoader.js";
import { DRACOLoader } from "./assets/js/lib/DRACOLoader.js";

/**
 * BioRelayScene — Real-Time 120 FPS WebGL Flocculation Engine
 * Scientifically grounded 4-stage visualization:
 *   Stage 01: Chitosan polymer bridging & surface charge neutralisation of fine sediment
 *   Stage 02: Gelatinised plant-starch adsorption & proposed polymer bridging under flow
 *   Stage 03: Fine-grained bentonite clay lamellae incorporation into the floc matrix
 *   Stage 04: Floc settling onto the abyssal seabed & deposit stability under bottom currents
 */
export class BioRelayScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.disposed = false;
    this.paused = false;
    this.progress = 0;
    this.smoothProgress = 0;
    this.uArr = [0, 0, 0, 0];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.clock = new THREE.Clock();

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(this.width, this.height, false);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.28;
    this.renderer.setClearColor(0x030811, 1);

    // Scene & Abyssal Depth Fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x040b16, 0.145);

    this.camera = new THREE.PerspectiveCamera(42, this.width / this.height, 0.08, 40);
    this.camera.position.set(0.32, 0.24, 2.85);
    this.lookTarget = new THREE.Vector3(-0.30, 0.0, 0.0);

    // Subsea ROV Inspection Lighting Rig
    const ambient = new THREE.AmbientLight(0xcbe5ff, 0.85);
    this.scene.add(ambient);

    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x0b192c, 1.05);
    this.scene.add(hemiLight);

    this.mainSpot = new THREE.SpotLight(0xf8fafc, 11.5, 22.0, Math.PI / 3.1, 0.55, 1.0);
    this.mainSpot.position.set(2.4, 3.6, 3.4);
    this.scene.add(this.mainSpot);
    this.scene.add(this.mainSpot.target);

    this.frontFill = new THREE.DirectionalLight(0xbae6fd, 1.25);
    this.frontFill.position.set(-2.2, 1.5, 2.8);
    this.scene.add(this.frontFill);

    this.softRim = new THREE.DirectionalLight(0x7dd3fc, 1.45);
    this.softRim.position.set(-1.5, 2.1, -2.5);
    this.scene.add(this.softRim);

    // Master Simulation Group (shifted right so left text pillar has clean breathing room)
    this.simGroup = new THREE.Group();
    this.simGroup.position.set(0.56, 0.08, 0.0);
    this.scene.add(this.simGroup);
    this.mainSpot.target = this.simGroup;

    // Reusable scratch objects (zero per-frame heap allocations)
    this.dummy = new THREE.Object3D();
    this._tubeP = new THREE.Vector3();
    this._tubeTmpA = new THREE.Vector3();
    this._tubeTmpB = new THREE.Vector3();
    this._tubeT = new THREE.Vector3();
    this._tubePrevT = new THREE.Vector3();
    this._tubeN = new THREE.Vector3();
    this._tubeB = new THREE.Vector3();
    this._tubeAxis = new THREE.Vector3();
    this._tubeNormal = new THREE.Vector3();

    // Build layers
    this._buildAbyssalBackdrop();
    this._buildMarineSnow();
    this._buildFineSedimentParticles();
    this._buildChitosanPolymer();
    this._buildAminoAttachmentTethers();
    this._buildGelatinisedStarchBridges();
    this._buildCurrentStreamlines();
    this._buildHydrogelFloc();
    this._buildBentoniteClayPlatelets();
    this._buildExpelledWater();
    this._buildFallbackSeafloor();

    // Load Blender-authored Draco GLB assets (seabed.glb, mineral_grains.glb, labels.glb)
    this.calloutItems = [];
    this._vAnchor = new THREE.Vector3();
    this._vLabelPos = new THREE.Vector3();
    this._vCamRight = new THREE.Vector3();
    this._vCamUp = new THREE.Vector3();
    this._loadBlenderAssets();

    this.setSize(this.width, this.height);
    this._animate = this._animate.bind(this);
    this.rafId = requestAnimationFrame(this._animate);
  }

  _seededRandom(seed) {
    const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
  }

  _smoothstep(edge0, edge1, x) {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  _lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // Deep-Ocean Water Column Gradient Dome (continuous aqueous environment throughout all 4 stages)
  _buildAbyssalBackdrop() {
    const domeGeo = new THREE.SphereGeometry(18, 32, 24);
    const pos = domeGeo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const cTop = new THREE.Color(0x07162b);
    const cMid = new THREE.Color(0x040c1a);
    const cBot = new THREE.Color(0x061324);
    const cTmp = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const yNorm = pos.getY(i) / 18.0;
      if (yNorm >= 0) {
        cTmp.lerpColors(cMid, cTop, Math.pow(yNorm, 0.8));
      } else {
        cTmp.lerpColors(cMid, cBot, Math.pow(-yNorm, 0.7));
      }
      colors[i * 3] = cTmp.r;
      colors[i * 3 + 1] = cTmp.g;
      colors[i * 3 + 2] = cTmp.b;
    }
    domeGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const domeMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      side: THREE.BackSide,
      fog: false,
      depthWrite: false,
    });
    this.backdropDome = new THREE.Mesh(domeGeo, domeMat);
    this.scene.add(this.backdropDome);
  }

  // Ambient Marine Snow & Suspended Seawater Micro-Specks (reinforces continuous seawater medium)
  _buildMarineSnow() {
    this.SNOW_COUNT = 110;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(this.SNOW_COUNT * 3);
    this.snowData = [];

    for (let i = 0; i < this.SNOW_COUNT; i++) {
      const x = (this._seededRandom(i * 5 + 1) - 0.35) * 4.8;
      const y = (this._seededRandom(i * 5 + 2) - 0.5) * 3.4;
      const z = (this._seededRandom(i * 5 + 3) - 0.5) * 3.6;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      this.snowData.push({
        x,
        y,
        z,
        speed: 0.015 + this._seededRandom(i * 5 + 4) * 0.025,
        phase: this._seededRandom(i * 5 + 5) * Math.PI * 2,
      });
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.016,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    });
    this.snowPoints = new THREE.Points(geo, mat);
    this.scene.add(this.snowPoints);
  }

  // 1. Fine Sediment Particles (220 instanced irregular mineral flakes)
  _buildFineSedimentParticles() {
    this.CLAY_COUNT = 220;
    const shape = new THREE.Shape();
    const pts = 12;
    for (let i = 0; i < pts; i++) {
      const ang = (i / pts) * Math.PI * 2;
      const r = 0.042 * (1 + 0.14 * Math.cos(3 * ang) + 0.08 * Math.sin(5 * ang));
      const x = Math.cos(ang) * r;
      const y = Math.sin(ang) * r * 0.75;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.0055,
      bevelEnabled: true,
      bevelThickness: 0.0014,
      bevelSize: 0.0014,
      bevelSegments: 1,
    });
    geo.center();

    const mat = new THREE.MeshStandardMaterial({
      roughness: 0.66,
      metalness: 0.05,
    });

    this.clayMesh = new THREE.InstancedMesh(geo, mat, this.CLAY_COUNT);
    this.clayData = [];

    const sedimentPalettes = [
      new THREE.Color(0xd2a475),
      new THREE.Color(0xbf956c),
      new THREE.Color(0xd9b58c),
      new THREE.Color(0xb0875e),
      new THREE.Color(0x9e7b56),
    ];

    for (let i = 0; i < this.CLAY_COUNT; i++) {
      const phi = this._seededRandom(i * 3 + 1) * Math.PI * 2;
      const cosT = this._seededRandom(i * 3 + 2) * 2 - 1;
      const sinT = Math.sqrt(Math.max(0, 1 - cosT * cosT));
      const rad = 0.26 + Math.cbrt(this._seededRandom(i * 3 + 3)) * 0.88;

      const initPos = new THREE.Vector3(
        rad * sinT * Math.cos(phi),
        rad * cosT * 0.72,
        rad * sinT * Math.sin(phi) * 0.88
      );

      // Bridged floc position (leaves open interstitial spaces where bentonite platelets integrate)
      const coreRad = 0.06 + Math.cbrt(this._seededRandom(i * 7 + 4)) * 0.25;
      const corePos = new THREE.Vector3(
        coreRad * sinT * Math.cos(phi) + (this._seededRandom(i * 7 + 1) - 0.5) * 0.05,
        coreRad * cosT * 0.86 + (this._seededRandom(i * 7 + 2) - 0.5) * 0.05,
        coreRad * sinT * Math.sin(phi) + (this._seededRandom(i * 7 + 3) - 0.5) * 0.05
      );

      const colIdx = Math.floor(this._seededRandom(i * 19 + 7) * sedimentPalettes.length);
      const col = sedimentPalettes[colIdx].clone();
      const jitter = (this._seededRandom(i * 23 + 3) - 0.5) * 0.10;
      col.offsetHSL(0, 0, jitter);
      this.clayMesh.setColorAt(i, col);

      this.clayData.push({
        initPos,
        corePos,
        rot: new THREE.Euler(
          this._seededRandom(i * 5 + 1) * Math.PI * 2,
          this._seededRandom(i * 5 + 2) * Math.PI * 2,
          this._seededRandom(i * 5 + 3) * Math.PI * 2
        ),
        scale: 0.72 + this._seededRandom(i * 11) * 0.82,
        phase: this._seededRandom(i * 13) * Math.PI * 2,
        captureDelay: Math.min(0.32, (rad - 0.26) * 0.34),
      });
    }
    if (this.clayMesh.instanceColor) this.clayMesh.instanceColor.needsUpdate = true;
    this.simGroup.add(this.clayMesh);
  }

  // 2. Chitosan Polymer Chains & Amino Binding Sites
  // Chains start extended across the plume and gradually bridge & draw sediment together
  // simultaneously with particle capture (no premature shrinking before particle capture).
  _buildChitosanPolymer() {
    this.chitosanGroup = new THREE.Group();
    this.chitosanStrands = [];
    this.allAmineNodes = [];

    const strandMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.30,
      roughness: 0.24,
      metalness: 0.02,
      clearcoat: 0.60,
      clearcoatRoughness: 0.16,
    });

    const amineGeo = new THREE.SphereGeometry(0.018, 14, 14);
    const amineMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.78,
      roughness: 0.22,
    });

    const tubularSegments = 36;
    const radialSegments = 8;
    const radius = 0.0085;

    this._tubeSinTable = new Float32Array(radialSegments + 1);
    this._tubeCosTable = new Float32Array(radialSegments + 1);
    for (let j = 0; j <= radialSegments; j++) {
      const v = (j / radialSegments) * Math.PI * 2;
      this._tubeSinTable[j] = Math.sin(v);
      this._tubeCosTable[j] = -Math.cos(v);
    }

    for (let s = 0; s < 3; s++) {
      const pts = [];
      const basePts = [];
      const corePts = [];
      const numPts = 16;
      for (let i = 0; i < numPts; i++) {
        const t = i / (numPts - 1);
        const angle = t * Math.PI * 2.5 + (s * Math.PI * 2) / 3;
        const pInit = new THREE.Vector3(
          Math.sin(angle) * 0.76,
          (t - 0.5) * 0.98,
          Math.cos(angle) * 0.66
        );
        const pCore = pInit.clone().multiplyScalar(0.34);
        basePts.push(pInit);
        corePts.push(pCore);
        pts.push(pInit.clone());
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const tubeGeo = new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false);
      tubeGeo.attributes.position.setUsage(THREE.DynamicDrawUsage);
      tubeGeo.attributes.normal.setUsage(THREE.DynamicDrawUsage);
      const mesh = new THREE.Mesh(tubeGeo, strandMat);
      mesh.frustumCulled = false;
      this.chitosanGroup.add(mesh);

      const amines = [];
      for (let a = 0; a < 8; a++) {
        const dot = new THREE.Mesh(amineGeo, amineMat);
        this.chitosanGroup.add(dot);
        const amineObj = { mesh: dot, u: (a + 0.5) / 8, worldPos: new THREE.Vector3() };
        amines.push(amineObj);
        this.allAmineNodes.push(amineObj);
      }

      this.chitosanStrands.push({
        mesh,
        curve,
        tubularSegments,
        radialSegments,
        radius,
        basePts,
        corePts,
        pts,
        amines,
        strandIdx: s,
        hasStartFrame: false,
        prevStartT: new THREE.Vector3(),
        startN: new THREE.Vector3(),
      });
    }
    this.simGroup.add(this.chitosanGroup);
  }

  // In-place vertex & normal buffer update for chitosan polymer tubes (eliminates per-frame TubeGeometry GC churn
  // and keeps the start frame temporally continuous via parallel transport so strands never flash/snap)
  _updateChitosanTubeInPlace(strand) {
    const { curve, mesh, tubularSegments, radialSegments, radius } = strand;
    const posAttr = mesh.geometry.attributes.position;
    const normAttr = mesh.geometry.attributes.normal;
    const sinTable = this._tubeSinTable;
    const cosTable = this._tubeCosTable;

    const P = this._tubeP;
    const tmpA = this._tubeTmpA;
    const tmpB = this._tubeTmpB;
    const T = this._tubeT;
    const prevT = this._tubePrevT;
    const N = this._tubeN;
    const B = this._tubeB;
    const axis = this._tubeAxis;
    const normal = this._tubeNormal;
    const eps = 0.0005;

    for (let i = 0; i <= tubularSegments; i++) {
      const u = i / tubularSegments;
      curve.getPoint(u, P);
      curve.getPoint(Math.max(0, u - eps), tmpA);
      curve.getPoint(Math.min(1, u + eps), tmpB);
      T.subVectors(tmpB, tmpA);
      if (T.lengthSq() > 1e-12) {
        T.normalize();
      } else {
        T.set(0, 1, 0);
      }

      if (i === 0) {
        if (!strand.hasStartFrame) {
          const tx = Math.abs(T.x);
          const ty = Math.abs(T.y);
          const tz = Math.abs(T.z);
          if (tx <= ty && tx <= tz) {
            normal.set(1, 0, 0);
          } else if (ty <= tx && ty <= tz) {
            normal.set(0, 1, 0);
          } else {
            normal.set(0, 0, 1);
          }
          axis.crossVectors(T, normal).normalize();
          N.crossVectors(T, axis).normalize();
          strand.prevStartT.copy(T);
          strand.startN.copy(N);
          strand.hasStartFrame = true;
        } else {
          // Parallel-transport the starting normal across frames to eliminate axis-flip flashing
          N.copy(strand.startN);
          axis.crossVectors(strand.prevStartT, T);
          if (axis.lengthSq() > 1e-10) {
            axis.normalize();
            const cosTheta = Math.max(-1, Math.min(1, strand.prevStartT.dot(T)));
            N.applyAxisAngle(axis, Math.acos(cosTheta));
          }
          N.addScaledVector(T, -N.dot(T));
          if (N.lengthSq() > 1e-12) N.normalize();
          strand.prevStartT.copy(T);
          strand.startN.copy(N);
        }
        B.crossVectors(T, N).normalize();
        prevT.copy(T);
      } else {
        axis.crossVectors(prevT, T);
        if (axis.lengthSq() > 1e-10) {
          axis.normalize();
          const cosTheta = Math.max(-1, Math.min(1, prevT.dot(T)));
          N.applyAxisAngle(axis, Math.acos(cosTheta));
        }
        N.addScaledVector(T, -N.dot(T));
        if (N.lengthSq() > 1e-12) N.normalize();
        B.crossVectors(T, N);
        if (B.lengthSq() > 1e-12) B.normalize();
        prevT.copy(T);
      }

      const rowOffset = i * (radialSegments + 1);
      for (let j = 0; j <= radialSegments; j++) {
        const sin = sinTable[j];
        const cos = cosTable[j];
        let nx = cos * N.x + sin * B.x;
        let ny = cos * N.y + sin * B.y;
        let nz = cos * N.z + sin * B.z;
        const invLen = 1.0 / (Math.hypot(nx, ny, nz) || 1.0);
        nx *= invLen;
        ny *= invLen;
        nz *= invLen;

        const vIdx = rowOffset + j;
        normAttr.setXYZ(vIdx, nx, ny, nz);
        posAttr.setXYZ(vIdx, P.x + radius * nx, P.y + radius * ny, P.z + radius * nz);
      }
    }

    posAttr.needsUpdate = true;
    normAttr.needsUpdate = true;
  }

  // 2B. Stage 01: Amino-to-Sediment Attachment Links (polymer bridging + surface charge neutralisation)
  _buildAminoAttachmentTethers() {
    this.TETHER_COUNT = 60;
    const positions = new Float32Array(this.TETHER_COUNT * 2 * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    this.tetherMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.tetherLines = new THREE.LineSegments(geo, this.tetherMat);
    this.tetherPairs = [];
    for (let i = 0; i < this.TETHER_COUNT; i++) {
      this.tetherPairs.push({
        amineIdx: i % this.allAmineNodes.length,
        clayIdx: Math.floor((i * 3 + 1) % this.CLAY_COUNT),
      });
    }
    this.simGroup.add(this.tetherLines);
  }

  // 3. Stage 02: Gelatinised Plant-Starch Polymer Bridging Strands
  _buildGelatinisedStarchBridges() {
    const bridgeIndices = [];
    const maxBridges = 95;
    for (let i = 0; i < this.CLAY_COUNT && bridgeIndices.length < maxBridges; i += 2) {
      const pA = this.clayData[i].corePos;
      let bestJ = -1;
      let bestDist = 999;
      for (let j = i + 1; j < this.CLAY_COUNT; j++) {
        const d = pA.distanceTo(this.clayData[j].corePos);
        if (d > 0.08 && d < 0.23 && d < bestDist) {
          bestDist = d;
          bestJ = j;
        }
      }
      if (bestJ !== -1) {
        bridgeIndices.push([i, bestJ]);
      }
    }

    this.starchBridges = bridgeIndices;
    const positions = new Float32Array(bridgeIndices.length * 2 * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    this.starchLineMat = new THREE.LineBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    this.starchLines = new THREE.LineSegments(geo, this.starchLineMat);
    this.simGroup.add(this.starchLines);

    // Flexible gelatinised starch polymer strands adsorbed across the floc
    this.starchRibGroup = new THREE.Group();
    this.starchRibMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xb45309,
      emissiveIntensity: 0.22,
      roughness: 0.48,
      transparent: true,
      opacity: 0.0,
    });
    for (let w = 0; w < 6; w++) {
      const pts = [];
      for (let k = 0; k < 9; k++) {
        const ang = (k / 8) * Math.PI * 2 + w * 1.05;
        const r = 0.17 + 0.07 * Math.sin(k * 2.3 + w);
        pts.push(
          new THREE.Vector3(
            Math.cos(ang) * r,
            Math.sin(ang * 1.4 + w) * 0.18,
            Math.sin(ang) * r
          )
        );
      }
      const curve = new THREE.CatmullRomCurve3(pts, true);
      const tGeo = new THREE.TubeGeometry(curve, 32, 0.0042, 6, true);
      this.starchRibGroup.add(new THREE.Mesh(tGeo, this.starchRibMat));
    }
    this.simGroup.add(this.starchRibGroup);
  }

  // 3B. Stage 02 & 04: Controlled Water Current Streamlines
  _buildCurrentStreamlines() {
    this.STREAM_COUNT = 26;
    const geo = new THREE.CylinderGeometry(0.0022, 0.0022, 0.42, 6);
    geo.rotateZ(Math.PI / 2);

    this.streamMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });

    this.streamMesh = new THREE.InstancedMesh(geo, this.streamMat, this.STREAM_COUNT);
    this.streamData = [];
    for (let i = 0; i < this.STREAM_COUNT; i++) {
      this.streamData.push({
        y: (this._seededRandom(i * 4 + 1) - 0.5) * 0.95,
        z: (this._seededRandom(i * 4 + 2) - 0.5) * 0.85,
        speed: 1.35 + this._seededRandom(i * 4 + 3) * 0.85,
        offset: this._seededRandom(i * 4 + 4) * 3.0,
        len: 0.65 + this._seededRandom(i * 4 + 5) * 0.85,
      });
    }
    this.simGroup.add(this.streamMesh);
  }

  // 4. Translucent Hydrated Hydrogel Floc Envelope (present across Stages 1-2, squeezed out as bentonite enters in Stage 3)
  _buildHydrogelFloc() {
    const geo = new THREE.IcosahedronGeometry(0.36, 4);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n =
        1.0 +
        0.10 * Math.sin(v.x * 10.0 + v.y * 7.0) * Math.cos(v.z * 9.0) +
        0.045 * Math.cos(v.y * 15.0);
      v.multiplyScalar(n);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();

    this.flocMat = new THREE.MeshPhysicalMaterial({
      color: 0x60a5fa,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.14,
      roughness: 0.14,
      transmission: 0.84,
      transparent: true,
      opacity: 0.0,
      ior: 1.34,
      thickness: 0.38,
      depthWrite: false,
    });

    this.flocMesh = new THREE.Mesh(geo, this.flocMat);
    this.flocMesh.renderOrder = 10;
    this.simGroup.add(this.flocMesh);
  }

  // 5. Stage 03: Fine-Grained Bentonite Clay Lamellae (montmorillonite platelets integrating into the floc)
  _buildBentoniteClayPlatelets() {
    this.BENT_COUNT = 75;
    const shape = new THREE.Shape();
    const pts = 14;
    for (let i = 0; i < pts; i++) {
      const ang = (i / pts) * Math.PI * 2;
      const r = 0.034 * (1 + 0.15 * Math.sin(3 * ang + 0.4) + 0.09 * Math.cos(5 * ang));
      const x = Math.cos(ang) * r;
      const y = Math.sin(ang) * r * 0.82;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.0042,
      bevelEnabled: true,
      bevelThickness: 0.001,
      bevelSize: 0.001,
      bevelSegments: 1,
    });
    geo.center();

    const mat = new THREE.MeshStandardMaterial({
      color: 0x8fa8b8, // Cool mineral slate-teal clay tone to distinguish montmorillonite lamellae from warm sediment
      roughness: 0.72,
      metalness: 0.04,
    });

    this.bentMesh = new THREE.InstancedMesh(geo, mat, this.BENT_COUNT);
    this.bentData = [];

    for (let i = 0; i < this.BENT_COUNT; i++) {
      const ang = this._seededRandom(i * 9 + 1) * Math.PI * 2;
      const rStart = 0.38 + this._seededRandom(i * 9 + 2) * 0.55;
      const yStart = (this._seededRandom(i * 9 + 3) - 0.25) * 1.15;
      const startPos = new THREE.Vector3(
        Math.cos(ang) * rStart,
        yStart,
        Math.sin(ang) * rStart
      );

      // Interstitial incorporation target inside the bridged floc structure
      const rEnd = 0.05 + Math.cbrt(this._seededRandom(i * 9 + 4)) * 0.23;
      const thetaEnd = this._seededRandom(i * 9 + 5) * Math.PI * 2;
      const phiEnd = Math.acos(this._seededRandom(i * 9 + 6) * 2 - 1);
      const endPos = new THREE.Vector3(
        rEnd * Math.sin(phiEnd) * Math.cos(thetaEnd),
        rEnd * Math.cos(phiEnd) * 0.86,
        rEnd * Math.sin(phiEnd) * Math.sin(thetaEnd)
      );

      this.bentData.push({
        startPos,
        endPos,
        rot: new THREE.Euler(
          this._seededRandom(i * 4 + 1) * Math.PI * 2,
          this._seededRandom(i * 4 + 2) * Math.PI * 2,
          this._seededRandom(i * 4 + 3) * Math.PI * 2
        ),
        scale: 0.68 + this._seededRandom(i * 5) * 0.56,
        delay: this._seededRandom(i * 17) * 0.22,
        phase: this._seededRandom(i * 19) * Math.PI * 2,
      });
    }
    this.simGroup.add(this.bentMesh);
  }

  // 6. Stage 03: Expelled Pore Water Droplets (squeezed out ONLY as bentonite penetrates the floc)
  _buildExpelledWater() {
    this.DROP_COUNT = 48;
    const geo = new THREE.SphereGeometry(0.015, 10, 10);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.55,
      roughness: 0.06,
      transmission: 0.88,
      transparent: true,
      opacity: 0.9,
      ior: 1.333,
    });

    this.dropMesh = new THREE.InstancedMesh(geo, mat, this.DROP_COUNT);
    this.dropData = [];
    for (let i = 0; i < this.DROP_COUNT; i++) {
      const b = this.bentData[i % this.BENT_COUNT];
      const dir = b.endPos.clone();
      if (dir.lengthSq() < 1e-4) dir.set(1, 0.2, 0);
      dir.y = Math.max(-0.25, dir.y * 0.65);
      dir.normalize();
      this.dropData.push({
        dir,
        speed: 0.44 + this._seededRandom(i * 7) * 0.36,
        delay: b.delay,
      });
    }
    this.simGroup.add(this.dropMesh);
  }

  // 7. Fallback Seabed (immediately replaced/upgraded by Blender seabed.glb)
  _buildFallbackSeafloor() {
    this.seafloorGroup = new THREE.Group();
    this.seafloorGroup.position.set(0, -1.06, 0);

    const floorGeo = new THREE.PlaneGeometry(8.0, 8.0, 48, 48);
    floorGeo.rotateX(-Math.PI / 2);
    const pos = floorGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const r = Math.sqrt(x * x + z * z);
      const ripple = 0.025 * Math.sin(x * 3.4 + z * 1.15);
      const basin = -0.045 * Math.exp(-(r / 0.48) * (r / 0.48));
      pos.setY(i, ripple + basin);
    }
    floorGeo.computeVertexNormals();

    this.fallbackFloorMat = new THREE.MeshStandardMaterial({
      color: 0x132236,
      roughness: 0.88,
      metalness: 0.04,
      transparent: true,
      opacity: 0.0,
    });
    this.fallbackFloorMesh = new THREE.Mesh(floorGeo, this.fallbackFloorMat);
    this.seafloorGroup.add(this.fallbackFloorMesh);

    this.simGroup.add(this.seafloorGroup);
  }

  // Load Draco-compressed Blender GLB models (seabed.glb, mineral_grains.glb, labels.glb)
  _loadBlenderAssets() {
    const dracoPath = window.qualifyAssetUrl ? window.qualifyAssetUrl("/draco/") : "./draco/";
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(dracoPath);
    this._dracoLoader = dracoLoader;

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    let pendingLoads = 3;
    const onAssetSettled = () => {
      pendingLoads -= 1;
      if (pendingLoads <= 0 && this._dracoLoader === dracoLoader) {
        dracoLoader.dispose();
        this._dracoLoader = null;
      }
    };

    const seabedUrl = window.qualifyAssetUrl
      ? window.qualifyAssetUrl("/models/seabed.glb?v=20261118")
      : "./models/seabed.glb?v=20261118";

    gltfLoader.load(
      seabedUrl,
      (gltf) => {
        if (this.disposed) {
          this._disposeObject3D(gltf.scene);
          onAssetSettled();
          return;
        }
        this.blenderSeabed = gltf.scene;
        this.seabedMaterials = [];
        this.blenderSeabed.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.transparent = true;
            child.material.opacity = 0.0;
            child.material.needsUpdate = true;
            this.seabedMaterials.push(child.material);
          }
        });
        if (this.fallbackFloorMesh) {
          this.seafloorGroup.remove(this.fallbackFloorMesh);
          this.fallbackFloorMesh.geometry.dispose();
          this.fallbackFloorMat.dispose();
          this.fallbackFloorMesh = null;
          this.fallbackFloorMat = null;
        }
        this.seafloorGroup.add(this.blenderSeabed);
        onAssetSettled();
      },
      undefined,
      (err) => {
        console.warn("[bio-relay] seabed.glb fallback active:", err);
        onAssetSettled();
      }
    );

    const grainsUrl = window.qualifyAssetUrl
      ? window.qualifyAssetUrl("/models/mineral_grains.glb?v=20261118")
      : "./models/mineral_grains.glb?v=20261118";

    gltfLoader.load(
      grainsUrl,
      (gltf) => {
        if (this.disposed) {
          this._disposeObject3D(gltf.scene);
          onAssetSettled();
          return;
        }
        let clayGeo = null;
        gltf.scene.traverse((child) => {
          if (child.isMesh && child.name.indexOf("Clay_Platelet") !== -1) {
            clayGeo = child.geometry;
          }
        });
        if (clayGeo && this.clayMesh) {
          this.clayMesh.geometry.dispose();
          this.clayMesh.geometry = clayGeo;
        }
        // Dispose unused materials/geometries from the loaded glTF container while preserving clayGeo
        const keepGeos = new Set(clayGeo ? [clayGeo] : []);
        this._disposeObject3D(gltf.scene, keepGeos);
        onAssetSettled();
      },
      undefined,
      () => {
        onAssetSettled();
      }
    );

    const labelsUrl = window.qualifyAssetUrl
      ? window.qualifyAssetUrl("/models/labels.glb?v=20261118")
      : "./models/labels.glb?v=20261118";

    gltfLoader.load(
      labelsUrl,
      (gltf) => {
        if (this.disposed) {
          this._disposeObject3D(gltf.scene);
          onAssetSettled();
          return;
        }
        const labelSpecs = [
          {
            meshName: "Label_Chitosan",
            pStart: 0.02,
            pPeakIn: 0.06,
            pPeakOut: 0.21,
            pEnd: 0.25,
            offsetRight: 0.34,
            offsetUp: 0.24,
            lineColor: 0x38bdf8,
            anchorFn: () => {
              const node = this.allAmineNodes && this.allAmineNodes[2];
              if (node) return node.worldPos.clone().applyMatrix4(this.simGroup.matrixWorld);
              return new THREE.Vector3(0.75, 0.25, 0.0);
            },
          },
          {
            meshName: "Label_Sediment",
            pStart: 0.03,
            pPeakIn: 0.07,
            pPeakOut: 0.20,
            pEnd: 0.24,
            offsetRight: 0.36,
            offsetUp: -0.22,
            lineColor: 0xd2a475,
            anchorFn: () => {
              const d = this.clayData[14];
              const localS1 = this._smoothstep(0.05 + d.captureDelay * 0.45, 0.28, this.smoothProgress);
              return new THREE.Vector3(
                this._lerp(d.initPos.x, d.corePos.x, localS1),
                this._lerp(d.initPos.y, d.corePos.y, localS1),
                this._lerp(d.initPos.z, d.corePos.z, localS1)
              ).applyMatrix4(this.simGroup.matrixWorld);
            },
          },
          {
            meshName: "Label_Starch",
            pStart: 0.26,
            pPeakIn: 0.31,
            pPeakOut: 0.45,
            pEnd: 0.49,
            offsetRight: 0.36,
            offsetUp: 0.22,
            lineColor: 0xfbbf24,
            anchorFn: () => {
              return new THREE.Vector3(0.18, 0.14, 0.12).applyMatrix4(this.simGroup.matrixWorld);
            },
          },
          {
            meshName: "Label_Bentonite",
            pStart: 0.50,
            pPeakIn: 0.54,
            pPeakOut: 0.70,
            pEnd: 0.74,
            offsetRight: 0.36,
            offsetUp: 0.28,
            lineColor: 0x94a3b8,
            anchorFn: () => {
              const b = this.bentData[3];
              const packT = this._smoothstep(0.58 + b.delay * 0.45, 0.76 + b.delay * 0.2, this.smoothProgress);
              return new THREE.Vector3(
                this._lerp(b.endPos.x * 1.65, b.endPos.x, packT),
                this._lerp(b.endPos.y * 1.65, b.endPos.y, packT),
                this._lerp(b.endPos.z * 1.65, b.endPos.z, packT)
              ).applyMatrix4(this.simGroup.matrixWorld);
            },
          },
          {
            meshName: "Label_PoreWater",
            pStart: 0.59,
            pPeakIn: 0.63,
            pPeakOut: 0.74,
            pEnd: 0.78,
            offsetRight: 0.36,
            offsetUp: -0.22,
            lineColor: 0xbae6fd,
            anchorFn: () => {
              return new THREE.Vector3(0.28, -0.10, 0.18).applyMatrix4(this.simGroup.matrixWorld);
            },
          },
          {
            meshName: "Label_Deposit",
            pStart: 0.77,
            pPeakIn: 0.82,
            pPeakOut: 0.96,
            pEnd: 1.01,
            offsetRight: 0.38,
            offsetUp: 0.24,
            lineColor: 0xe2e8f0,
            anchorFn: () => {
              const s4 = this._smoothstep(0.74, 0.96, this.smoothProgress);
              const dropY = -0.96 * Math.pow(s4, 1.35);
              return new THREE.Vector3(0.16, dropY + 0.08, 0.10).applyMatrix4(this.simGroup.matrixWorld);
            },
          },
        ];

        for (const spec of labelSpecs) {
          let foundMesh = null;
          gltf.scene.traverse((child) => {
            if (child.isMesh && child.name.indexOf(spec.meshName) !== -1) {
              foundMesh = child;
            }
          });
          if (!foundMesh) continue;

          const origMat = foundMesh.material;
          const mat = origMat.clone();
          if (origMat && typeof origMat.dispose === "function") {
            origMat.dispose();
          }
          mat.transparent = true;
          mat.opacity = 0.0;
          mat.depthWrite = false;
          mat.depthTest = false;
          mat.fog = false;
          foundMesh.material = mat;
          foundMesh.renderOrder = 50;
          foundMesh.visible = false;
          // Normalize size cleanly via bounding box so every label has crisp, uniform readable height
          foundMesh.geometry.computeBoundingBox();
          const bb = foundMesh.geometry.boundingBox;
          const h = Math.max(0.01, bb.max.y - bb.min.y);
          const w = Math.max(0.01, bb.max.x - bb.min.x);
          const targetHeight = 0.078;
          const sc = targetHeight / h;
          foundMesh.scale.setScalar(sc);

          // Add a subtle dark translucent frosted pill backing behind each 3D text mesh
          // so white letters remain 100% legible even over bright clay/chitosan particles
          const padX = 0.024 / sc;
          const padY = 0.016 / sc;
          const bgW = w + padX * 2;
          const bgH = h + padY * 2;
          const bgShape = new THREE.Shape();
          const rx = -padX;
          const ry = bb.min.y - padY;
          const rad = Math.min(bgH * 0.22, 0.018 / sc);
          bgShape.moveTo(rx + rad, ry);
          bgShape.lineTo(rx + bgW - rad, ry);
          bgShape.quadraticCurveTo(rx + bgW, ry, rx + bgW, ry + rad);
          bgShape.lineTo(rx + bgW, ry + bgH - rad);
          bgShape.quadraticCurveTo(rx + bgW, ry + bgH, rx + bgW - rad, ry + bgH);
          bgShape.lineTo(rx + rad, ry + bgH);
          bgShape.quadraticCurveTo(rx, ry + bgH, rx, ry + bgH - rad);
          bgShape.lineTo(rx, ry + rad);
          bgShape.quadraticCurveTo(rx, ry, rx + rad, ry);

          const bgGeo = new THREE.ShapeGeometry(bgShape);
          const bgMat = new THREE.MeshBasicMaterial({
            color: 0x030811,
            transparent: true,
            opacity: 0.0,
            depthWrite: false,
            depthTest: false,
            fog: false,
          });
          const bgMesh = new THREE.Mesh(bgGeo, bgMat);
          bgMesh.position.z = -0.002 / sc;
          bgMesh.renderOrder = 49;
          foundMesh.add(bgMesh);

          // Subtle colored left accent bar on the pill for instant visual key matching
          const barGeo = new THREE.PlaneGeometry(0.006 / sc, bgH * 0.72);
          const barMat = new THREE.MeshBasicMaterial({
            color: spec.lineColor,
            transparent: true,
            opacity: 0.0,
            depthWrite: false,
            depthTest: false,
            fog: false,
          });
          const barMesh = new THREE.Mesh(barGeo, barMat);
          barMesh.position.set(rx + 0.009 / sc, (bb.min.y + bb.max.y) * 0.5, -0.001 / sc);
          barMesh.renderOrder = 50;
          foundMesh.add(barMesh);

          this.scene.add(foundMesh);

          const lineGeo = new THREE.BufferGeometry();
          lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(9), 3));
          const lineMat = new THREE.LineBasicMaterial({
            color: spec.lineColor,
            transparent: true,
            opacity: 0.0,
            depthWrite: false,
            depthTest: false,
            fog: false,
          });
          const line = new THREE.Line(lineGeo, lineMat);
          line.renderOrder = 49;
          line.visible = false;
          this.scene.add(line);

          const dotGeo = new THREE.SphereGeometry(0.010, 10, 10);
          const dotMat = new THREE.MeshBasicMaterial({
            color: spec.lineColor,
            transparent: true,
            opacity: 0.0,
            depthWrite: false,
            depthTest: false,
            fog: false,
          });
          const dot = new THREE.Mesh(dotGeo, dotMat);
          dot.renderOrder = 50;
          dot.visible = false;
          this.scene.add(dot);

          this.calloutItems.push({
            spec,
            mesh: foundMesh,
            mat,
            bgMesh,
            bgMat,
            barMesh,
            barMat,
            line,
            lineMat,
            dot,
            dotMat,
          });
        }
        // Dispose any leftover unused meshes/materials still in gltf.scene
        this._disposeObject3D(gltf.scene);
        onAssetSettled();
      },
      undefined,
      () => {
        onAssetSettled();
      }
    );
  }

  setProgress(progress, uArr) {
    this.progress = progress;
    if (uArr && uArr.length >= 4) {
      this.uArr = uArr;
    }
  }

  setSize(w, h) {
    if (this.disposed || !w || !h) return;
    this.width = w;
    this.height = h;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  setPaused(paused) {
    if (this.disposed) return;
    const next = !!paused;
    if (this.paused === next) return;
    this.paused = next;
    if (this.paused) {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    } else if (!this.rafId) {
      this.rafId = requestAnimationFrame(this._animate);
    }
  }

  _animate() {
    if (this.disposed || this.paused) {
      this.rafId = null;
      return;
    }
    const elapsed = this.clock.getElapsedTime();

    this.smoothProgress += (this.progress - this.smoothProgress) * 0.085;
    const p =
      Math.abs(this.progress - this.smoothProgress) < 0.0004
        ? this.progress
        : this.smoothProgress;

    // 4-Stage Scientific Timeline:
    // Stage 01 (0.00 - 0.25): Chitosan amino groups attach to fine sediment & bridge particles into flocs
    const s1 = this._smoothstep(0.06, 0.28, p);
    // Stage 02 (0.25 - 0.50): Gelatinised plant starch adsorbs & reinforces the floc against flow shear
    const s2 = this._smoothstep(0.25, 0.48, p);
    // Stage 03 (0.50 - 0.75): Fine bentonite clay platelets incorporate into the floc matrix
    const s3 = this._smoothstep(0.49, 0.74, p);
    // Stage 04 (0.75 - 1.00): Settling onto the abyssal seabed & testing deposit stability under bottom current
    const s4 = this._smoothstep(0.74, 0.96, p);

    // Camera Choreography
    const camX = this._lerp(0.30, 0.44, s2) - s4 * 0.10;
    const camY = this._lerp(0.20, 0.36, s3) + s4 * 0.16;
    const camZ = this._lerp(2.75, 2.95, s2) + s3 * 0.28 + s4 * 0.52;
    this.camera.position.set(camX, camY, camZ);

    const targetY = this._lerp(0.04, -0.58, s4);
    this.lookTarget.set(-0.28, targetY, 0.0);
    this.camera.lookAt(this.lookTarget);

    // Settling onto seabed & natural deposit spread (soft sediment mound, not a rigid shell)
    const masterDropY = -0.96 * Math.pow(s4, 1.35);
    const depositFlattenY = this._lerp(1.0, 0.44, this._smoothstep(0.82, 0.99, p));
    const depositSpreadXZ = this._lerp(1.0, 1.30, this._smoothstep(0.82, 0.99, p));

    // Gentle museum turntable rotation
    this.simGroup.rotation.y = elapsed * 0.035 + p * 0.75;

    // Update ambient marine snow drift (constant seawater medium throughout all 4 stages)
    if (this.snowPoints) {
      const sPos = this.snowPoints.geometry.attributes.position;
      for (let i = 0; i < this.SNOW_COUNT; i++) {
        const sd = this.snowData[i];
        const ny = ((sd.y - elapsed * sd.speed + 1.7) % 3.4) - 1.7;
        const nx = sd.x + Math.sin(elapsed * 0.4 + sd.phase) * 0.05;
        sPos.setXYZ(i, nx, ny, sd.z);
      }
      sPos.needsUpdate = true;
    }

    // Gentle hydrodynamic sway under flow in Stage 02
    const shearFlex =
      Math.sin(elapsed * 4.8) * 0.013 * this._smoothstep(0.26, 0.36, p) * (1.0 - s3);

    // 1. Update Fine Sediment Particles
    for (let i = 0; i < this.CLAY_COUNT; i++) {
      const d = this.clayData[i];
      const localS1 = this._smoothstep(0.05 + d.captureDelay * 0.45, 0.28, p);
      const driftAmp = (1.0 - localS1 * 0.88) * 0.022;
      const bx = Math.sin(elapsed * 0.42 + d.phase) * driftAmp + shearFlex;
      const by = Math.cos(elapsed * 0.34 + d.phase * 1.2) * driftAmp;
      const bz = Math.sin(elapsed * 0.28 + d.phase * 0.8) * driftAmp;

      const x = (this._lerp(d.initPos.x, d.corePos.x, localS1) + bx) * depositSpreadXZ;
      const y = (this._lerp(d.initPos.y, d.corePos.y, localS1) + by) * depositFlattenY + masterDropY;
      const z = (this._lerp(d.initPos.z, d.corePos.z, localS1) + bz) * depositSpreadXZ;

      this.dummy.position.set(x, y, z);

      const microSway = (1.0 - localS1 * 0.82) * 0.04;
      this.dummy.rotation.set(
        d.rot.x + Math.sin(elapsed * 0.45 + d.phase) * microSway,
        d.rot.y + Math.cos(elapsed * 0.38 + d.phase * 0.8) * microSway,
        d.rot.z + Math.sin(elapsed * 0.30 + d.phase * 1.4) * (microSway * 0.7)
      );

      const sc = d.scale;
      this.dummy.scale.set(sc, sc * this._lerp(1.0, 0.55, s4), sc);
      this.dummy.updateMatrix();
      this.clayMesh.setMatrixAt(i, this.dummy.matrix);
    }
    this.clayMesh.instanceMatrix.needsUpdate = true;

    // 2. Update Chitosan Polymer Strands & Amino Binding Sites (in-place buffer update, zero GC churn)
    for (const strand of this.chitosanStrands) {
      for (let i = 0; i < strand.pts.length; i++) {
        const p0 = strand.basePts[i];
        const p1 = strand.corePts[i];
        const wave =
          Math.sin(elapsed * 0.75 + i * 0.35 + strand.strandIdx) * 0.015 * (1 - s2 * 0.65);
        strand.pts[i].set(
          (this._lerp(p0.x, p1.x, s1) + wave + shearFlex) * depositSpreadXZ,
          (this._lerp(p0.y, p1.y, s1) + wave * 0.6) * depositFlattenY + masterDropY,
          (this._lerp(p0.z, p1.z, s1) - wave) * depositSpreadXZ
        );
      }
      this._updateChitosanTubeInPlace(strand);

      for (const a of strand.amines) {
        strand.curve.getPoint(a.u, this._tubeP);
        a.mesh.position.copy(this._tubeP);
        a.worldPos.copy(this._tubeP);
        const pulse = 1.0 + 0.10 * Math.sin(elapsed * 2.0 + a.u * 4.0);
        a.mesh.scale.setScalar(pulse * this._lerp(1.0, 0.75, s4));
      }
    }

    // 2B. Update Stage 01 Amino-to-Particle Attachment Links
    const tetherAlpha =
      this._smoothstep(0.01, 0.08, p) * (1.0 - this._smoothstep(0.25, 0.35, p));
    this.tetherMat.opacity = tetherAlpha * 0.65;
    this.tetherLines.visible = tetherAlpha > 0.01;
    if (this.tetherLines.visible) {
      const tAttr = this.tetherLines.geometry.attributes.position;
      for (let i = 0; i < this.TETHER_COUNT; i++) {
        const pair = this.tetherPairs[i];
        const aminePos = this.allAmineNodes[pair.amineIdx].worldPos;
        const cData = this.clayData[pair.clayIdx];
        const localS1 = this._smoothstep(0.05 + cData.captureDelay * 0.45, 0.28, p);
        const cx = this._lerp(cData.initPos.x, cData.corePos.x, localS1);
        const cy = this._lerp(cData.initPos.y, cData.corePos.y, localS1);
        const cz = this._lerp(cData.initPos.z, cData.corePos.z, localS1);
        tAttr.setXYZ(i * 2, aminePos.x, aminePos.y, aminePos.z);
        tAttr.setXYZ(i * 2 + 1, cx, cy, cz);
      }
      tAttr.needsUpdate = true;
    }

    // 3. Update Stage 02 Gelatinised Plant-Starch Polymer Bridging
    const starchAlpha = this._smoothstep(0.23, 0.37, p) * (1.0 - s4 * 0.45);
    this.starchLineMat.opacity = starchAlpha * 0.72;
    this.starchLines.visible = starchAlpha > 0.01;
    if (this.starchLines.visible) {
      const bAttr = this.starchLines.geometry.attributes.position;
      for (let k = 0; k < this.starchBridges.length; k++) {
        const [idxA, idxB] = this.starchBridges[k];
        const dA = this.clayData[idxA];
        const dB = this.clayData[idxB];
        const ax = (dA.corePos.x + shearFlex) * depositSpreadXZ;
        const ay = dA.corePos.y * depositFlattenY + masterDropY;
        const az = dA.corePos.z * depositSpreadXZ;

        const bx = (dB.corePos.x + shearFlex) * depositSpreadXZ;
        const by = dB.corePos.y * depositFlattenY + masterDropY;
        const bz = dB.corePos.z * depositSpreadXZ;

        bAttr.setXYZ(k * 2, ax, ay, az);
        bAttr.setXYZ(k * 2 + 1, bx, by, bz);
      }
      bAttr.needsUpdate = true;
    }

    this.starchRibMat.opacity = starchAlpha * 0.85;
    this.starchRibGroup.position.set(shearFlex, masterDropY, 0);
    this.starchRibGroup.scale.set(depositSpreadXZ, depositFlattenY, depositSpreadXZ);

    // 3B. Update Controlled Water Current Streamlines
    const shearVis =
      this._smoothstep(0.27, 0.34, p) * (1.0 - this._smoothstep(0.46, 0.53, p));
    const bottomFlowVis = this._smoothstep(0.82, 0.92, p) * 0.65;
    const streamOpacity = Math.max(shearVis, bottomFlowVis) * 0.45;
    this.streamMat.opacity = streamOpacity;
    this.streamMesh.visible = streamOpacity > 0.01;
    if (this.streamMesh.visible) {
      for (let i = 0; i < this.STREAM_COUNT; i++) {
        const st = this.streamData[i];
        const rawX = ((elapsed * st.speed + st.offset) % 2.6) - 1.3;
        const distYZ = Math.sqrt(st.y * st.y + st.z * st.z);
        const deflect = Math.exp(-(rawX * rawX) / 0.28) * Math.exp(-(distYZ * distYZ) / 0.22) * 0.24;
        const sy = (st.y >= 0 ? st.y + deflect : st.y - deflect * 0.3) + masterDropY * 0.85;
        this.dummy.position.set(rawX, sy, st.z);
        this.dummy.rotation.set(0, 0, deflect * (st.y >= 0 ? 0.45 : -0.25));
        this.dummy.scale.set(st.len, 1, 1);
        this.dummy.updateMatrix();
        this.streamMesh.setMatrixAt(i, this.dummy.matrix);
      }
      this.streamMesh.instanceMatrix.needsUpdate = true;
    }

    // 4. Update Hydrated Hydrogel Water Shell
    // Present throughout Stage 01 & Stage 02 (s1 -> 1.0), holds steady while bentonite approaches,
    // and ONLY shrinks & squeezes out as bentonite actually penetrates inside the floc (p = 0.58 -> 0.78)!
    const bentPenetration = this._smoothstep(0.58, 0.78, p);
    const shellGrow = this._smoothstep(0.06, 0.26, p);
    const shellSqueeze = 1.0 - bentPenetration; // Stays 1.0 until bentonite penetrates (p > 0.58), then squeezes out to 0
    const flocScale = shellGrow * shellSqueeze;
    this.flocMesh.visible = flocScale > 0.008;
    this.flocMat.opacity = shellGrow * (1.0 - bentPenetration * 0.85) * 0.44;
    this.flocMesh.position.set(shearFlex, masterDropY, 0);
    this.flocMesh.scale.set(
      flocScale * depositSpreadXZ,
      flocScale * depositFlattenY,
      flocScale * depositSpreadXZ
    );

    // 5. Update Fine Bentonite Clay Platelets Incorporating into Floc Matrix (Stage 03)
    // Phase A (0.48 -> 0.58): Approach outer surface of the water shell
    // Phase B (0.58 -> 0.76): Penetrate inside the floc & squeeze water out
    for (let i = 0; i < this.BENT_COUNT; i++) {
      const b = this.bentData[i];
      const approachT = this._smoothstep(0.48 + b.delay * 0.35, 0.58 + b.delay * 0.25, p);
      const packT = this._smoothstep(0.58 + b.delay * 0.45, 0.76 + b.delay * 0.2, p);

      if (approachT <= 0.001) {
        this.dummy.scale.set(0, 0, 0);
      } else {
        const surfX = b.endPos.x * 1.65;
        const surfY = b.endPos.y * 1.65;
        const surfZ = b.endPos.z * 1.65;

        let px, py, pz;
        if (packT <= 0.001) {
          px = this._lerp(b.startPos.x, surfX, approachT);
          py = this._lerp(b.startPos.y, surfY, approachT);
          pz = this._lerp(b.startPos.z, surfZ, approachT);
        } else {
          px = this._lerp(surfX, b.endPos.x, packT);
          py = this._lerp(surfY, b.endPos.y, packT);
          pz = this._lerp(surfZ, b.endPos.z, packT);
        }

        const drift = (1.0 - packT * 0.88) * 0.015;
        const bx = Math.sin(elapsed * 0.45 + b.phase) * drift;
        const by = Math.cos(elapsed * 0.38 + b.phase) * drift;
        const bz = Math.sin(elapsed * 0.32 + b.phase) * drift;

        const x = (px + bx + shearFlex) * depositSpreadXZ;
        const y = (py + by) * depositFlattenY + masterDropY;
        const z = (pz + bz) * depositSpreadXZ;

        this.dummy.position.set(x, y, z);
        const bSway = (1.0 - packT * 0.75) * 0.04;
        this.dummy.rotation.set(
          b.rot.x + Math.sin(elapsed * 0.4 + b.phase) * bSway,
          b.rot.y + Math.cos(elapsed * 0.35 + b.phase) * bSway,
          b.rot.z
        );
        const sc = b.scale * Math.min(1, approachT * 4.0);
        this.dummy.scale.set(sc, sc * this._lerp(1.0, 0.55, s4), sc);
      }
      this.dummy.updateMatrix();
      this.bentMesh.setMatrixAt(i, this.dummy.matrix);
    }
    this.bentMesh.instanceMatrix.needsUpdate = true;

    // 6. Update Expelled Pore Water Droplets (squeezed out ONLY as bentonite penetrates inside p = 0.58 -> 0.80)
    for (let i = 0; i < this.DROP_COUNT; i++) {
      const w = this.dropData[i];
      const wt = this._smoothstep(0.58 + w.delay * 0.45, 0.80 + w.delay * 0.2, p);
      if (wt <= 0.001 || wt >= 0.999) {
        this.dummy.scale.set(0, 0, 0);
      } else {
        const rStart = 0.28 * (1.0 - wt * 0.5);
        const dist = rStart + wt * w.speed * 0.52;
        this.dummy.position.set(
          w.dir.x * dist,
          w.dir.y * dist + masterDropY * 0.55 + wt * 0.22,
          w.dir.z * dist
        );
        const dropSc = Math.sin(wt * Math.PI) * 1.18;
        this.dummy.scale.set(dropSc, dropSc * 1.28, dropSc);
      }
      this.dummy.updateMatrix();
      this.dropMesh.setMatrixAt(i, this.dummy.matrix);
    }
    this.dropMesh.instanceMatrix.needsUpdate = true;

    // 5. Update Sculpted Abyssal Seabed (Stage 04)
    const seabedVis = this._smoothstep(0.64, 0.84, p);
    if (this.seabedMaterials && this.seabedMaterials.length > 0) {
      for (let m = 0; m < this.seabedMaterials.length; m++) {
        this.seabedMaterials[m].opacity = seabedVis;
      }
    }
    if (this.fallbackFloorMat) {
      this.fallbackFloorMat.opacity = seabedVis * 0.95;
    }

    if (this.mainSpot) {
      this.mainSpot.intensity = 9.5 + s4 * 3.0;
    }

    // 6. Update Blender 3D Chemical & Component Callout Labels (stage-timed fade + camera billboard)
    if (this.calloutItems && this.calloutItems.length > 0) {
      this.simGroup.updateMatrixWorld(true);
      this.camera.updateMatrixWorld(true);
      this._vCamRight.setFromMatrixColumn(this.camera.matrixWorld, 0).normalize();
      this._vCamUp.setFromMatrixColumn(this.camera.matrixWorld, 1).normalize();

      for (let c = 0; c < this.calloutItems.length; c++) {
        const item = this.calloutItems[c];
        const sp = item.spec;
        const fadeIn = this._smoothstep(sp.pStart, sp.pPeakIn, p);
        const fadeOut = 1.0 - this._smoothstep(sp.pPeakOut, sp.pEnd, p);
        const alpha = fadeIn * fadeOut;

        if (alpha <= 0.01) {
          item.mesh.visible = false;
          item.line.visible = false;
          item.dot.visible = false;
          continue;
        }

        item.mesh.visible = true;
        item.line.visible = true;
        item.dot.visible = true;
        item.mat.opacity = alpha * 0.98;
        if (item.bgMat) item.bgMat.opacity = alpha * 0.84;
        if (item.barMat) item.barMat.opacity = alpha * 0.95;
        item.lineMat.opacity = alpha * 0.85;
        item.dotMat.opacity = alpha * 0.95;

        const anchor = sp.anchorFn();
        // Keep anchor inside the visible right-hand perimeter of the floc/plume
        const safeAnchorX = Math.max(0.45, Math.min(0.84, anchor.x));
        this._vAnchor.set(safeAnchorX, anchor.y, anchor.z);

        // Place label in the open space to the right of the floc (x >= 0.88) so it never sits behind particles
        const labelX = Math.max(0.88, safeAnchorX + 0.16);
        const elbowX = labelX - 0.06;
        const elbowY = anchor.y + sp.offsetUp * 0.82;
        const elbowZ = Math.max(0.25, anchor.z + 0.18);

        const labelY = elbowY;
        const labelZ = elbowZ;

        item.dot.position.copy(this._vAnchor);
        item.mesh.position.set(labelX, labelY, labelZ);
        item.mesh.quaternion.copy(this.camera.quaternion);

        const lAttr = item.line.geometry.attributes.position;
        lAttr.setXYZ(0, this._vAnchor.x, this._vAnchor.y, this._vAnchor.z);
        lAttr.setXYZ(1, elbowX, elbowY, elbowZ);
        lAttr.setXYZ(2, labelX - 0.015, labelY, labelZ);
        lAttr.needsUpdate = true;
      }
    }

    this.renderer.render(this.scene, this.camera);
    this.rafId = requestAnimationFrame(this._animate);
  }

  _disposeMaterial(mat, disposedMats, disposedTexs) {
    if (!mat || disposedMats.has(mat)) return;
    disposedMats.add(mat);
    for (const key in mat) {
      const val = mat[key];
      if (val && val.isTexture && !disposedTexs.has(val)) {
        disposedTexs.add(val);
        val.dispose();
      }
    }
    if (typeof mat.dispose === "function") {
      mat.dispose();
    }
  }

  _disposeObject3D(root, skipGeos = null, disposedGeos = new Set(), disposedMats = new Set(), disposedTexs = new Set()) {
    if (!root) return;
    root.traverse((obj) => {
      if (obj.geometry && (!skipGeos || !skipGeos.has(obj.geometry)) && !disposedGeos.has(obj.geometry)) {
        disposedGeos.add(obj.geometry);
        obj.geometry.dispose();
      }
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          for (let i = 0; i < obj.material.length; i++) {
            this._disposeMaterial(obj.material[i], disposedMats, disposedTexs);
          }
        } else {
          this._disposeMaterial(obj.material, disposedMats, disposedTexs);
        }
      }
      if (obj.isInstancedMesh && typeof obj.dispose === "function") {
        obj.dispose();
      }
    });
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this._dracoLoader) {
      this._dracoLoader.dispose();
      this._dracoLoader = null;
    }

    const disposedGeos = new Set();
    const disposedMats = new Set();
    const disposedTexs = new Set();

    // Explicitly dispose callout plaques (text, backdrop, accent bar), leader lines, and anchor dots
    if (this.calloutItems && this.calloutItems.length > 0) {
      for (let i = 0; i < this.calloutItems.length; i++) {
        const item = this.calloutItems[i];
        if (item.mesh) {
          this._disposeObject3D(item.mesh, null, disposedGeos, disposedMats, disposedTexs);
          this.scene.remove(item.mesh);
        }
        if (item.line) {
          this._disposeObject3D(item.line, null, disposedGeos, disposedMats, disposedTexs);
          this.scene.remove(item.line);
        }
        if (item.dot) {
          this._disposeObject3D(item.dot, null, disposedGeos, disposedMats, disposedTexs);
          this.scene.remove(item.dot);
        }
      }
      this.calloutItems.length = 0;
    }

    // Dispose all remaining scene geometries, materials, textures, and instanced meshes
    this._disposeObject3D(this.scene, null, disposedGeos, disposedMats, disposedTexs);
    this.scene.clear();

    this.chitosanStrands = [];
    this.allAmineNodes = [];
    this.seabedMaterials = [];
    this.blenderSeabed = null;
    this.fallbackFloorMesh = null;
    this.fallbackFloorMat = null;

    if (this.renderer) {
      if (this.renderer.renderLists) {
        this.renderer.renderLists.dispose();
      }
      this.renderer.dispose();
    }
  }
}
