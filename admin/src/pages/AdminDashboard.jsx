import React, { useState, useEffect } from "react";

import {
  Users,
  FileText,
  MessageSquare,
  ShoppingCart,
  Activity,
} from "lucide-react";
import axios from "axios";
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

  const TabButton = ({ icon: Icon, label, tabName }) => (
    <button
      className={`flex items-center space-x-2 p-2 rounded-lg ${
        activeTab === tabName ? "bg-blue-600 text-white" : "hover:bg-gray-200"
      }`}
      onClick={() => setActiveTab(tabName)}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white p-4 shadow">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <nav className="space-y-2">
          <TabButton icon={Activity} label="Home" tabName="home" />
          <TabButton
            icon={FileText}
            label="dishes Management"
            tabName="reviews"
          />
          <TabButton icon={Users} label="User Management" tabName="users" />
          <TabButton
            icon={MessageSquare}
            label="Contact Messages"
            tabName="messages"
          />
          {/* <TabButton
            icon={ShoppingCart}
            label="Marketplace"
            tabName="marketplace"
            /> */}
                    <TabButton
            icon={ShoppingCart}
            label="reports"
            tabName="reports"
          />
                              <TabButton
            icon={ShoppingCart}
            label="RecipesComponent"
            tabName="RecipesComponent"
          />
                                        <TabButton
            icon={ShoppingCart}
            label="OrderManagement"
            tabName="OrderManagement"
          />
            <TabButton
    icon={MessageSquare}
    label="chefManagement"
    tabName="chefManagement"
  />
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "home" && <Home />}
        {activeTab === "reviews" && <DishesReviewManagement />}
        {activeTab === "users" && <UserManagement />}
        {activeTab === "messages" && <ContactMessages />}
        {activeTab === "reports" && <Reports />}
        {activeTab === "chefManagement" && <ChefManagement />}
        {activeTab === "RecipesComponent" && <RecipesComponent/>}
        {activeTab === "OrderManagement" && <OrderManagement/>}
        {/* {activeTab === "marketplace" && (
          <div>Marketplace Management (To be implemented)</div>
        )} */}
      </main>
    </div>
  );
};

export default AdminDashboard;
