import { useContext } from "react";
import { Context } from "../../components/contextProvider";
import axiosInstance from "../../utils/axios";

const useSignupHooks = () => {
  const [name, setName] = useContext(Context).name;
  const [email, setEmail] = useContext(Context).email;
  const [password, setPassword] = useContext(Context).password;
  const [openingTime, setOpening] = useContext(Context).openingTime;
  const [closingTime, setClosing] = useContext(Context).closingTime;
  const [chefImage, setChefImage] = useContext(Context).chefImage;
  const [isLoggedIn, setLoggedIn] = useContext(Context).isLoggedIn;
  const [open, setOpen] = useContext(Context).isOpen;
  const [isChef, setChef] = useContext(Context).isChef;
  const handleSignup = async (e) => {
    e.preventDefault;
    console.log(email);

    try {
      const response = await axiosInstance.post("/api/chefs/registerChef", {
        name: name,
        email: email,
        password: password,
        openingTime: openingTime,
        closingTime: closingTime,
        file: chefImage,
        notifications: [],
      });
      if (response) {
        console.log(response.data);
        sessionStorage.setItem(
          "chefLogin",
          JSON.stringify({ isLoggedIn: true, isChef: true })
        );
        setLoggedIn(true);
        setChef(true);
        setOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return { handleSignup: handleSignup };
};

export default useSignupHooks;
