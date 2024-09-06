import React, { useState, useEffect } from "react";
import { X, Clock, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const RecipePopup = ({ recipeId, onClose }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipes/${recipeId}`
        );
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <p className="text-lg font-semibold text-[#c98d83]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden">
        <div className="relative">
          <img
            src={recipe.overviewPicture}
            alt={recipe.dishName}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="text-[#c98d83]" size={24} />
          </button>
        </div>
        <div className="p-8 -mt-20 relative">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold text-[#c98d83] mb-2">
                  {recipe.dishName}
                </h2>
                <div className="flex items-center text-gray-600 mb-2">
                  <ChefHat size={20} className="mr-2 text-[#c98d83]" />
                  <span className="font-medium">{recipe.recipeAuthor}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={20} className="mr-2 text-[#c98d83]" />
                  <span>{recipe.duration}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {recipe.dishDescription}
            </p>
            <Link
              to={`/recipe/${recipe._id}`}
              className="block w-full text-center bg-[#c98d83] text-white py-3 px-4 rounded-full hover:bg-[#b67c73] transition-colors duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              View Full Recipe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePopup;
