"use client";
import { useParams, useRouter } from "next/navigation"; // Add useParams
import { useEffect, useState } from "react";
import { deleteBook, getBookById } from "../../../providers/bookProvider";
import { Book } from "../../../models/Book";
import Link from "next/link";
import ConfirmationModal from "../../../components/ui/ConfirmationModal";
import { toast } from "react-toastify";
import DrawerComponent from "../../../components/layout/DrawerComponent";
import Ratings from "../../../components/ui/Ratings";
import PageTitle from "../../../components/ui/PageTitle";
import Loading from "../../../components/ui/Loading";

const BookDetailsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; // Get the book ID from the URL
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // Fetch book details
  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const bookData = await getBookById(id);
          setBook(bookData);
        } catch (err) {
          setError("Failed to fetch book details.");
          toast.error("Failed to fetch book details.");
        } finally {
          setLoading(false);
        }
      };

      fetchBook();
    }
  }, [id]);

  // Handle book deletion
  const handleDelete = async () => {
    try {
      await deleteBook(id);
      toast.success("Book deleted successfully.");
      router.push("/books"); // Redirect to the book list page after deletion
    } catch (err) {
      // console.error("Failed to delete book:", err);
      toast.error("Failed to delete book.");
    }
  };

  if (loading) {
    return <Loading message="Fetching book details..." />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div className="p-4">
      <PageTitle title="Book Details" />
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="mt-2 text-gray-600">Price: ${book.price.toFixed(2)}</p>
      <p className="mt-2 text-gray-600">Published Year: {book.publishedYear}</p>
      <p className="mt-2 text-gray-600">
        Average Rating: {book.averageRating?.toFixed(1) ?? 0}
      </p>
      <Ratings rating={book.averageRating ?? 0} />
      <p className="mt-2 text-gray-600">
        Author:{" "}
        <Link
          href={`/authors/${book.authorId}`}
          className="text-blue-500 hover:underline"
        >
          {book.authorName}
        </Link>
        <DrawerComponent
          bookId={book.id}
          averageRating={book.averageRating ?? 0}
        />
      </p>

      {/* Delete Button */}
      <button
        onClick={() => setIsDeleteModalOpen(true)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Delete Book
      </button>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Book"
        message="Are you sure you want to delete this book?"
      />
    </div>
  );
};

export default BookDetailsPage;
