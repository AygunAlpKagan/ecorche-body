export function bodyShape(input = {}) {
  const female = input.gender === "female";
  const weight = boundedNumber(input.weight, female ? 62 : 78, 35, 180);
  const height = boundedNumber(input.height, female ? 165 : 178, 130, 210);
  const age = boundedNumber(input.age, 28, 18, 85);
  const bmi = weight / ((height / 100) ** 2);
  const bodyFatPercent = clamp(
    1.2 * bmi + 0.23 * age - (female ? 0 : 10.8) - 5.4,
    female ? 10 : 4,
    female ? 55 : 45,
  );
  const fat = clamp((bodyFatPercent - (female ? 22 : 12)) / 25, 0, 1);
  const leanMassIndex = bmi * (1 - bodyFatPercent / 100);
  const referenceLeanMassIndex = female ? 15.5 : 18.5;
  const bulk = clamp(0.5 + (leanMassIndex - referenceLeanMassIndex) / 14, 0, 1);
  const ageSoft = clamp((age - 25) / 60, 0, 0.7);
  return {
    female,
    weight,
    height,
    age,
    bmi,
    bodyFatPercent,
    leanMassIndex,
    bulk,
    fat,
    definition: clamp(1 - ageSoft * 0.25 - fat * 0.3, 0.45, 1),
    shoulder: (female ? 0.9 : 1) * (0.94 + bulk * 0.12),
    chest: (female ? 0.92 : 1) * (0.96 + bulk * 0.08),
    waist: (female ? 0.84 : 0.88) + fat * 0.16,
    hip: (female ? 1.12 : 0.98) * (0.98 + (bulk - 0.5) * 0.08 + fat * 0.035),
    arm: (female ? 0.88 : 1) * (0.96 + (bulk - 0.5) * 0.12),
    thigh: (female ? 1.06 : 1) * (0.96 + (bulk - 0.5) * 0.14),
    calf: 0.96 + (bulk - 0.5) * 0.08,
    neck: (female ? 0.9 : 1) * (0.96 + (bulk - 0.5) * 0.06),
    tall: height / 178,
  };
}

function boundedNumber(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number) || number === 0) return fallback;
  return clamp(number, min, max);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
