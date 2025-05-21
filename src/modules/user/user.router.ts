import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
const userController = new UserController();

// Public routes
router.post('/register', userController.register.bind(userController));
router.post('/verify-email', userController.verifyEmail.bind(userController));
router.post('/login', userController.login.bind(userController));
router.post('/forgot-password', userController.forgotPassword.bind(userController));

// Protected routes (require authentication)
router.use(authMiddleware);
router.post('/reset-password', userController.resetPassword.bind(userController));
// Protected routes go here


export default router;