import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const htmlPath = "C:/Users/alpka/OneDrive/Desktop/viewer.html";
const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "models");
mkdirSync(outDir, { recursive: true });

const html = readFileSync(htmlPath, "utf8");

function extract(id) {
  const open = `<script id="${id}" type="`;
  const startTag = html.indexOf(open);
  if (startTag < 0) throw new Error(`missing ${id}`);
  const gt = html.indexOf(">", startTag);
  const close = html.indexOf("</script>", gt);
  return html.slice(gt + 1, close);
}

function b64ToBuffer(b64) {
  return Buffer.from(b64.trim(), "base64");
}

const muscles = JSON.parse(extract("muscles"));
writeFileSync(join(outDir, "muscles.json"), JSON.stringify(muscles, null, 2));
writeFileSync(join(outDir, "male_anatomy_mobile.glb"), b64ToBuffer(extract("glb-male")));
writeFileSync(join(outDir, "female_anatomy_mobile.glb"), b64ToBuffer(extract("glb-female")));

const male = b64ToBuffer(extract("glb-male"));
const female = b64ToBuffer(extract("glb-female"));
console.log("muscles keys", Object.keys(muscles));
console.log("groups", Object.keys(muscles.groups || {}));
console.log("muscle count", (muscles.muscles || []).length);
console.log("skin_id", muscles.skin_id);
console.log("male bytes", male.length);
console.log("female bytes", female.length);
console.log("male magic", male.subarray(0, 4).toString());
console.log("female magic", female.subarray(0, 4).toString());
console.log("joints", muscles.joints);
console.log("group sample", JSON.stringify(Object.fromEntries(Object.entries(muscles.groups || {}).slice(0, 3)), null, 2));
