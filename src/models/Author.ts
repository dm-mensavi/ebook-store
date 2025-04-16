import { Book } from "./Book";
export type Author = {
  id: string;
  name: string;
  photo?: string; // Optional: you might not have a photo always.
  biography?: string; // Optional: biography of the author.
  numberOfBooks?: number; // Optional: number of books written by the author.
  averageRating?: number; // Optional: mean of ratings from all their books.
  bookCount?: number; // Optional: number of books written by the author.
  books: {
    id: string;
    title: string;
    link: string;
  }[];
};
