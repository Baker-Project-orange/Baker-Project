const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: String,
  gender: String,
  isActive: { type: Boolean, default: false },
  email: String,
  password: String,
  favoraiteRecipie: [{ type: mongoose.Types.ObjectId, ref: "Recipe" }],
  notifications: [{ type: mongoose.Types.ObjectId, ref: "Notification" }],
  undreadNotification: { type: Boolean, default: false },
  recentlyViewed: [{ type: mongoose.Types.ObjectId, ref: "Recipie" }],
});

const User = model("User", userSchema);

module.exports = User;
