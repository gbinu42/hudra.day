"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Music2, Video, Youtube, Link as LinkIcon, Calendar, User, CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Hymn, HymnRecording } from "@/lib/types/hymn";
import { Badge } from "@/components/ui/badge";

interface RecordingWithHymn extends HymnRecording {
  hymnId: string;
  hymnTitle: string;
}

export default function AdminRecordingsPage() {
  const [allRecordings, setAllRecordings] = useState<RecordingWithHymn[]>([]);
  const [currentRecordings, setCurrentRecordings] = useState<RecordingWithHymn[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordingsPerPage = 100;

  useEffect(() => {
    async function fetchAllRecordings() {
      try {
        setLoading(true);
        
        // Fetch all hymns
        const hymnsQuery = query(collection(db, "hymns"));
        const hymnsSnapshot = await getDocs(hymnsQuery);
        
        const recordings: RecordingWithHymn[] = [];
        
        hymnsSnapshot.docs.forEach((doc) => {
          const hymnData = doc.data() as Hymn;
          const hymnId = doc.id;
          
          // Get the main English title for display
          const englishTitle = hymnData.titles?.find(
            (t) => t.language?.toLowerCase() === "english"
          )?.title || "Untitled";
          
          if (hymnData.recordings && hymnData.recordings.length > 0) {
            hymnData.recordings.forEach((recording) => {
              recordings.push({
                ...recording,
                hymnId,
                hymnTitle: englishTitle,
                // Convert Firestore Timestamp to Date if needed
                createdAt: recording.createdAt && typeof recording.createdAt === "object" && "toDate" in recording.createdAt
                  ? (recording.createdAt as unknown as Timestamp).toDate()
                  : new Date(recording.createdAt),
              });
            });
          }
        });
        
        // Sort ALL recordings by creation date (latest first) - this is key!
        recordings.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        
        setAllRecordings(recordings);
        
        // Set first page
        setCurrentRecordings(recordings.slice(0, recordingsPerPage));
      } catch (error) {
        console.error("Error fetching recordings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllRecordings();
  }, []);

  const goToPage = (pageNum: number) => {
    const startIndex = (pageNum - 1) * recordingsPerPage;
    const endIndex = startIndex + recordingsPerPage;
    setCurrentRecordings(allRecordings.slice(startIndex, endIndex));
    setCurrentPage(pageNum);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.max(1, Math.ceil(allRecordings.length / recordingsPerPage));
  const hasNextPage = currentPage < totalPages;

  const getRecordingIcon = (type: string) => {
    switch (type) {
      case "audio":
        return <Music2 className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "youtube":
        return <Youtube className="h-4 w-4" />;
      case "link":
        return <LinkIcon className="h-4 w-4" />;
      default:
        return <Music2 className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case "pending":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const renderRecordingPlayer = (recording: RecordingWithHymn) => {
    if (recording.type === "audio") {
      return (
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
      );
    } else if (recording.type === "video") {
      return (
        <video
          controls
          preload="none"
          controlsList="nodownload"
          className="w-full max-w-md rounded border h-48"
        >
          <source src={recording.url} type="video/mp4" />
          <source src={recording.url} type="video/webm" />
          <source src={recording.url} type="video/ogg" />
          Your browser does not support the video element.
        </video>
      );
    } else if (recording.type === "youtube") {
      const videoId = recording.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
      if (videoId) {
        return (
          <iframe
            width="100%"
            height="200"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border max-w-md"
          ></iframe>
        );
      }
    } else if (recording.type === "link") {
      return (
        <a
          href={recording.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
        >
          <ExternalLink className="h-3 w-3" />
          Open External Link
        </a>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <ProtectedRoute requiredRole="admin">
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-sm text-muted-foreground">Loading recordings...</p>
              </CardContent>
            </Card>
          </ProtectedRoute>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <ProtectedRoute requiredRole="admin">
          {/* Header */}
          <div className="mb-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="mb-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin Panel
              </Button>
            </Link>
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-bold text-foreground">
                All Recordings
              </h1>
              <p className="text-sm text-muted-foreground">
                {allRecordings.length > 0 ? `${allRecordings.length} total` : 'Loading...'}
              </p>
            </div>
          </div>

          {/* Recordings List */}
          <div className="space-y-2 mb-6">
            {currentRecordings.map((recording, index) => (
              <Card key={`${recording.hymnId}-${recording.id}-${index}`} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex flex-col gap-2">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {getRecordingIcon(recording.type)}
                        <h3 className="text-sm font-semibold truncate">
                          {recording.title || `${recording.type} recording`}
                        </h3>
                        {getStatusBadge(recording.status)}
                      </div>
                    </div>
                    
                    {/* Info Row */}
                    <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
                      <Link 
                        href={`/hymns/${recording.hymnId}`}
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                      >
                        {recording.hymnTitle}
                      </Link>
                      
                      {recording.performers && recording.performers.length > 0 && (
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {recording.performers.map(p => p.name).join(", ")}
                        </span>
                      )}
                      
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(recording.createdAt)}
                      </span>
                      
                      {recording.year && <span>Year: {recording.year}</span>}
                      
                      {recording.contributorName && (
                        <span>By: {recording.contributorName}</span>
                      )}
                      
                      {recording.church && (
                        <Badge variant="outline" className="h-5 text-xs">{recording.church}</Badge>
                      )}
                      
                      {recording.duration && <span>{recording.duration}</span>}
                    </div>
                    
                    {recording.description && (
                      <div className="text-xs text-foreground">
                        {recording.description}
                      </div>
                    )}

                    {/* Player */}
                    {renderRecordingPlayer(recording)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {(hasNextPage || currentPage > 1) && (
            <div className="flex flex-wrap items-center justify-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1 || loading}
                onClick={() => goToPage(1)}
              >
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1 || loading}
                onClick={() => goToPage(currentPage - 1)}
              >
                Prev
              </Button>
              
              <div className="flex gap-1">
                {/* Show current page and a few around it */}
                {currentPage > 2 && <span className="px-2 py-1 text-xs">...</span>}
                {currentPage > 1 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={loading}
                  >
                    {currentPage - 1}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="default"
                  disabled={loading}
                >
                  {currentPage}
                </Button>
                {hasNextPage && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={loading}
                  >
                    {currentPage + 1}
                  </Button>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                disabled={!hasNextPage || loading}
                onClick={() => goToPage(currentPage + 1)}
              >
                Next
              </Button>
              
              <div className="text-xs text-muted-foreground ml-2">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && currentRecordings.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center">
                <Music2 className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No recordings found</p>
              </CardContent>
            </Card>
          )}
        </ProtectedRoute>
      </div>
      <Footer />
    </div>
  );
}
