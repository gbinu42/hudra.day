export interface Article {
  slug: string;
  title: string;
  titleSyriac?: string;
  subtitle?: string;
  date: string;
  author?: string;
  description: string;
  keywords: string[];
}

export const articles: Article[] = [
  {
    slug: "resh-qale",
    title: "Resh Qale",
    titleSyriac: "ܪܹܫ ܩܵܠܹ̈ܐ",
    subtitle: "Head melodies in the Malabar East Syriac tradition",
    date: "2026-05-17",
    author: "Binu George",
    description:
      "An introduction to the Resh Qale — the canonical head melodies of the East Syriac liturgical tradition — as preserved and practised in the Syro-Malabar Church.",
    keywords: [
      "resh qale",
      "head melodies",
      "East Syriac",
      "Syro-Malabar",
      "liturgical chant",
      "Malabar",
      "qale",
      "Church of the East",
    ],
  },
  {
    slug: "qale-donyatha-dsahde",
    title: "Qale d'onyatha d'sahde",
    titleSyriac: "ܩܵܠܹ̈ܐ ܕܥܘܿܢ̈ܝܵܬ݂ܵܐ ܕܣܵܗܕܹ̈ܐ",
    subtitle:
      "The tunes of the Martyrs' Antiphons in the Malabar, Assyrian, and Chaldean Traditions of the Church fo the East",
    date: "2026-05-06",
    author: "Binu George",
    description:
      "A comparative study of the Qale d'Onyatha d'Sahde - the tunes of the responsorial chants for martyrs - as preserved and practised across the Syro-Malabar Church, Assyrian Church of the East, and Chaldean Catholic Church.",
    keywords: [
      "qale",
      "onyatha",
      "sahde",
      "martyrs",
      "Syro-Malabar",
      "Assyrian Church of the East",
      "Chaldean",
      "East Syriac",
      "liturgical chant",
      "hudra",
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
