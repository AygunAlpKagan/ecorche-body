import { jsxs as P, jsx as R } from "react/jsx-runtime";
import { useRef as Z, useEffect as D } from "react";
import * as f from "three";
import { GLTFLoader as Ae } from "three/examples/jsm/loaders/GLTFLoader.js";
const Me = { Quadriceps: [426, 427, 428, 430, 431, 432], "Gluteus Maximus": [406, 410], "Gluteus Medius": [405, 408, 409, 412], Hamstrings: [450, 452, 454, 455, 456, 457], Adductors: [436, 437, 438, 441, 443, 444, 445, 448], "Adductor Magnus": [436, 443], Calves: [472, 473, 475, 476, 478, 479], Gastrocnemius: [472, 473, 475, 476], Soleus: [478, 479], "Tibialis Anterior": [462, 465], "Pectoralis Major": [225, 226, 227, 228, 229, 230], "Upper Chest": [225, 228], "Front Deltoid": [280, 283], "Side Deltoid": [279, 282], "Rear Deltoid": [281, 284], Deltoids: [279, 280, 281, 282, 283, 284], Biceps: [295, 296, 297, 298], Brachialis: [299, 301], Brachioradialis: [337, 342], Triceps: [304, 305, 307, 308], "Forearm Flexors": [313, 315, 319, 320, 321, 322], "Forearm Extensors": [331, 332, 334, 336, 338, 339, 343, 344], "Latissimus Dorsi": [216, 222, 293, 294], Trapezius: [203, 204, 205, 206, 207, 208], "Upper Trapezius": [204, 207], "Middle Trapezius": [203, 205, 206, 208], Infraspinatus: [287, 288, 291, 292], "Erector Spinae": [163, 166, 169, 170], "Rectus Abdominis": [252, 253], Obliques: [256, 257], "Serratus Anterior": [238, 245], "Hip Flexors": [408, 412, 426, 430, 434, 435], Sternocleidomastoid: [86, 87] }, ke = 881, W = {
  groups: Me,
  skin_id: ke
}, ue = W.groups, ze = Object.keys(W.groups), q = W.skin_id, ye = {
  neck: ["Sternocleidomastoid"],
  traps: ["Trapezius"],
  shoulders: ["Deltoids"],
  chest: ["Pectoralis Major"],
  biceps: ["Biceps"],
  triceps: ["Triceps"],
  forearms: ["Forearm Flexors", "Forearm Extensors", "Brachioradialis"],
  abdominals: ["Rectus Abdominis"],
  obliques: ["Obliques"],
  lats: ["Latissimus Dorsi"],
  "middle back": ["Middle Trapezius", "Infraspinatus"],
  "lower back": ["Erector Spinae"],
  glutes: ["Gluteus Maximus"],
  abductors: ["Gluteus Medius"],
  adductors: ["Adductors"],
  quadriceps: ["Quadriceps"],
  hamstrings: ["Hamstrings"],
  calves: ["Calves"]
}, Q = [
  { id: "neck", latin: "STERNOCLEIDOMASTOID", side: "both" },
  { id: "traps", latin: "TRAPEZIUS", side: "both" },
  { id: "shoulders", latin: "DELTOID", side: "both" },
  { id: "chest", latin: "PECTORALIS MAJOR", side: "front" },
  { id: "biceps", latin: "BICEPS BRACHII", side: "front" },
  { id: "triceps", latin: "TRICEPS BRACHII", side: "back" },
  { id: "forearms", latin: "FOREARMS", side: "both" },
  { id: "abdominals", latin: "RECTUS ABDOMINIS", side: "front" },
  { id: "obliques", latin: "OBLIQUES", side: "front" },
  { id: "lats", latin: "LATISSIMUS DORSI", side: "back" },
  { id: "middle back", latin: "RHOMBOIDS / INFRASPINATUS", side: "back" },
  { id: "lower back", latin: "ERECTOR SPINAE", side: "back" },
  { id: "glutes", latin: "GLUTEUS MAXIMUS", side: "back" },
  { id: "abductors", latin: "GLUTEUS MEDIUS", side: "both" },
  { id: "adductors", latin: "ADDUCTORS", side: "front" },
  { id: "quadriceps", latin: "QUADRICEPS", side: "front" },
  { id: "hamstrings", latin: "HAMSTRINGS", side: "back" },
  { id: "calves", latin: "GASTROCNEMIUS", side: "both" }
], Ge = Q.map((e) => e.id), ce = {
  neck: "#d4b896",
  traps: "#8b6cff",
  shoulders: "#ff9f43",
  chest: "#e23d3d",
  biceps: "#3d9bff",
  triceps: "#2ec4b6",
  forearms: "#f4a261",
  abdominals: "#ff5d8f",
  obliques: "#e9c46a",
  lats: "#4cc9f0",
  "middle back": "#9b5de5",
  "lower back": "#c77dff",
  glutes: "#f72585",
  abductors: "#fb8500",
  adductors: "#7209b7",
  quadriceps: "#00bbf9",
  hamstrings: "#00c49a",
  calves: "#fee440",
  "Serratus Anterior": "#e76f51",
  "Upper Chest": "#c1121f",
  "Hip Flexors": "#ff7b9c",
  Brachialis: "#4ea8de",
  Brachioradialis: "#f4a261",
  "Forearm Flexors": "#e09f3e",
  "Forearm Extensors": "#d4a373",
  Gastrocnemius: "#fee440",
  Soleus: "#e9c46a",
  "Tibialis Anterior": "#90be6d",
  "Gluteus Medius": "#fb8500",
  "Adductor Magnus": "#7209b7",
  "Front Deltoid": "#ff9f43",
  "Side Deltoid": "#ff7d00",
  "Rear Deltoid": "#f4a261",
  Deltoids: "#ff9f43",
  "Upper Trapezius": "#8b6cff",
  "Middle Trapezius": "#9b5de5",
  Infraspinatus: "#c77dff",
  "Pectoralis Major": "#e23d3d",
  "Latissimus Dorsi": "#4cc9f0",
  Trapezius: "#8b6cff",
  "Rectus Abdominis": "#ff5d8f",
  Obliques: "#e9c46a",
  Quadriceps: "#00bbf9",
  Hamstrings: "#00c49a",
  Calves: "#fee440",
  "Gluteus Maximus": "#f72585",
  Adductors: "#7209b7",
  Biceps: "#3d9bff",
  Triceps: "#2ec4b6",
  Sternocleidomastoid: "#d4b896",
  "Erector Spinae": "#c77dff"
}, de = "Anatomik kas haritası: Z-Anatomy / BodyParts3D, CC BY-SA 4.0. Gövde: MakeHuman, CC0.";
function ve(e) {
  return Q.find((t) => t.id === e)?.latin || String(e).toUpperCase();
}
function $e(e, t = [], n = []) {
  return t.includes(e) ? "primary" : n.includes(e) ? "secondary" : "idle";
}
function V(e = []) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e) {
    if (!n) continue;
    const o = ye[n] || [n];
    for (const i of o) {
      const c = ue[i];
      if (c) for (const m of c) t.add(m);
    }
  }
  return t;
}
const L = /* @__PURE__ */ new Map();
for (const e of Q)
  for (const t of V([e.id]))
    L.has(t) || L.set(t, e.id);
