import React, { useState, useEffect } from 'react';
import { Home, ShoppingBag, User, PhoneCall } from 'lucide-react';
import UserProfilePage from '../user-pages/home'; // تأكد من صحة مسار الاستيراد
import Orders from '../user-pages/Orders'; // تأكد من صحة مسار الاستيراد

const Header_user = () => {
  const [active_tab, set_active_tab] = useState(sessionStorage.getItem("tab") || "home");

  useEffect(() => {
    const handleStorageChange = () => {
      const newTab = sessionStorage.getItem("tab");
      if (newTab) {
        set_active_tab(newTab);
      }
    };

    // إضافة مستمعين لتغييرات الجلسة
    window.addEventListener('storage', handleStorageChange);

    // إزالة مستمعين عند فك التثبيت
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleTabChange = (tab) => {
    set_active_tab(tab);
    sessionStorage.setItem("tab", tab);
  };

  const renderContent = () => {
    switch (active_tab) {
      case "home":
        return <UserProfilePage />;
      case "Orders":
        return <Orders />; // أضف المكون المناسب هنا
      case "profile":
        return <div>Profile Content</div>; // أضف المكون المناسب هنا
      case "contact":
        return <div>Contact Content</div>; // أضف المكون المناسب هنا
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
            <h1 className="text-2xl font-bold text-white lg:block hidden">USER</h1>
            <span className="text-xs text-white block text-center mt-2 lg:block hidden">Welcome</span>
          </div>
          <nav className="flex sm:flex-col w-full">
            <button
              onClick={() => handleTabChange("home")}
              className={`text-white hover:text-rose-200 transition duration-300 text-left w-full flex items-center sm:justify-start mb-9 ${active_tab === "home" ? "bg-[#b67c73]" : ""}`}
            >
              <Home size={24} />
              <span className="ml-2">Home</span>
            </button>
            <button
              onClick={() => handleTabChange("Orders")}
              className={`text-white hover:text-rose-200 transition duration-300 text-left w-full flex items-center sm:justify-start mb-9 ${active_tab === "catalog" ? "bg-[#b67c73]" : ""}`}
            >
              <ShoppingBag size={24} />
              <span className="ml-2">Orders</span>
            </button>
            <button
              onClick={() => handleTabChange("profile")}
              className={`text-white hover:text-rose-200 transition duration-300 text-left w-full flex items-center sm:justify-start mb-9 ${active_tab === "profile" ? "bg-[#b67c73]" : ""}`}
            >
              <User size={24} />
              <span className="ml-2">Profile</span>
            </button>
            <button
              onClick={() => handleTabChange("contact")}
              className={`text-white hover:text-rose-200 transition duration-300 text-left w-full flex items-center sm:justify-start mb-9 ${active_tab === "contact" ? "bg-[#b67c73]" : ""}`}
            >
              <PhoneCall size={24} />
              <span className="ml-2">Contact</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="shadow-md w-full sm:w-[calc(100%-80px)] lg:w-[1200px] h-[calc(100vh-64px)] sm:h-[85vh] sm:ml-20 lg:ml-[270px] mt-16 sm:mt-0 sm:fixed sm:left-4 sm:top-1/2 sm:-translate-y-1/2 rounded-lg overflow-hidden z-10">
        <div className="h-full overflow-auto p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Header_user;
