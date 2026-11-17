import type { ReactNode } from "react";

const MARK = /(\[\[TO CONFIRM[^\]]*\]\])/g;

/**
 * Render copy that may contain [[TO CONFIRM: …]] placeholders. Placeholders stay
 * visible (CLAUDE.md rule 1) but are styled as obvious gaps, never as content.
 */
export function rich(text: string): ReactNode {
  if (!text.includes("[[TO CONFIRM")) return text;
  return text.split(MARK).map((part, i) =>
    MARK.test(part) ? (
      <span key={i} className="to-confirm" title="Awaiting confirmation from the campaign">
        {part.replace(/^\[\[|\]\]$/g, "")}
      </span>
    ) : (
      part
    ),
  );
}

export const isToConfirm = (text: string) => text.includes("[[TO CONFIRM");
