// Liturgical tagging vocabularies for East Syriac hymns.
//
// Informed by the hudra.org corpus but deliberately re-classified:
// - hudra.org lists feast days (Hosannas, Lazarus, Easter, ...) as "seasons".
//   Here the cycle SEASONS are only the true Hudra seasons, and feast days are
//   OCCASIONS that belong to a season (via `seasonId`).
// - Feasts are marked maranaya (dominical / of-the-Lord) vs non-maranaya.
// - Some occasions exist only in certain traditions (`churches`).
// - "Raze" (Divine Mysteries) is the Qurbana, a SERVICE, not an office hour.

// -------------------------------------------------------------------------
// Seasons - the true Hudra cycle
// -------------------------------------------------------------------------

export interface LiturgicalSeason {
  id: string;
  english: string;
  syriac: string;
  order: number;
}

export const LITURGICAL_SEASONS: LiturgicalSeason[] = [
  {
    id: "subara",
    english: "Annunciation (Subara)",
    syriac: "ܣܘܼܒܵܪܵܐ",
    order: 1,
  },
  { id: "yalda", english: "Nativity (Yalda)", syriac: "ܝܲܠܕܵܐ", order: 2 },
  { id: "denha", english: "Epiphany (Denha)", syriac: "ܕܸܢܚܵܐ", order: 3 },
  {
    id: "sawma-ramba",
    english: "Great Fast (Sawma Ramba)",
    syriac: "ܨܵܘܡܵܐ ܪܲܒܵܐ",
    order: 4,
  },
  {
    id: "qyamta",
    english: "Resurrection (Qyamta)",
    syriac: "ܩܝܵܡܬܵܐ",
    order: 5,
  },
  { id: "shlihe", english: "Apostles (Shlihe)", syriac: "ܫܠܝܼ̈ܚܹܐ", order: 6 },
  { id: "qayta", english: "Summer (Qayta)", syriac: "ܩܲܝܛܵܐ", order: 7 },
  {
    id: "eliya-sliwa",
    english: "Elijah - Cross (Eliya-Sliwa)",
    syriac: "ܐܹܠܝܼܵܐ - ܨܠܝܼܒ݂ܵܐ",
    order: 8,
  },
  { id: "mushe", english: "Moses (Mushe)", syriac: "ܡܘܼܫܹܐ", order: 9 },
  {
    id: "qudash-etta",
    english: "Dedication of the Church (Qudash Etta)",
    syriac: "ܩܘܼܕܵܫ ܥܹܕܬܵܐ",
    order: 10,
  },
];

// -------------------------------------------------------------------------
// Occasions - feasts, commemorations, rogation days, life/church events
// -------------------------------------------------------------------------

export type OccasionGroup = "feast" | "dukhrana" | "bautha" | "event" | "other";

export interface LiturgicalOccasion {
  id: string;
  english: string;
  syriac?: string;
  group: OccasionGroup;
  seasonId?: string; // season this occasion falls within, if any
  maranaya?: boolean; // for feasts: dominical (of the Lord) vs not
  churches?: string[]; // tradition-specific; omitted = common to all
}

// Values used in `churches` (subset of CHURCH_TRADITIONS in hymn.ts)
const CHALDEAN = "Chaldean Catholic Church";
const SYRO_MALABAR = "Syro-Malabar Church";

