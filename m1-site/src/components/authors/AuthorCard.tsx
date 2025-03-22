"use client";

import React from "react";
import Link from "next/link";
import { Author } from "../../models/Author";
import { Rat } from "lucide-react";
import Ratings from "../ui/Ratings";

type AuthorCardProps = {
  author: Author;
};

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  const lengthOfTitle = 20;
  return (
    <Link href={`/authors/${author.id}`} passHref>
      <div className="border rounded-md shadow-sm p-4 bg-white hover:shadow-md transition cursor-pointer">
        {/* Author Photo */}
        <div className="flex flex-col items-center">
          <img
            src={author.photo || "https://via.placeholder.com/150"}
            alt={author.name}
            className="w-32 h-32 object-cover rounded-full mb-4"
          />

          {/* Author Name */}
          <h2 className="text-lg font-semibold text-center">
            {author.name.length > lengthOfTitle
              ? `${author.name.slice(0, lengthOfTitle)}...`
              : author.name}
          </h2>
        </div>

        {/* Author Stats */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-800">
            Books Written:{" "}
            <span className="font-medium">{author.bookCount ?? 0}</span>
          </p>
          <div className="flex items-center justify-center gap-3">
            <Ratings rating={author.averageRating} />
            <span>{(author.averageRating ?? 0).toFixed(1)}</span>
          </div>
        </div>

        {/* Author Biography */}
        {author.biography && (
          <p className="text-sm text-gray-600 text-center mt-2 line-clamp-3">
            {author.biography}
          </p>
        )}
      </div>
    </Link>
  );
};

export default AuthorCard;
