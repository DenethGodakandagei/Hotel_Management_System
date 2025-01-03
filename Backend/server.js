import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/dbConfig.js';
import authRoutes from './Routes/authRoutes.js';
import roomRoutes from './Routes/roomRoutes.js'
import reservationRoutes from './Routes/resevationRoutes.js'


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/room',roomRoutes);
app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
