import express from 'express';
import { getAllUsers, editUser } from '../Controller/userController.js';

const router = express.Router();

router.get('/', getAllUsers); 
router.put('/:id', editUser); 

export default router;
