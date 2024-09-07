import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Filter, Clock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const RecipeDishList = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const observer = useRef();
  const navigate = useNavigate();

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          root: null,
          rootMargin: "100px",
          threshold: 1.0,
        }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  useEffect(() => {
    setItems([]);
    setPage(1);
  }, [filterCategory, filterType]);

  useEffect(() => {
    fetchItems();
  }, [page, filterCategory, filterType]);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/recipes/getrecipes?page=${page}&limit=6&category=${filterCategory}&type=${filterType}`
      );

      console.log("Fetched data:", response.data);

      const newItems = response.data || [];
      const hasNext = newItems.length === 6; // Assuming 6 items per page

      setItems((prevItems) => {
        if (page === 1) {
          return newItems;
        } else {
          return [...prevItems, ...newItems];
        }
      });

      setHasNextPage(hasNext);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setIsLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const dishName = item.dishName || "";
    return dishName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const categories = ["All", ...new Set(items.map((item) => item.category))];
  const types = ["All", "recipe", "dish"];

  const handleRecipeClick = (recipeId) => {
    localStorage.setItem("selectedRecipeId", recipeId);
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="min-h-screen bg-[#f8e5e1] py-12 px-4 sm:px-6 lg:px-8">
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

          <div className="flex space-x-4">
            <div className="relative">
              <select
                className="appearance-none bg-white border rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#c98d83]"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <Filter
                className="absolute right-2 top-2 text-gray-400"
                size={20}
              />
            </div>

            <div className="relative">
              <select
                className="appearance-none bg-white border rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#c98d83]"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              <Filter
                className="absolute right-2 top-2 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item._id}
                ref={index === filteredItems.length - 1 ? lastItemRef : null}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={item.overviewPicture || "placeholder-image-url.jpg"}
                  alt={item.dishName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-[#c98d83]">
                      {item.dishName}
                    </h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRecipeClick(item._id)}
                        className="text-sm font-medium text-white bg-[#c98d83] px-2 py-1 rounded-full hover:bg-[#b67c73] transition-colors duration-300"
                      >
                        Recipe
                      </button>
                      {item.isDish && (
                        <Link to={`/dish/${item._id}`}>
                          <button className="text-sm font-medium text-white bg-[#b67c73] px-2 py-1 rounded-full hover:bg-[#a56b62] transition-colors duration-300">
                            Dish
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-600 mb-4 h-12 overflow-hidden">
                    {item.dishDescription}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      {item.category || "Uncategorized"}
                    </span>
                    <div className="flex items-center text-[#c98d83]">
                      <Clock size={16} className="mr-1" />
                      <span>{item.duration || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {isLoading && (
          <div className="mt-8 flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader size={40} className="text-[#c98d83]" />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDishList;