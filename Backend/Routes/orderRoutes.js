import express from 'express';
import { createOrder, getOrdersByUser, updateOrderStatus } from '../Controller/OrderController.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/user/:userId', getOrdersByUser);
router.put('/update-status', updateOrderStatus);

export default router;
