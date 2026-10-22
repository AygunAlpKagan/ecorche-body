import { useEffect, useRef } from "react";
import { bodyShape } from "./shape.js";
import { createViewer } from "./figure3d.js";

export function useViewer(canvasRef, {
  view = "orbit",
  gender = "male",
  height,
  weight,
  age,
  primary = [],
  secondary = [],
  primaryColor,
  secondaryColor,
  autoRotate = false,
  pose = "rest",
  modelUrl,
  baseUrl,
}) {
  const viewerRef = useRef(null);
  const shape = bodyShape({ gender, height, weight, age });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const viewer = createViewer(canvas, { view, autoRotate });
    viewerRef.current = viewer;
    return () => {
      viewer.dispose();
      viewerRef.current = null;
    };
  }, [view]);

  useEffect(() => {
    viewerRef.current?.setAutoRotate(autoRotate);
  }, [autoRotate]);

  useEffect(() => {
    viewerRef.current?.setFigure({ gender, shape, modelUrl, baseUrl });
  }, [gender, shape.height, shape.weight, shape.bulk, modelUrl, baseUrl]);

  useEffect(() => {
    viewerRef.current?.setHighlight(primary, secondary, primaryColor, secondaryColor);
  }, [primary, secondary, primaryColor, secondaryColor]);

  useEffect(() => {
    viewerRef.current?.setPose(pose);
  }, [pose]);
}
