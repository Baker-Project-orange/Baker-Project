import React, { useContext } from "react";
import { Context } from "../contextProvider";
import { Button, Input } from "@material-tailwind/react";
import useLoginHooks from "../../hooks/LoginSignupHooks/LoginHooks";
import chefHat from "../../assets/chefHat.png";

export const Login = () => {
  const [email, setEmail] = useContext(Context).email;
  const [password, setPassword] = useContext(Context).password;
  const [isLogin, setLogin] = useContext(Context).isLogin;
  const { handleLogin } = useLoginHooks();

  return (
    <div className="flex flex-col md:flex-row h-full font-serif">
      <div className="bg-gradient-to-br from-[#c98d83] to-[#fdf2f0] p-8 md:w-1/2 flex flex-col justify-center items-center text-gray-800">
        <img
          src={chefHat}
          className="w-24 h-24 mb-6 animate-bounce"
          alt="Chef Hat"
        />
        <h2 className="text-4xl font-bold mb-4">Welcome Back, Chef!</h2>
        <p className="text-lg text-center">
          Log in to share your culinary expertise
        </p>
      </div>
      <div className="bg-white p-8 md:w-1/2 flex flex-col justify-center">
        <form className="space-y-6 w-full max-w-md mx-auto">
          <Input
            size="lg"
            label="Email"
            color="orange"
            onChange={(e) => setEmail(e.target.value)}
            className="border-[#c98d83] focus:border-[#c98d83]"
          />
          <Input
            type="password"
            size="lg"
            label="Password"
            color="orange"
            onChange={(e) => setPassword(e.target.value)}
            className="border-[#c98d83] focus:border-[#c98d83]"
          />
          <div className="flex flex-col items-end space-y-1">
            {/* <a href="#" className="text-sm text-[#c98d83] hover:underline">
              Forgot password?
            </a> */}
            <p className="text-sm text-gray-600">Don't have an account?</p>
            <button
              type="button"
              className="text-[#c98d83] hover:underline text-sm font-medium"
              onClick={() => setLogin(false)}
            >
              Click here to register
            </button>
          </div>
          <Button
            onClick={handleLogin}
            className="font-serif bg-gradient-to-b from-[#c98d83] to-[#fdf2f0] w-full py-3 text-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};
