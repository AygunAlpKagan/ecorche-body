import { useRef } from "react";
import { CREDITS } from "./muscles.js";
import { useViewer } from "./useViewer.js";

export function Body2D({
  gender = "male",
  height,
  weight,
  age,
  primary = [],
  secondary = [],
  primaryColor,
  secondaryColor,
  view = "both",
  pose = "rest",
  modelUrl,
  baseUrl,
  credit = false,
  className = "",
}) {
  const canvasRef = useRef(null);
  const mode = view === "back" || view === "front" ? view : "both";
  useViewer(canvasRef, {
    view: mode,
    gender,
    height,
    weight,
    age,
    primary,
    secondary,
    primaryColor,
    secondaryColor,
    autoRotate: false,
    pose,
    modelUrl,
    baseUrl,
  });

  return (
    <div className={`ecorche-2d ${mode === "both" ? "sheet" : ""} ${className}`.trim()}>
      <div className="ecorche-2d-stage">
        <canvas ref={canvasRef} aria-label="2D anatomy figure" />
        {mode === "both" && (
          <div className="ecorche-captions">
            <span>Ön</span>
            <span>Arka</span>
          </div>
        )}
      </div>
      {credit && <p className="ecorche-credit">{CREDITS}</p>}
    </div>
  );
}
