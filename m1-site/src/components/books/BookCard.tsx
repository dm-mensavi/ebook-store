import { Book } from '../../models/Book';
import Link from 'next/link';

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-all flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold">{book.title}</h2>
        <p className="text-gray-600">Published: {book.publishedYear}</p>
        <p className="text-gray-600">Author: {book.author.name}</p>
        <p className="text-gray-800 font-bold">Price: €{book.price}</p>
        <p className="text-yellow-500">Avg Rating: {book.averageRating ?? 'N/A'}</p>
      </div>

      <Link href={`/books/${book.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded text-center">
        View Details
      </Link>
    </div>
  );
};

export default BookCard;
