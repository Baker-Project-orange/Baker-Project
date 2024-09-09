import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogBody,
  Input,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import chefHat from "../assets/chefHat.png";
import AdminRegister from "./AdminRegister"; // Adjust the import based on your folder structure

const AdminLogin = () => {
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
        "http://localhost:3000/api/admins/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setError("");
      localStorage.setItem("adminToken", response.data.token);
      navigate("/dashboard"); // Redirect to admin dashboard or another page
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
        Admin Login
      </Button>

      {/* Dialog for login popup */}
      <Dialog open={open} onClose={handleOpen} size="lg">
        <DialogBody>
          <div className="p-6 bg-[#c98d83] rounded-lg shadow-md">
            <img
              src={chefHat}
              className="w-[3rem] rotate-12 h-[3rem]"
              alt="Chef Hat"
            />

            <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

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
              Don't have an account? <AdminRegister />{" "}
              {/* Link to registration */}
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

export default AdminLogin;
