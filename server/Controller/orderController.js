// controller/orderController.js
const { model } = require('mongoose');
const Order = require('../Models/Orders');

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