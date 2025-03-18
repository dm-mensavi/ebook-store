"use client";

import React, { useEffect, useState } from "react";
import { getAuthors } from "../../providers/authorProvider"; // Your API fetch call
import { Author } from "../../models/Author";
import AuthorCard from "./AuthorCard";
import Loading from "../../components/ui/Loading"; // Optional: loading spinner

const AuthorList: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authorsData = await getAuthors();
        setAuthors(authorsData);
      } catch (err) {
        setError("Failed to fetch authors.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return <Loading message="Loading authors..." />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {authors.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          No authors found.
        </div>
      ) : (
        authors.map((author) => <AuthorCard key={author.id} author={author} />)
      )}
    </div>
  );
};

export default AuthorList;
