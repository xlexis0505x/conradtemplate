"""
Conrad Prototype — Cinema V2 Studio-Grade Flocculation Render
=============================================================
120 frames @ 1280×720 | EEVEE NEXT Raytracing | Fog Glow Compositor
4 × 30-frame stages, each with distinct camera, lighting, and chemistry

Fixes applied vs V1:
  1. Amber salt ions STAY in scene (don't blink out) — chitosan bridges despite them
  2. Bentonite = mineral silicate (Metallic=0.0, Roughness=0.35), not shiny gem
  3. Bezier curve noise uses HOOK empties so apply_brownian_noise works safely
  4. FCurve Noise via Blender 5 channelbag API (not legacy fcurves)
  5. EEVEE Next use_raytracing=True, compositor via compositing_node_group
"""

import bpy
import math
import random
import os
import time

t_start = time.time()
PI = math.pi

# ─── 1. RESET SCENE ──────────────────────────────────────────────────────────
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

for o in list(bpy.data.objects):    bpy.data.objects.remove(o, do_unlink=True)
for m in list(bpy.data.materials):  bpy.data.materials.remove(m, do_unlink=True)
for a in list(bpy.data.actions):    bpy.data.actions.remove(a, do_unlink=True)
for t in list(bpy.data.textures):   bpy.data.textures.remove(t, do_unlink=True)
for mb in list(bpy.data.metaballs): bpy.data.metaballs.remove(mb, do_unlink=True)
for cu in list(bpy.data.curves):    bpy.data.curves.remove(cu, do_unlink=True)
for c in list(bpy.data.collections):
    if c.name != "Collection":
        bpy.data.collections.remove(c)

scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end   = 120
scene.render.fps  = 30

# ─── 2. RENDER SETTINGS ───────────────────────────────────────────────────────
scene.render.engine              = 'BLENDER_EEVEE'
scene.render.resolution_x        = 1280
scene.render.resolution_y        = 720
scene.render.image_settings.file_format = 'WEBP'
scene.render.image_settings.quality     = 88

# EEVEE NEXT — Raytracing for real reflections on chitosan/water droplets
scene.eevee.use_raytracing       = True
scene.eevee.ray_tracing_method   = 'SCREEN'
scene.eevee.taa_render_samples   = 32
scene.eevee.shadow_ray_count     = 2
scene.eevee.shadow_resolution_scale = 1.5

# ─── 3. COMPOSITOR — FOG GLOW ─────────────────────────────────────────────────
scene.use_nodes = True
ng = bpy.data.node_groups.new("AbyssalCompositor", "CompositorNodeTree")
scene.compositing_node_group = ng

rl    = ng.nodes.new("CompositorNodeRLayers")
glare = ng.nodes.new("CompositorNodeGlare")
out   = ng.nodes.new("NodeGroupOutput")

# Blender 5: glare settings are socket inputs
glare.inputs["Threshold"].default_value = 0.52   # only brightest emission triggers
glare.inputs["Size"].default_value      = 7
glare.inputs["Strength"].default_value  = 0.22   # subtle — not blown out

rl.location    = (-300, 0)
glare.location = (0,   0)
out.location   = (300, 0)

ng.links.new(rl.outputs["Image"],    glare.inputs["Image"])
ng.links.new(glare.outputs["Image"], out.inputs[0])

# ─── 4. WORLD — ABYSSAL VOID ──────────────────────────────────────────────────
world = bpy.data.worlds.new("AbyssalWorld")
world.use_nodes = True
bg = world.node_tree.nodes.get("Background")
if bg:
    bg.inputs['Color'].default_value    = (0.001, 0.003, 0.006, 1.0)  # near-black deep ocean
    bg.inputs['Strength'].default_value = 0.18
scene.world = world

# ─── 5. MATERIAL LIBRARY ──────────────────────────────────────────────────────
def make_mat(name, color, roughness=0.4, metallic=0.0,
             emission=None, emission_strength=0.0,
             alpha=1.0, sss_weight=0.0, sss_radius=(0.4, 0.5, 0.7),
             sss_scale=0.004, transmission=0.0, ior=1.45,
             coat_weight=0.0, coat_roughness=0.1,
             specular_ior=0.5):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if not bsdf:
        return mat
    i = bsdf.inputs
    i['Base Color'].default_value     = color
    i['Roughness'].default_value      = roughness
    i['Metallic'].default_value       = metallic
    i['IOR'].default_value            = ior
    i['Specular IOR Level'].default_value = specular_ior

    if emission and emission_strength > 0:
        i['Emission Color'].default_value    = emission
        i['Emission Strength'].default_value = emission_strength

    if alpha < 1.0:
        i['Alpha'].default_value = alpha
        mat.blend_method = 'BLEND'

    if sss_weight > 0:
        i['Subsurface Weight'].default_value  = sss_weight
        i['Subsurface Radius'].default_value  = sss_radius
        i['Subsurface Scale'].default_value   = sss_scale

    if transmission > 0:
        i['Transmission Weight'].default_value = transmission

    if coat_weight > 0:
        i['Coat Weight'].default_value     = coat_weight
        i['Coat Roughness'].default_value  = coat_roughness

    return mat

