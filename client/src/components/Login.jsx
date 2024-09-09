import React, { useState } from "react";
import { Button, Dialog, DialogBody, Input } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Register from "../pages/Register";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOpen = () => setOpen(!open);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password },
        { withCredentials: true }
      );
      setError("");
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
      <div className="font-serif">
        <Button
          className="bg-gradient-to-b from-[#c98d83] to-[#fdf2f0] text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
          onClick={handleOpen}
        >
          Login
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
                  Welcome Back
                </h2>
                <p className="text-lg text-center font-serif">
                  Login to access your culinary journey
                </p>
              </div>
              <div className="bg-white p-8 md:w-1/2">
                <form onSubmit={handleSubmit} className="space-y-6 font-serif">
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
                      Don't have an account?
                    </p>
                    <Register />
                  </div>
                  <Button
                    type="submit"
                    className="font-serif bg-gradient-to-b from-[#c98d83] to-[#fdf2f0] w-full text-gray-800"
                  >
                    Login
                  </Button>
                </form>
                {error && <p className="mt-4 text-red-600">{error}</p>}
              </div>
            </div>
          </DialogBody>
        </Dialog>
      </div>
    </>
  );
};

export default Login;
