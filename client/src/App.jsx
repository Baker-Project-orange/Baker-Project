import { Routes, Route } from "react-router-dom";
import "./pages/chef-pages/animations.css";
import DishCard from "./pages/distCard";
import RecipeDishList from "./pages/recipeList";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chef_Manager from "./pages/chef-pages/ChefMain";
import Header_user from "./pages/user-pages/header";
import Register from "./pages/Register";
import UserReg from "./components/UserReg"; // Update the path as per your file structure
import Login from "./components/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import CheckoutComponent from "./components/checkout";
import { ContextProvider } from "./components/contextProvider";
import { ThemeProvider } from "@material-tailwind/react";
import AboutUs from "./pages/aboutUs";
import ContactUs from "./pages/contactUs";

import Orders from "./pages/chef-pages/orders";

function App() {
  return (
    <>
      <ThemeProvider>
        <ContextProvider>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/AdminRegister" element={<AdminRegister />} />
            <Route path="/RecipeDishList" element={<RecipeDishList />} />
            <Route path="/ChefProfile" element={<Chef_Manager />} />{" "}
            <Route path="/payment" element={<CheckoutComponent />} />
            <Route path="/register" element={<UserReg />} />
            <Route path="/DishCard" element={<DishCard />} />
            <Route path="/user-profile" element={<Header_user />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />

            <Route path="/chefOrder" element={<Orders />} />

            
          </Routes>
          <Footer />
        </ContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
