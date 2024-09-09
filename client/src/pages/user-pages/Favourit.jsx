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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Favorite Recipes</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {recipes.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="border border-gray-200 p-6 rounded-lg shadow-lg max-w-sm bg-white transform transition-transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">{recipe.dishName}</h2>
              {recipe.overviewPicture && (
                <img
                  src={recipe.overviewPicture}
                  alt={recipe.dishName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-gray-600 mb-2">{recipe.recipeOverview}</p>
              <p className="text-sm text-gray-500 font-bold mb-1">
                Duration: {recipe.duration}
              </p>
              <p className="text-sm text-gray-500 font-bold">
                Category: {recipe.category}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No favorite recipes found.</p>
      )}
    </div>
  );
};

export default Favourit;