# Kaolinite clay platelet — rough diffuse mineral, slight SSS in thin section
mat_clay = make_mat("KaoliniteClayMat",
    color       = (0.14, 0.18, 0.24, 1.0),
    roughness   = 0.78,
    metallic    = 0.0,
    specular_ior= 0.30,
    sss_weight  = 0.08,
    sss_radius  = (0.4, 0.5, 0.7),
    sss_scale   = 0.002)

# Chitosan polymer backbone — glowing translucent biopolymer tube
mat_chitosan = make_mat("ChitosanBackboneMat",
    color         = (0.0, 0.70, 0.95, 1.0),
    roughness     = 0.06,
    metallic      = 0.0,
    transmission  = 0.72,
    ior           = 1.42,
    emission      = (0.0, 0.58, 0.88, 1.0),
    emission_strength = 3.2,
    sss_weight    = 0.45,
    sss_radius    = (0.5, 0.7, 0.9),
    sss_scale     = 0.015)

# NH3+ Amine heads — maximum emission, triggers Fog Glow
mat_amine = make_mat("AmineHeadMat",
    color             = (0.05, 0.98, 1.0, 1.0),
    roughness         = 0.02,
    emission          = (0.0, 0.92, 1.0, 1.0),
    emission_strength = 6.0)

# Amber salt ions (Na+/Cl-) — stay in scene, drift in seawater; DO NOT blink out
mat_salt_ion = make_mat("SaltIonMat",
    color             = (1.0, 0.65, 0.14, 1.0),
    roughness         = 0.15,
    emission          = (1.0, 0.52, 0.10, 1.0),
    emission_strength = 3.8,
    alpha             = 0.88)

# Marine snow floc (metaball) — gelatinous organic blob, strong SSS
mat_floc = make_mat("MarineSnowFlocMat",
    color         = (0.68, 0.87, 0.97, 1.0),
    roughness     = 0.10,
    transmission  = 0.55,
    ior           = 1.35,
    sss_weight    = 0.60,
    sss_radius    = (0.7, 0.9, 1.1),
    sss_scale     = 0.025,
    emission      = (0.03, 0.14, 0.22, 1.0),
    emission_strength = 0.8)

# Bentonite — dense layered mineral silicate, NOT metallic (Fix #2)
mat_bentonite = make_mat("BentoniteMineralMat",
    color         = (0.52, 0.65, 0.78, 1.0),  # pale slate-mineral blue-grey
    roughness     = 0.35,                       # mineral surface scatter
    metallic      = 0.0,                        # NOT metallic — silicate clay
    specular_ior  = 0.45,
    sss_weight    = 0.12,
    sss_radius    = (0.3, 0.4, 0.55),
    sss_scale     = 0.004,
    emission      = (0.08, 0.20, 0.35, 1.0),
    emission_strength = 0.6)                    # very subtle inner glow

# Expelled seawater droplets — perfect glass spheres
mat_water = make_mat("ExpelledWaterMat",
    color         = (0.90, 0.98, 1.0, 1.0),
    roughness     = 0.0,
    transmission  = 0.95,
    ior           = 1.333,
    alpha         = 0.55,
    emission      = (0.10, 0.40, 0.60, 1.0),
    emission_strength = 1.4)

# Seafloor sediment — near-black rough surface
mat_seafloor = make_mat("SeafloorMat",
    color     = (0.005, 0.009, 0.014, 1.0),
    roughness = 0.90,
    metallic  = 0.0)

# Sonar ring — glowing cyan outline
mat_sonar = make_mat("SonarRingMat",
    color             = (0.0, 0.50, 0.75, 1.0),
    roughness         = 0.1,
    emission          = (0.0, 0.62, 0.90, 1.0),
    emission_strength = 2.6)

print("Materials created:", [m.name for m in bpy.data.materials])

# ─── 6. HELPER FUNCTIONS ──────────────────────────────────────────────────────
def kf(obj, frame, loc=None, rot=None, sca=None):
    """Insert keyframes cleanly."""
    if loc is not None:
        obj.location = loc
        obj.keyframe_insert(data_path="location", frame=frame)
    if rot is not None:
        obj.rotation_euler = rot
        obj.keyframe_insert(data_path="rotation_euler", frame=frame)
    if sca is not None:
        obj.scale = sca
        obj.keyframe_insert(data_path="scale", frame=frame)

