// import { useContext } from "react";
// import { Context } from "../contextProvider";
// import {
//   Button,
//   Dialog,
//   DialogBody,
//   Input,
//   Typography,
// } from "@material-tailwind/react";
// import axiosInstance from "../../utils/axios";
// import { useState } from "react";
// import chefHat from "../../assets/chefHat.png";
// import useLoginHooks from "../../hooks/LoginSignupHooks/LoginHooks";
// export const Login = () => {
//   const [email, setEmail] = useContext(Context).email;
//   const [password, setPassword] = useContext(Context).password;
//   const [isLogin, setLogin] = useContext(Context).isLogin;
//   const [open, setOpen] = useContext(Context).isOpen;
//   const { handleLogin } = useLoginHooks();

//   return (
//     <>
//       <div className="flex flex-col justify-center items-center w-full ">
//         <div className="text-white text-[3rem] w-full flex flex-col items-center justify-center">
//           <div className="flex gap-5 justify-center items-center w-full mb-10 mt-10">
//             <img src={chefHat} className="w[3rem] rotate-12 h-[3rem]" alt="" />
//             Login
//             <span className="text-[1.2rem]">Chef</span>
//           </div>
//         </div>
//         <div className="flex justify-center items-center    ">
//           <form className="flex flex-col gap-10 w-[30rem]">
//             <Input
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//               size="lg"
//               label="Email"
//               color="white"
//             />
//             <Input
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//               type="password"
//               size="lg"
//               label="Password"
//               color="white"
//             />
//             <div className="flex flex-col justify-center items-end">
//               <p className="text-[1rem]">Dont have an account?</p>
//               <p
//                 className="text-[0.8rem] cursor-pointer"
//                 onClick={() => {
//                   setLogin(false);
//                 }}
//               >
//                 Click here to register
//               </p>
//             </div>

//             <Button onClick={handleLogin} color="white">
//               Login
//             </Button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

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
    <div className="flex flex-col md:flex-row h-full">
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
            <a href="#" className="text-sm text-[#c98d83] hover:underline">
              Forgot password?
            </a>
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
            className="bg-gradient-to-b from-[#c98d83] to-[#fdf2f0] w-full py-3 text-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};
