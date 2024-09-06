const OrderModel = require("../Models/orderModel");

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
