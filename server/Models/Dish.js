// const { Schema, model, default: mongoose } = require("mongoose");

// const dishSchema = new Schema({

//   recipieID: { type: mongoose.Types.ObjectId, ref: "Recipie" },
//   dishDescription: String,
//   dishPictures: [{ URL: String }],
//   price: Number,
//   dishRating: [{ ratingNumber: Number }],
//   dishRatingAvg: Number,
//   category: String,
//   isApproved : {type:Boolean, default:false},
//   isDeleted: { type: Boolean, default: false },

// });

// const Dish = model("Dish", dishSchema);

// module.exports = Dish;


const { Schema, model, default: mongoose } = require("mongoose");

const dishSchema = new Schema({
  recipieID: { type: mongoose.Types.ObjectId, ref: "Recipie" },
  chefID: { type: mongoose.Types.ObjectId, ref: "Chef" }, // إضافة معرف الشيف
  dishDescription: String,
  dishPictures: [{ URL: String }],
  price: Number,
  dishRating: [{ ratingNumber: Number }],
  dishRatingAvg: Number,
  category: String,
  isApproved: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

const Dish = model("Dish", dishSchema);
module.exports = Dish;
