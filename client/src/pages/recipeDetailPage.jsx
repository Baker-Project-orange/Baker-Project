// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { Clock, ChefHat } from "lucide-react";
// import axios from "axios";

// const RecipeDetailPage = () => {
//   const { recipeId } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const storedRecipeId = localStorage.getItem("selectedRecipeId");
//         const id = recipeId || storedRecipeId;

//         if (!id) {
//           throw new Error("No recipe ID found");
//         }

//         const response = await axios.get(
//           `http://localhost:3000/api/recipes/${id}`
//         );
//         setRecipe(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, [recipeId]);

//   useEffect(() => {
//     // Clear the stored recipe ID after fetching
//     return () => localStorage.removeItem("selectedRecipeId");
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p className="text-2xl font-semibold text-[#c98d83]">Loading...</p>
//       </div>
//     );
//   }

//   if (error || !recipe) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//         <p className="text-2xl font-semibold text-red-500 mb-4">
//           {error || "Recipe not found"}
//         </p>
//         <button
//           onClick={() => navigate("/recipes")}
//           className="bg-[#c98d83] text-white py-2 px-4 rounded-full hover:bg-[#b67c73] transition-colors duration-300"
//         >
//           Back to Recipes
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="relative">
//             <img
//               src={recipe.overviewPicture || "/placeholder-image.jpg"}
//               alt={recipe.dishName}
//               className="w-full h-96 object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
//           </div>
//           <div className="p-8 -mt-24 relative">
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
//                 <div>
//                   <h1 className="text-4xl font-bold text-[#c98d83] mb-2">
//                     {recipe.dishName}
//                   </h1>
//                   {recipe.recipeAuthor && (
//                     <div className="flex items-center text-gray-600 mb-2">
//                       <ChefHat size={20} className="mr-2 text-[#c98d83]" />
//                       <span className="font-medium">
//                         {recipe.recipeAuthor.name}
//                       </span>
//                     </div>
//                   )}
//                   <div className="flex items-center text-gray-600">
//                     <Clock size={20} className="mr-2 text-[#c98d83]" />
//                     <span>{recipe.duration || "N/A"}</span>
//                   </div>
//                 </div>
//                 {recipe.recipeAuthor && (
//                   <div className="mt-4 sm:mt-0">
//                     <p className="text-gray-600 font-medium">
//                       {recipe.recipeAuthor.businessName}
//                     </p>
//                     <p className="text-gray-500 text-sm">
//                       {recipe.recipeAuthor.businessAddress}
//                     </p>
//                   </div>
//                 )}
//               </div>
//               <p className="text-gray-700 mb-6 leading-relaxed">
//                 {recipe.dishDescription}
//               </p>
//               <div className="mb-6">
//                 <h2 className="text-2xl font-semibold text-[#c98d83] mb-3">
//                   Ingredients
//                 </h2>
//                 <ul className="list-disc list-inside space-y-1">
//                   {recipe.ingredients.map((ingredient, index) => (
//                     <li key={index} className="text-gray-700">
//                       {ingredient.name}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div>
//                 <h2 className="text-2xl font-semibold text-[#c98d83] mb-3">
//                   Instructions
//                 </h2>
//                 <ol className="space-y-4">
//                   {recipe.steps.map((step, index) => (
//                     <li key={index} className="text-gray-700">
//                       <p className="font-medium mb-1">Step {index + 1}</p>
//                       <p>{step.stepDescription}</p>
//                       {step.note && (
//                         <p className="text-sm text-gray-500 mt-1">
//                           Note: {step.note}
//                         </p>
//                       )}
//                     </li>
//                   ))}
//                 </ol>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-8 text-center">
//           <Link
//             to="/recipes"
//             className="inline-block bg-[#c98d83] text-white py-3 px-6 rounded-full hover:bg-[#b67c73] transition-colors duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
//           >
//             Back to Recipes
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetailPage;


import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, ChefHat, BookOpen } from "lucide-react";
import axios from "axios";
import FavoriteButton from "../components/favoriteButton";
import CommentsSection from "../components/commentsSection";

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Placeholder for current user, replace with actual auth logic
  const currentUser = { id: 1, name: "Current User" };
  const isChef = true; // Placeholder, replace with actual logic

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
    return () => localStorage.removeItem("selectedRecipeId");
  }, []);

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
          onClick={() => navigate("/recipes")}
          className="bg-[#c98d83] text-white py-2 px-4 rounded-full hover:bg-[#b67c73] transition-colors duration-300"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <img
              src={recipe.overviewPicture || "/placeholder-image.jpg"}
              alt={recipe.dishName}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            <div className="absolute top-4 right-4">
              <FavoriteButton recipeId={recipe._id} initialIsFavorite={false} />
            </div>
          </div>
          <div className="p-8 -mt-24 relative">
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
                  <div className="flex items-center text-gray-600">
                    <Clock size={20} className="mr-2 text-[#c98d83]" />
                    <span>{recipe.duration || "N/A"}</span>
                  </div>
                </div>
                {recipe.recipeAuthor && (
                  <div className="mt-4 sm:mt-0">
                    <p className="text-gray-600 font-medium">
                      {recipe.recipeAuthor.businessName}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {recipe.recipeAuthor.businessAddress}
                    </p>
                  </div>
                )}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {recipe.dishDescription}
              </p>
              <Link
                to={`/recipe/${recipe._id}/instructions`}
                className="inline-flex items-center bg-[#c98d83] text-white py-2 px-4 rounded-full hover:bg-[#b67c73] transition-colors duration-300"
              >
                <BookOpen size={20} className="mr-2" />
                View Instructions
              </Link>
            </div>
          </div>
        </div>
        <CommentsSection
          recipeId={recipe._id}
          currentUser={currentUser}
          isChef={isChef}
        />
        <div className="mt-8 text-center">
          <Link
            to="/RecipeDishList"
            className="inline-block bg-[#c98d83] text-white py-3 px-6 rounded-full hover:bg-[#b67c73] transition-colors duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
