import { jsxs as P, jsx as R } from "react/jsx-runtime";
import { useRef as V, useEffect as x } from "react";
import * as u from "three";
import { GLTFLoader as Se } from "three/examples/jsm/loaders/GLTFLoader.js";
const Ae = { Quadriceps: [426, 427, 428, 430, 431, 432], "Gluteus Maximus": [406, 410], "Gluteus Medius": [405, 408, 409, 412], Hamstrings: [450, 452, 454, 455, 456, 457], Adductors: [436, 437, 438, 441, 443, 444, 445, 448], "Adductor Magnus": [436, 443], Calves: [472, 473, 475, 476, 478, 479], Gastrocnemius: [472, 473, 475, 476], Soleus: [478, 479], "Tibialis Anterior": [462, 465], "Pectoralis Major": [225, 226, 227, 228, 229, 230], "Upper Chest": [225, 228], "Front Deltoid": [280, 283], "Side Deltoid": [279, 282], "Rear Deltoid": [281, 284], Deltoids: [279, 280, 281, 282, 283, 284], Biceps: [295, 296, 297, 298], Brachialis: [299, 301], Brachioradialis: [337, 342], Triceps: [304, 305, 307, 308], "Forearm Flexors": [313, 315, 319, 320, 321, 322], "Forearm Extensors": [331, 332, 334, 336, 338, 339, 343, 344], "Latissimus Dorsi": [216, 222, 293, 294], Trapezius: [203, 204, 205, 206, 207, 208], "Upper Trapezius": [204, 207], "Middle Trapezius": [203, 205, 206, 208], Infraspinatus: [287, 288, 291, 292], "Erector Spinae": [163, 166, 169, 170], "Rectus Abdominis": [252, 253], Obliques: [256, 257], "Serratus Anterior": [238, 245], "Hip Flexors": [408, 412, 426, 430, 434, 435], Sternocleidomastoid: [86, 87] }, Me = 881, Z = {
  groups: Ae,
  skin_id: Me
}, fe = Z.groups, ze = Object.keys(Z.groups), X = Z.skin_id, ke = {
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
}, W = [
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
], He = W.map((e) => e.id), ae = {
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
}, ue = "Anatomik kas haritası: Z-Anatomy / BodyParts3D, CC BY-SA 4.0. Gövde: MakeHuman, CC0.";
function Ge(e) {
  return W.find((t) => t.id === e)?.latin || String(e).toUpperCase();
}
function ve(e, t = [], i = []) {
  return t.includes(e) ? "primary" : i.includes(e) ? "secondary" : "idle";
}
function q(e = []) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e) {
    if (!i) continue;
    const o = ke[i] || [i];
    for (const s of o) {
      const a = fe[s];
      if (a) for (const l of a) t.add(l);
    }
  }
  return t;
}
const I = /* @__PURE__ */ new Map();
for (const e of W)
  for (const t of q([e.id]))
    I.has(t) || I.set(t, e.id);
for (const [e, t] of Object.entries(fe))
  for (const i of t)
    I.has(i) || I.set(i, e);
