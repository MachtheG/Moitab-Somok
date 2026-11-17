import { NextResponse } from "next/server";
import { getAdapter } from "@/lib/forms/adapters";
import { rateLimit } from "@/lib/forms/rate-limit";
import { KINDS, schemas, type FormKind } from "@/lib/forms/schema";

export async function POST(req: Request, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!KINDS.includes(kind as FormKind)) return NextResponse.json({ ok: false }, { status: 404 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "anon";
  if (!rateLimit(`${kind}:${ip}`)) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "server" }, { status: 400 }); }

  const parsed = schemas[kind as FormKind].safeParse(body);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0] ?? "server")))];
    // Honeypot / too-fast: pretend success so bots learn nothing.
    if (fields.includes("website")) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, fields }, { status: 422 });
  }
  const { website: _hp, startedAt, ...data } = parsed.data as Record<string, unknown> & { website?: string; startedAt?: number };
  if (startedAt && Date.now() - startedAt < 2500) return NextResponse.json({ ok: true }); // too fast to be human

  try {
    await getAdapter()({ kind: kind as FormKind, data, receivedAt: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[forms] adapter failed", (e as Error).message);
    return NextResponse.json({ ok: false, error: "server" }, { status: 502 });
  }
}
