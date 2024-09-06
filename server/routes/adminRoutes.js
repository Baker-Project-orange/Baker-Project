


const express = require("express");
const router = express.Router();
const adminController = require("../Controller/adminController");
const auth = require('../middlewares/auth'); // تأكد من وجود middleware 


router.post("/register", adminController.registerAdmin);

router.post("/login", adminController.loginAdmin);

module.exports = router;
