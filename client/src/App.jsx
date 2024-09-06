import { Routes, Route } from "react-router-dom";
import "./pages/chef-pages/animations.css";
import DishCard from "./pages/distCard";
import RecipeDishList from "./pages/recipeList";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Header_chef from "./pages/chef-pages/header";
import UserReg from "./components/UserReg"; // Update the path as per your file structure

import { ContextProvider } from "./components/contextProvider";
import { ThemeProvider } from "@material-tailwind/react";
import AboutUs from "./pages/aboutUs";
import ContactUs from "./pages/contactUs";
import RecipeDetailPage from "./pages/recipeDetailPage";
function App() {
  return (
    <>
      <ThemeProvider>
        <ContextProvider>
          <Header />

          <Routes>
            <Route path="/RecipeDishList" element={<RecipeDishList />} />

            <Route path="/" element={<Home />} />
            <Route path="/register" element={<UserReg />} />
            <Route path="/UserReg" element={<userReg />} />
            <Route path="/DishCard" element={<DishCard />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
          </Routes>
          <Footer />
        </ContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
