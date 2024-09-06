import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';

const dishesReviewManagement = () => {
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

  // const handleApprove = async (dishId) => {
  //   try {
  //     await axios.post(`http://localhost:3000/api/dishes/getDishes/approve/${dishId}`);
  //     fetchDishes();
  //   } catch (error) {
  //     setError('Failed to approve dish');
  //   }
  // };
  // dishesReviewManagement.js
// dishesReviewManagement.js
const handleApprove = async (dish) => {
  try {
    await axios.put(`http://localhost:3000/api/dishes/dishes/approve/${dish}`, {
      isApproved: !dish.isApproved,
    });
    fetchDishes();
  } catch (error) {
    setError('Failed to approve/unapprove dish');
  }
};

  // const handleDelete = async (dishId) => {
  //   try {
  //     await axios.delete(`http://localhost:3001/api/dishes/${dishId}`);
  //     fetchDishes();
  //   } catch (error) {
  //     setError('Failed to delete dish');
  //   }
  // };

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
      <h2 className="text-3xl font-bold text-gray-800">dishes Review Management</h2>
      <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
        <h3 className="font-semibold text-xl mb-4 text-gray-700">Pending Reviews</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipe</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pictures</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          // dishesReviewManagement.js
<tbody className="bg-white divide-y divide-gray-200">
  {dishes.length > 0 ? (
    dishes.map((dish) => (
      <tr key={dish._id}>
        <td className="px-6 py-4">{dish.dishDescription || 'No description'}</td>
        <td className="px-6 py-4 whitespace-nowrap">${dish.price?.toFixed(2) || 'N/A'}</td>
        <td className="px-6 py-4 whitespace-nowrap">{dish.dishRatingAvg?.toFixed(1) || 'N/A'}</td>
        <td className="px-6 py-4 whitespace-nowrap">{dish.category || 'Uncategorized'}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {dish.dishPictures && dish.dishPictures.length > 0 ? (
            <button
              onClick={() => setSelectedImage(dish.dishPictures[0].URL)}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
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
            onClick={() => handleApprove(dish._id)}
            className="text-green-600 hover:text-green-800 mr-2 transition-colors duration-200"
          >
            <CheckCircle className="w-5 h-5 inline-block mr-1" />
            Approve
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
        No dishes available
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl max-h-3xl">
            <img src={selectedImage} alt="Dish" className="max-w-full max-h-full object-contain" />
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

export default dishesReviewManagement;

































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const RecipeReviewManagement = () => {
//   const [dishes, setDishes] = useState([]); // Initialize as an empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDishes = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/dishes/getDishes');
//         // Ensure the response data is an array
//         if (Array.isArray(response.data)) {
//           setDishes(response.data);
//         } else {
//           throw new Error('Data is not an array');
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDishes();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">Recipe Review Management</h2>
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h3 className="font-semibold text-lg mb-4">Pending Reviews</h3>
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 User
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Recipe
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Rating
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {dishes.length > 0 ? (
//               dishes.map(dish => (
//                 <tr key={dish._id}>
//                   <td className="px-6 py-4 whitespace-nowrap">User Name</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{dish.recipieID.dishName}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{dish.dishRatingAvg || 'N/A'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <button className="text-green-600 hover:text-green-900 mr-2">
//                       Approve
//                     </button>
//                     <button className="text-red-600 hover:text-red-900">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="px-6 py-4 text-center">No dishes available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RecipeReviewManagement;
