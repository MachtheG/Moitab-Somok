import type { Submission } from "./schema";

/**
 * Where submissions go. Pick with FORMS_ADAPTER = console | resend | supabase.
 *  - resend:   RESEND_API_KEY, FORMS_TO_EMAIL, FORMS_FROM_EMAIL
 *  - supabase: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (table `submissions`: kind text, data jsonb, received_at timestamptz)
 * Personal data is never logged in production by the console adapter.
 */
type Adapter = (s: Submission) => Promise<void>;

const consoleAdapter: Adapter = async (s) => {
  if (process.env.NODE_ENV === "production") console.info(`[forms] ${s.kind} received ${s.receivedAt}`);
  else console.info("[forms]", JSON.stringify(s));
};

const resend: Adapter = async (s) => {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.FORMS_FROM_EMAIL,
      to: process.env.FORMS_TO_EMAIL,
      subject: `[${s.kind}] ${String(s.data.name ?? "")}`.slice(0, 120),
      text: Object.entries(s.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`).join("\n"),
    }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
};

const supabase: Adapter = async (s) => {
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ kind: s.kind, data: s.data, received_at: s.receivedAt }),
  });
  if (!res.ok) throw new Error(`supabase ${res.status}`);
};

export function getAdapter(): Adapter {
  switch (process.env.FORMS_ADAPTER) {
    case "resend": return resend;
    case "supabase": return supabase;
    default: return consoleAdapter;
  }
}
