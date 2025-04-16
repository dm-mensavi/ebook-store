import { Book } from "../models/Book";
import { addBookToAuthor, removeBookFromAuthor, getAuthorById, getStoredAuthors } from "./authorProvider";
import { deleteRatingsByBookId } from "./ratingProvider";

// Utility to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Local storage keys and versioning for books
const STORAGE_KEY = "books";
const VERSION_KEY = "books_version";
const CURRENT_VERSION = "1.0"; // Increment when sampleBooks change

// Initialize books from localStorage or use sample data
export const getStoredBooks = (): Book[] => {
  if (typeof window === "undefined") return []; // Handle SSR
  const storedVersion = localStorage.getItem(VERSION_KEY);
  const stored = localStorage.getItem(STORAGE_KEY);

  if (storedVersion !== CURRENT_VERSION || !stored) {
    // Fetch authors to link books
    const authors = getStoredAuthors();
    // Sample data: 50 books
    const sampleBooks: Book[] = [
      { id: generateId(), title: "Pride and Prejudice", publishedYear: 1813, price: 9.99, authorId: authors[0].id, authorName: authors[0].name, averageRating: 4.5 },
      { id: generateId(), title: "Sense and Sensibility", publishedYear: 1811, price: 8.99, authorId: authors[0].id, authorName: authors[0].name, averageRating: 4.3 },
      { id: generateId(), title: "1984", publishedYear: 1949, price: 12.99, authorId: authors[1].id, authorName: authors[1].name, averageRating: 4.8 },
      { id: generateId(), title: "Animal Farm", publishedYear: 1945, price: 7.99, authorId: authors[1].id, authorName: authors[1].name, averageRating: 4.6 },
      { id: generateId(), title: "Mrs Dalloway", publishedYear: 1925, price: 10.50, authorId: authors[2].id, authorName: authors[2].name, averageRating: 4.2 },
      { id: generateId(), title: "To the Lighthouse", publishedYear: 1927, price: 11.00, authorId: authors[2].id, authorName: authors[2].name, averageRating: 4.1 },
      { id: generateId(), title: "The Old Man and the Sea", publishedYear: 1952, price: 8.50, authorId: authors[3].id, authorName: authors[3].name, averageRating: 4.0 },
      { id: generateId(), title: "A Farewell to Arms", publishedYear: 1929, price: 9.75, authorId: authors[3].id, authorName: authors[3].name, averageRating: 3.9 },
      { id: generateId(), title: "Beloved", publishedYear: 1987, price: 14.99, authorId: authors[4].id, authorName: authors[4].name, averageRating: 4.7 },
      { id: generateId(), title: "Song of Solomon", publishedYear: 1977, price: 13.50, authorId: authors[4].id, authorName: authors[4].name, averageRating: 4.4 },
      { id: generateId(), title: "One Hundred Years of Solitude", publishedYear: 1967, price: 15.00, authorId: authors[5].id, authorName: authors[5].name, averageRating: 4.9 },
      { id: generateId(), title: "Love in the Time of Cholera", publishedYear: 1985, price: 14.25, authorId: authors[5].id, authorName: authors[5].name, averageRating: 4.6 },
      { id: generateId(), title: "Harry Potter and the Sorcerer’s Stone", publishedYear: 1997, price: 10.99, authorId: authors[6].id, authorName: authors[6].name, averageRating: 4.8 },
      { id: generateId(), title: "Harry Potter and the Chamber of Secrets", publishedYear: 1998, price: 11.99, authorId: authors[6].id, authorName: authors[6].name, averageRating: 4.7 },
      { id: generateId(), title: "And Then There Were None", publishedYear: 1939, price: 7.50, authorId: authors[7].id, authorName: authors[7].name, averageRating: 4.3 },
      { id: generateId(), title: "Murder on the Orient Express", publishedYear: 1934, price: 8.25, authorId: authors[7].id, authorName: authors[7].name, averageRating: 4.2 },
      { id: generateId(), title: "War and Peace", publishedYear: 1865, price: 18.99, authorId: authors[8].id, authorName: authors[8].name, averageRating: 4.5 },
      { id: generateId(), title: "Anna Karenina", publishedYear: 1878, price: 16.50, authorId: authors[8].id, authorName: authors[8].name, averageRating: 4.4 },
      { id: generateId(), title: "Things Fall Apart", publishedYear: 1958, price: 9.99, authorId: authors[9].id, authorName: authors[9].name, averageRating: 4.1 },
      { id: generateId(), title: "Arrow of God", publishedYear: 1964, price: 10.25, authorId: authors[9].id, authorName: authors[9].name, averageRating: 4.0 },
      { id: generateId(), title: "Norwegian Wood", publishedYear: 1987, price: 12.50, authorId: authors[10].id, authorName: authors[10].name, averageRating: 4.3 },
      { id: generateId(), title: "Kafka on the Shore", publishedYear: 2002, price: 13.75, authorId: authors[10].id, authorName: authors[10].name, averageRating: 4.4 },
      { id: generateId(), title: "I Know Why the Caged Bird Sings", publishedYear: 1969, price: 11.50, authorId: authors[11].id, authorName: authors[11].name, averageRating: 4.6 },
      { id: generateId(), title: "Gather Together in My Name", publishedYear: 1974, price: 10.75, authorId: authors[11].id, authorName: authors[11].name, averageRating: 4.2 },
      { id: generateId(), title: "The Adventures of Tom Sawyer", publishedYear: 1876, price: 7.99, authorId: authors[12].id, authorName: authors[12].name, averageRating: 4.0 },
      { id: generateId(), title: "Huckleberry Finn", publishedYear: 1884, price: 8.50, authorId: authors[12].id, authorName: authors[12].name, averageRating: 4.1 },
      { id: generateId(), title: "The House of the Spirits", publishedYear: 1982, price: 13.99, authorId: authors[13].id, authorName: authors[13].name, averageRating: 4.5 },
    ];
    // Update authors' books array
    sampleBooks.forEach((book) => {
      const author = authors.find((a: any) => a.id === book.authorId);
      if (author) {
        author.books.push({ id: book.id, title: book.title, link: `/books/${book.id}` });
        author.numberOfBooks = (author.numberOfBooks || 0) + 1;
        author.bookCount = (author.bookCount || 0) + 1;
        author.averageRating = sampleBooks
          .filter((b) => b.authorId === author.id && b.averageRating)
          .reduce((sum, b) => sum + (b.averageRating || 0), 0) /
          author.books.length || 0;
      }
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBooks));
    localStorage.setItem("authors", JSON.stringify(authors)); // Update authors in storage
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    return sampleBooks;
  }
  return JSON.parse(stored);
};

