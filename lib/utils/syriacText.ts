/**
 * Strip Syriac vowel points and diacritics, leaving consonants (and punctuation).
 * Covers Syriac points/marks U+0730–U+074A plus common combining marks used with Syriac.
 */
const SYRIAC_POINTING = /[\u0730-\u074A\u0300-\u036F]/g;

export function stripSyriacPointing(text: string): string {
  return text.replace(SYRIAC_POINTING, "");
}

/** Normalize text for Syriac-aware search (strip pointing, collapse whitespace). */
export function normalizeSyriacForSearch(text: string): string {
  return stripSyriacPointing(text).replace(/\s+/g, " ").trim();
}
