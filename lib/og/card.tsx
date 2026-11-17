/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

/** Shared OG / WhatsApp card in the night palette with the hat-trick dots. */
export function ogCard({ kicker, big, label, source, size }: { kicker: string; big: string; label: string; source?: string; size: { width: number; height: number } }) {
  const square = size.width === size.height;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#002900", color: "#FFFFFF", padding: square ? 80 : 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: 28, background: "#FFC700" }} />
          <div style={{ width: 28, height: 28, borderRadius: 28, background: "#FFC700" }} />
          <div style={{ width: 28, height: 28, borderRadius: 28, border: "4px solid #FFC700" }} />
          <div style={{ marginLeft: 18, fontSize: 26, letterSpacing: 4, color: "#FFC700", textTransform: "uppercase" }}>{kicker}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: square ? 168 : 132, fontWeight: 800, lineHeight: 1, color: "#FFC700", letterSpacing: -4 }}>{big}</div>
          <div style={{ fontSize: square ? 48 : 42, marginTop: 24, lineHeight: 1.2, maxWidth: square ? 900 : 1000 }}>{label}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#FFFFFF" }}>
          <div>Hilary Kosgei · Kipkelion West · 10.08.2027</div>
          {source && <div style={{ color: "#FFC700" }}>{source}</div>}
        </div>
      </div>
    ),
    size,
  );
}
