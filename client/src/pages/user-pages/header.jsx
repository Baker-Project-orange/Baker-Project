import React, { useState, useEffect } from "react";
import axios from "axios";
import { Home as HomeIcon, ShoppingBag, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate
import UserProfilePage from "../user-pages/home";
import Orders from "../user-pages/Orders";
import Favourit from "./Favourit";
import Register from "../Register";
import Home1 from "../Home";

const Header_user = () => {
  const [active_tab, set_active_tab] = useState(
    sessionStorage.getItem("tab") || "Home"
  );
  const [userInfo, setUserInfo] = useState({});
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate(); // استخدام useNavigate للتوجيه

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

  const handleTabChange = (path) => {
    set_active_tab(path);
    sessionStorage.setItem("tab", path);
    navigate(path); // توجيه المستخدم إلى المسار المحدد
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/"); // توجيه المستخدم إلى الصفحة الرئيسية بعد تسجيل الخروج
  };

  const renderContent = () => {
    switch (active_tab) {
      case "/home":
        return <Home1 />; // تأكد من أن Home1 هو المكون الذي تريد عرضه
      case "/profile":
        return <UserProfilePage />;
      case "/orders":
        return <Orders />;
      case "/favourit":
        return <Favourit />;
      default:
        return <UserProfilePage />;
    }
  };

  const NavButton = ({ onClick, icon: Icon, text }) => (
    <button
      onClick={onClick}
      className="text-white hover:text-rose-200 transition duration-300 text-left w-full flex items-center justify-center sm:justify-start mb-4 sm:mb-6"
    >
      <Icon size={24} />
      <span className="ml-2 sm:hidden md:inline">{text}</span>
    </button>
  );

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <header className="bg-[#c98d83] shadow-md w-full sm:w-16 md:w-64 h-auto sm:h-[85vh] fixed sm:left-4 sm:top-1/2 sm:-translate-y-1/2 rounded-lg overflow-hidden z-20">
        <div className="h-full flex flex-col items-center justify-between p-4">
          <div className="flex sm:flex-col items-center mt-3 h-18 justify-center">
            <HomeIcon className="text-white mr-2 sm:mr-0 sm:mb-2" size={24} />
            <h1 className="text-2xl font-bold text-white lg:block hidden">
              {userInfo.name}
            </h1>
          </div>
          <div className="flex-col justify-between items-start h-full w-full">
            <nav className="flex h-[50%] flex-col w-full justify-center sm:justify-start mt-4 sm:mt-0">
              <NavButton
                onClick={() => handleTabChange("/")}
                icon={HomeIcon}
                text="Home"
              />
              <NavButton
                onClick={() => handleTabChange("/user-profile")}
                icon={HomeIcon}
                text="Profile"
              />
              <NavButton
                onClick={() => handleTabChange("/Orders")}
                icon={ShoppingBag}
                text="Orders"
              />
              <NavButton
                onClick={() => handleTabChange("/Favourit")}
                icon={ShoppingBag}
                text="Favorites"
              />
            </nav>
            <div className="w-full h-[50%] flex flex-col justify-end mt-4 sm:mt-0">
              <NavButton
                onClick={handleLogout}
                icon={LogOut}
                text="Logout"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="shadow-md w-full sm:w-[calc(100%-80px)] md:w-[1200px] h-[calc(100vh-64px)] sm:h-[85vh] sm:ml-20 lg:ml-[270px] mt-16 sm:mt-0 sm:fixed sm:left-4 sm:top-1/2 sm:-translate-y-1/2 rounded-lg overflow-hidden z-10">
        <div className="h-full overflow-auto p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Header_user;
