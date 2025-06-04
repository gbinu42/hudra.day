import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
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

// Authentication Services
export const authService = {
  // Create user with email and password
  async signUp(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
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

  // Sign in with Google
  async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
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
