import atlas from "../models/muscles.json";

export const GROUPS = atlas.groups;
export const GROUP_NAMES = Object.keys(atlas.groups);
export const SKIN_ID = atlas.skin_id;
export const JOINTS = atlas.joints;

/** Fitness-app ids → anatomical groups from the GLB `_MUSCLE` map. */
export const ALIASES = {
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
  calves: ["Calves"],
};

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
  { id: "middle back", latin: "RHOMBOIDS / INFRASPINATUS", side: "back" },
  { id: "lower back", latin: "ERECTOR SPINAE", side: "back" },
  { id: "glutes", latin: "GLUTEUS MAXIMUS", side: "back" },
  { id: "abductors", latin: "GLUTEUS MEDIUS", side: "both" },
  { id: "adductors", latin: "ADDUCTORS", side: "front" },
  { id: "quadriceps", latin: "QUADRICEPS", side: "front" },
  { id: "hamstrings", latin: "HAMSTRINGS", side: "back" },
  { id: "calves", latin: "GASTROCNEMIUS", side: "both" },
];

export const MUSCLE_IDS = MUSCLES.map((item) => item.id);

export const CREDITS =
  "Anatomik kas haritası: Z-Anatomy / BodyParts3D, CC BY-SA 4.0. Gövde: MakeHuman, CC0.";

export function latin(id) {
  return MUSCLES.find((item) => item.id === id)?.latin || String(id).toUpperCase();
}

export function roleOf(id, primary = [], secondary = []) {
  if (primary.includes(id)) return "primary";
  if (secondary.includes(id)) return "secondary";
  return "idle";
}

export function vertexIds(names = []) {
  const ids = new Set();
  for (const name of names) {
    if (!name) continue;
    const groups = ALIASES[name] || [name];
    for (const group of groups) {
      const list = GROUPS[group];
      if (list) for (const id of list) ids.add(id);
    }
  }
  return ids;
}
