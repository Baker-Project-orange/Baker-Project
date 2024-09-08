import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import chefHat from "../assets/chefHat.png";
import Login from "../components/Login";
import Cookies from "js-cookie";

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

      // Close the dialog after successful registration
      handleOpen();

      // Store the token in localStorage
      localStorage.setItem("token", token);
      console.log(token);
      // Redirect to the desired page after successful registration
      navigate("/Home", token);
    } catch (err) {
      setError(err.response?.data.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="bg-white text-black px-4 py-2 rounded-md"
      >
        User
      </Button>

      <Dialog open={open} onClose={handleOpen} size="lg">
        <DialogBody>
          <div className="p-6 bg-[#c98d83] rounded-lg shadow-md">
            <img
              src={chefHat}
              className="w-[3rem] rotate-12 h-[3rem] mx-auto"
              alt="Chef Hat"
            />

            <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
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

            {error && <p className="mt-4 text-red-600">{error}</p>}
            {success && <p className="mt-4 text-green-600">{success}</p>}

            <p className="mt-4 text-center">
              Already have an account? <Login />
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

export default Register;
