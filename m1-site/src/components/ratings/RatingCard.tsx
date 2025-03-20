// // import * as React from "react";
// // import Rating from "@mui/material/Rating";
// // import Box from "@mui/material/Box";
// // import StarIcon from "@mui/icons-material/Star";
// // import { Rating as rating } from "../../models/Rating";

// // type RatingCardProps = {
// //    rating: rating;
// // };
// // const labels: { [index: string]: string } = {
// //   0.5: "Useless",
// //   1: "Useless+",
// //   1.5: "Poor",
// //   2: "Poor+",
// //   2.5: "Ok",
// //   3: "Ok+",
// //   3.5: "Good",
// //   4: "Good+",
// //   4.5: "Excellent",
// //   5: "Excellent+",
// // };

// // function getLabelText(value: number) {
// //   return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
// // }

// // const RatingCard: React.FC<RatingCardProps> = ({ rating }) => {
// //   const [value, setValue] = React.useState<number | null>(2);
// //   const [hover, setHover] = React.useState(-1);

// //   return (
// //     <>
// //       <h1>Add Rating</h1>
// //       <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
// //         <Rating
// //           name="hover-feedback"
// //           value={value}
// //           precision={0.5}
// //           getLabelText={getLabelText}
// //           onChange={(event, newValue) => {
// //             setValue(newValue);
// //           }}
// //           onChangeActive={(event, newHover) => {
// //             setHover(newHover);
// //           }}
// //           emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
// //         />
// //         {value !== null && (
// //           <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
// //         )}
// //       </Box>
// //       <div>
// //         <label htmlFor="">Add Comment</label>
// //       </div>
// //       <div className="w-full">
// //         <textarea name="" id=""></textarea>
// //       </div>
// //     </>
// //   );
// // };
// // export default RatingCard;

// // import * as React from "react";
// // import Rating from "@mui/material/Rating";
// // import Box from "@mui/material/Box";
// // import StarIcon from "@mui/icons-material/Star";
// // import { Rating as RatingModel } from "../../models/Rating";
// // import { getRatingsByBookId } from "../../providers/ratingProvider"; // Function to fetch ratings

// // // Define the props for the RatingCard component
// // type RatingCardProps = {
// //   bookId: string;
// //   //   rating: RatingModel;
// // };

// // // Labels for each rating value
// // const ratingLabels: { [index: string]: string } = {
// //   0.5: "Useless",
// //   1: "Useless+",
// //   1.5: "Poor",
// //   2: "Poor+",
// //   2.5: "Ok",
// //   3: "Ok+",
// //   3.5: "Good",
// //   4: "Good+",
// //   4.5: "Excellent",
// //   5: "Excellent+",
// // };

// // // Helper function to generate label text for the rating
// // function getLabelText(value: number): string {
// //   return `${value} Star${value !== 1 ? "s" : ""}, ${ratingLabels[value]}`;
// // }

// // const RatingCard: React.FC<RatingCardProps> = ({ bookId }) => {
// //   const [ratings, setRatings] = React.useState<RatingModel[]>([]);
// //   const [loading, setLoading] = React.useState<boolean>(true);
// //   const [error, setError] = React.useState<string | null>(null);

// //   // State for the selected rating value
// //   const [value, setValue] = React.useState<number | null>(2);

// //   // State for the hovered rating value
// //   const [hover, setHover] = React.useState<number>(-1);

// //   // Fetch ratings for the book
// //   React.useEffect(() => {
// //     const fetchRatings = async () => {
// //       try {
// //         const ratingsData = await getRatingsByBookId(bookId);
// //         setRatings(ratingsData);
// //       } catch (err) {
// //         setError("Failed to fetch ratings.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchRatings();
// //   }, [bookId]);

// //   if (loading) {
// //     return <div>Loading ratings...</div>;
// //   }

// //   if (error) {
// //     return <div className="text-red-500">{error}</div>;
// //   }

// //   return (
// //     <div className="space-y-4">
// //       {/* Heading */}
// //       <h1 className="text-xl font-bold">Add Rating</h1>

// //       {/* Rating Component */}
// //       <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
// //         <Rating
// //           name="hover-feedback"
// //           value={value}
// //           precision={0.5}
// //           getLabelText={getLabelText}
// //           onChange={(event, newValue) => {
// //             setValue(newValue);
// //           }}
// //           onChangeActive={(event, newHover) => {
// //             setHover(newHover);
// //           }}
// //           emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
// //         />
// //         {/* Display the label for the current or hovered rating */}
// //         {value !== null && (
// //           <Box sx={{ ml: 2 }}>{ratingLabels[hover !== -1 ? hover : value]}</Box>
// //         )}
// //       </Box>

// //       <div className="mt-4">
// //         <h3 className="font-medium">Ratings:</h3>
// //         {ratings.length === 0 ? (
// //           <p className="text-gray-500">No ratings yet.</p>
// //         ) : (
// //           <ul className="space-y-2">
// //             {ratings.map((rating: RatingModel) => (
// //               <li key={rating.id} className="text-sm text-gray-700">
// //                 <strong>{rating.stars} stars</strong> -{" "}
// //                 {rating.comment || "No comment"}
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>

// //       {/* Comment Input */}
// //       <div className="space-y-2">
// //         <label htmlFor="comment" className="block text-sm font-medium">
// //           Add Comment
// //         </label>
// //         <textarea
// //           id="comment"
// //           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           rows={4}
// //           placeholder="Write your comment here..."
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default RatingCard;

// import React, { useEffect, useState } from "react";
// import { getRatingsByBookId } from "../../providers/ratingProvider"; // Function to fetch ratings
// import { Rating } from "../../models/Rating"; // Rating model

