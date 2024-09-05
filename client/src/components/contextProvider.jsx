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
      }}
    >
      {children}
    </Context.Provider>
  );
};
