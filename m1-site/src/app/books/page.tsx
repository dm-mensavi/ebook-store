"use client";

import BookList from "../../components/books/BookList";
import PageTitle from "../../components/ui/PageTitle";

export default function BooksPage() {
  return (
    <>
      <PageTitle title="Books List" />
      <BookList />
    </>
  );
}
