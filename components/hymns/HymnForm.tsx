"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  CreateHymnData,
  CHURCH_TRADITIONS,
  HYMN_GENRES,
  HymnTitle,
  ChurchTextVersion,
  TextTranslation,
  HymnAuthor,
  HymnImageGroup,
  HymnLiturgicalUse,
  HymnSource,
} from "@/lib/types/hymn";
import { HymnReshQalaRef } from "@/lib/types/reshQala";
import {
  LITURGICAL_SEASONS,
  LITURGICAL_OCCASIONS,
  LITURGICAL_HOURS,
  LITURGICAL_SERVICES,
  ONYATHA_KINDS,
  HOUR_VARIANTS,
  HOURS_WITH_VARIANTS,
  ANAPHORAS,
  WEEKDAYS,
} from "@/lib/types/liturgy";
import { hymnService, personService } from "@/lib/hymn-services";
import { X, Plus } from "lucide-react";
import SyriacEditor from "@/components/SyriacEditor";
import ReshQalaPicker from "@/components/hymns/ReshQalaPicker";
import { Checkbox } from "@/components/ui/checkbox";

const WEEK_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];

function cleanLiturgicalUse(
  use: HymnLiturgicalUse
): HymnLiturgicalUse | null {
  const cleaned = Object.fromEntries(
    Object.entries(use).filter(
      ([, v]) => v !== undefined && v !== "" && v !== null
    )
  ) as HymnLiturgicalUse;
  return Object.keys(cleaned).length > 0 ? cleaned : null;
}

// Function to generate a URL-safe slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