for (const [e, t] of Object.entries(ue))
  for (const n of t)
    L.has(n) || L.set(n, e);
function we(e) {
  return L.get(e) || null;
}
function Ee(e = {}) {
  const t = e.gender === "female", n = j(e.weight, t ? 62 : 78, 35, 180), o = j(e.height, t ? 165 : 178, 130, 210), i = j(e.age, 28, 18, 85), c = n / (o / 100) ** 2, m = C(
    1.2 * c + 0.23 * i - (t ? 0 : 10.8) - 5.4,
    t ? 10 : 4,
    t ? 55 : 45
  ), u = C((m - (t ? 22 : 12)) / 25, 0, 1), s = c * (1 - m / 100), r = C(0.5 + (s - (t ? 15.5 : 18.5)) / 14, 0, 1), l = C((i - 25) / 60, 0, 0.7);
  return {
    female: t,
    weight: n,
    height: o,
    age: i,
    bmi: c,
    bodyFatPercent: m,
    leanMassIndex: s,
    bulk: r,
    fat: u,
    definition: C(1 - l * 0.25 - u * 0.3, 0.45, 1),
    shoulder: (t ? 0.9 : 1) * (0.94 + r * 0.12),
    chest: (t ? 0.92 : 1) * (0.96 + r * 0.08),
    waist: (t ? 0.84 : 0.88) + u * 0.16,
    hip: (t ? 1.12 : 0.98) * (0.98 + (r - 0.5) * 0.08 + u * 0.035),
    arm: (t ? 0.88 : 1) * (0.96 + (r - 0.5) * 0.12),
    thigh: (t ? 1.06 : 1) * (0.96 + (r - 0.5) * 0.14),
    calf: 0.96 + (r - 0.5) * 0.08,
    neck: (t ? 0.9 : 1) * (0.96 + (r - 0.5) * 0.06),
    tall: o / 178
  };
}
function j(e, t, n, o) {
  const i = Number(e);
  return !Number.isFinite(i) || i === 0 ? t : C(i, n, o);
}
function C(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
const Re = "https://cdn.jsdelivr.net/gh/AygunAlpKagan/ecorche-body@main/models", xe = new f.Color("#e83034"), Ce = new f.Color("#ff9230"), Y = /* @__PURE__ */ new Map(), De = new Ae();
function le(e) {
  return e === "female" ? "female_anatomy_mobile.glb" : "male_anatomy_mobile.glb";
}
function Ie({ gender: e = "male", modelUrl: t, baseUrl: n } = {}) {
  return t || (n != null ? `${String(n).replace(/\/$/, "")}/${le(e)}` : `${Re}/${le(e)}`);
}
function Le(e) {
  return Y.has(e) || Y.set(
    e,
    fetch(e).then((t) => {
      if (!t.ok) throw new Error(`Model yüklenemedi (${t.status}): ${e}`);
      return t.arrayBuffer();
    })
  ), Y.get(e);
}
function Te(e) {
  return new Promise((t, n) => {
    De.parse(e.slice(0), "", t, n);
  });
}
function Oe(e) {
  let t = null;
  return e.traverse((n) => {
    n.isSkinnedMesh && !t && (t = n);
  }), t;
}
function Be(e) {
  const t = e.geometry.getAttribute("color");
  if (!t) return null;
  const n = t.count, o = new Float32Array(n * 3);
  for (let i = 0; i < n; i += 1)
    o[i * 3] = t.getX(i), o[i * 3 + 1] = t.getY(i), o[i * 3 + 2] = t.getZ(i);
  return e.geometry.setAttribute("color", new f.BufferAttribute(o.slice(), 3)), o;
}
function Fe(e, t, n, o) {
  if (!e || !t) return;
  const i = e.geometry.getAttribute("_muscle"), c = e.geometry.getAttribute("color");
  if (!i || !c) return;
  const m = V(n), u = V(o), s = new f.Color(), b = new f.Color("#c2786e");
  for (let r = 0; r < i.count; r += 1) {
    const l = Math.round(i.getX(r));
    if (l === q) {
      c.setXYZ(r, t[r * 3], t[r * 3 + 1], t[r * 3 + 2]);
      continue;
    }
    const d = we(l);
    d && ce[d] ? s.set(ce[d]) : s.copy(b), m.has(l) ? s.offsetHSL(0, 0.12, 0.16) : u.has(l) ? s.offsetHSL(0, 0.06, 0.08) : s.offsetHSL(0, -0.04, -0.08), c.setXYZ(r, s.r, s.g, s.b);
  }
  c.needsUpdate = !0;
}
function X(e, t) {
  if (!e?.skeleton) return;
  const n = Object.fromEntries(e.skeleton.bones.map((i) => [i.name, i])), o = (i, c) => {
    n[i] && n[i].rotateZ(f.MathUtils.degToRad(c));
  };
  t === "curl" && ["R", "L"].forEach((i) => o(`ForeArm_${i}`, -110)), t === "squat" && ["R", "L"].forEach((i) => {
    o(`Thigh_${i}`, -95), o(`Shin_${i}`, 115);
  });
}
function Pe(e, t) {
  if (!e) return;
  const n = e.geometry.getAttribute("position"), o = e.geometry.getAttribute("normal"), i = e.geometry.getAttribute("_muscle");
  if (!n || !o) return;
  e.userData.basePos || (e.userData.basePos = Float32Array.from(n.array));
  const c = e.userData.basePos, m = (t.definition || 0.5) * 0.012 + (t.bulk - 0.4) * 0.01, u = (t.fat || 0) * 0.016;
  for (let s = 0; s < n.count; s += 1) {
    const r = (i ? Math.round(i.getX(s)) : q) === q ? u : m + u * 0.45, l = s * 3;
    n.array[l] = c[l] + o.getX(s) * r, n.array[l + 1] = c[l + 1] + o.getY(s) * r, n.array[l + 2] = c[l + 2] + o.getZ(s) * r;
  }
  n.needsUpdate = !0, e.geometry.computeBoundingSphere();
}
function I(e, t, n) {
  const o = e[t];
  o && o.scale.set(1, n, n);
}
function pe(e, t) {
  if (!e?.skeleton) return;
  const n = Object.fromEntries(e.skeleton.bones.map((i) => [i.name, i]));
  e.skeleton.pose();
  const o = t;
  ["R", "L"].forEach((i) => {
    I(n, `Clavicle_${i}`, o.shoulder), I(n, `UpperArm_${i}`, o.arm), I(n, `ForeArm_${i}`, 0.86 + o.bulk * 0.28), I(n, `Thigh_${i}`, o.thigh), I(n, `Shin_${i}`, o.calf);
  }), n.Pelvis && n.Pelvis.scale.set(1, 0.96 + (o.hip - 1) * 0.35, o.hip), n.Spine_Upper && n.Spine_Upper.scale.set(1, 0.94 + o.bulk * 0.16, 0.9 + (o.fat || 0) * 0.2), n.Spine_Lower && n.Spine_Lower.scale.set(1, 0.92 + (o.fat || 0) * 0.22, 0.9 + (o.fat || 0) * 0.2), n.Neck && n.Neck.scale.set(1, o.neck, o.neck);
}
function fe(e, t, n) {
  Pe(t, n), pe(t, n), e.scale.set(1, 1, 1), e.position.set(0, 0, 0), e.updateMatrixWorld(!0);
  const o = new f.Box3().setFromObject(e), c = o.getSize(new f.Vector3()).y || 1.7, u = (n.height || 175) / 100 / c;
  e.scale.set(u * (n.female ? 0.94 : 1), u, u * (n.female ? 0.96 : 1)), e.updateMatrixWorld(!0), o.setFromObject(e);
  const s = o.getCenter(new f.Vector3());
  e.position.x -= s.x, e.position.z -= s.z, e.position.y -= o.min.y, t?.material && (t.material.roughness = 0.28 + (1 - (n.definition || 0.7)) * 0.42);
}
function Ue(e, { view: t = "orbit", autoRotate: n = !1 } = {}) {
  const o = new f.WebGLRenderer({ canvas: e, antialias: !0, alpha: !0 });
  o.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)), o.outputColorSpace = f.SRGBColorSpace;
  const i = new f.Scene();
  i.add(new f.HemisphereLight(16777215, 7172992, 1.55));
  const c = new f.DirectionalLight(16777215, 2.05);
  c.position.set(2.1, 4.2, 3.1);
  const m = new f.DirectionalLight(14542847, 0.55);
  m.position.set(-2.4, 1.6, 2.2);
  const u = new f.DirectionalLight(16777215, 0.85);
  u.position.set(-3.1, 2.2, -2.4), i.add(c, m, u);
  const s = new f.PerspectiveCamera(28, 1, 0.05, 40), b = new f.OrthographicCamera(-1, 1, 1, -1, 0.05, 40), r = b.clone(), l = new f.Group();
  i.add(l);
  let d = null, p = null, A = null, S = t === "orbit" ? 0.42 : 0, M = 0, w = !1, U = 0, _ = 0, K = 0, N = n && t === "orbit", J = t === "orbit" ? 150 : 0, h = new f.Vector3(0, 0.92, 0), x = 3.4, H = 0, z = { primary: [], secondary: [], primaryColor: xe.clone(), secondaryColor: Ce.clone() }, T = "rest", O = "Yükleniyor…", ee = "", G = null;
  function v() {
    if (!d) return;
    const a = new f.Box3().setFromObject(l), g = a.getSize(new f.Vector3());
    h = a.getCenter(new f.Vector3()), x = Math.max(g.y * 2.7, 3.2), s.position.set(h.x, h.y + g.y * 0.02, h.z + x), s.lookAt(h);
    const E = g.y * 0.62;
    for (const k of [b, r])
      k.top = E, k.bottom = -E, k.near = 0.05, k.far = 40;
    b.position.set(h.x, h.y, h.z + x), r.position.set(h.x, h.y, h.z - x), b.lookAt(h), r.lookAt(h), r.up.set(0, 1, 0), B();
  }
  function B() {
    const a = Math.max(1, e.clientWidth || 320), g = Math.max(1, e.clientHeight || 420);
    o.setSize(a, g, !1);
    const E = a / g;
    s.aspect = E, s.updateProjectionMatrix();
    const k = t === "both" ? 2 : 1;
    for (const y of [b, r]) {
      const F = y.top * (E / k);
      y.left = -F, y.right = F, y.updateProjectionMatrix();
    }
  }
  function $() {
    Fe(p, A, z.primary, z.secondary);
  }
  async function be({ gender: a, shape: g, modelUrl: E, baseUrl: k }) {
    G = g;
    const y = Ie({ gender: a, modelUrl: E, baseUrl: k });
    if (d && p && y === ee) {
      fe(d, p, g), X(p, T), $(), v();
      return;
    }
    const re = H += 1;
    O = "Yükleniyor…", ee = y;
    const F = await Le(y), Se = await Te(F);
    if (re === H) {
      if (d && (l.remove(d), d.traverse((ae) => {
        ae.isMesh && ae.material?.dispose?.();
      })), d = Se.scene, p = Oe(d), !p) {
        O = "İskeletli mesh yok";
        return;
      }
      A = Be(p), p.material = new f.MeshStandardMaterial({
        vertexColors: !0,
        roughness: 0.52,
        metalness: 0.02
      }), p.frustumCulled = !1, fe(d, p, g), l.add(d), X(p, T), $(), S = t === "orbit" ? 0.42 : 0, M = 0, l.rotation.set(0, 0, 0), v(), O = "";
    }
  }
  function he(a = [], g = []) {
    z = { primary: a, secondary: g }, $();
  }
  function ge(a = "rest") {
    T = a, p && G && pe(p, G), X(p, T), v();
  }
  function te(a) {
    t === "orbit" && (w = !0, N = !1, U = a.clientX, _ = a.clientY, e.setPointerCapture?.(a.pointerId));
  }
  function ne(a) {
    w && (S += (a.clientX - U) * 8e-3, M = Math.min(0.45, Math.max(-0.18, M + (a.clientY - _) * 4e-3)), U = a.clientX, _ = a.clientY);
  }
  function oe() {
    w = !1;
  }
  e.addEventListener("pointerdown", te), e.addEventListener("pointermove", ne), window.addEventListener("pointerup", oe);
  const ie = new ResizeObserver(B);
  ie.observe(e), B();
  function se() {
    J > 0 ? J -= 1 : N && !w && t === "orbit" && (S += 6e-3), l.rotation.set(M, S, 0);
    const a = e.clientWidth || 1, g = e.clientHeight || 1;
    t === "both" ? (o.setScissorTest(!0), o.setViewport(0, 0, a / 2, g), o.setScissor(0, 0, a / 2, g), o.render(i, b), o.setViewport(a / 2, 0, a / 2, g), o.setScissor(a / 2, 0, a / 2, g), o.render(i, r), o.setScissorTest(!1)) : t === "back" ? o.render(i, r) : t === "front" ? o.render(i, b) : (s.position.set(
      h.x + Math.sin(0) * 0,
      h.y + x * Math.sin(M) * 0.15,
      h.z + x
    ), s.lookAt(h), o.render(i, s)), K = requestAnimationFrame(se);
  }
  return se(), {
    setFigure: be,
    setHighlight: he,
    setPose: ge,
    setAutoRotate(a) {
      N = !!a && t === "orbit";
    },
    getStatus: () => O,
    resize: B,
    dispose() {
      H += 1, cancelAnimationFrame(K), e.removeEventListener("pointerdown", te), e.removeEventListener("pointermove", ne), window.removeEventListener("pointerup", oe), ie.disconnect(), o.dispose();
    }
  };
}
function me(e, {
  view: t = "orbit",
  gender: n = "male",
  height: o,
  weight: i,
  age: c,
  primary: m = [],
  secondary: u = [],
  primaryColor: s,
  secondaryColor: b,
  autoRotate: r = !1,
  pose: l = "rest",
  modelUrl: d,
  baseUrl: p
}) {
  const A = Z(null), S = Ee({ gender: n, height: o, weight: i, age: c });
  D(() => {
    const M = e.current;
    if (!M) return;
    const w = Ue(M, { view: t, autoRotate: r });
    return A.current = w, () => {
      w.dispose(), A.current = null;
    };
  }, [t]), D(() => {
    A.current?.setAutoRotate(r);
  }, [r]), D(() => {
    A.current?.setFigure({ gender: n, shape: S, modelUrl: d, baseUrl: p });
  }, [n, S.height, S.weight, S.bmi, S.bulk, S.definition, S.fat, d, p]), D(() => {
    A.current?.setHighlight(m, u, s, b);
  }, [m, u, s, b]), D(() => {
    A.current?.setPose(l);
  }, [l]);
}
function je({
  gender: e = "male",
  height: t,
  weight: n,
  age: o,
  primary: i = [],
  secondary: c = [],
  primaryColor: m,
  secondaryColor: u,
  view: s = "both",
  pose: b = "rest",
  modelUrl: r,
  baseUrl: l,
  credit: d = !1,
  className: p = ""
}) {
  const A = Z(null), S = s === "back" || s === "front" ? s : "both";
  return me(A, {
    view: S,
    gender: e,
    height: t,
    weight: n,
    age: o,
    primary: i,
    secondary: c,
    primaryColor: m,
    secondaryColor: u,
    autoRotate: !1,
    pose: b,
    modelUrl: r,
    baseUrl: l
  }), /* @__PURE__ */ P("div", { className: `ecorche-2d ${S === "both" ? "sheet" : ""} ${p}`.trim(), children: [
    /* @__PURE__ */ P("div", { className: "ecorche-2d-stage", children: [
      /* @__PURE__ */ R("canvas", { ref: A, "aria-label": "2D anatomy figure" }),
      S === "both" && /* @__PURE__ */ P("div", { className: "ecorche-captions", children: [
        /* @__PURE__ */ R("span", { children: "Ön" }),
        /* @__PURE__ */ R("span", { children: "Arka" })
      ] })
    ] }),
    d && /* @__PURE__ */ R("p", { className: "ecorche-credit", children: de })
  ] });
}
function Ye({
  gender: e = "male",
  height: t,
  weight: n,
  age: o,
  primary: i = [],
  secondary: c = [],
  primaryColor: m,
  secondaryColor: u,
  autoRotate: s = !0,
  pose: b = "rest",
  modelUrl: r,
  baseUrl: l,
  credit: d = !1,
  className: p = ""
}) {
  const A = Z(null);
  return me(A, {
    view: "orbit",
    gender: e,
    height: t,
    weight: n,
    age: o,
    primary: i,
    secondary: c,
    primaryColor: m,
    secondaryColor: u,
    autoRotate: s,
    pose: b,
    modelUrl: r,
    baseUrl: l
  }), /* @__PURE__ */ P("div", { className: `ecorche-3d ${p}`.trim(), children: [
    /* @__PURE__ */ R("canvas", { ref: A, "aria-label": "3D anatomy figure" }),
    /* @__PURE__ */ R("p", { className: "ecorche-hint", children: "Sürükle, dön." }),
    d && /* @__PURE__ */ R("p", { className: "ecorche-credit", children: de })
  ] });
}
export {
  ye as ALIASES,
  je as Body2D,
  Ye as Body3D,
  de as CREDITS,
  ue as GROUPS,
  ze as GROUP_NAMES,
  Q as MUSCLES,
  ce as MUSCLE_COLORS,
  Ge as MUSCLE_IDS,
  Ee as bodyShape,
  ve as latin,
  le as modelFile,
  Ie as resolveModelUrl,
  $e as roleOf,
  V as vertexIds
};
