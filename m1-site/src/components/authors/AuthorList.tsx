"use client";

import React from "react";
import AuthorCard from "./AuthorCard";
import { Author } from "../../models/Author";

interface AuthorListProps {
  authors: Author[];
}

const AuthorList: React.FC<AuthorListProps> = ({ authors }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {authors.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No authors found.
        </p>
      ) : (
        authors.map((author) => <AuthorCard key={author.id} author={author} />)
      )}
    </div>
  );
};

export default AuthorList;
