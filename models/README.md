# Anatomy models

| File | Description |
| --- | --- |
| `male_anatomy_mobile.glb` | Male, ~54k vertices |
| `female_anatomy_mobile.glb` | Female, ~55k vertices |
| `muscles.json` | Muscle ids, groups, joints |

glTF 2.0, meters, +Y up, facing +Z.

Vertex attributes: `POSITION`, `NORMAL`, `COLOR_0`, `JOINTS_0`, `WEIGHTS_0`, `_MUSCLE`.

`_MUSCLE` matches `muscles[].id`. `groups` lists fitness muscle groups.

Credits: MakeHuman (CC0) body. Z-Anatomy / BodyParts3D (CC BY-SA 4.0) muscle map.
