import { useContext } from "react";
import { Context } from "../contextProvider";
import {
  Button,
  Dialog,
  DialogBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import axiosInstance from "../../utils/axios";
import { useState } from "react";
import chefHat from "../../assets/chefHat.png";
import useSignupHooks from "../../hooks/LoginSignupHooks/SignupHooks";
export const Login = () => {
  const [email, setEmail] = useContext(Context).email;
  const [password, setPassword] = useContext(Context).password;
  const [isLogin, setLogin] = useContext(Context).isLogin;
  const [open, setOpen] = useContext(Context).isOpen;
  const { handleSignup } = useSignupHooks();

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full ">
        <div className="text-white text-[3rem] w-full flex flex-col items-center justify-center">
          <div className="flex gap-5 justify-center items-center w-full mb-10 mt-10">
            <img src={chefHat} className="w[3rem] rotate-12 h-[3rem]" alt="" />
            Login
            <span className="text-[1.2rem]">Chef</span>
          </div>
        </div>
        <div className="flex justify-center items-center    ">
          <form className="flex flex-col gap-10 w-[30rem]">
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              size="lg"
              label="Email"
              color="white"
            />
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              size="lg"
              label="Password"
              color="white"
            />
            <div className="flex flex-col justify-center items-end">
              <p className="text-[1rem]">Dont have an account?</p>
              <p
                className="text-[0.8rem] cursor-pointer"
                onClick={() => {
                  setLogin(false);
                }}
              >
                Click here to register
              </p>
            </div>

            <Button onClick={handleSignup} color="white">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
