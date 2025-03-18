"use client";

import React, { useEffect, useState } from "react";
import { getBooks } from "../../providers/bookProvider"; // Your API fetch call
import { Book } from "../../models/Book"; // Updated model
import BookCard from "./BookCard";
import Loading from "../ui/Loading";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (err) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <Loading message="Fetching books..." />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          No books found.
        </div>
      ) : (
        books.map((book) => <BookCard key={book.title} book={book} />)
      )}
    </div>
  );
};

export default BookList;
