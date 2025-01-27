import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import connectDB from './config/dbConfig.js';

import authRoutes from './Routes/authRoutes.js';
import roomRoutes from './Routes/roomRoutes.js'
import reservationRoutes from './Routes/resevationRoutes.js';
import paymentRoutes  from './Routes/PaymentRoutes.js';
import menuRoutes from './Routes/menuRoutes.js';
import staffRoutes from './Routes/StaffRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import emailRoutes from './Routes/emailRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/room',roomRoutes);
app.use('/api/reservations', reservationRoutes);
app.use("/api/payments", paymentRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/users', userRoutes);
app.use("/api/send-email", emailRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
