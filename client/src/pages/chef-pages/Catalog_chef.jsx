import React, { useState, useEffect } from "react";

import {
  Search,
  Filter,
  Clock,
  DollarSign,
  ChevronsRight,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useContext } from "react";
import { Context } from "../../components/contextProvider";
import useGetRecipes from "../../hooks/recipeHooks/getRecipeHook";
import { Link } from "react-router-dom";
import useGetDishes from "../../hooks/recipeHooks/getDishesHook";
import { Chip } from "@material-tailwind/react";
const Catalog_chef = () => {
  const recipies = useGetRecipes();
  const dishes = useGetDishes();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filteredItems, setFilteredItems] = useState(recipies);
  const [recipeID, setRecipeID] = useContext(Context).recipeID;
  useEffect(() => {
    const results = recipies.filter(
      (item) =>
        item.dishName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.isDeleted
    );
    setFilteredItems(results);
  }, [searchTerm, filterCategory, filterType, recipies]);

  return (
    <div className="min-h-screen bg-[#f8e5e1] rounded-lg overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#c98d83] mb-8">
          Recipe and Dish Catalog
        </h1>

        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="relative mb-4 md:mb-0 md:w-1/3">
            <input
              type="text"
              placeholder="Search recipes and dishes..."
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#c98d83]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {filteredItems == [] ? (
            <div className="flex w-96 items-center justify-center bg-black h-72">
              sdsdf
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={item.overviewPicture}
                  alt={item.dishName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col gap-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-[#c98d83]">
                      {item.dishName}
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4 h-12 overflow-hidden">
                    {item.recipeOverview}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      {item.category}
                    </span>
                    <div className="flex gap-5">
                      {item.isDish ? (
                        <>
                          <Chip className="text" value="Recipe" />
                          <Chip className="text" value="Dish" />
                        </>
                      ) : (
                        <Chip className="text" value="Recipe" />
                      )}
                    </div>
                  </div>

                  <Link className="hover:text-rose-200 transition duration-300">
                    <button
                      onClick={() => {
                        sessionStorage.setItem("tab", "management");
                        window.dispatchEvent(new Event("storage"));
                        sessionStorage.setItem("recipeID", item._id);
                        setRecipeID(item._id);
                      }}
                      className="bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300 flex items-center justify-center w-full"
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog_chef;
