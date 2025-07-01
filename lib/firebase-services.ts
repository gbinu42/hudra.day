import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  type NextOrObserver,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  type DocumentData,
  type QuerySnapshot,
  type DocumentSnapshot,
  type Query,
  type WhereFilterOp,
  type Unsubscribe,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  type UploadResult,
} from "firebase/storage";
import { auth, db, storage } from "./firebase";
import { UserRole, UserProfile, ROLE_PERMISSIONS } from "./types/auth";
import { CreateBookData, BookPage } from "./types/book";
import { JSONContent } from "@tiptap/react";

// Page status types
type PageStatus =
  | "draft"
  | "transcribing"
  | "reviewing"
  | "completed"
  | "published";

// Interface for update data
interface PageUpdateData {
  pageNumberInBook?: string;
  currentTextJson?: JSONContent;
  currentVersion?: number;
  lastEditAt?: Date;
  lastEditBy?: string;
  edits?: EditData[];
  status?: PageStatus;
}

// Interface for edit data
interface EditData {
  editId: string;
  version: number;
  textJson: JSONContent;
  userId: string;
  createdAt: Date;
  status: "pending" | "approved" | "rejected";
  verifiedBy?: string;
  verifiedAt?: Date;
  notes?: string;
}

// Authentication Services
export const authService = {
  // Create user with email and password
  async signUp(
    email: string,
    password: string,
    role: UserRole = "viewer",
    displayName?: string
  ): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update Firebase Auth profile with display name immediately after user creation
    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
    }

    // Create user profile in Firestore with display name
    await userService.createUserProfile(userCredential.user, role, displayName);

    return userCredential.user;
  },

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  },

  // Send password reset email
  async sendPasswordResetEmail(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  },

  // Sign in with Google
  async signInWithGoogle(defaultRole: UserRole = "viewer"): Promise<User> {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    // Check if user profile exists, create if not
    const existingProfile = await userService.getUserProfile(
      userCredential.user.uid
    );
    if (!existingProfile) {
      await userService.createUserProfile(
        userCredential.user,
        defaultRole,
        userCredential.user.displayName || undefined
      );
    }

    return userCredential.user;
  },

  // Sign out
  async signOut(): Promise<void> {
    await signOut(auth);
  },

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  },

  // Listen to authentication state changes
  onAuthStateChanged(callback: NextOrObserver<User>): () => void {
    return onAuthStateChanged(auth, callback);
  },
};

