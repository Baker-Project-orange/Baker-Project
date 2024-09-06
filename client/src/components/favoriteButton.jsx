import React, { useState } from "react";
import { Heart } from "lucide-react";

const FavoriteButton = ({ recipeId, initialIsFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const toggleFavorite = async () => {
    try {
      // Here you would make an API call to toggle the favorite status
      // For now, we'll just toggle the state
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-colors duration-300 ${
        isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
      }`}
    >
      <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
    </button>
  );
};

export default FavoriteButton;
