"use client";

import BookList from "../../components/books/BookList";

export default function BooksPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Books List</h1>
      <BookList />
    </>
  );
}
