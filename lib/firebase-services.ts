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
  type DocumentData,
  type QuerySnapshot,
  type DocumentSnapshot,
  type Query,
  type WhereFilterOp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  type UploadResult,
} from "firebase/storage";
import { auth, db, storage } from "./firebase";
import { UserRole, UserProfile, ROLE_PERMISSIONS } from "./types/auth";

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
