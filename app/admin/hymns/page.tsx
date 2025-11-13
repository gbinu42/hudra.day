"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/hooks/useAuth";
import { hymnService, personService } from "@/lib/hymn-services";
import { Hymn, Person, HymnRecording } from "@/lib/types/hymn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Trash2, Edit, Eye, Search, Music, Users, Check, XCircle, Headphones } from "lucide-react";

export default function AdminHymnsPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"hymns" | "persons" | "recordings">("hymns");

  useEffect(() => {
    if (authLoading) return; // Wait for auth to load

    if (!user) {
      router.push("/signin");
      return;
    }

    if (userProfile && userProfile.role !== "admin") {
      router.push("/hymns");
      return;
    }
  }, [user, userProfile, router, authLoading]);

  useEffect(() => {
    if (userProfile?.role !== "admin") return;

    const unsubscribeHymns = hymnService.onHymnsSnapshot(
      (snapshot) => {
        const hymnsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
            updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
            recordings: (data.recordings || []).map((rec: HymnRecording) => ({
              ...rec,
              createdAt:
                rec.createdAt &&
                typeof rec.createdAt === "object" &&
                "toDate" in rec.createdAt
                  ? (rec.createdAt as unknown as Timestamp).toDate()
                  : new Date(rec.createdAt),
            })),
          } as Hymn;
        });
        setHymns(hymnsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching hymns:", error);
        setLoading(false);
      }
    );

    const unsubscribePersons = personService.onPersonsSnapshot(
      (snapshot) => {
        const personsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
            updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
          } as Person;
        });
        setPersons(personsData);
      },
      (error) => {
        console.error("Error fetching persons:", error);
      }
    );

    return () => {
      unsubscribeHymns();
      unsubscribePersons();
    };
  }, [userProfile?.role]);

  const handleDeleteHymn = async (hymnId: string, hymnTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${hymnTitle}"?`)) {
      return;
    }

    try {
      await hymnService.deleteHymn(hymnId);
      toast.success("Hymn deleted successfully!");
    } catch (error) {
      console.error("Error deleting hymn:", error);
      toast.error("Failed to delete hymn");
    }
  };

  const handleDeletePerson = async (personId: string, personName: string) => {
    if (!confirm(`Are you sure you want to delete "${personName}"?`)) {
      return;
    }

    try {
      await personService.deletePerson(personId);
      toast.success("Person deleted successfully!");
    } catch (error) {
      console.error("Error deleting person:", error);
      toast.error("Failed to delete person");
    }
  };

  const handleApproveRecording = async (hymnId: string, recordingId: string) => {
    try {
      await hymnService.updateRecordingStatus(hymnId, recordingId, "approved");
      toast.success("Recording approved!");
    } catch (error) {
      console.error("Error approving recording:", error);
      toast.error("Failed to approve recording");
    }
  };

  const handleRejectRecording = async (hymnId: string, recordingId: string) => {
    if (!confirm("Are you sure you want to reject this recording?")) {
      return;
    }

    try {
      await hymnService.updateRecordingStatus(hymnId, recordingId, "rejected");
      toast.success("Recording rejected!");
    } catch (error) {
      console.error("Error rejecting recording:", error);
      toast.error("Failed to reject recording");
    }
  };

  // Collect all unapproved recordings from all hymns
  const unapprovedRecordings = hymns.flatMap((hymn) => {
    return hymn.recordings
      .filter((recording) => {
        const status = recording.status || "approved";
        return status !== "approved";
      })
      .map((recording) => ({
        ...recording,
        hymnId: hymn.id,
        hymnTitle: hymn.titles.find((t) => t.language?.toLowerCase() === "english")?.title || "Untitled",
      }));
  });

  const filteredUnapprovedRecordings = unapprovedRecordings.filter((recording) => {
    const term = searchTerm.toLowerCase();
    return (
      recording.hymnTitle.toLowerCase().includes(term) ||
      recording.title?.toLowerCase().includes(term) ||
      recording.contributorName?.toLowerCase().includes(term) ||
      recording.type.toLowerCase().includes(term)
    );
  });

  const filteredHymns = hymns.filter((hymn) => {
    const term = searchTerm.toLowerCase();
    return (
      hymn.titles.some((t) => t.title.toLowerCase().includes(term)) ||
      hymn.authorName?.toLowerCase().includes(term) ||
      hymn.category?.toLowerCase().includes(term)
    );
  });

  const filteredPersons = persons.filter((person) => {
    const term = searchTerm.toLowerCase();
    return (
      person.name.toLowerCase().includes(term) ||
      person.nameInSyriac?.toLowerCase().includes(term) ||
      person.church?.toLowerCase().includes(term)
    );
  });

  if (!userProfile || userProfile.role !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Loading...</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Hymns Administration</h1>
              <p className="text-muted-foreground">
                Manage hymns, persons, and recordings
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => router.push("/persons/new")}
                variant="outline"
              >
                <Users className="h-4 w-4 mr-2" />
                Add Person
              </Button>
              <Button onClick={() => router.push("/hymns/new")}>
                <Music className="h-4 w-4 mr-2" />
                Add Hymn
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Total Hymns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{hymns.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  With Recordings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    hymns.filter((h) => h.recordings && h.recordings.length > 0)
                      .length
                  }
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Total Persons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{persons.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Total Recordings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {hymns.reduce((sum, hymn) => sum + hymn.recordings.length, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Unapproved Recordings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {unapprovedRecordings.length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tab Navigation */}
          <Card>
            <CardContent className="p-0">
              <div className="flex border-b">
                <button
                  className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                    activeTab === "hymns"
                      ? "border-b-2 border-primary text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveTab("hymns")}
                >
                  <Music className="h-4 w-4" />
                  <span>Hymns</span>
                  <Badge variant="secondary" className="ml-1">
                    {hymns.length}
                  </Badge>
                </button>
                <button
                  className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                    activeTab === "persons"
                      ? "border-b-2 border-primary text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveTab("persons")}
                >
                  <Users className="h-4 w-4" />
                  <span>Persons</span>
                  <Badge variant="secondary" className="ml-1">
                    {persons.length}
                  </Badge>
                </button>
                <button
                  className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                    activeTab === "recordings"
                      ? "border-b-2 border-primary text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveTab("recordings")}
                >
                  <Headphones className="h-4 w-4" />
                  <span>Unapproved Recordings</span>
                  <Badge variant="secondary" className="ml-1">
                    {unapprovedRecordings.length}
                  </Badge>
                </button>
              </div>

              {/* Search Bar */}
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={`Search ${activeTab === "recordings" ? "unapproved recordings" : activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hymns Table */}
          {activeTab === "hymns" && (
            <Card>
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                    <p className="text-muted-foreground">Loading hymns...</p>
                  </div>
                ) : filteredHymns.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Music className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground font-medium mb-2">
                      No hymns found
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {searchTerm
                        ? "Try adjusting your search term"
                        : "Get started by adding your first hymn"}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[35%]">Title(s)</TableHead>
                          <TableHead className="w-[20%]">Author</TableHead>
                          <TableHead className="w-[15%]">Category</TableHead>
                          <TableHead className="w-[10%] text-center">
                            Recordings
                          </TableHead>
                          <TableHead className="w-[10%]">Added By</TableHead>
                          <TableHead className="w-[10%]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHymns.map((hymn) => (
                          <TableRow key={hymn.id}>
                            <TableCell className="font-medium">
                              <div className="flex flex-wrap items-center gap-2 text-sm">
                                <span>
                                  {hymn.titles.find(
                                    (t) =>
                                      t.language?.toLowerCase() === "english"
                                  )?.title || "Untitled"}
                                </span>
                                {hymn.titles.find(
                                  (t) =>
                                    t.language?.toLowerCase() === "syriac" &&
                                    t.transliteration !== "non-vocalized"
                                ) && (
                                  <>
                                    <span className="text-muted-foreground">
                                      |
                                    </span>
                                    <span
                                      className="font-['East_Syriac_Adiabene'] text-lg font-normal"
                                      dir="rtl"
                                    >
                                      {
                                        hymn.titles.find(
                                          (t) =>
                                            t.language?.toLowerCase() ===
                                              "syriac" &&
                                            t.transliteration !==
                                              "non-vocalized"
                                        )?.title
                                      }
                                    </span>
                                  </>
                                )}
                                {hymn.titles.find(
                                  (t) =>
                                    t.language?.toLowerCase() === "syriac" &&
                                    t.transliteration === "non-vocalized"
                                ) && (
                                  <>
                                    <span className="text-muted-foreground">
                                      |
                                    </span>
                                    <span
                                      className="text-lg font-normal"
                                      dir="rtl"
                                    >
                                      {
                                        hymn.titles.find(
                                          (t) =>
                                            t.language?.toLowerCase() ===
                                              "syriac" &&
                                            t.transliteration ===
                                              "non-vocalized"
                                        )?.title
                                      }
                                    </span>
                                  </>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              {hymn.authorName || "-"}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="text-xs">
                                {hymn.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="secondary" className="text-xs">
                                {hymn.recordings.length}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {hymn.addedByName}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    router.push(`/hymns/${hymn.id}`)
                                  }
                                  title="View"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    router.push(`/hymns/${hymn.id}/edit`)
                                  }
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteHymn(
                                      hymn.id,
                                      hymn.titles[0].title
                                    )
                                  }
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Persons Table */}
          {activeTab === "persons" && (
            <Card>
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                    <p className="text-muted-foreground">Loading persons...</p>
                  </div>
                ) : filteredPersons.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground font-medium mb-2">
                      No persons found
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {searchTerm
                        ? "Try adjusting your search term"
                        : "Get started by adding your first person"}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[20%]">Name</TableHead>
                          <TableHead className="w-[20%]">Syriac Name</TableHead>
                          <TableHead className="w-[20%]">Church</TableHead>
                          <TableHead className="w-[20%]">Roles</TableHead>
                          <TableHead className="w-[10%]">Years</TableHead>
                          <TableHead className="w-[10%]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPersons.map((person) => (
                          <TableRow key={person.id}>
                            <TableCell className="font-medium text-sm">
                              {person.name}
                            </TableCell>
                            <TableCell className="text-sm">
                              {person.nameInSyriac || "-"}
                            </TableCell>
                            <TableCell className="text-sm">
                              {person.church || "-"}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {person.role && person.role.length > 0 ? (
                                  person.role.map((r) => (
                                    <Badge
                                      key={r}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {r}
                                    </Badge>
                                  ))
                                ) : (
                                  <span className="text-xs text-muted-foreground">
                                    -
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-xs">
                              {person.birthYear || "?"}
                              {person.deathYear && ` - ${person.deathYear}`}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    router.push(`/persons/${person.id}/edit`)
                                  }
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleDeletePerson(person.id, person.name)
                                  }
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Unapproved Recordings Table */}
          {activeTab === "recordings" && (
            <Card>
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                    <p className="text-muted-foreground">Loading recordings...</p>
                  </div>
                ) : filteredUnapprovedRecordings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Headphones className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground font-medium mb-2">
                      No unapproved recordings found
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {searchTerm
                        ? "Try adjusting your search term"
                        : "All recordings are approved"}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[25%]">Hymn</TableHead>
                          <TableHead className="w-[20%]">Recording Title</TableHead>
                          <TableHead className="w-[10%]">Type</TableHead>
                          <TableHead className="w-[15%]">Contributor</TableHead>
                          <TableHead className="w-[10%]">Status</TableHead>
                          <TableHead className="w-[20%]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUnapprovedRecordings.map((recording) => (
                          <TableRow key={`${recording.hymnId}-${recording.id}`}>
                            <TableCell className="font-medium text-sm">
                              <Button
                                variant="link"
                                className="p-0 h-auto font-medium text-left"
                                onClick={() => router.push(`/hymns/${recording.hymnId}`)}
                              >
                                {recording.hymnTitle}
                              </Button>
                            </TableCell>
                            <TableCell className="text-sm">
                              {recording.title || "-"}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {recording.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {recording.contributorName || "-"}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`text-xs ${
                                  recording.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {(recording.status || "pending")
                                  .charAt(0)
                                  .toUpperCase() +
                                  (recording.status || "pending").slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    router.push(`/hymns/${recording.hymnId}`)
                                  }
                                  title="View Hymn"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleApproveRecording(
                                      recording.hymnId,
                                      recording.id
                                    )
                                  }
                                  className="text-green-600 hover:text-green-700"
                                  title="Approve"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleRejectRecording(
                                      recording.hymnId,
                                      recording.id
                                    )
                                  }
                                  className="text-red-600 hover:text-red-700"
                                  title="Reject"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
