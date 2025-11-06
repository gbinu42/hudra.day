/**
 * Comment Services
 * 
 * Firebase operations for the comment system.
 * Supports comments on any resource type (hymns, books, texts, etc.)
 */

import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  type QuerySnapshot,
  type DocumentData,
  type DocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import { CreateCommentData, UpdateCommentData, ResourceType } from "./types/comment";

export const commentService = {
  /**
   * Create a new comment
   * Comments default to "pending" status for moderation
   */
  async createComment(commentData: CreateCommentData): Promise<string> {
    const newComment = {
      ...commentData,
      status: "pending" as const, // Default to pending for moderation
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Filter out undefined values per repo rules
    const cleanData = Object.fromEntries(
      Object.entries(newComment).filter(([, value]) => value !== undefined)
    );

    const docRef = await addDoc(collection(db, "comments"), cleanData);
    return docRef.id;
  },

  /**
   * Get all comments for a specific resource
   * @param resourceType - Type of resource (hymn, book, etc.)
   * @param resourceId - ID of the specific resource
   * @param includeAllStatuses - If true, returns all comments regardless of status (for admins)
   */
  async getCommentsByResource(
    resourceType: ResourceType,
    resourceId: string,
    includeAllStatuses: boolean = false
  ): Promise<QuerySnapshot<DocumentData>> {
    let q;
    
    if (includeAllStatuses) {
      // For admins: get all comments regardless of status
      q = query(
        collection(db, "comments"),
        where("resourceType", "==", resourceType),
        where("resourceId", "==", resourceId),
        orderBy("createdAt", "desc")
      );
    } else {
      // For regular users: only get approved comments
      q = query(
        collection(db, "comments"),
        where("resourceType", "==", resourceType),
        where("resourceId", "==", resourceId),
        where("status", "==", "approved"),
        orderBy("createdAt", "desc")
      );
    }
    
    return await getDocs(q);
  },

  /**
   * Get a single comment by ID
   */
  async getCommentById(commentId: string): Promise<DocumentSnapshot<DocumentData>> {
    return await getDoc(doc(db, "comments", commentId));
  },

  /**
   * Update a comment
   * Used for editing comment content or updating moderation status
   */
  async updateComment(
    commentId: string,
    updateData: UpdateCommentData
  ): Promise<void> {
    const data = {
      ...updateData,
      updatedAt: new Date(),
    };

    // Filter out undefined values per repo rules
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined)
    );

    await updateDoc(doc(db, "comments", commentId), cleanData);
  },

  /**
   * Delete a comment
   * Only admins should be able to do this
   */
  async deleteComment(commentId: string): Promise<void> {
    await deleteDoc(doc(db, "comments", commentId));
  },

  /**
   * Approve a comment (change status to "approved")
   */
  async approveComment(commentId: string): Promise<void> {
    await this.updateComment(commentId, { status: "approved" });
  },

  /**
   * Reject a comment (change status to "rejected")
   */
  async rejectComment(commentId: string): Promise<void> {
    await this.updateComment(commentId, { status: "rejected" });
  },

  /**
   * Get all pending comments (for moderation dashboard)
   */
  async getPendingComments(): Promise<QuerySnapshot<DocumentData>> {
    const q = query(
      collection(db, "comments"),
      where("status", "==", "pending"),
      orderBy("createdAt", "desc")
    );
    return await getDocs(q);
  },

  /**
   * Get comments count for a resource
   */
  async getCommentsCount(
    resourceType: ResourceType,
    resourceId: string
  ): Promise<number> {
    const snapshot = await this.getCommentsByResource(resourceType, resourceId, false);
    return snapshot.size;
  },
};

