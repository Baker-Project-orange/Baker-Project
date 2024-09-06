const mongoose = require("mongoose");

const stepsSchema = new mongoose.Schema({
  stepTitle: String,
  stepDescription: String,
  stepMedia: String,
  note: String,
});

const recipeSchema = new mongoose.Schema({
  dishName: String,
  recipeRatings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
  ingredients: [{ name: String }],
  recipeOverview: String,
  steps: [stepsSchema],
  difficultyRating: [{ ratingNumber: Number }],
  difficultyAvg: Number,
  duration: String,
  overviewPicture: String,
  category: {
    type: String,
    enum: [
      "High-Calorie",
      "Moderate-Calorie",
      "Low-Calorie",
      "American Cuisine",
      "Middle Eastern Cuisine",
      "Italian Cuisine",
      "French Cuisine",
    ],
  },
  recipeAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "Chef" },
  isDeleted: { type: Boolean, default: false },
  isDish: { type: Boolean, default: false },
  dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
