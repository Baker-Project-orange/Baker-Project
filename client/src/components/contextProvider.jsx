import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";
import React, { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const chefLogin = JSON.parse(sessionStorage.getItem("chefLogin")) || {};
  const [isChef, setChef] = useState(chefLogin.isChef || false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openingTime, setOpening] = useState("");
  const [closingTime, setClosing] = useState("");
  const [chefImage, setChefImage] = useState("");
  const [isLogin, setLogin] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(chefLogin.isLoggedIn || false);
  const [open, setOpen] = useState(false);
  const [dishName, setDish] = useState("");
  const [recipeOverview, setRecipe] = useState("");
  const [ingrediants, setIngrediants] = useState([]);
  const [steps, setSteps] = useState([]);
  const [duration, setDuration] = useState("");
  const [overviewPicture, setOverviewPicture] = useState("");
  const [category, setCategory] = useState("");
  const [dishDescription, setDescription] = useState("");
  const [dishPictures, setDishPictures] = useState([]);
  const [price, setPrice] = useState("");
  const [includesDish, setIncludesDish] = useState(false);
  const [recipeID, setRecipeID] = useState(
    sessionStorage.getItem("recipeID") || ""
  );
  const [active_tab, set_active_tab] = useState(
    sessionStorage.getItem("tab") || "home"
  );
  return (
    <Context.Provider
      value={{
        isChef: [isChef, setChef],
        name: [name, setName],
        email: [email, setEmail],
        password: [password, setPassword],
        openingTime: [openingTime, setOpening],
        closingTime: [closingTime, setClosing],
        chefImage: [chefImage, setChefImage],
        isLogin: [isLogin, setLogin],
        isLoggedIn: [isLoggedIn, setLoggedIn],
        isOpen: [open, setOpen],
        dishName: [dishName, setDish],
        recipeOverview: [recipeOverview, setRecipe],
        ingrediants: [ingrediants, setIngrediants],
        steps: [steps, setSteps],
        duration: [duration, setDuration],
        overviewPicture: [overviewPicture, setOverviewPicture],
        category: [category, setCategory],
        dishPictures: [dishPictures, setDishPictures],
        dishDescription: [dishDescription, setDescription],
        price: [price, setPrice],
        includesDish: [includesDish, setIncludesDish],
        recipeID: [recipeID, setRecipeID],
        active_tab: [active_tab, set_active_tab],
      }}
    >
      {children}
    </Context.Provider>
  );
};
