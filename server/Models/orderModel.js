const Order = require("../Models/Orders");
const Dish = require("../Models/Dish");

class OrderModel {
  static async createOrder(orderData) {
    const order = new Order(orderData);
    await order.save();
    return order;
  }

  static async getOrderById(orderId) {
    return await Order.findById(orderId).populate("orderItems.dish");
  }

  static async calculateAmounts(orderId) {
    const order = await this.getOrderById(orderId);
    let totalChefAmount = 0;
    let totalAdminAmount = 0;

    for (const item of order.orderItems) {
      const chefAmount = item.price * 0.6; // 60% للشيف
      const adminAmount = item.price * 0.4; // 40% للأدمن

      item.chefAmount = chefAmount;
      item.adminAmount = adminAmount;

      totalChefAmount += chefAmount;
      totalAdminAmount += adminAmount;
    }

    order.totalChefAmount = totalChefAmount;
    order.totalAdminAmount = totalAdminAmount;

    await order.save();
    return order;
  }
}

module.exports = OrderModel;
