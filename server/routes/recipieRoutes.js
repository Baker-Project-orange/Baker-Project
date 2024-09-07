const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const recipieController = require("../Controller/recipieController");
const { filesUpload, fileUpload } = require("../middlewares/fileUpload");

// router.post("/makeRecipie", auth, recipieController);
router.post("/makeRecipie", auth, recipieController.makeRecipie);

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
router.get("/total", recipieController.getTotalRecipes);



router.get("/comments/:id", recipieController.get_recipe_comments);
router.post("/comments", recipieController.add_comment);
router.post("/comments/:id/replies", recipieController.add_replie);



module.exports = router;
