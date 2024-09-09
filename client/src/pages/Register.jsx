import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Cookies from "js-cookie";
import CartSidebar from "../components/sidebarcart"
const Register = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleOpen = () => setOpen(!open);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          name,
          gender,
          email,
          password,
        }
      );

      const { message, token } = response.data;

      setSuccess(message);
      setError("");

      handleOpen();
      localStorage.setItem("token", token);
      console.log(token);


      navigate("/", { state: { token } });


    } catch (err) {
      setError(err.response?.data.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <>
      <div className="font-serif">
        <Button
          className="bg-gradient-to-b from-[#c98d83] to-[#fdf2f0] text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
          onClick={handleOpen}
        >
          Sign Up as a User
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
                <span className="text-6xl mb-6 animate-bounce">👤</span>
                <h2 className="text-4xl font-bold mb-4 font-serif">
                  Join Us as a User
                </h2>
                <p className="text-lg text-center font-serif">
                  Discover amazing culinary experiences
                </p>
              </div>
              <div className="bg-white p-8 md:w-1/2">
                <form onSubmit={handleSubmit} className="space-y-6 font-serif">
                  <Input
                    size="lg"
                    label="Full Name"
                    color="orange"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
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
                  <div className="text-right font-serif">
                    <p className="text-sm text-gray-600">
                      Already have an account?
                    </p>
                    <Login />
                  </div>
                  <Button
                    type="submit"
                    className="font-serif bg-gradient-to-b from-[#c98d83] to-[#fdf2f0] w-full"
                  >
                    Create Account
                  </Button>
                </form>
                {error && <p className="mt-4 text-red-600">{error}</p>}
                {success && <p className="mt-4 text-green-600">{success}</p>}
              </div>
            </div>
          </DialogBody>
        </Dialog>
      </div>
    </>
  );
};

export default Register;
