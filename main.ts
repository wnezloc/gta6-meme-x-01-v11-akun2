// main.ts — gta6-meme-x-01 v11 (akun 2): copy POST.json to the output dir.
// The grader reads /output/POST.json, which names the X post of the meme.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "POST.json");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dst = join(outDir, "POST.json");
const post = JSON.parse(readFileSync(src, "utf8"));
if (typeof post.url !== "string" || !/^https:\/\/x\.com\/\w+\/status\/\d+$/.test(post.url)) {
  throw new Error("POST.json must name one https://x.com/<handle>/status/<id> URL");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

// Guard: do not edit the output path — the grader reads /output/POST.json.
console.log("wrote", dst);
