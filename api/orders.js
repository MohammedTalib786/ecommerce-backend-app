const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// POST /api/orders
router.post("/", async (req, res) => {
  const { items, name } = req.body;

  // Calculate total amount
  let totalAmount = 0;
  items.forEach((item) => {
    totalAmount += item.price * item.quantity;
  });

  const options = {
    amount: totalAmount * 100, // paise
    currency: "INR",
    receipt: `receipt_order_${Math.random().toString().slice(2, 8)}`,
  };

  try {
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      name,
    });
  } catch (error) {
    // console.error("Razorpay Error:", error);
    console.error("Razorpay Error:", error, error?.response?.data);

    res.status(500).json({
      error: "Order creation failed",
      details: error.message,
    });
  }
});

module.exports = router;
