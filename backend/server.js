// Load environment variables
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const razorpay = require('./config/rajorpay');
const { connectDB } = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const paymentRoutes = require('./routes/payments');
const courseRoutes = require('./routes/course');

const app = express();

// Middleware
app.use(express.json()); // to parse json body
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}));

// Connect to Database and Cloudinary
connectDB();
cloudinaryConnect();

// Routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send(`<div>
    This is Default Route  
    <p>Everything is OK</p>
    </div>`);
});

// Create an order using the mock Razorpay instance
razorpay.orders({ amount: 50000, currency: 'INR' })
    .then(response => {
        console.log('Order created:', response);
        // Continue your demo logic with the mocked response...
    })
    .catch(error => {
        console.error('Error creating order:', error);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});