// User Service for Role Management
export const userService = {
  // Create user profile with role
  async createUserProfile(
    user: User,
    role: UserRole,
    displayName?: string
  ): Promise<void> {
    const userProfile: Partial<UserProfile> = {
      uid: user.uid,
      email: user.email!,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    // Use provided displayName, fallback to user.displayName, or omit if neither exists
    const finalDisplayName = displayName || user.displayName;
    if (finalDisplayName) {
      userProfile.displayName = finalDisplayName;
    }

    await setDoc(doc(db, "users", user.uid), userProfile);
  },

  // Get user profile
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const docSnap = await getDoc(doc(db, "users", uid));

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName || null,
        role: data.role,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        isActive: data.isActive,
      } as UserProfile;
    }

    return null;
  },

  // Update user role (admin only)
  async updateUserRole(
    uid: string,
    newRole: UserRole,
    adminUid: string
  ): Promise<void> {
    // Verify admin permissions
    const adminProfile = await this.getUserProfile(adminUid);
    if (!adminProfile || adminProfile.role !== "admin") {
      throw new Error("Insufficient permissions to update user roles");
    }

    await updateDoc(doc(db, "users", uid), {
      role: newRole,
      updatedAt: new Date(),
    });
  },

  // Get all users (admin only)
  async getAllUsers(adminUid: string): Promise<UserProfile[]> {
    const adminProfile = await this.getUserProfile(adminUid);
    if (!adminProfile || adminProfile.role !== "admin") {
      throw new Error("Insufficient permissions to view all users");
    }

    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as UserProfile;
    });
  },

  // Listen to all users changes in real-time (admin only)
  async onUsersSnapshot(
    adminUid: string,
    callback: (users: UserProfile[]) => void,
    onError?: (error: Error) => void
  ): Promise<Unsubscribe> {
    const adminProfile = await this.getUserProfile(adminUid);
    if (!adminProfile || adminProfile.role !== "admin") {
      throw new Error("Insufficient permissions to view all users");
    }

    const usersCollection = collection(db, "users");
    return onSnapshot(
      usersCollection,
      (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
          } as UserProfile;
        });
        callback(users);
      },
      onError || ((error) => console.error("Users snapshot error:", error))
    );
  },

  // Check if user has permission
  hasPermission(
    userRole: UserRole,
    permission: keyof typeof ROLE_PERMISSIONS.admin
  ): boolean {
    const rolePermissions = ROLE_PERMISSIONS[userRole];
    return rolePermissions[permission] === true;
  },

  // Check if user can perform action on target user
  canManageUser(userRole: UserRole, targetRole: UserRole): boolean {
    if (userRole !== "admin") return false;

    const userLevel = this.getRoleLevel(userRole);
    const targetLevel = this.getRoleLevel(targetRole);

    return userLevel > targetLevel;
  },

  // Get role hierarchy level
  getRoleLevel(role: UserRole): number {
    const levels = { viewer: 1, editor: 2, admin: 3 };
    return levels[role];
  },

  // Deactivate user (admin only)
  async deactivateUser(uid: string, adminUid: string): Promise<void> {
    const adminProfile = await this.getUserProfile(adminUid);
    if (!adminProfile || adminProfile.role !== "admin") {
      throw new Error("Insufficient permissions to deactivate users");
    }

    await updateDoc(doc(db, "users", uid), {
      isActive: false,
      updatedAt: new Date(),
    });
  },

  // Activate user (admin only)
  async activateUser(uid: string, adminUid: string): Promise<void> {
    const adminProfile = await this.getUserProfile(adminUid);
    if (!adminProfile || adminProfile.role !== "admin") {
      throw new Error("Insufficient permissions to activate users");
    }

    await updateDoc(doc(db, "users", uid), {
      isActive: true,
      updatedAt: new Date(),
    });
  },
};

// Firestore Services
export const firestoreService = {
  // Add a document to a collection (auto-generates ID)
  async addDocument(
    collectionName: string,
    data: DocumentData
  ): Promise<string> {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  },

  // Set a document with a specific ID
  async setDocument(
    collectionName: string,
    docId: string,
    data: DocumentData
  ): Promise<void> {
    await setDoc(doc(db, collectionName, docId), data);
  },

  // Get all documents from a collection
  async getCollection(
    collectionName: string
  ): Promise<QuerySnapshot<DocumentData>> {
    return await getDocs(collection(db, collectionName));
  },

  // Get a specific document
  async getDocument(
    collectionName: string,
    docId: string
  ): Promise<DocumentSnapshot<DocumentData>> {
    return await getDoc(doc(db, collectionName, docId));
  },

  // Update a document
  async updateDocument(
    collectionName: string,
    docId: string,
    data: Partial<DocumentData>
  ): Promise<void> {
    await updateDoc(doc(db, collectionName, docId), data);
  },

  // Delete a document
  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    await deleteDoc(doc(db, collectionName, docId));
  },

  // Query documents with conditions
  async queryDocuments(
    collectionName: string,
    conditions?: { field: string; operator: WhereFilterOp; value: unknown }[],
    orderByField?: string,
    limitCount?: number
  ): Promise<QuerySnapshot<DocumentData>> {
    let q: Query<DocumentData> = collection(db, collectionName);

    if (conditions) {
      conditions.forEach((condition) => {
        q = query(
          q,
          where(condition.field, condition.operator, condition.value)
        );
      });
    }

    if (orderByField) {
      q = query(q, orderBy(orderByField));
    }

    if (limitCount) {
      q = query(q, limit(limitCount));
    }

    return await getDocs(q);
  },
};

// Storage Services
export const storageService = {
  // Upload a file
  async uploadFile(path: string, file: File): Promise<string> {
    const storageRef = ref(storage, path);
    const uploadResult: UploadResult = await uploadBytes(storageRef, file);
    return await getDownloadURL(uploadResult.ref);
  },

  // Get download URL
  async getDownloadURL(path: string): Promise<string> {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  },
};

