export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  language: string;
  category: string;
  publicationYear?: number;
  isbn?: string;
  publisher?: string;
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
  author: string;
  description: string;
  language: string;
  category: string;
  publicationYear?: number;
  isbn?: string;
  publisher?: string;
  pages?: number;
  coverImage?: string;
  tags: string[];
}
