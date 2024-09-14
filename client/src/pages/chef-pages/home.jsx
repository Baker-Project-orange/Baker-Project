import React, { useState, useEffect, useContext } from "react";
import {
  ShoppingCart,
  Cake,
  Coffee,
  Clipboard,
  Mail,
  Phone,
  User,
  Info,
  Save,
  Edit,
  Clock,
  Users,
} from "lucide-react";
import axiosInstance from "../../utils/axios";
import { Link } from "react-router-dom";
import useGetDishes from "../../hooks/recipeHooks/getDishesHook";
import useGetRecipes from "../../hooks/recipeHooks/getRecipeHook";

import { Context } from "../../components/contextProvider";

const ChefProfilePage = () => {
  const [chefInfo, setChefInfo] = useState({
    name: "",
    email: "",
    buissnessName: "",
    buissnessLogo: "",
  });
  const dishes = useGetDishes();
  const recipes = useGetRecipes();

  const [, setRecipeID] = useContext(Context).recipeID;

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchChefData = async () => {
      try {
        const response = await axiosInstance.get("/api/chefs/get-chef");

        setChefInfo({
          name: response.data.name || "",
          email: response.data.email || "",
          buissnessName: response.data.buissnessName || "",
          buissnessLogo: response.data.buissnessLogo || "",
        });
      } catch (error) {
        console.error("Error fetching chef data:", error);
      }
    };

    fetchChefData();
  }, []);
  console.log(dishes);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChefInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (isEditing) {
      console.log("Updating chef information:", chefInfo);
    }
    setIsEditing(!isEditing);

    try {
      const response = axiosInstance
        .patch("/api/chefs/update-chef", chefInfo)
        .catch((err) => {
          console.log(err);
        });
      console.log("Chef updated successfully:", response.data);
    } catch (error) {
      console.error("Error fetching chef data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf6f4] rounded-lg overflow-hidden">
      {/* Hero Section */}
      <section
        className="min-h-[85vh] bg-cover bg-center flex items-center overflow-hidden py-8 sm:py-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center">
          <div className="bg-white bg-opacity-80 p-8 rounded-lg max-w-lg mb-8 lg:mb-0 lg:mr-8 animate-fade-in-up">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-[#c98d83]">
              Chef {chefInfo.name}
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-[#c98d83]">
              Experience the magic of freshly baked goods, handcrafted daily
              with passion and precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                onClick={() => {
                  sessionStorage.setItem("tab", "catalog");
                  window.dispatchEvent(new Event("storage"));
                }}
                className="flex items-center bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300"
              >
                <Cake className="mr-2" size={20} />
                View Recipes
              </Link>
            </div>
          </div>
          <div className="bg-white bg-opacity-90 p-8 rounded-lg w-full max-w-xl animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-4 text-[#c98d83]">
              Chef Profile
            </h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <div className="flex items-center border-2 border-[#c98d83] rounded-md px-3 py-2">
                  <User className="text-[#c98d83] mr-2" size={20} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={chefInfo.name}
                    onChange={handleInputChange}
                    className="w-full focus:outline-none border-none bg-transparent"
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <div className="flex items-center border-2 border-[#c98d83] rounded-md px-3 py-2">
                  <Mail className="text-[#c98d83] mr-2" size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={chefInfo.email}
                    onChange={handleInputChange}
                    className="w-full focus:outline-none border-none bg-transparent"
                    readOnly={!isEditing}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleUpdate}
                className="w-full bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300 flex items-center justify-center"
              >
                {isEditing ? (
                  <Save className="mr-2" size={20} />
                ) : (
                  <Edit className="mr-2" size={20} />
                )}
                {isEditing ? "Update Profile" : "Edit Profile"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Chef's Recipes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-[#c98d83]">
            {chefInfo.name}'s Recipes
          </h2>

          {recipes.length !== 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {recipes.map((recipe, index) => (
                <>
                  {index <= 3 && !recipe.isApproved && !recipe.isDeleted ? (
                    <div
                      key={recipe._id}
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col h-full"
                    >
                      <div className="relative mb-4">
                        <img
                          src={recipe.overviewPicture}
                          alt={recipe.dishName}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2 bg-[#c98d83] text-white px-2 py-1 rounded-full text-sm">
                          New
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                        {recipe.dishName}
                      </h3>
                      <div className="flex items-center mb-2 text-gray-600">
                        <Clock size={16} className="mr-1" />
                        <span className="text-sm">{recipe.duration} mins</span>
                        <Users size={16} className="ml-4 mr-1" />
                        <span className="text-sm">
                          Serves {recipe.servings}
                        </span>
                      </div>
                      <p className="mb-4 text-gray-600 flex-grow">
                        {recipe.recipeOverview}
                      </p>
                      <Link
                        onClick={() => {
                          sessionStorage.setItem("tab", "management");
                          window.dispatchEvent(new Event("storage"));
                          sessionStorage.setItem("recipeID", recipe._id);
                          setRecipeID(recipe._id);
                        }}
                        className="mt-auto"
                      >
                        <button className="w-full bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300 flex items-center justify-center">
                          <Cake className="mr-2" size={18} />
                          View Recipe
                        </button>
                      </Link>
                    </div>
                  ) : null}
                </>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              No recipes available at the moment.
            </div>
          )}
          <div className="text-center">
            <Link className="hover:text-rose-200 transition duration-300">
              <button
                onClick={() => {
                  sessionStorage.setItem("tab", "catalog");
                  window.dispatchEvent(new Event("storage"));
                }}
                className="bg-[#c98d83] text-white px-6 py-2 rounded-full hover:bg-[#b17c73] transition duration-300"
              >
                View All Recipes
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Chef's Dishes Section */}
      <section className="bg-[#f6eeec] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-[#c98d83]">
            {chefInfo.name}'s Dishes
          </h2>

          {dishes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {dishes.map((dish) => (
                <div
                  key={dish._id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col h-full"
                >
                  <img
                    src={dish.recipieID.overviewPicture}
                    alt={dish.recipieID.dishName}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                    {dish.recipieID.dishName}
                  </h3>
                  <p className="mb-4 text-gray-600 flex-grow">
                    {dish.dishDescription}
                  </p>
                  <div className="flex items-center mb-2 text-gray-600">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">
                      {dish.recipieID.duration} mins
                    </span>
                    <Users size={16} className="ml-4 mr-1" />
                    <span className="text-sm">
                      Serves {dish.recipieID.servings}
                    </span>
                  </div>
                  <div className="mb-4 text-gray-600">
                    <span className="font-semibold">Price:</span> $
                    {dish.price.toFixed(2)}
                  </div>
                  <Link
                    onClick={() => {
                      sessionStorage.setItem("tab", "management");
                      window.dispatchEvent(new Event("storage"));
                      sessionStorage.setItem("recipeID", dish.recipieID._id);
                      setRecipeID(dish.recipieID._id);
                    }}
                    className="mt-auto"
                  >
                    <button className="w-full bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300 flex items-center justify-center">
                      <ShoppingCart className="mr-2" />
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              No dishes available at the moment.
            </div>
          )}
          <div className="text-center">
            <Link className="hover:text-rose-200 transition duration-300">
              <button
                onClick={() => {
                  sessionStorage.setItem("tab", "catalog");
                  window.dispatchEvent(new Event("storage"));
                }}
                className="bg-[#c98d83] text-white px-6 py-2 rounded-full hover:bg-[#b17c73] transition duration-300"
              >
                View All Dishes
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Baking Tips Section */}
      <section className="py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-[#c98d83]">
            Baking Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                Perfect Proofing
              </h3>
              <p>
                Learn the secrets to achieving the perfect rise in your bread
                dough.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                Mastering Macarons
              </h3>
              <p>
                Tips and tricks for creating beautiful and delicious French
                macarons.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChefProfilePage;
