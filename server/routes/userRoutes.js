const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

// Define routes

router.get("/users", userController.getUserById);
router.get("/", userController.getAllUsers);
router.put("/users/:id/toggle-active", userController.userToggleActive);
router.get('/total', userController.getTotalUsers);

router.get("/google", userController.googleAuth);
router.get("/google/callback", userController.googleAuthCallback);
router.get("/users/:id", userController.getUserById);
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);

module.exports = router;
