// import { useContext } from "react";
// import { Context } from "../contextProvider";
// import {
//   Button,
//   Dialog,
//   DialogBody,
//   Input,
//   Typography,
//   DialogFooter,
// } from "@material-tailwind/react";
// import axiosInstance from "../../utils/axios";
// import { useState } from "react";
// import chefHat from "../../assets/chefHat.png";
// import useSignupHooks from "../../hooks/LoginSignupHooks/SignupHooks";
// import { Login } from "./LoginChef";
// export const Signup = () => {
//   const [open, setOpen] = useContext(Context).isOpen;
//   const [name, setName] = useContext(Context).name;
//   const [email, setEmail] = useContext(Context).email;
//   const [password, setPassword] = useContext(Context).password;
//   const [openingTime, setOpening] = useContext(Context).openingTime;
//   const [closingTime, setClosing] = useContext(Context).closingTime;
//   const [chefImage, setChefImage] = useContext(Context).chefImage;
//   const [isLogin, setLogin] = useContext(Context).isLogin;
//   const { handleSignup } = useSignupHooks();
//   const handleOpen = () => {
//     setOpen(!open);
//   };

//   return (
//     <>
//       <Button
//         className="text-[black] w-full "
//         onClick={handleOpen}
//         variant="text"
//         color="black"
//       >
//         Chef
//       </Button>
//       <Dialog
//         className=" w-[30rem] bg-[#D5877A] flex flex-col justify-center "
//         open={open}
//         handler={handleOpen}
//       >
//         <DialogBody className="">
//           {!isLogin ? (
//             <div className="flex flex-col justify-center items-center w-full overflow-y-auto ">
//               <div className="text-white text-[3rem] w-full flex flex-col items-center justify-center">
//                 <div className="flex gap-5 justify-center items-center w-full mb-10 mt-10">
//                   <img
//                     src={chefHat}
//                     className="w[3rem] rotate-12 h-[3rem]"
//                     alt=""
//                   />
//                   Signup
//                   <span className="text-[1.2rem]">Chef</span>
//                 </div>
//               </div>
//               <div className="flex justify-center items-center    ">
//                 <form className="flex flex-col gap-10 w-[30rem]">
//                   <Input
//                     onChange={(e) => {
//                       setName(e.target.value);
//                     }}
//                     size="lg"
//                     label="Full Name"
//                     color="white"
//                   />
//                   <Input
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                     }}
//                     size="lg"
//                     label="Email"
//                     color="white"
//                   />
//                   <Input
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                     }}
//                     size="lg"
//                     type="password"
//                     label="Password"
//                     color="white"
//                   />

//                   <Input
//                     onChange={(e) => {
//                       setOpening(e.target.value);
//                     }}
//                     size="lg"
//                     label="Opening Time"
//                     color="white"
//                   />
//                   <Input
//                     onChange={(e) => {
//                       setClosing(e.target.value);
//                     }}
//                     size="lg"
//                     label="Closing Time"
//                     color="white"
//                   />
//                   <input
//                     onChange={(e) => {
//                       setChefImage(e.target.files[0]);
//                     }}
//                     type="file"
//                     id="overviewPicture"
//                     name="overviewPicture"
//                     className="mt-1 block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-full file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-[#c98d83] file:text-white
//                 hover:file:bg-[#b17c73] bg-white rounded-lg"
//                     accept="image/*"
//                     required
//                   />
//                   <div className="flex flex-col justify-center items-end">
//                     <p className="text-[1rem]">Already have an account?</p>
//                     <p
//                       className="text-[0.8rem] cursor-pointer"
//                       onClick={() => {
//                         setLogin(true);
//                       }}
//                     >
//                       Click here to login
//                     </p>
//                   </div>
//                   <Button onClick={handleSignup} color="white">
//                     Signup
//                   </Button>
//                 </form>
//               </div>
//             </div>
//           ) : (
//             <Login />
//           )}
//         </DialogBody>
//         <DialogFooter>
//           <div className="w-full flex justify-end">
//             <Button onClick={handleOpen} color="red">
//               Close
//             </Button>
//           </div>
//         </DialogFooter>
//       </Dialog>
//     </>
//   );
// };

import React, { useContext } from "react";
import { Context } from "../contextProvider";
import {
  Button,
  Dialog,
  DialogBody,
  Input,
  DialogFooter,
} from "@material-tailwind/react";
import useSignupHooks from "../../hooks/LoginSignupHooks/SignupHooks";
import { Login } from "./LoginChef";
import chefHat from "../../assets/chefHat.png";

export const Signup = () => {
  const [open, setOpen] = useContext(Context).isOpen;
  const [name, setName] = useContext(Context).name;
  const [email, setEmail] = useContext(Context).email;
  const [password, setPassword] = useContext(Context).password;
  const [openingTime, setOpening] = useContext(Context).openingTime;
  const [closingTime, setClosing] = useContext(Context).closingTime;
  const [chefImage, setChefImage] = useContext(Context).chefImage;
  const [isLogin, setLogin] = useContext(Context).isLogin;
  const { handleSignup } = useSignupHooks();

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        className="bg-gradient-to-b from-[#c98d83] to-[#fdf2f0] text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
        onClick={handleOpen}
      >
        Sign Up as a Chef
      </Button>
      <Dialog
        className="rounded-2xl overflow-hidden"
        open={open}
        handler={handleOpen}
        size="xl"
      >
        <DialogBody className="p-0">
          {!isLogin ? (
            <div className="flex flex-col md:flex-row">
              <div className="bg-gradient-to-br from-[#c98d83] to-[#fdf2f0] p-8 md:w-1/2 flex flex-col justify-center items-center text-gray-800">
                <img
                  src={chefHat}
                  className="w-24 h-24 mb-6 animate-bounce"
                  alt="Chef Hat"
                />
                <h2 className="text-4xl font-bold mb-4">Join Us as a Chef</h2>
                <p className="text-lg text-center">
                  Share your culinary skills with the world
                </p>
              </div>
              <div className="bg-white p-8 md:w-1/2">
                <form className="space-y-6">
                  <Input
                    size="lg"
                    label="Full Name"
                    color="orange"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    size="lg"
                    label="Email"
                    color="orange"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    size="lg"
                    type="password"
                    label="Password"
                    color="orange"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    size="lg"
                    label="Opening Time"
                    color="orange"
                    onChange={(e) => setOpening(e.target.value)}
                  />
                  <Input
                    size="lg"
                    label="Closing Time"
                    color="orange"
                    onChange={(e) => setClosing(e.target.value)}
                  />
                  <div className="relative">
                    <input
                      type="file"
                      id="chefImage"
                      className="hidden"
                      onChange={(e) => setChefImage(e.target.files[0])}
                      accept="image/*"
                    />
                    <label
                      htmlFor="chefImage"
                      className="cursor-pointer bg-orange-100 text-orange-700 py-2 px-4 rounded-lg inline-flex items-center transition duration-300 hover:bg-orange-200"
                    >
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Choose Chef Image
                    </label>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Already have an account?
                    </p>
                    <button
                      type="button"
                      className="text-orange-500 hover:underline"
                      onClick={() => setLogin(true)}
                    >
                      Click here to log in
                    </button>
                  </div>
                  <Button
                    onClick={handleSignup}
                    className="bg-gradient-to-b from-[#c98d83] to-[#fdf2f0] w-full"
                  >
                    Create Account
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <Login />
          )}
        </DialogBody>
        <DialogFooter className="justify-end">
          <Button onClick={handleOpen} color="red" ripple="light">
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
