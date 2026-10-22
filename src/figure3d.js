import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { vertexIds } from "./muscles.js";

const CDN = "https://cdn.jsdelivr.net/gh/AygunAlpKagan/ecorche-body@main/models";
const PRIMARY = new THREE.Color("#e83034");
const SECONDARY = new THREE.Color("#ff9230");
const buffers = new Map();
const loader = new GLTFLoader();

export function modelFile(gender) {
  return gender === "female" ? "female_anatomy_mobile.glb" : "male_anatomy_mobile.glb";
}

export function resolveModelUrl({ gender = "male", modelUrl, baseUrl } = {}) {
  if (modelUrl) return modelUrl;
  if (baseUrl != null) {
    const base = String(baseUrl).replace(/\/$/, "");
    return `${base}/${modelFile(gender)}`;
  }
  return `${CDN}/${modelFile(gender)}`;
}

function getBuffer(url) {
  if (!buffers.has(url)) {
    buffers.set(
      url,
      fetch(url).then((res) => {
        if (!res.ok) throw new Error(`Model yüklenemedi (${res.status}): ${url}`);
        return res.arrayBuffer();
      }),
    );
  }
  return buffers.get(url);
}

function parseGltf(buffer) {
  return new Promise((resolve, reject) => {
    loader.parse(buffer.slice(0), "", resolve, reject);
  });
}

function findSkinned(root) {
  let mesh = null;
  root.traverse((node) => {
    if (node.isSkinnedMesh && !mesh) mesh = node;
  });
  return mesh;
}

function snapshotColors(mesh) {
  const color = mesh.geometry.getAttribute("color");
  if (!color) return null;
  const n = color.count;
  const base = new Float32Array(n * 3);
  for (let i = 0; i < n; i += 1) {
    base[i * 3] = color.getX(i);
    base[i * 3 + 1] = color.getY(i);
    base[i * 3 + 2] = color.getZ(i);
  }
  mesh.geometry.setAttribute("color", new THREE.BufferAttribute(base.slice(), 3));
  return base;
}

function paint(mesh, base, primary, secondary, primaryColor, secondaryColor) {
  if (!mesh || !base) return;
  const mus = mesh.geometry.getAttribute("_muscle");
  const col = mesh.geometry.getAttribute("color");
  if (!mus || !col) return;
  const p = vertexIds(primary);
  const s = vertexIds(secondary);
  for (let i = 0; i < mus.count; i += 1) {
    const id = Math.round(mus.getX(i));
    if (p.has(id)) col.setXYZ(i, primaryColor.r, primaryColor.g, primaryColor.b);
    else if (s.has(id)) col.setXYZ(i, secondaryColor.r, secondaryColor.g, secondaryColor.b);
    else col.setXYZ(i, base[i * 3], base[i * 3 + 1], base[i * 3 + 2]);
  }
  col.needsUpdate = true;
}

function poseBones(mesh, pose) {
  if (!mesh?.skeleton) return;
  const bones = Object.fromEntries(mesh.skeleton.bones.map((bone) => [bone.name, bone]));
  mesh.skeleton.pose();
  const bend = (name, deg) => {
    if (bones[name]) bones[name].rotateZ(THREE.MathUtils.degToRad(deg));
  };
  if (pose === "curl") ["R", "L"].forEach((side) => bend(`ForeArm_${side}`, -110));
  if (pose === "squat") {
    ["R", "L"].forEach((side) => {
      bend(`Thigh_${side}`, -95);
      bend(`Shin_${side}`, 115);
    });
  }
}

function applyShape(root, mesh, shape) {
  root.scale.set(1, 1, 1);
  root.position.set(0, 0, 0);
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const natural = size.y || 1.7;
  const heightM = (shape.height || 175) / 100;
  const y = heightM / natural;
  const xz = y * (0.86 + shape.bulk * 0.28);
  root.scale.set(xz, y, xz);
  root.updateMatrixWorld(true);
  box.setFromObject(root);
  const center = box.getCenter(new THREE.Vector3());
  root.position.x -= center.x;
  root.position.z -= center.z;
  root.position.y -= box.min.y;
  if (mesh?.material) {
    mesh.material.roughness = 0.38 + (1 - (shape.definition || 0.7)) * 0.32;
  }
}