// In-memory store
let books: Book[] = getStoredBooks();

// Persist books to localStorage
const persistBooks = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
  }
};

// Function to get all books
export const getBooks = async (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(books), 100); // Simulate async
  });
};

// Fetch book by ID
export const getBookById = async (id: string): Promise<Book> => {
  return new Promise((resolve, reject) => {
    try {
      const book = books.find((b) => b.id === id);
      if (!book) {
        throw new Error("Book not found");
      }
      setTimeout(() => resolve(book), 100);
    } catch (error) {
      console.error(`Error fetching book with id ${id}:`, error);
      reject(error);
    }
  });
};

// Create a book
export const createBook = async (bookData: {
  title: string;
  publishedYear: number;
  price: number;
  authorId: string;
}): Promise<Book> => {
  return new Promise((resolve, reject) => {
    try {
      // Fetch author to get authorName
      getAuthorById(bookData.authorId).then((author) => {
        const newBook: Book = {
          id: generateId(),
          title: bookData.title,
          publishedYear: bookData.publishedYear,
          price: bookData.price,
          authorId: bookData.authorId,
          authorName: author.name,
          averageRating: 0,
        };
        books.push(newBook);
        persistBooks();
        // Update author's books
        addBookToAuthor(bookData.authorId, newBook).then(() => {
          setTimeout(() => resolve(newBook), 100);
        });
      }).catch((error) => {
        throw new Error("Author not found");
      });
    } catch (error) {
      console.error("Error creating book:", error);
      reject(error);
    }
  });
};

// Delete a book
export const deleteBook = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const book = books.find((b) => b.id === id);
      if (!book) {
        throw new Error("Book not found");
      }
      books = books.filter((b) => b.id !== id);
      persistBooks();
      // Remove from author's books and delete ratings
      Promise.all([
        removeBookFromAuthor(book.authorId, id),
        deleteRatingsByBookId(id),
      ]).then(() => {
        setTimeout(() => resolve(), 100);
      });
    } catch (error) {
      console.error(`Error deleting book with id ${id}:`, error);
      reject(error);
    }
  });
};

// Update a book
export const updateBook = async (
  id: string,
  bookData: Partial<Book>
): Promise<Book> => {
  return new Promise((resolve, reject) => {
    try {
      const index = books.findIndex((b) => b.id === id);
      if (index === -1) {
        throw new Error("Book not found");
      }
      books[index] = {
        ...books[index],
        ...bookData,
      };
      persistBooks();
      // Update author's books if title changed
      if (bookData.title) {
        removeBookFromAuthor(books[index].authorId, id).then(() => {
          addBookToAuthor(books[index].authorId, books[index]).then(() => {
            setTimeout(() => resolve(books[index]), 100);
          });
        });
      } else {
        setTimeout(() => resolve(books[index]), 100);
      }
    } catch (error) {
      console.error(`Error updating book with id ${id}:`, error);
      reject(error);
    }
  });
};

// Get books by author ID
export const getBooksByAuthorId = async (authorId: string): Promise<Book[]> => {
  return new Promise((resolve) => {
    const authorBooks = books.filter((book) => book.authorId === authorId);
    setTimeout(() => resolve(authorBooks), 100);
  });
};

// Delete all books by author ID (used when deleting an author)
export const deleteBooksByAuthorId = async (authorId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const authorBooks = books.filter((book) => book.authorId === authorId);
      books = books.filter((book) => book.authorId !== authorId);
      persistBooks();
      // Delete ratings for each book
      Promise.all(
        authorBooks.map((book) => deleteRatingsByBookId(book.id))
      ).then(() => {
        setTimeout(() => resolve(), 100);
      });
    } catch (error) {
      console.error(`Error deleting books for author ${authorId}:`, error);
      reject(error);
    }
  });
};