import express from 'express';
import { createOrder, getOrdersByUser, updateOrderStatus , deleteOrder } from '../Controller/OrderController.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/user/:userId', getOrdersByUser);
router.put('/update-status', updateOrderStatus);
router.delete("/:orderId", deleteOrder);


export default router;
