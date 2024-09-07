const { Schema, model, default: mongoose } = require("mongoose");

const chefSchema = new Schema({
  name: String,
  email: String,
  password: String,
  notifications: [{ type: mongoose.Types.ObjectId, ref: "Notification" }],
  unreadNotification: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  license: String,
  openingTime: String,
  closingTime: String,
});

const Chef = model("Chef", chefSchema);

module.exports = Chef;
