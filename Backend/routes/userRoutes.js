import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { applySeller } from '../controllers/sellerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.put('/apply-seller', protect, applySeller);

export default router;