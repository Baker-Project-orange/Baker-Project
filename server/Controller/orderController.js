const OrderModel = require("../Models/orderModel");
const { model } = require("mongoose");
const Order = require("../Models/Orders");

// controller/orderController.js
exports.getAllOrders = async (req, res) => {
  try {
    // const orders = await Order.find({chefId:"66d775724924397e1179e5ed"})
    const orders = await Order.find()
      .populate("orderMaker", "username")
      .populate({
        path: "orderItems.dish",
      });
// Transform the data to ensure orderItems is returned as a data object
    const final_orders = orders.map((order) => ({
    ...order.toObject(),
    orderItems: order.orderItems.map((item) => ({
    ...item.toObject(),
    dish: item.dish ? item.dish.toObject() : null,
    })),
    }));
    res.json(final_orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};
// ------------------------------------------

exports.createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const order = await OrderModel.createOrder(orderData);
    const calculatedOrder = await OrderModel.calculateAmounts(order._id);
    res.status(201).json(calculatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// -------------------------
exports.getOrderAmounts = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await OrderModel.calculateAmounts(orderId);
    res.status(200).json({
      chefAmount: order.totalChefAmount,
      adminAmount: order.totalAdminAmount,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// -----------------------------
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating order", error: error.message });
  }
};
// -------------------------
exports.updateOrderStatus = async (req, res) => {
  const orderId = req.params.id; // Extract order ID from request parameters
  const { status } = req.body; // Extract status from request body

  try {
    // Validate status value if necessary
    const validStatuses = ["Pending", "In Progress", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find the order by ID and update the status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId, // The ID of the order to update
      { status }, // The fields to update
      { new: true } // Return the updated document
    );

    // Check if the order was found and updated
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the updated order
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ message: "Error updating order status", error: error.message });
  }
};

// -----------------------------------
exports.totalChefAmount = async (req, res) => {
  try {
    // Aggregate the total chef amount across all orders
    const totalAmount = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalChefAmount: { $sum: "$totalChefAmount" }, // Sum the chef's amount
        },
      },
    ]);

    // Return the total chef amount
    res.status(200).json({ totalChefAmount: totalAmount[0]?.totalChefAmount || 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};