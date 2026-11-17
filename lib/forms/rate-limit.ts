/**
 * Fixed-window limiter, per instance. Good enough to blunt casual abuse; on
 * Vercel each function instance keeps its own window. For hard limits, put
 * Vercel Firewall / Upstash in front (see README).
 */
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const h = hits.get(key);
  if (!h || h.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
    return true;
  }
  h.count++;
  return h.count <= limit;
}
