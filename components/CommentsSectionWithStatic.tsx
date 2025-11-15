"use client";

import { useState, useEffect } from "react";
import { Comment } from "@/lib/types/comment";
import CommentsSectionStatic from "@/components/CommentsSectionStatic";
import CommentsSection from "@/components/CommentsSection";
import { commentService } from "@/lib/comment-services";
import { ResourceType } from "@/lib/types/comment";

interface CommentsSectionWithStaticProps {
  resourceType: ResourceType;
  resourceId: string;
  initialComments: Comment[];
  className?: string;
}

export default function CommentsSectionWithStatic({
  resourceType,
  resourceId,
  initialComments,
  className = "",
}: CommentsSectionWithStaticProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [key, setKey] = useState(0); // Force re-render when comments update
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Reload comments after submission
  const reloadComments = async () => {
    try {
      const snapshot = await commentService.getCommentsByResource(
        resourceType,
        resourceId,
        false // Only get approved comments
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
      setKey(prev => prev + 1); // Force re-render
    } catch (error) {
      console.error("Error reloading comments:", error);
    }
  };

  // Listen for comment submissions and reload
  useEffect(() => {
    const handleCommentSubmitted = () => {
      // Delay to allow Firebase to update
      setTimeout(() => {
        reloadComments();
      }, 2000);
    };

    window.addEventListener("commentSubmitted", handleCommentSubmitted);
    return () => {
      window.removeEventListener("commentSubmitted", handleCommentSubmitted);
    };
  }, [resourceType, resourceId]);

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(commentId);
    // Store in sessionStorage so CommentsSection can pick it up
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`replyTo_${resourceId}`, commentId);
      // Also store the comment name for display
      const comment = comments.find(c => c.id === commentId);
      if (comment) {
        sessionStorage.setItem(`replyToName_${resourceId}`, comment.name);
      }
    }
  };

  return (
    <div className={className}>
      <div key={key}>
        <CommentsSectionStatic 
          comments={comments} 
          onReplyClick={handleReplyClick}
        />
      </div>
      <div className="mt-6">
        <CommentsSection 
          resourceType={resourceType} 
          resourceId={resourceId} 
          hideCommentList={true}
          initialReplyingTo={replyingTo}
        />
      </div>
    </div>
  );
}

