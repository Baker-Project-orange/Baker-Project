// C:\Users\Orange\Desktop\Bakery\server\routes\dishRoutes.js

const express = require("express");
const router = express.Router();
const dishController = require("../Controller/dishController");
const { fileUpload } = require("../middlewares/fileUpload");
const auth = require("../middlewares/auth");

// Route to get all dishes
router.get("/getDishes", dishController.getAllDishes);
router.post("/makeDishes", auth, fileUpload, dishController.makeDish);

module.exports = router;
