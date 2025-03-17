'use client';

import { useEffect, useState } from 'react';

// ✅ Layout & Components
import GlobalLayout from '../../components/layout/GlobalLayout';
import BookList from '../../components/books/BookList';

// ✅ API provider
import { getBooks } from '../../providers/bookProvider';

// ✅ Models (optional but useful for type checking)
import { Book } from '../../models/Book';

export default function BooksPage() {
  // ✅ States
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch books on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // ✅ Callback to refresh books after an operation (create/delete etc.)
  const handleBooksUpdated = async () => {
    try {
      const updatedBooks = await getBooks();
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error refreshing books:', error);
    }
  };

  if (loading) {
    return (
      <GlobalLayout
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Books' },
        ]}
      >
        <p>Loading books...</p>
      </GlobalLayout>
    );
  }

  return (
    <GlobalLayout
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Books' },
      ]}
    >
      <h1 className="text-3xl font-bold mb-4">Books List</h1>

      {/* ✅ Book List */}
      <BookList books={books} />
    </GlobalLayout>
  );
}
