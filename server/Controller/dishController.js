const { default: mongoose } = require("mongoose");
const Dish = require("../Models/Dish");


exports.deleteDish = async (req, res) => {
  const chefID = req.user;
  const dishID = req.body;
  try {
    await Dish.findByIdAndUpdate(dishID, { isDeleted: true });
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};

exports.makeDish = async (req, res) => {
  const dishData = req.body;
  const chefID = req.user;
  dishData.recipieID = new mongoose.Types.ObjectId(dishData.recipieID);
  dishData.authorID = new mongoose.Types.ObjectId(chefID);
  try {
    const dish = new Dish({ _id: new mongoose.Types.ObjectId(), ...dishData });
    await dish.save();
    res.status(201).json({ message: "dish made successfully", dish: dish });
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};

// Get all dishes
exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate("recipieID").exec();
    res.json(dishes);
  } catch (err) {
    console.error("Error in getAllDishes:", err);
    res.status(500).send("Internal Server Error");
  }
};

//get Chef Dishes
exports.getChefDishes = async (req, res) => {
  const chefID = req.user;

  // console.log("inside get dishes controller");
  try {
    const dishes = await Dish.find({ authorID: chefID }).populate([
      "authorID",
      "recipieID",
    ])
    .catch(err => {console.log(err)});
    // console.log(dishes);

    if (!dishes) {
      res.status(204).json({ message: "No dishes found", dishes: [] });
    } else {
      res
        .status(200)
        .json({ message: "Dishes found successfully ", dishes: dishes });
    }
  } catch (e) {
    res.status(501).json({ message: "Internal server error", error: e });
  }
};
// -----------------------
// nubmofdithes
exports.getTotalDishes = async (req, res) => {
  try {
    const totalDishes = await Dish.countDocuments();
    res.status(200).json({ totalDishes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total dishes", error });
  }
};

// -----------------------------------
// Get a dish by ID
exports.getDishById = async (req, res) => {
  console.log(req.query.id);
  try {
    const dish = await Dish.findOne({
      _id: req.query.id,
      isDeleted: false,
    }).populate("recipieID", "dishName overviewPicture");
    console.log(dish);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// --------
exports.getDishByRecipeID = async (req, res) => {
  const { recipeID } = req.query;
  try {
    const dish = await Dish.findOne({
      recipieID: recipeID,
    }).populate(["recipieID", "authorID"]);
    res.status(200).json({ message: "Dish returned succesfully", dish: dish });
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};

// ------------------------------------
// dish.controller.js aprove
exports.approveDish = async (req, res) => {
  try {
    const { isApproved } = req.body;
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true, runValidators: true }
    );
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ---------------------------------