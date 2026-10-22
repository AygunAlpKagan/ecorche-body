import * as THREE from "three";

const BASE = 0x9aa3ad;
const PRIMARY = 0x2f8cff;
const SECONDARY = 0xff4d8d;

export function buildFigure(shape, primary = [], secondary = []) {
  const root = new THREE.Group();
  const s = shape;
  const tall = s.tall;
  const add = (id, geo, pos, rot = [0, 0, 0], extra = 1) => {
    const role = primary.includes(id) ? "primary" : secondary.includes(id) ? "secondary" : "idle";
    const color = role === "primary" ? PRIMARY : role === "secondary" ? SECONDARY : BASE;
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: role === "idle" ? 0.55 : 0.35,
      metalness: 0.04,
      emissive: role === "idle" ? 0x000000 : color,
      emissiveIntensity: role === "primary" ? 0.35 : role === "secondary" ? 0.22 : 0,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = id;
    mesh.position.set(pos[0], pos[1] * tall, pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.scale.multiplyScalar(extra);
    root.add(mesh);
    return mesh;
  };

  const cap = (r, len, seg = 8) => new THREE.CapsuleGeometry(r, len, 4, seg);
  const sph = (r) => new THREE.SphereGeometry(r, 18, 14);

  add("head", sph(0.11 * s.neck), [0, 1.62, 0], [0, 0, 0], 1);
  add("neck", cap(0.045 * s.neck, 0.08), [0, 1.48, 0]);
  add("traps", cap(0.09 * s.shoulder, 0.08), [0, 1.4, -0.02], [0.5, 0, 0]);
  add("chest", cap(0.13 * s.chest, 0.12), [-0.08, 1.28, 0.06], [1.15, 0, 0.15]);
  add("chest", cap(0.13 * s.chest, 0.12), [0.08, 1.28, 0.06], [1.15, 0, -0.15]);
  add("abdominals", cap(0.09 * s.waist, 0.22), [0, 1.08, 0.04], [0.12, 0, 0]);
  add("obliques", cap(0.05 * s.waist, 0.16), [-0.09, 1.08, 0.02], [0.1, 0, 0.35]);
  add("obliques", cap(0.05 * s.waist, 0.16), [0.09, 1.08, 0.02], [0.1, 0, -0.35]);
  add("lats", cap(0.08 * s.shoulder, 0.2), [-0.1, 1.18, -0.04], [0.35, 0, 0.4]);
  add("lats", cap(0.08 * s.shoulder, 0.2), [0.1, 1.18, -0.04], [0.35, 0, -0.4]);
  add("middle back", cap(0.08, 0.14), [0, 1.22, -0.06], [0.2, 0, 0]);
  add("lower back", cap(0.06 * s.waist, 0.12), [0, 1.02, -0.05], [0.15, 0, 0]);
  add("shoulders", cap(0.08 * s.shoulder, 0.08), [-0.22 * s.shoulder, 1.36, 0], [0, 0, 1.15]);
  add("shoulders", cap(0.08 * s.shoulder, 0.08), [0.22 * s.shoulder, 1.36, 0], [0, 0, -1.15]);
  add("biceps", cap(0.045 * s.arm, 0.16), [-0.28 * s.shoulder, 1.16, 0.03], [0.15, 0, 0.25]);
  add("biceps", cap(0.045 * s.arm, 0.16), [0.28 * s.shoulder, 1.16, 0.03], [0.15, 0, -0.25]);
  add("triceps", cap(0.042 * s.arm, 0.16), [-0.3 * s.shoulder, 1.16, -0.03], [0.15, 0, 0.25]);
  add("triceps", cap(0.042 * s.arm, 0.16), [0.3 * s.shoulder, 1.16, -0.03], [0.15, 0, -0.25]);
  add("forearms", cap(0.035 * s.arm, 0.18), [-0.34 * s.shoulder, 0.9, 0.02], [0.1, 0, 0.2]);
  add("forearms", cap(0.035 * s.arm, 0.18), [0.34 * s.shoulder, 0.9, 0.02], [0.1, 0, -0.2]);
  add("glutes", cap(0.1 * s.hip, 0.1), [-0.08, 0.86, -0.05], [0.4, 0, 0]);
  add("glutes", cap(0.1 * s.hip, 0.1), [0.08, 0.86, -0.05], [0.4, 0, 0]);
  add("abductors", cap(0.05 * s.hip, 0.1), [-0.14, 0.84, 0], [0.2, 0, 0.4]);
  add("abductors", cap(0.05 * s.hip, 0.1), [0.14, 0.84, 0], [0.2, 0, -0.4]);
  add("adductors", cap(0.04 * s.thigh, 0.16), [-0.05, 0.7, 0.02], [0.05, 0, 0.1]);
  add("adductors", cap(0.04 * s.thigh, 0.16), [0.05, 0.7, 0.02], [0.05, 0, -0.1]);
  add("quadriceps", cap(0.07 * s.thigh, 0.28), [-0.09, 0.58, 0.04], [0.08, 0, 0.04]);
  add("quadriceps", cap(0.07 * s.thigh, 0.28), [0.09, 0.58, 0.04], [0.08, 0, -0.04]);
  add("hamstrings", cap(0.065 * s.thigh, 0.26), [-0.09, 0.56, -0.04], [-0.08, 0, 0.04]);
  add("hamstrings", cap(0.065 * s.thigh, 0.26), [0.09, 0.56, -0.04], [-0.08, 0, -0.04]);
  add("calves", cap(0.05 * s.calf, 0.22), [-0.08, 0.22, -0.02], [0.05, 0, 0]);
  add("calves", cap(0.05 * s.calf, 0.22), [0.08, 0.22, -0.02], [0.05, 0, 0]);

  root.traverse((child) => {
    if (child.isMesh) child.castShadow = true;
  });
  return root;
}

export function createScene(canvas, { autoRotate = true } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new THREE.Scene();
  const view = 1.15;
  const camera = new THREE.OrthographicCamera(-view, view, view, -view, 0.1, 40);
  camera.position.set(0, 0.88, 6);
  camera.lookAt(0, 0.88, 0);

  const hemi = new THREE.HemisphereLight(0xdde7ff, 0x1a1424, 1.1);
  const key = new THREE.DirectionalLight(0xffffff, 1.35);
  key.position.set(2.2, 3.4, 2.8);
  const fill = new THREE.DirectionalLight(0x88aadd, 0.45);
  fill.position.set(-2.4, 1.2, -1.6);
  scene.add(hemi, key, fill);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(1.6, 48),
    new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.9 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  scene.add(floor);

  const pivot = new THREE.Group();
  scene.add(pivot);

  let figure = null;
  let yaw = 0.35;
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
    if (figure) pivot.remove(figure);
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

  function tick() {
    if (rotate && !dragging) yaw += 0.006;
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
