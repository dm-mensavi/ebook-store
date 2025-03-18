"use client";

import React from "react";
import "../../styles/globals.css";
import { Author } from "../../models/Author";

interface AuthorCardProps {
  author: Author;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <div className="border rounded-md shadow-sm p-4 bg-white hover:shadow-md transition-shadow duration-300 cursor-pointer">
      <div className="flex flex-col items-center">
        <img
          src={author.photo || "https://via.placeholder.com/150"}
          alt={author.name}
          className="w-32 h-32 object-cover rounded-full mb-4 bg-gray-500"
        />
        <h2 className="text-lg font-semibold mb-2">{author.name}</h2>
        {author.biography && (
          <p className="text-sm text-gray-600 text-center">
            {author.biography}
          </p>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-800">
          Books Written:
          <span className="font-medium">{author.bookCount ?? 0}</span>
        </p>
        <p className="text-sm text-yellow-600 font-medium">
          Average Rating: {author.averageRating ?? "N/A"} ⭐
        </p>
      </div>
    </div>
  );
};

export default AuthorCard;
