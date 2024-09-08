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

  const handleApprove = async (recipe) => {
    try {
      await axios.put(`http://localhost:3000/api/recipes/approve/${recipe._id}`, {
        isApproved: !recipe.isApproved,
      });
      fetchRecipes();
    } catch (error) {
      setError('Failed to approve/unapprove recipe');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#c98d83]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
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
    <div className="space-y-6 p-6 bg-[#ffffff] min-h-screen">
      <h2 className="text-3xl font-bold text-black">Recipes Management</h2>
      <div className="bg-[#ffffff] p-6 rounded-lg shadow-lg overflow-x-auto">
        <h3 className="font-semibold text-xl mb-4 text-white">Recipes</h3>
        <table className="min-w-full divide-y divide-white/20">
          <thead className="bg-[#ffffff]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Dish Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Overview Picture</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/20">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <tr key={recipe._id} className="hover:bg-[#c98d83] transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-black">{recipe.dishName || 'Unknown Recipe'}</td>
                  <td className="px-6 py-4 text-black">{recipe.dishDescription || 'No description'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{recipe.difficultyAvg?.toFixed(1) || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{recipe.difficultyRating[0]?.ratingNumber || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{recipe.duration || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{recipe.category || 'Uncategorized'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {recipe.overviewPicture ? (
                      <button
                        onClick={() => setSelectedImage(recipe.overviewPicture)}
                        className="text-black hover:text-rose-200 transition-colors duration-150"
                      >
                        <ImageIcon className="w-5 h-5 inline-block mr-1" />
                        View
                      </button>
                    ) : (
                      <span className="text-black">No picture</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleApprove(recipe)}
                      className={`text-black hover:text-rose-200 transition-colors duration-150 ${
                        recipe.isApproved ? "bg-red-500" : "bg-green-500"
                      } px-3 py-1 rounded-full`}
                    >
                      {recipe.isApproved ? (
                        <>
                          <XCircle className="w-5 h-5 inline-block mr-1" />
                          Unapprove
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 inline-block mr-1" />
                          Approve
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-white">
                  No recipes available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#b67c73] p-4 rounded-lg max-w-3xl max-h-3xl">
            <img src={selectedImage} alt="Recipe" className="w-96 h-96 object-contain" />
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 bg-[#c98d83] hover:bg-[#b67c73] text-white font-bold py-2 px-4 rounded transition-colors duration-150"
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