export const LITURGICAL_OCCASIONS: LiturgicalOccasion[] = [
  // --- Maranaya (dominical) feasts ---
  {
    id: "nativity",
    english: "Christmas (Yalda)",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܝܲܠܕܹܗ ܕܡܵܪܲܢ",
    group: "feast",
    seasonId: "yalda",
    maranaya: true,
  },
  {
    id: "circumcision",
    english: "Circumcision (Gazorta)",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܓ݂ܙܘܼܪܬܹ݁ܗ ܕܡܵܪܲܢ",
    group: "feast",
    seasonId: "yalda",
    maranaya: true,
  },
  {
    id: "denha-feast",
    english: "Epiphany (Denha)",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܕܸܢܚܵܐ",
    group: "feast",
    seasonId: "denha",
    maranaya: true,
  },
  {
    id: "lazarus",
    english: "Lazarus (La'azar)",
    syriac: "ܥܪܘܼܒ݂ܬܵܐ ܕܠܵܥܵܙܲܪ",
    group: "feast",
    seasonId: "sawma-ramba",
    maranaya: true,
  },
  {
    id: "hosannas",
    english: "Hosannas (Oshane)",
    syriac: "ܐܘܿܫܲܥܢܹ̈ܐ",
    group: "feast",
    seasonId: "sawma-ramba",
    maranaya: true,
  },
  {
    id: "passover",
    english: "Passover (Pesha)",
    syriac: "ܚܲܡܫܵܒ݁ܫܲܒܵܐ ܕܦܸܨܚܵܐ",
    group: "feast",
    seasonId: "sawma-ramba",
    maranaya: true,
  },
  {
    id: "passion",
    english: "Passion (Hasha)",
    syriac: "ܥܪܘܼܒ݂ܬܵܐ ܕܚܲܫܵܐ",
    group: "feast",
    seasonId: "sawma-ramba",
    maranaya: true,
  },
  {
    id: "great-saturday",
    english: "Great Saturday (Shabtha Rabtha)",
    syriac: "ܫܲܒ݁ܬ݂ܵܐ ܪܲܒܬ݂ܵܐ",
    group: "feast",
    seasonId: "sawma-ramba",
    maranaya: true,
  },
  {
    id: "resurrection",
    english: "Resurrection (Qyamta)",
    syriac: "ܚܲܕ݂ܒ݁ܫܲܒܵܐ ܪܲܒܵܐ ܕܩܝܵܡܬܹ݁ܗ ܕܡܵܪܲܢ",
    group: "feast",
    seasonId: "qyamta",
    maranaya: true,
  },
  {
    id: "ascension",
    english: "Ascension (Sulaqa)",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܣܘܼܠܵܩܹܗ ܕܡܵܪܲܢ",
    group: "feast",
    seasonId: "qyamta",
    maranaya: true,
  },
  {
    id: "pentecost",
    english: "Pentecost (Pantequste)",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܦܸܢܛܝܼܩܘܿܣܛܹܐ",
    group: "feast",
    seasonId: "shlihe",
    maranaya: true,
  },
  {
    id: "transfiguration",
    english: "Transfiguration (Gelyana)",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܓܸܠܝܵܢܹܗ ܕܡܵܪܲܢ",
    group: "feast",
    maranaya: true,
  },
  {
    id: "holy-cross",
    english: "Holy Cross (Sliwa)",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܨܠܝܼܒ݂ܵܐ ܩܲܕܝܼܫܵܐ",
    group: "feast",
    maranaya: true,
  },
  {
    id: "jesus-king",
    english: "Jesus the King",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܝܸܫܘܿܥ ܡܲܠܟܵܐ",
    group: "feast",
    maranaya: true,
    churches: [CHALDEAN, SYRO_MALABAR],
  },
  {
    id: "corpus-christi",
    english: "Corpus Christi",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܐܝܼܩܵܪ ܦܲܓܪܹܗ ܕܡܵܪܲܢ",
    group: "feast",
    maranaya: true,
    churches: [CHALDEAN, SYRO_MALABAR],
  },
  {
    id: "sacred-heart",
    english: "Sacred Heart of our Lord",
    syriac: "ܕܘܼܟ݂ܪܵܢܵܐ ܩܲܕܝܼܫܵܐ ܕܠܸܒܹܗ ܕܡܵܪܲܢ",
    group: "feast",
    maranaya: true,
    churches: [CHALDEAN, SYRO_MALABAR],
  },
  // --- Non-maranaya feasts (Marian, saints of high rank, special Fridays) ---
  {
    id: "nativity-mary",
    english: "Nativity of Mart Maryam",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܝܲܠܝܼܕܘܼܬܹܗ ܕܡܵܪܬ݁ܝ ܡܲܪܝܲܡ",
    group: "feast",
    maranaya: false,
  },
  {
    id: "annunciation-mary",
    english: "Annunciation of Mart Maryam",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܣܘܼܒܵܪܹܗ ܕܡܵܪܬ݁ܝ ܡܲܪܝܲܡ",
    group: "feast",
    maranaya: false,
  },
  {
    id: "immaculate-conception",
    english: "Immaculate Conception of the Mother of God",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܡܛܲܒܲܬܵܢܘܼܬ ܝܵܠܕܲܬ ܐܲܠܵܗܵܐ ܡܲܪܝܲܡ",
    group: "feast",
    maranaya: false,
    churches: [CHALDEAN, SYRO_MALABAR],
  },
  {
    id: "dormition-mary",
    english: "Dormition of Mart Maryam",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܫܘܼܢܵܝܵܐ ܕܡܵܪܬ݁ܝ ܡܲܪܝܲܡ",
    group: "feast",
    maranaya: false,
  },
  {
    id: "presentation-lord",
    english: "Entrance of our Lord into the Temple",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܡܲܥܲܠܬܹ݁ܗ ܕܡܵܪܲܢ ܠܗܲܝܟ݁ܠܵܐ",
    group: "feast",
    maranaya: false,
  },
  {
    id: "mar-joseph",
    english: "Mar Joseph",
    syriac: "ܥܹܐܕ݂ܵܐ ܕܡܵܪܝ ܝܵܘܣܸܦ",
    group: "feast",
    maranaya: false,
  },
  {
    id: "golden-friday",
    english: "Golden Friday",
    syriac: "ܥܪܘܼܒ݂ܬܵܐ ܕܕܲܗܒ݂ܵܐ",
    group: "feast",
    seasonId: "shlihe",
    maranaya: false,
  },
  {
    id: "confessors-friday",
    english: "Friday of the Confessors",
    syriac: "ܥܪܘܼܒ݂ܬܵܐ ܕܡܵܘܕܝܵܢܹ̈ܐ",
    group: "feast",
    maranaya: false,
  },
  {
    id: "departed-friday",
    english: "Friday of the Departed (Annide)",
    syriac: "ܥܪܘܼܒ݂ܬܵܐ ܕܥܲܢܝܼܕܹ̈ܐ",
    group: "feast",
    maranaya: false,
  },
  // --- Dukhrane (commemorations of saints) ---
  {
    id: "dukhrana-mart-maryam-winter",
    english: "Commemoration of Mart Maryam in Winter",
    group: "dukhrana",
  },
  {
    id: "dukhrana-mart-maryam-summer",
    english: "Commemoration of Mart Maryam in Summer",
    group: "dukhrana",
  },
  {
    id: "dukhrana-mart-maryam-seeds",
    english: "Commemoration of Mart Maryam for the Protection of Seeds",
    group: "dukhrana",
  },
  {
    id: "dukhrana-john-baptist",
    english: "Commemoration of Mar John the Baptist",
    group: "dukhrana",
  },
  {
    id: "dukhrana-peter-paul",
    english: "Commemoration of Mar Peter and Paul",
    group: "dukhrana",
  },
  {
    id: "dukhrana-twelve-apostles",
    english: "Commemoration of the Twelve Apostles",
    group: "dukhrana",
  },
  {
    id: "dukhrana-seventy-two",
    english: "Commemoration of the Seventy-two Disciples",
    group: "dukhrana",
  },
  {
    id: "dukhrana-mar-stephen",
    english: "Commemoration of Mar Stephen",
    group: "dukhrana",
  },
  {
    id: "dukhrana-four-evangelists",
    english: "Commemoration of the Four Evangelists",
    group: "dukhrana",
  },
  {
    id: "dukhrana-greek-teachers",
    english: "Commemoration of the Greek Teachers",
    group: "dukhrana",
  },
  {
    id: "dukhrana-syriac-teachers",
    english: "Commemoration of the Syriac and Roman Teachers",
    group: "dukhrana",
  },
  {
    id: "dukhrana-forty-martyrs",
    english: "Commemoration of the Forty Martyrs",
    group: "dukhrana",
  },
  {
    id: "dukhrana-mar-ephrem",
    english: "Commemoration of Mar Ephrem the Teacher",
    group: "dukhrana",
  },
  {
    id: "dukhrana-mar-gewargis",
    english: "Commemoration of Mar Gewargis",
    group: "dukhrana",
  },
  {
    id: "dukhrana-addai",
    english: "Commemoration of Mar Addai the Apostle",
    group: "dukhrana",
  },
  {
    id: "dukhrana-mari",
    english: "Commemoration of Mar Mari the Apostle",
    group: "dukhrana",
  },
  {
    id: "dukhrana-thomas",
    english: "Commemoration of Mar Thomas the Apostle",
    group: "dukhrana",
  },
  {
    id: "dukhrana-simeon-bar-sabbae",
    english: "Commemoration of Mar Simeon bar Sabbaʿe",
    group: "dukhrana",
  },
  {
    id: "dukhrana-qardagh",
    english: "Commemoration of Mar Qardagh the Martyr",
    group: "dukhrana",
  },
  {
    id: "dukhrana-shmuni",
    english: "Commemoration of Shmuni and her Sons",
    group: "dukhrana",
  },
  {
    id: "dukhrana-mar-awgin",
    english: "Commemoration of Mar Awgin and his Companions",
    group: "dukhrana",
  },
  {
    id: "dukhrana-rabban-hormizd",
    english: "Commemoration of Rabban Hormizd the Persian",
    group: "dukhrana",
  },
  {
    id: "dukhrana-mart-barbara",
    english: "Commemoration of Mart Barbara",
    group: "dukhrana",
  },
  {
    id: "dukhrana-massacre-infants",
    english: "Commemoration of the Massacre of the Infants",
    group: "dukhrana",
  },
  // --- Bautha (Rogation of the Ninevites) ---
  {
    id: "bautha-monday",
    english: "Monday of the Rogation of the Ninevites",
    syriac: "ܬܪܹܝܢܒ݁ܫܲܒܵܐ ܕܒ݂ܵܥܘܼܬ݂ܵܐ",
    group: "bautha",
  },
  {
    id: "bautha-tuesday",
    english: "Tuesday of the Rogation of the Ninevites",
    syriac: "ܬ݂ܠܵܬ݂ܒ݁ܫܲܒܵܐ ܕܒ݂ܵܥܘܼܬ݂ܵܐ",
    group: "bautha",
  },
  {
    id: "bautha-wednesday",
    english: "Wednesday of the Rogation of the Ninevites",
    syriac: "ܐܲܪܒܲܥܒ݁ܫܲܒܵܐ ܕܒ݂ܵܥܘܼܬ݂ܵܐ",
    group: "bautha",
  },
  // --- Events (life-cycle, ordinations, consecrations) ---
  { id: "funeral", english: "Funeral", group: "event" },
  { id: "memorial", english: "Memorial (of the Departed)", group: "event" },
  { id: "wedding", english: "Wedding (Burakha)", group: "event" },
  { id: "baptism", english: "Baptism (Mamoditha)", group: "event" },
  { id: "house-blessing", english: "House Blessing", group: "event" },
  {
    id: "ordination-reader",
    english: "Ordination of a Reader (Qaroya)",
    group: "event",
  },
  {
    id: "ordination-subdeacon",
    english: "Ordination of a Subdeacon (Heupadyaqna)",
    group: "event",
  },
  {
    id: "ordination-deacon",
    english: "Ordination of a Deacon (Mshamshana)",
    group: "event",
  },
  {
    id: "ordination-priest",
    english: "Ordination of a Priest (Qashisha)",
    group: "event",
  },
  {
    id: "ordination-bishop",
    english: "Ordination of a Bishop (Episqopa)",
    group: "event",
  },
  {
    id: "consecration-patriarch",
    english: "Consecration of a Patriarch",
    group: "event",
  },
  {
    id: "consecration-church",
    english: "Consecration of a Church (Qudash Etta)",
    group: "event",
  },
  {
    id: "consecration-altar",
    english: "Consecration of an Altar (Qudash Madbha)",
    group: "event",
  },
];

// -------------------------------------------------------------------------
// Office hours (divine office / shhima). Raze is NOT here (it is the Qurbana).
// -------------------------------------------------------------------------

export interface LiturgicalHour {
  id: string;
  english: string;
  syriac: string;
  order: number;
}

export const LITURGICAL_HOURS: LiturgicalHour[] = [
  { id: "ramsha", english: "Evening (Ramsha)", syriac: "ܪܲܡܫܵܐ", order: 1 },
  { id: "subaa", english: "Compline (Subaa)", syriac: "ܣܘܼܒܵܥܵܐ", order: 2 },
  { id: "lelya", english: "Night (Lelya)", syriac: "ܠܸܠܝܵܐ", order: 3 },
  {
    id: "qale-d-shahra",
    english: "Vigil (Qale d-Shahra)",
    syriac: "ܩܵܠܹ̈ܐ ܕܫܲܗܪܵܐ",
    order: 4,
  },
  { id: "sapra", english: "Morning (Sapra)", syriac: "ܨܲܦܪܵܐ", order: 5 },
  { id: "endana", english: "Third Hour (Endana)", syriac: "ܥܸܕܵܢܵܐ", order: 6 },
  { id: "qutaa", english: "Quta'a", syriac: "ܩܘܼܛܵܥܵܐ", order: 7 },
];

