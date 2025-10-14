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
  HYMN_CATEGORIES,
  HYMN_OCCASIONS,
  CHURCH_TRADITIONS,
  HymnTitle,
  ChurchTextVersion,
  TextTranslation,
  HymnAuthor,
  BookPageImageGroup,
} from "@/lib/types/hymn";
import { hymnService, personService } from "@/lib/hymn-services";
import { X, Plus } from "lucide-react";

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
  const [personsList, setPersonsList] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tags || []
  );
  const [alternateTitle, setAlternateTitle] = useState("");
  const [alternateTitles, setAlternateTitles] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState("");
  const [customOccasion, setCustomOccasion] = useState("");

  const [authors, setAuthors] = useState<HymnAuthor[]>(
    initialData?.authors || []
  );
  const [churchVersions, setChurchVersions] = useState<ChurchTextVersion[]>(
    initialData?.churchVersions || []
  );
  const [translations, setTranslations] = useState<TextTranslation[]>(
    initialData?.translations || []
  );
  const [bookPageImageGroups, setBookPageImageGroups] = useState<
    BookPageImageGroup[]
  >(initialData?.bookPageImageGroups || []);

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

  const { handleSubmit, control, setValue } = form;

  useEffect(() => {
    if (initialTitles.alternateEnglishTitles) {
      setAlternateTitles(initialTitles.alternateEnglishTitles);
    }

    // Check if category is custom (not in predefined list)
    if (
      initialData?.category &&
      !HYMN_CATEGORIES.includes(initialData.category as any)
    ) {
      setCustomCategory(initialData.category);
    }

    // Check if occasion is custom (not in predefined list)
    if (
      initialData?.occasion &&
      !HYMN_OCCASIONS.includes(initialData.occasion as any)
    ) {
      setCustomOccasion(initialData.occasion);
    }
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
        bookPageImageGroups,
        recordings: initialData?.recordings || [],
        tags: selectedTags,
        isPublished: true, // Always published by default
      };

      // Only add optional fields if they have values
      if (data.originYear) hymnData.originYear = data.originYear;
      if (data.category) hymnData.category = data.category;
      if (data.occasion) hymnData.occasion = data.occasion;
      if (data.meter) hymnData.meter = data.meter;
      if (data.description) hymnData.description = data.description;
      if (data.context) hymnData.context = data.context;
      if (data.text) hymnData.text = data.text;

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
    value: any
  ) => {
    const updated = [...churchVersions];
    updated[index] = { ...updated[index], [field]: value };
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
    value: any
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

  const updateAuthor = (index: number, field: keyof HymnAuthor, value: any) => {
    const updated = [...authors];
    updated[index] = { ...updated[index], [field]: value };
    setAuthors(updated);
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  // Image group management
  const addImageGroup = () => {
    setBookPageImageGroups([
      ...bookPageImageGroups,
      { churchName: "", images: [], source: "", description: "" },
    ]);
  };

  const updateImageGroup = (
    index: number,
    field: keyof BookPageImageGroup,
    value: any
  ) => {
    const updated = [...bookPageImageGroups];
    updated[index] = { ...updated[index], [field]: value };
    setBookPageImageGroups(updated);
  };

  const removeImageGroup = (index: number) => {
    setBookPageImageGroups(bookPageImageGroups.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Titles Section */}
        <Card>
          <CardHeader>
            <CardTitle>Titles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main English Title */}
            <FormField
              control={control}
              name="mainEnglishTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main English Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the main English title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Syriac Title (Vocalized) */}
            <FormField
              control={control}
              name="syriacTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Syriac Title (Vocalized)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the Syriac title with vowel marks"
                      className="!text-2xl font-['East_Syriac_Adiabene'] h-14"
                      dir="rtl"
                      style={{ fontSize: "24px" }}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>With vowel marks (ܙܘܥ̈ܐ)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Syriac Title (Non-Vocalized) */}
            <FormField
              control={control}
              name="syriacTitleNonVocalized"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Syriac Title (Non-Vocalized)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the Syriac title without vowel marks"
                      className="!text-2xl font-['East_Syriac_Adiabene'] h-14"
                      dir="rtl"
                      style={{ fontSize: "24px" }}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Without vowel marks</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Alternate English Titles */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Alternate English Titles (Spellings)
              </Label>
              <div className="flex gap-2">
                <Input
                  value={alternateTitle}
                  onChange={(e) => setAlternateTitle(e.target.value)}
                  placeholder="Add an alternate spelling"
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
                <div className="flex flex-wrap gap-2">
                  {alternateTitles.map((title, idx) => (
                    <Badge key={idx} variant="secondary">
                      {title}
                      <button
                        type="button"
                        onClick={() => removeAlternateTitle(title)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Authors */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Authors</Label>
              {authors.map((author, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Author Name *</Label>
                      <Input
                        value={author.name}
                        onChange={(e) =>
                          updateAuthor(index, "name", e.target.value)
                        }
                        placeholder="Enter author name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Person ID (optional)</Label>
                      <Select
                        value={author.id || ""}
                        onValueChange={(value) =>
                          updateAuthor(index, "id", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select from persons" />
                        </SelectTrigger>
                        <SelectContent>
                          {personsList.map((person) => (
                            <SelectItem key={person.id} value={person.id}>
                              {person.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAuthor(index)}
                    className="mt-7"
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

            {/* Origin Year Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <FormDescription>
                      Approximate year of composition
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category & Occasion Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    {field.value === "Other" ? (
                      <FormControl>
                        <Input
                          placeholder="Enter custom category"
                          value={customCategory}
                          onChange={(e) => {
                            setCustomCategory(e.target.value);
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                    ) : (
                      <Select
                        onValueChange={(value) => {
                          if (value === "Other") {
                            setCustomCategory("");
                          }
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {HYMN_CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="occasion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occasion</FormLabel>
                    {field.value === "Other" ? (
                      <FormControl>
                        <Input
                          placeholder="Enter custom occasion"
                          value={customOccasion}
                          onChange={(e) => {
                            setCustomOccasion(e.target.value);
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                    ) : (
                      <Select
                        onValueChange={(value) => {
                          if (value === "Other") {
                            setCustomOccasion("");
                          }
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select occasion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {HYMN_OCCASIONS.map((occ) => (
                            <SelectItem key={occ} value={occ}>
                              {occ}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                  <FormDescription>
                    Poetic meter pattern (if applicable)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
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

            {/* Context */}
            <FormField
              control={control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Context</FormLabel>
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

            {/* Tags */}
            <div className="space-y-3">
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
                <Button type="button" variant="outline" onClick={addTag}>
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
          </CardContent>
        </Card>

        {/* Main Text */}
        <Card>
          <CardHeader>
            <CardTitle>Main Text</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hymn Text (Syriac)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the main text of the hymn in Syriac"
                      rows={12}
                      className="!text-2xl font-['East_Syriac_Adiabene'] leading-loose"
                      dir="rtl"
                      style={{ fontSize: "24px" }}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the full text of the hymn in Syriac script
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Translations */}
        <Card>
          <CardHeader>
            <CardTitle>Translations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          <CardHeader>
            <CardTitle>Church-Specific Versions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                  <Textarea
                    value={version.text}
                    onChange={(e) =>
                      updateChurchVersion(index, "text", e.target.value)
                    }
                    placeholder="Enter hymn text in this tradition"
                    rows={8}
                    className="!text-2xl font-['East_Syriac_Adiabene'] leading-loose"
                    dir="rtl"
                    style={{ fontSize: "24px" }}
                  />
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
  );
}
