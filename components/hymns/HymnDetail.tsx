"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Hymn,
  HymnRecording,
  sortByChurchPriority,
  CHURCH_DISPLAY_ORDER,
} from "@/lib/types/hymn";
import {
  Music,
  User,
  Calendar,
  Book,
  Globe,
  Video,
  ExternalLink,
} from "lucide-react";

interface HymnDetailProps {
  hymn: Hymn;
  showEditButton?: boolean;
  onEdit?: () => void;
  hideImages?: boolean;
  hideRecordings?: boolean;
  currentUserId?: string; // For filtering recordings
  userRole?: string; // For admin permissions
}

export default function HymnDetail({
  hymn,
  showEditButton,
  onEdit,
  hideImages = false,
  hideRecordings = false,
  currentUserId,
  userRole,
}: HymnDetailProps) {
  // Tab state for main text section
  const [activeMainTab, setActiveMainTab] = useState("syriac");

  // Tab state for church versions (indexed by version index)
  const [activeVersionTabs, setActiveVersionTabs] = useState<
    Record<number, string>
  >({});

  // State for expanded image groups
  const [expandedImageGroups, setExpandedImageGroups] = useState<
    Record<number, boolean>
  >({});

  // Format date as "10 Jan 2025"
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Group recordings by church tradition
  const groupRecordingsByChurch = (recordings: HymnRecording[]) => {
    const grouped: { [key: string]: HymnRecording[] } = {};
    const ungrouped: HymnRecording[] = [];

    recordings.forEach((recording) => {
      const church = recording.church;
      if (church) {
        if (!grouped[church]) {
          grouped[church] = [];
        }
        grouped[church].push(recording);
      } else {
        ungrouped.push(recording);
      }
    });

    // Sort groups by church display order
    const sortedGroups = Object.entries(grouped).sort(
      ([churchA], [churchB]) => {
        const indexA = CHURCH_DISPLAY_ORDER.indexOf(
          churchA as (typeof CHURCH_DISPLAY_ORDER)[number]
        );
        const indexB = CHURCH_DISPLAY_ORDER.indexOf(
          churchB as (typeof CHURCH_DISPLAY_ORDER)[number]
        );
        const priorityA = indexA === -1 ? 999 : indexA;
        const priorityB = indexB === -1 ? 999 : indexB;
        return priorityA - priorityB;
      }
    );

    return { sortedGroups, ungrouped };
  };

  const renderRecording = (recording: HymnRecording) => {
    const getIcon = () => {
      switch (recording.type) {
        case "audio":
          return <Music className="h-4 w-4" />;
        case "video":
          return <Video className="h-4 w-4" />;
        case "youtube":
          return <ExternalLink className="h-4 w-4" />;
        case "link":
          return <ExternalLink className="h-4 w-4" />;
        default:
          return <Music className="h-4 w-4" />;
      }
    };

    // Build metadata line
    const metadata = [];
    if (recording.performers && recording.performers.length > 0) {
      metadata.push(recording.performers.map((p) => p.name).join(", "));
    }
    if (recording.year) {
      metadata.push(recording.year.toString());
    }
    if (recording.duration) {
      metadata.push(recording.duration);
    }

    return (
      <div key={recording.id} className="py-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-muted-foreground flex-shrink-0">{getIcon()}</div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-base">
              {recording.title ||
                `${
                  recording.type.charAt(0).toUpperCase() +
                  recording.type.slice(1)
                } Recording`}
            </div>
            {metadata.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {metadata.join(" • ")}
              </div>
            )}
            {recording.description && (
              <div className="text-sm text-muted-foreground mt-1 italic">
                {recording.description}
              </div>
            )}
            {recording.contributorName && (
              <div className="text-sm text-muted-foreground mt-1">
                Added by {recording.contributorName}
              </div>
            )}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {recording.type === "youtube" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(recording.url, "_blank")}
              >
                Watch
              </Button>
            )}
            {recording.type === "link" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(recording.url, "_blank")}
              >
                Visit
              </Button>
            )}
            {(recording.type === "audio" || recording.type === "video") &&
              recording.originalUrl &&
              !recording.originalUrl.includes(
                "firebasestorage.googleapis.com"
              ) && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(recording.originalUrl, "_blank")}
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open
                </Button>
              )}
          </div>
        </div>

        {/* Audio/Video Player - Below the details */}
        {(recording.type === "audio" || recording.type === "video") && (
          <div className="ml-8">
            {recording.type === "audio" ? (
              <audio
                controls
                preload="none"
                controlsList="nodownload"
                className="w-full h-8"
              >
                <source src={recording.url} type="audio/mpeg" />
                <source src={recording.url} type="audio/wav" />
                <source src={recording.url} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <video
                controls
                preload="none"
                controlsList="nodownload"
                className="w-full max-w-md rounded border"
              >
                <source src={recording.url} type="video/mp4" />
                <source src={recording.url} type="video/webm" />
                <source src={recording.url} type="video/ogg" />
                Your browser does not support the video element.
              </video>
            )}
          </div>
        )}
      </div>
    );
  };

  // Get titles
  const mainEnglishTitle = hymn.titles?.find(
    (t) => t.language?.toLowerCase() === "english"
  );
  const englishTitle = mainEnglishTitle?.title || "Untitled";

  const syriacVocalizedTitle = hymn.titles?.find(
    (t) =>
      t.language?.toLowerCase() === "syriac" &&
      t.transliteration !== "non-vocalized"
  );

  const syriacNonVocalizedTitle = hymn.titles?.find(
    (t) =>
      t.language?.toLowerCase() === "syriac" &&
      t.transliteration === "non-vocalized"
  );

  // Get alternate titles (exclude the specific ones we're showing in the header)
  const alternateTitles =
    hymn.titles?.filter(
      (t) =>
        t !== mainEnglishTitle &&
        t !== syriacVocalizedTitle &&
        t !== syriacNonVocalizedTitle
    ) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">
            <div className="flex flex-wrap items-center gap-3">
              <span>{englishTitle}</span>
              {syriacVocalizedTitle && (
                <>
                  <span className="text-muted-foreground font-normal">|</span>
                  <span
                    className="font-['East_Syriac_Adiabene'] text-4xl font-normal"
                    dir="rtl"
                  >
                    {syriacVocalizedTitle.title}
                  </span>
                </>
              )}
              {syriacNonVocalizedTitle && (
                <>
                  <span className="text-muted-foreground font-normal">|</span>
                  <span className="text-2xl font-normal" dir="rtl">
                    {syriacNonVocalizedTitle.title}
                  </span>
                </>
              )}
            </div>
          </h1>

          {/* Alternate titles */}
          {alternateTitles.length > 0 && (
            <div className="text-lg text-muted-foreground">
              {alternateTitles.map((title, index) => (
                <span key={index}>
                  {index > 0 && " • "}
                  {title.title}
                </span>
              ))}
            </div>
          )}
        </div>
        {showEditButton && onEdit && (
          <Button onClick={onEdit}>Edit Hymn</Button>
        )}
      </div>

      {/* Information - compact */}
      <div className="flex flex-wrap gap-2 text-sm">
        {hymn.authors &&
          hymn.authors.length > 0 &&
          hymn.authors.map((author, idx) => (
            <Badge key={idx} variant="outline" className="gap-1">
              <User className="h-3 w-3" />
              {author.name}
            </Badge>
          ))}
        {hymn.originYear && (
          <Badge variant="outline" className="gap-1">
            <Calendar className="h-3 w-3" />
            {hymn.originYear}
          </Badge>
        )}
        {hymn.category && (
          <Badge variant="secondary" className="gap-1">
            <Book className="h-3 w-3" />
            {hymn.category}
          </Badge>
        )}
        {hymn.occasion && (
          <Badge variant="outline" className="gap-1">
            {hymn.occasion}
          </Badge>
        )}
        {hymn.meter && (
          <Badge variant="outline" className="gap-1">
            <Music className="h-3 w-3" />
            {hymn.meter}
          </Badge>
        )}
        {hymn.tags &&
          hymn.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
      </div>

      {/* Description */}
      {hymn.description && (
        <Card className="gap-2">
          <CardHeader className="pb-2 px-8">
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-8">
            <p className="whitespace-pre-wrap text-muted-foreground">
              {hymn.description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Context */}
      {hymn.context && (
        <Card className="gap-2">
          <CardHeader className="pb-2 px-8">
            <CardTitle>Context</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-8">
            <p className="whitespace-pre-wrap text-muted-foreground italic">
              {hymn.context}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Text */}
      {hymn.text && (
        <Card className="gap-2">
          <CardHeader className="pb-2 px-8">
            <CardTitle>Text</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-8">
            {hymn.translations && hymn.translations.length > 0 ? (
              <div className="space-y-4">
                {/* Tab Navigation */}
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveMainTab("syriac")}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeMainTab === "syriac"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Syriac Text
                  </button>
                  {hymn.translations.map((translation, tIndex) => (
                    <button
                      key={tIndex}
                      onClick={() => setActiveMainTab(`translation-${tIndex}`)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
                        activeMainTab === `translation-${tIndex}`
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {translation.language}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[200px]">
                  {activeMainTab === "syriac" && (
                    <div
                      className="whitespace-pre-wrap leading-relaxed text-justify prose prose-slate max-w-none"
                      style={{
                        fontFamily: "East Syriac Adiabene, serif",
                        fontSize: "28px",
                      }}
                      dir="rtl"
                      dangerouslySetInnerHTML={{ __html: hymn.text || "" }}
                    />
                  )}
                  {hymn.translations.map(
                    (translation, tIndex) =>
                      activeMainTab === `translation-${tIndex}` && (
                        <div key={tIndex} className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <Globe className="h-4 w-4" />
                            <span className="capitalize">
                              {translation.language}
                            </span>
                            {translation.translatorName && (
                              <span className="text-xs text-muted-foreground font-normal">
                                by {translation.translatorName}
                              </span>
                            )}
                          </div>
                          <pre
                            className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground"
                            style={{
                              fontFamily:
                                translation.language?.toLowerCase() ===
                                "malayalam"
                                  ? "Noto Sans Malayalam, sans-serif"
                                  : "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                            }}
                          >
                            {translation.text}
                          </pre>
                          {translation.notes && (
                            <p className="text-xs text-muted-foreground italic">
                              {translation.notes}
                            </p>
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            ) : (
              /* Full width Syriac text when no translations */
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">
                  Syriac Text
                </h4>
                <div
                  className="whitespace-pre-wrap leading-relaxed text-justify prose prose-slate max-w-none"
                  style={{
                    fontFamily: "East Syriac Adiabene, serif",
                    fontSize: "28px",
                  }}
                  dir="rtl"
                  dangerouslySetInnerHTML={{ __html: hymn.text || "" }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Church Versions with Translations */}
      {hymn.churchVersions && hymn.churchVersions.length > 0 && (
        <div className="space-y-6">
          {hymn.churchVersions.map((version, index) => (
            <Card key={index}>
              <CardHeader className="pb-2 px-8">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    {version.churchName}
                  </CardTitle>
                  {version.isMainVersion && (
                    <Badge variant="default">Main Version</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-0 px-8">
                {version.translations && version.translations.length > 0 ? (
                  <div className="space-y-4">
                    {/* Tab Navigation */}
                    <div className="flex border-b">
                      <button
                        onClick={() =>
                          setActiveVersionTabs((prev) => ({
                            ...prev,
                            [index]: "syriac",
                          }))
                        }
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                          (activeVersionTabs[index] || "syriac") === "syriac"
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Syriac Text
                      </button>
                      {version.translations.map((translation, tIndex) => (
                        <button
                          key={tIndex}
                          onClick={() =>
                            setActiveVersionTabs((prev) => ({
                              ...prev,
                              [index]: `translation-${tIndex}`,
                            }))
                          }
                          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
                            (activeVersionTabs[index] || "syriac") ===
                            `translation-${tIndex}`
                              ? "border-primary text-primary"
                              : "border-transparent text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {translation.language}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[200px]">
                      {(activeVersionTabs[index] || "syriac") === "syriac" && (
                        <div
                          className="whitespace-pre-wrap leading-relaxed text-justify prose prose-slate max-w-none"
                          style={{
                            fontFamily: "East Syriac Adiabene, serif",
                            fontSize: "28px",
                          }}
                          dir="rtl"
                          dangerouslySetInnerHTML={{
                            __html: version.text || "",
                          }}
                        />
                      )}
                      {version.translations.map(
                        (translation, tIndex) =>
                          (activeVersionTabs[index] || "syriac") ===
                            `translation-${tIndex}` && (
                            <div key={tIndex} className="space-y-2">
                              <div className="flex items-center gap-2 text-sm font-semibold">
                                <Globe className="h-4 w-4" />
                                <span className="capitalize">
                                  {translation.language}
                                </span>
                                {translation.translatorName && (
                                  <span className="text-xs text-muted-foreground font-normal">
                                    by {translation.translatorName}
                                  </span>
                                )}
                              </div>
                              <pre
                                className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground"
                                style={{
                                  fontFamily:
                                    translation.language?.toLowerCase() ===
                                    "malayalam"
                                      ? "Noto Sans Malayalam, sans-serif"
                                      : "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                                }}
                              >
                                {translation.text}
                              </pre>
                              {translation.notes && (
                                <p className="text-xs text-muted-foreground italic">
                                  {translation.notes}
                                </p>
                              )}
                            </div>
                          )
                      )}
                    </div>
                  </div>
                ) : (
                  /* Full width Syriac text when no translations */
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      Syriac Text
                    </h4>
                    <div
                      className="whitespace-pre-wrap leading-relaxed text-justify prose prose-slate max-w-none"
                      style={{
                        fontFamily: "East Syriac Adiabene, serif",
                        fontSize: "28px",
                      }}
                      dir="rtl"
                      dangerouslySetInnerHTML={{ __html: version.text || "" }}
                    />
                  </div>
                )}

                {version.notes && (
                  <p className="text-sm text-muted-foreground italic border-t pt-4">
                    Note: {version.notes}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Images */}
      {!hideImages &&
        hymn.hymnImageGroups &&
        hymn.hymnImageGroups.length > 0 && (
          <Card className="gap-2">
            <CardHeader className="pb-2 px-8">
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-8">
              <div className="space-y-6">
                {sortByChurchPriority(hymn.hymnImageGroups).map(
                  (group, groupIndex) => {
                    const isExpanded = expandedImageGroups[groupIndex];
                    const hasMultipleImages = group.images.length > 1;

                    return (
                      <div key={groupIndex} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-lg">
                            {group.churchName}
                          </h4>
                          {isExpanded && hasMultipleImages && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setExpandedImageGroups((prev) => ({
                                  ...prev,
                                  [groupIndex]: !isExpanded,
                                }))
                              }
                            >
                              Show Less
                            </Button>
                          )}
                        </div>

                        <div className="space-y-4">
                          {/* Preview of first image with fade effect */}
                          <div className="relative w-full">
                            <Image
                              src={group.images[0]}
                              alt={`${
                                !group.churchName ? "General" : group.churchName
                              } page 1`}
                              width={800}
                              height={600}
                              className="w-full h-auto rounded border"
                              style={{ objectFit: "contain" }}
                              priority={true}
                            />

                            {/* Fade overlay and View More button */}
                            {hasMultipleImages && !isExpanded && (
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 rounded border">
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setExpandedImageGroups((prev) => ({
                                        ...prev,
                                        [groupIndex]: !isExpanded,
                                      }))
                                    }
                                    className="bg-white/95 backdrop-blur-sm shadow-lg"
                                  >
                                    View More ({group.images.length - 1} more)
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Show additional images only when expanded */}
                          {isExpanded &&
                            group.images.slice(1).map((imageUrl, imgIndex) => (
                              <div
                                key={imgIndex + 1}
                                className="relative w-full"
                              >
                                <Image
                                  src={imageUrl}
                                  alt={`${
                                    !group.churchName
                                      ? "General"
                                      : group.churchName
                                  } page ${imgIndex + 2}`}
                                  width={800}
                                  height={600}
                                  className="w-full h-auto rounded border"
                                  style={{ objectFit: "contain" }}
                                  loading="lazy"
                                />
                              </div>
                            ))}
                        </div>

                        {group.source && (
                          <p className="text-sm text-muted-foreground">
                            Source: {group.source}
                          </p>
                        )}
                        {group.description && (
                          <p className="text-sm text-muted-foreground">
                            {group.description}
                          </p>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>
        )}

      {/* Recordings */}
      {!hideRecordings && (
        <Card>
          <CardHeader className="pb-2 px-8">
            <CardTitle>Recordings</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-8">
            {hymn.recordings && hymn.recordings.length > 0 ? (
              <div className="space-y-6">
                {(() => {
                  // Filter recordings based on user permissions
                  const visibleRecordings = hymn.recordings.filter(
                    (recording) => {
                      if (userRole === "admin") return true; // Admins see all recordings
                      if ((recording.status || "approved") === "approved")
                        return true; // Everyone sees approved recordings (default to approved for legacy recordings)
                      if (
                        currentUserId &&
                        recording.contributorId === currentUserId
                      )
                        return true; // Users see their own pending recordings
                      return false; // Hide other users' pending/rejected recordings
                    }
                  );

                  const { sortedGroups, ungrouped } =
                    groupRecordingsByChurch(visibleRecordings);
                  return (
                    <>
                      {sortedGroups.map(([church, recordings]) => (
                        <div key={church} className="space-y-2">
                          <h4 className="font-semibold text-lg text-muted-foreground px-1">
                            {church}
                          </h4>
                          <div className="divide-y">
                            {recordings.map((recording) =>
                              renderRecording(recording)
                            )}
                          </div>
                        </div>
                      ))}
                      {ungrouped.length > 0 && (
                        <div className="space-y-2">
                          {sortedGroups.length > 0 && (
                            <h4 className="font-semibold text-lg text-muted-foreground px-1">
                              Other
                            </h4>
                          )}
                          <div className="divide-y">
                            {ungrouped.map((recording) =>
                              renderRecording(recording)
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center py-8">
                <Music className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No recordings yet. Recordings of this hymn from different
                  traditions will appear here.
                </p>
              </div>
            )}

            {/* Account creation prompt for non-logged-in users */}
            {!currentUserId && (
              <div className="text-center py-4 border-t">
                <p className="text-sm text-muted-foreground">
                  To submit a recording for this hymn, please{" "}
                  <Link
                    href="/signup"
                    className="text-primary hover:underline font-medium"
                  >
                    create an account
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Metadata footer */}
      <div className="text-xs text-muted-foreground text-center space-x-3 pt-4 border-t">
        <span>Added by {hymn.addedByName}</span>
        <span>•</span>
        <span>Created {formatDate(new Date(hymn.createdAt))}</span>
        <span>•</span>
        <span>Updated {formatDate(new Date(hymn.updatedAt))}</span>
      </div>
    </div>
  );
}