// -------------------------------------------------------------------------
// Hour variants - Ramsha (and similar offices) have Qadmaye / Dahraye sets
// -------------------------------------------------------------------------

export interface HourVariant {
  id: string;
  english: string;
  syriac?: string;
  note?: string;
}

export const HOUR_VARIANTS: HourVariant[] = [
  {
    id: "qadmaye",
    english: "Qadmaye",
    syriac: "ܩܲܕ݂ܡܵܝܹ̈ܐ",
    note: "First set",
  },
  {
    id: "dahraye",
    english: "Dahraye",
    syriac: "ܕܲܗܪܵܝܹ̈ܐ",
    note: "Other / remaining set",
  },
];

/** Hours that use the Qadmaye / Dahraye distinction */
export const HOURS_WITH_VARIANTS = new Set(["ramsha"]);

// -------------------------------------------------------------------------
// Services / rites a hymn belongs to
// -------------------------------------------------------------------------

export interface LiturgicalService {
  id: string;
  english: string;
  syriac?: string;
}

export const LITURGICAL_SERVICES: LiturgicalService[] = [
  { id: "qurbana", english: "Holy Qurbana (Raze)", syriac: "ܐ݇ܪ̈ܵܙܹܐ" },
  { id: "funeral", english: "Funeral" },
  { id: "memorial", english: "Memorial" },
  { id: "baptism", english: "Baptism (Mamoditha)" },
  { id: "wedding", english: "Wedding (Burakha)" },
  { id: "ordination", english: "Ordination" },
  { id: "consecration", english: "Consecration (Church / Altar / Patriarch)" },
  { id: "other", english: "Other" },
];

