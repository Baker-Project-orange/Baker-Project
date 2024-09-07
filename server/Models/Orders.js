
const { Schema, model, default: mongoose } = require("mongoose");

const orderItemSchema = new Schema({
  dish: { type: mongoose.Types.ObjectId, ref: "Dish" },
  dishName:String,
  quantity: Number,
  price: Number,
  chefAmount: Number,
  adminAmount: Number,
});

const orderSchema = new Schema({
  orderMaker: { type: mongoose.Types.ObjectId, ref: "User" },
  orderMakerName:String,
  orderItems: [orderItemSchema],
  chefId: String,
  totalPrice: Number,
  totalChefAmount: Number,
  totalAdminAmount: Number,
  orderDetails:String,
  status:String,
  createdAt: { type: Date, default: Date.now },
});

// تصدير النموذج بشكل صحيح
const Order = model("Order", orderSchema);
module.exports = Order;