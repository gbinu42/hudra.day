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

// Book page image group - multiple images from the same source
export interface BookPageImageGroup {
  churchName: string; // e.g., "Syro-Malabar", "Assyrian", "Chaldean", "Ancient Church of the East"
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

export interface HymnRecording {
  id: string;
  type: RecordingType;
  url: string; // Firebase Storage URL or external URL
  title?: string;
  performerId?: string; // Reference to Person
  performerName?: string; // For display
  contributorId: string; // User who added this recording
  contributorName: string; // For display
  year?: number; // Year of recording/performance
  duration?: string; // e.g., "3:45"
  description?: string;
  church?: string; // Which tradition this recording follows
  createdAt: Date;
}

export interface CreateRecordingData {
  type: RecordingType;
  url: string;
  title?: string;
  performerId?: string;
  performerName?: string;
  contributorId: string;
  contributorName: string;
  year?: number;
  duration?: string;
  description?: string;
  church?: string;
}

// Main Hymn entity
export interface Hymn {
  id: string;

  // Titles in multiple languages
  titles: HymnTitle[];

  // Basic information
  authors: HymnAuthor[]; // Multiple authors
  originYear?: number; // Year the hymn was composed

  // Classification
  category?: string; // e.g., "Prayer", "Hymn", "Liturgical", "Devotional"
  occasion?: string; // e.g., "Christmas", "Easter", "Lent", "General"
  meter?: string; // Poetic meter, if applicable

  // Description and context
  description?: string;
  context?: string; // Historical or liturgical context

  // Text content
  text?: string; // The primary hymn text
  translations?: TextTranslation[]; // Translations for the text
  churchVersions: ChurchTextVersion[]; // Different versions for different churches

  // Book page image groups from different church traditions
  bookPageImageGroups: BookPageImageGroup[];

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
  description?: string;
  context?: string;
  text?: string;
  translations?: TextTranslation[];
  churchVersions?: ChurchTextVersion[];
  bookPageImageGroups?: BookPageImageGroup[];
  recordings?: HymnRecording[];
  tags?: string[];
  isPublished?: boolean;
}

// Common church traditions
export const CHURCH_TRADITIONS = [
  "Syro-Malabar",
  "Syro-Malankara",
  "Assyrian Church of the East",
  "Ancient Church of the East",
  "Chaldean Catholic",
  "Syriac Orthodox",
  "Syriac Catholic",
  "Maronite",
  "Malankara Orthodox",
  "Other",
] as const;

export type ChurchTradition = (typeof CHURCH_TRADITIONS)[number];

// Common categories
export const HYMN_CATEGORIES = [
  "Prayer",
  "Hymn",
  "Psalm",
  "Onyatha",
  "Slotha",
  "Karozoutha",
  "Qala (ܩܘܠܐ)",
  "Madrasha (ܡܕܪܫܐ)",
  "Sedreh (ܣܕܪܐ)",
  "Liturgical",
  "Devotional",
  "Seasonal",
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
  "Syro-Malabar",
  "Chaldean Catholic",
  "Assyrian Church of the East",
  "Ancient Church of the East",
  "Syro-Malankara",
  "Syriac Orthodox",
  "Syriac Catholic",
  "Maronite",
  "Malankara Orthodox",
  "Other",
] as const;

// Helper function to sort by church priority
export function sortByChurchPriority<
  T extends { churchName?: string; church?: string }
>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const churchA = a.churchName || a.church || "";
    const churchB = b.churchName || b.church || "";
    const indexA = CHURCH_DISPLAY_ORDER.indexOf(churchA as any);
    const indexB = CHURCH_DISPLAY_ORDER.indexOf(churchB as any);

    // If not found in order list, put at end
    const priorityA = indexA === -1 ? 999 : indexA;
    const priorityB = indexB === -1 ? 999 : indexB;

    return priorityA - priorityB;
  });
}
