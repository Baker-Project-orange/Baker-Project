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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Recipes</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="list-disc pl-5 space-y-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li
              key={recipe._id}
              className="border p-4 rounded shadow-sm max-w-sm mx-auto"
            >
              {" "}
              {/* تعديل العرض هنا */}
              <h2 className="text-xl font-semibold mb-2">{recipe.dishName}</h2>
              {recipe.overviewPicture && (
                <img
                  src={recipe.overviewPicture}
                  alt={recipe.dishName}
                  className="w-full h-32 object-cover rounded mb-2" // يمكن تعديل ارتفاع الصورة إذا لزم الأمر
                />
              )}
              <p className="text-gray-700 mb-2">{recipe.recipeOverview}</p>
              <p className="text-sm text-gray-600">
                Duration: {recipe.duration}
              </p>
              <p className="text-sm text-gray-600">
                Category: {recipe.category}
              </p>
            </li>
          ))
        ) : (
          <p>No favorite recipes found.</p>
        )}
      </ul>
    </div>
  );
};

export default Favourit;
