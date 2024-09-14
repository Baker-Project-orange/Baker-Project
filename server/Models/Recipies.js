// const mongoose = require("mongoose");

// const stepsSchema = new mongoose.Schema({
//   stepTitle: String,
//   stepDescription: String,
//   stepMedia: String,
//   note: String,
// });

// const recipeSchema = new mongoose.Schema({
//   dishName: String,
//   recipeRatings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
//   ingredients: [String],
//   recipeOverview: String,
//   steps: [stepsSchema],
//   difficultyRating: [{ ratingNumber: Number }],
//   difficultyAvg: Number,
//   duration: String,
//   overviewPicture: String,
//   category: {
//     type: String,
//     enum: [
//       "High-Calorie",
//       "Moderate-Calorie",
//       "Low-Calorie",
//       "American Cuisine",
//       "Middle Eastern Cuisine",
//       "Italian Cuisine",
//       "French Cuisine",
//     ],
//   },
//   recipeAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "Chef" },
//   isDeleted: { type: Boolean, default: false },
//   isDish: { type: Boolean, default: false },
//   dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
// });

// const Recipe = mongoose.model("Recipe", recipeSchema);

// module.exports = Recipe;

const mongoose = require("mongoose");

const stepsSchema = new mongoose.Schema({
  stepDescription: String,
  stepMedia: String,
  note: String,
  stepTitle:String
});

const recipeSchema = new mongoose.Schema({
  dishName: String,
  dishDescription: String,
  recipeRatings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
  ingredients: [String],
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
      "Bread",
    ],
  },
  recipeAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "Chef" },
  isDeleted: { type: Boolean, default: false },
  isDish: { type: Boolean, default: false },
  dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
  price: { type: Number, default: 0 },
  dishRatingAvg: { type: Number, default: 0 },
  isApproved: { type: Boolean, default: false },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
