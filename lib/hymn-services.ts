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
  onSnapshot,
  type DocumentData,
  type QuerySnapshot,
  type DocumentSnapshot,
  type Unsubscribe,
  type WhereFilterOp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import {
  Hymn,
  CreateHymnData,
  Person,
  CreatePersonData,
  HymnRecording,
  CreateRecordingData,
} from "./types/hymn";

// Person Service
export const personService = {
  // Create a new person
  async createPerson(
    personData: CreatePersonData,
    userId: string,
    customPersonId?: string
  ): Promise<string> {
    const newPerson = {
      ...personData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId,
    };

    if (customPersonId && customPersonId.trim()) {
      await setDoc(doc(db, "persons", customPersonId.trim()), newPerson);
      return customPersonId.trim();
    } else {
      const docRef = await addDoc(collection(db, "persons"), newPerson);
      return docRef.id;
    }
  },

  // Get all persons
  async getAllPersons(): Promise<QuerySnapshot<DocumentData>> {
    return await getDocs(collection(db, "persons"));
  },

  // Get person by ID
  async getPersonById(
    personId: string
  ): Promise<DocumentSnapshot<DocumentData>> {
    return await getDoc(doc(db, "persons", personId));
  },

  // Listen to persons changes in real-time
  onPersonsSnapshot(
    callback: (snapshot: QuerySnapshot<DocumentData>) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const personsCollection = collection(db, "persons");
    return onSnapshot(
      personsCollection,
      callback,
      onError || ((error) => console.error("Persons snapshot error:", error))
    );
  },

  // Update person
  async updatePerson(
    personId: string,
    personData: Partial<CreatePersonData>
  ): Promise<void> {
    const updateData = {
      ...personData,
      updatedAt: new Date(),
    };
    await updateDoc(doc(db, "persons", personId), updateData);
  },

  // Delete person
  async deletePerson(personId: string): Promise<void> {
    await deleteDoc(doc(db, "persons", personId));
  },

  // Search persons by name
  async searchPersons(
    searchTerm: string
  ): Promise<QuerySnapshot<DocumentData>> {
    // Note: This is a simple equals search. For more complex search,
    // you might want to use Algolia or similar service
    const q = query(
      collection(db, "persons"),
      where("name", ">=", searchTerm),
      where("name", "<=", searchTerm + "\uf8ff")
    );
    return await getDocs(q);
  },

  // Get persons by role
  async getPersonsByRole(role: string): Promise<QuerySnapshot<DocumentData>> {
    const q = query(
      collection(db, "persons"),
      where("role", "array-contains", role)
    );
    return await getDocs(q);
  },
};

