import { jsxs as P, jsx as R } from "react/jsx-runtime";
import { useRef as W, useEffect as I } from "react";
import * as u from "three";
import { GLTFLoader as ke } from "three/examples/jsm/loaders/GLTFLoader.js";
const ye = { Quadriceps: [426, 427, 428, 430, 431, 432], "Gluteus Maximus": [406, 410], "Gluteus Medius": [405, 408, 409, 412], Hamstrings: [450, 452, 454, 455, 456, 457], Adductors: [436, 437, 438, 441, 443, 444, 445, 448], "Adductor Magnus": [436, 443], Calves: [472, 473, 475, 476, 478, 479], Gastrocnemius: [472, 473, 475, 476], Soleus: [478, 479], "Tibialis Anterior": [462, 465], "Pectoralis Major": [225, 226, 227, 228, 229, 230], "Upper Chest": [225, 228], "Front Deltoid": [280, 283], "Side Deltoid": [279, 282], "Rear Deltoid": [281, 284], Deltoids: [279, 280, 281, 282, 283, 284], Biceps: [295, 296, 297, 298], Brachialis: [299, 301], Brachioradialis: [337, 342], Triceps: [304, 305, 307, 308], "Forearm Flexors": [313, 315, 319, 320, 321, 322], "Forearm Extensors": [331, 332, 334, 336, 338, 339, 343, 344], "Latissimus Dorsi": [216, 222, 293, 294], Trapezius: [203, 204, 205, 206, 207, 208], "Upper Trapezius": [204, 207], "Middle Trapezius": [203, 205, 206, 208], Infraspinatus: [287, 288, 291, 292], "Erector Spinae": [163, 166, 169, 170], "Rectus Abdominis": [252, 253], Obliques: [256, 257], "Serratus Anterior": [238, 245], "Hip Flexors": [408, 412, 426, 430, 434, 435], Sternocleidomastoid: [86, 87] }, we = 881, Q = {
  groups: ye,
  skin_id: we
}, pe = Q.groups, ze = Object.keys(Q.groups), le = Q.skin_id, Ee = {
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
}, K = [
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
], Ge = K.map((e) => e.id), He = {
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
}, me = "Anatomik kas haritası: Z-Anatomy / BodyParts3D, CC BY-SA 4.0. Gövde: MakeHuman, CC0.";
function ve(e) {
  return K.find((t) => t.id === e)?.latin || String(e).toUpperCase();
}
function $e(e, t = [], n = []) {
  return t.includes(e) ? "primary" : n.includes(e) ? "secondary" : "idle";
}
function q(e = []) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e) {
    if (!n) continue;
    const i = Ee[n] || [n];
    for (const r of i) {
      const c = pe[r];
      if (c) for (const d of c) t.add(d);
    }
  }
  return t;
}
const U = /* @__PURE__ */ new Map();
for (const e of K)
  for (const t of q([e.id]))
    U.has(t) || U.set(t, e.id);
for (const [e, t] of Object.entries(pe))
  for (const n of t)
    U.has(n) || U.set(n, e);
