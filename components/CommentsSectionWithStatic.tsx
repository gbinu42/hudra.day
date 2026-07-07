"use client";

import { useState, useEffect, useCallback } from "react";
import { Comment } from "@/lib/types/comment";
import CommentsSectionStatic from "@/components/CommentsSectionStatic";
import CommentsSection from "@/components/CommentsSection";
import { commentService } from "@/lib/comment-services";
import { ResourceType } from "@/lib/types/comment";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageSquare } from "lucide-react";

interface CommentsSectionWithStaticProps {
  resourceType: ResourceType;
  resourceId: string;
  initialComments: Comment[];
  className?: string;
  compact?: boolean;
  accordion?: boolean;
}

export default function CommentsSectionWithStatic({
  resourceType,
  resourceId,
  initialComments,
  className = "",
  compact = false,
  accordion = false,
}: CommentsSectionWithStaticProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [key, setKey] = useState(0); // Force re-render when comments update
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [accordionOpen, setAccordionOpen] = useState<string | undefined>(
    undefined
  );

  const approvedCount = comments.filter((c) => c.status === "approved").length;

  // Reload comments after submission
  const reloadComments = useCallback(async () => {
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
  }, [resourceType, resourceId]);

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
  }, [resourceType, resourceId, reloadComments]);

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(commentId);
    if (accordion) {
      setAccordionOpen("comments");
    }
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

  const commentsBody = (
    <>
      <div key={key}>
        <CommentsSectionStatic
          comments={comments}
          onReplyClick={handleReplyClick}
          compact={compact}
          hideHeader={accordion}
        />
      </div>
      <div className={compact ? "mt-2" : "mt-6"}>
        <CommentsSection
          resourceType={resourceType}
          resourceId={resourceId}
          hideCommentList={true}
          initialReplyingTo={replyingTo}
          compact={compact}
        />
      </div>
    </>
  );

  if (accordion) {
    return (
      <div className={className}>
        <Accordion
          type="single"
          collapsible
          value={accordionOpen}
          onValueChange={setAccordionOpen}
        >
          <AccordionItem value="comments" className="border-none">
            <AccordionTrigger className="py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
              <span className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Comments
                {approvedCount > 0 && (
                  <span className="text-muted-foreground">({approvedCount})</span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-0">{commentsBody}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  return (
    <div className={className}>
      {commentsBody}
    </div>
  );
}

