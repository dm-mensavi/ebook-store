// import * as React from "react";
// import Rating from "@mui/material/Rating";
// import Box from "@mui/material/Box";
// import StarIcon from "@mui/icons-material/Star";
// import { Rating as rating } from "../../models/Rating";

// type RatingCardProps = {
//    rating: rating;
// };
// const labels: { [index: string]: string } = {
//   0.5: "Useless",
//   1: "Useless+",
//   1.5: "Poor",
//   2: "Poor+",
//   2.5: "Ok",
//   3: "Ok+",
//   3.5: "Good",
//   4: "Good+",
//   4.5: "Excellent",
//   5: "Excellent+",
// };

// function getLabelText(value: number) {
//   return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
// }

// const RatingCard: React.FC<RatingCardProps> = ({ rating }) => {
//   const [value, setValue] = React.useState<number | null>(2);
//   const [hover, setHover] = React.useState(-1);

//   return (
//     <>
//       <h1>Add Rating</h1>
//       <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
//         <Rating
//           name="hover-feedback"
//           value={value}
//           precision={0.5}
//           getLabelText={getLabelText}
//           onChange={(event, newValue) => {
//             setValue(newValue);
//           }}
//           onChangeActive={(event, newHover) => {
//             setHover(newHover);
//           }}
//           emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//         />
//         {value !== null && (
//           <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
//         )}
//       </Box>
//       <div>
//         <label htmlFor="">Add Comment</label>
//       </div>
//       <div className="w-full">
//         <textarea name="" id=""></textarea>
//       </div>
//     </>
//   );
// };
// export default RatingCard;

// import * as React from "react";
// import Rating from "@mui/material/Rating";
// import Box from "@mui/material/Box";
// import StarIcon from "@mui/icons-material/Star";
// import { Rating as RatingModel } from "../../models/Rating";
// import { getRatingsByBookId } from "../../providers/ratingProvider"; // Function to fetch ratings

// // Define the props for the RatingCard component
// type RatingCardProps = {
//   bookId: string;
//   //   rating: RatingModel;
// };

// // Labels for each rating value
// const ratingLabels: { [index: string]: string } = {
//   0.5: "Useless",
//   1: "Useless+",
//   1.5: "Poor",
//   2: "Poor+",
//   2.5: "Ok",
//   3: "Ok+",
//   3.5: "Good",
//   4: "Good+",
//   4.5: "Excellent",
//   5: "Excellent+",
// };

// // Helper function to generate label text for the rating
// function getLabelText(value: number): string {
//   return `${value} Star${value !== 1 ? "s" : ""}, ${ratingLabels[value]}`;
// }

// const RatingCard: React.FC<RatingCardProps> = ({ bookId }) => {
//   const [ratings, setRatings] = React.useState<RatingModel[]>([]);
//   const [loading, setLoading] = React.useState<boolean>(true);
//   const [error, setError] = React.useState<string | null>(null);

//   // State for the selected rating value
//   const [value, setValue] = React.useState<number | null>(2);

//   // State for the hovered rating value
//   const [hover, setHover] = React.useState<number>(-1);

//   // Fetch ratings for the book
//   React.useEffect(() => {
//     const fetchRatings = async () => {
//       try {
//         const ratingsData = await getRatingsByBookId(bookId);
//         setRatings(ratingsData);
//       } catch (err) {
//         setError("Failed to fetch ratings.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRatings();
//   }, [bookId]);

//   if (loading) {
//     return <div>Loading ratings...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <div className="space-y-4">
//       {/* Heading */}
//       <h1 className="text-xl font-bold">Add Rating</h1>

//       {/* Rating Component */}
//       <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
//         <Rating
//           name="hover-feedback"
//           value={value}
//           precision={0.5}
//           getLabelText={getLabelText}
//           onChange={(event, newValue) => {
//             setValue(newValue);
//           }}
//           onChangeActive={(event, newHover) => {
//             setHover(newHover);
//           }}
//           emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//         />
//         {/* Display the label for the current or hovered rating */}
//         {value !== null && (
//           <Box sx={{ ml: 2 }}>{ratingLabels[hover !== -1 ? hover : value]}</Box>
//         )}
//       </Box>

//       <div className="mt-4">
//         <h3 className="font-medium">Ratings:</h3>
//         {ratings.length === 0 ? (
//           <p className="text-gray-500">No ratings yet.</p>
//         ) : (
//           <ul className="space-y-2">
//             {ratings.map((rating: RatingModel) => (
//               <li key={rating.id} className="text-sm text-gray-700">
//                 <strong>{rating.stars} stars</strong> -{" "}
//                 {rating.comment || "No comment"}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Comment Input */}
//       <div className="space-y-2">
//         <label htmlFor="comment" className="block text-sm font-medium">
//           Add Comment
//         </label>
//         <textarea
//           id="comment"
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows={4}
//           placeholder="Write your comment here..."
//         />
//       </div>
//     </div>
//   );
// };

// export default RatingCard;

import React, { useEffect, useState } from "react";
import { getRatingsByBookId } from "../../providers/ratingProvider"; // Function to fetch ratings
import { Rating } from "../../models/Rating"; // Rating model

type RatingCardProps = {
  bookId: string; // The bookId is passed as a prop
};

const RatingCard: React.FC<RatingCardProps> = ({ bookId }) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch ratings for the book
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsData = await getRatingsByBookId(bookId); // Use the bookId to fetch ratings
        setRatings(ratingsData);
      } catch (err) {
        setError("Failed to fetch ratings.");
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [bookId]); // Re-run the effect when bookId changes

  if (loading) {
    return <div>Loading ratings...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mt-4">
      <h3 className="font-medium">Ratings:</h3>
      {ratings.length === 0 ? (
        <p className="text-gray-500">No ratings yet.</p>
      ) : (
        <ul className="space-y-2">
          {ratings.map((rating) => (
            <li key={rating.id} className="text-sm text-gray-700">
              <strong>{rating.stars} stars</strong> -{" "}
              {rating.comment || "No comment"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RatingCard;
