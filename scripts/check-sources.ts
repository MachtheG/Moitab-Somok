/**
 * Fails if any data file cites a source id that is not in data/sources.ts,
 * or a source is missing title/outlet/url. Also counts [[TO CONFIRM]] markers.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { sources } from "../data/sources";

const ROOT = path.resolve(__dirname, "..");
const ids = new Set<string>(sources.map((s) => s.id));
let errors = 0;

for (const s of sources) {
  if (!s.title || !s.outlet || !/^https?:\/\//.test(s.url)) { console.error(`✗ source ${s.id} incomplete`); errors++; }
}

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? (f === "raw" ? [] : walk(p)) : [p];
  });

// Citation fields only: sourceId / sourceIds / basis, plus `satisfies SourceId` literals.
const CITE = /(?:sourceIds?|basis)\s*:\s*(\[[^\]]*\]|"[^"]+")|"[\w-]+"\s+satisfies\s+SourceId/g;
let toConfirm = 0;
for (const file of walk(path.join(ROOT, "data")).filter((f) => f.endsWith(".ts") && !f.endsWith("sources.ts"))) {
  const text = readFileSync(file, "utf8");
  toConfirm += (text.match(/\[\[TO CONFIRM/g) ?? []).length;
  for (const m of text.matchAll(CITE)) {
    for (const id of m[0].match(/"([\w-]+)"/g) ?? []) {
      const clean = id.slice(1, -1);
      if (!ids.has(clean)) {
        console.error(`✗ ${path.relative(ROOT, file)} cites unknown source "${clean}"`);
        errors++;
      }
    }
  }
}
for (const l of ["en", "sw"])
  for (const f of readdirSync(path.join(ROOT, "messages", l)).filter((f) => f.endsWith(".json")))
    toConfirm += (readFileSync(path.join(ROOT, "messages", l, f), "utf8").match(/\[\[TO CONFIRM/g) ?? []).length;

if (errors) { console.error(`\n${errors} source problem(s).`); process.exit(1); }
console.log(`✓ ${ids.size} sources; all citations resolve. ${toConfirm} [[TO CONFIRM]] markers open.`);
