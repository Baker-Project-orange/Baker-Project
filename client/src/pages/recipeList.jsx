
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Filter, Clock, Loader, ChefHat } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import additionalImage from "../assets/8dcd2937317f1f248e3c9e4975c96c2b-removebg-preview.png"; // Replace with your image path

import Header from "../components/Header";

const RecipeDishList = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hideHeader, setHideHeader] = useState(false);
  const observer = useRef();
  const navigate = useNavigate();

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading || !hasNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
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

  useEffect(() => {
    const handleScroll = () => {
      setHideHeader(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/recipes/getrecipes?page=${page}&limit=6&category=${filterCategory}&type=${filterType}`
      );

      const newItems = response.data || [];
      const hasMore = newItems.length === 6; // Assuming 6 items per page

      setItems((prevItems) => {
        const combinedItems = [...prevItems, ...newItems];
        const uniqueItems = Array.from(
          new Set(combinedItems.map((item) => item._id))
        ).map((id) => combinedItems.find((item) => item._id === id));

        return uniqueItems;
      });

      setHasNextPage(hasMore);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const dishName = item.dishName || "";
    const matchesSearch = dishName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || item.category === filterCategory;
    const matchesType =
      filterType === "All" ||
      (filterType === "recipe" && !item.isDish) ||
      (filterType === "dish" && item.isDish);

    return matchesSearch && matchesCategory && matchesType;
  });

  const categories = ["All", ...new Set(items.map((item) => item.category))];
  const types = ["All", "recipe", "dish"];

  const handleItemClick = (item) => {
    localStorage.setItem("selectedRecipeId", item._id);
    localStorage.setItem("isDish", item.isDish.toString());
    navigate(`/recipe/${item._id}`);
  };

  return (
    <>
      <div className="font-serif">
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: hideHeader ? 0.7 : 1,
            scale: hideHeader ? 0.9 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="header-transition"
        >
          <Header />
        </motion.div>
 
        <div className="relative mt-[50px]">
          {" "}
          {/* Adjust margin to raise the image */}
          <img
            src={additionalImage} // Replace with your image path
            alt="Additional"
            className="w-4/4 h-auto object-cover mx-auto -mt-[460px]" // Adjust width as needed
            style={{ maxWidth: "900px" }} // Optional: Set a max-width for better control
          />
        </div>

        <div className="min-h-screen bg-#fbf6f4 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl font-serif text-center text-[#c98d83] mb-12 tracking-tight"
            >
              Recipe and Dish Catalog
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
            >
              <div className="relative md:w-1/3">
                <input
                  type="text"
                  placeholder="Search recipes and dishes..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#c98d83] rounded-full focus:outline-none focus:ring-2 focus:ring-[#c98d83] focus:border-transparent text-lg transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  className="absolute left-4 top-3 text-[#c98d83]"
                  size={24}
                />
              </div>

              <div className="flex space-x-4">
                <div className="relative">
                  <select
                    className="appearance-none bg-white border-2 border-[#c98d83] rounded-full px-6 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#c98d83] focus:border-transparent text-lg transition-all duration-300"
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
                    className="absolute right-3 top-3 text-[#c98d83]"
                    size={24}
                  />
                </div>

                <div className="relative">
                  <select
                    className="appearance-none bg-white border-2 border-[#c98d83] rounded-full px-6 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#c98d83] focus:border-transparent text-lg transition-all duration-300"
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
                    className="absolute right-3 top-3 text-[#c98d83]"
                    size={24}
                  />
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    ref={
                      index === filteredItems.length - 1 ? lastItemRef : null
                    }
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="relative overflow-hidden flex-grow">
                      <img
                        src={
                          item.overviewPicture || "placeholder-image-url.jpg"
                        }
                        alt={item.dishName}
                        className="w-full h-56 object-cover transition-transform duration-300 transform hover:scale-110"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-2xl font-bold text-[#c98d83] mb-2 transition-all duration-300 hover:text-[#a77067]">
                        {item.dishName}
                      </h2>
                      <div className="text-gray-600 mb-4 h-12 overflow-hidden">
                        {item.recipeOverview}
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium text-[#c98d83] bg-[#f8e5e1] px-3 py-1 rounded-full">
                          {item.category || "Uncategorized"}
                        </span>
                        <div className="flex items-center text-[#c98d83]">
                          <Clock size={18} className="mr-1" />
                          <span className="font-medium">
                            {item.duration || "N/A"}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        className={`flex items-center justify-center w-full py-2 rounded-full ${
                          item.isDish
                            ? "bg-[#c98d83] text-white"
                            : "bg-[#f8e5e1] text-[#c98d83]"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChefHat size={18} className="mr-2" />
                        <span>{item.isDish ? "Recipe & Dish" : "Recipe"}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {isLoading && (
              <div className="mt-12 flex justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader size={48} className="text-[#c98d83]" />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDishList;
