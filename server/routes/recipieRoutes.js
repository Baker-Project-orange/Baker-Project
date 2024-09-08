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
router.post(
  "/makeRecipie",
  auth,
  processImages,
  fileUpload,
  filesUpload,
  recipieController.makeRecipie
);
router.patch("/deleteRecipie", auth, recipieController.deleteRecipie);
router.put("/updateRecipie", auth, recipieController.updateRecipie);
router.get("/category/:category", recipieController.getRecipesByCategory);
router.get("/total", recipieController.getTotalRecipes);
router.put("/approve/:id", recipieController.approveRecipe);


router.get("/comments/:id", recipieController.get_recipe_comments);
router.post("/comments", recipieController.add_comment);
router.post("/comments/:id/replies", recipieController.add_replie);
router.post("/comments/:id/report", recipieController.comment_report);



module.exports = router;
