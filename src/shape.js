export function bodyShape(input = {}) {
  const female = input.gender === "female";
  const weight = Number(input.weight) || (female ? 62 : 78);
  const height = Number(input.height) || (female ? 165 : 178);
  const age = Number(input.age) || 28;
  const bmi = weight / ((height / 100) ** 2);
  const bulk = clamp((bmi - 16.5) / 16, 0.08, 1);
  const ageSoft = clamp((age - 24) / 55, 0, 0.7);
  const fat = clamp((bmi - 21) / 14, 0, 1);
  return {
    female,
    weight,
    height,
    age,
    bmi,
    bulk,
    fat,
    definition: clamp(1 - ageSoft * 0.55 - fat * 0.5, 0.22, 1),
    shoulder: (female ? 0.86 : 1) * (0.82 + bulk * 0.36),
    chest: (female ? 0.88 : 1) * (0.8 + bulk * 0.4),
    waist: (female ? 0.82 : 0.88) + fat * 0.28 + bulk * 0.08,
    hip: (female ? 1.16 : 0.96) * (0.88 + bulk * 0.28 + fat * 0.08),
    arm: (female ? 0.84 : 1) * (0.78 + bulk * 0.44),
    thigh: (female ? 1.08 : 1) * (0.78 + bulk * 0.46),
    calf: 0.78 + bulk * 0.36,
    neck: (female ? 0.86 : 1) * (0.88 + bulk * 0.18),
    tall: height / 178,
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
