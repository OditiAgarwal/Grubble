// const Rajorpay = require('razorpay');
// require('dotenv').config();

// exports.instance = new Rajorpay({
//     key_id: process.env.RAZORPAY_KEY,
//     key_secret: process.env.RAZORPAY_SECRET
// })

const Rajorpay = require('razorpay');

// Mock Razorpay instance (No actual API key required)
const razorpayInstance = {
  orders: (data) => {
    return new Promise((resolve, reject) => {
      // Simulating a successful response
      resolve({
        id: 'order_12345',
        amount: data.amount,
        currency: 'INR',
        status: 'created',
      });
    });
  },
  payments: (paymentData) => {
    return new Promise((resolve, reject) => {
      // Simulating a successful payment response
      resolve({
        id: 'payment_12345',
        amount: paymentData.amount,
        status: 'captured',
      });
    });
  },
};

// Export the mock Razorpay instance
module.exports = razorpayInstance;
