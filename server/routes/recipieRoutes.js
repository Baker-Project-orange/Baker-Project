const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const recipieController = require("../Controller/recipieController");
const { filesUpload, fileUpload } = require("../middlewares/fileUpload");
const {
  processImage,
  processImages,
} = require("../middlewares/imageProccessor");
router.get("/getChefRecipies", auth, recipieController.getChefRecipies);
router.get("/getrecipes", recipieController.getAllRecipes);
router.get("/:id", recipieController.getRecipeById);
router.get("/getRecipeById", auth, recipieController.getChefRecipeById);
router.post(
  "/makeRecipie",
  auth,
  processImages,
  fileUpload,
  filesUpload,
  recipieController.makeRecipie
);
router.put("/deleteRecipie", auth, recipieController.deleteRecipie);
router.put("/updateRecipie", auth, recipieController.updateRecipie);
router.get("/category/:category", recipieController.getRecipesByCategory);
router.get("/total", recipieController.getTotalRecipes);

module.exports = router;