// Hymn Service
export const hymnService = {
  // Create a new hymn
  async createHymn(
    hymnData: CreateHymnData,
    userId: string,
    userName: string,
    customHymnId?: string
  ): Promise<string> {
    const newHymn = {
      ...hymnData,
      authors: hymnData.authors || [],
      churchVersions: hymnData.churchVersions || [],
      translations: hymnData.translations || [],
      bookPageImageGroups: hymnData.bookPageImageGroups || [],
      recordings: hymnData.recordings || [],
      tags: hymnData.tags || [],
      isPublished: hymnData.isPublished ?? true, // Default to published
      addedBy: userId,
      addedByName: userName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (customHymnId && customHymnId.trim()) {
      await setDoc(doc(db, "hymns", customHymnId.trim()), newHymn);
      return customHymnId.trim();
    } else {
      const docRef = await addDoc(collection(db, "hymns"), newHymn);
      return docRef.id;
    }
  },

  // Get all hymns
  async getAllHymns(): Promise<QuerySnapshot<DocumentData>> {
    return await getDocs(collection(db, "hymns"));
  },

  // Get all hymns filtered by privacy and user role
  async getAllHymnsFiltered(
    userRole?: string | null
  ): Promise<QuerySnapshot<DocumentData>> {
    const snapshot = await getDocs(collection(db, "hymns"));

    // Filter based on user role and privacy settings
    const filteredDocs = snapshot.docs.filter((doc) => {
      const data = doc.data();
      const isPrivate = data.private ?? false;
      const isProtected = data.protected ?? false;

      // If protected, only admins can see
      if (isProtected) {
        return userRole === "admin";
      }

      // If private, only editors and admins can see
      if (isPrivate) {
        return userRole === "editor" || userRole === "admin";
      }

      // If public, everyone can see
      return true;
    });

    return {
      ...snapshot,
      docs: filteredDocs,
    } as QuerySnapshot<DocumentData>;
  },

  // Get hymn by ID
  async getHymnById(hymnId: string): Promise<DocumentSnapshot<DocumentData>> {
    return await getDoc(doc(db, "hymns", hymnId));
  },

  // Check if user can access a hymn
  async canUserAccessHymn(
    hymnId: string,
    userRole?: string | null
  ): Promise<boolean> {
    try {
      const hymnDoc = await this.getHymnById(hymnId);
      if (!hymnDoc.exists()) {
        return false;
      }

      const hymnData = hymnDoc.data();
      const isPrivate = hymnData?.private ?? false;
      const isProtected = hymnData?.protected ?? false;

      if (isProtected) {
        return userRole === "admin";
      }

      if (isPrivate) {
        return userRole === "editor" || userRole === "admin";
      }

      return true;
    } catch (error) {
      console.error("Error checking hymn access:", error);
      return false;
    }
  },

  // Listen to hymns changes in real-time
  onHymnsSnapshot(
    callback: (snapshot: QuerySnapshot<DocumentData>) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const hymnsCollection = collection(db, "hymns");
    return onSnapshot(
      hymnsCollection,
      callback,
      onError || ((error) => console.error("Hymns snapshot error:", error))
    );
  },

  // Listen to hymns changes filtered by privacy and user role
  onHymnsSnapshotFiltered(
    userRole: string | null,
    callback: (snapshot: QuerySnapshot<DocumentData>) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const hymnsCollection = collection(db, "hymns");

    const wrappedCallback = (snapshot: QuerySnapshot<DocumentData>) => {
      const filteredDocs = snapshot.docs.filter((doc) => {
        const data = doc.data();
        const isPrivate = data.private ?? false;
        const isProtected = data.protected ?? false;

        if (isProtected) {
          return userRole === "admin";
        }

        if (isPrivate) {
          return userRole === "editor" || userRole === "admin";
        }

        return true;
      });

      const filteredSnapshot = {
        ...snapshot,
        docs: filteredDocs,
      };
      callback(filteredSnapshot as QuerySnapshot<DocumentData>);
    };

    return onSnapshot(
      hymnsCollection,
      wrappedCallback,
      onError || ((error) => console.error("Hymns snapshot error:", error))
    );
  },

  // Listen to hymn changes in real-time
  onHymnSnapshot(
    hymnId: string,
    callback: (snapshot: DocumentSnapshot<DocumentData>) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const hymnRef = doc(db, "hymns", hymnId);
    return onSnapshot(
      hymnRef,
      callback,
      onError || ((error) => console.error("Hymn snapshot error:", error))
    );
  },

  // Update hymn
  async updateHymn(
    hymnId: string,
    hymnData: Partial<CreateHymnData>
  ): Promise<void> {
    const updateData = {
      ...hymnData,
      updatedAt: new Date(),
    };
    await updateDoc(doc(db, "hymns", hymnId), updateData);
  },

  // Delete hymn
  async deleteHymn(hymnId: string): Promise<void> {
    await deleteDoc(doc(db, "hymns", hymnId));
  },

  // Add recording to hymn
  async addRecording(
    hymnId: string,
    recordingData: CreateRecordingData
  ): Promise<void> {
    const hymnDoc = await this.getHymnById(hymnId);
    if (!hymnDoc.exists()) {
      throw new Error("Hymn not found");
    }

    const hymnData = hymnDoc.data();
    const currentRecordings = hymnData?.recordings || [];

    const newRecording: HymnRecording = {
      id: `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...recordingData,
      createdAt: new Date(),
    };

    const updatedRecordings = [...currentRecordings, newRecording];

    await updateDoc(doc(db, "hymns", hymnId), {
      recordings: updatedRecordings,
      updatedAt: new Date(),
    });
  },

  // Update recording in hymn
  async updateRecording(
    hymnId: string,
    recordingId: string,
    recordingData: Partial<CreateRecordingData>
  ): Promise<void> {
    const hymnDoc = await this.getHymnById(hymnId);
    if (!hymnDoc.exists()) {
      throw new Error("Hymn not found");
    }

    const hymnData = hymnDoc.data();
    const currentRecordings = hymnData?.recordings || [];

    const updatedRecordings = currentRecordings.map((rec: HymnRecording) => {
      if (rec.id === recordingId) {
        return { ...rec, ...recordingData };
      }
      return rec;
    });

    await updateDoc(doc(db, "hymns", hymnId), {
      recordings: updatedRecordings,
      updatedAt: new Date(),
    });
  },

  // Delete recording from hymn
  async deleteRecording(hymnId: string, recordingId: string): Promise<void> {
    const hymnDoc = await this.getHymnById(hymnId);
    if (!hymnDoc.exists()) {
      throw new Error("Hymn not found");
    }

    const hymnData = hymnDoc.data();
    const currentRecordings = hymnData?.recordings || [];

    const updatedRecordings = currentRecordings.filter(
      (rec: HymnRecording) => rec.id !== recordingId
    );

    await updateDoc(doc(db, "hymns", hymnId), {
      recordings: updatedRecordings,
      updatedAt: new Date(),
    });
  },

  // Upload hymn-related file (images, audio, etc.)
  async uploadFile(
    hymnId: string,
    file: File,
    folder: "images" | "audio" | "video"
  ): Promise<string> {
    const fileExtension = file.name.split(".").pop() || "file";
    const timestamp = Date.now();
    const path = `hymns/${hymnId}/${folder}/${timestamp}.${fileExtension}`;
    const storageRef = ref(storage, path);
    const uploadResult = await uploadBytes(storageRef, file);
    return await getDownloadURL(uploadResult.ref);
  },

  // Search hymns by category
  async getHymnsByCategory(
    category: string
  ): Promise<QuerySnapshot<DocumentData>> {
    const q = query(collection(db, "hymns"), where("category", "==", category));
    return await getDocs(q);
  },

  // Search hymns by occasion
  async getHymnsByOccasion(
    occasion: string
  ): Promise<QuerySnapshot<DocumentData>> {
    const q = query(collection(db, "hymns"), where("occasion", "==", occasion));
    return await getDocs(q);
  },

  // Search hymns by tag
  async getHymnsByTag(tag: string): Promise<QuerySnapshot<DocumentData>> {
    const q = query(
      collection(db, "hymns"),
      where("tags", "array-contains", tag)
    );
    return await getDocs(q);
  },

  // Get hymns by author
  async getHymnsByAuthor(
    authorId: string
  ): Promise<QuerySnapshot<DocumentData>> {
    const q = query(collection(db, "hymns"), where("authorId", "==", authorId));
    return await getDocs(q);
  },

  // Get published hymns only
  async getPublishedHymns(): Promise<QuerySnapshot<DocumentData>> {
    const q = query(collection(db, "hymns"), where("isPublished", "==", true));
    return await getDocs(q);
  },
};
