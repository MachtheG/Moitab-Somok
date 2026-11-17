/** Line-level parser for `pdftotext -layout` output of NG-CDF code lists. */

export type RawRow = {
  list: number; // sub-list index within the document (S/No restarts → new list)
  sn: number;
  code: string;
  name: string;
  activity: string;
  amount: number;
  status: string;
  heading: string | null;
};

type Cols = { code: number | null; name: number; activity: number };

const AMOUNT = /(\d{1,3}(?:,\d{3})+|\d+)\.\d{2}/;
const STATUS = /\b(new|ongoing|on-going|completed?)\b\s*$/i;
const ROW_START = /^\s{0,6}(\d{1,3})\.?\s+\S/;
const BOILER =
  /NATIONAL GOVERNMENT CONSTITUENCIES|APPROVED PROJECTS|PROJECTS? PROPOSAL|PROJEC PROPOSAL|KIPKELION WEST CONSTITUENCY|Constituency: KIPKELION|^\s*Page \d+ of \d+|ALLOCATED \(Kshs\)|AMOUNT \(KSH\)/i;

function isHeader(line: string) {
  return /S\/NO/i.test(line);
}

function readCols(line: string): Cols {
  const up = line.toUpperCase();
  const code = up.indexOf("PROJECT CODE");
  let name = up.indexOf("NAME OF PROJECT");
  if (name < 0) name = up.indexOf("PROJECT NAME");
  let activity = up.indexOf("ACTIVITIES");
  if (activity < 0) activity = up.indexOf("PROJECT ACTIVITY");
  return { code: code >= 0 ? code : null, name, activity };
}

/**
 * Choose a column cut near `at`. Prefer the end of a 2+ space gap within ±8
 * chars (true column gutter); otherwise move left so no word is split.
 */
function safeCut(line: string, at: number) {
  let best: number | null = null;
  for (const m of line.matchAll(/ {2,}/g)) {
    const end = (m.index ?? 0) + m[0].length;
    if (Math.abs(end - at) <= 8 && (best === null || Math.abs(end - at) < Math.abs(best - at))) best = end;
  }
  if (best !== null) return best;
  let i = Math.min(at, line.length);
  while (i > 0 && line[i - 1] !== " " && line[i] !== undefined && line[i] !== " ") i--;
  return i;
}

function isHeading(line: string) {
  const t = line.trim();
  if (!t || AMOUNT.test(t) || t.length > 60) return false;
  const letters = t.replace(/[^A-Za-z]/g, "");
  return letters.length >= 4 && letters === letters.toUpperCase() && !/^TOTALS?$|GRAND TOTAL/i.test(t);
}

function split(line: string, cols: Cols) {
  const m = line.match(AMOUNT);
  const end = m?.index ?? line.length;
  const body = line.slice(0, end);
  const nameAt = safeCut(body, cols.name);
  const actAt = Math.max(nameAt, safeCut(body, cols.activity));
  const codePart = cols.code !== null ? body.slice(0, nameAt) : "";
  return {
    code: codePart.replace(/^\s*\d{1,3}\.?\s+/, "").trim(),
    name: body.slice(cols.code !== null ? nameAt : 0, actAt).replace(/^\s*\d{1,3}\.?\s+/, "").trim(),
    activity: body.slice(actAt).trim(),
    amount: m ? Number(m[0].replace(/,/g, "")) : null,
    status: (line.slice(end).match(STATUS)?.[1] ?? "").toLowerCase(),
  };
}

export function parseLines(lines: string[]) {
  const rows: RawRow[] = [];
  const docTotals: number[] = [];
  let cols: Cols = { code: null, name: 5, activity: 24 };
  let heading: string[] = [];
  let headingOpen = false;
  let list = 1;
  let lastSn = 0;
  let cur: (RawRow & { open: boolean }) | null = null;

  const close = () => {
    if (cur && cur.amount > 0) rows.push({ ...cur });
    cur = null;
  };

  for (const line of lines) {
    if (!line.trim() || BOILER.test(line)) {
      headingOpen = false;
      continue;
    }
    if (isHeader(line)) {
      cols = readCols(line);
      continue;
    }
    if (/\bTOTALS?\b/i.test(line) && AMOUNT.test(line)) {
      close();
      docTotals.push(Number(line.match(AMOUNT)![0].replace(/,/g, "")));
      continue;
    }
    const start = line.match(ROW_START);
    if (start && (AMOUNT.test(line) || Number(start[1]) === lastSn + 1)) {
      close();
      const sn = Number(start[1]);
      if (sn <= lastSn && sn === 1) list++;
      lastSn = sn;
      const s = split(line, cols);
      cur = {
        list, sn, code: s.code, name: s.name, activity: s.activity,
        amount: s.amount ?? 0, status: s.status,
        heading: heading.length ? heading.join(" ") : null, open: true,
      };
      headingOpen = false;
      continue;
    }
    if (isHeading(line) && (line.search(/\S/) <= 10 || !cur)) {
      close();
      heading = headingOpen ? [...heading, line.trim()] : [line.trim()];
      headingOpen = true;
      continue;
    }
    if (cur) {
      const s = split(line, cols);
      if (s.code) cur.code = `${cur.code}${s.code}`;
      if (s.name) cur.name = `${cur.name} ${s.name}`.trim();
      if (s.activity) cur.activity = `${cur.activity} ${s.activity}`.trim();
      if (s.amount && !cur.amount) cur.amount = s.amount;
      if (s.status && !cur.status) cur.status = s.status;
    }
  }
  close();
  return { rows, docTotals };
}
