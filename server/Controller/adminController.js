const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const Admin = require('../Models/Admin'); // Adjust the path if necessary


// Controller for registering a new admin
exports.registerAdmin = async (req, res) => {
  const {name,email, password } = req.body;

  try {
    // Check if the admin already exists using the email
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Existing Admin:', existingAdmin);
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin instance
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new admin to the database
    await newAdmin.save();

    // Create a JWT token for the admin
    const token = jwt.sign({ adminId: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in a cookie for security
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour

    // Send a success response
    res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body; // Changed to email to match the frontend
  
    try {
      // Find the admin using the email
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
  
      // Check the password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
  
      // Create the JWT
      const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
      });
  
      // Respond with the token
      res.json({ token, message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };