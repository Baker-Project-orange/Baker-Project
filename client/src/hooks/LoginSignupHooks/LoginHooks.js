import { useContext } from "react";
import { Context } from "../../components/contextProvider";
import axiosInstance from "../../utils/axios";

const useLoginHooks = () => {
  const [email, setEmail] = useContext(Context).email;
  const [password, setPassword] = useContext(Context).password;
  const [isLoggedIn, setLoggedIn] = useContext(Context).isLoggedIn;
  const [isChef, setChef] = useContext(Context).isChef;
  const [open, setOpen] = useContext(Context).isOpen;
  const handleLogin = async (e) => {
    e.preventDefault;
    console.log(email);

    try {
      const response = await axiosInstance.post("/api/chefs/loginChef", {
        email: email,
        password: password,
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
  return { handleLogin };
};
export default useLoginHooks;
