const express = require("express");
const OrderController = require("../Controller/orderController");

const router = express.Router();

router.post("/orders", OrderController.createOrder);
router.get("/orders/:orderId/amounts", OrderController.getOrderAmounts);

module.exports = router;
