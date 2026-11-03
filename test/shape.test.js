import test from "node:test";
import assert from "node:assert/strict";
import { bodyShape } from "../src/shape.js";

test("defaults produce a finite, bounded body shape", () => {
  const shape = bodyShape();

  assert.equal(shape.height, 178);
  assert.equal(shape.weight, 78);
  assert.ok(Number.isFinite(shape.bmi));
  assert.ok(shape.bodyFatPercent >= 4 && shape.bodyFatPercent <= 45);
  assert.ok(shape.bulk >= 0 && shape.bulk <= 1);
  assert.ok(shape.fat >= 0 && shape.fat <= 1);
});

test("estimated body fat increases with BMI and accounts for gender and age", () => {
  const lean = bodyShape({ gender: "male", height: 178, weight: 65, age: 25 });
  const heavier = bodyShape({ gender: "male", height: 178, weight: 85, age: 25 });
  const older = bodyShape({ gender: "male", height: 178, weight: 65, age: 65 });
  const female = bodyShape({ gender: "female", height: 165, weight: 60, age: 25 });

  assert.ok(heavier.bodyFatPercent > lean.bodyFatPercent);
  assert.ok(older.bodyFatPercent > lean.bodyFatPercent);
  assert.ok(female.bodyFatPercent > bodyShape({ gender: "male", height: 165, weight: 60, age: 25 }).bodyFatPercent);
});

test("body proportions change gradually across practical weights", () => {
  const light = bodyShape({ gender: "male", height: 178, weight: 65, age: 30 });
  const heavy = bodyShape({ gender: "male", height: 178, weight: 100, age: 30 });

  assert.ok(heavy.waist > light.waist);
  assert.ok(heavy.waist - light.waist < 0.16);
  assert.ok(Math.abs(heavy.shoulder - light.shoulder) < 0.08);
  assert.ok(Math.abs(heavy.thigh - light.thigh) < 0.1);
});

test("invalid and extreme inputs cannot produce unbounded proportions", () => {
  const shape = bodyShape({ gender: "female", height: 1000, weight: -10, age: 1000 });

  assert.equal(shape.height, 210);
  assert.equal(shape.weight, 35);
  assert.equal(shape.age, 85);
  for (const value of Object.values(shape)) {
    if (typeof value === "number") assert.ok(Number.isFinite(value));
  }
});

test("zero and non-numeric inputs use defaults", () => {
  const shape = bodyShape({ height: 0, weight: "invalid", age: NaN });

  assert.equal(shape.height, 178);
  assert.equal(shape.weight, 78);
  assert.equal(shape.age, 28);
});
