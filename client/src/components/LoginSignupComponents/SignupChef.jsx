import { useContext } from "react";
import { Context } from "../contextProvider";
import {
  Button,
  Dialog,
  DialogBody,
  Input,
  Typography,
  DialogFooter,
} from "@material-tailwind/react";
import axiosInstance from "../../utils/axios";
import { useState } from "react";
import chefHat from "../../assets/chefHat.png";
import useSignupHooks from "../../hooks/LoginSignupHooks/SignupHooks";
import { Login } from "./LoginChef";
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
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        className="text-[black] w-full "
        onClick={handleOpen}
        variant="text"
        color="black"
      >
        Chef
      </Button>
      <Dialog
      
        className=" w-[30rem] bg-[#D5877A] flex flex-col justify-center "
        open={open}
        handler={handleOpen}
      >
        <DialogBody className="">
          {!isLogin ? (
            <div className="flex flex-col justify-center items-center w-full overflow-y-auto ">
              <div className="text-white text-[3rem] w-full flex flex-col items-center justify-center">
                <div className="flex gap-5 justify-center items-center w-full mb-10 mt-10">
                  <img
                    src={chefHat}
                    className="w[3rem] rotate-12 h-[3rem]"
                    alt=""
                  />
                  Signup
                  <span className="text-[1.2rem]">Chef</span>
                </div>
              </div>
              <div className="flex justify-center items-center    ">
                <form className="flex flex-col gap-10 w-[30rem]">
                  <Input
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    size="lg"
                    label="Full Name"
                    color="white"
                  />
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
                    size="lg"
                    type="password"
                    label="Password"
                    color="white"
                  />

                  <Input
                    onChange={(e) => {
                      setOpening(e.target.value);
                    }}
                    size="lg"
                    label="Opening Time"
                    color="white"
                  />
                  <Input
                    onChange={(e) => {
                      setClosing(e.target.value);
                    }}
                    size="lg"
                    label="Closing Time"
                    color="white"
                  />
                  <input
                    onChange={(e) => {
                      setChefImage(e.target.files[0]);
                    }}
                    type="file"
                    id="overviewPicture"
                    name="overviewPicture"
                    className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-[#c98d83] file:text-white
                hover:file:bg-[#b17c73] bg-white rounded-lg"
                    accept="image/*"
                    required
                  />
                  <div className="flex flex-col justify-center items-end">
                    <p className="text-[1rem]">Already have an account?</p>
                    <p
                      className="text-[0.8rem] cursor-pointer"
                      onClick={() => {
                        setLogin(true);
                      }}
                    >
                      Click here to login
                    </p>
                  </div>
                  <Button onClick={handleSignup} color="white">
                    Signup
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <Login />
          )}
        </DialogBody>
        <DialogFooter>
          <div className="w-full flex justify-end">
            <Button onClick={handleOpen} color="red">
              Close
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};
