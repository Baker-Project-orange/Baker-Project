const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const auth = require("../middlewares/auth"); // تأكد من وجود middleware للتوثيق

// Define routes

router.get("/users", userController.getUserById);
// -----??-------
router.get("/", userController.getAllUsers);
router.get("/total", userController.getTotalUsers);
// ---------------
router.put("/users/:id/toggle-active", userController.userToggleActive);

router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUserById);

router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);

// Add route to get orders by user ID
router.get("/users/:id/orders", userController.getOrdersByUserId);
router.get("/orders/:userId", userController.getUserOrders);
router.post("/orders/:userId", userController.addOrder);
//  router.post("/users/:userId/favorite/:recipeId", userController.addRecipeToFavorites);
router.post("/add", userController.addFavoriteRecipe);
router.get("/:userId", userController.getFavoriteRecipes);

module.exports = router;
