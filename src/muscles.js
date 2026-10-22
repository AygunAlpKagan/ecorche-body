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

export const MUSCLE_COLORS = {
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
  "Brachialis": "#4ea8de",
  "Brachioradialis": "#f4a261",
  "Forearm Flexors": "#e09f3e",
  "Forearm Extensors": "#d4a373",
  "Gastrocnemius": "#fee440",
  "Soleus": "#e9c46a",
  "Tibialis Anterior": "#90be6d",
  "Gluteus Medius": "#fb8500",
  "Adductor Magnus": "#7209b7",
  "Front Deltoid": "#ff9f43",
  "Side Deltoid": "#ff7d00",
  "Rear Deltoid": "#f4a261",
  "Deltoids": "#ff9f43",
  "Upper Trapezius": "#8b6cff",
  "Middle Trapezius": "#9b5de5",
  "Infraspinatus": "#c77dff",
  "Pectoralis Major": "#e23d3d",
  "Latissimus Dorsi": "#4cc9f0",
  "Trapezius": "#8b6cff",
  "Rectus Abdominis": "#ff5d8f",
  "Obliques": "#e9c46a",
  "Quadriceps": "#00bbf9",
  "Hamstrings": "#00c49a",
  "Calves": "#fee440",
  "Gluteus Maximus": "#f72585",
  "Adductors": "#7209b7",
  "Biceps": "#3d9bff",
  "Triceps": "#2ec4b6",
  "Sternocleidomastoid": "#d4b896",
  "Erector Spinae": "#c77dff",
};

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

const VERTEX_GROUP = new Map();
for (const muscle of MUSCLES) {
  for (const id of vertexIds([muscle.id])) {
    if (!VERTEX_GROUP.has(id)) VERTEX_GROUP.set(id, muscle.id);
  }
}
for (const [name, ids] of Object.entries(GROUPS)) {
  for (const id of ids) {
    if (!VERTEX_GROUP.has(id)) VERTEX_GROUP.set(id, name);
  }
}

export function groupOfVertex(id) {
  return VERTEX_GROUP.get(id) || null;
}
