// routes/orderRoutes.js
const express = require("express");
const {OrderController} = require("../Controller/orderController");
const orderController = require('../Controller/orderController');
const router = express.Router();

router.post("/orders", OrderController.createOrder);
router.get("/orders/:orderId/amounts", OrderController.getOrderAmounts);
router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);


module.exports = router;
