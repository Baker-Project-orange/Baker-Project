const express = require("express");
const router = express.Router();
const chefController = require("../Controller/chefController");

router.post("registerChef", chefController.registerChef);
router.post("registerChef", chefController.loginChef);
router.get('/', chefController.getAllChefs);
module.exports = router;
