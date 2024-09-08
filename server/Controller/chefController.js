const Chef = require("../Models/Chef");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const { default: mongoose } = require("mongoose");

exports.registerChef = async (req, res) => {
  const chefData = req.body;
  chefData.license = req.url;
  console.log(chefData);
  try {
    const chef = new Chef({ ...chefData, _id: new mongoose.Types.ObjectId() });
    chef.password = bcrypt.hashSync(chef.password, 10);

    await chef.save();
    const token = generateToken(chef._id.toString());
    console.log(chef);
    const cookieOptions = {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
      secure: true,
    };
    res.cookie("token", token, cookieOptions);
    return res
      .status(201)
      .json({ message: "User registerd successfully ", chef: chef });
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};

exports.loginChef = async (req, res) => {
  const chefCredentials = req.body;
  try {
    const chef = await Chef.findOne(
      { email: chefCredentials.email },
      "email password _id"
    );
    if (!bcrypt.compare(chefCredentials.password, chef.password)) {
      res.status(401).json({ message: "Unautorized invalid credentials" });
    } else {
      const token = generateToken(chef._id.toString());
      const options = {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      res.cookie("token", token, options);
      res
        .status(201)
        .json({ message: "user logged in successfully", chef: chef });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};

exports.get_chef = async (req, res) => {
  const chefID = req.user;
  // console.log(chef_id);
  try {
    const chefData = await Chef.findById(chefID);
    if (chefData) {
      // console.log('User found:', chefData);
      res.json(chefData);
    } else {
      console.log("User not found");
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error("Error retrieving user:", err);
    res.status(500).send("Error retrieving user");
  }
};

exports.update_chef = async (req, res) => {
  const chef_id=req.user;
  const chefInfo = req.body;
  try {
    const updatedChef = await Chef.findByIdAndUpdate(
      chef_id,
      { $set: chefInfo }, 
      { new: true, runValidators: true }
    );

    if (updatedChef) {
      console.log("Chef updated successfully");
      res.json(updatedChef);
    } else {
      console.log("Chef not found");
      res.status(404).send("Chef not found");
    }
  } catch (err) {
    console.error("Error updating chef:", err);
    res.status(500).send("Error updating chef");
  }
};


// ----------------------
// getchefs
exports.getAllChefs = async (req, res) => {
  try {
    const chefs = await Chef.find(); // Fetch all chefs from the database
    if (!chefs || chefs.length === 0) {
      return res.status(404).json({ message: "No chefs found" });
    }
    res.status(200).json(chefs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
// ----------------------------

// Assuming you have a Chef model imported
exports.chefToggleActive = async (req, res) => {
  try {
    const { id } = req.params;
    const chef = await Chef.findById(id);
    if (!chef) return res.status(404).json({ message: "Chef not found." });
    chef.isActive = !chef.isActive;
    await chef.save();
    res.status(200).json({ message: "Chef status updated successfully." });
  } catch (error) {
    console.error("Error in chef controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
// --------------------------