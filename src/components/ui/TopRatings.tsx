import React, { useEffect, useState } from "react";
import { getBooks } from "../../providers/bookProvider";
import { Book } from "../../models/Book";
import Link from "next/link";
import Ratings from "../../components/ui/Ratings";
import PageTitle from "../../components/ui/PageTitle";
import { motion } from "framer-motion";
import Loading from "./Loading";
const TopRatings = () => {
  const [topBooks, setTopBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const titleLength = 10;
  const authorLength = 10;
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getBooks();
        const sortedBooks = books
          .filter((book: Book) => typeof book.averageRating === "number")
          .sort(
            (a: Book, b: Book) =>
              (b.averageRating ?? 0) - (a.averageRating ?? 0)
          )
          .slice(0, 6);

        setTopBooks(sortedBooks);
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <div>
        {loading ? (
          <div className="text-gray-500">
            <Loading />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {topBooks.map((book) => (
              <motion.div
                key={book.id}
                className="border rounded-lg p-4 shadow hover:shadow-md transition"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-lg font-semibold">
                  {book.title.length > titleLength
                    ? `${book.title.substring(0, titleLength)}...`
                    : book.title}
                </h3>

                <p className="text-gray-600 text-sm mb-2">
                  Author:{" "}
                  {book.authorName.length > authorLength
                    ? `${book.authorName.substring(0, authorLength)}...`
                    : book.authorName}
                </p>

                <div className="flex items-center gap-2 mb-2">
                  <Ratings rating={book.averageRating ?? 0} />
                  <p className="text-sm font-bold">
                    {book.averageRating?.toFixed(1) ?? "0.0"}
                  </p>
                </div>

                <p className="text-sm text-gray-700 mb-2">
                  Price: ${book.price.toFixed(2)}
                </p>

                <Link
                  href={`/books/${book.id}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TopRatings;
