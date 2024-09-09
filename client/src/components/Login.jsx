// Import the necessary hooks and dependencies
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  Input,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import chefHat from "../assets/chefHat.png";
import Register from "../pages/Register";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleOpen = () => setOpen(!open);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      ); // Enable cookies

      // Handle successful login: clear errors and redirect
      setError("");

      // Store user data in local storage or context if needed
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem("token", response.data.token);

      // Redirect to the Home page after successful login
      navigate("/"); // Replace '/Home' with the path you want to navigate to
      handleOpen(); // Close the dialog
    } catch (err) {
      setError(err.response?.data.message || "Login failed");
    }
  };

  return (
    <>
      {/* Button to open the login popup */}
      <Button
        onClick={handleOpen}
        className="bg-[#c98d83] text-black px-4 py-2 rounded-md"
      >
        Login
      </Button>

      {/* Dialog for login popup */}
      <Dialog open={open} onClose={handleOpen} size="lg">
        <DialogBody>
          <div className="p-6 bg-[#c98d83] rounded-lg shadow-md">
            <img src={chefHat} className="w-[3rem] rotate-12 h-[3rem]" alt="" />

            <h1 className="text-2xl font-bold mb-4">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Input
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-100 text-black py-2 px-4 rounded-md shadow-sm hover:bg-orange-100"
              >
                Login
              </Button>
            </form>

            {error && <p className="mt-4 text-red-600">{error}</p>}

            <p className="mt-4 text-center">
              Don't have an account? <Register />
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

export default Login;
