import React from "react";
import { Book } from "../../models/Book";
import Ratings from "../ui/Ratings";

type BookCardProps = {
  book: Book;
};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const lengthOfTitle = 20;
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold">
        {book.title.length > lengthOfTitle
          ? `${book.title.slice(0, lengthOfTitle)}...`
          : book.title}
      </h2>
      <p className="text-gray-600">By {book.authorName}</p>
      <p className="mt-2 text-sm text-gray-700">
        Published: {book.publishedYear}
      </p>
      <p className="mt-2 text-sm text-gray-700">
        Price: ${book.price.toFixed(2)}
      </p>
      {book.averageRating !== undefined ? (
        <div className="mt-2 flex items-center">
          <Ratings rating={book.averageRating} />
          <span className="ml-2 text-sm text-gray-600">
            ({(book.averageRating ?? 0).toFixed(1)})
          </span>
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-500">No ratings yet.</p>
      )}
    </div>
  );
};

export default BookCard;