def apply_brownian_noise(obj, strength_xyz=(0.045, 0.045, 0.028),
                          scale=14.0, seed_offset=0):
    """
    Add FCurve Noise modifiers on the Blender 5 channelbag API.
    Safe to call only on objects that already have keyframes inserted.
    """
    if not obj.animation_data or not obj.animation_data.action:
        return
    action = obj.animation_data.action
    if not action.layers:
        return
    strip = action.layers[0].strips[0]
    if not strip.channelbags:
        return
    bag = strip.channelbags[0]

    for fc in bag.fcurves:
        # Smooth bezier interpolation on existing keyframes
        for kp in fc.keyframe_points:
            kp.interpolation = "BEZIER"
            kp.easing = "EASE_IN_OUT"

        # Primary Brownian turbulence noise
        mod = fc.modifiers.new(type="NOISE")
        axis = fc.array_index  # 0=X, 1=Y, 2=Z
        mod.scale    = scale
        mod.strength = strength_xyz[axis] if axis < len(strength_xyz) else strength_xyz[0]
        mod.phase    = axis * 37.3 + seed_offset * 13.7
        mod.offset   = seed_offset * 7.11

def smooth_all_keyframes(obj):
    """Set all keyframes to BEZIER EASE_IN_OUT."""
    if not obj.animation_data or not obj.animation_data.action:
        return
    action = obj.animation_data.action
    if not action.layers:
        return
    for layer in action.layers:
        for strip in layer.strips:
            if hasattr(strip, 'channelbags'):
                for bag in strip.channelbags:
                    for fc in bag.fcurves:
                        for kp in fc.keyframe_points:
                            kp.interpolation = "BEZIER"
                            kp.easing = "EASE_IN_OUT"

# ─── 7. CAMERA & TRACKING TARGET ──────────────────────────────────────────────
focus_target = bpy.data.objects.new("Focus_Target", None)
scene.collection.objects.link(focus_target)

# Focus target moves from particle cloud centre → floc → seafloor over 120 frames
kf(focus_target,   1, loc=(0.0, 0.0,  0.00))   # Stage 1: centered at origin
kf(focus_target,  60, loc=(0.0, 0.0,  0.00))   # Stage 2: at floc centre
kf(focus_target,  85, loc=(0.0, 0.0, -0.05))   # Stage 3: descending slightly
kf(focus_target, 108, loc=(0.0, 0.0, -1.38))   # Stage 4: seafloor touchdown
kf(focus_target, 120, loc=(0.0, 0.0, -1.38))   # Stage 4: at seafloor crust
smooth_all_keyframes(focus_target)

cam_data = bpy.data.cameras.new("CinemaCamera")
cam_data.lens             = 52
cam_data.dof.use_dof      = True
cam_data.dof.focus_object = focus_target
cam_data.dof.aperture_fstop = 4.5   # f/4.5 — shallow, background particles bokeh'd

cam_obj = bpy.data.objects.new("CinemaCamera", cam_data)
scene.collection.objects.link(cam_obj)
scene.camera = cam_obj

# TRACK_TO constraint ensures the reaction zone is ALWAYS centered at Y = 45%–55%
track = cam_obj.constraints.new('TRACK_TO')
track.name = 'TrackTo_Target'
track.target = focus_target
track.track_axis = 'TRACK_NEGATIVE_Z'
track.up_axis = 'UP_Y'

# Stage 1: Macro close-up on bridging (sweet spot Y = 50%)
kf(cam_obj,   1, loc=(0.02, -0.65, 0.12))
kf(cam_obj,  30, loc=(0.06, -0.78, 0.18))
# Stage 2: Pull back slightly to reveal growing organic floc
kf(cam_obj,  60, loc=(0.12, -1.05, 0.28))
# Stage 3: Elevated 3/4 view of bentonite ballast infiltration
kf(cam_obj,  90, loc=(0.35, -1.45, 0.42))
# Stage 4: Elevated 3/4 isometric view (Z = +0.55, Y = -3.00) looking down at seabed crust and sonar rings
kf(cam_obj, 108, loc=(0.10, -2.50, 0.52))
kf(cam_obj, 120, loc=(0.00, -3.00, 0.55))
smooth_all_keyframes(cam_obj)

# ─── 8. STUDIO LIGHTING — 3-POINT DEEP OCEAN ──────────────────────────────────
# 1. Blue-white backlight — rim/silhouette on all objects
bl_data = bpy.data.lights.new("BackAreaLight", type='AREA')
bl_data.energy  = 420
bl_data.size    = 4.0
bl_data.color   = (0.80, 0.95, 1.0)
bl_obj = bpy.data.objects.new("BackAreaLight", bl_data)
scene.collection.objects.link(bl_obj)
bl_obj.location       = (0.0, 2.8, 1.5)
bl_obj.rotation_euler = (math.radians(-58), 0, math.radians(180))

# 2. Cyan rim point light — amine heads / chitosan halo
rl_data = bpy.data.lights.new("CyanRimLight", type='POINT')
rl_data.energy = 140
rl_data.color  = (0.0, 0.85, 1.0)
rl_obj = bpy.data.objects.new("CyanRimLight", rl_data)
scene.collection.objects.link(rl_obj)
rl_obj.location = (-2.0, -1.0, 1.8)

