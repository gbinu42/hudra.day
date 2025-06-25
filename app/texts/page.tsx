"use client";

import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Church, BookOpen, ArrowLeft, Search, Filter } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Liturgical Texts Archive - Browse East Syriac Texts by Church",
  description:
    "Browse our comprehensive collection of digitized East Syriac liturgical texts from the Assyrian Church of the East, Chaldean Catholic Church, and Syro-Malabar Church. Free access to prayers, hymns, breviary, and liturgical services.",
  keywords: [
    "East Syriac texts",
    "liturgical texts archive",
    "Assyrian Church texts",
    "Chaldean Catholic texts",
    "Syro-Malabar texts",
    "Church of the East texts",
    "liturgical prayers",
    "breviary texts",
    "hymns and chants",
    "liturgical services",
    "Syriac manuscripts",
    "digital archive",
  ],
  openGraph: {
    title: "Liturgical Texts Archive - Browse East Syriac Texts | Hudra",
    description:
      "Browse our comprehensive collection of digitized East Syriac liturgical texts from three major Church of the East traditions. Free access to prayers, hymns, and liturgical services.",
    url: "https://www.hudra.day/texts",
    images: [
      {
        url: "https://www.hudra.day/images/sliwa.png",
        width: 1200,
        height: 630,
        alt: "East Syriac Liturgical Texts Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liturgical Texts Archive - Browse East Syriac Texts",
    description:
      "Browse our comprehensive collection of digitized East Syriac liturgical texts from three major Church of the East traditions.",
    images: ["https://www.hudra.day/images/sliwa.png"],
  },
  alternates: {
    canonical: "https://www.hudra.day/texts",
  },
};

// This would typically come from a database or API
const churches = [
  {
    slug: "syro-malabar",
    name: "Syro-Malabar Church",
    description:
      "One of the oldest Christian communities in the world, tracing its origins to St. Thomas the Apostle in India.",
    textCount: 0,
    categories: ["liturgy", "prayers", "hymns", "breviary"],
  },
  {
    slug: "assyrian",
    name: "Assyrian Church of the East",
    description:
      "Ancient apostolic church with headquarters in Erbil, Iraq. Preserves the original East Syriac liturgical tradition.",
    textCount: 0,
    categories: ["liturgy", "prayers", "hymns", "breviary"],
  },
  {
    slug: "chaldean",
    name: "Chaldean Catholic Church",
    description:
      "Eastern Catholic church in full communion with Rome, maintaining East Syriac traditions.",
    textCount: 0,
    categories: ["liturgy", "prayers", "hymns", "breviary"],
  },
];

const categories = [
  {
    slug: "liturgy",
    name: "Liturgical Texts",
    description:
      "Complete liturgical services including Qurbana, ordinations, and sacraments",
    icon: Church,
  },
  {
    slug: "prayers",
    name: "Prayers",
    description: "Daily prayers, seasonal prayers, and devotional texts",
    icon: BookOpen,
  },
  {
    slug: "hymns",
    name: "Hymns & Chants",
    description: "Liturgical hymns, seasonal chants, and musical texts",
    icon: BookOpen,
  },
  {
    slug: "breviary",
    name: "Breviary",
    description: "Divine Office prayers for different times of day and seasons",
    icon: BookOpen,
  },
];

export default function TextsIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-white">
      <Navbar />

      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Liturgical Texts Archive
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Browse our collection of digitized liturgical texts from the
                Church of the East tradition. All texts are freely available for
                scholarly research and community use.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search Texts
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Work in Progress Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Archive Under Development
              </h3>
              <div className="mt-1 text-sm text-yellow-700">
                <p>
                  We&apos;re actively digitizing and uploading liturgical texts.
                  New content is added regularly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Browse by Church */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Church</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {churches.map((church) => (
              <Card
                key={church.slug}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Church className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">{church.textCount} texts</Badge>
                  </div>
                  <CardTitle className="text-lg">{church.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {church.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {church.categories.map((category) => (
                        <Badge
                          key={category}
                          variant="outline"
                          className="text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/texts/${church.slug}`}>
                        Browse {church.name} Texts
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Browse by Category */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.slug}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="text-center">
                    <Icon className="h-8 w-8 mx-auto text-primary mb-2" />
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/texts/category/${category.slug}`}>
                        View All {category.name}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
