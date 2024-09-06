
const OrderModel = require("../Models/orderModel");
const { model } = require('mongoose');
const Order = require('../Models/Orders');

class OrderController {
  static async createOrder(req, res) {
    try {
      const orderData = req.body;
      const order = await OrderModel.createOrder(orderData);
      const calculatedOrder = await OrderModel.calculateAmounts(order._id);
      res.status(201).json(calculatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getOrderAmounts(req, res) {
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
  }
}

module.exports = OrderController;

// controller/orderController.js


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('orderMaker', 'username');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error: error.message });
  }
};

