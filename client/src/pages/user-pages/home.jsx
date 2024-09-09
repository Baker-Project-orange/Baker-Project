import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Save,
  Edit,
  Phone,
  Info,
  ShoppingCart,
  Cake,
  Coffee,
  Clipboard,
} from "lucide-react";
import axios from "axios";
import Orders from "../user-pages/Orders";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/users/users/${userId}`
          );
          setUserInfo(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
          setGender(response.data.gender);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };
    fetchUserInfo();
  }, [userId]);

  const [orders, setOrders] = useState([]);

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/users/${userId}/orders`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  const [recipes, setRecipes] = useState([]);

  // Function to fetch favorite recipes
  const fetchFavoriteRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${userId}`
      );
      setRecipes(response.data.favoriteRecipes); // Assuming the response contains a field `favoriteRecipes`
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  };

  // Fetch favorite recipes when component mounts
  useEffect(() => {
    fetchFavoriteRecipes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "gender":
        setGender(value);
        break;
      default:
        break;
    }
  };

  const handleUpdate = async () => {
    if (!userId) {
      alert("No user ID found. Please log in again.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/users/${userId}`,
        {
          name,
          email,
          gender,
        }
      );
      console.log("User updated successfully:", response.data);
      alert("User info updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user info");
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
              {userInfo.name || "User Profile"}
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-[#c98d83]">
              Welcome to your personalized user dashboard.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/Orders"
                className="flex items-center bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300"
              >
                <ShoppingCart className="mr-2" size={20} />
                View Orders
              </Link>
              <Link
                to="/favorites"
                className="flex items-center bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300"
              >
                <Cake className="mr-2" size={20} />
                Favorite Recipes
              </Link>
              <Link
                to="/settings"
                className="flex items-center bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300"
              >
                <Clipboard className="mr-2" size={20} />
                Account Settings
              </Link>
            </div>
          </div>
          <div className="bg-white bg-opacity-90 p-8 rounded-lg w-full max-w-xl animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-4 text-[#c98d83]">
              User Profile
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
                    value={name}
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
                    value={email}
                    onChange={handleInputChange}
                    className="w-full focus:outline-none border-none bg-transparent"
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Gender
                </label>
                <div className="flex items-center border-2 border-[#c98d83] rounded-md px-3 py-2">
                  <Info className="text-[#c98d83] mr-2" size={20} />
                  <select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={handleInputChange}
                    className="w-full focus:outline-none border-none bg-transparent"
                    disabled={!isEditing}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={isEditing ? handleUpdate : () => setIsEditing(true)}
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

      {/* User's Orders Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-[#c98d83]">
            {userInfo.name}'s Orders
          </h2>
          <div className="bg-white border border-[#c98d83] rounded-lg p-4 shadow-md">
            <h4 className="text-xl font-semibold mb-2">Order Summary</h4>
            <p className="text-gray-700 mb-2">Order ID: #123456789</p>
            <p className="text-gray-700 mb-2">Date: September 1, 2024</p>
            <p className="text-gray-700 mb-2">Total: $99.99</p>
            <Link
              to="/order-details"
              className="text-[#c98d83] hover:text-[#b17c73] transition duration-300"
            >
              View Details
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                    Order #{order.id}
                  </h3>
                  <p className="mb-4 text-gray-600">{order.description}</p>
                  <p className="mb-4 text-gray-900">{order.totalPrice} jd</p>

                  <p className="mb-4 text-gray-600">{order.createdAt}</p>

                  <p className="text-[#c98d83] font-semibold">
                    Status: {order.status}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3">No recent orders found.</p>
            )}
          </div>
          <div className="text-center">
            <Link
              to="/orders"
              className="hover:text-rose-200 transition duration-300"
            >
              <button className="bg-[#c98d83] text-white px-6 py-2 rounded-full hover:bg-[#b17c73] transition duration-300">
                View All Orders
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f0d8d3] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-[#c98d83]">
            Favorite Recipes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <img
                    src={recipe.overviewPicture}
                    alt={recipe.dishName}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-[#c98d83]">
                    {recipe.dishName}
                  </h3>
                  <p className="mb-4 text-gray-600">{recipe.recipeOverview}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Duration: {recipe.duration}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Category: {recipe.category}
                  </p>
                  <Link
                    to={`/recipe/${recipe.slug}`}
                    className="hover:text-rose-200 transition duration-300"
                  >
                    <button className="bg-[#c98d83] text-white px-4 py-2 rounded hover:bg-[#b17c73] transition duration-300">
                      View Recipe
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3">
                No favorite recipes found.
              </p>
            )}
          </div>
          <div className="text-center">
            <Link
              to="/favorites"
              className="hover:text-rose-200 transition duration-300"
            >
              <button className="bg-[#c98d83] text-white px-6 py-2 rounded-full hover:bg-[#b17c73] transition duration-300">
                View All Favorites
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
