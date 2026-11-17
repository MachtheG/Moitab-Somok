import type { Config } from "tailwindcss";
import base from "../tailwind.config";

/**
 * Compiles the design-system stylesheet. Same theme as the site; content is
 * the exported components + authored previews, and the locked palette + type
 * utilities are safelisted so designs can use them.
 */
const config: Config = {
  ...base,
  content: [
    "../components/ui/**/*.tsx",
    "../components/shared/hat-trick.tsx",
    "../.design-sync/previews/**/*.tsx",
  ],
  safelist: [
    { pattern: /^(bg|text|border|ring|fill|stroke|from|to|via|outline|decoration)-(uda|forest|onyx)-(50|100|200|300|400|500|600|700|800|850|900|950)$/ },
    { pattern: /^(bg|text|border|ring|fill|stroke)-party-(yellow|gold|green|black|white)$/ },
    { pattern: /^(bg|text|border)-(black|white)$/ },
    { pattern: /^font-(display|sans|mono)$/ },
    { pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/ },
    { pattern: /^font-(light|normal|medium|semibold|bold|extrabold)$/ },
    { pattern: /^tracking-(tightest|tighter|tight|normal|wide|widest)$/ },
  ],
};

export default config;
