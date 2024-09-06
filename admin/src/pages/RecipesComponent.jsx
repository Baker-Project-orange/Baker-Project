import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';

const RecipesComponent = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/recipes/getrecipes');
      if (Array.isArray(response.data)) {
        setRecipes(response.data);
      } else {
        throw new Error('Data is not an array');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add additional functions to handle recipe-related actions (e.g., approve, delete)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800">Recipes Management</h2>
      <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
        <h3 className="font-semibold text-xl mb-4 text-gray-700">Recipes</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dish Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Overview Picture
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <tr key={recipe._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{recipe.dishName || 'Unknown Recipe'}</td>
                  <td className="px-6 py-4">{recipe.dishDescription || 'No description'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{recipe.difficultyAvg?.toFixed(1) || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{recipe.difficultyRating[0]?.ratingNumber || 'N/A'}</td>
                  <td className="px-6 py-4  whitespace-nowrap">{recipe.duration || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{recipe.category || 'Uncategorized'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {recipe.overviewPicture ? (
                      <button
                        onClick={() => setSelectedImage(recipe.overviewPicture)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        <ImageIcon className="w-5 h-5 inline-block mr-1" />
                        View
                      </button>
                    ) : (
                      'No picture'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Add recipe-related actions here, such as approve, delete, etc. */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  No recipes available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl max-h-3xl">
            <img src={selectedImage} alt="Recipe" className="max-w-full max-h-full object-contain" />
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesComponent;