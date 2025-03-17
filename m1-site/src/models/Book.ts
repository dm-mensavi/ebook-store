import { Author } from './Author';  // Importing Author to reference it

export type Book ={
  id: number;
  title: string;
  publishedYear: number;
  price: number;
  author: Author;                  // The related author (nested object)
  averageRating?: number;          // Optional: average of ratings
}
