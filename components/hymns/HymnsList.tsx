"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Hymn, HYMN_CATEGORIES, HYMN_OCCASIONS } from "@/lib/types/hymn";
import { Search, Music, Calendar, Tag, User, Book } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [occasionFilter, setOccasionFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"title" | "author" | "date">("title");

  const filteredAndSortedHymns = useMemo(() => {
    let filtered = hymns;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((hymn) => {
        return (
          hymn.titles?.some(
            (t) =>
              t.title?.toLowerCase().includes(term) ||
              t.transliteration?.toLowerCase().includes(term)
          ) ||
          hymn.authorName?.toLowerCase().includes(term) ||
          hymn.tags?.some((tag) => tag.toLowerCase().includes(term)) ||
          hymn.description?.toLowerCase().includes(term)
        );
      });
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((hymn) => hymn.category === categoryFilter);
    }

    // Occasion filter
    if (occasionFilter !== "all") {
      filtered = filtered.filter((hymn) => hymn.occasion === occasionFilter);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "title":
          const aTitleText = a.titles?.[0]?.title || "";
          const bTitleText = b.titles?.[0]?.title || "";
          return aTitleText.localeCompare(bTitleText);
        case "author":
          return (a.authorName || "").localeCompare(b.authorName || "");
        case "date":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

    return sorted;
  }, [hymns, searchTerm, categoryFilter, occasionFilter, sortBy]);

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Syriac Hymns & Prayers</h1>
          <p className="text-muted-foreground">
            {filteredAndSortedHymns.length}{" "}
            {filteredAndSortedHymns.length === 1 ? "hymn" : "hymns"}
          </p>
        </div>
        {showAddButton && onAddClick && (
          <Button onClick={onAddClick}>
            <Music className="h-4 w-4 mr-2" />
            Add Hymn
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search hymns by title, author, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Category
                </label>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {HYMN_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Occasion
                </label>
                <Select
                  value={occasionFilter}
                  onValueChange={setOccasionFilter}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Occasions</SelectItem>
                    {HYMN_OCCASIONS.map((occ) => (
                      <SelectItem key={occ} value={occ}>
                        {occ}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Sort By
                </label>
                <Select
                  value={sortBy}
                  onValueChange={(value: any) => setSortBy(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="date">Date Added</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hymns Grid */}
      {filteredAndSortedHymns.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Music className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hymns found</h3>
            <p className="text-muted-foreground">
              {searchTerm ||
              categoryFilter !== "all" ||
              occasionFilter !== "all"
                ? "Try adjusting your filters"
                : "No hymns have been added yet"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedHymns.map((hymn) => {
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
                            <span className="text-muted-foreground">|</span>
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
                            <span className="text-muted-foreground">|</span>
                            <span className="text-lg font-normal" dir="rtl">
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
                          <span>{hymn.churchVersions.length} versions</span>
                        )}
                        {hymn.translations?.length > 0 && (
                          <span>{hymn.translations.length} translations</span>
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
      )}
    </div>
  );
}
