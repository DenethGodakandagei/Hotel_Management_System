import express from 'express';
import { loginUser, registerUser , getUser  } from '../Controller/authController.js';  
import { verifyToken } from '../Middelware/verifyToken.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);  
router.get('/protected', verifyToken, getUser);

export default router;
