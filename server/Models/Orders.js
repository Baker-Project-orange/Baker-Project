// const { Schema, model, default: mongoose } = require("mongoose");

// const orderSchema = new Schema({
//   orderMaker: { type: mongoose.Types.ObjectId, ref: "User" },
//   orderPrice: Number,
//   orderDetails: String,
// });

// const Order = model("Order", orderSchema);

// module.exports = Order;


const { Schema, model, default: mongoose } = require("mongoose");

const orderItemSchema = new Schema({
  dish: { type: mongoose.Types.ObjectId, ref: "Dish" },
  quantity: Number,
  price: Number,
  chefAmount: Number,
  adminAmount: Number,
});

const orderSchema = new Schema({
  orderMaker: { type: mongoose.Types.ObjectId, ref: "User" },
  orderItems: [orderItemSchema],
  totalPrice: Number,
  totalChefAmount: Number,
  totalAdminAmount: Number,
  orderDetails: String,
  createdAt: { type: Date, default: Date.now },
});

const Order = model("Order", orderSchema);
module.exports = Order;