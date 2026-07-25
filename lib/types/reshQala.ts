// Resh qala (ܪܝܫ ܩܠܐ) - a model hymn whose name designates the tune a hymn is sung to.
//
// Key domain facts this model encodes:
// - A resh qala is a *name* (of a model hymn), not a melody. Different books may
//   give the same resh qala different names; one may be canonical, or none.
// - Names can be linked circularly (book A: "X also called Y"; book B: the reverse).
//   We collapse such a cluster into a single identity doc holding all the names.
// - The same resh qala can have different tunes in different traditions.
// - The tune is characterised by where the pauses/cadences fall. Texts sung to it
//   may be cleanly isosyllabic or irregular, and different hymns under the same
//   resh qala may have different (irregular) syllable counts. Structure is therefore
//   purely descriptive and never validated against the hymns.

// A book/source attestation of a name
export interface ReshQalaNameSource {
  book: string;
  page?: string;
  tradition?: string;
}

// One name by which this resh qala is attested. `name` holds the (transliterated)
// name and `syriac` holds the same name in Syriac script, paired together.
export interface ReshQalaName {
  name: string; // exactly as written (usually transliterated)
  syriac?: string; // the same name in Syriac script
  language?: string; // e.g. "syriac", "english", "malayalam"
  isCanonical?: boolean; // at most one true across names; often none
  sources?: ReshQalaNameSource[];
}

// A tune is the actual musical realization. Its fingerprint is pause placement.
export interface ReshQalaTune {
  id: string;
  tradition?: string; // e.g. "Assyrian Church of the East"; omit if shared
  pauseStructure?: string; // where the pauses/cadences fall
  syllablePattern?: string; // e.g. "7+7+7+7", "irregular"; descriptive only
  exampleRecordings?: { hymnId: string; recordingId?: string }[];
  notes?: string;
}

export type ReshQalaRelationType =
  | "possibly-same"
  | "tune-variant"
  | "related";

// Link between two resh qala identities that are distinct but connected
export interface ReshQalaRelation {
  reshQalaId: string;
  relation: ReshQalaRelationType;
  note?: string;
}

// One doc = one resh qala identity (cluster of names designating the same model hymn)
export interface ReshQala {
  id: string;
  names: ReshQalaName[];
  type?: string; // genre id of the model hymn (onyatha, madrasha, bautha, ...)
  hymnIds?: string[]; // the model hymn(s) in the archive, if present
  tunes?: ReshQalaTune[];
  related?: ReshQalaRelation[];
  mergedInto?: string; // set when this identity is folded into another
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface CreateReshQalaData {
  names: ReshQalaName[];
  type?: string;
  hymnIds?: string[];
  tunes?: ReshQalaTune[];
  related?: ReshQalaRelation[];
  mergedInto?: string;
  notes?: string;
}

// Reference stored on a hymn, preserving what the source actually says.
// displayName / displaySyriac are denormalized so static hymn pages/search work
// without extra fetches.
export interface HymnReshQalaRef {
  /** Unique id for this assignment (a hymn may use the same resh qala on several parts). */
  id?: string;
  reshQalaId: string;
  displayName?: string; // denormalized canonical/first name (shown in brackets when nameAsGiven differs)
  displaySyriac?: string; // denormalized Syriac of the display name
  nameAsGiven?: string; // name chosen for this hymn; primary label when set
  /** Optional part/section label when a hymn uses more than one qala (e.g. "Part 2"). */
  part?: string;
  source?: ReshQalaNameSource;
  tradition?: string; // if this assignment holds only in one tradition
  tuneId?: string; // optionally pin which tune realization applies
}

export const RESH_QALA_RELATION_LABELS: Record<ReshQalaRelationType, string> = {
  "possibly-same": "Possibly the same",
  "tune-variant": "Tune variant",
  related: "Related",
};

// Best display name for a resh qala: the canonical name, else the first name.
export function getReshQalaDisplayName(reshQala: {
  names?: ReshQalaName[];
}): string {
  const names = reshQala.names || [];
  const canonical = names.find((n) => n.isCanonical);
  return canonical?.name || names[0]?.name || "Untitled resh qala";
}

/** Label for a hymn's resh-qala assignment: chosen name, with canonical in brackets if different. */
export function formatHymnReshQalaLabel(ref: HymnReshQalaRef): string {
  const chosen = ref.nameAsGiven || ref.displayName || ref.reshQalaId;
  if (
    ref.nameAsGiven &&
    ref.displayName &&
    ref.nameAsGiven !== ref.displayName
  ) {
    return `${chosen} (${ref.displayName})`;
  }
  return chosen;
}

// Syriac paired with the display name, if any.
export function getReshQalaDisplaySyriac(reshQala: {
  names?: ReshQalaName[];
}): string | undefined {
  const names = reshQala.names || [];
  const canonical = names.find((n) => n.isCanonical);
  return canonical?.syriac || names[0]?.syriac;
}

// All names of a resh qala as a single searchable list (transliterated + Syriac).
export function getReshQalaAllNames(reshQala: {
  names?: ReshQalaName[];
}): string[] {
  return (reshQala.names || [])
    .flatMap((n) => [n.name, n.syriac])
    .filter((s): s is string => !!s);
}
