/**
 * Comment System Types
 * 
 * This defines a flexible comment system that can be used across different resource types
 * (hymns, books, texts, etc.) by using a resourceType and resourceId pattern.
 */

export type ResourceType = "hymn" | "book" | "text" | "person" | "other";

export interface Comment {
  id: string;
  
  // Resource identification
  resourceType: ResourceType;
  resourceId: string; // ID of the hymn, book, text, etc.
  
  // Comment content
  comment: string;
  
  // Author information
  name: string;
  email: string;
  website?: string; // Optional
  
  // Moderation
  status: "pending" | "approved" | "rejected";
  
  // Nesting/Threading
  parentId?: string; // ID of parent comment (undefined for top-level comments)
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  
  // Optional: Store user ID if comment is from authenticated user
  userId?: string;
}

export interface CreateCommentData {
  resourceType: ResourceType;
  resourceId: string;
  comment: string;
  name: string;
  email: string;
  website?: string;
  userId?: string; // Optional: if user is authenticated
  parentId?: string; // Optional: for reply comments
}

export interface UpdateCommentData {
  comment?: string;
  name?: string;
  email?: string;
  website?: string;
  status?: "pending" | "approved" | "rejected";
}