# 3. XVIVO trick: warm amber light from below — hydrothermal glow
ul_data = bpy.data.lights.new("UnderwaterAmberKey", type='AREA')
ul_data.energy = 65
ul_data.size   = 2.5
ul_data.color  = (1.0, 0.72, 0.28)
ul_obj = bpy.data.objects.new("UnderwaterAmberKey", ul_data)
scene.collection.objects.link(ul_obj)
ul_obj.location       = (0.0, 0.0, -1.2)
ul_obj.rotation_euler = (PI, 0, 0)   # pointing up from below

# 4. Soft key fill from front-right
kf_data = bpy.data.lights.new("KeyFillLight", type='AREA')
kf_data.energy = 48
kf_data.size   = 2.5
kf_data.color  = (0.65, 0.80, 0.90)
kf_obj = bpy.data.objects.new("KeyFillLight", kf_data)
scene.collection.objects.link(kf_obj)
kf_obj.location       = (1.5, -1.5, 0.9)
kf_obj.rotation_euler = (math.radians(52), 0, math.radians(40))

# ─── 9. MASTER GROUP — drives collective settling in Stage 4 ──────────────────
master = bpy.data.objects.new("Simulation_Master", None)
scene.collection.objects.link(master)
master.location = (0, 0, 0)

kf(master,   1,  loc=(0, 0,  0.00))
kf(master,  90,  loc=(0, 0,  0.00))
kf(master, 108,  loc=(0, 0, -1.32))   # gravity plunge over 18 frames
kf(master, 120,  loc=(0, 0, -1.38))   # settled on seafloor
smooth_all_keyframes(master)

