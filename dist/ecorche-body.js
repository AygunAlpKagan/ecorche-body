import { jsx as g, jsxs as k } from "react/jsx-runtime";
import { useRef as C, useEffect as T } from "react";
import * as h from "three";
const N = [
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
], W = N.map((n) => n.id);
function P(n) {
  return N.find((i) => i.id === n)?.latin || String(n).toUpperCase();
}
function D(n, i = [], r = []) {
  return i.includes(n) ? "primary" : r.includes(n) ? "secondary" : "idle";
}
function y(n = {}) {
  const i = n.gender === "female", r = Number(n.weight) || (i ? 62 : 78), c = Number(n.height) || (i ? 165 : 178), e = Number(n.age) || 28, o = r / (c / 100) ** 2, t = L((o - 17) / 14, 0.18, 1), s = L((e - 30) / 85, 0, 0.42);
  return {
    female: i,
    weight: r,
    height: c,
    age: e,
    bmi: o,
    bulk: t,
    definition: Math.max(0.38, 1 - s - Math.max(0, o - 27) * 0.045),
    shoulder: (i ? 0.9 : 1) * (0.94 + t * 0.14),
    chest: (i ? 0.92 : 1) * (0.94 + t * 0.16),
    waist: i ? 0.86 + t * 0.08 : 0.92 + t * 0.12,
    hip: (i ? 1.12 : 0.98) * (0.96 + t * 0.1),
    arm: (i ? 0.9 : 1) * (0.9 + t * 0.22),
    thigh: (i ? 1.05 : 1) * (0.92 + t * 0.18),
    calf: 0.88 + t * 0.16,
    neck: (i ? 0.88 : 1) * (0.94 + t * 0.08),
    tall: c / 178
  };
}
function L(n, i, r) {
  return Math.min(r, Math.max(i, n));
}
const B = {
  neck: [[50, 16.4, 4, 3]],
  traps: [[50, 20.4, 11, 3.2]],
  shoulders: [[33, 24.2, 7.2, 5.4], [67, 24.2, 7.2, 5.4]],
  chest: [[43.4, 30.4, 7.6, 5.5], [56.6, 30.4, 7.6, 5.5]],
  biceps: [[27.5, 34.5, 4.4, 7.6], [72.5, 34.5, 4.4, 7.6]],
  forearms: [[21.5, 48, 3.8, 8.2], [78.5, 48, 3.8, 8.2]],
  abdominals: [[50, 38.5, 8.2, 10.5]],
  obliques: [[41, 39, 3.2, 8], [59, 39, 3.2, 8]],
  abductors: [[38, 52.5, 4.2, 5.5], [62, 52.5, 4.2, 5.5]],
  adductors: [[46.2, 58, 3.4, 9], [53.8, 58, 3.4, 9]],
  quadriceps: [[41.6, 61.8, 6.4, 12], [58.4, 61.8, 6.4, 12]],
  calves: [[43.5, 82, 5, 10], [56.5, 82, 5, 10]]
}, G = {
  neck: [[50, 16.2, 4, 3]],
  traps: [[50, 23.5, 13.5, 8]],
  shoulders: [[32.5, 24.8, 7.4, 5.6], [67.5, 24.8, 7.4, 5.6]],
  triceps: [[27.2, 35, 4.6, 8.4], [72.8, 35, 4.6, 8.4]],
  forearms: [[23, 49, 3.6, 8], [77, 49, 3.6, 8]],
  lats: [[38.5, 36.5, 8.5, 12], [61.5, 36.5, 8.5, 12]],
  "middle back": [[50, 32, 7, 8]],
  "lower back": [[50, 43, 6.5, 7]],
  glutes: [[43, 53.5, 8, 8], [57, 53.5, 8, 8]],
  hamstrings: [[42.5, 67, 6.2, 12], [57.5, 67, 6.2, 12]],
  calves: [[43.5, 84, 5, 10], [56.5, 84, 5, 10]]
};
function q({ back: n }) {
  return n ? /* @__PURE__ */ g(
    "path",
    {
      className: "ecorche-skin",
      d: "M50 8c5 0 9 4 9 9 0 3-1 6-3 8 8 3 14 10 16 18 1 2 3 3 5 3 4 0 7 4 7 8 0 6-3 12-6 18-2 4-5 8-6 13-1 3 0 6 1 9l4 18c1 6 0 12-2 16-3 7-8 10-12 10h-2c-2 0-3-2-3-4 0-8 1-16 0-24-1 8-1 16 0 24 0 2-1 4-3 4h-2c-4 0-9-3-12-10-2-4-3-10-2-16l4-18c1-3 2-6 1-9-1-5-4-9-6-13-3-6-6-12-6-18 0-4 3-8 7-8 2 0 4-1 5-3 2-8 8-15 16-18-2-2-3-5-3-8 0-5 4-9 9-9z"
    }
  ) : /* @__PURE__ */ g(
    "path",
    {
      className: "ecorche-skin",
      d: "M50 8c5 0 9 4 9 9 0 3-1 6-3 8 8 3 14 10 16 18 1 2 3 3 5 3 4 0 7 4 7 8 0 6-3 12-6 18-2 4-5 8-6 13-1 3 0 6 1 9l4 18c1 6 0 12-2 16-3 7-8 10-12 10h-2c-2 0-3-2-3-4 0-8 1-16 0-24-1 8-1 16 0 24 0 2-1 4-3 4h-2c-4 0-9-3-12-10-2-4-3-10-2-16l4-18c1-3 2-6 1-9-1-5-4-9-6-13-3-6-6-12-6-18 0-4 3-8 7-8 2 0 4-1 5-3 2-8 8-15 16-18-2-2-3-5-3-8 0-5 4-9 9-9z"
    }
  );
}
function $({ side: n, primary: i, secondary: r, shape: c, labeled: e }) {
  const o = n === "back" ? G : B, t = [...i, ...r.filter((s) => !i.includes(s))];
  return /* @__PURE__ */ k(
    "div",
    {
      className: "ecorche-2d-fig",
      style: { transform: `scale(${c.shoulder}, ${c.tall})` },
      children: [
        /* @__PURE__ */ k("svg", { viewBox: "0 0 100 133", "aria-hidden": "true", children: [
          /* @__PURE__ */ g(q, { back: n === "back" }),
          t.map((s) => (o[s] || []).map(([f, a, d, l], u) => /* @__PURE__ */ g(
            "ellipse",
            {
              className: `ecorche-zone ${D(s, i, r)}`,
              cx: f,
              cy: a,
              rx: d,
              ry: l
            },
            `${s}-${u}`
          )))
        ] }),
        e && t.slice(0, 3).map((s) => /* @__PURE__ */ g("span", { className: `ecorche-tag ${D(s, i, r)}`, children: P(s) }, s))
      ]
    }
  );
}
function Y({
  gender: n = "male",
  height: i,
  weight: r,
  age: c,
  primary: e = [],
  secondary: o = [],
  view: t = "both",
  labeled: s = !1,
  className: f = ""
}) {
  const a = y({ gender: n, height: i, weight: r, age: c }), d = t === "front" || t === "back" ? [t] : ["front", "back"];
  return /* @__PURE__ */ g("div", { className: `ecorche-2d ${d.length > 1 ? "sheet" : ""} ${f}`.trim(), children: d.map((l) => /* @__PURE__ */ g($, { side: l, primary: e, secondary: o, shape: a, labeled: s }, l)) });
}
const F = 10134445, z = 3116287, H = 16731533;
function X(n, i = [], r = []) {
  const c = new h.Group(), e = n, o = e.tall, t = (a, d, l, u = [0, 0, 0], p = 1) => {
    const b = i.includes(a) ? "primary" : r.includes(a) ? "secondary" : "idle", w = b === "primary" ? z : b === "secondary" ? H : F, M = new h.MeshStandardMaterial({
      color: w,
      roughness: b === "idle" ? 0.55 : 0.35,
      metalness: 0.04,
      emissive: b === "idle" ? 0 : w,
      emissiveIntensity: b === "primary" ? 0.35 : b === "secondary" ? 0.22 : 0
    }), S = new h.Mesh(d, M);
    return S.name = a, S.position.set(l[0], l[1] * o, l[2]), S.rotation.set(u[0], u[1], u[2]), S.scale.multiplyScalar(p), c.add(S), S;
  }, s = (a, d, l = 8) => new h.CapsuleGeometry(a, d, 4, l);
  return t("head", ((a) => new h.SphereGeometry(a, 18, 14))(0.11 * e.neck), [0, 1.62, 0], [0, 0, 0], 1), t("neck", s(0.045 * e.neck, 0.08), [0, 1.48, 0]), t("traps", s(0.09 * e.shoulder, 0.08), [0, 1.4, -0.02], [0.5, 0, 0]), t("chest", s(0.13 * e.chest, 0.12), [-0.08, 1.28, 0.06], [1.15, 0, 0.15]), t("chest", s(0.13 * e.chest, 0.12), [0.08, 1.28, 0.06], [1.15, 0, -0.15]), t("abdominals", s(0.09 * e.waist, 0.22), [0, 1.08, 0.04], [0.12, 0, 0]), t("obliques", s(0.05 * e.waist, 0.16), [-0.09, 1.08, 0.02], [0.1, 0, 0.35]), t("obliques", s(0.05 * e.waist, 0.16), [0.09, 1.08, 0.02], [0.1, 0, -0.35]), t("lats", s(0.08 * e.shoulder, 0.2), [-0.1, 1.18, -0.04], [0.35, 0, 0.4]), t("lats", s(0.08 * e.shoulder, 0.2), [0.1, 1.18, -0.04], [0.35, 0, -0.4]), t("middle back", s(0.08, 0.14), [0, 1.22, -0.06], [0.2, 0, 0]), t("lower back", s(0.06 * e.waist, 0.12), [0, 1.02, -0.05], [0.15, 0, 0]), t("shoulders", s(0.08 * e.shoulder, 0.08), [-0.22 * e.shoulder, 1.36, 0], [0, 0, 1.15]), t("shoulders", s(0.08 * e.shoulder, 0.08), [0.22 * e.shoulder, 1.36, 0], [0, 0, -1.15]), t("biceps", s(0.045 * e.arm, 0.16), [-0.28 * e.shoulder, 1.16, 0.03], [0.15, 0, 0.25]), t("biceps", s(0.045 * e.arm, 0.16), [0.28 * e.shoulder, 1.16, 0.03], [0.15, 0, -0.25]), t("triceps", s(0.042 * e.arm, 0.16), [-0.3 * e.shoulder, 1.16, -0.03], [0.15, 0, 0.25]), t("triceps", s(0.042 * e.arm, 0.16), [0.3 * e.shoulder, 1.16, -0.03], [0.15, 0, -0.25]), t("forearms", s(0.035 * e.arm, 0.18), [-0.34 * e.shoulder, 0.9, 0.02], [0.1, 0, 0.2]), t("forearms", s(0.035 * e.arm, 0.18), [0.34 * e.shoulder, 0.9, 0.02], [0.1, 0, -0.2]), t("glutes", s(0.1 * e.hip, 0.1), [-0.08, 0.86, -0.05], [0.4, 0, 0]), t("glutes", s(0.1 * e.hip, 0.1), [0.08, 0.86, -0.05], [0.4, 0, 0]), t("abductors", s(0.05 * e.hip, 0.1), [-0.14, 0.84, 0], [0.2, 0, 0.4]), t("abductors", s(0.05 * e.hip, 0.1), [0.14, 0.84, 0], [0.2, 0, -0.4]), t("adductors", s(0.04 * e.thigh, 0.16), [-0.05, 0.7, 0.02], [0.05, 0, 0.1]), t("adductors", s(0.04 * e.thigh, 0.16), [0.05, 0.7, 0.02], [0.05, 0, -0.1]), t("quadriceps", s(0.07 * e.thigh, 0.28), [-0.09, 0.58, 0.04], [0.08, 0, 0.04]), t("quadriceps", s(0.07 * e.thigh, 0.28), [0.09, 0.58, 0.04], [0.08, 0, -0.04]), t("hamstrings", s(0.065 * e.thigh, 0.26), [-0.09, 0.56, -0.04], [-0.08, 0, 0.04]), t("hamstrings", s(0.065 * e.thigh, 0.26), [0.09, 0.56, -0.04], [-0.08, 0, -0.04]), t("calves", s(0.05 * e.calf, 0.22), [-0.08, 0.22, -0.02], [0.05, 0, 0]), t("calves", s(0.05 * e.calf, 0.22), [0.08, 0.22, -0.02], [0.05, 0, 0]), c.traverse((a) => {
    a.isMesh && (a.castShadow = !0);
  }), c;
}
function j(n, { autoRotate: i = !0 } = {}) {
  const r = new h.WebGLRenderer({ canvas: n, antialias: !0, alpha: !0 });
  r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const c = new h.Scene(), e = 1.15, o = new h.OrthographicCamera(-e, e, e, -e, 0.1, 40);
  o.position.set(0, 0.88, 6), o.lookAt(0, 0.88, 0);
  const t = new h.HemisphereLight(14542847, 1709092, 1.1), s = new h.DirectionalLight(16777215, 1.35);
  s.position.set(2.2, 3.4, 2.8);
  const f = new h.DirectionalLight(8956637, 0.45);
  f.position.set(-2.4, 1.2, -1.6), c.add(t, s, f);
  const a = new h.Mesh(
    new h.CircleGeometry(1.6, 48),
    new h.MeshStandardMaterial({ color: 1315860, roughness: 0.9 })
  );
  a.rotation.x = -Math.PI / 2, a.position.y = 0, c.add(a);
  const d = new h.Group();
  c.add(d);
  let l = null, u = 0.35, p = !1, b = 0, w = 0, M = i;
  function S() {
    const m = Math.max(1, n.clientWidth || 320), x = Math.max(1, n.clientHeight || 420);
    r.setSize(m, x, !1);
    const O = m / x;
    o.left = -e * O, o.right = e * O, o.top = e, o.bottom = -e, o.updateProjectionMatrix();
  }
  function U(m) {
    l && d.remove(l), l = m, d.add(l);
  }
  function E(m) {
    p = !0, M = !1, b = m.clientX, n.setPointerCapture?.(m.pointerId);
  }
  function R(m) {
    p && (u += (m.clientX - b) * 0.01, b = m.clientX);
  }
  function I() {
    p = !1;
  }
  n.addEventListener("pointerdown", E), n.addEventListener("pointermove", R), window.addEventListener("pointerup", I);
  const v = new ResizeObserver(S);
  v.observe(n), S();
  function A() {
    M && !p && (u += 6e-3), d.rotation.y = u, r.render(c, o), w = requestAnimationFrame(A);
  }
  return A(), {
    setFigure: U,
    resize: S,
    setAutoRotate(m) {
      M = m;
    },
    dispose() {
      cancelAnimationFrame(w), n.removeEventListener("pointerdown", E), n.removeEventListener("pointermove", R), window.removeEventListener("pointerup", I), v.disconnect(), r.dispose();
    }
  };
}
function K({
  gender: n = "male",
  height: i,
  weight: r,
  age: c,
  primary: e = [],
  secondary: o = [],
  autoRotate: t = !0,
  className: s = ""
}) {
  const f = C(null), a = C(null), d = y({ gender: n, height: i, weight: r, age: c }), l = JSON.stringify({ gender: n, height: i, weight: r, age: c, primary: e, secondary: o, autoRotate: t });
  return T(() => {
    const u = f.current;
    if (!u) return;
    const p = j(u, { autoRotate: t });
    return p.setFigure(X(d, e, o)), a.current = p, () => {
      p.dispose(), a.current = null;
    };
  }, [l]), /* @__PURE__ */ k("div", { className: `ecorche-3d ${s}`.trim(), children: [
    /* @__PURE__ */ g("canvas", { ref: f, "aria-label": "3D anatomy figure" }),
    /* @__PURE__ */ g("p", { className: "ecorche-hint", children: "Sürükle, dön." })
  ] });
}
export {
  Y as Body2D,
  K as Body3D,
  N as MUSCLES,
  W as MUSCLE_IDS,
  y as bodyShape,
  P as latin,
  D as roleOf
};
