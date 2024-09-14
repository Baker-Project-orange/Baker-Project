import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000"; // Update with your server URL

const Favourit = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      if (!userId) {
        setError("User ID not found. Please log in again.");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/users/${userId}`);
        setRecipes(response.data.favoriteRecipes || []);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
        setError("Failed to load favorite recipes");
      }
    };

    fetchFavoriteRecipes();
  }, [userId]);

  return (
    <div className="container mx-auto p-6 bg-[#f0d8d3] min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#8b4513]">
        Favorite Recipes
      </h1>
      {error && (
        <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>
      )}
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-[#fefaf1]"
            >
              <h2 className="text-2xl font-bold text-[#8b4513] mb-4">
                {recipe.dishName}
              </h2>
              {recipe.overviewPicture && (
                <img
                  src={recipe.overviewPicture}
                  alt={recipe.dishName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {recipe.recipeOverview}
              </p>
              <div className="flex justify-between text-sm text-gray-500 font-semibold">
                <span>⏱ Duration: {recipe.duration}</span>
                <span>📂 Category: {recipe.category}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl mt-8">
          No favorite recipes found.
        </p>
      )}
    </div>
  );
};

export default Favourit;
