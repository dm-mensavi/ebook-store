import { Rating } from "../models/Rating";
import { updateBook, getStoredBooks } from "./bookProvider";

// Utility to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Local storage keys and versioning for ratings
const STORAGE_KEY = "ratings";
const VERSION_KEY = "ratings_version";
const CURRENT_VERSION = "1.0"; // Increment when sampleRatings change

// Initialize ratings from localStorage or use sample data
export const getStoredRatings = (): Rating[] => {
  if (typeof window === "undefined") return []; // Handle SSR
  const storedVersion = localStorage.getItem(VERSION_KEY);
  const stored = localStorage.getItem(STORAGE_KEY);

  if (storedVersion !== CURRENT_VERSION || !stored) {
    // Sample data: ratings for some books
    const sampleRatings: Rating[] = [
      { id: generateId(), bookId: getStoredBooks()[0].id, stars: 5, comment: "A timeless classic!", createdAt: new Date().toISOString() },
      { id: generateId(), bookId: getStoredBooks()[0].id, stars: 4, comment: "Really enjoyed it.", createdAt: new Date().toISOString() },
      { id: generateId(), bookId: getStoredBooks()[2].id, stars: 5, comment: "A must-read!", createdAt: new Date().toISOString() },
      { id: generateId(), bookId: getStoredBooks()[2].id, stars: 4, comment: "Thought-provoking.", createdAt: new Date().toISOString() },
      { id: generateId(), bookId: getStoredBooks()[4].id, stars: 4, comment: "Beautifully written.", createdAt: new Date().toISOString() },
      { id: generateId(), bookId: getStoredBooks()[6].id, stars: 5, comment: "Gripping story!", createdAt: new Date().toISOString() },
      { id: generateId(), bookId: getStoredBooks()[8].id, stars: 5, comment: "Heart-wrenching.", createdAt: new Date().toISOString() },
      { id: generateId(), bookId: getStoredBooks()[10].id, stars: 5, comment: "Magical!", createdAt: new Date().toISOString() },
      { id: generateId(), bookId: getStoredBooks()[12].id, stars: 5, comment: "Loved it!", createdAt: new Date().toISOString() },
      { id: generateId(), bookId: getStoredBooks()[14].id, stars: 4, comment: "Classic mystery.", createdAt: new Date().toISOString() },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleRatings));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    return sampleRatings;
  }
  return JSON.parse(stored);
};

// In-memory store
let ratings: Rating[] = getStoredRatings();

// Persist ratings to localStorage
const persistRatings = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
  }
};

// Update book's average rating
const updateBookAverageRating = async (bookId: string): Promise<void> => {
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
      const newRating: Rating = {
        id: generateId(),
        bookId: ratingData.bookId,
        stars: ratingData.stars,
        comment: ratingData.comment,
        createdAt: new Date().toISOString(),
      };
      ratings.push(newRating);
      persistRatings();
      // Update book's average rating
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
      ratings = ratings.filter((r) => r.bookId !== bookId);
      persistRatings();
      setTimeout(() => resolve(), 100);
    } catch (error) {
      console.error(`Error deleting ratings for book ${bookId}:`, error);
      reject(error);
    }
  });
};