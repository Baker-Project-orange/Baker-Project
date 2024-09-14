import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Croissant,
  Menu,
  X,
  Home,
  ShoppingBag,
  ReceiptTextIcon,
  ChefHat,
  User,
  PhoneCall,
  ReceiptText,
  BadgePlus,
  LogOut,
} from "lucide-react";
import Catalog_chef from "./Catalog_chef";
import ChefProfilePage from "./home";
import Chef_profile from "./profile";
import Contactus_chef from "./chef-contact";
import Recipe_dish_creation from "./recpie-dish";
import Recipe_dish_management from "./recpie-dish-management";

import Orders from "./orders";
import { Context } from "../../components/contextProvider";

import logo from "../../assets/image.png"


const Chef_Manager = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chef_id, set_chef_id] = useState("66d775724924397e1179e5eb");
  const [chef, set_chef] = useState();
  const [active_tab, set_active_tab] = useContext(Context).active_tab;

  useEffect(() => {
    const handleStorageChange = () => {
      const newTab = sessionStorage.getItem("tab");
      if (newTab) {
        set_active_tab(newTab);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
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

  function backHomeHandle() {
    navigate("/");
  }

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

      case "chefOrder":
        return <Orders />;

      default:
        return <ChefProfilePage />;
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
      <header className="bg-[#c98d83] font-serif shadow-md w-full sm:w-16 md:w-64 h-auto sm:h-[85vh] fixed sm:left-4 sm:top-1/2 sm:-translate-y-1/2 rounded-lg overflow-hidden z-20">
        <div className="h-full flex flex-col items-center justify-between p-4">
          <div className="w-full flex items-center justify-between sm:justify-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white sm:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="flex sm:flex-col items-center mt-3 h-18 justify-center">
              {/* <Croissant

            <div className="flex sm:flex-col items-center mb-6 justify-center">
              <Croissant

                className="text-white mr-2 sm:mr-0 sm:mb-2"
                size={24}
              />
              <h1 className="text-2xl font-bold text-white md:block hidden">
                BAKER
              </h1>
              <span className="text-xs text-white text-center mt-2 md:block hidden">
                EST. 1892

              </span> */}
              <div className="w-24 h-24  max-md:w-14 max-md:h-14  max-sm:w-20 max-sm:h-20">
                <img src={logo} alt="" />
              </div>
            </div>
            <div className="w-6 sm:hidden"></div>{" "}
            {/* Placeholder for alignment */}
          </div>

          <div className="flex-col justify-between items-start h-full w-full">
            <nav
              className={`flex h-[50%] flex-col w-full justify-center sm:justify-start mt-4 sm:mt-0 ${
                isMenuOpen ? "block" : "hidden sm:flex"
              }`}
            >
              <NavButton
                onClick={() => handleTabChange("home")}
                icon={ChefHat}
                text="Profile"
              />
              <NavButton
                onClick={() => handleTabChange("catalog")}
                icon={ShoppingBag}
                text="Catalog"
              />
              <NavButton
                onClick={() => handleTabChange("dish-recipes-creation")}
                icon={BadgePlus}
                text="Create Recipe"
              />
              <NavButton
                onClick={() => handleTabChange("chefOrder")}
                icon={ReceiptText}
                text="Orders"
              />
            </nav>
            <div
              className={`w-full h-[50%] flex flex-col justify-end mt-4 sm:mt-0 ${
                isMenuOpen ? "block" : "hidden sm:flex"
              }`}
            >
              <NavButton
                onClick={() => backHomeHandle()}
                icon={Home}
                text="Back to Home"
              />
              <NavButton
                onClick={() => console.log("Logout")}
                icon={LogOut}
                text="Logout"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="bg-[#c98d83] shadow-md w-full sm:w-[calc(100%-80px)] md:w-[1200px] h-[calc(100vh-64px)] sm:h-[85vh] sm:ml-20 md:ml-[270px] mt-20 sm:mt-0 sm:fixed sm:left-4 sm:top-1/2 sm:-translate-y-1/2 rounded-lg overflow-hidden z-10">
        <div className="h-full overflow-auto p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Chef_Manager;
