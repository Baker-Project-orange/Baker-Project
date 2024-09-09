const express = require("express");
const router = express.Router();
const paypal = require("@paypal/checkout-server-sdk");
const mongoose = require("mongoose");

// PayPal environment setup
let environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID ||
    "AaNKdFSya2nFjcnY-ovYES--3uDl6E6fS9Fz4SpNsX0iAvMg_m0PIoQT2SJsw_NUXN4QAikbdDXJqRZE",
  process.env.PAYPAL_CLIENT_SECRET ||
    "EFgZ0bb68kjSKRdw84l6CjB3rIQrx465L3ByYloHYIRAxtpTdCB5wX3V4TVz6vBqokg-qO5OGIYXYpNz"
);
let client = new paypal.core.PayPalHttpClient(environment);

// Mongoose transaction model
const Transaction = mongoose.model("Transaction", {
  paypalOrderId: String,
  paypalPayerId: String,
  paypalPaymentId: String,
  amount: Number,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

// Utility function to retrieve PayPal order details
async function getOrderDetails(orderID) {
  const request = new paypal.orders.OrdersGetRequest(orderID);
  try {
    const order = await client.execute(request);
    return order.result;
  } catch (error) {
    throw new Error(`PayPal order retrieval failed: ${error.message}`);
  }
}

// API route to handle payment completion
router.post("/complete-payment", async (req, res) => {
  const { orderID } = req.body;

  if (!orderID) {
    return res
      .status(400)
      .json({ success: false, error: "Order ID is required" });
  }

  try {
    // Fetch the order details from PayPal
    const order = await getOrderDetails(orderID);

    // Ensure the order is in the correct state
    if (order.status !== "COMPLETED") {
      return res
        .status(400)
        .json({ success: false, error: "Order not completed" });
    }

    // Extract relevant information
    const amount = order.purchase_units[0].amount.value;
    const payerID = order.payer.payer_id;

    // Save the transaction to the database
    const transaction = new Transaction({
      paypalOrderId: orderID,
      paypalPayerId: payerID,
      amount: parseFloat(amount),
      status: order.status,
    });
    await transaction.save();

    // Send a success response with the transaction ID
    res.json({ success: true, transactionId: transaction._id });
  } catch (error) {
    console.error("Payment verification failed:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Payment verification failed" });
  }
});
router.get("/payments", async (req, res) => {
  try {
    const transactions = await Transaction.find({}).sort({ createdAt: -1 }); // Fetch all transactions, newest first
    const totalEarnings = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    res.json({
      transactions: transactions,
      totalEarnings: totalEarnings,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

module.exports = router;
