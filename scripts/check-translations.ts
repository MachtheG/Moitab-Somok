/** Fails if any EN/SW message file is missing a key the other has, or has an empty string. */
import { readFileSync } from "node:fs";
import path from "node:path";
import { namespaces } from "../i18n/namespaces";

const ROOT = path.resolve(__dirname, "..");
const LOCALES = ["en", "sw"] as const;

type Json = { [k: string]: string | Json };
const flatten = (o: Json, pre = ""): Record<string, string> =>
  Object.entries(o).reduce<Record<string, string>>((acc, [k, v]) => {
    const key = pre ? `${pre}.${k}` : k;
    return typeof v === "string" ? { ...acc, [key]: v } : { ...acc, ...flatten(v, key) };
  }, {});

let errors = 0;
for (const ns of namespaces) {
  const files = Object.fromEntries(
    LOCALES.map((l) => [l, flatten(JSON.parse(readFileSync(path.join(ROOT, "messages", l, `${ns}.json`), "utf8")))]),
  ) as Record<(typeof LOCALES)[number], Record<string, string>>;
  for (const a of LOCALES)
    for (const b of LOCALES) {
      if (a === b) continue;
      for (const key of Object.keys(files[a])) {
        if (!(key in files[b])) { console.error(`✗ ${b}/${ns}.json missing "${key}"`); errors++; }
      }
    }
  for (const l of LOCALES)
    for (const [k, v] of Object.entries(files[l])) if (!v.trim()) { console.error(`✗ ${l}/${ns}.json "${k}" is empty`); errors++; }
}
if (errors) { console.error(`\n${errors} translation problem(s).`); process.exit(1); }
console.log(`✓ ${namespaces.length} namespaces × ${LOCALES.length} locales in sync`);
