import express from 'express';
import {
  createStaff,
  getAllStaff,
  getStaffById,
  getStaffByUserId ,
  updateStaff,
  deleteStaff,
} from '../Controller/staffController.js';

const router = express.Router();

router.post('/', createStaff);
router.get('/', getAllStaff);
router.get('/:userId', getStaffByUserId );
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

export default router;
