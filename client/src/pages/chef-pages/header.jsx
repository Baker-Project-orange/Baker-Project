
import React, { useState, useEffect } from 'react';
import { Croissant, Menu, X, Home, ShoppingBag, User, PhoneCall } from 'lucide-react';
import Catalog_chef from './Catalog_chef';
import ChefProfilePage from './home';
import Chef_profile from './profile';
import Contactus_chef from './chef-contact';
import Recipe_dish_creation from './recpie-dish';
import Recipe_dish_management from './recpie-dish-management';

const Header_chef = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active_tab, set_active_tab] = useState(sessionStorage.getItem("tab") || "home");

  useEffect(() => {
    const handleStorageChange = () => {
      const newTab = sessionStorage.getItem("tab");
      if (newTab) {
        set_active_tab(newTab);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const newTab = sessionStorage.getItem("tab");
    if (newTab && newTab !== active_tab) {
      set_active_tab(newTab);
    }
  }, [sessionStorage.getItem("tab")]);

  const handleTabChange = (tab) => {
    set_active_tab(tab);
    sessionStorage.setItem("tab", tab);
    setIsMenuOpen(false);
  };

  const renderContent = () => {
    switch (active_tab) {
      case "home":
        return <ChefProfilePage />;
      case "catalog":
        return <Catalog_chef />;
      case "profile":
        return <Chef_profile />;
      case "contact":
        return <Contactus_chef />;
      case "dish-recipes-creation":
        return <Recipe_dish_creation />;
      case "management":
        return <Recipe_dish_management />;
      default:
        return <ChefProfilePage />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <header className="bg-[#c98d83] shadow-md w-full sm:w-16 lg:w-64 h-auto sm:h-[85vh] fixed sm:left-4 sm:top-1/2 sm:-translate-y-1/2 rounded-lg overflow-hidden z-20">
        <div className="h-full flex  items-center max-sm:justify-center sm:flex-col mt-4  p-4">
          <div className="flex sm:flex-col items-center justify-center mb-6">
            <Croissant className="text-white mr-2 sm:mr-0 sm:mb-2" size={24} />
            <h1 className="text-2xl font-bold text-white lg:block hidden">BAKER</h1>
            <span className="text-xs text-white block text-center mt-2 lg:block hidden">EST. 1892</span>
          </div>
          <nav className="flex sm:flex-col w-[50%] sm:space-x-0 sm:space-y-4">
            <button onClick={() => handleTabChange("home")} className="text-white  hover:text-rose-200 transition duration-300 text-left w-full  flex items-center justify-center sm:justify-start">
              <Home size={24} />
              <span className="ml-2 lg:inline hidden">Home</span>
            </button>
            <button onClick={() => handleTabChange("catalog")} className="text-white  hover:text-rose-200 transition duration-300 text-left w-full  flex items-center justify-center sm:justify-start">
              <ShoppingBag size={24} />
              <span className="ml-2 lg:inline hidden">Catalog</span>
            </button>
            <button onClick={() => handleTabChange("profile")} className="text-white  hover:text-rose-200 transition duration-300 text-left w-full  flex items-center justify-center sm:justify-start">
              <User size={24} />
              <span className="ml-2 lg:inline hidden">Profile</span>
            </button>
            <button onClick={() => handleTabChange("contact")} className="text-white  hover:text-rose-200 transition duration-300 text-left w-full  flex items-center justify-center sm:justify-start">
              <PhoneCall size={24} />
              <span className="ml-2 lg:inline hidden">Contact</span>
            </button>

          </nav>
          
        </div>
      </header>

      <main className="bg-[#c98d83] shadow-md w-full sm:w-[calc(100%-80px)] lg:w-[1200px] h-[calc(100vh-64px)] sm:h-[85vh] sm:ml-20 lg:ml-[270px] mt-16 sm:mt-0 sm:fixed sm:left-4 sm:top-1/2 sm:-translate-y-1/2 rounded-lg overflow-hidden z-10">
        <div className="h-full overflow-auto p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Header_chef;