// -------------------------------------------------------------------------
// Onitha kinds / slots (not genres - genre is simply "onyatha")
// -------------------------------------------------------------------------

export interface OnyathaKind {
  id: string;
  english: string;
  syriac?: string;
}

export const ONYATHA_KINDS: OnyathaKind[] = [
  { id: "qdam", english: "d'Qdam", syriac: "ܕܩܕܵܡ" },
  { id: "wathar", english: "d'Wathar", syriac: "ܕܒܵܬ݂ܲܪ" },
  { id: "ramsha", english: "d'Ramsha", syriac: "ܕܪܲܡܫܵܐ" },
  { id: "sapra", english: "d'Sapra", syriac: "ܕܨܲܦܪܵܐ" },
  { id: "mawtwa", english: "d'Mawtwa", syriac: "ܕܡܵܘܬ݂ܒ݂ܵܐ" },
  { id: "lelya", english: "d'Lelya", syriac: "ܕܠܸܠܝܵܐ" },
  { id: "wasaliqe", english: "d'Wasaliqe", syriac: "ܕܘܵܣܵܠܝܼܩܹ̈ܐ" },
  { id: "qanke", english: "d'Qanke", syriac: "ܕܩܲܢܟܹ̈ܐ" },
  { id: "raze", english: "d'Raze", syriac: "ܕܐ݇ܪ̈ܵܙܹܐ" },
  { id: "evangelion", english: "d'Evangelion", syriac: "ܕܐܸܘܲܢܓܸܠܝܘܿܢ" },
  { id: "tawdi", english: "d'Tawdi", syriac: "ܕܬܵܘܕܝܼ" },
  { id: "barekh", english: "d'Barekh", syriac: "ܕܒܵܪܸܟ݂" },
  { id: "sahde", english: "d'Sahde", syriac: "ܕܣܵܗ̈ܕܹܐ" },
  { id: "annide", english: "d'Annide", syriac: "ܕܥܲܢ̈ܝܼܕܹܐ" },
];

