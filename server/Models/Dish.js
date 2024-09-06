const { Schema, model, default: mongoose } = require("mongoose");

const dishSchema = new Schema({
  recipieID: { type: mongoose.Types.ObjectId, ref: "Recipie" },
  dishDescription: String,
  dishPictures: String,
  price: Number,
  dishRating: [{ ratingNumber: Number }],
  dishRatingAvg: Number,
  isApproved: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

const Dish = model("Dish", dishSchema);

module.exports = Dish;
