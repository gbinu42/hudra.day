export type BookStatus =
  | "draft" // Book created, no pages yet
  | "digitizing" // Pages being added/uploaded
  | "transcribing" // Pages added, transcription in progress
  | "reviewing" // Transcription complete, under review/correction
  | "completed" // Fully transcribed and reviewed
  | "published"; // Ready for public access

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
  pages?: number;
  coverImage?: string;
  downloadUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isPublished: boolean;
  tags: string[];
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
  tags: string[];
}
