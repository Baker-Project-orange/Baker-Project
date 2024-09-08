const express = require("express");
const router = express.Router();
const chefController = require("../Controller/chefController");
const { fileUpload } = require("../middlewares/fileUpload");
const auth = require("../middlewares/auth");

router.post("/registerChef", fileUpload, chefController.registerChef);
router.post("/loginChef", chefController.loginChef);
router.get("/get-chef", auth, chefController.get_chef);
router.patch("/update-chef",auth, chefController.update_chef);
// ---------------
router.get("/", chefController.getAllChefs);
router.put("/:id/toggle", chefController.chefToggleActive);
//  ------------
module.exports = router;
