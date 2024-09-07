const { Schema, model, default: mongoose } = require("mongoose");

//defining ratings schema

const repliesSchema = new Schema({
  replyMessage: String,
  replyAuthor: String,
  replyDate: Date,
});

const ratingSchema = new Schema({
  ratingComment: String,
  ratingDate: Date,
  ratingAuthor: String,
  recipeRating: String,
  userRating: String,
  replies: [ repliesSchema ],
});

const Rating = model("Rating", ratingSchema);

module.exports = Rating;
