import React, { useState } from "react";
import { Users, FileText, MessageSquare, ShoppingCart, Activity, BookOpen, Package, ChefHat } from "lucide-react";
import Home from "./Home";
import DishesReviewManagement from "./dishesReviewManagement";
import UserManagement from "./userManagment";
import ContactMessages from "./ContactMessages";
import Reports from "./Reports";
import ChefManagement from "./ChefManagement";
import RecipesComponent from "./RecipesComponent";
import OrderManagement from "./OrderManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  // Reusable tab button component with updated styles
  const TabButton = ({ icon: Icon, label, tabName }) => (
    <button
      className={`flex items-center space-x-2 p-2 rounded-lg transition duration-300 ${
        activeTab === tabName
          ? "bg-[#c98d83] text-white shadow-md"
          : "bg-transparent hover:bg-[rgb(247,204,196)] text-white"
      }`}
      onClick={() => setActiveTab(tabName)}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-[#c98d83] p-4 shadow-lg fixed top-0 left-0 h-full">
        <h1 className="text-2xl font-bold text-black mb-6 mt-10">Admin Dashboard</h1>
        <nav className="space-y-4">
          <TabButton icon={Activity} label="Home" tabName="home" />
          <TabButton icon={FileText} label="Dishes Management" tabName="reviews" />
          <TabButton icon={Users} label="User Management" tabName="users" />
          <TabButton icon={MessageSquare} label="Contact Messages" tabName="messages" />
          <TabButton icon={ShoppingCart} label="Reports" tabName="reports" />
          <TabButton icon={BookOpen} label="Recipes" tabName="RecipesComponent" />
          <TabButton icon={Package} label="Orders" tabName="OrderManagement" />
          <TabButton icon={ChefHat} label="Chef Management" tabName="chefManagement" />
        </nav>
      </aside>

      <main className="ml-64  flex-1 p-8 overflow-y-auto">
        {activeTab === "home" && <Home />}
        {activeTab === "reviews" && <DishesReviewManagement />}
        {activeTab === "users" && <UserManagement />}
        {activeTab === "messages" && <ContactMessages />}
        {activeTab === "reports" && <Reports />}
        {activeTab === "chefManagement" && <ChefManagement />}
        {activeTab === "RecipesComponent" && <RecipesComponent />}
        {activeTab === "OrderManagement" && <OrderManagement />}
      </main>
    </div>
  );
};

export default AdminDashboard;
