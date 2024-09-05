const express = require("express");
const router = express.Router();
const chefController = require("../Controller/chefController");
const { fileUpload } = require("../middlewares/fileUpload");
router.post("/registerChef", fileUpload, chefController.registerChef);
router.post("/loginChef", chefController.loginChef);

module.exports = router;
