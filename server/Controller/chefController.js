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
