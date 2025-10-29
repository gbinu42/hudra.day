"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  History,
  RotateCcw,
  Eye,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import TipTapRenderer from "@/components/TipTapRenderer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Edit } from "@/lib/types/book";

// Helper function to convert Firebase Timestamp to Date
const toDate = (
  dateValue: Date | { toDate?: () => Date; seconds?: number }
): Date => {
  if (!dateValue) return new Date();

  // If it's already a Date object
  if (dateValue instanceof Date) return dateValue;

  // If it's a Firestore Timestamp with toDate method
  if (
    typeof dateValue === "object" &&
    "toDate" in dateValue &&
    typeof dateValue.toDate === "function"
  ) {
    return dateValue.toDate();
  }

  // If it's a Firestore Timestamp-like object with seconds
  if (
    typeof dateValue === "object" &&
    "seconds" in dateValue &&
    typeof dateValue.seconds === "number"
  ) {
    return new Date(dateValue.seconds * 1000);
  }

  // Fallback: try to create a Date from the value
  try {
    return new Date(dateValue as unknown as string);
  } catch {
    return new Date();
  }
};

interface PageHistoryProps {
  edits: Edit[];
  currentVersion: number;
  isAdmin: boolean;
  onRestore: (edit: Edit) => Promise<void>;
  getUserDisplayName?: (userId: string) => string;
}

export function PageHistory({
  edits,
  currentVersion,
  isAdmin,
  onRestore,
  getUserDisplayName = (userId) => userId,
}: PageHistoryProps) {
  const [open, setOpen] = useState(false);
  const [previewEdit, setPreviewEdit] = useState<Edit | null>(null);
  const [restoring, setRestoring] = useState(false);
  const [confirmRestore, setConfirmRestore] = useState<Edit | null>(null);

  // Sort edits by version descending (newest first)
  const sortedEdits = [...edits].sort((a, b) => b.version - a.version);

  const handleRestore = async (edit: Edit) => {
    setRestoring(true);
    try {
      await onRestore(edit);
      setConfirmRestore(null);
      setOpen(false);
    } catch (error) {
      console.error("Error restoring version:", error);
      alert("Failed to restore version. Please try again.");
    } finally {
      setRestoring(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      approved: "default",
      pending: "secondary",
      rejected: "destructive",
    };
    return (
      <Badge variant={variants[status] || "secondary"} className="ml-2">
        {status}
      </Badge>
    );
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-2"
      >
        <History className="h-4 w-4" />
        View History ({edits.length} version{edits.length !== 1 ? "s" : ""})
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Page Version History
            </DialogTitle>
            <DialogDescription>
              View and restore previous versions of this page. Current version:{" "}
              {currentVersion}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[500px] pr-4">
            {sortedEdits.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <History className="h-12 w-12 mb-4 opacity-20" />
                <p>No version history available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedEdits.map((edit) => (
                  <div
                    key={edit.editId}
                    className={`border rounded-lg p-4 ${
                      edit.version === currentVersion
                        ? "bg-accent border-primary"
                        : "bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">
                          Version {edit.version}
                        </span>
                        {edit.version === currentVersion && (
                          <Badge variant="default">Current</Badge>
                        )}
                        {getStatusBadge(edit.status)}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreviewEdit(edit)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        {isAdmin && edit.version !== currentVersion && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setConfirmRestore(edit)}
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Restore
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span>{getUserDisplayName(edit.userId)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{format(toDate(edit.createdAt), "PPpp")}</span>
                      </div>
                      {edit.verifiedBy && edit.verifiedAt && (
                        <div className="flex items-center gap-2">
                          {getStatusIcon(edit.status)}
                          <span>
                            Verified by {getUserDisplayName(edit.verifiedBy)} on{" "}
                            {format(toDate(edit.verifiedAt), "PPp")}
                          </span>
                        </div>
                      )}
                      {edit.notes && (
                        <div className="mt-2 p-2 bg-muted rounded text-sm">
                          <strong>Notes:</strong> {edit.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewEdit} onOpenChange={() => setPreviewEdit(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Preview Version {previewEdit?.version}
            </DialogTitle>
            <DialogDescription>
              {previewEdit && (
                <>
                  Created by {getUserDisplayName(previewEdit.userId)} on{" "}
                  {format(toDate(previewEdit.createdAt), "PPpp")}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[500px] pr-4">
            {previewEdit && (
              <div className="prose prose-sm max-w-none p-4 bg-muted/50 rounded-lg">
                <TipTapRenderer content={previewEdit.textJson} />
              </div>
            )}
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewEdit(null)}>
              Close
            </Button>
            {isAdmin &&
              previewEdit &&
              previewEdit.version !== currentVersion && (
                <Button
                  onClick={() => {
                    setPreviewEdit(null);
                    setConfirmRestore(previewEdit);
                  }}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restore This Version
                </Button>
              )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Restore Dialog */}
      <Dialog
        open={!!confirmRestore}
        onOpenChange={() => setConfirmRestore(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Confirm Version Restoration
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to restore version {confirmRestore?.version}
              ?
            </DialogDescription>
          </DialogHeader>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This will create a new version with the content from version{" "}
              {confirmRestore?.version}. The current version will be preserved
              in history.
            </AlertDescription>
          </Alert>

          {confirmRestore && (
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <strong>Original Author:</strong>{" "}
                {getUserDisplayName(confirmRestore.userId)}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {format(toDate(confirmRestore.createdAt), "PPpp")}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmRestore(null)}
              disabled={restoring}
            >
              Cancel
            </Button>
            <Button
              onClick={() => confirmRestore && handleRestore(confirmRestore)}
              disabled={restoring}
            >
              {restoring ? (
                <>Restoring...</>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restore Version
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
