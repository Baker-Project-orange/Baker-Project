import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import axiosInstance from "../../utils/axios";
import { Link } from "react-router-dom";
import axios from "axios";

const ChefProfilePage = () => {

  const [chefInfo, setChefInfo] = useState({
    name: "",
    email: "",
    buissnessName: "",
    buissnessLogo: "",
  });

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

  const [isEditing, setIsEditing] = useState(false);

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
        .patch("/chef/update-chef", chefInfo)
        .catch((err) => {
          console.log(err);
        });
      console.log("Chef updated successfully:", response.data);
    } catch (error) {
      console.error("Error fetching chef data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8e5e1] rounded-lg overflow-hidden">
      {/* Hero Section */}
      <section
        className="min-h-[60vh] bg-cover bg-center flex items-center overflow-hidden py-8 sm:py-16"
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
                to="/recipes"
                className="flex items-center bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300"
              >
                <Cake className="mr-2" size={20} />
                View Recipes
              </Link>
              <Link
                to="/menu"
                className="flex items-center bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300"
              >
                <Coffee className="mr-2" size={20} />
                Our Menu
              </Link>
              <Link
                to="/classes"
                className="flex items-center bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300"
              >
                <Clipboard className="mr-2" size={20} />
                Baking Classes
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
              <div className="mb-4">
                <label
                  htmlFor="buissnessName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Buissness Name
                </label>
                <div className="flex items-center border-2 border-[#c98d83] rounded-md px-3 py-2">
                  <Phone className="text-[#c98d83] mr-2" size={20} />
                  <input
                    type="tel"
                    id="buissnessName"
                    name="buissnessName"
                    value={chefInfo.buissnessName}
                    onChange={handleInputChange}
                    className="w-full focus:outline-none border-none bg-transparent"
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="buissnessLogo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Buissness Logo
                </label>
                <div className="flex items-start border-2 border-[#c98d83] rounded-md px-3 py-2">
                  <Info className="text-[#c98d83] mr-2 mt-1" size={20} />
                  <textarea
                    id="buissnessLogo"
                    name="buissnessLogo"
                    rows="3"
                    value={chefInfo.buissnessLogo}
                    onChange={handleInputChange}
                    className="w-full focus:outline-none border-none bg-transparent"
                    readOnly={!isEditing}
                  ></textarea>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Recipe cards */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://i.pinimg.com/236x/57/79/64/577964bf52039b836f54702c2f446a76.jpg"
                alt="Sourdough Bread"
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                Artisan Sourdough Bread
              </h3>
              <p className="mb-4 text-gray-600">
                A crusty, tangy sourdough with a perfect crumb. Crafted with
                care over 24 hours.
              </p>

              <Link className="hover:text-rose-200 transition duration-300">
                <button
                  onClick={() => {
                    sessionStorage.setItem("tab", "management");
                    window.dispatchEvent(new Event("storage"));
                  }}
                  className="bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300"
                >
                  View Recipe
                </button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://i.pinimg.com/736x/0d/77/0f/0d770f26a7e5bd07b70526cdaa888f9d.jpg"
                alt="Croissants"
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                Buttery Croissants
              </h3>
              <p className="mb-4 text-gray-600">
                Flaky, golden croissants with a delicate texture. Perfect for
                breakfast or brunch.
              </p>
              <Link className="hover:text-rose-200 transition duration-300">
                <button
                  onClick={() => {
                    sessionStorage.setItem("tab", "management");
                    window.dispatchEvent(new Event("storage"));
                  }}
                  className="bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300"
                >
                  View Recipe
                </button>
              </Link>{" "}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://i.pinimg.com/564x/9d/f3/0b/9df30bcae481944aa5ce624715667497.jpg"
                alt="Cinnamon Rolls"
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                Gooey Cinnamon Rolls
              </h3>
              <p className="mb-4 text-gray-600">
                Soft, sweet rolls with a cinnamon sugar swirl and cream cheese
                frosting.
              </p>
              <Link className="hover:text-rose-200 transition duration-300">
                <button
                  onClick={() => {
                    sessionStorage.setItem("tab", "management");
                    window.dispatchEvent(new Event("storage"));
                  }}
                  className="bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300"
                >
                  View Recipe
                </button>
              </Link>{" "}
            </div>
          </div>
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
      <section className="bg-[#f0d8d3] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-[#c98d83]">
            {chefInfo.name}'s Dishes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Dish cards */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://i.pinimg.com/564x/3b/00/6c/3b006c67ee8011d489519971396da6dc.jpg"
                alt="Artisan Bread Basket"
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                Artisan Bread Basket
              </h3>
              <p className="mb-4 text-gray-600">
                Assortment of freshly baked artisan breads, including sourdough,
                ciabatta, and whole grain.
              </p>

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
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://i.pinimg.com/564x/31/53/39/315339551683fe82e933a3cf58a6fdb8.jpg"
                alt="Pastry Platter"
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                Gourmet Pastry Platter
              </h3>
              <p className="mb-4 text-gray-600">
                Selection of finest pastries and viennoiseries, including
                croissants, danishes, and pain au chocolat.
              </p>
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
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://i.pinimg.com/564x/ec/46/f2/ec46f23740e2cef9db88b8e346548fc6.jpg"
                alt="Dessert Tray"
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                Dessert Tray Deluxe
              </h3>
              <p className="mb-4 text-gray-600">
                Assorted gourmet desserts and sweet treats, including tarts,
                éclairs, and macarons.
              </p>
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

      {/* New Section (Replacing Baking Classes) */}
      <section className="bg-[#f0d8d3] py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-[#c98d83]">
            Seasonal Specialties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                Summer Fruit Tarts
              </h3>
              <p>
                Delicate pastry shells filled with fresh, seasonal fruits and
                light custard.
              </p>
              <button className="mt-4 bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300">
                Learn More
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                Autumn Spice Breads
              </h3>
              <p>
                Warm, comforting breads infused with seasonal spices and nuts.
              </p>
              <button className="mt-4 bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300">
                Learn More
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                Holiday Cookie Boxes
              </h3>
              <p>
                Assorted festive cookies, perfect for gifting or enjoying with
                family.
              </p>
              <button className="mt-4 bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChefProfilePage;
