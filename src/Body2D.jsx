import { latin, roleOf } from "./muscles.js";
import { bodyShape } from "./shape.js";

const FRONT = {
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
  calves: [[44.5, 85, 4, 9], [55.5, 85, 4, 9]],
};

const BACK = {
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
  calves: [[44.5, 86, 4.2, 9], [55.5, 86, 4.2, 9]],
};

function Skin() {
  return (
    <g className="ecorche-skin">
      <ellipse cx="50" cy="10" rx="6.3" ry="8" />
      <rect x="46.6" y="15" width="6.8" height="5.5" rx="3" />
      <ellipse cx="37" cy="23" rx="7" ry="5.4" />
      <ellipse cx="63" cy="23" rx="7" ry="5.4" />
      <path d="M41 20 C45 18 55 18 59 20 C62 27 61 36 58 45 C57 50 57 53 56 56 L44 56 C43 53 43 50 42 45 C39 36 38 27 41 20 Z" />
      <ellipse cx="50" cy="54" rx="11" ry="8" />
      <rect x="30" y="24" width="5.6" height="19" rx="2.8" />
      <rect x="64.4" y="24" width="5.6" height="19" rx="2.8" />
      <rect x="28.8" y="41" width="5" height="17" rx="2.5" />
      <rect x="66.2" y="41" width="5" height="17" rx="2.5" />
      <ellipse cx="31" cy="60" rx="3" ry="4" />
      <ellipse cx="69" cy="60" rx="3" ry="4" />
      <rect x="41" y="52" width="7" height="27" rx="3.3" />
      <rect x="52" y="52" width="7" height="27" rx="3.3" />
      <ellipse cx="44.5" cy="77" rx="4" ry="3" />
      <ellipse cx="55.5" cy="77" rx="4" ry="3" />
      <rect x="41.5" y="76" width="6" height="23" rx="3" />
      <rect x="52.5" y="76" width="6" height="23" rx="3" />
      <ellipse cx="44.5" cy="100" rx="4.6" ry="3" />
      <ellipse cx="55.5" cy="100" rx="4.6" ry="3" />
    </g>
  );
}

function Figure({ side, primary, secondary, shape, labeled }) {
  const zones = side === "back" ? BACK : FRONT;
  const ids = [...primary, ...secondary.filter((id) => !primary.includes(id))];
  const scaleX = (shape.female ? 0.95 : 1) * (0.95 + shape.bulk * 0.12);
  return (
    <figure className="ecorche-2d-fig">
      <div className="ecorche-2d-stage" style={{ transform: `scale(${scaleX}, ${shape.tall})` }}>
        <svg viewBox="0 0 100 110" aria-hidden="true">
          <Skin />
          {ids.map((id) => (zones[id] || []).map(([cx, cy, rx, ry], i) => (
            <ellipse
              key={`${id}-${i}`}
              className={`ecorche-zone ${roleOf(id, primary, secondary)}`}
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
            />
          )))}
        </svg>
        {labeled && ids.slice(0, 3).map((id) => (
          <span key={id} className={`ecorche-tag ${roleOf(id, primary, secondary)}`}>
            {latin(id)}
          </span>
        ))}
      </div>
      <figcaption>{side === "back" ? "Arka" : "Ön"}</figcaption>
    </figure>
  );
}

export function Body2D({
  gender = "male",
  height,
  weight,
  age,
  primary = [],
  secondary = [],
  view = "both",
  labeled = false,
  className = "",
}) {
  const shape = bodyShape({ gender, height, weight, age });
  const sides = view === "front" || view === "back" ? [view] : ["front", "back"];
  return (
    <div className={`ecorche-2d ${sides.length > 1 ? "sheet" : ""} ${className}`.trim()}>
      {sides.map((side) => (
        <Figure key={side} side={side} primary={primary} secondary={secondary} shape={shape} labeled={labeled} />
      ))}
    </div>
  );
}
