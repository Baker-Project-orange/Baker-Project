const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const recipieController = require("../Controller/recipieController");

// router.post("/makeRecipie", auth, recipieController);
router.get("/getrecipes", recipieController.getAllRecipes);
router.get("/:id", recipieController.getRecipeById);
router.get("/category/:category", recipieController.getRecipesByCategory);
router.get("/total", recipieController.getTotalRecipes);

module.exports = router;
