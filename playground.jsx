import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Body2D, Body3D, GROUP_NAMES, MUSCLE_IDS } from "./src/index.js";

const ids = MUSCLE_IDS;

function Play() {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [age, setAge] = useState(28);
  const [primary, setPrimary] = useState("chest");
  const [secondary, setSecondary] = useState("shoulders");
  const [pose, setPose] = useState("rest");
  const extras = useMemo(() => (secondary && secondary !== primary ? [secondary] : []), [primary, secondary]);

  return (
    <main className="play">
      <header>
        <p className="kicker">npm · ecorche-body</p>
        <h1>Anatomik vücut, kas boyama</h1>
        <p>
          Cinsiyet, boy, kilo ve yaşa göre erkek/kadın GLB modeli. Primary kırmızı, secondary turuncu.
        </p>
      </header>

      <section className="controls">
        <label>
          Cinsiyet
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
          </select>
        </label>
        <label>
          Boy {height} cm
          <input type="range" min="150" max="200" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </label>
        <label>
          Kilo {weight} kg
          <input type="range" min="45" max="120" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
        </label>
        <label>
          Yaş {age}
          <input type="range" min="16" max="70" value={age} onChange={(e) => setAge(Number(e.target.value))} />
        </label>
        <label>
          Primary
          <select value={primary} onChange={(e) => setPrimary(e.target.value)}>
            {ids.map((id) => <option key={id} value={id}>{id}</option>)}
          </select>
        </label>
        <label>
          Secondary
          <select value={secondary} onChange={(e) => setSecondary(e.target.value)}>
            <option value="">— yok —</option>
            {ids.map((id) => <option key={id} value={id}>{id}</option>)}
          </select>
        </label>
        <label>
          Poz
          <select value={pose} onChange={(e) => setPose(e.target.value)}>
            <option value="rest">Dinlenme</option>
            <option value="curl">Dirsek bükülü</option>
            <option value="squat">Squat</option>
          </select>
        </label>
      </section>

      <Body3D
        baseUrl="/"
        gender={gender}
        height={height}
        weight={weight}
        age={age}
        primary={[primary]}
        secondary={extras}
        pose={pose}
        autoRotate={false}
      />

      <h2>Ön / arka (Body2D)</h2>
      <Body2D
        baseUrl="/"
        gender={gender}
        height={height}
        weight={weight}
        age={age}
        primary={[primary]}
        secondary={extras}
        pose={pose}
      />

      <details>
        <summary>Anatomik grup adları ({GROUP_NAMES.length})</summary>
        <p>{GROUP_NAMES.join(" · ")}</p>
      </details>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<Play />);
