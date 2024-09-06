// controllers/contactController.js
const ContactMessage = require("../Models/ContactMessage");

// Function to handle fetching all contact messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

// Function to handle creating a new contact message
const createMessage = async (req, res) => {
  const { from, subject, message, email } = req.body;

  // Validation check for missing fields
  if (!from || !subject || !message || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newMessage = new ContactMessage({
      from,
      subject,
      message,
      email,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error creating message", error });
  }
};

module.exports = {
  getAllMessages,
  createMessage,
};
