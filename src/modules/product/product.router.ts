import express from 'express';
import { ProductController } from './product.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateProduct } from './product.validator';

const router = express.Router();
const productController = new ProductController();

// Search and filter routes (must be before /:productId)
router.get(
  '/search',
  productController.searchProducts
);

router.get(
  '/category/:category',
  productController.getProductsByCategory
);

// Store owner routes (protected)
router.post(
  '/create',
  authMiddleware,
  validateProduct,
  productController.createProduct
);

router.get(
  '/store',
  authMiddleware,
  productController.getStoreProducts
);

// Store public routes
router.get(
  '/store/:storeId',
  productController.getStoreProductsPublic
);

// Product specific routes
router.put(
  '/:productId',
  authMiddleware,
  validateProduct,
  productController.updateProduct
);

router.delete(
  '/:productId',
  authMiddleware,
  productController.deleteProduct
);

router.get(
  '/:productId',
  productController.getProductById
);

export default router; 