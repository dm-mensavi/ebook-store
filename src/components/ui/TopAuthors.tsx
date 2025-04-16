"use client";

import React, { useEffect, useState } from "react";
import { getAuthors } from "../../providers/authorProvider";
import { Author } from "../../models/Author";
import Link from "next/link";
import { motion } from "framer-motion";
import Ratings from "../ui/Ratings";

const TopAuthors: React.FC = () => {
  const [topAuthors, setTopAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopAuthors = async () => {
      try {
        const authors = await getAuthors();

        // Sort authors by averageRating (descending)
        const sortedAuthors = authors
          .filter((author: Author) => typeof author.averageRating === "number")
          .sort(
            (a: Author, b: Author) =>
              (b.averageRating ?? 0) - (a.averageRating ?? 0)
          )
          .slice(0, 4); // Get top 5 authors

        setTopAuthors(sortedAuthors);
      } catch (error) {
        console.error("Failed to fetch authors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAuthors();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading top authors...</div>;
  }

  if (topAuthors.length === 0) {
    return <div className="text-gray-500">No authors found.</div>;
  }

  return (
    <motion.div
      className="flex flex-col gap-4"
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
      {topAuthors.map((author) => (
        <motion.div
          key={author.id}
          className="flex items-center gap-3 border p-3 rounded-lg shadow-sm hover:shadow-md transition"
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            src={author.photo || "https://via.placeholder.com/40"}
            alt={author.name}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div className="flex-1">
            <Link
              href={`/authors/${author.id}`}
              className="font-medium text-gray-700 hover:underline"
            >
              {author.name.length > 25
                ? `${author.name.slice(0, 25)}...`
                : author.name}
            </Link>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Ratings rating={author.averageRating ?? 0} />
              <p className="font-bold text-gray-600">
                {author.averageRating?.toFixed(1) ?? "0.0"}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TopAuthors;
