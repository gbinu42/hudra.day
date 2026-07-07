import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  type DocumentData,
  type QuerySnapshot,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebase";
import {
  CreateUnidentifiedRecordingData,
  UnidentifiedRecording,
} from "./types/hymn";

function parseRecordingDoc(
  docId: string,
  data: DocumentData
): UnidentifiedRecording {
  return {
    id: docId,
    ...data,
    createdAt:
      data.createdAt?.toDate?.() || new Date(data.createdAt || Date.now()),
  } as UnidentifiedRecording;
}

export const unidentifiedRecordingService = {
  async getAll(): Promise<UnidentifiedRecording[]> {
    const recordingsQuery = query(
      collection(db, "unidentifiedRecordings"),
      orderBy("createdAt", "desc")
    );
    const snapshot: QuerySnapshot<DocumentData> =
      await getDocs(recordingsQuery);
    return snapshot.docs.map((docSnap) =>
      parseRecordingDoc(docSnap.id, docSnap.data())
    );
  },

  async create(
    recordingData: CreateUnidentifiedRecordingData
  ): Promise<string> {
    const docRef = doc(collection(db, "unidentifiedRecordings"));
    const newRecording = Object.fromEntries(
      Object.entries({
        ...recordingData,
        createdAt: new Date(),
      }).filter(([, value]) => value !== undefined)
    );

    await setDoc(docRef, newRecording);
    return docRef.id;
  },

  async updateUrl(recordingId: string, url: string): Promise<void> {
    await updateDoc(doc(db, "unidentifiedRecordings", recordingId), { url });
  },

  async updateFields(
    recordingId: string,
    fields: Partial<CreateUnidentifiedRecordingData>
  ): Promise<void> {
    const cleanFields = Object.fromEntries(
      Object.entries(fields).filter(([, value]) => value !== undefined)
    );
    await updateDoc(doc(db, "unidentifiedRecordings", recordingId), cleanFields);
  },

  async uploadFile(
    recordingId: string,
    file: File,
    folder: "audio" | "video"
  ): Promise<string> {
    const fileExtension = file.name.split(".").pop() || "file";
    const timestamp = Date.now();
    const path = `unidentified-recordings/${recordingId}/${folder}/${timestamp}.${fileExtension}`;
    const storageRef = ref(storage, path);
    const uploadResult = await uploadBytes(storageRef, file);
    return await getDownloadURL(uploadResult.ref);
  },

  async delete(recordingId: string, fileUrl?: string): Promise<void> {
    if (fileUrl?.includes("firebasestorage.googleapis.com")) {
      try {
        const url = new URL(fileUrl);
        const pathMatch = url.pathname.match(/\/o\/(.+)\?/);
        if (pathMatch) {
          const filePath = decodeURIComponent(pathMatch[1]);
          await deleteObject(ref(storage, filePath));
        }
      } catch (error) {
        console.error("Error deleting storage file:", error);
      }
    }

    await deleteDoc(doc(db, "unidentifiedRecordings", recordingId));
  },
};
