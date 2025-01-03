// routes/reservationRoutes.js
import express from 'express';
import { createReservation, updateReservation, deleteReservation } from '../Controller/resevationController.js'; // Named imports for all three functions

const router = express.Router();


router.post('/', createReservation);
router.put('/update', updateReservation);
router.delete('/:reservationId', deleteReservation);

export default router;
