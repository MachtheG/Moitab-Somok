/**
 * npm run build:ds → design-system/dist/
 *   index.js   ESM bundle of the exported components (deps external)
 *   index.d.ts + types/  declarations
 *   ds.css     Tailwind-compiled styles (+ tokens + fonts imported)
 */
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, "dist");
const bin = (n) => path.join(here, "..", "node_modules", ".bin", n);

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

await build({
  entryPoints: [path.join(here, "index.ts")],
  outfile: path.join(dist, "index.js"),
  bundle: true,
  format: "esm",
  jsx: "automatic",
  target: "es2020",
  tsconfig: path.join(here, "..", "tsconfig.json"),
  packages: "external",
  banner: { js: '"use client";' },
  logLevel: "warning",
});

execFileSync(bin("tsc"), ["-p", path.join(here, "tsconfig.json")], { stdio: "inherit" });
writeFileSync(path.join(dist, "index.d.ts"), 'export * from "./types/design-system/index";\n');

execFileSync(bin("tailwindcss"), ["-c", path.join(here, "tailwind.config.ts"), "-i", path.join(here, "styles.src.css"), "-o", path.join(dist, "tw.css"), "--minify"], { stdio: "inherit", cwd: here });
cpSync(path.join(here, "tokens.css"), path.join(dist, "tokens.css"));
// One flat file (tokens first) so it can be appended or @imported anywhere.
writeFileSync(path.join(dist, "ds.css"), readFileSync(path.join(here, "tokens.css"), "utf8") + "\n" + readFileSync(path.join(dist, "tw.css"), "utf8"));
console.log("✓ design-system/dist built");
