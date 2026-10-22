export const MUSCLES = [
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
  { id: "calves", latin: "GASTROCNEMIUS", side: "both" },
];

export const MUSCLE_IDS = MUSCLES.map((item) => item.id);

export function latin(id) {
  return MUSCLES.find((item) => item.id === id)?.latin || String(id).toUpperCase();
}

export function roleOf(id, primary = [], secondary = []) {
  if (primary.includes(id)) return "primary";
  if (secondary.includes(id)) return "secondary";
  return "idle";
}
