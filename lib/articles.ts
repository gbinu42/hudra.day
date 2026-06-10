export interface Article {
  slug: string;
  title: string;
  titleSyriac?: string;
  /** Rendered after {title} and {titleSyriac}, e.g. a geographic or tradition qualifier */
  titleSuffix?: string;
  subtitle?: string;
  date: string;
  author?: string;
  description: string;
  keywords: string[];
  image?: string;
  imageAlt?: string;
}

export const articles: Article[] = [
  {
    slug: "qambel-maran-cd",
    title: "Qambel Maran CD",
    titleSyriac: "ܩܲܒܸܠ ܡܵܪܲܢ",
    subtitle: "Hymn texts from the Qambel Maran CD by Rev. Dr. Joseph Palackal",
    date: "2026-06-08",
    author: "Binu George",
    description:
      "Syriac hymn texts of 29 East Syriac liturgical chants from the Qambel Maran CD , with sources.",
    keywords: [
      "qambel maran",
      "East Syriac",
      "Syro-Malabar",
      "liturgical chant",
      "hymn texts",
      "Malabar",
      "CD",
      "Church of the East",
    ],
    image: "/images/qambel-maran-cd.jpg",
    imageAlt: "Qambel Maran CD cover",
  },
  {
    slug: "resh-qale",
    title: "Resh Qale",
    titleSyriac: "ܪܹܫ ܩܵܠܹ̈ܐ",
    titleSuffix: "in the Malabar East Syriac Tradition",
    subtitle: "Head melodies in the Malabar East Syriac tradition",
    date: "2026-05-17",
    author: "Binu George",
    description:
      "An introduction to the Resh Qale - the canonical head melodies of the East Syriac liturgical tradition - as preserved and practised in the Syro-Malabar Church.",
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
      "The tunes of the Martyrs' Antiphons in the Malabar, Assyrian, and Chaldean Traditions of the Church of the East",
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

export function getArticlesForIndex(): Article[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticleFullTitle(article: Article): string {
  const base = article.title;
  return article.titleSuffix ? `${base} (${article.titleSuffix})` : base;
}
