import { useRef } from "react";
import { CREDITS } from "./muscles.js";
import { useViewer } from "./useViewer.js";

export function Body3D({
  gender = "male",
  height,
  weight,
  age,
  primary = [],
  secondary = [],
  primaryColor,
  secondaryColor,
  autoRotate = true,
  pose = "rest",
  modelUrl,
  baseUrl,
  credit = false,
  className = "",
}) {
  const canvasRef = useRef(null);
  useViewer(canvasRef, {
    view: "orbit",
    gender,
    height,
    weight,
    age,
    primary,
    secondary,
    primaryColor,
    secondaryColor,
    autoRotate,
    pose,
    modelUrl,
    baseUrl,
  });

  return (
    <div className={`ecorche-3d ${className}`.trim()}>
      <canvas ref={canvasRef} aria-label="3D anatomy figure" />
      <p className="ecorche-hint">Sürükle, dön.</p>
      {credit && <p className="ecorche-credit">{CREDITS}</p>}
    </div>
  );
}
