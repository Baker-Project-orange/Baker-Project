// routes/orderRoutes.js
const auth = require("../middlewares/auth");
const express = require("express");
const {
  getAllOrders,
  updateOrder,
  createOrder,
  getOrderAmounts,
} = require("../Controller/orderController");
const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders/:orderId/amounts", getOrderAmounts);
router.get("/", getAllOrders);

router.put("/:id", updateOrder);

module.exports = router;
