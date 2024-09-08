import React, { useState, useEffect } from "react";
import axios from "axios";
import { Home, ShoppingBag, PhoneCall, LogOut } from "lucide-react";
import UserProfilePage from "../user-pages/home";
import Orders from "../user-pages/Orders";
import Favourit from "./Favourit";
import Register from "../Register";
const Header_user = () => {
  const [active_tab, set_active_tab] = useState(
    sessionStorage.getItem("tab") || "home"
  );
  const [userInfo, setUserInfo] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/users/users/${userId}`
          );
          setUserInfo({ name: response.data.name });
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };
    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    const handleStorageChange = () => {
      const newTab = sessionStorage.getItem("tab");
      if (newTab) {
        set_active_tab(newTab);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleTabChange = (tab) => {
    set_active_tab(tab);
    sessionStorage.setItem("tab", tab);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  const renderContent = () => {
    switch (active_tab) {
      case "home":
        return <UserProfilePage />;
      case "main":
        return <Register />;
      case "Orders":
        return <Orders />;
      case "Favourit":
        return <Favourit />;
      default:
        return <UserProfilePage />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <header className="bg-[#c98d83] shadow-md w-full sm:w-16 lg:w-64 h-auto sm:h-[85vh] fixed sm:left-4 sm:top-1/2 sm:-translate-y-1/2 rounded-lg overflow-hidden z-20">
        <div className="h-full flex items-center max-sm:justify-center sm:flex-col mt-4 p-4">
          <div className="flex sm:flex-col items-center justify-center mb-6">
            <Home className="text-white mr-2 sm:mr-0 sm:mb-2" size={24} />
            <span className="text-xs text-white block text-center mt-2 lg:block hidden">
              Welcome
            </span>

            <h1 className="text-2xl font-bold text-white lg:block hidden">
              {userInfo.name}
            </h1>
          </div>
          <nav className="flex sm:flex-col w-full">
            <button
              onClick={() => handleTabChange("main")}
              className={`text-white hover:text-rose-200 transition duration-300 text-left w-full flex items-center sm:justify-start mb-9 ${
                active_tab === "home" ? "bg-[#b67c73]" : ""
              }`}
            >
              <Home size={24} />
              <span className="ml-2">Home</span>
            </button>
            <button
              onClick={() => handleTabChange("home")}
              className={`text-white hover:text-rose-200 transition duration-300 text-left w-full flex items-center sm:justify-start mb-9 ${
                active_tab === "home" ? "bg-[#b67c73]" : ""
              }`}
            >
              <Home size={24} />
              <span className="ml-2">Profile</span>
            </button>
            <button
              onClick={() => handleTabChange("Orders")}
              className={`text-white hover:text-rose-200 transition duration-300 text-left w-full flex items-center sm:justify-start mb-9 ${
                active_tab === "Orders" ? "bg-[#b67c73]" : ""
              }`}
            >
              <ShoppingBag size={24} />
              <span className="ml-2">Orders</span>
            </button>
            <button
              onClick={() => handleTabChange("Favourit")}
              className={`text-white hover:text-rose-200 transition duration-300 text-left w-full flex items-center sm:justify-start mb-9 ${
                active_tab === "Favourit" ? "bg-[#b67c73]" : ""
              }`}
            >
              <span className="ml-2">Favorites</span>
            </button>
            <button
              onClick={handleLogout}
              className="text-white hover:text-rose-200 transition duration-300 text-left w-full flex items-center sm:justify-start mb-9"
            >
              <LogOut size={24} />
              <span className="ml-2">Logout</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="shadow-md w-full sm:w-[calc(100%-80px)] lg:w-[1200px] h-[calc(100vh-64px)] sm:h-[85vh] sm:ml-20 lg:ml-[270px] mt-16 sm:mt-0 sm:fixed sm:left-4 sm:top-1/2 sm:-translate-y-1/2 rounded-lg overflow-hidden z-10">
        <div className="h-full overflow-auto p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Header_user;
