export type BookStatus =
  | "draft" // Book created, no pages yet
  | "digitizing" // Pages being added/uploaded
  | "transcribing" // Pages added, transcription in progress
  | "reviewing" // Transcription complete, under review/correction
  | "completed" // Fully transcribed and reviewed
  | "published"; // Ready for public access

export type PageStatus =
  | "draft"
  | "transcribing"
  | "reviewing"
  | "completed"
  | "published";

export interface BookPage {
  pageId: string;
  pageNumber: number;
  pageNumberInBook?: string;
  status?: PageStatus;
}

export interface Book {
  id: string;
  title: string;
  syriacTitle?: string;
  author: string;
  description: string;
  language: string;
  category: string;
  status: BookStatus;
  publicationYear?: number;
  isbn?: string;
  publisher?: string;
  placeOfPublication?: string;
  pageCount?: number; // Total number of pages
  pages?: BookPage[]; // Array of page information
  coverImage?: string;
  downloadUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isPublished: boolean;
  private: boolean; // Private books only visible to editors and admins
  tags: string[];
  textDirection?: "rtl" | "ltr";
}

export interface CreateBookData {
  title: string;
  syriacTitle?: string;
  author: string;
  description: string;
  language: string;
  category: string;
  status: BookStatus;
  publicationYear?: number;
  isbn?: string;
  publisher?: string;
  placeOfPublication?: string;
  coverImage?: string;
  private?: boolean; // Private books only visible to editors and admins
  tags: string[];
  textDirection?: "rtl" | "ltr";
}
