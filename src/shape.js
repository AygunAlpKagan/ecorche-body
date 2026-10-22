export function bodyShape(input = {}) {
  const female = input.gender === "female";
  const weight = Number(input.weight) || (female ? 62 : 78);
  const height = Number(input.height) || (female ? 165 : 178);
  const age = Number(input.age) || 28;
  const bmi = weight / ((height / 100) ** 2);
  const bulk = clamp((bmi - 17) / 14, 0.18, 1);
  const ageSoft = clamp((age - 30) / 85, 0, 0.42);
  return {
    female,
    weight,
    height,
    age,
    bmi,
    bulk,
    definition: Math.max(0.38, 1 - ageSoft - Math.max(0, bmi - 27) * 0.045),
    shoulder: (female ? 0.9 : 1) * (0.94 + bulk * 0.14),
    chest: (female ? 0.92 : 1) * (0.94 + bulk * 0.16),
    waist: female ? 0.86 + bulk * 0.08 : 0.92 + bulk * 0.12,
    hip: (female ? 1.12 : 0.98) * (0.96 + bulk * 0.1),
    arm: (female ? 0.9 : 1) * (0.9 + bulk * 0.22),
    thigh: (female ? 1.05 : 1) * (0.92 + bulk * 0.18),
    calf: 0.88 + bulk * 0.16,
    neck: (female ? 0.88 : 1) * (0.94 + bulk * 0.08),
    tall: height / 178,
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
