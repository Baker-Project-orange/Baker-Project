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
// ------------------------
exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find()
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
// ------------------------------

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
// ------------
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
// -----------

// -------------
// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Store token in cookies
    res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// -------------

// -----------
// Update user by ID
exports.updateUserById = async (req, res) => {
  try {
    // الحصول على ID المستخدم من معلمات الطلب
    const userId = req.params.id;
    const updatedData = req.body;

    // تحقق من وجود بيانات للتحديث
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: 'No data provided for update' });
    }

    // تحديث بيانات المستخدم بناءً على الـ ID
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true });

    // تحقق من وجود المستخدم
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error); // تسجيل الأخطاء للتشخيص
    res.status(500).json({ message: 'Error updating user', error });
  }
};
// -----------------

// ==================================================================================
// ------------------
// Get orders by user ID
exports.getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.id;  // الحصول على ID المستخدم من معلمات الطلب

    // العثور على المستخدم
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // العثور على الطلبات الخاصة بالمستخدم
    const orders = await Order.find({ orderMaker: userId }).populate('orderItems.dish'); // يمكنك إضافة populate إذا كنت بحاجة إلى تفاصيل إضافية

    // إذا لم تكن هناك طلبات، إرجاع رسالة مناسبة
    if (orders.length === 0) return res.status(404).json({ message: "No orders found for this user" });

    res.status(200).json({ orders });  // إرجاع الطلبات كاستجابة
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};
// ------------------

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from request parameters

    // Find orders based on orderMaker
    const orders = await Order.find({ orderMaker: userId });

    // Respond with orders
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
};
// ------------------


// Controller function to add an order
exports.addOrder = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from request parameters
    const { orderItems, totalPrice, totalChefAmount, totalAdminAmount, orderDetails } = req.body; // Extract order details from request body

    // Validate order details
    if (!orderItems || !totalPrice) {
      return res.status(400).json({ message: 'Order items and total price are required' });
    }

    // Create a new order instance
    const newOrder = new Order({
      orderMaker: userId, // Associate the order with the user
      orderItems,
      totalPrice,
      totalChefAmount,
      totalAdminAmount,
      orderDetails
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ message: 'Order added successfully', order: newOrder });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ message: 'Error adding order', error: error.message });
  }
};
// --------------

exports.addFavoriteRecipe = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    const user = await User.findById(userId);
    const recipe = await Recipie.findById(recipeId);

    if (!user) {
      console.error('User not found:', userId);
      return res.status(404).json({ message: "User not found" });
    }

    if (!recipe) {
      console.error('Recipe not found:', recipeId);
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (user.favoraiteRecipie.includes(recipeId)) {
      return res.status(400).json({ message: "Recipe is already in favorites" });
    }

    user.favoraiteRecipie.push(recipeId);
    await user.save();

    res.status(200).json({ message: "Recipe added to favorites successfully" });
  } catch (error) {
    console.error("Error adding recipe to favorites:", error.message);
    res.status(500).json({ message: "Error adding recipe to favorites", error: error.message });
  }
};
// ------------------

exports.getFavoriteRecipes = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate({
      path: 'favoraiteRecipie',
      select: 'dishName recipeOverview overviewPicture duration category', // حدد الحقول التي تريد إرجاعها
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favoriteRecipes = user.favoraiteRecipie;

    res.status(200).json({ favoriteRecipes });
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    res.status(500).json({ message: "Error fetching favorite recipes", error: error.message });
  }
};
// -----------------------
// ==========================================================================

// num of users
exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total users", error });
  }
};