// type RatingCardProps = {
//   bookId: string; // The bookId is passed as a prop
// };

// const RatingCard: React.FC<RatingCardProps> = ({ bookId }) => {
//   const [ratings, setRatings] = useState<Rating[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

//   // Fetch ratings for the book
//   useEffect(() => {
//     const fetchRatings = async () => {
//       try {
//         const ratingsData = await getRatingsByBookId(bookId); // Use the bookId to fetch ratings
//         setRatings(ratingsData);
//       } catch (err) {
//         setError("Failed to fetch ratings.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRatings();
//   }, [bookId]); // Re-run the effect when bookId changes

//   const sortedRatings = [...ratings].sort((a, b) => {
//     const dateA = new Date(a.createdAt).getTime();
//     const dateB = new Date(b.createdAt).getTime();
//     return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//   });

//   if (loading) {
//     return <div>Loading ratings...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <>
//       <div className="mt-4">
//         <h3 className="font-medium">Ratings:</h3>
//         {ratings.length === 0 ? (
//           <p className="text-gray-500">No ratings yet.</p>
//         ) : (
//           <ul className="space-y-2">
//             {ratings.map((rating) => (
//               <li key={rating.id} className="text-sm text-gray-700">
//                 <strong>{rating.stars} stars</strong> -{" "}
//                 {rating.comment || "No comment"}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <div className="mt-4">
//         {/* Label */}
//         <label
//           htmlFor="comment"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Add Comment
//         </label>

//         {/* Textarea */}
//         <div className="mt-1">
//           <textarea
//             id="comment"
//             name="comment"
//             rows={4} // Adjust the number of rows as needed
//             className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Write your comment here..."
//           ></textarea>
//         </div>
//         <div>
//           <button
//             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             onClick={() => alert("Comment added!")}
//           >
//             Add Comment
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RatingCard;

import React, { useEffect, useState } from "react";
import {
  getRatingsByBookId,
  createRating,
} from "../../providers/ratingProvider"; // Import createRating
import { Rating as RatingModel } from "../../models/Rating"; // Rating model
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify"; // For toast notifications

type RatingCardProps = {
  bookId: string; // The bookId is passed as a prop
  averageRating: number;
};

const RatingCard: React.FC<RatingCardProps> = ({ bookId, averageRating }) => {
  const [ratings, setRatings] = useState<RatingModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Sorting state

  // User rating state
  const [userRating, setUserRating] = useState<number | null>(null); // User's selected rating
  const [userComment, setUserComment] = useState<string>(""); // User's comment

  // Fetch ratings for the book
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsData = await getRatingsByBookId(bookId); // Use the bookId to fetch ratings
        setRatings(ratingsData);
      } catch (err) {
        setError("Failed to fetch ratings.");
        toast.error("Failed to fetch ratings.");
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [bookId]); // Re-run the effect when bookId changes

  // Sort ratings by creation date
  const sortedRatings = [...ratings].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Handle rating submission
  const handleSubmitRating = async () => {
    if (userRating === null) {
      //   alert("Please select a rating before submitting.");
      toast.error("Please select a rating before submitting.");
      return;
    }

    try {
      // Call the createRating function
      const newRating = await createRating({
        stars: userRating,
        comment: userComment,
        bookId: bookId, // Pass the bookId from props
      });

      // Add the new rating to the list
      setRatings((prevRatings) => [...prevRatings, newRating]);

      // Reset the form
      setUserRating(null);
      setUserComment("");
      toast.success("Rating submitted successfully!");
    } catch (err) {
      console.error("Failed to submit rating:", err);
      toast.error("Failed to submit rating.");
    }
  };

  if (loading) {
    return <div>Loading ratings...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="mt-4">
        {/* here */}
        <h3 className="font-bold text-4xl text-center">Reviews</h3>

        <div className="flex items-center mt-2 flex-col">
          <div className="ml-2 text-gray-600 font-black text-3xl">
            ({averageRating.toFixed(1)})
          </div>
          <div className="flex items-center ">
            <Rating
              name="average-rating"
              value={averageRating}
              precision={0.1} // Show decimal places for the average
              readOnly // Make the rating read-only
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              size="large" // Increase the size of the stars
            />
          </div>
        </div>

        {/* Sorting Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Sort by Date (Ascending)</option>
          <option value="desc">Sort by Date (Descending)</option>
        </select>

        {sortedRatings.length === 0 ? (
          <p className="text-gray-500">No ratings yet.</p>
        ) : (
          <ul className="space-y-2">
            {sortedRatings.map((rating) => (
              <li key={rating.id} className="text-sm text-gray-700">
                {/* <strong>{rating.stars} stars</strong> -{" "} */}
                <div className="flex items-center ">
                  <Rating
                    name="average-rating"
                    value={rating.stars}
                    precision={0.5} // Show decimal places for the average
                    readOnly // Make the rating read-only
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                    size="small" // Increase the size of the stars
                  />
                </div>
                {rating.comment || "No comment"}
                <br />
                <span className="text-xs text-gray-500">
                  {new Date(rating.createdAt).toLocaleString()}
                </span>
                <hr className="text-red-900" />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Rating Section */}
      <div className="mt-4">
        <h3 className="font-medium">Add Your Rating:</h3>

        {/* MUI Rating Component */}
        <div className="mt-2">
          <Rating
            name="user-rating"
            value={userRating}
            precision={0.5} // Allow half-star ratings
            onChange={(event, newValue) => {
              setUserRating(newValue);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </div>

        {/* Comment Input */}
        <div className="mt-2">
          <textarea
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Write your comment here..."
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitRating}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Rating
        </button>
      </div>
    </>
  );
};

export default RatingCard;
