// C:\Users\Orange\Desktop\Bakery\server\routes\dishRoutes.js

const express = require("express");
const router = express.Router();
const dishController = require("../Controller/dishController");
const { fileUpload } = require("../middlewares/fileUpload");
const auth = require("../middlewares/auth");
const { processImages } = require("../middlewares/imageProccessor");

// Route to get all dishes
router.get("/getDishes", dishController.getAllDishes);
router.get("/getChefDishes", auth, dishController.getChefDishes);
router.get("/getDishByRecipeID", auth, dishController.getDishByRecipeID);
router.post("/makeDishes", auth, processImages, dishController.makeDish);
router.put("/dishes/approve/:id", dishController.approveDish);
router.get("/total", dishController.getTotalDishes);
router.get("/getDishByID", dishController.getDishById);
router.put("/deleteDish", auth, dishController.deleteDish);
module.exports = router;
