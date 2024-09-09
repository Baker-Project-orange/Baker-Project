import React, { useState } from "react";
import axios from "axios";
import { Button, Dialog, DialogBody, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import chefHat from "../assets/chefHat.png"; // استخدم نفس الصورة لجعل النمط مشابهًا
import AdminLogin from "./AdminLogin";


const AdminRegister = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleOpen = () => setOpen(!open);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admins/register",
        { name, email, password }
      );
      setMessage(response.data.message);
      navigate("/Adminlogin");
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error");
    }
  };

  return (
    <>
      <div className="font-serif">
        <Button
          className="bg-gradient-to-b from-[#c98d83] to-[#fdf2f0] text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
          onClick={handleOpen}
        >
          Register as Admin
        </Button>
        <Dialog
          className="rounded-2xl overflow-hidden"
          open={open}
          handler={handleOpen}
          size="xl"
        >
          <DialogBody className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="bg-gradient-to-br from-[#c98d83] to-[#fdf2f0] p-8 md:w-1/2 flex flex-col justify-center items-center text-gray-800">
                <span className="text-6xl mb-6 animate-bounce">👨‍💼</span>
                <h2 className="text-4xl font-bold mb-4 font-serif">
                  Join as Admin
                </h2>
                <p className="text-lg text-center font-serif">
                  Register to manage and oversee the culinary platform
                </p>
              </div>
              <div className="bg-white p-8 md:w-1/2">
                <form
                  onSubmit={handleRegister}
                  className="space-y-6 font-serif"
                >
                  <Input
                    size="lg"
                    label="Full Name"
                    color="orange"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    size="lg"
                    label="Email"
                    color="orange"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    size="lg"
                    type="password"
                    label="Password"
                    color="orange"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    className="font-serif bg-gradient-to-b from-[#c98d83] to-[#fdf2f0] w-full text-gray-800"
                  >
                    Register as Admin
                  </Button>
                </form>
                {message && <p className="mt-4 text-green-600">{message}</p>}
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-100 text-black py-2 px-4 rounded-md shadow-sm hover:bg-orange-100"
              >
                Register
              </Button>
            </form>

            {message && <p className="mt-4 text-green-600">{message}</p>}
            <p className="mt-4 text-center">
              Already have an account? <AdminLogin />
            </p>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleOpen} color="red">
            Close
          </Button>
        </DialogFooter>
      </Dialog>

    </>
  );
};

export default AdminRegister;
