import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  type DocumentData,
  type QuerySnapshot,
  type DocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";
import { CreateReshQalaData } from "./types/reshQala";

const COLLECTION = "reshQale";

// Resh Qala Service - mirrors personService/hymnService conventions
export const reshQalaService = {
  // Create a new resh qala identity
  async createReshQala(
    data: CreateReshQalaData,
    userId: string,
    customId?: string
  ): Promise<string> {
    // Filter out undefined values to prevent Firebase errors
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined)
    );

    const newReshQala = {
      ...cleanData,
      names: data.names || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId,
    };

    if (customId && customId.trim()) {
      await setDoc(doc(db, COLLECTION, customId.trim()), newReshQala);
      return customId.trim();
    }
    const docRef = await addDoc(collection(db, COLLECTION), newReshQala);
    return docRef.id;
  },

  // Get all resh qale
  async getAllReshQale(): Promise<QuerySnapshot<DocumentData>> {
    return await getDocs(collection(db, COLLECTION));
  },

  // Get a resh qala by ID
  async getReshQalaById(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return await getDoc(doc(db, COLLECTION, id));
  },

  // Listen to resh qale changes in real-time
  onReshQaleSnapshot(
    callback: (snapshot: QuerySnapshot<DocumentData>) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    return onSnapshot(
      collection(db, COLLECTION),
      callback,
      onError || ((error) => console.error("Resh qale snapshot error:", error))
    );
  },

  // Update a resh qala
  async updateReshQala(
    id: string,
    data: Partial<CreateReshQalaData>
  ): Promise<void> {
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined)
    );

    await updateDoc(doc(db, COLLECTION, id), {
      ...cleanData,
      updatedAt: new Date(),
    });
  },

  // Delete a resh qala
  async deleteReshQala(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTION, id));
  },
};