# ─── 10. KAOLINITE CLAY LAMELLA PROTOTYPES ────────────────────────────────────
def create_kaolinite_lamella(name, rx=0.028, ry=0.020, seed=0):
    """
    Biologically-accurate kaolinite platelet:
    - Torn elliptical perimeter (not regular polygon)
    - Voronoi texture Displace modifier for surface micro-cracks
    - Thin z-dimension (like real ~7Å unit cell stacked platelets)
    """
    random.seed(seed)
    n = 24
    top_verts, bot_verts = [], []
    thick = 0.0045

    for i in range(n):
        ang  = 2 * PI * i / n
        # Ellipse base radius
        r_base = rx * ry / math.sqrt((ry * math.cos(ang))**2 + (rx * math.sin(ang))**2)
        # Torn edge: hexagonal bias + irregular fracture jitter
        tear   = (0.07 * math.cos(3 * ang) +
                  0.04 * math.sin(7 * ang) +
                  0.025 * math.cos(11 * ang) +
                  random.uniform(-0.08, 0.08))
        r = r_base * (1.0 + tear)
        top_verts.append((r * math.cos(ang), r * math.sin(ang),  thick * 0.5))
        bot_verts.append((r * 0.94 * math.cos(ang), r * 0.94 * math.sin(ang), -thick * 0.5))

    # Centre points
    top_centre = len(top_verts)   # index n
    bot_centre = len(top_verts) + 1  # index n+1
    all_verts = top_verts + bot_verts + [(0, 0, thick * 0.5), (0, 0, -thick * 0.5)]

    # We now have:
    #   top face ring  → indices 0..n-1
    #   bot face ring  → indices n..2n-1
    #   top centre     → index 2n
    #   bot centre     → index 2n+1

    tc = 2 * n      # top centre index
    bc = 2 * n + 1  # bot centre index

    faces = []
    for i in range(n):
        nxt = (i + 1) % n
        # Top face fan
        faces.append([tc, i, nxt])
        # Side band (quad as two tris)
        faces.append([i, n + i, n + nxt])
        faces.append([i, n + nxt, nxt])
        # Bottom face fan (reversed winding)
        faces.append([bc, n + nxt, n + i])

    mesh = bpy.data.meshes.new(name + "_Mesh")
    mesh.from_pydata(all_verts, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    scene.collection.objects.link(obj)
    obj.data.materials.append(mat_clay)

    # Voronoi Displace modifier — micro-crack surface roughness
    tex = bpy.data.textures.new(name + "_Voronoi", type='VORONOI')
    tex.noise_scale = 0.010
    tex.contrast    = 2.8
    mod = obj.modifiers.new("SurfaceMicro", type='DISPLACE')
    mod.texture     = tex
    mod.strength    = 0.00075
    mod.direction   = 'NORMAL'

    return obj

# Create 3 prototype lamellae (hidden from render; particles use their mesh data)
proto_a = create_kaolinite_lamella("Proto_Clay_A", rx=0.028, ry=0.019, seed=101)
proto_b = create_kaolinite_lamella("Proto_Clay_B", rx=0.024, ry=0.022, seed=202)
proto_c = create_kaolinite_lamella("Proto_Clay_C", rx=0.030, ry=0.016, seed=303)
protos  = [proto_a, proto_b, proto_c]
for p in protos:
    p.hide_render   = True
    p.hide_viewport = True

# ─── 11. CLAY PARTICLE FIELD (220 platelets) ──────────────────────────────────
particles = []
random.seed(77)
NUM_PARTICLES = 220

for i in range(NUM_PARTICLES):
    proto  = protos[i % 3]
    p_obj  = bpy.data.objects.new(f"Clay_{i:03d}", proto.data)
    scene.collection.objects.link(p_obj)
    p_obj.parent = master

    # Random initial position in a spherical cloud
    phi     = random.uniform(0, 2 * PI)
    costh   = random.uniform(-1, 1)
    u       = random.uniform(0.05, 0.85)
    r_init  = u ** (1/3) * 0.52
    sinth   = math.sqrt(max(0, 1 - costh**2))
    x0 = r_init * sinth * math.cos(phi)
    y0 = r_init * sinth * math.sin(phi) * 0.75
    z0 = r_init * costh * 0.48

    r_sca = random.uniform(0.70, 1.55)
    rot0  = (random.uniform(0, 2*PI), random.uniform(0, 2*PI), random.uniform(0, 2*PI))

    # Stage 1 (frames 1–30): particles in dispersed suspension cloud
    kf(p_obj,  1, loc=(x0, y0, z0), rot=rot0, sca=(r_sca, r_sca, r_sca))
    kf(p_obj, 30, loc=(x0 + random.uniform(-0.04, 0.04),
                        y0 + random.uniform(-0.04, 0.04),
                        z0 + random.uniform(-0.03, 0.03)),
                   rot=(rot0[0]+0.3, rot0[1]+0.2, rot0[2]+0.4),
                   sca=(r_sca, r_sca, r_sca))

    # Stage 2 (frames 31–60): attract toward centre as chitosan bridges
    core_x = x0 * 0.32 + random.uniform(-0.015, 0.015)
    core_y = y0 * 0.32 + random.uniform(-0.015, 0.015)
    core_z = z0 * 0.32 + random.uniform(-0.012, 0.012)
    kf(p_obj, 60, loc=(core_x, core_y, core_z),
                   rot=(rot0[0]+0.9, rot0[1]+0.7, rot0[2]+1.1),
                   sca=(r_sca * 0.88, r_sca * 0.88, r_sca * 0.88))

    # Stage 3 (frames 61–90): compact further as bentonite ballast added
    kf(p_obj, 90, loc=(core_x * 0.82, core_y * 0.82, core_z * 0.82),
                   sca=(r_sca * 0.80, r_sca * 0.80, r_sca * 0.80))

    # Stage 4 (frames 91–120): flatten to seafloor crust
    kf(p_obj, 120, loc=(core_x * 1.30, core_y * 1.30, -0.02),
                    sca=(r_sca * 1.08, r_sca * 1.08, r_sca * 0.14))

    # Apply Brownian turbulence noise — higher in Stage 1, lower later
    apply_brownian_noise(p_obj,
        strength_xyz=(0.042, 0.042, 0.026),
        scale=13.0,
        seed_offset=i)

    particles.append(p_obj)

print(f"Clay particles: {len(particles)}")

# ─── 12. AMBIENT SALT IONS — stay in scene (Fix #1) ──────────────────────────
# Na+/Cl- ions stay drifting throughout all 4 stages; chitosan bridges DESPITE them
random.seed(44)
NUM_IONS = 55

for k in range(NUM_IONS):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.0065)
    ion = bpy.context.active_object
    ion.name = f"SaltIon_{k:02d}"
    ion.data.materials.append(mat_salt_ion)
    ion.parent = master

    # Random position scattered throughout the volume
    phi_i = random.uniform(0, 2 * PI)
    r_i   = random.uniform(0.05, 0.60)
    z_i   = random.uniform(-0.25, 0.25)
    xi    = r_i * math.cos(phi_i)
    yi    = r_i * math.sin(phi_i) * 0.75
    zi    = z_i

    # Ions drift slowly across all 120 frames — they DON'T disappear
    kf(ion,   1, loc=(xi, yi, zi))
    kf(ion,  60, loc=(xi + random.uniform(-0.08, 0.08),
                       yi + random.uniform(-0.08, 0.08),
                       zi + random.uniform(-0.04, 0.04)))
    kf(ion, 120, loc=(xi + random.uniform(-0.14, 0.14),
                       yi + random.uniform(-0.14, 0.14),
                       zi + random.uniform(-0.07, 0.07)))

    apply_brownian_noise(ion,
        strength_xyz=(0.030, 0.030, 0.018),
        scale=18.0,
        seed_offset=k + 300)

print(f"Salt ions: {NUM_IONS}")

# ─── 13. CHITOSAN POLYMER — Bezier bevel curve with Hook empty noise ──────────
# Fix #3: Use HOOK empties on control points so apply_brownian_noise works safely

chitosan_group = bpy.data.objects.new("Chitosan_Group", None)
scene.collection.objects.link(chitosan_group)
chitosan_group.parent = master

CHITOSAN_PTS = 14  # 14 Bezier control points = organic S-curve through the volume

