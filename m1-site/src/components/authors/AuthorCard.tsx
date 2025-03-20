// "use client";

// import React from "react";
// import "../../styles/globals.css";
// import { Author } from "../../models/Author";

// interface AuthorCardProps {
//   author: Author;
// }

// const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
//   return (
//     <div className="border rounded-md shadow-sm p-4 bg-white hover:shadow-md transition-shadow duration-300 cursor-pointer">
//       <div className="flex flex-col items-center">
//         <img
//           src={author.photo || "https://via.placeholder.com/150"}
//           alt={author.name}
//           className="w-32 h-32 object-cover rounded-full mb-4 bg-gray-500"
//         />
//         <h2 className="text-lg font-semibold mb-2">{author.name}</h2>
//         {author.biography && (
//           <p className="text-sm text-gray-600 text-center">
//             {author.biography}
//           </p>
//         )}
//       </div>

//       <div className="mt-4 text-center">
//         <p className="text-sm text-gray-800">
//           Books Written:
//           <span className="font-medium">{author.bookCount ?? 0}</span>
//         </p>
//         <p className="text-sm text-yellow-600 font-medium">
//           Average Rating: {author.averageRating ?? "N/A"} ⭐
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthorCard;

"use client";

import React from "react";
import { Author } from "../../models/Author";
import Rating from "@mui/material/Rating"; // Import MUI Rating
import StarIcon from "@mui/icons-material/Star"; // Import StarIcon

interface AuthorCardProps {
  author: Author;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <div className="border p-4 rounded-md shadow hover:shadow-lg transition">
      <div className="flex flex-col items-center">
        <img
          src={author.photo || "https://via.placeholder.com/150"}
          alt={author.name}
          className="w-32 h-32 object-cover rounded-full mb-4 bg-gray-500"
        />
        <h2 className="text-lg font-semibold mb-2">{author.name}</h2>
      </div>

      {author.biography && (
        <p className="text-sm text-gray-600 mb-2 text-center">
          {author.biography}
        </p>
      )}

      <div className="flex justify-between text-sm text-gray-700 mt-4">
        <div>
          <span className="font-medium">Books:</span>{" "}
          {author.numberOfBooks ?? author.bookCount ?? 0}
        </div>
        <div className="flex items-center">
          <span className="font-medium">Rating:</span>{" "}
          <Rating
            name="author-rating"
            value={author.averageRating ?? 0} // Use 0 if averageRating is undefined
            precision={0.1} // Show decimal places for the average
            readOnly // Make the rating read-only
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <span className="ml-2 text-gray-600">
            ({author.averageRating?.toFixed(1) ?? "N/A"})
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
