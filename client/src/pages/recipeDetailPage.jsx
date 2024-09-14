import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Clock,
  ChefHat,
  BookOpen,
  Share2,
  Facebook,
  Linkedin,
  Star,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";
import axios from "axios";
import FavoriteButton from "../components/favoriteButton";
import CommentsSection from "../components/commentsSection";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import { RecipeTutorial } from "../components/recipeTutorial/recipeTutorial";
import { Context } from "../components/contextProvider";
const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDish, setIsDish] = useState(false);

  const [showShareIcons, setShowShareIcons] = useState(false);
  const navigate = useNavigate();

  const currentUrl = `https://8a25-194-165-140-141.ngrok-free.app`;

  const currentUser = { id: 1, name: "Current User" };
  const isChef = true;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const storedRecipeId = localStorage.getItem("selectedRecipeId");
        const id = recipeId || storedRecipeId;

        if (!id) {
          throw new Error("No recipe ID found");
        }

        const response = await axios.get(
          `http://localhost:3000/api/recipes/${id}`
        );
        setRecipe(response.data);
        setIsDish(response.data.isDish);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("selectedRecipeId");
      localStorage.removeItem("isDish");
    };
  }, []);

  const handleAddToCart = () => {
    // Placeholder for add to cart logic
    alert("Added to cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-2xl font-semibold text-[#c98d83]">Loading...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className="text-2xl font-semibold text-red-500 mb-4">
          {error || "Recipe not found"}
        </p>
        <button
          onClick={() => navigate("/RecipeDishList")}
          className="bg-[#c98d83] text-white py-2 px-4 rounded-full hover:bg-[#b67c73] transition-colors duration-300"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  const shareUrl = window.location.href;

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <Star
            key={`full-${index}`}
            size={20}
            className="text-[#c98d83] mr-1"
          />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <Star
            key={`empty-${index}`}
            size={20}
            className="text-gray-300 mr-1"
          />
        ))}
      </div>
    );
  };

  // -----------------
  const addToCart = (item) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = currentCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
  };
  // ----------------

  return (
    <div className="font-serif">
      <div className="min-h-screen bg-[#fbf6f4] py-12 px-4 sm:px-6 lg:px-8 font-serif">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="popup-details bg-white rounded-2xl shadow-xl overflow-hidden relative">
            <div className="relative font-serif">
              <img
                src={recipe.overviewPicture || "/placeholder-image.jpg"}
                alt={recipe.dishName}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>

              <div className="absolute top-4 right-4 flex space-x-2">
                <FavoriteButton
                  recipeId={recipe._id}
                  initialIsFavorite={false}
                />
                <div className="relative">
                  <button
                    className="bg-[#c98d83] text-white p-2 rounded-full hover:bg-[#b67c73] transition-colors duration-300"
                    onClick={() => setShowShareIcons(!showShareIcons)}
                  >
                    <Share2 size={24} />
                  </button>
                  {showShareIcons && (
                    <div className="absolute top-12 right-0 flex flex-col space-y-2">
                      <WhatsappShareButton
                        url={currentUrl}
                        quote={`"Check out this ${recipe.dishName} recipe!"`}
                      >
                        <div className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300">
                          <MessageCircle size={24} />
                        </div>
                      </WhatsappShareButton>
                      <FacebookShareButton
                        url={currentUrl}
                        quote={`"Check out this ${recipe.dishName} recipe!"`}
                      >
                        <div className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
                          <Facebook size={24} />
                        </div>
                      </FacebookShareButton>
                      <LinkedinShareButton
                        url={currentUrl}
                        title={`Check out this ${recipe.dishName} recipe!`}
                      >
                        <div className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition-colors duration-300">
                          <Linkedin size={24} />
                        </div>
                      </LinkedinShareButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-8 -mt-24 relative font-serif">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-[#c98d83] mb-2">
                      {recipe.dishName}
                    </h1>
                    {recipe.recipeAuthor && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <ChefHat size={20} className="mr-2 text-[#c98d83]" />
                        <span className="font-medium">
                          {recipe.recipeAuthor.name}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-600 mb-2">
                      <Clock size={20} className="mr-2 text-[#c98d83]" />
                      <span>{recipe.duration || "N/A"}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 font-medium">Rating:</span>
                      <StarRating rating={recipe.dishRatingAvg || 0} />
                      <span className="ml-2 text-gray-600">
                        ({(recipe.dishRatingAvg || 0).toFixed(1)})
                      </span>
                    </div>
                  </div>
                  {isDish && (
                    <div className="mt-4 sm:mt-0">
                      <p className="text-2xl font-bold text-[#c98d83] mb-2">
                        ${(recipe.price || 0).toFixed(2)}
                      </p>
                      {recipe.recipeAuthor && (
                        <>
                          <p className="text-gray-600 font-medium">
                            {recipe.recipeAuthor.businessName}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {recipe.recipeAuthor.businessAddress}
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {recipe.recipeOverview || recipe.dishDescription}
                </p>
                <div className="flex items-center justify-between mb-6">

                  <RecipeTutorial recipe={recipe} />
                  {isDish && (
                    <button
                      onClick={() => addToCart(recipe)}
                      className="inline-flex items-center bg-[#c98d83] text-white py-2 px-4 rounded-full hover:bg-[#b67c73] transition-colors duration-300"
                    >
                      <ShoppingCart size={20} className="mr-2 font-serif" />
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <CommentsSection
            recipeId={recipe._id}
            currentUser={currentUser}
            isChef={isChef}
          />
          <div className="mt-8 text-center font-serif">
            <Link
              to="/RecipeDishList"
              className="inline-block bg-[#c98d83] text-white py-3 px-6 rounded-full hover:bg-[#b67c73] transition-colors duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
