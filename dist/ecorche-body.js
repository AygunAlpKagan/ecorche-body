import { jsxs as B, jsx as x } from "react/jsx-runtime";
import { useRef as v, useEffect as I } from "react";
import * as c from "three";
import { GLTFLoader as de } from "three/examples/jsm/loaders/GLTFLoader.js";
const fe = { Quadriceps: [426, 427, 428, 430, 431, 432], "Gluteus Maximus": [406, 410], "Gluteus Medius": [405, 408, 409, 412], Hamstrings: [450, 452, 454, 455, 456, 457], Adductors: [436, 437, 438, 441, 443, 444, 445, 448], "Adductor Magnus": [436, 443], Calves: [472, 473, 475, 476, 478, 479], Gastrocnemius: [472, 473, 475, 476], Soleus: [478, 479], "Tibialis Anterior": [462, 465], "Pectoralis Major": [225, 226, 227, 228, 229, 230], "Upper Chest": [225, 228], "Front Deltoid": [280, 283], "Side Deltoid": [279, 282], "Rear Deltoid": [281, 284], Deltoids: [279, 280, 281, 282, 283, 284], Biceps: [295, 296, 297, 298], Brachialis: [299, 301], Brachioradialis: [337, 342], Triceps: [304, 305, 307, 308], "Forearm Flexors": [313, 315, 319, 320, 321, 322], "Forearm Extensors": [331, 332, 334, 336, 338, 339, 343, 344], "Latissimus Dorsi": [216, 222, 293, 294], Trapezius: [203, 204, 205, 206, 207, 208], "Upper Trapezius": [204, 207], "Middle Trapezius": [203, 205, 206, 208], Infraspinatus: [287, 288, 291, 292], "Erector Spinae": [163, 166, 169, 170], "Rectus Abdominis": [252, 253], Obliques: [256, 257], "Serratus Anterior": [238, 245], "Hip Flexors": [408, 412, 426, 430, 434, 435], Sternocleidomastoid: [86, 87] }, ne = {
  groups: fe
}, he = ne.groups, Te = Object.keys(ne.groups), me = {
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
}, oe = [
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
], Oe = oe.map((e) => e.id), re = "Anatomik kas haritası: Z-Anatomy / BodyParts3D, CC BY-SA 4.0. Gövde: MakeHuman, CC0.";
function Le(e) {
  return oe.find((t) => t.id === e)?.latin || String(e).toUpperCase();
}
function Be(e, t = [], o = []) {
  return t.includes(e) ? "primary" : o.includes(e) ? "secondary" : "idle";
}
function K(e = []) {
  const t = /* @__PURE__ */ new Set();
  for (const o of e) {
    if (!o) continue;
    const i = me[o] || [o];
    for (const n of i) {
      const l = he[n];
      if (l) for (const s of l) t.add(s);
    }
  }
  return t;
}
function pe(e = {}) {
  const t = e.gender === "female", o = Number(e.weight) || (t ? 62 : 78), i = Number(e.height) || (t ? 165 : 178), n = Number(e.age) || 28, l = o / (i / 100) ** 2, s = ee((l - 17) / 14, 0.18, 1), d = ee((n - 30) / 85, 0, 0.42);
  return {
    female: t,
    weight: o,
    height: i,
    age: n,
    bmi: l,
    bulk: s,
    definition: Math.max(0.38, 1 - d - Math.max(0, l - 27) * 0.045),
    shoulder: (t ? 0.9 : 1) * (0.94 + s * 0.14),
    chest: (t ? 0.92 : 1) * (0.94 + s * 0.16),
    waist: t ? 0.86 + s * 0.08 : 0.92 + s * 0.12,
    hip: (t ? 1.12 : 0.98) * (0.96 + s * 0.1),
    arm: (t ? 0.9 : 1) * (0.9 + s * 0.22),
    thigh: (t ? 1.05 : 1) * (0.92 + s * 0.18),
    calf: 0.88 + s * 0.16,
    neck: (t ? 0.88 : 1) * (0.94 + s * 0.08),
    tall: i / 178
  };
}
function ee(e, t, o) {
  return Math.min(o, Math.max(t, e));
}
const be = "https://cdn.jsdelivr.net/gh/AygunAlpKagan/ecorche-body@main/models", ge = new c.Color("#e83034"), Se = new c.Color("#ff9230"), G = /* @__PURE__ */ new Map(), Me = new de();
function te(e) {
  return e === "female" ? "female_anatomy_mobile.glb" : "male_anatomy_mobile.glb";
}
function Ae({ gender: e = "male", modelUrl: t, baseUrl: o } = {}) {
  return t || (o != null ? `${String(o).replace(/\/$/, "")}/${te(e)}` : `${be}/${te(e)}`);
}
function we(e) {
  return G.has(e) || G.set(
    e,
    fetch(e).then((t) => {
      if (!t.ok) throw new Error(`Model yüklenemedi (${t.status}): ${e}`);
      return t.arrayBuffer();
    })
  ), G.get(e);
}
function ke(e) {
  return new Promise((t, o) => {
    Me.parse(e.slice(0), "", t, o);
  });
}
function ye(e) {
  let t = null;
  return e.traverse((o) => {
    o.isSkinnedMesh && !t && (t = o);
  }), t;
}
function Re(e) {
  const t = e.geometry.getAttribute("color");
  if (!t) return null;
  const o = t.count, i = new Float32Array(o * 3);
  for (let n = 0; n < o; n += 1)
    i[n * 3] = t.getX(n), i[n * 3 + 1] = t.getY(n), i[n * 3 + 2] = t.getZ(n);
  return e.geometry.setAttribute("color", new c.BufferAttribute(i.slice(), 3)), i;
}
function xe(e, t, o, i, n, l) {
  if (!e || !t) return;
  const s = e.geometry.getAttribute("_muscle"), d = e.geometry.getAttribute("color");
  if (!s || !d) return;
  const u = K(o), f = K(i);
  for (let a = 0; a < s.count; a += 1) {
    const b = Math.round(s.getX(a));
    u.has(b) ? d.setXYZ(a, n.r, n.g, n.b) : f.has(b) ? d.setXYZ(a, l.r, l.g, l.b) : d.setXYZ(a, t[a * 3], t[a * 3 + 1], t[a * 3 + 2]);
  }
  d.needsUpdate = !0;
}
function H(e, t) {
  if (!e?.skeleton) return;
  const o = Object.fromEntries(e.skeleton.bones.map((n) => [n.name, n]));
  e.skeleton.pose();
  const i = (n, l) => {
    o[n] && o[n].rotateZ(c.MathUtils.degToRad(l));
  };
  t === "curl" && ["R", "L"].forEach((n) => i(`ForeArm_${n}`, -110)), t === "squat" && ["R", "L"].forEach((n) => {
    i(`Thigh_${n}`, -95), i(`Shin_${n}`, 115);
  });
}
function ie(e, t, o) {
  e.scale.set(1, 1, 1), e.position.set(0, 0, 0), e.updateMatrixWorld(!0);
  const i = new c.Box3().setFromObject(e), l = i.getSize(new c.Vector3()).y || 1.7, d = (o.height || 175) / 100 / l, u = d * (0.86 + o.bulk * 0.28);
  e.scale.set(u, d, u), e.updateMatrixWorld(!0), i.setFromObject(e);
  const f = i.getCenter(new c.Vector3());
  e.position.x -= f.x, e.position.z -= f.z, e.position.y -= i.min.y, t?.material && (t.material.roughness = 0.38 + (1 - (o.definition || 0.7)) * 0.32);
}
function Ce(e, { view: t = "orbit", autoRotate: o = !1 } = {}) {
  const i = new c.WebGLRenderer({ canvas: e, antialias: !0, alpha: !0 });
  i.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)), i.outputColorSpace = c.SRGBColorSpace;
  const n = new c.Scene();
  n.add(new c.HemisphereLight(16777215, 7172992, 1.55));
  const l = new c.DirectionalLight(16777215, 2.05);
  l.position.set(2.1, 4.2, 3.1);
  const s = new c.DirectionalLight(14542847, 0.55);
  s.position.set(-2.4, 1.6, 2.2);
  const d = new c.DirectionalLight(16777215, 0.85);
  d.position.set(-3.1, 2.2, -2.4), n.add(l, s, d);
  const u = new c.PerspectiveCamera(28, 1, 0.05, 40), f = new c.OrthographicCamera(-1, 1, 1, -1, 0.05, 40), a = f.clone(), b = new c.Group();
  n.add(b);
  let m = null, h = null, S = null, M = t === "orbit" ? 0.42 : 0, k = 0, R = !1, P = 0, U = 0, Y = 0, F = o && t === "orbit", $ = t === "orbit" ? 150 : 0, p = new c.Vector3(0, 0.92, 0), C = 3.4, z = 0, E = { primary: [], secondary: [], primaryColor: ge.clone(), secondaryColor: Se.clone() }, D = "rest", T = "Yükleniyor…", j = "";
  function N() {
    if (!m) return;
    const r = new c.Box3().setFromObject(b), g = r.getSize(new c.Vector3());
    p = r.getCenter(new c.Vector3()), C = Math.max(g.y * 2.7, 3.2), u.position.set(p.x, p.y + g.y * 0.02, p.z + C), u.lookAt(p);
    const w = g.y * 0.62;
    for (const A of [f, a])
      A.top = w, A.bottom = -w, A.near = 0.05, A.far = 40;
    f.position.set(p.x, p.y, p.z + C), a.position.set(p.x, p.y, p.z - C), f.lookAt(p), a.lookAt(p), a.up.set(0, 1, 0), O();
  }
  function O() {
    const r = Math.max(1, e.clientWidth || 320), g = Math.max(1, e.clientHeight || 420);
    i.setSize(r, g, !1);
    const w = r / g;
    u.aspect = w, u.updateProjectionMatrix();
    const A = t === "both" ? 2 : 1;
    for (const y of [f, a]) {
      const L = y.top * (w / A);
      y.left = -L, y.right = L, y.updateProjectionMatrix();
    }
  }
  function X() {
    xe(h, S, E.primary, E.secondary, E.primaryColor, E.secondaryColor);
  }
  async function ae({ gender: r, shape: g, modelUrl: w, baseUrl: A }) {
    const y = Ae({ gender: r, modelUrl: w, baseUrl: A });
    if (m && h && y === j) {
      ie(m, h, g), H(h, D), N();
      return;
    }
    const Q = z += 1;
    T = "Yükleniyor…", j = y;
    const L = await we(y), ue = await ke(L);
    if (Q === z) {
      if (m && (b.remove(m), m.traverse((J) => {
        J.isMesh && J.material?.dispose?.();
      })), m = ue.scene, h = ye(m), !h) {
        T = "İskeletli mesh yok";
        return;
      }
      S = Re(h), h.material = new c.MeshStandardMaterial({
        vertexColors: !0,
        roughness: 0.52,
        metalness: 0.02
      }), h.frustumCulled = !1, ie(m, h, g), b.add(m), H(h, D), X(), M = t === "orbit" ? 0.42 : 0, k = 0, b.rotation.set(0, 0, 0), N(), T = "";
    }
  }
  function ce(r = [], g = [], w, A) {
    E = {
      primary: r,
      secondary: g,
      primaryColor: new c.Color(w || "#e83034"),
      secondaryColor: new c.Color(A || "#ff9230")
    }, X();
  }
  function le(r = "rest") {
    D = r, H(h, D), N();
  }
  function _(r) {
    t === "orbit" && (R = !0, F = !1, P = r.clientX, U = r.clientY, e.setPointerCapture?.(r.pointerId));
  }
  function V(r) {
    R && (M += (r.clientX - P) * 8e-3, k = Math.min(0.45, Math.max(-0.18, k + (r.clientY - U) * 4e-3)), P = r.clientX, U = r.clientY);
  }
  function q() {
    R = !1;
  }
  e.addEventListener("pointerdown", _), e.addEventListener("pointermove", V), window.addEventListener("pointerup", q);
  const Z = new ResizeObserver(O);
  Z.observe(e), O();
  function W() {
    $ > 0 ? $ -= 1 : F && !R && t === "orbit" && (M += 6e-3), b.rotation.set(k, M, 0);
    const r = e.clientWidth || 1, g = e.clientHeight || 1;
    t === "both" ? (i.setScissorTest(!0), i.setViewport(0, 0, r / 2, g), i.setScissor(0, 0, r / 2, g), i.render(n, f), i.setViewport(r / 2, 0, r / 2, g), i.setScissor(r / 2, 0, r / 2, g), i.render(n, a), i.setScissorTest(!1)) : t === "back" ? i.render(n, a) : t === "front" ? i.render(n, f) : (u.position.set(
      p.x + Math.sin(0) * 0,
      p.y + C * Math.sin(k) * 0.15,
      p.z + C
    ), u.lookAt(p), i.render(n, u)), Y = requestAnimationFrame(W);
  }
  return W(), {
    setFigure: ae,
    setHighlight: ce,
    setPose: le,
    setAutoRotate(r) {
      F = !!r && t === "orbit";
    },
    getStatus: () => T,
    resize: O,
    dispose() {
      z += 1, cancelAnimationFrame(Y), e.removeEventListener("pointerdown", _), e.removeEventListener("pointermove", V), window.removeEventListener("pointerup", q), Z.disconnect(), i.dispose();
    }
  };
}
function se(e, {
  view: t = "orbit",
  gender: o = "male",
  height: i,
  weight: n,
  age: l,
  primary: s = [],
  secondary: d = [],
  primaryColor: u,
  secondaryColor: f,
  autoRotate: a = !1,
  pose: b = "rest",
  modelUrl: m,
  baseUrl: h
}) {
  const S = v(null), M = pe({ gender: o, height: i, weight: n, age: l });
  I(() => {
    const k = e.current;
    if (!k) return;
    const R = Ce(k, { view: t, autoRotate: a });
    return S.current = R, () => {
      R.dispose(), S.current = null;
    };
  }, [t]), I(() => {
    S.current?.setAutoRotate(a);
  }, [a]), I(() => {
    S.current?.setFigure({ gender: o, shape: M, modelUrl: m, baseUrl: h });
  }, [o, M.height, M.weight, M.bulk, m, h]), I(() => {
    S.current?.setHighlight(s, d, u, f);
  }, [s, d, u, f]), I(() => {
    S.current?.setPose(b);
  }, [b]);
}
function Pe({
  gender: e = "male",
  height: t,
  weight: o,
  age: i,
  primary: n = [],
  secondary: l = [],
  primaryColor: s,
  secondaryColor: d,
  view: u = "both",
  pose: f = "rest",
  modelUrl: a,
  baseUrl: b,
  credit: m = !0,
  className: h = ""
}) {
  const S = v(null), M = u === "back" || u === "front" ? u : "both";
  return se(S, {
    view: M,
    gender: e,
    height: t,
    weight: o,
    age: i,
    primary: n,
    secondary: l,
    primaryColor: s,
    secondaryColor: d,
    autoRotate: !1,
    pose: f,
    modelUrl: a,
    baseUrl: b
  }), /* @__PURE__ */ B("div", { className: `ecorche-2d ${M === "both" ? "sheet" : ""} ${h}`.trim(), children: [
    /* @__PURE__ */ B("div", { className: "ecorche-2d-stage", children: [
      /* @__PURE__ */ x("canvas", { ref: S, "aria-label": "2D anatomy figure" }),
      M === "both" && /* @__PURE__ */ B("div", { className: "ecorche-captions", children: [
        /* @__PURE__ */ x("span", { children: "Ön" }),
        /* @__PURE__ */ x("span", { children: "Arka" })
      ] })
    ] }),
    m && /* @__PURE__ */ x("p", { className: "ecorche-credit", children: re })
  ] });
}
function Ue({
  gender: e = "male",
  height: t,
  weight: o,
  age: i,
  primary: n = [],
  secondary: l = [],
  primaryColor: s,
  secondaryColor: d,
  autoRotate: u = !0,
  pose: f = "rest",
  modelUrl: a,
  baseUrl: b,
  credit: m = !0,
  className: h = ""
}) {
  const S = v(null);
  return se(S, {
    view: "orbit",
    gender: e,
    height: t,
    weight: o,
    age: i,
    primary: n,
    secondary: l,
    primaryColor: s,
    secondaryColor: d,
    autoRotate: u,
    pose: f,
    modelUrl: a,
    baseUrl: b
  }), /* @__PURE__ */ B("div", { className: `ecorche-3d ${h}`.trim(), children: [
    /* @__PURE__ */ x("canvas", { ref: S, "aria-label": "3D anatomy figure" }),
    /* @__PURE__ */ x("p", { className: "ecorche-hint", children: "Sürükle, dön." }),
    m && /* @__PURE__ */ x("p", { className: "ecorche-credit", children: re })
  ] });
}
export {
  me as ALIASES,
  Pe as Body2D,
  Ue as Body3D,
  re as CREDITS,
  he as GROUPS,
  Te as GROUP_NAMES,
  oe as MUSCLES,
  Oe as MUSCLE_IDS,
  pe as bodyShape,
  Le as latin,
  te as modelFile,
  Ae as resolveModelUrl,
  Be as roleOf,
  K as vertexIds
};
