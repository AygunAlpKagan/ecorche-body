# ecorche-body

Parametric anatomy figure for fitness apps. Feed **gender, height, weight, age** plus **primary / secondary** muscle ids; get a rotatable 3D body or a 2D front/back sheet.

Original geometry. No third-party anatomy assets.

```bash
npm install ecorche-body three
```

```jsx
import { Body3D, Body2D } from "ecorche-body";
import "ecorche-body/style.css";

<Body3D
  gender="male"
  height={175}
  weight={75}
  age={18}
  primary={["chest"]}
  secondary={["shoulders", "triceps"]}
  autoRotate
/>

<Body2D
  view="both"
  gender="female"
  height={165}
  weight={60}
  primary={["glutes"]}
  secondary={["hamstrings"]}
/>
```

## Props

| Prop | Type | Notes |
| --- | --- | --- |
| `gender` | `"male"` \| `"female"` | Shoulder/hip proportions |
| `height` | number (cm) | Scales stature |
| `weight` | number (kg) | Scales bulk |
| `age` | number | Softens definition |
| `primary` | `string[]` | Hot highlight (blue) |
| `secondary` | `string[]` | Warm highlight (pink) |
| `view` | `"front"` \| `"back"` \| `"both"` | Body2D only |
| `autoRotate` | boolean | Body3D only |

Muscle ids: `chest`, `shoulders`, `biceps`, `triceps`, `forearms`, `abdominals`, `obliques`, `lats`, `middle back`, `lower back`, `traps`, `neck`, `glutes`, `abductors`, `adductors`, `quadriceps`, `hamstrings`, `calves`.

Peer dependency: `three` >= 0.160, React >= 18.