// Form validation schema
const hymnFormSchema = z.object({
  mainEnglishTitle: z.string().min(1, "Main English title is required"),
  syriacTitle: z.string().optional(),
  syriacTitleNonVocalized: z.string().optional(),
  alternateEnglishTitles: z.array(z.string()).optional(),
  originYear: z.number().optional(),
  category: z.string().optional(),
  occasion: z.string().optional(),
  meter: z.string().optional(),
  description: z.string().optional(),
  context: z.string().optional(),
  text: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type HymnFormData = z.infer<typeof hymnFormSchema>;

interface HymnFormProps {
  hymnId?: string;
  initialData?: CreateHymnData;
  userId: string;
  userName: string;
  onSuccess?: (hymnId: string) => void;
  onCancel?: () => void;
}

export default function HymnForm({
  hymnId,
  initialData,
  userId,
  userName,
  onSuccess,
  onCancel,
}: HymnFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setPersonsList] = useState<Array<{ id: string; name: string }>>([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tags || []
  );
  const [alternateTitle, setAlternateTitle] = useState("");
  const [alternateTitles, setAlternateTitles] = useState<string[]>([]);

  // Liturgical placements (each row is one distinct use)
  const [liturgicalUses, setLiturgicalUses] = useState<HymnLiturgicalUse[]>(
    initialData?.liturgicalUses?.length
      ? initialData.liturgicalUses
      : []
  );
  const [sources, setSources] = useState<HymnSource[]>(
    initialData?.sources || []
  );
  const [reshQale, setReshQale] = useState<HymnReshQalaRef[]>(
    initialData?.reshQale || []
  );
  const [isReshQala, setIsReshQala] = useState(
    initialData?.isReshQala ?? false
  );

  // Qale d'Udrane catalogue number (separate from other tags)
  const [udraneQala, setUdraneQala] = useState<string>(
    initialData?.qaleDUdrane?.qala != null
      ? String(initialData.qaleDUdrane.qala)
      : ""
  );
  const [udraneVariant, setUdraneVariant] = useState<string>(
    initialData?.qaleDUdrane?.variant != null
      ? String(initialData.qaleDUdrane.variant)
      : ""
  );

  const [authors, setAuthors] = useState<HymnAuthor[]>(
    initialData?.authors || []
  );
  const [churchVersions, setChurchVersions] = useState<ChurchTextVersion[]>(
    initialData?.churchVersions || []
  );
  const [translations, setTranslations] = useState<TextTranslation[]>(
    initialData?.translations || []
  );
  const [hymnImageGroups] = useState<HymnImageGroup[]>(
    initialData?.hymnImageGroups || []
  );
  const [mainTextHtml, setMainTextHtml] = useState<string>(
    initialData?.text || ""
  );

  // Convert old titles format to new structure
  const getInitialTitles = () => {
    if (!initialData?.titles)
      return {
        mainEnglishTitle: "",
        syriacTitle: "",
        syriacTitleNonVocalized: "",
        alternateEnglishTitles: [],
      };

    const englishTitles = initialData.titles.filter(
      (t) => t.language?.toLowerCase() === "english"
    );
    const syriacTitles = initialData.titles.filter(
      (t) => t.language?.toLowerCase() === "syriac"
    );

    return {
      mainEnglishTitle: englishTitles[0]?.title || "",
      syriacTitle:
        syriacTitles.find(
          (t) => !t.transliteration || t.transliteration === "vocalized"
        )?.title || "",
      syriacTitleNonVocalized:
        syriacTitles.find((t) => t.transliteration === "non-vocalized")
          ?.title || "",
      alternateEnglishTitles: englishTitles.slice(1).map((t) => t.title),
    };
  };

  const initialTitles = getInitialTitles();

  const form = useForm<HymnFormData>({
    resolver: zodResolver(hymnFormSchema),
    defaultValues: {
      mainEnglishTitle: initialTitles.mainEnglishTitle,
      syriacTitle: initialTitles.syriacTitle,
      syriacTitleNonVocalized: initialTitles.syriacTitleNonVocalized,
      alternateEnglishTitles: initialTitles.alternateEnglishTitles,
      originYear: initialData?.originYear,
      category: initialData?.category || "",
      occasion: initialData?.occasion || "",
      meter: initialData?.meter || "",
      description: initialData?.description || "",
      context: initialData?.context || "",
      text: initialData?.text || "",
      tags: initialData?.tags || [],
    },
  });

  const { handleSubmit, control } = form;

  useEffect(() => {
    if (initialTitles.alternateEnglishTitles) {
      setAlternateTitles(initialTitles.alternateEnglishTitles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load authors
  useEffect(() => {
    const loadPersons = async () => {
      try {
        const snapshot = await personService.getAllPersons();
        const personsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setPersonsList(personsData);
      } catch (error) {
        console.error("Error loading persons:", error);
      }
    };
    loadPersons();
  }, []);


  const onSubmit = async (data: HymnFormData) => {
    setIsSubmitting(true);
    try {
      // Convert new title structure to HymnTitle array
      const titles: HymnTitle[] = [];

      // Add main English title
      if (data.mainEnglishTitle) {
        titles.push({
          language: "english",
          title: data.mainEnglishTitle,
        });
      }

      // Add alternate English titles
      alternateTitles.forEach((title) => {
        if (title.trim()) {
          titles.push({
            language: "english",
            title: title.trim(),
          });
        }
      });

      // Add Syriac title (vocalized)
      if (data.syriacTitle) {
        titles.push({
          language: "syriac",
          title: data.syriacTitle,
          transliteration: "vocalized",
        });
      }

      // Add Syriac title (non-vocalized)
      if (data.syriacTitleNonVocalized) {
        titles.push({
          language: "syriac",
          title: data.syriacTitleNonVocalized,
          transliteration: "non-vocalized",
        });
      }

      // Build hymn data, filtering out undefined values
      const hymnData: CreateHymnData = {
        titles,
        authors,
        churchVersions,
        translations,
        hymnImageGroups,
        recordings: initialData?.recordings || [],
        tags: selectedTags,
        isPublished: true, // Always published by default
      };

      // Only add optional fields if they have values
      if (data.originYear) hymnData.originYear = data.originYear;
      if (data.category) hymnData.category = data.category;
      // Preserve any legacy single occasion value untouched
      if (initialData?.occasion) hymnData.occasion = initialData.occasion;
      if (data.meter) hymnData.meter = data.meter;
      if (data.description) hymnData.description = data.description;
      if (data.context) hymnData.context = data.context;
      if (mainTextHtml) hymnData.text = mainTextHtml;

      // Liturgical placements are the single source of truth
      const cleanedUses = liturgicalUses
        .map(cleanLiturgicalUse)
        .filter((u): u is HymnLiturgicalUse => u !== null);
      if (cleanedUses.length) {
        hymnData.liturgicalUses = cleanedUses;
      }
      if (sources.length) {
        const cleaned = sources.filter((s) => s.book && s.book.trim());
        if (cleaned.length) hymnData.sources = cleaned;
      }
      if (reshQale.length) hymnData.reshQale = reshQale;
      hymnData.isReshQala = isReshQala;

      const udraneQalaNum = parseInt(udraneQala, 10);
      if (!isNaN(udraneQalaNum)) {
        const udraneVariantNum = parseInt(udraneVariant, 10);
        hymnData.qaleDUdrane = {
          qala: udraneQalaNum,
          ...(isNaN(udraneVariantNum) ? {} : { variant: udraneVariantNum }),
        };
      }

      if (hymnId) {
        await hymnService.updateHymn(hymnId, hymnData);
        toast.success("Hymn updated successfully!");
      } else {
        // Generate slug from main English title for the hymn ID
        const slug = generateSlug(data.mainEnglishTitle);

        const newHymnId = await hymnService.createHymn(
          hymnData,
          userId,
          userName,
          slug // Pass the slug as custom hymn ID
        );
        toast.success("Hymn created successfully!");
        if (onSuccess) {
          onSuccess(newHymnId);
        }
      }
    } catch (error) {
      console.error("Error saving hymn:", error);
      toast.error("Failed to save hymn");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !selectedTags.includes(tagInput.trim())) {
      setSelectedTags([...selectedTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const addAlternateTitle = () => {
    if (
      alternateTitle.trim() &&
      !alternateTitles.includes(alternateTitle.trim())
    ) {
      setAlternateTitles([...alternateTitles, alternateTitle.trim()]);
      setAlternateTitle("");
    }
  };

  const removeAlternateTitle = (title: string) => {
    setAlternateTitles(alternateTitles.filter((t) => t !== title));
  };

  const addChurchVersion = () => {
    setChurchVersions([
      ...churchVersions,
      { churchName: "", text: "", isMainVersion: false, notes: "" },
    ]);
  };

  const updateChurchVersion = (
    index: number,
    field: keyof ChurchTextVersion,
    value: string | boolean
  ) => {
    const updated = [...churchVersions];
    updated[index] = { ...updated[index], [field]: value };
    setChurchVersions(updated);
  };

  const updateChurchVersionText = (index: number, html: string) => {
    const updated = [...churchVersions];
    updated[index] = { ...updated[index], text: html };
    setChurchVersions(updated);
  };

  const removeChurchVersion = (index: number) => {
    setChurchVersions(churchVersions.filter((_, i) => i !== index));
  };

  const addTranslation = () => {
    setTranslations([
      ...translations,
      { language: "", text: "", translatorName: "", notes: "" },
    ]);
  };

  const updateTranslation = (
    index: number,
    field: keyof TextTranslation,
    value: string
  ) => {
    const updated = [...translations];
    updated[index] = { ...updated[index], [field]: value };
    setTranslations(updated);
  };

  const removeTranslation = (index: number) => {
    setTranslations(translations.filter((_, i) => i !== index));
  };

  // Author management
  const addAuthor = () => {
    setAuthors([...authors, { name: "" }]);
  };

  const updateAuthor = (
    index: number,
    field: keyof HymnAuthor,
    value: string
  ) => {
    const updated = [...authors];
    updated[index] = { ...updated[index], [field]: value };
    setAuthors(updated);
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const addLiturgicalUse = () => {
    setLiturgicalUses([...liturgicalUses, {}]);
  };

  const updateLiturgicalUse = (
    index: number,
    field: keyof HymnLiturgicalUse,
    value: string
  ) => {
    const updated = [...liturgicalUses];
    const next: HymnLiturgicalUse = { ...updated[index] };
    if (field === "week") {
      next.week = value ? Number(value) : undefined;
    } else if (field === "note") {
      next.note = value || undefined;
    } else if (field === "onyathaKindId") {
      next.onyathaKindId = value || undefined;
    } else if (field === "hourVariantId") {
      next.hourVariantId = value || undefined;
    } else if (
      field === "seasonId" ||
      field === "dayId" ||
      field === "hourId" ||
      field === "serviceId" ||
      field === "anaphoraId" ||
      field === "occasionId"
    ) {
      next[field] = value || undefined;
    }
    // Clear anaphora when service is not qurbana
    if (field === "serviceId" && value !== "qurbana") {
      next.anaphoraId = undefined;
    }
    // Clear Ramsha variant when hour is not one that uses Qadmaye/Dahraye
    if (field === "hourId" && !HOURS_WITH_VARIANTS.has(value)) {
      next.hourVariantId = undefined;
    }
    updated[index] = next;
    setLiturgicalUses(updated);
  };

  const removeLiturgicalUse = (index: number) => {
    setLiturgicalUses(liturgicalUses.filter((_, i) => i !== index));
  };

  // Source rows
  const addSource = () => {
    setSources([...sources, { book: "" }]);
  };

  const updateSource = (
    index: number,
    field: keyof HymnSource,
    value: string
  ) => {
    const updated = [...sources];
    updated[index] = { ...updated[index], [field]: value };
    setSources(updated);
  };

  const removeSource = (index: number) => {
    setSources(sources.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Header Section - Similar to HymnDetail */}
          <div className="flex justify-between items-start">
            <div className="space-y-3 flex-1">
              <h1 className="text-3xl font-bold">
                <div className="space-y-4">
                  {/* Main English Title */}
                  <FormField
                    control={control}
                    name="mainEnglishTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter the main English title"
                            className="text-3xl font-bold border-2 border-primary/20 focus:border-primary h-16"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Syriac Title (Vocalized) */}
                    <FormField
                      control={control}
                      name="syriacTitle"
                      render={({ field }) => (
                        <FormItem className="flex-1 min-w-[300px]">
                          <FormControl>
                            <Input
                              placeholder="ܡܰܪܝܳܐ ܪܰܚܶܡ ܥܠܰܝܢ"
                              className="font-['East_Syriac_Adiabene'] font-normal border-2 border-primary/20 focus:border-primary h-16"
                              style={{ fontSize: "2rem" }}
                              dir="rtl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Syriac Title (Non-Vocalized) */}
                    <FormField
                      control={control}
                      name="syriacTitleNonVocalized"
                      render={({ field }) => (
                        <FormItem className="flex-1 min-w-[250px]">
                          <FormControl>
                            <Input
                              placeholder="ܡܪܝܐ ܪܚܡ ܥܠܝܢ"
                              className="font-normal border-2 border-primary/20 focus:border-primary h-14"
                              style={{ fontSize: "1.5rem" }}
                              dir="rtl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </h1>

              {/* Alternate English Titles */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={alternateTitle}
                    onChange={(e) => setAlternateTitle(e.target.value)}
                    placeholder="Add alternate title"
                    className="text-lg"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addAlternateTitle();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addAlternateTitle}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {alternateTitles.length > 0 && (
                  <div className="text-lg text-muted-foreground">
                    {alternateTitles.map((title, idx) => (
                      <span key={idx}>
                        {idx > 0 && " • "}
                        {title}
                        <button
                          type="button"
                          onClick={() => removeAlternateTitle(title)}
                          className="ml-2 hover:text-red-500 text-sm"
                        >
                          <X className="h-3 w-3 inline" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Information Section - Compact like HymnDetail */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {/* Authors */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Authors</Label>
              {authors.map((author, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={author.name}
                    onChange={(e) =>
                      updateAuthor(index, "name", e.target.value)
                    }
                    placeholder="Author name"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAuthor(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAuthor}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Author
              </Button>
            </div>

            {/* Origin Year */}
            <FormField
              control={control}
              name="originYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origin Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 350"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || undefined)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Genre */}
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {HYMN_GENRES.map((genre) => (
                        <SelectItem key={genre.id} value={genre.id}>
                          {genre.label}
                          {genre.syriac ? ` (${genre.syriac})` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Meter */}
            <FormField
              control={control}
              name="meter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meter</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 7+7" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTag}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Liturgical Tagging */}
          <Card>
            <CardHeader className="pb-2 px-8">
              <CardTitle>Liturgical Tagging</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-8 space-y-4">
              <p className="text-sm text-muted-foreground">
                Add one row per distinct use. The same hymn can appear at
                different hours, services, weeks, or seasons.
              </p>
              {liturgicalUses.map((use, index) => (
                <div
                  key={index}
                  className="rounded-md border p-3 space-y-2"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    <select
                      value={use.seasonId || ""}
                      onChange={(e) =>
                        updateLiturgicalUse(index, "seasonId", e.target.value)
                      }
                      className="h-9 rounded-md border bg-background px-2 text-sm"
                    >
                      <option value="">Season</option>
                      {LITURGICAL_SEASONS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.english}
                        </option>
                      ))}
                    </select>
                    <select
                      value={use.week ?? ""}
                      onChange={(e) =>
                        updateLiturgicalUse(index, "week", e.target.value)
                      }
                      className="h-9 rounded-md border bg-background px-2 text-sm"
                    >
                      <option value="">Week</option>
                      {WEEK_NUMBERS.map((n) => (
                        <option key={n} value={n}>
                          Week {n}
                        </option>
                      ))}
                    </select>
                    <select
                      value={use.dayId || ""}
                      onChange={(e) =>
                        updateLiturgicalUse(index, "dayId", e.target.value)
                      }
                      className="h-9 rounded-md border bg-background px-2 text-sm"
                    >
                      <option value="">Weekday</option>
                      {WEEKDAYS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.english}
                        </option>
                      ))}
                    </select>
                    <select
                      value={use.hourId || ""}
                      onChange={(e) =>
                        updateLiturgicalUse(index, "hourId", e.target.value)
                      }
                      className="h-9 rounded-md border bg-background px-2 text-sm"
                    >
                      <option value="">Office hour</option>
                      {LITURGICAL_HOURS.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.english}
                        </option>
                      ))}
                    </select>
                    {use.hourId && HOURS_WITH_VARIANTS.has(use.hourId) && (
                      <select
                        value={use.hourVariantId || ""}
                        onChange={(e) =>
                          updateLiturgicalUse(
                            index,
                            "hourVariantId",
                            e.target.value
                          )
                        }
                        className="h-9 rounded-md border bg-background px-2 text-sm"
                      >
                        <option value="">Ramsha set</option>
                        {HOUR_VARIANTS.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.english}
                            {v.syriac ? ` (${v.syriac})` : ""}
                          </option>
                        ))}
                      </select>
                    )}
                    <select
                      value={use.onyathaKindId || ""}
                      onChange={(e) =>
                        updateLiturgicalUse(
                          index,
                          "onyathaKindId",
                          e.target.value
                        )
                      }
                      className="h-9 rounded-md border bg-background px-2 text-sm"
                    >
                      <option value="">Onitha kind</option>
                      {ONYATHA_KINDS.map((k) => (
                        <option key={k.id} value={k.id}>
                          {k.english}
                          {k.syriac ? ` (${k.syriac})` : ""}
                        </option>
                      ))}
                    </select>
                    <select
                      value={use.serviceId || ""}
                      onChange={(e) =>
                        updateLiturgicalUse(index, "serviceId", e.target.value)
                      }
                      className="h-9 rounded-md border bg-background px-2 text-sm"
                    >
                      <option value="">Service / rite</option>
                      {LITURGICAL_SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.english}
                        </option>
                      ))}
                    </select>
                    {use.serviceId === "qurbana" && (
                      <select
                        value={use.anaphoraId || ""}
                        onChange={(e) =>
                          updateLiturgicalUse(
                            index,
                            "anaphoraId",
                            e.target.value
                          )
                        }
                        className="h-9 rounded-md border bg-background px-2 text-sm"
                      >
                        <option value="">Anaphora</option>
                        {ANAPHORAS.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.english}
                          </option>
                        ))}
                      </select>
                    )}
                    <select
                      value={use.occasionId || ""}
                      onChange={(e) =>
                        updateLiturgicalUse(index, "occasionId", e.target.value)
                      }
                      className="h-9 rounded-md border bg-background px-2 text-sm"
                    >
                      <option value="">Feast / occasion</option>
                      {LITURGICAL_OCCASIONS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.english}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2 sm:col-span-2 lg:col-span-1">
                      <Input
                        value={use.note || ""}
                        onChange={(e) =>
                          updateLiturgicalUse(index, "note", e.target.value)
                        }
                        placeholder="Note (optional)"
                        className="h-9"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLiturgicalUse(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addLiturgicalUse}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Placement
              </Button>
            </CardContent>
          </Card>

          {/* Resh Qala */}
          <Card>
            <CardHeader className="pb-2 px-8">
              <CardTitle>Resh Qala (Tune)</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-8 space-y-4">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="isReshQala"
                  checked={isReshQala}
                  onCheckedChange={(checked) =>
                    setIsReshQala(checked === true)
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="isReshQala"
                    className="text-sm font-medium cursor-pointer"
                  >
                    This hymn is a Resh Qala
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Mark when this hymn is itself a model tune, not only sung to
                    another.
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Add one or more model tunes this hymn is sung to. Use a separate
                  entry per part when sections use different qale. Optional - not
                  every hymn has a resh qala. Search by any attested name.
                </p>
                <ReshQalaPicker value={reshQale} onChange={setReshQale} />
              </div>
            </CardContent>
          </Card>

          {/* Qale d'Udrane */}
          <Card>
            <CardHeader className="pb-2 px-8">
              <CardTitle>Qale d&apos;Udrane</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-8">
              <p className="text-sm text-muted-foreground mb-3">
                Catalogue number within the Qale d&apos;Udrane collection.
                Optional - only for the ~70 onyatha in that collection. Separate
                from the other tags.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                <div>
                  <label className="text-sm font-medium mb-1 block">Qala</label>
                  <Input
                    type="number"
                    min={1}
                    value={udraneQala}
                    onChange={(e) => setUdraneQala(e.target.value)}
                    placeholder="e.g. 18"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Variant (optional)
                  </label>
                  <Input
                    type="number"
                    min={1}
                    value={udraneVariant}
                    onChange={(e) => setUdraneVariant(e.target.value)}
                    placeholder="e.g. 4"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sources */}
          <Card>
            <CardHeader className="pb-2 px-8">
              <CardTitle>Sources</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-8 space-y-3">
              {sources.map((source, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center"
                >
                  <Input
                    value={source.book}
                    onChange={(e) =>
                      updateSource(index, "book", e.target.value)
                    }
                    placeholder="Book"
                    className="md:col-span-2"
                  />
                  <Input
                    value={source.volume || ""}
                    onChange={(e) =>
                      updateSource(index, "volume", e.target.value)
                    }
                    placeholder="Volume (optional)"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={source.page || ""}
                      onChange={(e) =>
                        updateSource(index, "page", e.target.value)
                      }
                      placeholder="Page"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSource(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSource}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Source
              </Button>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader className="pb-2 px-8">
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-8">
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of the hymn"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Context */}
          <Card>
            <CardHeader className="pb-2 px-8">
              <CardTitle>Context</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-8">
              <FormField
                control={control}
                name="context"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Historical or liturgical context"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      When and how this hymn is traditionally used
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Text */}
          <Card>
            <CardHeader className="pb-2 px-8">
              <CardTitle>Text</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-8">
              <div className="space-y-2">
                <div className="border rounded-md min-h-[400px]">
                  <SyriacEditor
                    content={mainTextHtml}
                    onUpdate={(html) => setMainTextHtml(html)}
                    textDirection="rtl"
                  />
                </div>
                <FormDescription>
                  Enter the full text of the hymn in Syriac script
                </FormDescription>
              </div>
            </CardContent>
          </Card>

          {/* Translations */}
          <Card>
            <CardHeader className="pb-2 px-8">
              <CardTitle>Translations</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-8 space-y-4">
              {translations.map((translation, index) => (
                <div key={index} className="space-y-4 p-4 border rounded">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">
                      Translation {index + 1}
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTranslation(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Language</Label>
                      <Input
                        value={translation.language}
                        onChange={(e) =>
                          updateTranslation(index, "language", e.target.value)
                        }
                        placeholder="e.g., english, malayalam"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Translator Name (optional)
                      </Label>
                      <Input
                        value={translation.translatorName || ""}
                        onChange={(e) =>
                          updateTranslation(
                            index,
                            "translatorName",
                            e.target.value
                          )
                        }
                        placeholder="Translator name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Translation Text
                    </Label>
                    <Textarea
                      value={translation.text}
                      onChange={(e) =>
                        updateTranslation(index, "text", e.target.value)
                      }
                      placeholder="Translated text"
                      rows={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Notes (optional)
                    </Label>
                    <Input
                      value={translation.notes || ""}
                      onChange={(e) =>
                        updateTranslation(index, "notes", e.target.value)
                      }
                      placeholder="Translation notes"
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTranslation}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Translation
              </Button>
            </CardContent>
          </Card>

          {/* Church Versions */}
          <Card>
            <CardHeader className="pb-2 px-8">
              <CardTitle>Church-Specific Versions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-8 space-y-4">
              {churchVersions.map((version, index) => (
                <div key={index} className="space-y-4 p-4 border rounded">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">
                      Version {index + 1}
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeChurchVersion(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Church Tradition
                      </Label>
                      <Select
                        value={version.churchName}
                        onValueChange={(value) =>
                          updateChurchVersion(index, "churchName", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select church" />
                        </SelectTrigger>
                        <SelectContent>
                          {CHURCH_TRADITIONS.map((church) => (
                            <SelectItem key={church} value={church}>
                              {church}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center pt-6">
                      <input
                        type="checkbox"
                        id={`main-version-${index}`}
                        checked={version.isMainVersion}
                        onChange={(e) =>
                          updateChurchVersion(
                            index,
                            "isMainVersion",
                            e.target.checked
                          )
                        }
                        className="mr-2 h-4 w-4"
                      />
                      <Label
                        htmlFor={`main-version-${index}`}
                        className="cursor-pointer"
                      >
                        Main Version
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Text (Syriac)</Label>
                    <div className="border rounded-md min-h-[300px]">
                      <SyriacEditor
                        content={version.text}
                        onUpdate={(html) =>
                          updateChurchVersionText(index, html)
                        }
                        textDirection="rtl"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Notes (optional)
                    </Label>
                    <Input
                      value={version.notes || ""}
                      onChange={(e) =>
                        updateChurchVersion(index, "notes", e.target.value)
                      }
                      placeholder="Additional notes"
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addChurchVersion}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Church Version
              </Button>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : hymnId
                ? "Update Hymn"
                : "Create Hymn"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
