import express from 'express';
import { getAllUsers, editUser, deleteUser } from '../Controller/userController.js';

const router = express.Router();

router.get('/', getAllUsers); 
router.put('/:id', editUser); 
router.delete('/:id', deleteUser);

export default router;
