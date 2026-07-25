import type { ReactNode } from "react";

/** Syriac block + related extended letters */
const SYRIAC_RUN = /([\u0700-\u074F\u0860-\u086F]+)/g;

/**
 * Render a mixed Latin/Syriac string, applying East Syriac Adiabene to Syriac runs.
 */
export function renderWithSyriacFont(text: string): ReactNode {
  const parts = text.split(SYRIAC_RUN);
  return parts.map((part, i) => {
    if (!part) return null;
    if (/^[\u0700-\u074F\u0860-\u086F]+$/.test(part)) {
      return (
        <span
          key={i}
          className="font-east-syriac-adiabene"
          dir="rtl"
          lang="syr"
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
