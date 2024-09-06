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
  dishData.recipieID = new mongoose.Types.ObjectId(dishData.recipieID);
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

// nubmofdithes
exports.getTotalDishes = async (req, res)=>{
try {
  const totalDishes = await Dish.countDocuments();
  res.status(200).json({totalDishes});

} catch (error){
  res.status(500).json({ message: "Error fetching total dishes", error });
}

}



// Get a dish by ID
exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findOne({
      _id: req.query.id,
      isdeleted: false,
    }).populate("recipie", "dishName");
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};