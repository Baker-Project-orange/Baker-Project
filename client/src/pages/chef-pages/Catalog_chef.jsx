import React, { useState, useEffect } from "react";

import {
  Search,
  Filter,
  DollarSign,
  ChevronsRight,
  ChevronDown
} from "lucide-react";
import { useContext } from "react";
import { Context } from "../../components/contextProvider";
import useGetRecipes from "../../hooks/recipeHooks/getRecipeHook";
import useGetDishes from "../../hooks/recipeHooks/getDishesHook";
import { Link } from "react-router-dom";
import { Chip, Select, Option } from "@material-tailwind/react";

const Catalog_chef = () => {
  const [chefInfo, setChefInfo] = useState({
    name: "",
    email: "",
    buissnessName: "",
    buissnessLogo: "",
  });
  const dishes = useGetDishes();
  const recipes = useGetRecipes();
  const [, setRecipeID] = useContext(Context).recipeID;

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filteredItems, setFilteredItems] = useState([]);
  // const [recipeID, setRecipeID] = useContext(Context).recipeID;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const filteredRecipes = recipes.filter(
      (item) =>
        item.dishName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.isDeleted &&
        (filterCategory === "All" || item.category === filterCategory) &&
        (filterType === "All" || filterType === "Recipe")
    );

    const filteredDishes = dishes.filter(
      (item) =>
        item.recipieID?.dishName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.isDeleted &&
        (filterCategory === "All" || item.recipieID?.category === filterCategory) &&
        (filterType === "All" || filterType === "Dish")
    );

    setFilteredItems([...filteredRecipes, ...filteredDishes]);
  }, [searchTerm, filterCategory, filterType, recipes, dishes]);

  const categories = ["All", ...new Set([...recipes, ...dishes].map((item) => item.category || item.recipieID?.category).filter(Boolean))];

  const renderCard = (item) => {
    const isDish = "recipieID" in item;
    const itemCategory = isDish ? item.recipieID?.category : item.category;
    const itemName = isDish ? item.recipieID?.dishName : item.dishName;
    const itemDescription = isDish ? item.dishDescription : item.recipeOverview;
    const itemPicture = isDish ? item.recipieID?.overviewPicture : item.overviewPicture;
    const itemPrice = isDish ? item.price : item.price;

    return (
      <div
        key={item._id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="relative">
          <img
            src={itemPicture}
            alt={itemName}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Chip
              value={isDish ? "Dish" : "Recipe"}
              className="bg-[#c98d83] text-white"
            />
            <Chip
              value={itemCategory || "Unknown"}
              className="bg-white text-[#c98d83]"
            />
          </div>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-[#c98d83] truncate">
            {itemName || "Unnamed Item"}
          </h2>
          <p className="text-gray-600 h-12 overflow-hidden">
            {itemDescription || "No description available"}
          </p>
          {itemPrice !== undefined && (
            <div className="flex items-center text-gray-600">
              <DollarSign size={16} className="mr-1" />
              <span>{itemPrice.toFixed(2)}</span>
            </div>
          )}
          <Link
            onClick={() => {
              sessionStorage.setItem("tab", "management");
              window.dispatchEvent(new Event("storage"));
              sessionStorage.setItem("recipeID", isDish ? item.recipieID._id : item._id);
              setRecipeID(isDish ? item.recipieID._id : item._id);
            }}
            className="mt-auto bg-[#c98d83] text-white px-6 py-3 rounded-lg hover:bg-[#b17c73] transition-all duration-300 flex items-center justify-center text-lg font-semibold"
          >
            View Details
            <ChevronsRight size={24} className="ml-2" />
          </Link>
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen font-serif bg-[#fbf6f4] rounded-lg overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#c98d83] mb-12 animate-fade-in">
          Recipe and Dish Catalog
        </h1>

        {/* Search and filter section */}
        <div className="mb-12 rounded-xl shadow-md p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search input */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search recipes and dishes..."
                className="w-full pl-12 pr-4 py-3 border-2 border-[#c98d83] rounded-full focus:outline-none focus:ring-2 focus:ring-[#c98d83] transition-all duration-300 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-4 top-3 text-[#c98d83]"
                size={24}
              />
            </div>
            {/* Filter button (mobile) */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center lg:hidden bg-[#c98d83] text-white px-4 py-2 rounded-full hover:bg-[#b17c73] transition-all duration-300"
            >
              <Filter size={20} className="mr-2" />
              Filters
              <ChevronDown
                size={20}
                className={`ml-2 transform transition-transform duration-300 ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* Filter options */}
            <div
              className={`flex flex-col lg:flex-row gap-4 ${
                isFilterOpen ? "block" : "hidden lg:flex"
              }`}
            >
              <Select
                label="Category"
                value={filterCategory}
                onChange={(value) => setFilterCategory(value)}
                className="w-full lg:w-48"
              >
                {categories.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
              <Select
                label="Type"
                value={filterType}
                onChange={(value) => setFilterType(value)}
                className="w-full lg:w-48"
              >
                <Option value="All">All</Option>
                <Option value="Recipe">Recipe</Option>
                <Option value="Dish">Dish</Option>
              </Select>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length === 0 ? (
            <div className="col-span-full flex items-center justify-center bg-white rounded-lg shadow-md h-72">
              <p className="text-xl text-gray-500">No items found</p>
            </div>
          ) : (
            filteredItems.map((item) => renderCard(item))
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog_chef;