function Re(e = {}) {
  const t = e.gender === "female", n = j(e.weight, t ? 62 : 78, 35, 180), i = j(e.height, t ? 165 : 178, 130, 210), r = j(e.age, 28, 18, 85), c = n / (i / 100) ** 2, d = x(
    1.2 * c + 0.23 * r - (t ? 0 : 10.8) - 5.4,
    t ? 10 : 4,
    t ? 55 : 45
  ), l = x((d - (t ? 22 : 12)) / 25, 0, 1), s = c * (1 - d / 100), o = x(0.5 + (s - (t ? 15.5 : 18.5)) / 14, 0, 1), f = x((r - 25) / 60, 0, 0.7);
  return {
    female: t,
    weight: n,
    height: i,
    age: r,
    bmi: c,
    bodyFatPercent: d,
    leanMassIndex: s,
    bulk: o,
    fat: l,
    definition: x(1 - f * 0.25 - l * 0.3, 0.45, 1),
    shoulder: (t ? 0.9 : 1) * (0.94 + o * 0.12),
    chest: (t ? 0.92 : 1) * (0.96 + o * 0.08),
    waist: (t ? 0.84 : 0.88) + l * 0.16,
    hip: (t ? 1.12 : 0.98) * (0.98 + (o - 0.5) * 0.08 + l * 0.035),
    arm: (t ? 0.88 : 1) * (0.96 + (o - 0.5) * 0.12),
    thigh: (t ? 1.06 : 1) * (0.96 + (o - 0.5) * 0.14),
    calf: 0.96 + (o - 0.5) * 0.08,
    neck: (t ? 0.9 : 1) * (0.96 + (o - 0.5) * 0.06),
    tall: i / 178
  };
}
function j(e, t, n, i) {
  const r = Number(e);
  return !Number.isFinite(r) || r === 0 ? t : x(r, n, i);
}
function x(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
const Ce = "https://cdn.jsdelivr.net/gh/AygunAlpKagan/ecorche-body@main/models", V = new u.Color("#e83034"), Z = new u.Color("#ff9230"), Y = /* @__PURE__ */ new Map(), xe = new ke();
function fe(e) {
  return e === "female" ? "female_anatomy_mobile.glb" : "male_anatomy_mobile.glb";
}
function De({ gender: e = "male", modelUrl: t, baseUrl: n } = {}) {
  return t || (n != null ? `${String(n).replace(/\/$/, "")}/${fe(e)}` : `${Ce}/${fe(e)}`);
}
function Ie(e) {
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
    xe.parse(e.slice(0), "", t, n);
  });
}
function Le(e) {
  let t = null;
  return e.traverse((n) => {
    n.isSkinnedMesh && !t && (t = n);
  }), t;
}
function Oe(e) {
  const t = e.geometry.getAttribute("color");
  if (!t) return null;
  const n = t.count, i = new Float32Array(n * 3);
  for (let r = 0; r < n; r += 1)
    i[r * 3] = t.getX(r), i[r * 3 + 1] = t.getY(r), i[r * 3 + 2] = t.getZ(r);
  return e.geometry.setAttribute("color", new u.BufferAttribute(i.slice(), 3)), i;
}
function ue(e, t) {
  try {
    return e ? new u.Color(e) : t.clone();
  } catch {
    return t.clone();
  }
}
function Be(e, t, n, i, r = V, c = Z) {
  if (!e || !t) return;
  const d = e.geometry.getAttribute("_muscle"), l = e.geometry.getAttribute("color");
  if (!d || !l) return;
  const s = q(n), m = q(i);
  for (let o = 0; o < d.count; o += 1) {
    const f = Math.round(d.getX(o));
    if (s.has(f)) {
      l.setXYZ(o, r.r, r.g, r.b);
      continue;
    }
    if (m.has(f) && !s.has(f)) {
      l.setXYZ(o, c.r, c.g, c.b);
      continue;
    }
    l.setXYZ(o, t[o * 3], t[o * 3 + 1], t[o * 3 + 2]);
  }
  l.needsUpdate = !0;
}
function X(e, t) {
  if (!e?.skeleton) return;
  const n = Object.fromEntries(e.skeleton.bones.map((r) => [r.name, r])), i = (r, c) => {
    n[r] && n[r].rotateZ(u.MathUtils.degToRad(c));
  };
  t === "curl" && ["R", "L"].forEach((r) => i(`ForeArm_${r}`, -110)), t === "squat" && ["R", "L"].forEach((r) => {
    i(`Thigh_${r}`, -95), i(`Shin_${r}`, 115);
  });
}
function Fe(e, t) {
  if (!e) return;
  const n = e.geometry.getAttribute("position"), i = e.geometry.getAttribute("normal"), r = e.geometry.getAttribute("_muscle");
  if (!n || !i) return;
  e.userData.basePos || (e.userData.basePos = Float32Array.from(n.array));
  const c = e.userData.basePos, d = (t.definition || 0.5) * 0.012 + (t.bulk - 0.4) * 0.01, l = (t.fat || 0) * 0.016;
  for (let s = 0; s < n.count; s += 1) {
    const o = (r ? Math.round(r.getX(s)) : le) === le ? l : d + l * 0.45, f = s * 3;
    n.array[f] = c[f] + i.getX(s) * o, n.array[f + 1] = c[f + 1] + i.getY(s) * o, n.array[f + 2] = c[f + 2] + i.getZ(s) * o;
  }
  n.needsUpdate = !0, e.geometry.computeBoundingSphere();
}
function T(e, t, n) {
  const i = e[t];
  i && i.scale.set(1, n, n);
}
function be(e, t) {
  if (!e?.skeleton) return;
  const n = Object.fromEntries(e.skeleton.bones.map((r) => [r.name, r]));
  e.skeleton.pose();
  const i = t;
  ["R", "L"].forEach((r) => {
    T(n, `Clavicle_${r}`, i.shoulder), T(n, `UpperArm_${r}`, i.arm), T(n, `ForeArm_${r}`, 0.86 + i.bulk * 0.28), T(n, `Thigh_${r}`, i.thigh), T(n, `Shin_${r}`, i.calf);
  }), n.Pelvis && n.Pelvis.scale.set(1, 0.96 + (i.hip - 1) * 0.35, i.hip), n.Spine_Upper && n.Spine_Upper.scale.set(1, 0.94 + i.bulk * 0.16, 0.9 + (i.fat || 0) * 0.2), n.Spine_Lower && n.Spine_Lower.scale.set(1, 0.92 + (i.fat || 0) * 0.22, 0.9 + (i.fat || 0) * 0.2), n.Neck && n.Neck.scale.set(1, i.neck, i.neck);
}
function de(e, t, n) {
  Fe(t, n), be(t, n), e.scale.set(1, 1, 1), e.position.set(0, 0, 0), e.updateMatrixWorld(!0);
  const i = new u.Box3().setFromObject(e), c = i.getSize(new u.Vector3()).y || 1.7, l = (n.height || 175) / 100 / c;
  e.scale.set(l * (n.female ? 0.94 : 1), l, l * (n.female ? 0.96 : 1)), e.updateMatrixWorld(!0), i.setFromObject(e);
  const s = i.getCenter(new u.Vector3());
  e.position.x -= s.x, e.position.z -= s.z, e.position.y -= i.min.y, t?.material && (t.material.roughness = 0.28 + (1 - (n.definition || 0.7)) * 0.42);
}
function Pe(e, { view: t = "orbit", autoRotate: n = !1 } = {}) {
  const i = new u.WebGLRenderer({ canvas: e, antialias: !0, alpha: !0 });
  i.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)), i.outputColorSpace = u.SRGBColorSpace;
  const r = new u.Scene();
  r.add(new u.HemisphereLight(16777215, 7172992, 1.55));
  const c = new u.DirectionalLight(16777215, 2.05);
  c.position.set(2.1, 4.2, 3.1);
  const d = new u.DirectionalLight(14542847, 0.55);
  d.position.set(-2.4, 1.6, 2.2);
  const l = new u.DirectionalLight(16777215, 0.85);
  l.position.set(-3.1, 2.2, -2.4), r.add(c, d, l);
  const s = new u.PerspectiveCamera(28, 1, 0.05, 40), m = new u.OrthographicCamera(-1, 1, 1, -1, 0.05, 40), o = m.clone(), f = new u.Group();
  r.add(f);
  let b = null, p = null, A = null, S = t === "orbit" ? 0.42 : 0, y = 0, E = !1, _ = 0, N = 0, J = 0, z = n && t === "orbit", ee = t === "orbit" ? 150 : 0, h = new u.Vector3(0, 0.92, 0), C = 3.4, G = 0, D = { primary: [], secondary: [], primaryColor: V.clone(), secondaryColor: Z.clone() }, L = "rest", O = "Yükleniyor…", te = "", H = null;
  function v() {
    if (!b) return;
    const a = new u.Box3().setFromObject(f), g = a.getSize(new u.Vector3());
    h = a.getCenter(new u.Vector3()), C = Math.max(g.y * 2.7, 3.2), s.position.set(h.x, h.y + g.y * 0.02, h.z + C), s.lookAt(h);
    const k = g.y * 0.62;
    for (const M of [m, o])
      M.top = k, M.bottom = -k, M.near = 0.05, M.far = 40;
    m.position.set(h.x, h.y, h.z + C), o.position.set(h.x, h.y, h.z - C), m.lookAt(h), o.lookAt(h), o.up.set(0, 1, 0), B();
  }
  function B() {
    const a = Math.max(1, e.clientWidth || 320), g = Math.max(1, e.clientHeight || 420);
    i.setSize(a, g, !1);
    const k = a / g;
    s.aspect = k, s.updateProjectionMatrix();
    const M = t === "both" ? 2 : 1;
    for (const w of [m, o]) {
      const F = w.top * (k / M);
      w.left = -F, w.right = F, w.updateProjectionMatrix();
    }
  }
  function $() {
    Be(p, A, D.primary, D.secondary, D.primaryColor, D.secondaryColor);
  }
  async function ge({ gender: a, shape: g, modelUrl: k, baseUrl: M }) {
    H = g;
    const w = De({ gender: a, modelUrl: k, baseUrl: M });
    if (b && p && w === te) {
      de(b, p, g), X(p, L), $(), v();
      return;
    }
    const ae = G += 1;
    O = "Yükleniyor…", te = w;
    const F = await Ie(w), Me = await Te(F);
    if (ae === G) {
      if (b && (f.remove(b), b.traverse((ce) => {
        ce.isMesh && ce.material?.dispose?.();
      })), b = Me.scene, p = Le(b), !p) {
        O = "İskeletli mesh yok";
        return;
      }
      A = Oe(p), p.material = new u.MeshStandardMaterial({
        vertexColors: !0,
        roughness: 0.52,
        metalness: 0.02
      }), p.frustumCulled = !1, de(b, p, g), f.add(b), X(p, L), $(), S = t === "orbit" ? 0.42 : 0, y = 0, f.rotation.set(0, 0, 0), v(), O = "";
    }
  }
  function Se(a = [], g = [], k, M) {
    D = {
      primary: a,
      secondary: g,
      primaryColor: ue(k, V),
      secondaryColor: ue(M, Z)
    }, $();
  }
  function Ae(a = "rest") {
    L = a, p && H && be(p, H), X(p, L), v();
  }
  function ne(a) {
    t === "orbit" && (E = !0, z = !1, _ = a.clientX, N = a.clientY, e.setPointerCapture?.(a.pointerId));
  }
  function ie(a) {
    E && (S += (a.clientX - _) * 8e-3, y = Math.min(0.45, Math.max(-0.18, y + (a.clientY - N) * 4e-3)), _ = a.clientX, N = a.clientY);
  }
  function re() {
    E = !1;
  }
  e.addEventListener("pointerdown", ne), e.addEventListener("pointermove", ie), window.addEventListener("pointerup", re);
  const oe = new ResizeObserver(B);
  oe.observe(e), B();
  function se() {
    ee > 0 ? ee -= 1 : z && !E && t === "orbit" && (S += 6e-3), f.rotation.set(y, S, 0);
    const a = e.clientWidth || 1, g = e.clientHeight || 1;
    t === "both" ? (i.setScissorTest(!0), i.setViewport(0, 0, a / 2, g), i.setScissor(0, 0, a / 2, g), i.render(r, m), i.setViewport(a / 2, 0, a / 2, g), i.setScissor(a / 2, 0, a / 2, g), i.render(r, o), i.setScissorTest(!1)) : t === "back" ? i.render(r, o) : t === "front" ? i.render(r, m) : (s.position.set(
      h.x + Math.sin(0) * 0,
      h.y + C * Math.sin(y) * 0.15,
      h.z + C
    ), s.lookAt(h), i.render(r, s)), J = requestAnimationFrame(se);
  }
  return se(), {
    setFigure: ge,
    setHighlight: Se,
    setPose: Ae,
    setAutoRotate(a) {
      z = !!a && t === "orbit";
    },
    getStatus: () => O,
    resize: B,
    dispose() {
      G += 1, cancelAnimationFrame(J), e.removeEventListener("pointerdown", ne), e.removeEventListener("pointermove", ie), window.removeEventListener("pointerup", re), oe.disconnect(), i.dispose();
    }
  };
}
function he(e, {
  view: t = "orbit",
  gender: n = "male",
  height: i,
  weight: r,
  age: c,
  primary: d = [],
  secondary: l = [],
  primaryColor: s,
  secondaryColor: m,
  autoRotate: o = !1,
  pose: f = "rest",
  modelUrl: b,
  baseUrl: p
}) {
  const A = W(null), S = Re({ gender: n, height: i, weight: r, age: c });
  I(() => {
    const y = e.current;
    if (!y) return;
    const E = Pe(y, { view: t, autoRotate: o });
    return A.current = E, () => {
      E.dispose(), A.current = null;
    };
  }, [t]), I(() => {
    A.current?.setAutoRotate(o);
  }, [o]), I(() => {
    A.current?.setFigure({ gender: n, shape: S, modelUrl: b, baseUrl: p });
  }, [n, S.height, S.weight, S.bmi, S.bulk, S.definition, S.fat, b, p]), I(() => {
    A.current?.setHighlight(d, l, s, m);
  }, [d, l, s, m]), I(() => {
    A.current?.setPose(f);
  }, [f]);
}
function je({
  gender: e = "male",
  height: t,
  weight: n,
  age: i,
  primary: r = [],
  secondary: c = [],
  primaryColor: d,
  secondaryColor: l,
  view: s = "both",
  pose: m = "rest",
  modelUrl: o,
  baseUrl: f,
  credit: b = !1,
  className: p = ""
}) {
  const A = W(null), S = s === "back" || s === "front" ? s : "both";
  return he(A, {
    view: S,
    gender: e,
    height: t,
    weight: n,
    age: i,
    primary: r,
    secondary: c,
    primaryColor: d,
    secondaryColor: l,
    autoRotate: !1,
    pose: m,
    modelUrl: o,
    baseUrl: f
  }), /* @__PURE__ */ P("div", { className: `ecorche-2d ${S === "both" ? "sheet" : ""} ${p}`.trim(), children: [
    /* @__PURE__ */ P("div", { className: "ecorche-2d-stage", children: [
      /* @__PURE__ */ R("canvas", { ref: A, "aria-label": "2D anatomy figure" }),
      S === "both" && /* @__PURE__ */ P("div", { className: "ecorche-captions", children: [
        /* @__PURE__ */ R("span", { children: "Ön" }),
        /* @__PURE__ */ R("span", { children: "Arka" })
      ] })
    ] }),
    b && /* @__PURE__ */ R("p", { className: "ecorche-credit", children: me })
  ] });
}
function Ye({
  gender: e = "male",
  height: t,
  weight: n,
  age: i,
  primary: r = [],
  secondary: c = [],
  primaryColor: d,
  secondaryColor: l,
  autoRotate: s = !0,
  pose: m = "rest",
  modelUrl: o,
  baseUrl: f,
  credit: b = !1,
  className: p = ""
}) {
  const A = W(null);
  return he(A, {
    view: "orbit",
    gender: e,
    height: t,
    weight: n,
    age: i,
    primary: r,
    secondary: c,
    primaryColor: d,
    secondaryColor: l,
    autoRotate: s,
    pose: m,
    modelUrl: o,
    baseUrl: f
  }), /* @__PURE__ */ P("div", { className: `ecorche-3d ${p}`.trim(), children: [
    /* @__PURE__ */ R("canvas", { ref: A, "aria-label": "3D anatomy figure" }),
    /* @__PURE__ */ R("p", { className: "ecorche-hint", children: "Sürükle, dön." }),
    b && /* @__PURE__ */ R("p", { className: "ecorche-credit", children: me })
  ] });
}
export {
  Ee as ALIASES,
  je as Body2D,
  Ye as Body3D,
  me as CREDITS,
  pe as GROUPS,
  ze as GROUP_NAMES,
  K as MUSCLES,
  He as MUSCLE_COLORS,
  Ge as MUSCLE_IDS,
  Re as bodyShape,
  ve as latin,
  fe as modelFile,
  De as resolveModelUrl,
  $e as roleOf,
  q as vertexIds
};
