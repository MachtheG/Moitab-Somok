/** Canonical site URL. Set NEXT_PUBLIC_SITE_URL in Vercel; falls back to the Vercel URL, then localhost. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
