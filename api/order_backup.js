// // import Razorpay from 'razorpay';

// const Razorpay = require('razorpay')

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// module.exports = async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { items, name } = req.body;

//     // Dummy order calculation
//     let totalAmount = 0;
//     items.forEach(item => {
//       totalAmount += item.price * item.quantity;
//     });

//     const options = {
//       amount: totalAmount * 100, // Amount in paise
//       currency: 'INR',
//       receipt: `receipt_order_${Math.random().toString().slice(2, 8)}`,
//     };

//     try {
//       const order = await razorpay.orders.create(options);
//       res.status(200).json({ orderId: order.id, amount: options.amount, currency: options.currency, name });
//     } catch (error) {
//       res.status(500).json({ error: 'Order creation failed', details: error.message });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }


// // export default 