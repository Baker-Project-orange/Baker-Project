import { Routes, Route } from "react-router-dom";
import "./pages/chef-pages/animations.css";
import DishCard from "./pages/distCard";
import RecipeDishList from "./pages/recipeList";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Header_chef from "./pages/chef-pages/header";
import User_profile from "./pages/user-pages/home";
import Header_user from "./pages/user-pages/header";
import Register from './pages/Register'
import UserReg from "./components/UserReg"; // Update the path as per your file structure
import Login from './components/Login';
import AdminLogin from './pages/AdminLogin';

import AdminRegister from './pages/AdminRegister';

import { ContextProvider } from "./components/contextProvider";
import { ThemeProvider } from "@material-tailwind/react";
function App() {
  return (
    <>
      <ThemeProvider>
        <ContextProvider>
          <Header />
          {/* <Header_user /> */}

          <Routes>
            {/* <Route path="/RecipeDishList" element={<RecipeDishList />} /> */}
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />

            <Route path="/AdminRegister" element={<AdminRegister />} />

            <Route path="/" element={<Home />} />
            <Route path="/register" element={<UserReg />} />
            {/* <Route path="/UserReg" element={<userReg />} /> */}
            <Route path="/DishCard" element={<DishCard />} />
            {/* <Route path="/user-profile" element={<User_profile />} /> */}

            <Route path="/user-profile" element={<Header_user />} />

            {/* <Route path="/chef-profile" element={<Header_chef />} /> */}
          </Routes>
          <Footer />
        </ContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
