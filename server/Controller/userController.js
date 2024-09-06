const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const Order = require('../Models/Orders'); // Adjust the path as necessary
const Recipie = require("../Models/Recipies");// Required modules and Admin model
const Admin = require('../Models/Admin'); // Adjust the path if necessary

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find()
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};


// Update user by ID

exports.userToggleActive = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    user.isActive = !user.isActive;
    await user.save();
    res.status(200).json({ message: "User status updated successfully." });
  } catch (error) {
    console.error("Error in userToggleActive controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Register User
exports.registerUser = async (req, res) => {
  const { name, gender, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      gender,
      email,
      password: hashedPassword,
      isActive: true,
    });

    await newUser.save();

    // Create a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in a cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Set the token in a cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
  try {
    // الحصول على ID المستخدم من معلمات الطلب
    const userId = req.params.id;
    const updatedData = req.body;

    // تحديث بيانات المستخدم بناءً على الـ ID
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};
// Get orders by user ID
exports.getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.id;  // الحصول على ID المستخدم من معلمات الطلب

    // العثور على المستخدم
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // العثور على الطلبات الخاصة بالمستخدم
    const orders = await Order.find({ orderMaker: userId });
    
    res.status(200).json(orders);  // إرجاع الطلبات كاستجابة
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// وظيفة لجلب الطلبات الخاصة بالمستخدم
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId; // جلب ID المستخدم من الطلب (من الـ URL parameter)

    // البحث عن الطلبات بناءً على userId
    const orders = await Order.find({ user_id: userId });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
};


// Add Order for a User
exports.addOrder = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from request parameters
    const { items, totalAmount, status } = req.body; // Extract order details from request body

    // Validate order details
    if (!items || !totalAmount || !status) {
      return res.status(400).json({ message: 'Order items, total amount, and status are required' });
    }

    // Create a new order instance
    const newOrder = new Order({
      user_id: userId, // Associate the order with the user
      items,
      totalAmount,
      status
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ message: 'Order added successfully', order: newOrder });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ message: 'Error adding order', error: error.message });
  }
};

exports.addFavoriteRecipe = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    // Check if the user and recipe exist
    const user = await User.findById(userId);
    const recipe = await Recipie.findById(recipeId);

    if (!user || !recipe) {
      return res.status(404).json({ message: "User or recipe not found" });
    }

    // Check if the recipe is already in the favorites
    if (user.favoraiteRecipie.includes(recipeId)) {
      return res.status(400).json({ message: "Recipe is already in favorites" });
    }

    // Add the recipe to the favorites
    user.favoraiteRecipie.push(recipeId);
    await user.save();

    res.status(200).json({ message: "Recipe added to favorites successfully" });
  } catch (error) {
    console.error("Error adding recipe to favorites:", error);
    res.status(500).json({ message: "Error adding recipe to favorites" });
  }
};


// num of users
exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total users", error });
  }
};