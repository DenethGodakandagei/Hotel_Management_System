import Reservation from '../Model/Resevation.js';
import Room from '../Model/Room.js';
import mongoose from 'mongoose';

// Controller to create a new reservation

export const createReservation = async (req, res) => {
    const { email, roomId, checkInDate, checkOutDate } = req.body;
  
    if (!email || !roomId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "Email, roomId, checkInDate, and checkOutDate are required." });
    }
  
    try {
      const roomObjectId = new mongoose.Types.ObjectId(roomId);
  
      // Check for overlapping reservations
      const existingReservation = await Reservation.findOne({
        roomId: roomObjectId,
        $or: [
          { checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } }
        ]
      });
  
      if (existingReservation) {
        return res.status(400).json({ message: "Room is already booked " });
      }
  
      // Create a new reservation
      const newReservation = new Reservation({
        email,
        roomId: roomObjectId,
        checkInDate,
        checkOutDate,
      });
  
      await newReservation.save();
  
      res.status(201).json(newReservation);
    } catch (err) {
      res.status(500).json({ message: "Failed to create reservation.", error: err.message });
    }
  };

  // Controller to get all reservations
export const getAllReservations = async (req, res) => {
    try {
      const reservations = await Reservation.find().populate('roomId'); 
      res.status(200).json(reservations);
    } catch (err) {
      res.status(500).json({ message: "Failed to retrieve reservations.", error: err.message });
    }
  };

// Controller to update an existing reservation
export const updateReservation = async (req, res) => {
  const { reservationId, roomId, checkInDate, checkOutDate } = req.body;

  if (!reservationId || !roomId || !checkInDate || !checkOutDate) {
    return res.status(400).json({ message: "reservationId, roomId, checkInDate, and checkOutDate are required." });
  }

  try {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    const existingReservation = await Reservation.findOne({
      roomId: mongoose.Types.ObjectId(roomId),
      _id: { $ne: reservationId },
      $or: [
        { checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } },
      ],
    });

    if (existingReservation) {
      return res.status(400).json({ message: "Room is already booked for the selected dates." });
    }

    reservation.roomId = roomId;
    reservation.checkInDate = checkInDate;
    reservation.checkOutDate = checkOutDate;

    await reservation.save();

    res.status(200).json({ message: "Reservation updated successfully.", reservation });
  } catch (err) {
    res.status(500).json({ message: "Failed to update reservation.", error: err.message });
  }
};

// Controller to delete a reservation
export const deleteReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    const room = await Room.findById(reservation.roomId);
   

    // Use findByIdAndDelete to delete the reservation
    await Reservation.findByIdAndDelete(reservationId);

    res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete reservation.", error: err.message });
  }
};

