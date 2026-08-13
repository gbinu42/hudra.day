import { HymnReshQalaRef } from "./reshQala";

// Person entity - for authors, performers, contributors
export interface Person {
  id: string;
  name: string;
  nameInSyriac?: string;
  biography?: string;
  birthYear?: number;
  deathYear?: number;
  church?: string; // Which church tradition they belong to
  role?: string[]; // e.g., "composer", "performer", "translator"
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface CreatePersonData {
  name: string;
  nameInSyriac?: string;
  biography?: string;
  birthYear?: number;
  deathYear?: number;
  church?: string;
  role?: string[];
}

// Title in multiple languages
export interface HymnTitle {
  language: string; // e.g., "english", "syriac", "malayalam", "arabic"
  title: string;
  transliteration?: string;
}

// Author reference
export interface HymnAuthor {
  id?: string; // Reference to Person
  name: string; // For display
}

// One liturgical placement (a hymn may have several distinct ones).
// Flat seasons/hours/days/weeks/services/occasions on Hymn are derived from these.
export interface HymnLiturgicalUse {
  seasonId?: string;
  week?: number;
  dayId?: string;
  hourId?: string;
  /** For Ramsha: qadmaye (first) or dahraye (other) */
  hourVariantId?: string;
  serviceId?: string;
  anaphoraId?: string;
  occasionId?: string;
  /** Onitha slot/kind (d'Qdam, d'Wathar, …) - not a genre */
  onyathaKindId?: string;
  note?: string;
}

// Structured reference to a source book
export interface HymnSource {
  book: string;
  volume?: string;
  page?: string;
}

// "Qale d'Udrane" catalogue reference. These ~70 onyatha are numbered within
// the Qale d'Udrane collection as "Qala N" with an optional "Variant M". This
// is a separate cataloguing tag, independent of the liturgical placements and
// genre/resh-qala tags (which still apply to these hymns).
export interface QaleDUdraneRef {
  qala: number; // Qala number within the collection (1-28+)
  variant?: number; // Optional variant number
}

// Hymn image group - multiple images from the same source
export interface HymnImageGroup {
  churchName?: string; // e.g., "Syro-Malabar", "Assyrian", "Chaldean", "Ancient Church of the East"
  images: string[]; // Array of image URLs
  description?: string;
  source?: string; // Book or source name
}

// Translation associated with a text version
export interface TextTranslation {
  language: string;
  text: string;
  translatorId?: string; // Reference to Person
  translatorName?: string; // For display
  notes?: string;
}

// Text version for different churches
export interface ChurchTextVersion {
  churchName: string;
  text: string; // The actual hymn text in this tradition
  isMainVersion: boolean; // Is this the primary version?
  notes?: string;
  translations?: TextTranslation[]; // Translations associated with this text version
}

// Recording - audio, video, or link
export type RecordingType = "audio" | "video" | "youtube" | "link";

export type RecordingStatus = "pending" | "approved" | "rejected";

export interface HymnRecording {
  id: string;
  type: RecordingType;
  url: string; // Firebase Storage URL or external URL
  originalUrl?: string; // Original URL provided by user (for audio/video with file upload)
  title?: string;
  performers?: Array<{
    id?: string; // Reference to Person (optional)
    name: string; // Display name (required)
  }>; // Multiple performers
  contributorId: string; // User who added this recording
  contributorName: string; // For display
  status: RecordingStatus; // Approval status
  year?: number; // Year of recording/performance
  duration?: string; // e.g., "3:45"
  description?: string;
  church?: string; // Which tradition this recording follows
  adminAudioUrl?: string; // Admin-only audio file for YouTube videos
  createdAt: Date;
}

export interface CreateRecordingData {
  type: RecordingType;
  url: string;
  originalUrl?: string; // Original URL provided by user (for audio/video with file upload)
  title?: string;
  performers?: Array<{
    id?: string; // Reference to Person (optional)
    name: string; // Display name (required)
  }>; // Multiple performers
  contributorId: string;
  contributorName: string;
  status?: RecordingStatus; // Optional, will be set based on user role
  year?: number;
  duration?: string;
  description?: string;
  church?: string;
  adminAudioUrl?: string; // Admin-only audio file for YouTube videos
}

export interface UnidentifiedRecording {
  id: string;
  type: RecordingType;
  url: string;
  originalUrl?: string;
  title?: string;
  performers?: Array<{
    id?: string;
    name: string;
  }>;
  contributorId: string;
  contributorName: string;
  year?: number;
  duration?: string;
  description?: string;
  church?: string;
  suspectedHymnTitle?: string;
  createdAt: Date;
}

export interface CreateUnidentifiedRecordingData {
  type: RecordingType;
  url: string;
  originalUrl?: string;
  title?: string;
  performers?: Array<{
    id?: string;
    name: string;
  }>;
  contributorId: string;
  contributorName: string;
  year?: number;
  duration?: string;
  description?: string;
  church?: string;
  suspectedHymnTitle?: string;
}

// Main Hymn entity
export interface Hymn {
  id: string;

