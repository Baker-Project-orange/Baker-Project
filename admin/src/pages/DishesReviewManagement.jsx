import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';

const DishesReviewManagement = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/dishes/getDishes');
      if (Array.isArray(response.data)) {
        setDishes(response.data);
      } else {
        throw new Error('Data is not an array');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (dish) => {
    try {
      await axios.put(`http://localhost:3000/api/dishes/dishes/approve/${dish._id}`, {
        isApproved: !dish.isApproved,
      });
      fetchDishes();
    } catch (error) {
      setError('Failed to approve/unapprove dish');
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
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-black mb-6">Dishes Review Management</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#b67c73]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Recipe</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Pictures</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dishes.length > 0 ? (
                  dishes.map((dish) => (
                    <tr key={dish._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{dish.dishDescription || 'No description'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${dish.price?.toFixed(2) || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{dish.dishRatingAvg?.toFixed(1) || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{dish.category || 'Uncategorized'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {dish.dishPictures && dish.dishPictures.length > 0 ? (
                          <button
                            onClick={() => setSelectedImage(dish.dishPictures[0].URL)}
                            className="text-[#c98d83] hover:text-[#b67c73] transition-colors duration-200"
                          >
                            <ImageIcon className="w-5 h-5 inline-block mr-1" />
                            View
                          </button>
                        ) : (
                          'No pictures'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleApprove(dish)}
                          className={`${
                            dish.isApproved ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'
                          } transition-colors duration-200`}
                        >
                          {dish.isApproved ? (
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
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No dishes available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl max-h-3xl">
            <img src={selectedImage} alt="Dish" className="max-w-full max-h-full object-contain" />
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 bg-[#c98d83] hover:bg-[#b67c73] text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DishesReviewManagement;
