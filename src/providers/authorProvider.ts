import { Author } from "../models/Author";
import { Book } from "../models/Book";
import { getBooksByAuthorId, deleteBooksByAuthorId } from "./bookProvider";

// Utility to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Local storage keys and versioning
const STORAGE_KEY = "authors";
const VERSION_KEY = "authors_version";
const CURRENT_VERSION = "1.0"; // Increment when sampleAuthors change

// Sample authors data (used as fallback or initial data)
const sampleAuthors: Author[] = [
  { id: generateId(), name: "Jane Austen", biography: "English novelist known for her romance novels.", photo: "https://ui-avatars.com/api/?name=Jane+Austen&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "George Orwell", biography: "Author of dystopian classics.", photo: "https://ui-avatars.com/api/?name=George+Orwell&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Virginia Woolf", biography: "Modernist writer and essayist.", photo: "https://ui-avatars.com/api/?name=Virginia+Woolf&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Ernest Hemingway", biography: "American novelist known for his concise style.", photo: "https://ui-avatars.com/api/?name=Ernest+Hemingway&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Toni Morrison", biography: "Celebrated for her works on African-American experiences.", photo: "https://ui-avatars.com/api/?name=Toni+Morrison&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Gabriel Garcia Marquez", biography: "Master of magical realism.", photo: "https://ui-avatars.com/api/?name=Gabriel+Garcia+Marquez&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "J.K. Rowling", biography: "Creator of the Harry Potter series.", photo: "https://ui-avatars.com/api/?name=J.K.+Rowling&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Agatha Christie", biography: "Queen of mystery novels.", photo: "https://ui-avatars.com/api/?name=Agatha+Christie&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Leo Tolstoy", biography: "Russian author of epic novels.", photo: "https://ui-avatars.com/api/?name=Leo+Tolstoy&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Chinua Achebe", biography: "Nigerian novelist and poet.", photo: "https://ui-avatars.com/api/?name=Chinua+Achebe&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Haruki Murakami", biography: "Japanese writer of surreal fiction.", photo: "https://ui-avatars.com/api/?name=Haruki+Murakami&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Maya Angelou", biography: "Poet and civil rights activist.", photo: "https://ui-avatars.com/api/?name=Maya+Angelou&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Mark Twain", biography: "American humorist and novelist.", photo: "https://ui-avatars.com/api/?name=Mark+Twain&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Isabel Allende", biography: "Chilean writer of magical realism.", photo: "https://ui-avatars.com/api/?name=Isabel+Allende&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Franz Kafka", biography: "Bohemian writer of existential fiction.", photo: "https://ui-avatars.com/api/?name=Franz+Kafka&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Zadie Smith", biography: "British novelist and essayist.", photo: "https://ui-avatars.com/api/?name=Zadie+Smith&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Salman Rushdie", biography: "Author of controversial and imaginative works.", photo: "https://ui-avatars.com/api/?name=Salman+Rushdie&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Emily Dickinson", biography: "American poet known for her reclusive life.", photo: "https://ui-avatars.com/api/?name=Emily+Dickinson&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Neil Gaiman", biography: "Author of fantasy and graphic novels.", photo: "https://ui-avatars.com/api/?name=Neil+Gaiman&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
  { id: generateId(), name: "Arundhati Roy", biography: "Indian author and activist.", photo: "https://ui-avatars.com/api/?name=Arundhati+Roy&size=256", books: [], numberOfBooks: 0, bookCount: 0, averageRating: 0 },
];

// In-memory store (initially empty, populated client-side)
let authors: Author[] = [];

// Client-side initialization of authors
export const initializeAuthors = (): void => {
  if (typeof window === "undefined") return; // Skip on server
  const storedVersion = localStorage.getItem(VERSION_KEY);
  const stored = localStorage.getItem(STORAGE_KEY);

  if (storedVersion !== CURRENT_VERSION || !stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleAuthors));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    authors = [...sampleAuthors];
  } else {
    authors = JSON.parse(stored);
  }
};

// Persist authors to localStorage (client-only)
const persistAuthors = (): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authors));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
  }
};

// Calculate average rating for an author based on their books
const calculateAuthorAverageRating = async (authorId: string): Promise<number> => {
  const books = await getBooksByAuthorId(authorId);
  const ratings = books
    .filter((book) => book.averageRating !== undefined)
    .map((book) => book.averageRating!);
  return ratings.length > 0
    ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
    : 0;
};

// Function to get all authors
export const getAuthors = async (): Promise<Author[]> => {
  return new Promise((resolve) => {
    // Ensure authors are initialized client-side
    if (authors.length === 0 && typeof window !== "undefined") {
      initializeAuthors();
    }
    setTimeout(() => resolve(authors), 100); // Simulate async
  });
};

