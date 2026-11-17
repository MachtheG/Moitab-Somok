/** Fails on any hex colour in app/, components/, lib/, data/ or tailwind config that is not in docs/COLOR-LOCK.md. */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const HEX = /#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
const locked = new Set((readFileSync(path.join(ROOT, "docs/COLOR-LOCK.md"), "utf8").match(HEX) ?? []).map((h) => h.toUpperCase()));
const RGB = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g;
const toHex = (r: string, g: string, b: string) => "#" + [r, g, b].map((n) => Number(n).toString(16).padStart(2, "0")).join("").toUpperCase();

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    if (["node_modules", ".next", "raw"].includes(f)) return [];
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = [...["app", "components", "lib", "data"].flatMap((d) => walk(path.join(ROOT, d))), path.join(ROOT, "tailwind.config.ts")].filter((f) =>
  /\.(tsx?|css|mjs|json)$/.test(f),
);
let bad = 0;
for (const f of files) {
  const text = readFileSync(f, "utf8");
  const found = [...(text.match(HEX) ?? []), ...[...text.matchAll(RGB)].map((m) => toHex(m[1]!, m[2]!, m[3]!))];
  for (const h of found) {
    const full = h.length === 4 ? "#" + [...h.slice(1)].map((c) => c + c).join("") : h;
    if (!locked.has(full.toUpperCase())) { console.error(`✗ ${path.relative(ROOT, f)}: ${h} not in COLOR-LOCK`); bad++; }
  }
}
if (bad) process.exit(1);
console.log(`✓ ${files.length} files; every colour is in COLOR-LOCK (${locked.size} locked)`);
