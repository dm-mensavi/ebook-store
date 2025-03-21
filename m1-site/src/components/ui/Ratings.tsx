import { Rating } from "@mui/material";
import { StarIcon } from "lucide-react";
import React from "react";

type RatingsProps = {
  rating: number | undefined;
  size?: string;
};

const Ratings: React.FC<RatingsProps> = ({ rating }) => {
  return (
    <div className="mt-2">
      <Rating
        name="read-only"
        value={rating}
        precision={0.5}
        readOnly
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </div>
  );
};

export default Ratings;
