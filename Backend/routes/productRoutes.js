// backend/routes/productRoutes.js

import express from 'express';
// --- UPDATE IMPORTS ---
import { getProducts, getProductById, createProduct, deleteProduct } from '../controllers/productController.js'; 
// ----------------------
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// This route handles GET for all products and POST for creating a product
router.route('/').get(getProducts).post(protect, createProduct);

// --- UPDATE THIS LINE ---
// This route now handles GET for a single product and DELETE for a single product
router.route('/:id').get(getProductById).delete(protect, deleteProduct);
// ----------------------

export default router;