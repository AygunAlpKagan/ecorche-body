import { jsx as o, jsxs as E } from "react/jsx-runtime";
import { useRef as D, useEffect as G } from "react";
import * as w from "three";
const T = [
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
  { id: "middle back", latin: "RHOMBOIDS", side: "back" },
  { id: "lower back", latin: "ERECTOR SPINAE", side: "back" },
  { id: "glutes", latin: "GLUTEUS MAXIMUS", side: "back" },
  { id: "abductors", latin: "GLUTEUS MEDIUS", side: "both" },
  { id: "adductors", latin: "ADDUCTORS", side: "front" },
  { id: "quadriceps", latin: "QUADRICEPS", side: "front" },
  { id: "hamstrings", latin: "HAMSTRINGS", side: "back" },
  { id: "calves", latin: "GASTROCNEMIUS", side: "both" }
], ee = T.map((t) => t.id);
function F(t) {
  return T.find((n) => n.id === t)?.latin || String(t).toUpperCase();
}
function N(t, n = [], a = []) {
  return n.includes(t) ? "primary" : a.includes(t) ? "secondary" : "idle";
}
function P(t = {}) {
  const n = t.gender === "female", a = Number(t.weight) || (n ? 62 : 78), m = Number(t.height) || (n ? 165 : 178), e = Number(t.age) || 28, r = a / (m / 100) ** 2, d = U((r - 17) / 14, 0.18, 1), c = U((e - 30) / 85, 0, 0.42);
  return {
    female: n,
    weight: a,
    height: m,
    age: e,
    bmi: r,
    bulk: d,
    definition: Math.max(0.38, 1 - c - Math.max(0, r - 27) * 0.045),
    shoulder: (n ? 0.9 : 1) * (0.94 + d * 0.14),
    chest: (n ? 0.92 : 1) * (0.94 + d * 0.16),
    waist: n ? 0.86 + d * 0.08 : 0.92 + d * 0.12,
    hip: (n ? 1.12 : 0.98) * (0.96 + d * 0.1),
    arm: (n ? 0.9 : 1) * (0.9 + d * 0.22),
    thigh: (n ? 1.05 : 1) * (0.92 + d * 0.18),
    calf: 0.88 + d * 0.16,
    neck: (n ? 0.88 : 1) * (0.94 + d * 0.08),
    tall: m / 178
  };
}
function U(t, n, a) {
  return Math.min(a, Math.max(n, t));
}
const $ = {
  neck: [[50, 17, 3.4, 2.6]],
  traps: [[50, 21, 10, 2.8]],
  shoulders: [[37, 23.5, 6.2, 4.6], [63, 23.5, 6.2, 4.6]],
  chest: [[44, 29, 6.2, 4.4], [56, 29, 6.2, 4.4]],
  biceps: [[31, 34, 3.4, 6], [69, 34, 3.4, 6]],
  forearms: [[29, 47, 3, 6.4], [71, 47, 3, 6.4]],
  abdominals: [[50, 40, 6.6, 9]],
  obliques: [[43, 40, 2.6, 6.4], [57, 40, 2.6, 6.4]],
  adductors: [[46, 60, 2.8, 8], [54, 60, 2.8, 8]],
  quadriceps: [[44.5, 62, 5, 11], [55.5, 62, 5, 11]],
  abductors: [[40, 54, 3.2, 4.6], [60, 54, 3.2, 4.6]],
  calves: [[44.5, 85, 4, 9], [55.5, 85, 4, 9]]
}, H = {
  neck: [[50, 17, 3.2, 2.4]],
  traps: [[50, 24, 11, 6]],
  shoulders: [[37, 23.5, 6.2, 4.6], [63, 23.5, 6.2, 4.6]],
  triceps: [[31, 34.5, 3.6, 6.6], [69, 34.5, 3.6, 6.6]],
  forearms: [[29, 48, 2.8, 6.2], [71, 48, 2.8, 6.2]],
  lats: [[43, 37, 5.5, 9], [57, 37, 5.5, 9]],
  "middle back": [[50, 33, 6, 7]],
  "lower back": [[50, 45, 5.5, 6]],
  glutes: [[45, 55, 5.5, 6], [55, 55, 5.5, 6]],
  hamstrings: [[44.5, 66, 4.6, 10], [55.5, 66, 4.6, 10]],
  calves: [[44.5, 86, 4.2, 9], [55.5, 86, 4.2, 9]]
};
function q() {
  return /* @__PURE__ */ E("g", { className: "ecorche-skin", children: [
    /* @__PURE__ */ o("ellipse", { cx: "50", cy: "10", rx: "6.3", ry: "8" }),
    /* @__PURE__ */ o("rect", { x: "46.6", y: "15", width: "6.8", height: "5.5", rx: "3" }),
    /* @__PURE__ */ o("ellipse", { cx: "37", cy: "23", rx: "7", ry: "5.4" }),
    /* @__PURE__ */ o("ellipse", { cx: "63", cy: "23", rx: "7", ry: "5.4" }),
    /* @__PURE__ */ o("path", { d: "M41 20 C45 18 55 18 59 20 C62 27 61 36 58 45 C57 50 57 53 56 56 L44 56 C43 53 43 50 42 45 C39 36 38 27 41 20 Z" }),
    /* @__PURE__ */ o("ellipse", { cx: "50", cy: "54", rx: "11", ry: "8" }),
    /* @__PURE__ */ o("rect", { x: "30", y: "24", width: "5.6", height: "19", rx: "2.8" }),
    /* @__PURE__ */ o("rect", { x: "64.4", y: "24", width: "5.6", height: "19", rx: "2.8" }),
    /* @__PURE__ */ o("rect", { x: "28.8", y: "41", width: "5", height: "17", rx: "2.5" }),
    /* @__PURE__ */ o("rect", { x: "66.2", y: "41", width: "5", height: "17", rx: "2.5" }),
    /* @__PURE__ */ o("ellipse", { cx: "31", cy: "60", rx: "3", ry: "4" }),
    /* @__PURE__ */ o("ellipse", { cx: "69", cy: "60", rx: "3", ry: "4" }),
    /* @__PURE__ */ o("rect", { x: "41", y: "52", width: "7", height: "27", rx: "3.3" }),
    /* @__PURE__ */ o("rect", { x: "52", y: "52", width: "7", height: "27", rx: "3.3" }),
    /* @__PURE__ */ o("ellipse", { cx: "44.5", cy: "77", rx: "4", ry: "3" }),
    /* @__PURE__ */ o("ellipse", { cx: "55.5", cy: "77", rx: "4", ry: "3" }),
    /* @__PURE__ */ o("rect", { x: "41.5", y: "76", width: "6", height: "23", rx: "3" }),
    /* @__PURE__ */ o("rect", { x: "52.5", y: "76", width: "6", height: "23", rx: "3" }),
    /* @__PURE__ */ o("ellipse", { cx: "44.5", cy: "100", rx: "4.6", ry: "3" }),
    /* @__PURE__ */ o("ellipse", { cx: "55.5", cy: "100", rx: "4.6", ry: "3" })
  ] });
}
function z({ side: t, primary: n, secondary: a, shape: m, labeled: e }) {
  const r = t === "back" ? H : $, d = [...n, ...a.filter((i) => !n.includes(i))], c = (m.female ? 0.95 : 1) * (0.95 + m.bulk * 0.12);
  return /* @__PURE__ */ E("figure", { className: "ecorche-2d-fig", children: [
    /* @__PURE__ */ E("div", { className: "ecorche-2d-stage", style: { transform: `scale(${c}, ${m.tall})` }, children: [
      /* @__PURE__ */ E("svg", { viewBox: "0 0 100 110", "aria-hidden": "true", children: [
        /* @__PURE__ */ o(q, {}),
        d.map((i) => (r[i] || []).map(([s, l, h, p], f) => /* @__PURE__ */ o(
          "ellipse",
          {
            className: `ecorche-zone ${N(i, n, a)}`,
            cx: s,
            cy: l,
            rx: h,
            ry: p
          },
          `${i}-${f}`
        )))
      ] }),
      e && d.slice(0, 3).map((i) => /* @__PURE__ */ o("span", { className: `ecorche-tag ${N(i, n, a)}`, children: F(i) }, i))
    ] }),
    /* @__PURE__ */ o("figcaption", { children: t === "back" ? "Arka" : "Ön" })
  ] });
}
function te({
  gender: t = "male",
  height: n,
  weight: a,
  age: m,
  primary: e = [],
  secondary: r = [],
  view: d = "both",
  labeled: c = !1,
  className: i = ""
}) {
  const s = P({ gender: t, height: n, weight: a, age: m }), l = d === "front" || d === "back" ? [d] : ["front", "back"];
  return /* @__PURE__ */ o("div", { className: `ecorche-2d ${l.length > 1 ? "sheet" : ""} ${i}`.trim(), children: l.map((h) => /* @__PURE__ */ o(z, { side: h, primary: e, secondary: r, shape: s, labeled: c }, h)) });
}
const X = 9476518, j = 8357780, J = 3116287, K = 16731533;
function Q(t) {
  return t === "primary" ? J : t === "secondary" ? K : t === "muscle" ? j : X;
}
function W(t) {
  const n = Q(t), a = t === "primary" || t === "secondary";
  return new w.MeshStandardMaterial({
    color: n,
    roughness: a ? 0.38 : 0.62,
    metalness: 0.03,
    emissive: a ? n : 0,
    emissiveIntensity: t === "primary" ? 0.42 : t === "secondary" ? 0.26 : 0
  });
}
const u = new w.SphereGeometry(1, 20, 16);
function k(t, n) {
  return new w.CapsuleGeometry(t, n, 6, 14);
}
function Y(t, n = [], a = []) {
  const m = new w.Group(), e = t, r = 0.85 + e.bulk * 0.4, d = (l, h) => h ? n.includes(l) ? "primary" : a.includes(l) ? "secondary" : "muscle" : "skin";
  function c(l, h, p, { rot: f = [0, 0, 0], scale: S = [1, 1, 1], muscle: y = !1 } = {}) {
    const x = new w.Mesh(h, W(d(l, y)));
    return x.name = l, x.position.set(p[0], p[1], p[2]), x.rotation.set(f[0], f[1], f[2]), x.scale.set(S[0], S[1], S[2]), x.castShadow = !0, x.receiveShadow = !0, m.add(x), x;
  }
  function i(l, h, p, f = {}) {
    const [S, y, x] = p, g = f.rot || [0, 0, 0];
    c(l, h, [S, y, x], { ...f, rot: g }), c(l, h, [-S, y, x], { ...f, rot: [g[0], -g[1], -g[2]] });
  }
  const s = (l, h, p) => ({ scale: [l, h, p] });
  c("head", u, [0, 1.7, 0.01], s(0.095 * e.neck, 0.12, 0.105)), c("jaw", u, [0, 1.63, 0.02], s(0.07, 0.05, 0.08)), c("neck", k(0.045 * e.neck, 0.05), [0, 1.56, -0.01]), c("chestbase", u, [0, 1.37, 0], s(0.19 * e.chest, 0.12, 0.085 * r)), c("ribs", u, [0, 1.24, 0], s(0.155 * e.chest, 0.1, 0.08 * r)), c("waistbase", u, [0, 1.12, 0], s(0.13 * e.waist, 0.1, 0.075 * r)), c("pelvis", u, [0, 0.99, 0], s(0.155 * e.hip, 0.1, 0.085)), i("shoulders", u, [0.188 * e.shoulder, 1.45, 0], { muscle: !0, ...s(0.072 * r, 0.072, 0.072) }), i("upperarm", k(0.042 * e.arm, 0.17), [0.21 * e.shoulder, 1.27, -5e-3], { rot: [0, 0, 0.14] }), i("biceps", u, [0.202 * e.shoulder, 1.29, 0.02], { muscle: !0, ...s(0.04 * r, 0.09, 0.044) }), i("triceps", u, [0.222 * e.shoulder, 1.26, -0.035], { muscle: !0, ...s(0.038 * r, 0.094, 0.042) }), i("elbow", u, [0.232 * e.shoulder, 1.11, 0], s(0.038, 0.038, 0.038)), i("forearms", k(0.034 * e.arm, 0.18), [0.244 * e.shoulder, 0.97, 0.01], { muscle: !0, rot: [0, 0, 0.08] }), i("hand", u, [0.258 * e.shoulder, 0.83, 0.02], s(0.038, 0.066, 0.024)), i("chest", u, [0.072 * e.chest, 1.38, 0.055 * r], { muscle: !0, ...s(0.082 * e.chest, 0.058, 0.06 * r) });
  for (let l = 0; l < 3; l += 1) {
    const h = 1.26 - l * 0.055;
    i("abdominals", u, [0.035, h, 0.07 * r], { muscle: !0, ...s(0.032 * r, 0.026, 0.04 * r) });
  }
  return i("obliques", u, [0.1 * e.waist, 1.12, 0.03], { muscle: !0, ...s(0.035, 0.07, 0.05 * r) }), c("traps", u, [0, 1.47, -0.03], { muscle: !0, ...s(0.12 * e.shoulder, 0.07, 0.05) }), i("lats", u, [0.115 * e.chest, 1.22, -0.03], { muscle: !0, ...s(0.06, 0.12, 0.055 * r) }), c("middle back", u, [0, 1.3, -0.06 * r], { muscle: !0, ...s(0.12 * e.chest, 0.08, 0.04) }), c("lower back", u, [0, 1.09, -0.06 * r], { muscle: !0, ...s(0.1 * e.waist, 0.07, 0.04) }), i("glutes", u, [0.07 * e.hip, 0.93, -0.055 * r], { muscle: !0, ...s(0.085 * e.hip, 0.08, 0.075) }), i("abductors", u, [0.135 * e.hip, 0.86, 0.01], { muscle: !0, ...s(0.045, 0.09, 0.06) }), i("upperleg", k(0.066 * e.thigh, 0.18), [0.082, 0.7, 0], { rot: [0, 0, 0.03] }), i("quadriceps", u, [0.082, 0.72, 0.05 * r], { muscle: !0, ...s(0.058 * e.thigh, 0.12, 0.055) }), i("adductors", k(0.032 * e.thigh, 0.12), [0.04, 0.72, 0.02], { muscle: !0 }), i("hamstrings", u, [0.085, 0.7, -0.05 * r], { muscle: !0, ...s(0.05, 0.12, 0.05) }), i("knee", u, [0.085, 0.5, 0.01], s(0.05, 0.05, 0.05)), i("lowerleg", k(0.05 * e.calf, 0.17), [0.085, 0.32, 5e-3]), i("calves", u, [0.085, 0.36, -0.04 * r], { muscle: !0, ...s(0.05 * e.calf, 0.085, 0.05) }), i("foot", u, [0.09, 0.05, 0.05], s(0.045, 0.035, 0.1)), m;
}
function Z(t, { autoRotate: n = !0 } = {}) {
  const a = new w.WebGLRenderer({ canvas: t, antialias: !0, alpha: !0 });
  a.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)), a.shadowMap.enabled = !0, a.shadowMap.type = w.PCFSoftShadowMap;
  const m = new w.Scene(), e = 1.05, r = new w.OrthographicCamera(-e, e, e, -e, 0.1, 40);
  r.position.set(0, 0.9, 6), r.lookAt(0, 0.9, 0);
  const d = new w.HemisphereLight(14674175, 1446688, 0.95), c = new w.DirectionalLight(16777215, 1.45);
  c.position.set(2.4, 3.6, 3.2), c.castShadow = !0, c.shadow.mapSize.set(1024, 1024), c.shadow.camera.near = 0.5, c.shadow.camera.far = 12, c.shadow.bias = -8e-4;
  const i = new w.DirectionalLight(9024767, 0.6);
  i.position.set(-3, 2, -2.4), m.add(d, c, i);
  const s = new w.Mesh(
    new w.CircleGeometry(1.7, 48),
    new w.ShadowMaterial({ opacity: 0.35 })
  );
  s.rotation.x = -Math.PI / 2, s.position.y = 0, s.receiveShadow = !0, m.add(s);
  const l = new w.Group();
  m.add(l);
  let h = null, p = 0, f = !1, S = 0, y = 0, x = n;
  function g() {
    const b = Math.max(1, t.clientWidth || 320), M = Math.max(1, t.clientHeight || 420);
    a.setSize(b, M, !1);
    const O = b / M;
    r.left = -e * O, r.right = e * O, r.top = e, r.bottom = -e, r.updateProjectionMatrix();
  }
  function B(b) {
    h && (l.remove(h), h.traverse((M) => {
      M.isMesh && M.material.dispose();
    })), h = b, l.add(h);
  }
  function I(b) {
    f = !0, x = !1, S = b.clientX, t.setPointerCapture?.(b.pointerId);
  }
  function R(b) {
    f && (p += (b.clientX - S) * 0.01, S = b.clientX);
  }
  function C() {
    f = !1;
  }
  t.addEventListener("pointerdown", I), t.addEventListener("pointermove", R), window.addEventListener("pointerup", C);
  const v = new ResizeObserver(g);
  v.observe(t), g();
  let A = 150;
  function L() {
    A > 0 ? A -= 1 : x && !f && (p += 6e-3), l.rotation.y = p, a.render(m, r), y = requestAnimationFrame(L);
  }
  return L(), {
    setFigure: B,
    resize: g,
    setAutoRotate(b) {
      x = b;
    },
    dispose() {
      cancelAnimationFrame(y), t.removeEventListener("pointerdown", I), t.removeEventListener("pointermove", R), window.removeEventListener("pointerup", C), v.disconnect(), a.dispose();
    }
  };
}
function re({
  gender: t = "male",
  height: n,
  weight: a,
  age: m,
  primary: e = [],
  secondary: r = [],
  autoRotate: d = !0,
  className: c = ""
}) {
  const i = D(null), s = D(null), l = P({ gender: t, height: n, weight: a, age: m }), h = JSON.stringify({ gender: t, height: n, weight: a, age: m, primary: e, secondary: r, autoRotate: d });
  return G(() => {
    const p = i.current;
    if (!p) return;
    const f = Z(p, { autoRotate: d });
    return f.setFigure(Y(l, e, r)), s.current = f, () => {
      f.dispose(), s.current = null;
    };
  }, [h]), /* @__PURE__ */ E("div", { className: `ecorche-3d ${c}`.trim(), children: [
    /* @__PURE__ */ o("canvas", { ref: i, "aria-label": "3D anatomy figure" }),
    /* @__PURE__ */ o("p", { className: "ecorche-hint", children: "Sürükle, dön." })
  ] });
}
export {
  te as Body2D,
  re as Body3D,
  T as MUSCLES,
  ee as MUSCLE_IDS,
  P as bodyShape,
  F as latin,
  N as roleOf
};
