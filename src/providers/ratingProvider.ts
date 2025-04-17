import { Rating } from "../models/Rating";
import { updateBook, initializeBooks, getBooks } from "./bookProvider";

// Utility to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Local storage keys and versioning for ratings
const STORAGE_KEY = "ratings";
const VERSION_KEY = "ratings_version";
const CURRENT_VERSION = "1.0"; // Increment when sampleRatings change

// Sample ratings data (used as fallback or initial data)
const sampleRatings: Rating[] = [
  { id: generateId(), bookId: "", stars: 5, comment: "A timeless classic!", createdAt: new Date().toISOString() },
  { id: generateId(), bookId: "", stars: 4, comment: "Really enjoyed it.", createdAt: new Date().toISOString() },
  { id: generateId(), bookId: "", stars: 5, comment: "A must-read!", createdAt: new Date().toISOString() },
  { id: generateId(), bookId: "", stars: 4, comment: "Thought-provoking.", createdAt: new Date().toISOString() },
  { id: generateId(), bookId: "", stars: 4, comment: "Beautifully written.", createdAt: new Date().toISOString() },
  { id: generateId(), bookId: "", stars: 5, comment: "Gripping story!", createdAt: new Date().toISOString() },
  { id: generateId(), bookId: "", stars: 5, comment: "Heart-wrenching.", createdAt: new Date().toISOString() },
  { id: generateId(), bookId: "", stars: 5, comment: "Magical!", createdAt: new Date().toISOString() },
  { id: generateId(), bookId: "", stars: 5, comment: "Loved it!", createdAt: new Date().toISOString() },
  { id: generateId(), bookId: "", stars: 4, comment: "Classic mystery.", createdAt: new Date().toISOString() },
];

// In-memory store (initially empty, populated client-side)
let ratings: Rating[] = [];

// Client-side initialization of ratings
export const initializeRatings = async (): Promise<void> => {
  if (typeof window === "undefined") return; // Skip on server
  const storedVersion = localStorage.getItem(VERSION_KEY);
  const stored = localStorage.getItem(STORAGE_KEY);

  if (storedVersion !== CURRENT_VERSION || !stored) {
    // Initialize books first
    await initializeBooks();
    const books = await getBooks();

    // Assign book IDs to sample ratings
    const initializedRatings = sampleRatings.map((rating, index) => {
      const bookIndex = [0, 0, 2, 2, 4, 6, 8, 10, 12, 14][index];
      const book = books[bookIndex];
      if (!book) {
        console.warn(`Book not found for rating at index ${index}`);
        return { ...rating };
      }
      return { ...rating, bookId: book.id };
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(initializedRatings));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    ratings = initializedRatings;
  } else {
    ratings = JSON.parse(stored);
  }
};

// Persist ratings to localStorage (client-only)
const persistRatings = (): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
  }
};

// Update book's average rating
const updateBookAverageRating = async (bookId: string): Promise<void> => {
  if (ratings.length === 0 && typeof window !== "undefined") {
    await initializeRatings();
  }
  const bookRatings = ratings.filter((r) => r.bookId === bookId);
  const averageRating =
    bookRatings.length > 0
      ? bookRatings.reduce((sum, r) => sum + r.stars, 0) / bookRatings.length
      : 0;
  await updateBook(bookId, { averageRating });
};

// Get ratings by book ID
export const getRatingsByBookId = async (bookId: string): Promise<Rating[]> => {
  return new Promise((resolve) => {
    if (ratings.length === 0 && typeof window !== "undefined") {
      initializeRatings();
    }
    const bookRatings = ratings.filter((r) => r.bookId === bookId);
    setTimeout(() => resolve(bookRatings), 100);
  });
};

// Create a rating
export const createRating = async (ratingData: {
  stars: number;
  comment?: string;
  bookId: string;
}): Promise<Rating> => {
  return new Promise((resolve, reject) => {
    try {
      if (ratings.length === 0 && typeof window !== "undefined") {
        initializeRatings();
      }
      const newRating: Rating = {
        id: generateId(),
        bookId: ratingData.bookId,
        stars: ratingData.stars,
        comment: ratingData.comment,
        createdAt: new Date().toISOString(),
      };
      ratings.push(newRating);
      persistRatings();
      updateBookAverageRating(ratingData.bookId).then(() => {
        setTimeout(() => resolve(newRating), 100);
      });
    } catch (error) {
      console.error("Error creating rating:", error);
      reject(error);
    }
  });
};

// Delete all ratings by book ID (used when deleting a book)
export const deleteRatingsByBookId = async (bookId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      if (ratings.length === 0 && typeof window !== "undefined") {
        initializeRatings();
      }
      ratings = ratings.filter((r) => r.bookId !== bookId);
      persistRatings();
      setTimeout(() => resolve(), 100);
    } catch (error) {
      console.error(`Error deleting ratings for book ${bookId}:`, error);
      reject(error);
    }
  });
};