export function createViewer(canvas, { view = "orbit", autoRotate = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x6d7380, 1.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.05);
  key.position.set(2.1, 4.2, 3.1);
  const fill = new THREE.DirectionalLight(0xdde7ff, 0.55);
  fill.position.set(-2.4, 1.6, 2.2);
  const rim = new THREE.DirectionalLight(0xffffff, 0.85);
  rim.position.set(-3.1, 2.2, -2.4);
  scene.add(key, fill, rim);

  const orbitCam = new THREE.PerspectiveCamera(28, 1, 0.05, 40);
  const frontCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.05, 40);
  const backCam = frontCam.clone();

  const pivot = new THREE.Group();
  scene.add(pivot);

  let root = null;
  let mesh = null;
  let base = null;
  let yaw = view === "orbit" ? 0.42 : 0;
  let pitch = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let raf = 0;
  let rotate = autoRotate && view === "orbit";
  let warmup = view === "orbit" ? 150 : 0;
  let look = new THREE.Vector3(0, 0.92, 0);
  let dist = 3.4;
  let generation = 0;
  let highlight = { primary: [], secondary: [], primaryColor: PRIMARY.clone(), secondaryColor: SECONDARY.clone() };
  let pose = "rest";
  let status = "Yükleniyor…";
  let currentUrl = "";

  function frame() {
    if (!root) return;
    const box = new THREE.Box3().setFromObject(pivot);
    const size = box.getSize(new THREE.Vector3());
    look = box.getCenter(new THREE.Vector3());
    dist = Math.max(size.y * 2.7, 3.2);
    orbitCam.position.set(look.x, look.y + size.y * 0.02, look.z + dist);
    orbitCam.lookAt(look);
    const half = size.y * 0.62;
    for (const cam of [frontCam, backCam]) {
      cam.top = half;
      cam.bottom = -half;
      cam.near = 0.05;
      cam.far = 40;
    }
    frontCam.position.set(look.x, look.y, look.z + dist);
    backCam.position.set(look.x, look.y, look.z - dist);
    frontCam.lookAt(look);
    backCam.lookAt(look);
    backCam.up.set(0, 1, 0);
    resize();
  }

  function resize() {
    const w = Math.max(1, canvas.clientWidth || 320);
    const h = Math.max(1, canvas.clientHeight || 420);
    renderer.setSize(w, h, false);
    const aspect = w / h;
    orbitCam.aspect = aspect;
    orbitCam.updateProjectionMatrix();
    const span = view === "both" ? 2 : 1;
    for (const cam of [frontCam, backCam]) {
      const halfH = cam.top;
      const halfW = halfH * (aspect / span);
      cam.left = -halfW;
      cam.right = halfW;
      cam.updateProjectionMatrix();
    }
  }

  function applyHighlight() {
    paint(mesh, base, highlight.primary, highlight.secondary, highlight.primaryColor, highlight.secondaryColor);
  }

  async function setFigure({ gender, shape, modelUrl, baseUrl }) {
    const url = resolveModelUrl({ gender, modelUrl, baseUrl });
    if (root && mesh && url === currentUrl) {
      applyShape(root, mesh, shape);
      poseBones(mesh, pose);
      frame();
      return;
    }
    const token = (generation += 1);
    status = "Yükleniyor…";
    currentUrl = url;
    const buffer = await getBuffer(url);
    const gltf = await parseGltf(buffer);
    if (token !== generation) return;
    if (root) {
      pivot.remove(root);
      root.traverse((child) => {
        if (child.isMesh) child.material?.dispose?.();
      });
    }
    root = gltf.scene;
    mesh = findSkinned(root);
    if (!mesh) {
      status = "İskeletli mesh yok";
      return;
    }
    base = snapshotColors(mesh);
    mesh.material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.52,
      metalness: 0.02,
    });
    mesh.frustumCulled = false;
    applyShape(root, mesh, shape);
    pivot.add(root);
    poseBones(mesh, pose);
    applyHighlight();
    yaw = view === "orbit" ? 0.42 : 0;
    pitch = 0;
    pivot.rotation.set(0, 0, 0);
    frame();
    status = "";
  }

  function setHighlight(primary = [], secondary = [], primaryColor, secondaryColor) {
    highlight = {
      primary,
      secondary,
      primaryColor: new THREE.Color(primaryColor || "#e83034"),
      secondaryColor: new THREE.Color(secondaryColor || "#ff9230"),
    };
    applyHighlight();
  }

  function setPose(next = "rest") {
    pose = next;
    poseBones(mesh, pose);
    frame();
  }

  function onDown(event) {
    if (view !== "orbit") return;
    dragging = true;
    rotate = false;
    lastX = event.clientX;
    lastY = event.clientY;
    canvas.setPointerCapture?.(event.pointerId);
  }
  function onMove(event) {
    if (!dragging) return;
    yaw += (event.clientX - lastX) * 0.008;
    pitch = Math.min(0.45, Math.max(-0.18, pitch + (event.clientY - lastY) * 0.004));
    lastX = event.clientX;
    lastY = event.clientY;
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
    if (warmup > 0) warmup -= 1;
    else if (rotate && !dragging && view === "orbit") yaw += 0.006;
    pivot.rotation.set(pitch, yaw, 0);
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    if (view === "both") {
      renderer.setScissorTest(true);
      renderer.setViewport(0, 0, w / 2, h);
      renderer.setScissor(0, 0, w / 2, h);
      renderer.render(scene, frontCam);
      renderer.setViewport(w / 2, 0, w / 2, h);
      renderer.setScissor(w / 2, 0, w / 2, h);
      renderer.render(scene, backCam);
      renderer.setScissorTest(false);
    } else if (view === "back") {
      renderer.render(scene, backCam);
    } else if (view === "front") {
      renderer.render(scene, frontCam);
    } else {
      orbitCam.position.set(
        look.x + Math.sin(0) * 0,
        look.y + dist * Math.sin(pitch) * 0.15,
        look.z + dist,
      );
      orbitCam.lookAt(look);
      renderer.render(scene, orbitCam);
    }
    raf = requestAnimationFrame(tick);
  }
  tick();

  return {
    setFigure,
    setHighlight,
    setPose,
    setAutoRotate(value) {
      rotate = Boolean(value) && view === "orbit";
    },
    getStatus: () => status,
    resize,
    dispose() {
      generation += 1;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      ro.disconnect();
      renderer.dispose();
    },
  };
}
