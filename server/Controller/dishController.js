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

exports.makeDish=(req,res)=>{
const dishData=req.body;

}

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
