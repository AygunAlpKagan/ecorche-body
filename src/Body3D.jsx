import { useEffect, useRef } from "react";
import { bodyShape } from "./shape.js";
import { buildFigure, createScene } from "./figure3d.js";

export function Body3D({
  gender = "male",
  height,
  weight,
  age,
  primary = [],
  secondary = [],
  autoRotate = true,
  className = "",
}) {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const shape = bodyShape({ gender, height, weight, age });
  const key = JSON.stringify({ gender, height, weight, age, primary, secondary, autoRotate });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const engine = createScene(canvas, { autoRotate });
    engine.setFigure(buildFigure(shape, primary, secondary));
    engineRef.current = engine;
    return () => {
      engine.dispose();
      engineRef.current = null;
    };
  }, [key]);

  return (
    <div className={`ecorche-3d ${className}`.trim()}>
      <canvas ref={canvasRef} aria-label="3D anatomy figure" />
      <p className="ecorche-hint">Sürükle, dön.</p>
    </div>
  );
}
