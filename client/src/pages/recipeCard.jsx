// import React from "react";
// import { Clock, DollarSign } from "lucide-react";

// const RecipeDishCard = ({ item }) => {
//   const isRecipe = !item.price; // Assuming if there's no price, it's a recipe

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full h-[400px] relative">
//       <img
//         src={isRecipe ? item.overviewPicture : item.dishPictures?.[0]?.URL}
//         alt={item.dishName || "Recipe/Dish"}
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-4">
//         <div className="flex justify-between items-start mb-2">
//           <h2 className="text-xl font-semibold text-[#c98d83]">
//             {item.dishName || "Untitled"}
//           </h2>
//           <span className="text-sm font-medium text-white bg-[#c98d83] px-2 py-1 rounded-full">
//             {isRecipe ? "Recipe" : "Dish"}
//           </span>
//         </div>
//         <p className="text-gray-600 mb-4 h-16 overflow-hidden">
//           {isRecipe ? item.recipieOverview : item.dishDescription}
//         </p>
//         <div className="flex justify-between items-center">
//           <span className="text-sm font-medium text-gray-500">
//             {isRecipe ? item.dish?.type : item.category}
//           </span>
//           {isRecipe ? (
//             <div className="flex items-center text-[#c98d83]">
//               <Clock size={16} className="mr-1" />
//               <span className="text-xs">{item.duration}</span>
//             </div>
//           ) : (
//             <div className="flex items-center text-[#c98d83]">
//               <DollarSign size={16} className="mr-1" />
//               <span className="text-xs">{item.price?.toFixed(2)}</span>
//             </div>
//           )}
//         </div>
//         <div className="mt-4">
//           {isRecipe ? (
//             <button className="w-full bg-[#c98d83] text-white py-2 rounded-full hover:bg-[#b67c73] transition-colors duration-300">
//               Recipe
//             </button>
//           ) : (
//             <>
//               <button className="w-full bg-[#c98d83] text-white py-2 rounded-full hover:bg-[#b67c73] transition-colors duration-300 mb-2">
//                 Recipe
//               </button>
//               <button className="w-full bg-[#c98d83] text-white py-2 rounded-full hover:bg-[#b67c73] transition-colors duration-300">
//                 Dish
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeDishCard;
