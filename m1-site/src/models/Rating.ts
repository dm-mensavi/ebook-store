export type Rating = {
    id: number;
    bookId: number;          // The ID of the book being rated
    rating: number;          // A number between 1 and 5
    comment?: string;        // Optional comment
    createdAt: string;       // Date of creation (ISO string)
  }
  