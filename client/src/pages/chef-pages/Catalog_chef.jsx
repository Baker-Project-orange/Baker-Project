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
import { Link } from "react-router-dom";

const Catalog_chef = () => {
  const [items, setItems] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");

  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    const results = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "All" || item.category === filterCategory) &&
        (filterType === "All" || item.type === filterType)
    );
    setFilteredItems(results);
  }, [searchTerm, filterCategory, filterType, items]);

  const categories = ["All", ...new Set(items.map((item) => item.category))];
  const types = ["All", "recipe", "dish"];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-[#c98d83]">
                    {item.name}
                  </h2>
                  <span className="text-sm font-medium text-white bg-[#c98d83] px-2 py-1 rounded-full">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 h-12 overflow-hidden">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    {item.category}
                  </span>
                  {item.type === "recipe" ? (
                    <div className="flex items-center text-[#c98d83]">
                      <Clock size={16} className="mr-1" />
                      <span>{item.duration} min</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-[#c98d83]">
                      <DollarSign size={16} className="mr-1" />
                      <span>{item.price.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Link className="hover:text-rose-200 transition duration-300">
                  <button
                    onClick={() => {
                      sessionStorage.setItem("tab", "management");
                      window.dispatchEvent(new Event("storage"));
                    }}
                    className="bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300 flex items-center justify-center w-full"
                  >
                    <ShoppingCart className="mr-2" />
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog_chef;
