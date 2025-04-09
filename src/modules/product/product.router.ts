import express from 'express';
import { ProductController } from './product.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateProduct } from './product.validator';
import multer from 'multer';



const router = express.Router();
const productController = new ProductController();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5 // Max 5 files
  }
});

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
  upload.array('images', 5),
  productController.createProduct as express.RequestHandler,
  validateProduct
);

router.get(
  '/store',
  authMiddleware,
  productController.getStoreProducts as express.RequestHandler
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
  upload.array('images', 5),
  validateProduct,
  productController.updateProduct as express.RequestHandler
);

router.delete(
  '/:productId',
  authMiddleware,
  productController.deleteProduct as express.RequestHandler
);

router.get(
  '/:productId',
  productController.getProductById
);

// Guest order routes
router.get(
  '/store/:storeId/guest-orderable',
  productController.getGuestOrderableProducts
);

router.post(
  '/validate-guest-order',
  productController.validateGuestOrderQuantity
);

export default router; 