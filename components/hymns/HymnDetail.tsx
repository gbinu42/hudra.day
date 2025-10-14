"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hymn, HymnRecording, sortByChurchPriority } from "@/lib/types/hymn";
import {
  Music,
  User,
  Calendar,
  Book,
  Globe,
  Video,
  ExternalLink,
  Download,
} from "lucide-react";

interface HymnDetailProps {
  hymn: Hymn;
  showEditButton?: boolean;
  onEdit?: () => void;
}

export default function HymnDetail({
  hymn,
  showEditButton,
  onEdit,
}: HymnDetailProps) {
  // Format date as "10 Jan 2025"
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const renderRecording = (recording: HymnRecording) => {
    const getIcon = () => {
      switch (recording.type) {
        case "audio":
          return <Music className="h-5 w-5" />;
        case "video":
          return <Video className="h-5 w-5" />;
        case "youtube":
          return <ExternalLink className="h-5 w-5" />;
        case "link":
          return <ExternalLink className="h-5 w-5" />;
        default:
          return <Music className="h-5 w-5" />;
      }
    };

    return (
      <div key={recording.id} className="p-4 border rounded-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-1">{getIcon()}</div>
            <div className="flex-1">
              <h4 className="font-semibold">
                {recording.title ||
                  `${
                    recording.type.charAt(0).toUpperCase() +
                    recording.type.slice(1)
                  } Recording`}
              </h4>
              {recording.performerName && (
                <p className="text-sm text-muted-foreground mt-1">
                  <User className="h-3 w-3 inline mr-1" />
                  Performer: {recording.performerName}
                </p>
              )}
              {recording.year && (
                <p className="text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Year: {recording.year}
                </p>
              )}
              {recording.church && (
                <p className="text-sm text-muted-foreground">
                  <Book className="h-3 w-3 inline mr-1" />
                  Tradition: {recording.church}
                </p>
              )}
              {recording.duration && (
                <p className="text-sm text-muted-foreground">
                  Duration: {recording.duration}
                </p>
              )}
              {recording.description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {recording.description}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Contributed by: {recording.contributorName}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {recording.type === "youtube" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(recording.url, "_blank")}
              >
                Watch
              </Button>
            )}
            {(recording.type === "audio" || recording.type === "video") && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(recording.url, "_blank")}
                >
                  Play
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = recording.url;
                    a.download = recording.title || "recording";
                    a.click();
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </>
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
          </div>
        </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Syriac Text */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">
                  Syriac Text
                </h4>
                <pre
                  className="whitespace-pre-wrap leading-relaxed text-justify"
                  style={{
                    fontFamily: "East Syriac Adiabene, serif",
                    fontSize: "28px",
                  }}
                  dir="rtl"
                >
                  {hymn.text}
                </pre>
              </div>

              {/* Translations */}
              <div className="space-y-4">
                {hymn.translations && hymn.translations.length > 0 && (
                  <>
                    {hymn.translations.map((translation, tIndex) => (
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
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                          {translation.text}
                        </pre>
                        {translation.notes && (
                          <p className="text-xs text-muted-foreground italic">
                            {translation.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
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
                {/* Text and Translations side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Syriac Text */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      Syriac Text
                    </h4>
                    <pre
                      className="whitespace-pre-wrap leading-relaxed text-justify"
                      style={{
                        fontFamily: "East Syriac Adiabene, serif",
                        fontSize: "28px",
                      }}
                      dir="rtl"
                    >
                      {version.text}
                    </pre>
                  </div>

                  {/* Translations */}
                  <div className="space-y-4">
                    {version.translations &&
                      version.translations.length > 0 && (
                        <>
                          {version.translations.map((translation, tIndex) => (
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
                              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                                {translation.text}
                              </pre>
                              {translation.notes && (
                                <p className="text-xs text-muted-foreground italic">
                                  {translation.notes}
                                </p>
                              )}
                            </div>
                          ))}
                        </>
                      )}
                  </div>
                </div>

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
      {hymn.bookPageImageGroups && hymn.bookPageImageGroups.length > 0 && (
        <Card className="gap-2">
          <CardHeader className="pb-2 px-8">
            <CardTitle>Book Page Images</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-8">
            <div className="space-y-6">
              {sortByChurchPriority(hymn.bookPageImageGroups).map(
                (group, groupIndex) => (
                  <div key={groupIndex} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">
                        {group.churchName}
                      </h4>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {group.images.map((imageUrl, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={imageUrl}
                          alt={`${group.churchName} page ${imgIndex + 1}`}
                          className="w-full rounded border"
                        />
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recordings */}
      {hymn.recordings && hymn.recordings.length > 0 && (
        <Card>
          <CardHeader className="pb-2 px-8">
            <CardTitle>Recordings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0 px-8">
            {sortByChurchPriority(hymn.recordings).map((recording) =>
              renderRecording(recording)
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
