// C:\Users\Orange\Desktop\Bakery\server\routes\dishRoutes.js

const express = require('express');
const router = express.Router();
const dishController = require('../Controller/dishController');

// Route to get all dishes
router.get("/getDishes", dishController.getAllDishes);
router.put('/dishes/approve/:id', dishController.approveDish);
router.get("/total", dishController.getTotalDishes);
module.exports = router;