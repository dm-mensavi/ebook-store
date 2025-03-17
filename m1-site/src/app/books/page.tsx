'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBookById, deleteBook } from '../../providers/bookProvider';
import { Book } from '../../models/Book';
import Link from 'next/link';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Modal from '../../components/ui/Modal';

const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const bookData = await getBookById(Number(id));
        setBook(bookData);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteBook(Number(id));
      router.push('/books');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  if (loading || !book) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Books', href: '/books' },
          { label: book.title }
        ]}
      />

      {/* Book Details */}
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>

      <div className="mb-4">
        <p><strong>Published Year:</strong> {book.publishedYear}</p>
        <p><strong>Price:</strong> €{book.price}</p>
        <p>
          <strong>Author:</strong>{' '}
          <Link href={`/authors/${book.author.id}`} className="text-blue-500 hover:underline">
            {book.author.name}
          </Link>
        </p>
        {book.averageRating !== undefined && (
          <p><strong>Average Rating:</strong> {book.averageRating}</p>
        )}
      </div>

      {/* Delete Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Book
      </button>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleDelete();
          setIsModalOpen(false);
        }}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete <strong>{book.title}</strong>?</p>
      </Modal>
    </div>
  );
};

export default BookDetailsPage;