function ye(e) {
  return I.get(e) || null;
}
function we(e = {}) {
  const t = e.gender === "female", i = Number(e.weight) || (t ? 62 : 78), o = Number(e.height) || (t ? 165 : 178), s = Number(e.age) || 28, a = i / (o / 100) ** 2, l = U((a - 16.5) / 16, 0.08, 1), b = U((s - 24) / 55, 0, 0.7), r = U((a - 21) / 14, 0, 1);
  return {
    female: t,
    weight: i,
    height: o,
    age: s,
    bmi: a,
    bulk: l,
    fat: r,
    definition: U(1 - b * 0.55 - r * 0.5, 0.22, 1),
    shoulder: (t ? 0.86 : 1) * (0.82 + l * 0.36),
    chest: (t ? 0.88 : 1) * (0.8 + l * 0.4),
    waist: (t ? 0.82 : 0.88) + r * 0.28 + l * 0.08,
    hip: (t ? 1.16 : 0.96) * (0.88 + l * 0.28 + r * 0.08),
    arm: (t ? 0.84 : 1) * (0.78 + l * 0.44),
    thigh: (t ? 1.08 : 1) * (0.78 + l * 0.46),
    calf: 0.78 + l * 0.36,
    neck: (t ? 0.86 : 1) * (0.88 + l * 0.18),
    tall: o / 178
  };
}
function U(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
const Ee = "https://cdn.jsdelivr.net/gh/AygunAlpKagan/ecorche-body@main/models", Re = new u.Color("#e83034"), Ce = new u.Color("#ff9230"), j = /* @__PURE__ */ new Map(), xe = new Se();
function ce(e) {
  return e === "female" ? "female_anatomy_mobile.glb" : "male_anatomy_mobile.glb";
}
function De({ gender: e = "male", modelUrl: t, baseUrl: i } = {}) {
  return t || (i != null ? `${String(i).replace(/\/$/, "")}/${ce(e)}` : `${Ee}/${ce(e)}`);
}
function Ie(e) {
  return j.has(e) || j.set(
    e,
    fetch(e).then((t) => {
      if (!t.ok) throw new Error(`Model yüklenemedi (${t.status}): ${e}`);
      return t.arrayBuffer();
    })
  ), j.get(e);
}
function Te(e) {
  return new Promise((t, i) => {
    xe.parse(e.slice(0), "", t, i);
  });
}
function Le(e) {
  let t = null;
  return e.traverse((i) => {
    i.isSkinnedMesh && !t && (t = i);
  }), t;
}
function Oe(e) {
  const t = e.geometry.getAttribute("color");
  if (!t) return null;
  const i = t.count, o = new Float32Array(i * 3);
  for (let s = 0; s < i; s += 1)
    o[s * 3] = t.getX(s), o[s * 3 + 1] = t.getY(s), o[s * 3 + 2] = t.getZ(s);
  return e.geometry.setAttribute("color", new u.BufferAttribute(o.slice(), 3)), o;
}
function Be(e, t, i, o) {
  if (!e || !t) return;
  const s = e.geometry.getAttribute("_muscle"), a = e.geometry.getAttribute("color");
  if (!s || !a) return;
  const l = q(i), b = q(o), r = new u.Color(), m = new u.Color("#c2786e");
  for (let c = 0; c < s.count; c += 1) {
    const f = Math.round(s.getX(c));
    if (f === X) {
      a.setXYZ(c, t[c * 3], t[c * 3 + 1], t[c * 3 + 2]);
      continue;
    }
    const d = ye(f);
    d && ae[d] ? r.set(ae[d]) : r.copy(m), l.has(f) ? r.offsetHSL(0, 0.12, 0.16) : b.has(f) ? r.offsetHSL(0, 0.06, 0.08) : r.offsetHSL(0, -0.04, -0.08), a.setXYZ(c, r.r, r.g, r.b);
  }
  a.needsUpdate = !0;
}
function Y(e, t) {
  if (!e?.skeleton) return;
  const i = Object.fromEntries(e.skeleton.bones.map((s) => [s.name, s])), o = (s, a) => {
    i[s] && i[s].rotateZ(u.MathUtils.degToRad(a));
  };
  t === "curl" && ["R", "L"].forEach((s) => o(`ForeArm_${s}`, -110)), t === "squat" && ["R", "L"].forEach((s) => {
    o(`Thigh_${s}`, -95), o(`Shin_${s}`, 115);
  });
}
function Ue(e, t) {
  if (!e) return;
  const i = e.geometry.getAttribute("position"), o = e.geometry.getAttribute("normal"), s = e.geometry.getAttribute("_muscle");
  if (!i || !o) return;
  e.userData.basePos || (e.userData.basePos = Float32Array.from(i.array));
  const a = e.userData.basePos, l = (t.definition || 0.5) * 0.012 + (t.bulk - 0.4) * 0.01, b = (t.fat || 0) * 0.016;
  for (let r = 0; r < i.count; r += 1) {
    const c = (s ? Math.round(s.getX(r)) : X) === X ? b : l + b * 0.45, f = r * 3;
    i.array[f] = a[f] + o.getX(r) * c, i.array[f + 1] = a[f + 1] + o.getY(r) * c, i.array[f + 2] = a[f + 2] + o.getZ(r) * c;
  }
  i.needsUpdate = !0, e.geometry.computeBoundingSphere();
}
function D(e, t, i) {
  const o = e[t];
  o && o.scale.set(1, i, i);
}
function de(e, t) {
  if (!e?.skeleton) return;
  const i = Object.fromEntries(e.skeleton.bones.map((s) => [s.name, s]));
  e.skeleton.pose();
  const o = t;
  ["R", "L"].forEach((s) => {
    D(i, `Clavicle_${s}`, o.shoulder), D(i, `UpperArm_${s}`, o.arm), D(i, `ForeArm_${s}`, 0.86 + o.bulk * 0.28), D(i, `Thigh_${s}`, o.thigh), D(i, `Shin_${s}`, o.calf);
  }), i.Pelvis && i.Pelvis.scale.set(1, 0.96 + (o.hip - 1) * 0.35, o.hip), i.Spine_Upper && i.Spine_Upper.scale.set(1, 0.94 + o.bulk * 0.16, 0.9 + (o.fat || 0) * 0.2), i.Spine_Lower && i.Spine_Lower.scale.set(1, 0.92 + (o.fat || 0) * 0.22, 0.9 + (o.fat || 0) * 0.2), i.Neck && i.Neck.scale.set(1, o.neck, o.neck);
}
function le(e, t, i) {
  Ue(t, i), de(t, i), e.scale.set(1, 1, 1), e.position.set(0, 0, 0), e.updateMatrixWorld(!0);
  const o = new u.Box3().setFromObject(e), a = o.getSize(new u.Vector3()).y || 1.7, b = (i.height || 175) / 100 / a, r = b * (0.74 + i.bulk * 0.46 + (i.fat || 0) * 0.08);
  e.scale.set(r * (i.female ? 0.94 : 1), b, r * (i.female ? 0.96 : 1)), e.updateMatrixWorld(!0), o.setFromObject(e);
  const m = o.getCenter(new u.Vector3());
  e.position.x -= m.x, e.position.z -= m.z, e.position.y -= o.min.y, t?.material && (t.material.roughness = 0.28 + (1 - (i.definition || 0.7)) * 0.42);
}
function Pe(e, { view: t = "orbit", autoRotate: i = !1 } = {}) {
  const o = new u.WebGLRenderer({ canvas: e, antialias: !0, alpha: !0 });
  o.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)), o.outputColorSpace = u.SRGBColorSpace;
  const s = new u.Scene();
  s.add(new u.HemisphereLight(16777215, 7172992, 1.55));
  const a = new u.DirectionalLight(16777215, 2.05);
  a.position.set(2.1, 4.2, 3.1);
  const l = new u.DirectionalLight(14542847, 0.55);
  l.position.set(-2.4, 1.6, 2.2);
  const b = new u.DirectionalLight(16777215, 0.85);
  b.position.set(-3.1, 2.2, -2.4), s.add(a, l, b);
  const r = new u.PerspectiveCamera(28, 1, 0.05, 40), m = new u.OrthographicCamera(-1, 1, 1, -1, 0.05, 40), c = m.clone(), f = new u.Group();
  s.add(f);
  let d = null, p = null, A = null, S = t === "orbit" ? 0.42 : 0, M = 0, w = !1, F = 0, _ = 0, Q = 0, N = i && t === "orbit", K = t === "orbit" ? 150 : 0, h = new u.Vector3(0, 0.92, 0), C = 3.4, z = 0, H = { primary: [], secondary: [], primaryColor: Re.clone(), secondaryColor: Ce.clone() }, T = "rest", L = "Yükleniyor…", J = "", G = null;
  function v() {
    if (!d) return;
    const n = new u.Box3().setFromObject(f), g = n.getSize(new u.Vector3());
    h = n.getCenter(new u.Vector3()), C = Math.max(g.y * 2.7, 3.2), r.position.set(h.x, h.y + g.y * 0.02, h.z + C), r.lookAt(h);
    const E = g.y * 0.62;
    for (const k of [m, c])
      k.top = E, k.bottom = -E, k.near = 0.05, k.far = 40;
    m.position.set(h.x, h.y, h.z + C), c.position.set(h.x, h.y, h.z - C), m.lookAt(h), c.lookAt(h), c.up.set(0, 1, 0), O();
  }
  function O() {
    const n = Math.max(1, e.clientWidth || 320), g = Math.max(1, e.clientHeight || 420);
    o.setSize(n, g, !1);
    const E = n / g;
    r.aspect = E, r.updateProjectionMatrix();
    const k = t === "both" ? 2 : 1;
    for (const y of [m, c]) {
      const B = y.top * (E / k);
      y.left = -B, y.right = B, y.updateProjectionMatrix();
    }
  }
  function $() {
    Be(p, A, H.primary, H.secondary);
  }
  async function me({ gender: n, shape: g, modelUrl: E, baseUrl: k }) {
    G = g;
    const y = De({ gender: n, modelUrl: E, baseUrl: k });
    if (d && p && y === J) {
      le(d, p, g), Y(p, T), $(), v();
      return;
    }
    const re = z += 1;
    L = "Yükleniyor…", J = y;
    const B = await Ie(y), ge = await Te(B);
    if (re === z) {
      if (d && (f.remove(d), d.traverse((ne) => {
        ne.isMesh && ne.material?.dispose?.();
      })), d = ge.scene, p = Le(d), !p) {
        L = "İskeletli mesh yok";
        return;
      }
      A = Oe(p), p.material = new u.MeshStandardMaterial({
        vertexColors: !0,
        roughness: 0.52,
        metalness: 0.02
      }), p.frustumCulled = !1, le(d, p, g), f.add(d), Y(p, T), $(), S = t === "orbit" ? 0.42 : 0, M = 0, f.rotation.set(0, 0, 0), v(), L = "";
    }
  }
  function be(n = [], g = []) {
    H = { primary: n, secondary: g }, $();
  }
  function he(n = "rest") {
    T = n, p && G && de(p, G), Y(p, T), v();
  }
  function ee(n) {
    t === "orbit" && (w = !0, N = !1, F = n.clientX, _ = n.clientY, e.setPointerCapture?.(n.pointerId));
  }
  function te(n) {
    w && (S += (n.clientX - F) * 8e-3, M = Math.min(0.45, Math.max(-0.18, M + (n.clientY - _) * 4e-3)), F = n.clientX, _ = n.clientY);
  }
  function ie() {
    w = !1;
  }
  e.addEventListener("pointerdown", ee), e.addEventListener("pointermove", te), window.addEventListener("pointerup", ie);
  const oe = new ResizeObserver(O);
  oe.observe(e), O();
  function se() {
    K > 0 ? K -= 1 : N && !w && t === "orbit" && (S += 6e-3), f.rotation.set(M, S, 0);
    const n = e.clientWidth || 1, g = e.clientHeight || 1;
    t === "both" ? (o.setScissorTest(!0), o.setViewport(0, 0, n / 2, g), o.setScissor(0, 0, n / 2, g), o.render(s, m), o.setViewport(n / 2, 0, n / 2, g), o.setScissor(n / 2, 0, n / 2, g), o.render(s, c), o.setScissorTest(!1)) : t === "back" ? o.render(s, c) : t === "front" ? o.render(s, m) : (r.position.set(
      h.x + Math.sin(0) * 0,
      h.y + C * Math.sin(M) * 0.15,
      h.z + C
    ), r.lookAt(h), o.render(s, r)), Q = requestAnimationFrame(se);
  }
  return se(), {
    setFigure: me,
    setHighlight: be,
    setPose: he,
    setAutoRotate(n) {
      N = !!n && t === "orbit";
    },
    getStatus: () => L,
    resize: O,
    dispose() {
      z += 1, cancelAnimationFrame(Q), e.removeEventListener("pointerdown", ee), e.removeEventListener("pointermove", te), window.removeEventListener("pointerup", ie), oe.disconnect(), o.dispose();
    }
  };
}
function pe(e, {
  view: t = "orbit",
  gender: i = "male",
  height: o,
  weight: s,
  age: a,
  primary: l = [],
  secondary: b = [],
  primaryColor: r,
  secondaryColor: m,
  autoRotate: c = !1,
  pose: f = "rest",
  modelUrl: d,
  baseUrl: p
}) {
  const A = V(null), S = we({ gender: i, height: o, weight: s, age: a });
  x(() => {
    const M = e.current;
    if (!M) return;
    const w = Pe(M, { view: t, autoRotate: c });
    return A.current = w, () => {
      w.dispose(), A.current = null;
    };
  }, [t]), x(() => {
    A.current?.setAutoRotate(c);
  }, [c]), x(() => {
    A.current?.setFigure({ gender: i, shape: S, modelUrl: d, baseUrl: p });
  }, [i, S.height, S.weight, S.bmi, S.bulk, S.definition, S.fat, d, p]), x(() => {
    A.current?.setHighlight(l, b, r, m);
  }, [l, b, r, m]), x(() => {
    A.current?.setPose(f);
  }, [f]);
}
function $e({
  gender: e = "male",
  height: t,
  weight: i,
  age: o,
  primary: s = [],
  secondary: a = [],
  primaryColor: l,
  secondaryColor: b,
  view: r = "both",
  pose: m = "rest",
  modelUrl: c,
  baseUrl: f,
  credit: d = !1,
  className: p = ""
}) {
  const A = V(null), S = r === "back" || r === "front" ? r : "both";
  return pe(A, {
    view: S,
    gender: e,
    height: t,
    weight: i,
    age: o,
    primary: s,
    secondary: a,
    primaryColor: l,
    secondaryColor: b,
    autoRotate: !1,
    pose: m,
    modelUrl: c,
    baseUrl: f
  }), /* @__PURE__ */ P("div", { className: `ecorche-2d ${S === "both" ? "sheet" : ""} ${p}`.trim(), children: [
    /* @__PURE__ */ P("div", { className: "ecorche-2d-stage", children: [
      /* @__PURE__ */ R("canvas", { ref: A, "aria-label": "2D anatomy figure" }),
      S === "both" && /* @__PURE__ */ P("div", { className: "ecorche-captions", children: [
        /* @__PURE__ */ R("span", { children: "Ön" }),
        /* @__PURE__ */ R("span", { children: "Arka" })
      ] })
    ] }),
    d && /* @__PURE__ */ R("p", { className: "ecorche-credit", children: ue })
  ] });
}
function je({
  gender: e = "male",
  height: t,
  weight: i,
  age: o,
  primary: s = [],
  secondary: a = [],
  primaryColor: l,
  secondaryColor: b,
  autoRotate: r = !0,
  pose: m = "rest",
  modelUrl: c,
  baseUrl: f,
  credit: d = !1,
  className: p = ""
}) {
  const A = V(null);
  return pe(A, {
    view: "orbit",
    gender: e,
    height: t,
    weight: i,
    age: o,
    primary: s,
    secondary: a,
    primaryColor: l,
    secondaryColor: b,
    autoRotate: r,
    pose: m,
    modelUrl: c,
    baseUrl: f
  }), /* @__PURE__ */ P("div", { className: `ecorche-3d ${p}`.trim(), children: [
    /* @__PURE__ */ R("canvas", { ref: A, "aria-label": "3D anatomy figure" }),
    /* @__PURE__ */ R("p", { className: "ecorche-hint", children: "Sürükle, dön." }),
    d && /* @__PURE__ */ R("p", { className: "ecorche-credit", children: ue })
  ] });
}
export {
  ke as ALIASES,
  $e as Body2D,
  je as Body3D,
  ue as CREDITS,
  fe as GROUPS,
  ze as GROUP_NAMES,
  W as MUSCLES,
  ae as MUSCLE_COLORS,
  He as MUSCLE_IDS,
  we as bodyShape,
  Ge as latin,
  ce as modelFile,
  De as resolveModelUrl,
  ve as roleOf,
  q as vertexIds
};