  // Titles in multiple languages
  titles: HymnTitle[];

  // Basic information
  authors: HymnAuthor[]; // Multiple authors
  authorName?: string; // For backward compatibility and display
  originYear?: number; // Year the hymn was composed

  // Classification
  category?: string; // Genre id / label (see HYMN_GENRES); e.g. "onyatha", "madrasha"
  occasion?: string; // Legacy single occasion (kept for backward compatibility)
  meter?: string; // Poetic meter, if applicable

  // Liturgical tagging
  // liturgicalUses = the placement rows and single source of truth. A hymn can
  // have several distinct uses (different hours, services, weeks, seasons...).
  // Season/hour/etc. are read from these directly; no denormalized copies.
  liturgicalUses?: HymnLiturgicalUse[];
  sources?: HymnSource[]; // structured source book references

  // Separate "Qale d'Udrane" catalogue number (only for hymns in that collection)
  qaleDUdrane?: QaleDUdraneRef;

  // True when this hymn is itself a resh qala (model hymn), not merely sung to one
  isReshQala?: boolean;

  // Resh qale (tunes) this hymn is sung to; a hymn may use more than one (optional)
  reshQale?: HymnReshQalaRef[];

  // Description and context
  description?: string;
  context?: string; // Historical or liturgical context

  // Text content
  text?: string; // The primary hymn text
  translations?: TextTranslation[]; // Translations for the text
  churchVersions: ChurchTextVersion[]; // Different versions for different churches

  // Hymn image groups from different church traditions
  hymnImageGroups: HymnImageGroup[];

  // Recordings
  recordings: HymnRecording[];

