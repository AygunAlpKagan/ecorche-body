import { createRoot } from "react-dom/client";
import { Body2D, Body3D } from "./src/index.js";

function Play() {
  return (
    <main style={{ display: "grid", gap: "1.5rem", maxWidth: 880, margin: "0 auto" }}>
      <h1>ecorche-body</h1>
      <Body3D gender="male" height={178} weight={82} primary={["chest"]} secondary={["shoulders", "triceps"]} />
      <Body2D gender="male" height={178} weight={82} primary={["chest"]} secondary={["shoulders"]} labeled />
      <Body2D gender="female" height={165} weight={60} primary={["glutes"]} secondary={["hamstrings"]} labeled />
    </main>
  );
}

createRoot(document.getElementById("root")).render(<Play />);
