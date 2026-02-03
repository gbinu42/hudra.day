"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Check,
  X,
  ExternalLink,
  Trash2,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { commentService } from "@/lib/comment-services";
import { Comment } from "@/lib/types/comment";
import Link from "next/link";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export default function CommentsModeration() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const mapSnapshotToComments = (
    snapshot: Awaited<ReturnType<typeof commentService.getPendingComments>>
  ) =>
    snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      } as Comment;
    });

  const loadStats = async () => {
    try {
      const [pendingSnap, approvedSnap, rejectedSnap, allSnap] =
        await Promise.all([
          commentService.getCommentsByStatus("pending"),
          commentService.getCommentsByStatus("approved"),
          commentService.getCommentsByStatus("rejected"),
          commentService.getAllComments(),
        ]);

      setStats({
        pending: pendingSnap.size,
        approved: approvedSnap.size,
        rejected: rejectedSnap.size,
        total: allSnap.size,
      });
    } catch (error) {
      console.error("Error loading comment stats:", error);
    }
  };

  const loadComments = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      let snapshot;

      if (filter === "pending") {
        snapshot = await commentService.getPendingComments();
      } else if (filter === "approved") {
        snapshot = await commentService.getCommentsByStatus("approved");
      } else if (filter === "rejected") {
        snapshot = await commentService.getCommentsByStatus("rejected");
      } else {
        snapshot = await commentService.getAllComments();
      }

      setComments(mapSnapshotToComments(snapshot));
      await loadStats();
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadComments(true);
  };

  const handleApprove = async (commentId: string) => {
    try {
      await commentService.approveComment(commentId);
      await loadComments();
    } catch (error) {
      console.error("Error approving comment:", error);
      alert("Failed to approve comment");
    }
  };

  const handleReject = async (commentId: string) => {
    try {
      await commentService.rejectComment(commentId);
      await loadComments();
    } catch (error) {
      console.error("Error rejecting comment:", error);
      alert("Failed to reject comment");
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment? This action cannot be undone.")) {
      return;
    }
    
    try {
      await commentService.deleteComment(commentId);
      await loadComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
    return `${day} ${month} ${year} at ${time}`;
  };

  const getResourceUrl = (comment: Comment) => {
    switch (comment.resourceType) {
      case "hymn":
        return `/hymns/${comment.resourceId}`;
      case "book":
        return `/books/${comment.resourceId}`;
      case "text":
        return `/texts/${comment.resourceId}`;
      case "person":
        return `/persons/${comment.resourceId}`;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <>
      {/* Stats Cards */}
      {stats.pending > 0 && (
        <Alert className="mb-6 border-yellow-300 bg-yellow-50">
          <TrendingUp className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-900">Pending Comments</AlertTitle>
          <AlertDescription className="text-yellow-800">
            You have <span className="font-bold">{stats.pending}</span> comment{stats.pending !== 1 ? 's' : ''} awaiting moderation.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments Moderation
              </CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filter === "pending" ? "default" : "outline"}
                onClick={() => setFilter("pending")}
              >
                Pending
                {stats.pending > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {stats.pending}
                  </Badge>
                )}
              </Button>
              <Button
                size="sm"
                variant={filter === "approved" ? "default" : "outline"}
                onClick={() => setFilter("approved")}
              >
                Approved
                {stats.approved > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {stats.approved}
                  </Badge>
                )}
              </Button>
              <Button
                size="sm"
                variant={filter === "rejected" ? "default" : "outline"}
                onClick={() => setFilter("rejected")}
              >
                Rejected
                {stats.rejected > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {stats.rejected}
                  </Badge>
                )}
              </Button>
              <Button
                size="sm"
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
              >
                All
                {stats.total > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {stats.total}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No {filter !== "all" ? filter : ""} comments found.
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => {
              const resourceUrl = getResourceUrl(comment);
              
              return (
                <Card key={comment.id} className="border-l-4 border-l-yellow-400">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge variant="outline" className="capitalize">
                              {comment.resourceType}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={getStatusColor(comment.status)}
                            >
                              {comment.status}
                            </Badge>
                            <Badge variant="secondary" className="font-mono text-xs">
                              {comment.resourceId}
                            </Badge>
                          </div>
                          <div className="font-semibold text-lg">{comment.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {comment.email}
                            {comment.website && (
                              <>
                                {" • "}
                                <a
                                  href={comment.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline text-primary inline-flex items-center gap-1"
                                >
                                  Website
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {formatDate(comment.createdAt)}
                          </div>
                        </div>
                        
                        {/* Resource Link */}
                        {resourceUrl && (
                          <Link href={resourceUrl} target="_blank">
                            <Button size="sm" variant="outline">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View {comment.resourceType}
                            </Button>
                          </Link>
                        )}
                      </div>

                      {/* Comment Text */}
                      <div className="bg-muted p-4 rounded-md">
                        <p className="whitespace-pre-wrap text-sm">
                          {comment.comment}
                        </p>
                        {resourceUrl && (
                          <div className="mt-3">
                            <Link
                              href={resourceUrl}
                              target="_blank"
                              className="text-sm text-primary inline-flex items-center gap-1 hover:underline"
                            >
                              View page
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 justify-end pt-2">
                        {comment.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:bg-green-50"
                              onClick={() => handleApprove(comment.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => handleReject(comment.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(comment.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
    </>
  );
}

