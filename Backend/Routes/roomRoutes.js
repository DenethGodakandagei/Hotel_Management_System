import express from 'express';
import { addRoom, getAllRooms, editRoom, getRoomById, deleteRoom } from '../Controller/roomController.js';

const router = express.Router();

// room routes here
router.post('/add', addRoom);  
router.get('/', getAllRooms);  
router.put('/:roomId', editRoom);  
router.get('/:roomId', getRoomById);  
router.delete('/:roomId', deleteRoom);  

export default router;
