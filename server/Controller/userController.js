const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bcrypt = require("bcryptjs");
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
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Google Authentication
exports.googleAuth = (req, res) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`;
  res.redirect(googleAuthUrl);
};

// Google Callback
exports.googleAuthCallback = async (req, res) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const userInfoResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    );
    const userInfo = userInfoResponse.data;

    let user = await User.findOne({ googleId: userInfo.sub });
    if (!user) {
      user = new User({
        googleId: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        isActive: true,
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    res.send(
      `<h1>Welcome, ${user.name}!</h1><p>You have successfully registered using Google.</p>`
    );
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    res.status(500).json({ message: "Error during Google Sign-In" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    res
      .status(200)
      .json({
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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