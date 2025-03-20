"use client";

import React, { useEffect, useState } from "react";
import { createBook, getBooks } from "../../providers/bookProvider"; // Your API fetch call
import { Book } from "../../models/Book"; // Updated model
import BookCard from "./BookCard";
import Loading from "../ui/Loading";
import "../../styles/globals.css";
import CreateBookModal from "./CreateBookModal";
import Link from "next/link";
import { toast } from "react-toastify";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [sortOption, setSortOption] = useState<string>("title"); // State for sorting option
  const [isCreateBookModalOpen, setIsCreateBookModalOpen] =
    useState<boolean>(false);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (err) {
        setError("Failed to fetch books.");
        toast.error("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleCreateBook = async (book: {
    title: string;
    publishedYear: number;
    price: number;
    authorId: string;
  }) => {
    try {
      const newBook = await createBook(book); // Call the API to create a book
      setBooks((prevBooks) => [...prevBooks, newBook]); // Update the book list
      toast.success("Book created successfully.");
    } catch (err) {
      console.error("Failed to create book:", err);
      toast.error("Failed to create book.");
    }
  };

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort books based on the selected option
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortOption) {
      case "title":
        return a.title.localeCompare(b.title);
      case "price":
        return a.price - b.price;
      case "publishedYear":
        return a.publishedYear - b.publishedYear;
      case "averageRating":
        return (b.averageRating || 0) - (a.averageRating || 0); // Descending order
      default:
        return 0;
    }
  });

  if (loading) {
    return <Loading message="Fetching books..." />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      {/* Search Bar */}
      <div className="m-5">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sorting Dropdown */}
      <div className="m-5">
        <label htmlFor="sort" className="mr-2">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="publishedYear">Published Year</option>
          <option value="averageRating">Average Rating</option>
        </select>
      </div>

      {/* Button to open the Create Book Modal */}
      <div className="m-5">
        <button
          onClick={() => setIsCreateBookModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create New Book
        </button>
      </div>

      {/* Create Book Modal */}
      <CreateBookModal
        isOpen={isCreateBookModalOpen}
        onClose={() => setIsCreateBookModalOpen(false)}
        onCreateBook={handleCreateBook}
      />

      {/* <div className="m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No books found.
          </div>
        ) : (
          books.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div> */}

      {/* Book List */}
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedBooks.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No books found.
          </div>
        ) : (
          sortedBooks.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`}>
              <BookCard key={book.id} book={book} />
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default BookList;
