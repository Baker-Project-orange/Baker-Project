const { default: mongoose } = require("mongoose");
const Recipie = require("../Models/Recipies");


//Controller to make the recipie
exports.makeRecipie = async (req, res) => {
  //recipie data prepration
  const recipieData = req.body;
  recipieData.overviewPicture = req.url;
  const chefID = req.user;
  recipieData.recipieAuthor = chefID;

  try {
    //Recipie document creation
    const recipie = new Recipie({
      ...recipieData,
      _id: new mongoose.Types.ObjectId(),
    });
    await recipie.save();
   
      res
        .status(201)
        .json({ message: "Recipie created successfully", recipie: recipie });
   
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};

exports.getChefRecipies = async (req, res) => {
  const chefID = req.user;
  try {
    const recipies = Recipie.find({ _id: chefID });
    if (recipies.length === 0) {
      res.status(204).json({ message: "No Recipies were found for this chef" });
    } else {
      res
        .status(200)
        .json({ message: "Recipies fetched successfully", recipies });
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
    const recipes = await Recipie.find({ isDeleted: false });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  
  // Get a recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipie.findById(req.params.id);
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
