const { default: mongoose } = require("mongoose");
const Recipie = require("../Models/Recipies");
const Rating = require("../Models/Ratings");
const Dish = require("../Models/Dish");
const Chef = require("../Models/Chef");
const User = require("../Models/User");
const Report = require("../Models/Reports");
// ---------------------------------
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
// --------------------
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

      res
        .status(200)
        .json({ message: "Recipies fetched successfully", recipies: recipies });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", error: e });
  }
};
// ----------------------------
exports.deleteRecipie = async (req, res) => {
  const chefID = req.user;
  const { recipeID } = req.query;  // Ensure you're reading from req.query

  console.log("inside delete recipe controller");
  console.log("chef id:", chefID);
  console.log("recipe id:", recipeID);

  try {
    await Recipie.findByIdAndUpdate(recipeID, { isDeleted: true });
    res.status(202).json({ message: "Recipe deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", error: e });
  }
};

// ----------------------
exports.updateRecipie = async (req, res) => {
  const dataToUpdate = req.body;
  try {
    Recipie.findByIdAndUpdate(data);
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", error: e });
  }
};
// ----------------------
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
// -----------------------
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
// ---------------------------
// exports.getRecipeById = async (req, res) => {
//   console.log(req.params.id);
//   try {
//     const recipe = await Recipie.findById(req.params.id).populate(
//       "recipeAuthor",
//       "name businessName businessAddress"
//     );
//     if (!recipe) {
//       return res.status(404).json({ message: "Recipe not found" });
//     }
//     res.json(recipe);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipie.findById(req.params.id)
      .populate("recipeAuthor", "name businessName businessAddress")
      .populate({
        path: "dish",
        select: "dishRatingAvg price",
      })
      .exec();

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: error.message });
  }
};
// ---------------------
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
// --------------------
// numb of recpies
exports.getTotalRecipes = async (req, res) => {
  try {
    const totalRecipes = await Recipie.countDocuments();
    res.status(200).json({ totalRecipes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total recipes", error });
  }
};
// -------------------------
exports.add_comment = async (req, res) => {
  try {
    const { newComment, recipe_id, chef_id, user_id } = req.body;
    // console.log("Received comment:", newComment);
    console.log(newComment, recipe_id, chef_id, user_id);

    const user = await User.findById(user_id).catch((err) => {
      console.log(err);
    });

    const chef = await Chef.findById(chef_id).catch((err) => {
      console.log(err);
    });

    // console.log(user.name);
    // console.log(chef.name);

    const newRating = new Rating({
      ratingComment: newComment,
      ratingDate: Date.now(),
      ratingAuthor: chef.name,
      recipeRating: recipe_id,
      userRating: user.name,
    });

    const savedRating = await newRating.save();

    await Recipie.updateOne(
      { _id: recipe_id },
      { $push: { recipeRatings: savedRating._id } }
    );

    console.log("After insert");

    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// ----------------------------
exports.add_replie = async (req, res) => {
  try {
    const comment_id = req.params.id;
    const { newReply, chef_id } = req.body;

    console.log("Inside reply controller");
    console.log(comment_id);
    console.log(newReply, chef_id);

    // Find the rating document by ID
    const rating = await Rating.findById(comment_id);

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    const chef = await Chef.findById(chef_id);

    // Create a new reply
    const reply = {
      replyMessage: newReply,
      replyAuthor: chef.name,
      replyDate: Date.now(),
    };

    // Push the new reply into the replies array
    rating.replies.push(reply);

    // Save the updated rating document
    await rating.save();

    console.log("After insert reply");

    res.status(201).json({ message: "Reply added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// ----------------------------------
exports.get_recipe_comments = async (req, res) => {
  // console.log("inside get comments controller ");
  try {
    const recipeId = req.params.id;
    const { chef_id } = req.query;



    // const user = await User.findById(user_id);
    const chef = await Chef.findById(chef_id);
    console.log(recipeId);
    console.log(chef.name);

    // Find ratings that match the recipeId and chef_id
    const ratings = await Rating.find({
      recipeRating: recipeId,
      ratingAuthor: chef.name,

    }).populate("replies.replyMessage")
      .catch(err => { console.log(err) });


    console.log("fffffffff");


    if (ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this recipe" });
    }

    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.comment_report = async (req, res) => {
  // console.log("inside get comments controller ");
  try {
    const commentId = req.params.id;
    const { reportReason, user_id } = req.body;

    // console.log(commentId)
    // console.log(reportReason);
    // console.log(user_id);

    const user = await User.findById(user_id).catch((err) => {
      console.log(err);
    });

    // console.log(user.name);

    const new_report = new Report({
      reportMaker: user.name,
      reportDetails: reportReason,
      isResolved: false,
      actionDetails: "----",
    });

    const saved_report = await new_report.save();

    res.json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// -----------------------------------------------------------------
// recipe.controller.js
exports.approveRecipe = async (req, res) => {
  try {
    const { isApproved } = req.body;
    const recipe = await Recipie.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true, runValidators: true }
    );
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};