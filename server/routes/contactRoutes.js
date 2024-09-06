// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const { getAllMessages, createMessage } = require("../Controller/contactController");

// Route to fetch all contact messages
router.get("/messages", getAllMessages);

// Route to create a new contact message
router.post("/messages", createMessage);



module.exports = router;