// Anaphoras of the Holy Qurbana (sub-facet when service includes qurbana)
export interface Anaphora {
  id: string;
  english: string;
  syriac?: string;
}

export const ANAPHORAS: Anaphora[] = [
  {
    id: "addai-mari",
    english: "Mar Addai and Mar Mari",
    syriac: "ܐܲܕܲܝ ܘܡܵܐܪܝ",
  },
  { id: "theodore", english: "Mar Theodore", syriac: "ܬܹܐܘܵܕܘܿܪܘܿܣ" },
  { id: "nestorius", english: "Mar Nestorius", syriac: "ܢܹܣܛܘܿܪܝܘܿܣ" },
];

// -------------------------------------------------------------------------
// Weekdays
// -------------------------------------------------------------------------

export interface Weekday {
  id: string;
  english: string;
  syriac: string;
  order: number;
}

export const WEEKDAYS: Weekday[] = [
  { id: "sunday", english: "Sunday", syriac: "ܚܲܕ݂ܒ݁ܫܲܒܵܐ", order: 1 },
  { id: "monday", english: "Monday", syriac: "ܬܪܹܝܢܒ݁ܫܲܒܵܐ", order: 2 },
  { id: "tuesday", english: "Tuesday", syriac: "ܬ݂ܠܵܬ݂ܒ݁ܫܲܒܵܐ", order: 3 },
  { id: "wednesday", english: "Wednesday", syriac: "ܐܲܪܒܲܥܒ݁ܫܲܒܵܐ", order: 4 },
  { id: "thursday", english: "Thursday", syriac: "ܚܲܡܫܵܒ݁ܫܲܒܵܐ", order: 5 },
  { id: "friday", english: "Friday", syriac: "ܥܪܘܼܒ݂ܬܵܐ", order: 6 },
  { id: "saturday", english: "Saturday", syriac: "ܫܲܒ݁ܬ݂ܵܐ", order: 7 },
];

// -------------------------------------------------------------------------
// Lookup helpers
// -------------------------------------------------------------------------

export function getSeasonLabel(id: string): string {
  return LITURGICAL_SEASONS.find((s) => s.id === id)?.english || id;
}

export function getOccasionLabel(id: string): string {
  return LITURGICAL_OCCASIONS.find((o) => o.id === id)?.english || id;
}

export function getHourLabel(id: string): string {
  return LITURGICAL_HOURS.find((h) => h.id === id)?.english || id;
}

export function getHourVariantLabel(id: string): string {
  return HOUR_VARIANTS.find((v) => v.id === id)?.english || id;
}

export function getServiceLabel(id: string): string {
  return LITURGICAL_SERVICES.find((s) => s.id === id)?.english || id;
}

export function getOnyathaKindLabel(id: string): string {
  return ONYATHA_KINDS.find((k) => k.id === id)?.english || id;
}

export function getAnaphoraLabel(id: string): string {
  return ANAPHORAS.find((a) => a.id === id)?.english || id;
}

export function getWeekdayLabel(id: string): string {
  return WEEKDAYS.find((d) => d.id === id)?.english || id;
}
