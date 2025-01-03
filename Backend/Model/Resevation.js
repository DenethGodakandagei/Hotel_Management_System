// models/Reservation.js
import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
  });
  


export default mongoose.model('Reservation', reservationSchema);