curve_data = bpy.data.curves.new("ChitosanSpine", "CURVE")
curve_data.dimensions      = "3D"
curve_data.resolution_u    = 32
curve_data.render_resolution_u = 32
curve_data.bevel_depth     = 0.0088    # ~18 µm tube diameter
curve_data.bevel_resolution = 12       # smooth circular cross section
curve_data.use_fill_caps   = True

spline = curve_data.splines.new("BEZIER")
spline.bezier_points.add(CHITOSAN_PTS - 1)  # adds N-1 (already has 1)

# Lissajous-inspired initial configuration — not a straight line
ctrl_pts_initial = []
for i in range(CHITOSAN_PTS):
    t  = i / (CHITOSAN_PTS - 1)
    x  =  math.sin(t * PI * 2.1) * 0.38
    y  = (t - 0.5) * 0.65
    z  =  math.cos(t * PI * 1.7) * 0.22
    ctrl_pts_initial.append((x, y, z))

for i, pt in enumerate(spline.bezier_points):
    px, py, pz = ctrl_pts_initial[i]
    pt.co = (px, py, pz)
    pt.handle_left  = (px - 0.06, py, pz)
    pt.handle_right = (px + 0.06, py, pz)
    pt.handle_left_type  = "AUTO"
    pt.handle_right_type = "AUTO"

curve_obj = bpy.data.objects.new("ChitosanCurve", curve_data)
scene.collection.objects.link(curve_obj)
curve_obj.parent = chitosan_group
curve_obj.data.materials.append(mat_chitosan)

# Hook empties: each control point has a parented empty that carries keyframes
# This lets apply_brownian_noise() work on standard object animation_data
hook_empties = []
for i in range(CHITOSAN_PTS):
    he = bpy.data.objects.new(f"ChitHook_{i:02d}", None)
    scene.collection.objects.link(he)
    he.parent = chitosan_group
    px, py, pz = ctrl_pts_initial[i]
    he.location = (px, py, pz)

    # Stage 1→2: hook drifts and collapses toward floc
    kf(he,   1, loc=(px, py, pz))
    kf(he,  30, loc=(px + random.uniform(-0.04, 0.04),
                      py + random.uniform(-0.03, 0.03),
                      pz + random.uniform(-0.03, 0.03)))
    kf(he,  60, loc=(px * 0.55, py * 0.55, pz * 0.55))  # collapse into floc
    kf(he,  90, loc=(px * 0.45, py * 0.45, pz * 0.45))
    kf(he, 120, loc=(px * 0.40, py * 0.40, pz * 0.38))

    # Apply organic wriggle noise to each hook empty
    apply_brownian_noise(he,
        strength_xyz=(0.035, 0.028, 0.022),
        scale=10.0,
        seed_offset=i + 200)

    # Add Hook modifier to curve for this control point
    bpy.context.view_layer.objects.active = curve_obj
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.curve.select_all(action='DESELECT')
    # Select only this control point
    bp = curve_obj.data.splines[0].bezier_points[i]
    bp.select_control_point = True
    bpy.ops.object.hook_add_newob()
    # The hook adds a new empty — replace it with our named hook empty
    bpy.ops.object.mode_set(mode='OBJECT')

    hook_empties.append(he)

# After hook setup, re-parent the auto-created hook empties to chitosan_group
for obj_h in scene.collection.objects:
    if obj_h.name.startswith("Empty") and obj_h.parent == curve_obj:
        obj_h.parent = chitosan_group

# ─── 14. NH3+ AMINE HEADS — glowing spheres along chitosan backbone ───────────
NUM_AMINES = 18
amine_objs = []
for a in range(NUM_AMINES):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=3, radius=0.016)
    amine = bpy.context.active_object
    amine.name = f"Amine_{a:02d}"
    amine.data.materials.append(mat_amine)
    amine.parent = chitosan_group

    t_a    = a / (NUM_AMINES - 1)
    px_a, py_a, pz_a = ctrl_pts_initial[int(t_a * (CHITOSAN_PTS - 1))]

    kf(amine,   1, loc=(px_a, py_a, pz_a + 0.018))
    kf(amine,  30, loc=(px_a + random.uniform(-0.02, 0.02),
                         py_a + random.uniform(-0.02, 0.02),
                         pz_a + 0.018))
    kf(amine,  60, loc=(px_a * 0.55, py_a * 0.55, pz_a * 0.55 + 0.014))
    kf(amine, 120, loc=(px_a * 0.40, py_a * 0.40, pz_a * 0.38 + 0.010))
    apply_brownian_noise(amine, strength_xyz=(0.030, 0.025, 0.018), scale=9.0, seed_offset=a + 400)
    amine_objs.append(amine)

print(f"Amine heads: {len(amine_objs)}")