  // Metadata
  tags: string[];
  isPublished: boolean;
  addedBy: string; // User ID who added this hymn
  addedByName: string; // Display name
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHymnData {
  titles: HymnTitle[];
  authors?: HymnAuthor[];
  originYear?: number;
  category?: string;
  occasion?: string;
  meter?: string;
  liturgicalUses?: HymnLiturgicalUse[];
  sources?: HymnSource[];
  qaleDUdrane?: QaleDUdraneRef;
  isReshQala?: boolean;
  reshQale?: HymnReshQalaRef[];
  description?: string;
  context?: string;
  text?: string;
  translations?: TextTranslation[];
  churchVersions?: ChurchTextVersion[];
  hymnImageGroups?: HymnImageGroup[];
  recordings?: HymnRecording[];
  tags?: string[];
  isPublished?: boolean;
}

// Common church traditions
export const CHURCH_TRADITIONS = [
  "Syro-Malabar Church",
  "Assyrian Church of the East",
  "Ancient Church of the East",
  "Chaldean Catholic Church",
  "Syro-Malankara Church",
  "Syriac Orthodox Church",
  "Syriac Catholic Church",
  "Maronite Church",
  "Malankara Orthodox Church",
  "Other",
] as const;

export type ChurchTradition = (typeof CHURCH_TRADITIONS)[number];

// Hymn genres (kinds of hymn). All East Syriac liturgical pieces here are sung,
// so every genre `takesReshQala`; a resh qala is still optional per hymn.
export interface HymnGenre {
  id: string;
  label: string;
  syriac?: string;
  takesReshQala: boolean;
}

export const HYMN_GENRES: HymnGenre[] = [
  // Onyatha (slot kinds like d'Qdam / d'Wathar live on liturgicalUses.onyathaKindId)
  { id: "onyatha", label: "Onyatha", syriac: "ܥܘܿܢܝܵܬ݂ܵܐ", takesReshQala: true },
  // Other sung genres
  { id: "h'pakhtha", label: "H'pakhtha", syriac: "ܚܦܵܟ݂ܬܵܐ", takesReshQala: true },
  { id: "l'wakhtha", label: "L'wakhtha", syriac: "ܠܘܵܟ݂ܬܵܐ", takesReshQala: true },
  { id: "madrasha", label: "Madrasha", syriac: "ܡܲܕ݂ܪܵܫܵܐ", takesReshQala: true },
  { id: "soghitha", label: "Soghitha", syriac: "ܣܘܿܓ݂ܝܼܬ݂ܵܐ", takesReshQala: true },
  { id: "bautha", label: "Bautha", syriac: "ܒܵܥܘܼܬ݂ܵܐ", takesReshQala: true },
  { id: "teshbohta", label: "Teshbohta", syriac: "ܬܸܫܒܘܿܚܬܵܐ", takesReshQala: true },
  { id: "turgama", label: "Turgama", syriac: "ܬܘܼܪܓܵܡܵܐ", takesReshQala: true },
  { id: "qala", label: "Qala", syriac: "ܩܵܠܵܐ", takesReshQala: true },
  { id: "qaltha", label: "Qaltha", syriac: "ܩܵܠܬܵܐ", takesReshQala: true },
  { id: "qeryana", label: "Qeryana", syriac: "ܩܸܪܝܵܢܵܐ", takesReshQala: true },
  { id: "qulasa", label: "Qulasa", syriac: "ܩܘܼܠܵܣܵܐ", takesReshQala: true },
  { id: "memra", label: "Memra", syriac: "ܡܹܐܡܪܵܐ", takesReshQala: true },
  { id: "qanona", label: "Qanona", syriac: "ܩܵܢܘܿܢܵܐ", takesReshQala: true },
  { id: "shuraya", label: "Shuraya", syriac: "ܫܘܼܪܵܝܵܐ", takesReshQala: true },
  { id: "hutama", label: "Hutama", syriac: "ܚܘܼܬܵܡܵܐ", takesReshQala: true },
  { id: "enyana", label: "Enyana", syriac: "ܥܸܢܝܵܢܵܐ", takesReshQala: true },
  { id: "zumara", label: "Zumara", syriac: "ܙܘܼܡܵܪܵܐ", takesReshQala: true },
  { id: "psalm", label: "Psalm", syriac: "ܡܲܙܡܘܿܪܵܐ", takesReshQala: true },
  { id: "marmitha", label: "Marmitha", syriac: "ܡܲܪܡܝܼܬ݂ܵܐ", takesReshQala: true },
  { id: "hullala", label: "Hullala", syriac: "ܗܘܼܠܵܠܵܐ", takesReshQala: true },
  { id: "slotha", label: "Slotha", syriac: "ܨܠܘܿܬ݂ܵܐ", takesReshQala: true },
  { id: "karozutha", label: "Karozutha", syriac: "ܟܵܪܘܿܙܘܼܬ݂ܵܐ", takesReshQala: true },
  { id: "pasoqa", label: "Pasoqa", syriac: "ܦܵܣܘܿܩܵܐ", takesReshQala: true },
  { id: "other", label: "Other", takesReshQala: true },
];

/** Map legacy onyatha subtype genre ids / labels to the single `onyatha` genre. */
export function normalizeGenreId(id?: string): string {
  if (!id) return "";
  const lower = id.toLowerCase();
  if (
    lower === "onyatha" ||
    lower === "onitha" ||
    lower.startsWith("onyatha-d-") ||
    lower.startsWith("onyatha d'") ||
    lower.startsWith("onyatha d‘") ||
    lower.startsWith("onitha d'") ||
    lower.startsWith("onitha d‘")
  ) {
    return "onyatha";
  }
  return id;
}

export function getGenreLabel(id?: string): string {
  if (!id) return "";
  const normalized = normalizeGenreId(id);
  return HYMN_GENRES.find((g) => g.id === normalized)?.label || id;
}

// Legacy category list (kept so existing hymns and any old references keep working).
// New tagging uses HYMN_GENRES above.
export const HYMN_CATEGORIES = [
  "Psalm",
  "Onyatha",
  "Onyatha d'Wasaliqe",
  "Onyatha d'Qanke",
  "Onyatha d'Raze",
  "Onyatha d'Sahde",
  "Onyatha d'Annide",
  "H'pakhtha",
  "L'wakhtha",
  "Madrasha (ܡܕܪܫܐ)",
  "Theshbohtha",
  "Turgama",
  "Slotha",
  "Marmitha",
  "Huthama",
  "Karozoutha",
  "Pasoqa",
  "Qala (ܩܘܠܐ)",
  "Qaltha",
  "Memra",
  "Sogitha",
  "Other",
] as const;

export type HymnCategory = (typeof HYMN_CATEGORIES)[number];

// Common occasions
export const HYMN_OCCASIONS = [
  "General",
  "Christmas",
  "Epiphany",
  "Lent",
  "Palm Sunday",
  "Good Friday",
  "Easter",
  "Ascension",
  "Pentecost",
  "Assumption",
  "Saints",
  "Dedication",
  "Funeral",
  "Wedding",
  "Other",
] as const;

export type HymnOccasion = (typeof HYMN_OCCASIONS)[number];

// Church display priority order
export const CHURCH_DISPLAY_ORDER = [
  "Syro-Malabar Church",
  "Chaldean Catholic Church",
  "Assyrian Church of the East",
  "Ancient Church of the East",
  "Syro-Malankara Church",
  "Syriac Orthodox Church",
  "Syriac Catholic Church",
  "Maronite Church",
  "Malankara Orthodox Church",
  "Other",
] as const;

// Distinct colours for each church (for indicators in recordings list)
export const CHURCH_COLORS: Record<string, string> = {
  "Syro-Malabar Church": "#e11d48", // red-600
  "Chaldean Catholic Church": "#2563eb", // blue-600
  "Assyrian Church of the East": "#059669", // emerald-600
  "Ancient Church of the East": "#7c3aed", // violet-600
  "Syro-Malankara Church": "#d97706", // amber-600
  "Syriac Orthodox Church": "#dc2626", // red-700
  "Syriac Catholic Church": "#0284c7", // sky-600
  "Maronite Church": "#65a30d", // lime-600
  "Malankara Orthodox Church": "#c026d3", // fuchsia-600
  Other: "#6b7280", // gray-500
};

// Helper function to sort by church priority
export function sortByChurchPriority<
  T extends { churchName?: string; church?: string }
>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const churchA = a.churchName || a.church || "";
    const churchB = b.churchName || b.church || "";

    // Groups without church tradition (undefined, empty string) come first
    const isGeneralA = !a.churchName || churchA === "";
    const isGeneralB = !b.churchName || churchB === "";

    if (isGeneralA && !isGeneralB) return -1;
    if (!isGeneralA && isGeneralB) return 1;
    if (isGeneralA && isGeneralB) return 0;

    const indexA = CHURCH_DISPLAY_ORDER.indexOf(churchA as ChurchTradition);
    const indexB = CHURCH_DISPLAY_ORDER.indexOf(churchB as ChurchTradition);

    // If not found in order list, put at end
    const priorityA = indexA === -1 ? 999 : indexA;
    const priorityB = indexB === -1 ? 999 : indexB;

    return priorityA - priorityB;
  });
}
