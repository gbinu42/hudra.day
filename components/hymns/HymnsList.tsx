"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hymn } from "@/lib/types/hymn";
import { Music, User, Book, Languages } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface HymnsListProps {
  hymns: Hymn[];
  showAddButton?: boolean;
  onAddClick?: () => void;
}

export default function HymnsList({
  hymns,
  showAddButton,
  onAddClick,
}: HymnsListProps) {
  const [alphabetOrder, setAlphabetOrder] = useState<"english" | "syriac">(
    "english"
  );

  const filteredAndSortedHymns = useMemo(() => {
    // Sort hymns by title
    const sorted = [...hymns].sort((a, b) => {
      const aTitleText = a.titles?.[0]?.title || "";
      const bTitleText = b.titles?.[0]?.title || "";
      return aTitleText.localeCompare(bTitleText);
    });

    return sorted;
  }, [hymns]);

  // Helper function to get the title for alphabetical sorting
  const getTitleForAlphabet = useCallback(
    (hymn: Hymn): string => {
      if (alphabetOrder === "syriac") {
        // Try to get Syriac title first
        const syriacTitle = hymn.titles?.find(
          (t) => t.language?.toLowerCase() === "syriac"
        )?.title;
        if (syriacTitle) return syriacTitle;
      }
      // Fallback to English title
      const englishTitle = hymn.titles?.find(
        (t) => t.language?.toLowerCase() === "english"
      )?.title;
      return englishTitle || hymn.titles?.[0]?.title || "Untitled";
    },
    [alphabetOrder]
  );

  // Helper function to get the first character for grouping
  const getFirstChar = (text: string): string => {
    if (!text || text.length === 0) return "#";
    const firstChar = text.charAt(0).toUpperCase();
    // Check if it's a letter (English or Syriac/Unicode)
    if (/[A-Z]/.test(firstChar)) return firstChar;
    if (/[\u0700-\u074F]/.test(firstChar)) return firstChar; // Syriac Unicode range
    return "#"; // For numbers and special characters
  };

  // Group hymns by alphabet
  const groupedHymns = useMemo(() => {
    const groups: { [key: string]: Hymn[] } = {};

    filteredAndSortedHymns.forEach((hymn) => {
      const title = getTitleForAlphabet(hymn);
      const firstChar = getFirstChar(title);

      if (!groups[firstChar]) {
        groups[firstChar] = [];
      }
      groups[firstChar].push(hymn);
    });

    // Sort hymns within each group based on the selected alphabet order
    Object.keys(groups).forEach((letter) => {
      groups[letter].sort((a, b) => {
        const aTitle = getTitleForAlphabet(a);
        const bTitle = getTitleForAlphabet(b);
        return aTitle.localeCompare(bTitle);
      });
    });

    // Sort groups alphabetically
    const sortedGroups = Object.keys(groups).sort((a, b) => {
      // Put # at the end
      if (a === "#") return 1;
      if (b === "#") return -1;
      return a.localeCompare(b);
    });

    return sortedGroups.map((letter) => ({
      letter,
      hymns: groups[letter],
    }));
  }, [filteredAndSortedHymns, getTitleForAlphabet]);

  const formatTitles = (hymn: Hymn) => {
    if (!hymn.titles || hymn.titles.length === 0) {
      return {
        english: "Untitled",
        syriacVocalized: null,
        syriacNonVocalized: null,
      };
    }

    const englishTitle =
      hymn.titles.find((t) => t.language?.toLowerCase() === "english")?.title ||
      "Untitled";

    const syriacVocalized = hymn.titles.find(
      (t) =>
        t.language?.toLowerCase() === "syriac" &&
        t.transliteration !== "non-vocalized"
    )?.title;

    const syriacNonVocalized = hymn.titles.find(
      (t) =>
        t.language?.toLowerCase() === "syriac" &&
        t.transliteration === "non-vocalized"
    )?.title;

    return { english: englishTitle, syriacVocalized, syriacNonVocalized };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Syriac Hymns & Prayers</h1>
            <p className="text-muted-foreground">
              {filteredAndSortedHymns.length}{" "}
              {filteredAndSortedHymns.length === 1 ? "hymn" : "hymns"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-muted-foreground" />
            <ToggleGroup
              type="single"
              value={alphabetOrder}
              onValueChange={(value: "english" | "syriac") => {
                if (value) setAlphabetOrder(value);
              }}
            >
              <ToggleGroupItem value="english" aria-label="English alphabet">
                English
              </ToggleGroupItem>
              <ToggleGroupItem value="syriac" aria-label="Syriac alphabet">
                Syriac
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        {showAddButton && onAddClick && (
          <Button onClick={onAddClick}>
            <Music className="h-4 w-4 mr-2" />
            Add Hymn
          </Button>
        )}
      </div>

      {/* Hymns Grid - Grouped by Alphabet */}
      {filteredAndSortedHymns.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Music className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hymns found</h3>
            <p className="text-muted-foreground">
              No hymns have been added yet
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {groupedHymns.map((group) => (
            <div key={group.letter} className="space-y-4">
              {/* Alphabet Header */}
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b pb-2">
                <h2
                  className={`text-3xl font-bold ${
                    alphabetOrder === "syriac"
                      ? "font-['East_Syriac_Adiabene']"
                      : ""
                  }`}
                  dir={alphabetOrder === "syriac" ? "rtl" : "ltr"}
                >
                  {group.letter}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {group.hymns.length}{" "}
                  {group.hymns.length === 1 ? "hymn" : "hymns"}
                </p>
              </div>

              {/* Hymns in this group */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.hymns.map((hymn) => {
                  const { english, syriacVocalized, syriacNonVocalized } =
                    formatTitles(hymn);
                  return (
                    <Link key={hymn.id} href={`/hymns/${hymn.id}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <CardTitle className="line-clamp-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span>{english}</span>
                              {syriacVocalized && (
                                <>
                                  <span className="text-muted-foreground">
                                    |
                                  </span>
                                  <span
                                    className="font-['East_Syriac_Adiabene'] text-2xl font-normal"
                                    dir="rtl"
                                  >
                                    {syriacVocalized}
                                  </span>
                                </>
                              )}
                              {syriacNonVocalized && (
                                <>
                                  <span className="text-muted-foreground">
                                    |
                                  </span>
                                  <span
                                    className="text-lg font-normal"
                                    dir="rtl"
                                  >
                                    {syriacNonVocalized}
                                  </span>
                                </>
                              )}
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {hymn.authorName && (
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {hymn.authorName}
                              </span>
                            </div>
                          )}
                          {hymn.category && (
                            <div className="flex items-center gap-2">
                              <Book className="h-4 w-4 text-muted-foreground" />
                              <Badge variant="secondary">{hymn.category}</Badge>
                              {hymn.occasion && (
                                <Badge variant="outline">{hymn.occasion}</Badge>
                              )}
                            </div>
                          )}
                          {hymn.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {hymn.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                            <div className="flex items-center gap-3">
                              {hymn.churchVersions?.length > 0 && (
                                <span>
                                  {hymn.churchVersions.length} versions
                                </span>
                              )}
                              {hymn.translations &&
                                hymn.translations.length > 0 && (
                                  <span>
                                    {hymn.translations.length} translations
                                  </span>
                                )}
                              {hymn.recordings?.length > 0 && (
                                <span>{hymn.recordings.length} recordings</span>
                              )}
                            </div>
                          </div>
                          {hymn.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-2">
                              {hymn.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {hymn.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{hymn.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
