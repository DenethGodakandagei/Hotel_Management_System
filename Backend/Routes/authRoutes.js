import express from 'express';
import { loginUser, registerUser  } from '../Controller/authController.js';  // Correct ES module import

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);  

export default router;
