import { Author } from "./Author"; // Importing Author to reference it

export type Book = {
  id: string;
  title: string;
  publishedYear: number;
  price: number;
  authorName: string; // The related author (nested object)
  averageRating?: number; // Optional: average of ratings
  authorId: string;
};