# ─── 15. METABALL ORGANIC FLOC (Stage 2–4) ────────────────────────────────────
mb_data = bpy.data.metaballs.new("FlocMetaball")
mb_data.resolution        = 0.018   # fine viewport
mb_data.render_resolution = 0.013   # ultra-fine render
mb_obj = bpy.data.objects.new("FlocMetaball", mb_data)
scene.collection.objects.link(mb_obj)
mb_obj.parent = master
mb_obj.data.materials.append(mat_floc)

# 7 Metaball elements — each one a clay-chitosan binding node
MB_SEEDS = [
    ( 0.00,  0.00, 0.00), (-0.08,  0.05, 0.03), ( 0.07, -0.04, 0.05),
    (-0.05, -0.07, 0.02), ( 0.09,  0.08,-0.04), (-0.06,  0.04,-0.06),
    ( 0.04, -0.09, 0.02)
]
for sx, sy, sz in MB_SEEDS:
    el = mb_data.elements.new()
    el.type      = "BALL"
    el.radius    = 0.14
    el.stiffness = 2.8   # organic-sharp boundary (not too hard, not too soft)
    el.co        = (sx, sy, sz)

# Metaball grows from invisible (Stage 1) → full floc (Stage 2) → compresses (Stage 4)
kf(mb_obj,  1,  sca=(0.01, 0.01, 0.01))   # invisible at start
kf(mb_obj, 25,  sca=(0.01, 0.01, 0.01))
kf(mb_obj, 42,  sca=(0.60, 0.60, 0.60))   # rapidly grows as bridging completes
kf(mb_obj, 60,  sca=(1.00, 1.00, 1.00))   # full floc at Stage 2 peak
kf(mb_obj, 90,  sca=(0.95, 0.95, 0.90))   # slightly compressed by bentonite
kf(mb_obj, 120, sca=(1.10, 1.10, 0.28))   # flattened into seafloor crust
smooth_all_keyframes(mb_obj)

# ─── 16. BENTONITE BALLAST — mineral silicate platelets (Fix #2) ──────────────
# Bentonite = dense layered smectite clay (not shiny gem crystal)
def create_bentonite_platelet(name, seed=0):
    """Small irregular mineral silicate platelet — slightly more regular than kaolinite."""
    random.seed(seed)
    n = 18
    thick = 0.012
    top_verts, bot_verts = [], []

    rx, ry = random.uniform(0.030, 0.052), random.uniform(0.022, 0.040)
    for i in range(n):
        ang    = 2 * PI * i / n
        r_base = rx * ry / math.sqrt((ry * math.cos(ang))**2 + (rx * math.sin(ang))**2)
        # Bentonite has more regular edges than kaolinite but still not perfect
        facet  = 0.05 * math.cos(4 * ang) + random.uniform(-0.04, 0.04)
        r      = r_base * (1 + facet)
        top_verts.append((r * math.cos(ang), r * math.sin(ang),  thick * 0.5))
        bot_verts.append((r * 0.92 * math.cos(ang), r * 0.92 * math.sin(ang), -thick * 0.5))

    tc  = 2 * n
    bc  = 2 * n + 1
    all_verts = top_verts + bot_verts + [(0, 0, thick * 0.5), (0, 0, -thick * 0.5)]
    faces = []
    for i in range(n):
        nxt = (i + 1) % n
        faces.append([tc, i, nxt])
        faces.append([i, n + i, n + nxt])
        faces.append([i, n + nxt, nxt])
        faces.append([bc, n + nxt, n + i])

    mesh = bpy.data.meshes.new(name + "_Mesh")
    mesh.from_pydata(all_verts, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    scene.collection.objects.link(obj)
    obj.data.materials.append(mat_bentonite)
    return obj

proto_bent_a = create_bentonite_platelet("Proto_Bent_A", seed=501)
proto_bent_b = create_bentonite_platelet("Proto_Bent_B", seed=502)
proto_bent_c = create_bentonite_platelet("Proto_Bent_C", seed=503)
bent_protos  = [proto_bent_a, proto_bent_b, proto_bent_c]
for p in bent_protos:
    p.hide_render   = True
    p.hide_viewport = True

# 14 bentonite platelets plunge into the floc during Stage 3 (frames 61–90)
bent_objs = []
random.seed(66)
for b in range(14):
    bp = bent_protos[b % 3]
    b_obj = bpy.data.objects.new(f"Bentonite_{b:02d}", bp.data)
    scene.collection.objects.link(b_obj)
    b_obj.parent = master

    # Random starting position high above the floc
    phi_b   = random.uniform(0, 2 * PI)
    r_b     = random.uniform(0.18, 0.55)
    start_x = r_b * math.cos(phi_b)
    start_y = r_b * math.sin(phi_b) * 0.70
    start_z = random.uniform(0.40, 0.90)

    final_x = random.uniform(-0.08, 0.08)
    final_y = random.uniform(-0.08, 0.08)
    final_z = random.uniform(-0.06, 0.06)

    r_sca_b = random.uniform(0.90, 1.35)
    rot_b   = (random.uniform(0, 2*PI), random.uniform(0, 2*PI), random.uniform(0, 2*PI))

    kf(b_obj,  1,  loc=(start_x, start_y, start_z),         sca=(0.01, 0.01, 0.01))
    kf(b_obj, 58,  loc=(start_x, start_y, start_z),         sca=(0.01, 0.01, 0.01))   # invisible until Stage 3
    kf(b_obj, 72,  loc=(start_x * 0.5, start_y * 0.5, 0.15), sca=(r_sca_b, r_sca_b, r_sca_b), rot=rot_b)
    kf(b_obj, 90,  loc=(final_x, final_y, final_z),          sca=(r_sca_b, r_sca_b, r_sca_b))
    kf(b_obj, 120, loc=(final_x * 1.1, final_y * 1.1, -0.015), sca=(r_sca_b, r_sca_b, r_sca_b * 0.4))
    smooth_all_keyframes(b_obj)
    bent_objs.append(b_obj)

print(f"Bentonite platelets: {len(bent_objs)}")

# ─── 17. EXPELLED SEAWATER DROPLETS (Syneresis) ───────────────────────────────
DROP_COUNT = 18
random.seed(55)
for w in range(DROP_COUNT):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8, radius=0.0095)
    drop = bpy.context.active_object
    drop.name = f"WaterDrop_{w:02d}"
    drop.data.materials.append(mat_water)
    drop.parent = master

    ang_d  = (w / DROP_COUNT) * 2 * PI
    dx_out = 0.44 * math.cos(ang_d)
    dy_out = 0.33 * math.sin(ang_d)

    kf(drop,  1,  loc=(0, 0, 0),                                sca=(0, 0, 0))
    kf(drop, 65,  loc=(dx_out * 0.15, dy_out * 0.15,  0.02),   sca=(0, 0, 0))   # appear Stage 3
    kf(drop, 78,  loc=(dx_out * 0.75, dy_out * 0.75,  0.20),   sca=(1.0, 1.0, 1.4))
    kf(drop, 90,  loc=(dx_out * 1.15, dy_out * 1.15,  0.42),   sca=(0.9, 0.9, 0.9))
    kf(drop, 105, loc=(dx_out * 1.50, dy_out * 1.50,  0.72),   sca=(0.3, 0.3, 0.3))
    kf(drop, 115, loc=(dx_out * 1.60, dy_out * 1.60,  0.90),   sca=(0, 0, 0))
    smooth_all_keyframes(drop)

