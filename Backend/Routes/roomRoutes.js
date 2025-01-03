import express from 'express';
import {
  addRoom,
  getAllRooms,
  editRoom,
  getRoomById,
  deleteRoom,
} from '../Controller/roomController.js';
import upload from '../config/multerConfig.js'; 
const router = express.Router();

// Room routes
router.post('/add', upload.array('images', 5), addRoom); 
router.get('/', getAllRooms);
router.put('/:roomId', upload.array('images', 5), editRoom); 
router.get('/:roomId', getRoomById);
router.delete('/:roomId', deleteRoom);

export default router;
