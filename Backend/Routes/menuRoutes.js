import express from 'express';
import { createMenuItem, getAllMenuItems, updateMenuItem, deleteMenuItem } from '../Controller/menuController.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

router.post('/', upload.array('images'), createMenuItem);
router.get('/', getAllMenuItems);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

export default router;