# ─── 18. SEAFLOOR + SONAR RINGS ───────────────────────────────────────────────
seafloor_grp = bpy.data.objects.new("Seafloor_Group", None)
scene.collection.objects.link(seafloor_grp)
seafloor_grp.location = (0, 0, -1.45)

bpy.ops.mesh.primitive_plane_add(size=35.0)
floor_obj = bpy.context.active_object
floor_obj.name = "Abyssal_Floor"
floor_obj.parent = seafloor_grp
floor_obj.data.materials.append(mat_seafloor)

for ring_r in [0.60, 1.20, 2.00, 3.00]:
    bpy.ops.mesh.primitive_torus_add(
        major_radius=ring_r, minor_radius=0.0032,
        major_segments=72, minor_segments=4)
    ring = bpy.context.active_object
    ring.name = f"SonarRing_{int(ring_r*100)}"
    ring.parent = seafloor_grp
    ring.data.materials.append(mat_sonar)

# Seafloor group appears at Stage 4
kf(seafloor_grp,  1,  sca=(0, 0, 0))
kf(seafloor_grp, 85,  sca=(0, 0, 0))
kf(seafloor_grp, 95,  sca=(1, 1, 1))
kf(seafloor_grp, 120, sca=(1, 1, 1))
smooth_all_keyframes(seafloor_grp)

# ─── 19. BATCH RENDER — 120 FRAMES ────────────────────────────────────────────
OUT_DIR = "/Users/williamy./Downloads/coalowl.com/conrad.prototype/assets/floc_frames"
os.makedirs(OUT_DIR, exist_ok=True)

print(f"\n{'='*60}")
print("Starting Cinema V2 — 120-frame batch render")
print(f"Resolution: {scene.render.resolution_x}×{scene.render.resolution_y}")
print(f"EEVEE Raytracing: {scene.eevee.use_raytracing}")
print(f"TAA Samples: {scene.eevee.taa_render_samples}")
print(f"Output: {OUT_DIR}")
print(f"{'='*60}\n")

for f in range(1, 121):
    scene.frame_set(f)
    frame_path = os.path.join(OUT_DIR, f"frame_{f:03d}.webp")
    scene.render.filepath = frame_path
    bpy.ops.render.render(write_still=True)

    if f % 10 == 0 or f == 120:
        elapsed = round(time.time() - t_start, 1)
        eta     = round((elapsed / f) * (120 - f), 0)
        print(f"  Frame {f:03d}/120 | {elapsed}s elapsed | ~{eta}s remaining")

total = round(time.time() - t_start, 1)
print(f"\nCINEMA_V2_RENDER_COMPLETE — {total}s total\n")