// POST - Add a new author
export const addAuthor = async (authorData: {
  name: string;
  photo?: string;
  biography?: string;
}): Promise<Author> => {
  return new Promise((resolve, reject) => {
    try {
      const newAuthor: Author = {
        id: generateId(),
        name: authorData.name,
        photo: authorData.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorData.name)}&size=256`,
        biography: authorData.biography,
        books: [],
        numberOfBooks: 0,
        bookCount: 0,
        averageRating: 0,
      };
      authors.push(newAuthor);
      persistAuthors();
      setTimeout(() => resolve(newAuthor), 100);
    } catch (error) {
      console.error("Failed to add author:", error);
      reject(error);
    }
  });
};

// GET - Get author by ID
export const getAuthorById = async (id: string): Promise<Author> => {
  return new Promise((resolve, reject) => {
    try {
      // Ensure authors are initialized client-side
      if (authors.length === 0 && typeof window !== "undefined") {
        initializeAuthors();
      }
      const author = authors.find((a) => a.id === id);
      if (!author) {
        throw new Error("Author not found");
      }
      setTimeout(() => resolve(author), 100);
    } catch (error) {
      console.error("Error fetching author:", error);
      reject(error);
    }
  });
};

// PATCH - Update an author
export const updateAuthor = async (
  id: string,
  updatedData: {
    name?: string;
    biography?: string;
    photo?: string;
  }
): Promise<Author> => {
  return new Promise((resolve, reject) => {
    try {
      // Ensure authors are initialized client-side
      if (authors.length === 0 && typeof window !== "undefined") {
        initializeAuthors();
      }
      const index = authors.findIndex((a) => a.id === id);
      if (index === -1) {
        throw new Error("Author not found");
      }
      authors[index] = {
        ...authors[index],
        ...updatedData,
      };
      persistAuthors();
      setTimeout(() => resolve(authors[index]), 100);
    } catch (error) {
      console.error("Error updating author:", error);
      reject(error);
    }
  });
};

// DELETE - Delete an author and their books
export const deleteAuthor = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Ensure authors are initialized client-side
      if (authors.length === 0 && typeof window !== "undefined") {
        initializeAuthors();
      }
      const index = authors.findIndex((a) => a.id === id);
      if (index === -1) {
        throw new Error("Author not found");
      }
      // Delete associated books and ratings
      deleteBooksByAuthorId(id);
      authors.splice(index, 1);
      persistAuthors();
      setTimeout(() => resolve(), 100);
    } catch (error) {
      console.error("Error deleting author:", error);
      reject(error);
    }
  });
};

// Add a book to an author
export const addBookToAuthor = async (authorId: string, book: Book): Promise<Author> => {
  return new Promise((resolve, reject) => {
    try {
      // Ensure authors are initialized client-side
      if (authors.length === 0 && typeof window !== "undefined") {
        initializeAuthors();
      }
      const index = authors.findIndex((a) => a.id === authorId);
      if (index === -1) {
        throw new Error("Author not found");
      }
      authors[index].books.push({
        id: book.id,
        title: book.title,
        link: `/books/${book.id}`,
      });
      authors[index].numberOfBooks = (authors[index].numberOfBooks || 0) + 1;
      authors[index].bookCount = (authors[index].bookCount || 0) + 1;
      // Update average rating
      calculateAuthorAverageRating(authorId).then((avgRating) => {
        authors[index].averageRating = avgRating;
        persistAuthors();
        setTimeout(() => resolve(authors[index]), 100);
      });
    } catch (error) {
      console.error("Error adding book to author:", error);
      reject(error);
    }
  });
};

// Remove a book from an author
export const removeBookFromAuthor = async (authorId: string, bookId: string): Promise<Author> => {
  return new Promise((resolve, reject) => {
    try {
      // Ensure authors are initialized client-side
      if (authors.length === 0 && typeof window !== "undefined") {
        initializeAuthors();
      }
      const index = authors.findIndex((a) => a.id === authorId);
      if (index === -1) {
        throw new Error("Author not found");
      }
      authors[index].books = authors[index].books.filter((book) => book.id !== bookId);
      authors[index].numberOfBooks = (authors[index].numberOfBooks || 0) - 1;
      authors[index].bookCount = (authors[index].bookCount || 0) - 1;
      // Update average rating
      calculateAuthorAverageRating(authorId).then((avgRating) => {
        authors[index].averageRating = avgRating;
        persistAuthors();
        setTimeout(() => resolve(authors[index]), 100);
      });
    } catch (error) {
      console.error("Error removing book from author:", error);
      reject(error);
    }
  });
};