// Book Service
export const bookService = {
  // Get all books
  async getAllBooks(): Promise<QuerySnapshot<DocumentData>> {
    return await firestoreService.getCollection("books");
  },

  // Get all books without pages field (for performance)
  async getAllBooksWithoutPages(): Promise<QuerySnapshot<DocumentData>> {
    const snapshot = await firestoreService.getCollection("books");

    // Filter out pages field from documents
    const filteredSnapshot = {
      ...snapshot,
      docs: snapshot.docs.map((doc) => ({
        ...doc,
        id: doc.id, // Explicitly preserve the document ID
        data: () => {
          const data = doc.data();
          const filteredData = { ...data };
          delete filteredData.pages; // Exclude pages field for performance
          return filteredData;
        },
      })),
    };

    return filteredSnapshot as QuerySnapshot<DocumentData>;
  },

  // Listen to all books changes in real-time (excluding pages field for performance)
  onBooksSnapshot(
    callback: (snapshot: QuerySnapshot<DocumentData>) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const booksCollection = collection(db, "books");

    // Wrapper callback to filter out pages field
    const wrappedCallback = (snapshot: QuerySnapshot<DocumentData>) => {
      // Create a new snapshot-like object with filtered documents
      const filteredSnapshot = {
        ...snapshot,
        docs: snapshot.docs.map((doc) => ({
          ...doc,
          id: doc.id, // Explicitly preserve the document ID
          data: () => {
            const data = doc.data();
            const filteredData = { ...data };
            delete filteredData.pages; // Exclude pages field for performance
            return filteredData;
          },
        })),
      };
      callback(filteredSnapshot as QuerySnapshot<DocumentData>);
    };

    return onSnapshot(
      booksCollection,
      wrappedCallback,

      onError || ((error) => console.error("Books snapshot error:", error))
    );
  },

  // Get book by ID
  async getBookById(bookId: string): Promise<DocumentSnapshot<DocumentData>> {
    return await firestoreService.getDocument("books", bookId);
  },

  // Listen to book changes in real-time
  onBookSnapshot(
    bookId: string,
    callback: (snapshot: DocumentSnapshot<DocumentData>) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const bookRef = doc(db, "books", bookId);
    return onSnapshot(
      bookRef,
      callback,
      onError || ((error) => console.error("Book snapshot error:", error))
    );
  },

  // Create new book
  async createBook(
    bookData: CreateBookData,
    userId: string,
    customBookId?: string
  ): Promise<string> {
    const newBook = {
      ...bookData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId,
      isPublished: false,
    };

    if (customBookId && customBookId.trim()) {
      // Use custom ID if provided
      await firestoreService.setDocument("books", customBookId.trim(), newBook);
      return customBookId.trim();
    } else {
      // Auto-generate ID if not provided
      return await firestoreService.addDocument("books", newBook);
    }
  },

  // Update book
  async updateBook(
    bookId: string,
    bookData: Partial<CreateBookData>
  ): Promise<void> {
    const updateData = {
      ...bookData,
      updatedAt: new Date(),
    };
    await firestoreService.updateDocument("books", bookId, updateData);
  },

  // Delete book
  async deleteBook(bookId: string): Promise<void> {
    await firestoreService.deleteDocument("books", bookId);
  },

  // Search books
  async searchBooks(
    searchField: string,
    searchValue: string
  ): Promise<QuerySnapshot<DocumentData>> {
    return await firestoreService.queryDocuments("books", [
      { field: searchField, operator: "==", value: searchValue },
    ]);
  },

  // Update page status in book.pages array
  async updatePageStatusInBook(
    bookId: string,
    pageId: string,
    newStatus: string
  ): Promise<void> {
    try {
      // Get the current book document
      const bookDoc = await this.getBookById(bookId);
      if (!bookDoc.exists()) {
        throw new Error("Book not found");
      }

      const bookData = bookDoc.data();
      const currentPages = bookData?.pages || [];

      // Find and update the page status in the pages array
      const updatedPages = currentPages.map((page: BookPage) => {
        if (page.pageId === pageId) {
          return { ...page, status: newStatus };
        }
        return page;
      });

      // Update the book document
      await this.updateBook(bookId, {
        pages: updatedPages,
        updatedAt: new Date(),
      } as Partial<CreateBookData>);

      console.log(
        `Updated page status in book ${bookId} for page ${pageId} to ${newStatus}`
      );
    } catch (error) {
      console.error("Error updating page status in book:", error);
      throw error;
    }
  },
};

