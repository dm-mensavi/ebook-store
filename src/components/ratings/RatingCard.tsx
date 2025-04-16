import React, { useEffect, useState } from "react";
import {
  getRatingsByBookId,
  createRating,
} from "../../providers/ratingProvider"; // Import createRating
import { Rating as RatingModel } from "../../models/Rating"; // Rating model
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify"; // For toast notifications
import Ratings from "../ui/Ratings";

type RatingCardProps = {
  bookId: string; // The bookId is passed as a prop
  averageRating?: number;
};

const RatingCard: React.FC<RatingCardProps> = ({ bookId, averageRating }) => {
  const [ratings, setRatings] = useState<RatingModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Sorting state
  const [submitting, setSubmitting] = useState(false);

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
  // const handleSubmitRating = async () => {
  //   if (userRating === null) {
  //     //   alert("Please select a rating before submitting.");
  //     toast.error("Please select a rating before submitting.");
  //     return;
  //   }

  //   try {
  //     // Call the createRating function
  //     const newRating = await createRating({
  //       stars: userRating,
  //       comment: userComment,
  //       bookId: bookId, // Pass the bookId from props
  //     });

  //     // Add the new rating to the list
  //     setRatings((prevRatings) => [...prevRatings, newRating]);

  //     // Reset the form
  //     setUserRating(null);
  //     setUserComment("");
  //     toast.success("Rating submitted successfully!");
  //   } catch (err) {
  //     console.error("Failed to submit rating:", err);
  //     toast.error("Failed to submit rating.");
  //   }
  // };

  const handleSubmitRating = async () => {
    if (userRating === null) {
      toast.error("Please select a rating before submitting.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        stars: userRating,
        bookId,
        ...(userComment.trim() && { comment: userComment.trim() }),
      };

      console.log("Submitting payload:", payload);

      await createRating(payload);

      toast.success("Rating submitted successfully!");

      const updatedRatings = await getRatingsByBookId(bookId);
      setRatings(updatedRatings);

      setUserRating(null);
      setUserComment("");
    } catch (err: any) {
      console.error("Failed to submit rating:", err?.response?.data || err);
      toast.error(
        err?.response?.data?.message?.[0] ||
          err?.response?.data?.message ||
          "Failed to submit rating."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading ratings...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const calculatedAverageRating =
    ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
      : 0;

  return (
    <>
      <div className="mt-4">
        {/* here */}
        <h3 className="font-bold text-4xl text-center">Reviews</h3>

        <div className="flex items-center mt-2 flex-col">
          <div className="ml-2 text-gray-600 font-black text-3xl">
            ({calculatedAverageRating.toFixed(1)})
          </div>
          <div className="flex items-center ">
            <Ratings rating={calculatedAverageRating} size="large" />
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
            placeholder="Write your comment here... (optional)"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitRating}
          disabled={submitting}
          className={`mt-2 px-4 py-2 ${
            submitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-md`}
        >
          {submitting ? "Submitting..." : "Submit Rating"}
        </button>
      </div>
    </>
  );
};

export default RatingCard;
