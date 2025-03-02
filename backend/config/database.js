const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is loaded

const connectDB = async () => {
  // Log the MONGO_URI to check if it's loaded correctly
  console.log('Attempting to connect to MongoDB URI:', process.env.MONGO_URI); 

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', {
      message: err.message,
      stack: err.stack,
      uri: process.env.MONGO_URI
    });
    process.exit(1); // Exit process with failure
  }
};

module.exports = { connectDB };
