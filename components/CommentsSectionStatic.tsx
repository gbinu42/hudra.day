import { Comment } from "@/lib/types/comment";
import { MessageSquare } from "lucide-react";

interface CommentsSectionStaticProps {
  comments: Comment[];
  className?: string;
}

// Build comment tree structure
function buildCommentTree(comments: Comment[]): (Comment & { replies: Comment[] })[] {
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
        // Parent not found, treat as root
        rootComments.push(commentWithReplies);
      }
    } else {
      rootComments.push(commentWithReplies);
    }
  });

  return rootComments;
}

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// Recursive component to render comment with replies
function CommentItem({
  comment,
  depth = 0,
}: {
  comment: Comment & { replies?: Comment[] };
  depth?: number;
}) {
  const maxDepth = 3;
  const indent = Math.min(depth, maxDepth) * 40;

  return (
    <div style={{ marginLeft: `${indent}px` }} className="space-y-3">
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
        </div>
        <p className="text-muted-foreground whitespace-pre-wrap">
          {comment.comment}
        </p>
      </div>

      {/* Render replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentsSectionStatic({
  comments,
  className = "",
}: CommentsSectionStaticProps) {
  // Filter to only approved comments for static rendering
  const approvedComments = comments.filter((c) => c.status === "approved");
  const commentTree = buildCommentTree(approvedComments);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Comments {approvedComments.length > 0 && `(${approvedComments.length})`}
        </h3>
      </div>
      <div className="space-y-6">
        {commentTree.length > 0 ? (
          <div className="space-y-4">
            {commentTree.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-sm text-muted-foreground">
            No comments yet
          </div>
        )}
      </div>
    </div>
  );
}

