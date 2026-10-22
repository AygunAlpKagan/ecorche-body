import { latin, roleOf } from "./muscles.js";
import { bodyShape } from "./shape.js";

const FRONT = {
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
  calves: [[43.5, 82, 5, 10], [56.5, 82, 5, 10]],
};

const BACK = {
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
  calves: [[43.5, 84, 5, 10], [56.5, 84, 5, 10]],
};

function Silhouette({ back }) {
  if (back) {
    return (
      <path
        className="ecorche-skin"
        d="M50 8c5 0 9 4 9 9 0 3-1 6-3 8 8 3 14 10 16 18 1 2 3 3 5 3 4 0 7 4 7 8 0 6-3 12-6 18-2 4-5 8-6 13-1 3 0 6 1 9l4 18c1 6 0 12-2 16-3 7-8 10-12 10h-2c-2 0-3-2-3-4 0-8 1-16 0-24-1 8-1 16 0 24 0 2-1 4-3 4h-2c-4 0-9-3-12-10-2-4-3-10-2-16l4-18c1-3 2-6 1-9-1-5-4-9-6-13-3-6-6-12-6-18 0-4 3-8 7-8 2 0 4-1 5-3 2-8 8-15 16-18-2-2-3-5-3-8 0-5 4-9 9-9z"
      />
    );
  }
  return (
    <path
      className="ecorche-skin"
      d="M50 8c5 0 9 4 9 9 0 3-1 6-3 8 8 3 14 10 16 18 1 2 3 3 5 3 4 0 7 4 7 8 0 6-3 12-6 18-2 4-5 8-6 13-1 3 0 6 1 9l4 18c1 6 0 12-2 16-3 7-8 10-12 10h-2c-2 0-3-2-3-4 0-8 1-16 0-24-1 8-1 16 0 24 0 2-1 4-3 4h-2c-4 0-9-3-12-10-2-4-3-10-2-16l4-18c1-3 2-6 1-9-1-5-4-9-6-13-3-6-6-12-6-18 0-4 3-8 7-8 2 0 4-1 5-3 2-8 8-15 16-18-2-2-3-5-3-8 0-5 4-9 9-9z"
    />
  );
}

function Figure({ side, primary, secondary, shape, labeled }) {
  const zones = side === "back" ? BACK : FRONT;
  const ids = [...primary, ...secondary.filter((id) => !primary.includes(id))];
  return (
    <div
      className="ecorche-2d-fig"
      style={{ transform: `scale(${shape.shoulder}, ${shape.tall})` }}
    >
      <svg viewBox="0 0 100 133" aria-hidden="true">
        <Silhouette back={side === "back"} />
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
