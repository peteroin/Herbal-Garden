import express from 'express';
import authenticate from '../middleware/auth.js';
import {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  deleteUserAccount
} from '../controllers/userController.js';

const router = express.Router();

// All user routes require authentication
router.use(authenticate);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/password', updatePassword);
router.delete('/account', deleteUserAccount);

export default router;