// Page Service for handling pages and their edits
export const pageService = {
  // Get pages for a book, ordered by pageNumber
  async getPages(bookId: string): Promise<QuerySnapshot<DocumentData>> {
    // Query without ordering to avoid composite index requirement
    const snapshot = await firestoreService.queryDocuments("pages", [
      { field: "bookId", operator: "==", value: bookId },
    ]);

    // Filter out edits field from documents
    const filteredSnapshot = {
      ...snapshot,
      docs: snapshot.docs.map((doc) => ({
        ...doc,
        id: doc.id, // Explicitly preserve the document ID
        data: () => {
          const data = doc.data();
          const filteredData = { ...data };
          delete filteredData.edits;
          return filteredData;
        },
      })),
    };

    return filteredSnapshot as QuerySnapshot<DocumentData>;
  },

  // Listen to pages changes in real-time
  onPagesSnapshot(
    bookId: string,
    callback: (snapshot: QuerySnapshot<DocumentData>) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const pagesQuery = query(
      collection(db, "pages"),
      where("bookId", "==", bookId)
    );

    // Wrapper callback to filter out edits field
    const wrappedCallback = (snapshot: QuerySnapshot<DocumentData>) => {
      // Create a new snapshot-like object with filtered documents
      const filteredSnapshot = {
        ...snapshot,
        docs: snapshot.docs.map((doc) => ({
          ...doc,
          id: doc.id, // Explicitly preserve the document ID
          data: () => {
            const data = doc.data();
            const filteredData = { ...data };
            delete filteredData.edits;
            return filteredData;
          },
        })),
      };
      callback(filteredSnapshot as QuerySnapshot<DocumentData>);
    };

    return onSnapshot(
      pagesQuery,
      wrappedCallback,
      onError || ((error) => console.error("Pages snapshot error:", error))
    );
  },

  // Get a specific page document
  async getPage(pageId: string): Promise<DocumentSnapshot<DocumentData>> {
    return await firestoreService.getDocument("pages", pageId);
  },

  // Create a new page document
  async createPage(
    bookId: string,
    pageNumber: number,
    imageUrl: string,
    userId: string,
    pageNumberInBook?: string
  ): Promise<string> {
    const newPage: Record<string, unknown> = {
      bookId,
      pageNumber,
      imageUrl,
      currentTextJson: null,
      currentVersion: 0,
      edits: [],
      status: "draft" as PageStatus, // Default status
      lastEditAt: new Date(),
      createdAt: new Date(),
      createdBy: userId,
    };

    // Only include pageNumberInBook if it has a defined value
    if (pageNumberInBook !== undefined) {
      newPage.pageNumberInBook = pageNumberInBook;
    }

    // Create the page document first
    const pageId = await firestoreService.addDocument("pages", newPage);

    // Update book document with new page info and page count
    try {
      // Get the book document
      const bookDoc = await bookService.getBookById(bookId);
      if (bookDoc.exists()) {
        const bookData = bookDoc.data();
        const currentPages = bookData?.pages || [];
        const currentPageCount = bookData?.pageCount || 0;

        // Add new page to pages array, filtering out undefined values
        const newPageInfo: Record<string, unknown> = {
          pageId,
          pageNumber,
          status: "draft", // Default status for new pages
        };

        // Only include pageNumberInBook if it has a defined value
        if (pageNumberInBook !== undefined) {
          newPageInfo.pageNumberInBook = pageNumberInBook;
        }

        // Insert the new page in the correct position based on pageNumber
        const updatedPages = [...currentPages];
        const insertIndex = updatedPages.findIndex(
          (p) => p.pageNumber > pageNumber
        );
        if (insertIndex === -1) {
          updatedPages.push(newPageInfo);
        } else {
          updatedPages.splice(insertIndex, 0, newPageInfo);
        }

        const updateData: Record<string, unknown> = {
          pages: updatedPages,
          pageCount: currentPageCount + 1,
          updatedAt: new Date(),
        };

        // If this is the first page and the book doesn't have a cover image, set it
        if (
          currentPageCount === 0 &&
          (!bookData?.coverImage || bookData.coverImage === "")
        ) {
          updateData.coverImage = imageUrl;
        }

        // Auto-update status based on page count and current status
        if (currentPageCount === 0 && bookData?.status === "draft") {
          updateData.status = "digitizing";
        }

        // Update the book document
        await bookService.updateBook(
          bookId,
          updateData as Partial<CreateBookData>
        );
      }
    } catch (error) {
      console.error("Error updating book with new page:", error);
      // Don't throw error here as the page was successfully created
    }

    return pageId;
  },

  // Upload page image and return download URL
  async uploadPageImage(
    bookId: string,
    pageNumber: number,
    file: File
  ): Promise<string> {
    // Get file extension
    const fileExtension = file.name.split(".").pop() || "jpg";
    // Use pageNumber as filename in /pages/{bookId}/ path
    const path = `pages/${bookId}/${pageNumber}.${fileExtension}`;
    return await storageService.uploadFile(path, file);
  },

  // Add an edit/version to a page
  async addEdit(
    pageId: string,
    editData: {
      version: number;
      text: string;
      userId: string;
      status?: "pending" | "approved" | "rejected";
      notes?: string;
    }
  ): Promise<string> {
    const editsCollection = `pages/${pageId}/edits`;
    const newEdit = {
      ...editData,
      status: editData.status || "pending",
      createdAt: new Date(),
    };
    return await firestoreService.addDocument(editsCollection, newEdit);
  },

  // Get edits for a page
  async getEdits(pageId: string): Promise<QuerySnapshot<DocumentData>> {
    const editsCollection = `pages/${pageId}/edits`;
    return await firestoreService.getCollection(editsCollection);
  },

  // Update page metadata (including pageNumberInBook)
  async updatePage(pageId: string, updateData: PageUpdateData): Promise<void> {
    // Filter out undefined values to prevent Firestore errors
    const filteredData: Record<string, unknown> = {
      lastEditAt: new Date(),
    };

    Object.keys(updateData).forEach((key) => {
      const value = updateData[key as keyof PageUpdateData];
      if (value !== undefined) {
        filteredData[key] = value;
      }
    });

    await firestoreService.updateDocument("pages", pageId, filteredData);
  },

  // Add a new edit to the page's edits array
  async addEditToPage(
    pageId: string,
    editData: {
      version: number;
      textJson: JSONContent;
      userId: string;
      status?: "pending" | "approved" | "rejected";
      notes?: string;
    }
  ): Promise<void> {
    // Get current page
    const pageDoc = await this.getPage(pageId);
    if (!pageDoc.exists()) {
      throw new Error("Page not found");
    }

    const pageData = pageDoc.data();
    const currentEdits = pageData?.edits || [];

    // Create new edit with unique ID, filtering out undefined values
    const newEdit: EditData = {
      editId: `edit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      version: editData.version,
      textJson: editData.textJson,
      userId: editData.userId,
      createdAt: new Date(),
      status: editData.status || "pending",
    };

    // Only add optional fields if they have values
    if (editData.notes !== undefined && editData.notes !== null) {
      newEdit.notes = editData.notes;
    }

    // Add new edit to array
    const updatedEdits = [...currentEdits, newEdit];

    // Prepare update data, filtering out undefined values
    const updatePageData: PageUpdateData = {
      edits: updatedEdits,
      currentTextJson: editData.textJson,
      currentVersion: editData.version,
      lastEditAt: new Date(),
      lastEditBy: editData.userId,
    };

    // Update page with new edits array and current text/version
    await this.updatePage(pageId, updatePageData);
  },

  // Update page status
  async updatePageStatus(
    pageId: string,
    status: PageStatus,
    userId: string
  ): Promise<void> {
    const updateData: PageUpdateData = {
      status,
      lastEditAt: new Date(),
      lastEditBy: userId,
    };
    await this.updatePage(pageId, updateData);

    // Also update the page status in the book document
    try {
      // Get the page document to find the bookId
      const pageDoc = await this.getPage(pageId);
      if (pageDoc.exists()) {
        const pageData = pageDoc.data();
        const bookId = pageData.bookId;
        if (bookId) {
          await bookService.updatePageStatusInBook(bookId, pageId, status);
        }
      }
    } catch (error) {
      console.error("Error updating page status in book document:", error);
      // Don't throw error here as the page status was successfully updated
    }
  },
};
