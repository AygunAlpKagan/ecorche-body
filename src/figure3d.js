import * as THREE from "three";

const SKIN = 0x9099a6;
const MUSCLE_IDLE = 0x7f8794;
const PRIMARY = 0x2f8cff;
const SECONDARY = 0xff4d8d;

function roleColor(role) {
  if (role === "primary") return PRIMARY;
  if (role === "secondary") return SECONDARY;
  if (role === "muscle") return MUSCLE_IDLE;
  return SKIN;
}

function material(role) {
  const color = roleColor(role);
  const lit = role === "primary" || role === "secondary";
  return new THREE.MeshStandardMaterial({
    color,
    roughness: lit ? 0.38 : 0.62,
    metalness: 0.03,
    emissive: lit ? color : 0x000000,
    emissiveIntensity: role === "primary" ? 0.42 : role === "secondary" ? 0.26 : 0,
  });
}

const SPHERE = new THREE.SphereGeometry(1, 20, 16);

function capsule(r, len) {
  return new THREE.CapsuleGeometry(r, len, 6, 14);
}

export function buildFigure(shape, primary = [], secondary = []) {
  const root = new THREE.Group();
  const s = shape;
  const bulk = 0.85 + s.bulk * 0.4;

  const roleOf = (id, muscle) => {
    if (!muscle) return "skin";
    if (primary.includes(id)) return "primary";
    if (secondary.includes(id)) return "secondary";
    return "muscle";
  };

  function piece(id, geo, pos, { rot = [0, 0, 0], scale = [1, 1, 1], muscle = false } = {}) {
    const mesh = new THREE.Mesh(geo, material(roleOf(id, muscle)));
    mesh.name = id;
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.scale.set(scale[0], scale[1], scale[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
    return mesh;
  }

  // mirrored pair across the YZ plane
  function pair(id, geo, pos, opts = {}) {
    const [x, y, z] = pos;
    const rot = opts.rot || [0, 0, 0];
    piece(id, geo, [x, y, z], { ...opts, rot });
    piece(id, geo, [-x, y, z], { ...opts, rot: [rot[0], -rot[1], -rot[2]] });
  }

  const ell = (sx, sy, sz) => ({ scale: [sx, sy, sz] });

  // ---- skeleton / skin base ----
  piece("head", SPHERE, [0, 1.70, 0.01], ell(0.095 * s.neck, 0.12, 0.105));
  piece("jaw", SPHERE, [0, 1.63, 0.02], ell(0.07, 0.05, 0.08));
  piece("neck", capsule(0.045 * s.neck, 0.05), [0, 1.56, -0.01]);

  // torso as stacked ellipsoids: broad chest -> taper waist -> pelvis
  piece("chestbase", SPHERE, [0, 1.37, 0], ell(0.19 * s.chest, 0.12, 0.085 * bulk));
  piece("ribs", SPHERE, [0, 1.24, 0], ell(0.155 * s.chest, 0.1, 0.08 * bulk));
  piece("waistbase", SPHERE, [0, 1.12, 0], ell(0.13 * s.waist, 0.1, 0.075 * bulk));
  piece("pelvis", SPHERE, [0, 0.99, 0], ell(0.155 * s.hip, 0.1, 0.085));

  // ---- arms (held close to the trunk so it reads as one body) ----
  pair("shoulders", SPHERE, [0.188 * s.shoulder, 1.45, 0], { muscle: true, ...ell(0.072 * bulk, 0.072, 0.072) });
  pair("upperarm", capsule(0.042 * s.arm, 0.17), [0.21 * s.shoulder, 1.27, -0.005], { rot: [0, 0, 0.14] });
  pair("biceps", SPHERE, [0.202 * s.shoulder, 1.29, 0.02], { muscle: true, ...ell(0.04 * bulk, 0.09, 0.044) });
  pair("triceps", SPHERE, [0.222 * s.shoulder, 1.26, -0.035], { muscle: true, ...ell(0.038 * bulk, 0.094, 0.042) });
  pair("elbow", SPHERE, [0.232 * s.shoulder, 1.11, 0], ell(0.038, 0.038, 0.038));
  pair("forearms", capsule(0.034 * s.arm, 0.18), [0.244 * s.shoulder, 0.97, 0.01], { muscle: true, rot: [0, 0, 0.08] });
  pair("hand", SPHERE, [0.258 * s.shoulder, 0.83, 0.02], ell(0.038, 0.066, 0.024));

  // ---- chest / abs / sides (front) ----
  pair("chest", SPHERE, [0.072 * s.chest, 1.38, 0.055 * bulk], { muscle: true, ...ell(0.082 * s.chest, 0.058, 0.06 * bulk) });
  for (let row = 0; row < 3; row += 1) {
    const y = 1.26 - row * 0.055;
    pair("abdominals", SPHERE, [0.035, y, 0.07 * bulk], { muscle: true, ...ell(0.032 * bulk, 0.026, 0.04 * bulk) });
  }
  pair("obliques", SPHERE, [0.1 * s.waist, 1.12, 0.03], { muscle: true, ...ell(0.035, 0.07, 0.05 * bulk) });

  // ---- back ----
  piece("traps", SPHERE, [0, 1.47, -0.03], { muscle: true, ...ell(0.12 * s.shoulder, 0.07, 0.05) });
  pair("lats", SPHERE, [0.115 * s.chest, 1.22, -0.03], { muscle: true, ...ell(0.06, 0.12, 0.055 * bulk) });
  piece("middle back", SPHERE, [0, 1.3, -0.06 * bulk], { muscle: true, ...ell(0.12 * s.chest, 0.08, 0.04) });
  piece("lower back", SPHERE, [0, 1.09, -0.06 * bulk], { muscle: true, ...ell(0.1 * s.waist, 0.07, 0.04) });

  // ---- hips / legs ----
  pair("glutes", SPHERE, [0.07 * s.hip, 0.93, -0.055 * bulk], { muscle: true, ...ell(0.085 * s.hip, 0.08, 0.075) });
  pair("abductors", SPHERE, [0.135 * s.hip, 0.86, 0.01], { muscle: true, ...ell(0.045, 0.09, 0.06) });
  pair("upperleg", capsule(0.066 * s.thigh, 0.18), [0.082, 0.7, 0], { rot: [0, 0, 0.03] });
  pair("quadriceps", SPHERE, [0.082, 0.72, 0.05 * bulk], { muscle: true, ...ell(0.058 * s.thigh, 0.12, 0.055) });
  pair("adductors", capsule(0.032 * s.thigh, 0.12), [0.04, 0.72, 0.02], { muscle: true });
  pair("hamstrings", SPHERE, [0.085, 0.7, -0.05 * bulk], { muscle: true, ...ell(0.05, 0.12, 0.05) });
  pair("knee", SPHERE, [0.085, 0.5, 0.01], ell(0.05, 0.05, 0.05));
  pair("lowerleg", capsule(0.05 * s.calf, 0.17), [0.085, 0.32, 0.005]);
  pair("calves", SPHERE, [0.085, 0.36, -0.04 * bulk], { muscle: true, ...ell(0.05 * s.calf, 0.085, 0.05) });
  pair("foot", SPHERE, [0.09, 0.05, 0.05], ell(0.045, 0.035, 0.1));

  return root;
}

export function createScene(canvas, { autoRotate = true } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const view = 1.05;
  const camera = new THREE.OrthographicCamera(-view, view, view, -view, 0.1, 40);
  camera.position.set(0, 0.9, 6);
  camera.lookAt(0, 0.9, 0);

  const hemi = new THREE.HemisphereLight(0xdfe8ff, 0x161320, 0.95);
  const key = new THREE.DirectionalLight(0xffffff, 1.45);
  key.position.set(2.4, 3.6, 3.2);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 12;
  key.shadow.bias = -0.0008;
  const rim = new THREE.DirectionalLight(0x89b4ff, 0.6);
  rim.position.set(-3, 2, -2.4);
  scene.add(hemi, key, rim);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(1.7, 48),
    new THREE.ShadowMaterial({ opacity: 0.35 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  scene.add(floor);

  const pivot = new THREE.Group();
  scene.add(pivot);

  let figure = null;
  let yaw = 0;
  let dragging = false;
  let lastX = 0;
  let raf = 0;
  let rotate = autoRotate;

  function resize() {
    const w = Math.max(1, canvas.clientWidth || 320);
    const h = Math.max(1, canvas.clientHeight || 420);
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.left = -view * aspect;
    camera.right = view * aspect;
    camera.top = view;
    camera.bottom = -view;
    camera.updateProjectionMatrix();
  }

  function setFigure(next) {
    if (figure) {
      pivot.remove(figure);
      figure.traverse((child) => {
        if (child.isMesh) child.material.dispose();
      });
    }
    figure = next;
    pivot.add(figure);
  }

  function onDown(event) {
    dragging = true;
    rotate = false;
    lastX = event.clientX;
    canvas.setPointerCapture?.(event.pointerId);
  }
  function onMove(event) {
    if (!dragging) return;
    yaw += (event.clientX - lastX) * 0.01;
    lastX = event.clientX;
  }
  function onUp() {
    dragging = false;
  }

  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  let warmup = 150;
  function tick() {
    if (warmup > 0) {
      warmup -= 1;
    } else if (rotate && !dragging) {
      yaw += 0.006;
    }
    pivot.rotation.y = yaw;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  return {
    setFigure,
    resize,
    setAutoRotate(value) {
      rotate = value;
    },
    dispose() {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      ro.disconnect();
      renderer.dispose();
    },
  };
}
