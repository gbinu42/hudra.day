export const categoryData = {
  "syro-malabar": {
    name: "Syro-Malabar Church",
    categories: {
      liturgy: {
        name: "Liturgical Texts",
        description:
          "Complete liturgical services including Qurbana Taksa and sacramental rites",
        texts: [
          {
            slug: "qurbana-taksa",
            title: "Qurbana Taksa",
            description:
              "The complete order of the Holy Qurbana (Eucharistic liturgy)",
            language: "Syriac",
            translation: "Malayalam",
            date: "Traditional",
            status: "coming-soon",
          },
          {
            slug: "ordination-rites",
            title: "Ordination Rites",
            description:
              "Liturgical texts for ordination of deacons, priests, and bishops",
            language: "Syriac",
            translation: "Malayalam",
            date: "Traditional",
            status: "coming-soon",
          },
        ],
      },
      prayers: {
        name: "Prayers",
        description: "Daily prayers, devotional texts, and seasonal prayers",
        texts: [
          {
            slug: "daily-prayers",
            title: "Daily Prayers",
            description:
              "Morning, evening, and night prayers for daily devotion",
            language: "Malayalam",
            translation: "English",
            date: "Traditional",
            status: "coming-soon",
          },
        ],
      },
      hymns: {
        name: "Hymns & Chants",
        description: "Traditional liturgical hymns and musical texts",
        texts: [],
      },
      breviary: {
        name: "Breviary",
        description: "Divine Office prayers for different times of day",
        texts: [],
      },
    },
  },
  assyrian: {
    name: "Assyrian Church of the East",
    categories: {
      liturgy: {
        name: "Liturgical Texts",
        description:
          "Ancient East Syriac liturgical traditions and Qurbana services",
        texts: [],
      },
      prayers: {
        name: "Prayers",
        description: "Traditional prayers and devotional texts",
        texts: [],
      },
      hymns: {
        name: "Hymns & Chants",
        description: "Classical Syriac hymns and liturgical chants",
        texts: [],
      },
      breviary: {
        name: "Breviary",
        description: "Canonical hours and seasonal prayers",
        texts: [],
      },
    },
  },
  chaldean: {
    name: "Chaldean Catholic Church",
    categories: {
      liturgy: {
        name: "Liturgical Texts",
        description: "East Syriac liturgical texts in communion with Rome",
        texts: [],
      },
      prayers: {
        name: "Prayers",
        description: "Prayer texts and devotional materials",
        texts: [],
      },
      hymns: {
        name: "Hymns & Chants",
        description: "Liturgical hymns and traditional chants",
        texts: [],
      },
      breviary: {
        name: "Breviary",
        description: "Divine Office and canonical prayers",
        texts: [],
      },
    },
  },
} as const;

export const textData = {
  "syro-malabar": {
    liturgy: {
      "qurbana-taksa": {
        title: "Qurbana Taksa",
        subtitle: "The Complete Order of the Holy Qurbana",
        description:
          "The complete liturgical order of the Holy Qurbana (Eucharistic liturgy) of the Syro-Malabar Church, preserving the ancient East Syriac tradition.",
        language: "Syriac",
        translation: "Malayalam",
        originalLanguage: "Classical Syriac",
        date: "Traditional (Ancient)",
        author: "Church Tradition",
        source: "Ancient Manuscripts",
        status: "coming-soon" as const,
        content: null,
      },
      "ordination-rites": {
        title: "Ordination Rites",
        subtitle: "Liturgical Texts for Holy Orders",
        description:
          "Complete liturgical texts for the ordination of deacons, priests, and bishops in the Syro-Malabar tradition.",
        language: "Syriac",
        translation: "Malayalam",
        originalLanguage: "Classical Syriac",
        date: "Traditional (Ancient)",
        author: "Church Tradition",
        source: "Ancient Manuscripts",
        status: "coming-soon" as const,
        content: null,
      },
    },
    prayers: {
      "daily-prayers": {
        title: "Daily Prayers",
        subtitle: "Morning, Evening, and Night Prayers",
        description:
          "Traditional daily prayers for morning, evening, and night devotions in the Syro-Malabar tradition.",
        language: "Malayalam",
        translation: "English",
        originalLanguage: "Malayalam/Syriac",
        date: "Traditional",
        author: "Church Tradition",
        source: "Prayer Books",
        status: "coming-soon" as const,
        content: null,
      },
    },
    hymns: {},
    breviary: {},
  },
  assyrian: {
    liturgy: {},
    prayers: {},
    hymns: {},
    breviary: {},
  },
  chaldean: {
    liturgy: {},
    prayers: {},
    hymns: {},
    breviary: {},
  },
} as const;

export type ChurchSlug = keyof typeof categoryData;
export type CategorySlug =
  keyof (typeof categoryData)[ChurchSlug]["categories"];
export type TextSlug = keyof (typeof textData)[ChurchSlug][CategorySlug];
