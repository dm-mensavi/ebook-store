// // import { Book } from '../../models/Book';
// // import Link from 'next/link';

// // type BookCardProps = {
// //   book: Book;
// // };

// // const BookCard = ({ book }: BookCardProps) => {
// //   return (
// //     <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-all flex flex-col justify-between">
// //       <div>
// //         <h2 className="text-xl font-semibold">{book.title}</h2>
// //         <p className="text-gray-600">Published: {book.publishedYear}</p>
// //         <p className="text-gray-600">Author: {book.author.name}</p>
// //         <p className="text-gray-800 font-bold">Price: €{book.price}</p>
// //         <p className="text-yellow-500">Avg Rating: {book.averageRating ?? 'N/A'}</p>
// //       </div>

// //       <Link href={`/books/${book.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded text-center">
// //         View Details
// //       </Link>
// //     </div>
// //   );
// // };

// // export default BookCard;

// "use client";

// import React from "react";
// import "../../styles/globals.css";
// import { Book } from "../../models/Book";
// import DrawerComponent from "../layout/DrawerComponent";

// type BookCardProps = {
//   book: Book;
// };

// const BookCard: React.FC<BookCardProps> = ({ book }) => {
//   return (
//     <div
//       className="border rounded-md border-red-500 shadow-sm p-4 bg-white hover:shadow-md transition-shadow duration-300"
//       onClick={() => console.log(book.id)}
//     >
//       <h2 className="text-lg font-semibold mb-2">{book.title}</h2>

//       <p className="text-sm text-gray-600 mb-1">
//         Author:
//         <span className="font-medium">{book.authorName}</span>
//       </p>
//       <p>id : {book.id}</p>

//       <p className="text-sm text-gray-600 mb-1">
//         Published Year:{" "}
//         <span className="font-medium">{book.publishedYear}</span>
//       </p>

//       <p className="text-sm text-gray-800 mb-1">
//         Price: <span className="font-semibold">${book.price.toFixed(2)}</span>
//       </p>

//       <p className="text-sm text-yellow-600 font-medium">
//         Average Rating: {book.averageRating} ⭐
//       </p>
//       <DrawerComponent />
//     </div>
//   );
// };

// export default BookCard;

import React, { useState } from "react";
import { Book } from "../../models/Book";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import RatingCard from "../ratings/RatingCard";
import DrawerComponent from "../layout/DrawerComponent";
import Ratings from "../ui/Ratings";

type BookCardProps = {
  book: Book;
};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [showRatings, setShowRatings] = useState<boolean>(false);
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

      {/* <button
        className="mt-4 text-blue-500 hover:text-blue-700"
        onClick={() => setShowRatings(!showRatings)}
      >
        {showRatings ? "Hide Ratings" : "Show Ratings"}
      </button> */}

      {/* {showRatings && <RatingCard bookId={book.id} />} */}
    </div>
  );
};

export default BookCard;
