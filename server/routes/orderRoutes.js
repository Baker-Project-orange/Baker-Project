// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../Controller/orderController');

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);

module.exports = router;
