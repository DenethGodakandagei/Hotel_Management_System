import express from 'express';
import { 
  createReservation, 
  updateReservation, 
  deleteReservation, 
  getAllReservations 
} from '../Controller/resevationController.js';

const router = express.Router();
router.post('/', createReservation);
router.put('/update', updateReservation);
router.delete('/:reservationId', deleteReservation);
router.get('/', getAllReservations);

export default router;
