const express = require("express");
const Order = require("../Models/orderModel");
const Cart = require("../Models/cart");
const router = express.Router();
const auth = require("../middlewares/auth");
// Add item to cart
router.post("/cart/add", async (req, res) => {
  // Logic to add item to cart in database
});

// Get cart items
router.get("/cart", async (req, res) => {
  // Logic to retrieve cart items from database
});

// Checkout
router.post("/checkout", auth, async (req, res) => {
  try {
    console.log("Received checkout request:", req.body);
    const { orderPrice, orderDetails } = req.body;

    // Check if user is authenticated
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const userId = req.userId;
    console.log("User ID:", userId);

    // Create a single order item from the provided details
    const orderItem = {
      dish: null, // You might want to adjust this
      quantity: 1, // Assuming quantity of 1 for now
      price: orderPrice,
      chefAmount: 0, // You'll need to calculate this
      adminAmount: 0, // You'll need to calculate this
    };

    const order = new Order({
      orderMaker: userId,
      orderItems: [orderItem],
      totalPrice: orderPrice,
      totalChefAmount: 0, // Calculate this
      totalAdminAmount: 0, // Calculate this
      orderDetails: orderDetails,
    });

    console.log("Created order object:", order);

    await order.save();
    console.log("Order saved successfully");

    res
      .status(200)
      .json({ message: "Order placed successfully", orderId: order._id });
  } catch (error) {
    console.error("Detailed checkout error:", error);
    res
      .status(500)
      .json({
        message: "An error occurred during checkout",
        error: error.toString(),
      });
  }
});
// Logic to process checkout

module.exports = router;
