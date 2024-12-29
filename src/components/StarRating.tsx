import React from "react";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push("★"); // filled star
    } else {
      stars.push("☆"); // empty star
    }
  }

  return (
    <div className="flex items-center space-x-1">
      {stars.map((star, index) => (
        <span
          key={index}
          className={`text-2xl ${
            star === "★" ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          {star}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
