const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const recipieController = require("../Controller/recipieController");
const { filesUpload, fileUpload } = require("../middlewares/fileUpload");

// router.post("/makeRecipie", auth, recipieController);
router.get("/getrecipes", recipieController.getAllRecipes);
router.get("/:id", recipieController.getRecipeById);
router.post(
  "/makeRecipie",
  auth,
  fileUpload,
  filesUpload,
  recipieController.makeRecipie
);
router.put("/deleteRecipie", auth, recipieController.deleteRecipie);
router.put("/updateRecipie", auth, recipieController.updateRecipie);
router.get("/category/:category", recipieController.getRecipesByCategory);

module.exports = router;
