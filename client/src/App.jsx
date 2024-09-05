import { Routes, Route } from "react-router-dom";
import "./pages/chef-pages/animations.css";
import DishCard from "./pages/distCard";
import RecipeDishList from "./pages/recipeList";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chef_Manager from "./pages/chef-pages/ChefMain";

import UserReg from "./components/UserReg"; // Update the path as per your file structure

import { ContextProvider } from "./components/contextProvider";
import { ThemeProvider } from "@material-tailwind/react";
function App() {
  return (
    <>
      <ThemeProvider>
        <ContextProvider>
          <Header />

          <Routes>
            <Route path="/RecipeDishList" element={<RecipeDishList />} />
            <Route path="/ChefProfile" element={<Chef_Manager />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<UserReg />} />
            <Route path="/UserReg" element={<userReg />} />
            <Route path="/DishCard" element={<DishCard />} />
          </Routes>
          <Footer />
        </ContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
