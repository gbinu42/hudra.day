"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquare, Send, CheckCircle, Reply } from "lucide-react";
import { commentService } from "@/lib/comment-services";
import { Comment, ResourceType } from "@/lib/types/comment";
import { useAuth } from "@/lib/hooks/useAuth";

interface CommentsSectionProps {
  resourceType: ResourceType;
  resourceId: string;
  className?: string;
}

export default function CommentsSection({
  resourceType,
  resourceId,
  className = "",
}: CommentsSectionProps) {
  const { userProfile } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null); // ID of comment being replied to
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
    saveInfo: true, // Checked by default
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load comments on mount and when user profile changes
  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceType, resourceId, userProfile?.role]);

  // Load form data when user profile changes
  useEffect(() => {
    loadSavedFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile?.uid]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const isAdmin = userProfile?.role === "admin";
      const snapshot = await commentService.getCommentsByResource(
        resourceType,
        resourceId,
        isAdmin // Admins see all comments including pending ones
      );
      
      const loadedComments = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
        } as Comment;
      });
      
      setComments(loadedComments);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadSavedFormData = () => {
    // If user is logged in, use their profile data
    if (userProfile) {
      setFormData((prev) => ({
        ...prev,
        name: userProfile.displayName || "",
        email: userProfile.email || "",
        website: "", // Don't populate website for logged-in users
      }));
      return;
    }
    
    // Load saved form data from localStorage if available (for non-logged-in users)
    const saved = localStorage.getItem("commentFormData");
    if (saved) {
      try {
        const { name, email, website } = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, name, email, website }));
      } catch {
        // Ignore parsing errors
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // For logged-in users, skip name and email validation (we use their profile data)
    if (!userProfile) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }
      
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
    }
    
    if (!formData.comment.trim()) {
      newErrors.comment = "Comment is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Create comment
      await commentService.createComment({
        resourceType,
        resourceId,
        name: formData.name.trim(),
        email: formData.email.trim(),
        website: formData.website.trim() || undefined,
        comment: formData.comment.trim(),
        userId: userProfile?.uid,
        parentId: replyingTo || undefined,
      });
      
      // Save form data to localStorage if checkbox is checked (only for non-logged-in users)
      if (!userProfile) {
        if (formData.saveInfo) {
          localStorage.setItem(
            "commentFormData",
            JSON.stringify({
              name: formData.name,
              email: formData.email,
              website: formData.website,
            })
          );
        } else {
          localStorage.removeItem("commentFormData");
        }
      }
      
      // Reset form
      if (userProfile) {
        // For logged-in users, keep their profile data and just clear the comment
        setFormData({
          name: userProfile.displayName || "",
          email: userProfile.email || "",
          website: "",
          comment: "",
          saveInfo: false,
        });
      } else {
        // For non-logged-in users, keep saved info if checkbox was checked
        setFormData({
          name: formData.saveInfo ? formData.name : "",
          email: formData.saveInfo ? formData.email : "",
          website: formData.saveInfo ? formData.website : "",
          comment: "",
          saveInfo: true, // Keep checked by default
        });
      }
      setErrors({});
      setReplyingTo(null); // Clear reply state
      
      // Reload comments (in background - won't show new comment until approved)
      loadComments();
      
      // Show success dialog
      setSuccessDialogOpen(true);
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Filter approved comments for regular users
  const displayedComments = userProfile?.role === "admin" 
    ? comments 
    : comments.filter((c) => c.status === "approved");

  // Organize comments into tree structure
  const buildCommentTree = (comments: Comment[]): Comment[] => {
    const commentMap = new Map<string, Comment & { replies: Comment[] }>();
    const rootComments: (Comment & { replies: Comment[] })[] = [];

    // First pass: create map with replies array
    comments.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Second pass: build tree
    comments.forEach((comment) => {
      const commentWithReplies = commentMap.get(comment.id)!;
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.replies.push(commentWithReplies);
        } else {
          // Parent not found (maybe not approved yet), treat as root
          rootComments.push(commentWithReplies);
        }
      } else {
        rootComments.push(commentWithReplies);
      }
    });

    return rootComments;
  };

  const commentTree = buildCommentTree(displayedComments);

  // Recursive component to render comment with replies
  const renderComment = (comment: Comment & { replies?: Comment[] }, depth: number = 0) => {
    const maxDepth = 3; // Limit nesting depth
    const indent = Math.min(depth, maxDepth) * 40; // 40px per level, max 3 levels

    return (
      <div key={comment.id} style={{ marginLeft: `${indent}px` }} className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              {comment.website && (
                <div className="text-sm text-muted-foreground">
                  <a
                    href={comment.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-primary"
                  >
                    Website
                  </a>
                </div>
              )}
            </div>
            {userProfile?.role === "admin" && comment.status === "pending" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    await commentService.approveComment(comment.id);
                    await loadComments();
                  }}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    await commentService.rejectComment(comment.id);
                    await loadComments();
                  }}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {comment.comment}
          </p>
          {userProfile?.role === "admin" && comment.status !== "approved" && (
            <div className="text-xs text-yellow-600 font-medium">
              Status: {comment.status.toUpperCase()}
            </div>
          )}
          
          {/* Reply button */}
          {depth < maxDepth && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setReplyingTo(comment.id);
                // Scroll to form
                setTimeout(() => {
                  document.getElementById(replyingTo === comment.id ? 'main-comment-form' : `reply-form-${comment.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
              }}
              className="text-primary hover:text-primary/80"
            >
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>
          )}
          
          {/* Reply form */}
          {replyingTo === comment.id && (
            <div className="mt-3 p-4 border rounded-md bg-muted/30" id={`reply-form-${comment.id}`}>
              <div className="text-sm font-medium mb-3">
                Replying to {comment.name}
              </div>
              {renderCommentForm(comment.id)}
            </div>
          )}
        </div>

        {/* Render replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-3">
            {comment.replies.map((reply) => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Render comment form (can be used for both main and reply forms)
  const renderCommentForm = (parentId?: string) => {
    const isReplyForm = !!parentId;
    
    return (
      <form onSubmit={handleSubmit} className="space-y-4" id={isReplyForm ? `reply-form-${parentId}` : 'main-comment-form'}>
        {/* Comment textarea */}
        <div className="space-y-2">
          <Label htmlFor={`comment-${parentId || 'main'}`} className="uppercase text-xs font-semibold tracking-wide">
            Comment <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id={`comment-${parentId || 'main'}`}
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            placeholder="Your comment..."
            rows={isReplyForm ? 3 : 6}
            className={errors.comment ? "border-red-500" : ""}
          />
          {errors.comment && (
            <p className="text-sm text-red-500">{errors.comment}</p>
          )}
        </div>

        {/* Show name, email, website fields only for non-logged-in users */}
        {!userProfile && (
          <>
            {/* Name input */}
            <div className="space-y-2">
              <Label htmlFor={`name-${parentId || 'main'}`} className="uppercase text-xs font-semibold tracking-wide">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`name-${parentId || 'main'}`}
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email input */}
            <div className="space-y-2">
              <Label htmlFor={`email-${parentId || 'main'}`} className="uppercase text-xs font-semibold tracking-wide">
                E-Mail <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`email-${parentId || 'main'}`}
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your.email@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Website input */}
            <div className="space-y-2">
              <Label htmlFor={`website-${parentId || 'main'}`} className="uppercase text-xs font-semibold tracking-wide">
                Website
              </Label>
              <Input
                id={`website-${parentId || 'main'}`}
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="https://yourwebsite.com (optional)"
              />
            </div>

            {/* Save info checkbox - only show on main form, not reply forms */}
            {!isReplyForm && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="saveInfo"
                  checked={formData.saveInfo}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, saveInfo: checked as boolean })
                  }
                />
                <Label
                  htmlFor="saveInfo"
                  className="text-sm font-normal cursor-pointer"
                >
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </Label>
              </div>
            )}
          </>
        )}

        {/* Submit button */}
        <div className="flex justify-end gap-2">
          {isReplyForm && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setReplyingTo(null);
                setFormData({ ...formData, comment: "" });
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={submitting}
            className="uppercase font-semibold tracking-wide"
          >
            {submitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {isReplyForm ? 'Reply' : 'Submit'}
              </>
            )}
          </Button>
        </div>
      </form>
    );
  };

  return (
    <Card className={`gap-2 ${className}`}>
      <CardHeader className="pb-2 px-8">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments {displayedComments.length > 0 && `(${displayedComments.length})`}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-8 space-y-6">
        {/* Display existing comments */}
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading comments...
          </div>
        ) : commentTree.length > 0 ? (
          <div className="space-y-6 border-b pb-6">
            {commentTree.map((comment) => renderComment(comment, 0))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground uppercase text-sm font-semibold tracking-wide">
            No Comments Yet
          </div>
        )}

        {/* Comment form */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold uppercase tracking-wide">
            Write a Comment
          </h3>
          {userProfile ? (
            <p className="text-sm text-muted-foreground">
              Commenting as <span className="font-semibold">{userProfile.displayName || userProfile.email}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Your email address will not be published. Required fields are marked{" "}
              <span className="text-red-500">*</span>
            </p>
          )}
          
          {renderCommentForm()}
        </div>
      </CardContent>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              Comment Successfully Posted!
            </DialogTitle>
            <DialogDescription className="text-center">
              Your comment has been submitted and is awaiting moderation by an
              administrator. It will appear on this page once it has been
              approved.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setSuccessDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

