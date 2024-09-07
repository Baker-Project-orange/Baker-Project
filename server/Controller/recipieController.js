const { default: mongoose } = require("mongoose");
const Recipie = require("../Models/Recipies");
const Dish = require("../Models/Dish");
const Chef = require("../Models/Chef");

exports.makeRecipie = async (req, res) => {
  const recipieData = req.body;
  const chefID = req.user;
  recipieData.recipeAuthor = chefID;
  console.log(req.files);

  try {
    const recipie = new Recipie({
      ...recipieData,
      _id: new mongoose.Types.ObjectId(),
    });
    await recipie.save();
    res.status(201).json({ message: "Recipie created successfully", recipie });
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};

exports.getChefRecipies = async (req, res) => {
  const chefID = req.user;

  try {
    const recipies = await Recipie.find({ recipeAuthor: chefID });
    if (recipies.length === 0) {
      res.status(201).json({
        message: "No Recipies were found for this chef",
        recipies: [],
      });
    } else {
      console.log(recipies);
      res
        .status(200)
        .json({ message: "Recipies fetched successfully", recipies: recipies });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", error: e });
  }
};

exports.deleteRecipie = async (req, res) => {
  const chefID = req.user;
  const recipieID = req.recipieID;
  try {
    Recipie.findByIdAndUpdate(recipieID, { isDeleted: true });
    res.status(202).json({ message: "Recipie deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", error: e });
  }
};

exports.updateRecipie = async (req, res) => {
  const dataToUpdate = req.body;
  try {
    Recipie.findByIdAndUpdate(data);
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", error: e });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipie.find({ isDeleted: false }).populate(
      "recipeAuthor",
      "name businessName businessAddress"
    );
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getChefRecipeById = async (req, res) => {
  console.log(req);
  const recipeID = req.query;

  try {
    const recipe = await Recipie.findById(
      new mongoose.Types.ObjectId(recipeID)
    ).populate("recipeAuthor");
    res
      .status(200)
      .json({ message: "Fetched recipe successully", recipe: recipe });
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};
exports.getRecipeById = async (req, res) => {
  console.log(req.params.id);
  try {
    const recipe = await Recipie.findById(req.params.id).populate(
      "recipeAuthor",
      "name businessName businessAddress"
    );
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecipesByCategory = async (req, res) => {
  try {
    const recipes = await Recipie.find({
      category: req.params.category,
      isDeleted: false,
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// numb of recpies
exports.getTotalRecipes = async (req, res) => {
  try {
    const totalRecipes = await Recipie.countDocuments();
    res.status(200).json({ totalRecipes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total recipes", error });
  }
};
