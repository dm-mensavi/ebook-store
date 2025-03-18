'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBookById, deleteBook } from '../../../providers/bookProvider';
import { Book } from '../../../models/Book';
import Link from 'next/link';

// ✅ MUI Components
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// ✅ Global Layout import
import GlobalLayout from '../../../components/layout/GlobalLayout';

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

  // ✅ Show loading state
  if (loading || !book) {
    return (
      <GlobalLayout
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Books', href: '/books' },
          { label: 'Loading...' },
        ]}
      >
        <Typography>Loading book details...</Typography>
      </GlobalLayout>
    );
  }

  // ✅ Page content inside GlobalLayout
  return (
    <GlobalLayout
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Books', href: '/books' },
        { label: book.title },
      ]}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {book.title}
      </Typography>

      <div className="space-y-2 mb-4">
        <Typography><strong>Published Year:</strong> {book.publishedYear}</Typography>
        <Typography><strong>Price:</strong> €{book.price}</Typography>
        <Typography>
          <strong>Author:</strong>{' '}
          <Link href={`/authors/${book.author.id}`} legacyBehavior>
            <a className="text-blue-600 hover:underline">{book.author.name}</a>
          </Link>
        </Typography>
        {book.averageRating !== undefined && (
          <Typography><strong>Average Rating:</strong> {book.averageRating}</Typography>
        )}
      </div>

      {/* ✅ Delete Button */}
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 4 }}
        onClick={() => setIsModalOpen(true)}
      >
        Delete Book
      </Button>

      {/* ✅ Confirmation Dialog */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description"
      >
        <DialogTitle id="confirm-delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-dialog-description">
            Are you sure you want to delete <strong>{book.title}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleDelete();
              setIsModalOpen(false);
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </GlobalLayout>
  );
};

export default BookDetailsPage;
